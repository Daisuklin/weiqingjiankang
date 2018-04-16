import React, {Component} from 'react';
import {Img, CommonShare} from 'commonComponent';
import {common} from 'common';
import * as orderApi from '../../home/api/order';
import * as BaseApi from 'common/api/base'
import  wx from 'weixin-js-sdk';
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Flex,
    ListView,
    Button,
    Modal,
    Popup
} from 'antd-mobile';

class OrderItem extends Component {

    cancelOrder = (myGroupList) => {
        Modal.alert('提示', '是否取消订单', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    orderApi.cancleorder({
                        ordersn: myGroupList.orderSn
                    }).then(result => {
                        if (result.result == 1) {
                            // 取消成功
                            if (this.props.cancelOrder) {
                                this.props.cancelOrder();
                                console.log(this.props)
                                window.location.reload();
                            }
                        }
                    })
                }
            },
        ]);
    }
    //已付款之后取消订单
    cancelPayOrder = (orderItem) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                orderItem,
                type: 1 // type 1代表取消订单
            }
        })
    }

    gotoPay = (myGroupList) => {
        const {orderSn, orderAmount} = myGroupList;
        /*common.gotoPay({
            orderSn,
            orderAmount
        })*/
        window.location.href='/mall/payment.html#/cashierList/'+ orderSn +'/'+orderAmount;
    }

    gotoComment = (myGroupList) => {
        this.props.router.push({
            pathname: '/commentList',
            state: {
                myGroupList
            }
        })
    }

    showShareActionSheet=(myGroupList)=>{
        var shareImgUrl=common.IMAGE_DOMAIN+myGroupList.orderGoodsList[0].goodsImage;
        BaseApi.getToken({
            pageUrl: location.href.split('#')[0]
        }).then(result => {
            if (result.result == 1) {
                Popup.show(
                    <CommonShare />, {animationType: 'slide-up'}
                );
                var data = result.data[0];
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，
                    jsApiList: [
                        "chooseImage",// 选择图片
                        "previewImage", //预览图片
                        "uploadImage", //上传图片
                        "downloadImage",  //下载图片
                        "onMenuShareTimeline", //分享到朋友圈
                        "onMenuShareAppMessage",//分享给好友
                        // "onMenuShareQQ",
                        // "onMenuShareWeibo",
                        // "onMenuShareQZone",
                        "hideOptionMenu",
                        "showOptionMenu",
                        "hideMenuItems",
                        "showMenuItems",
                        "hideAllNonBaseMenuItem",
                        "showAllNonBaseMenuItem"
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.hideAllNonBaseMenuItem(); //隐藏非基础功能按钮
                    wx.showMenuItems({
                        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:favorite"] // 要显示的菜单项，所有menu项见附录3
                    });
                    let shareUrl=common.SERVER_PATH+"/groupBuy.html#/ginsengGroup/"+myGroupList.groupDetailId;
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: "快来一起参团吧！", // 分享标题
                        link:shareUrl,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:shareImgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.fail("您已取消分享")
                        }
                    });
                    //分享给好友
                    wx.onMenuShareAppMessage({
                        title: "快来一起参团吧", // 分享标题
                        desc: '', // 分享描述
                        link:shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:shareImgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.fail("您已取消分享")
                        }
                    });
                });
            } else {
                Toast.fail(result.msg)
            }
        });
    }

    // 确认订单
    finishorder = (myGroupList) => {
        Modal.alert('提示', '是否确认收货', [
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    orderApi.finishorder({
                        ordersn: myGroupList.orderSn
                    }).then(result => {
                        if (result.result == 1) {
                            this.props.finishorder();
                        }
                    })
                }
            }
        ]);
    }

    gotoOrderDetail = (myGroupList) => {
        this.props.router.push('/orderDetail/' + myGroupList.orderId)
    }

    gotoDelivery = (dataItem) => {
        const shippingCode = dataItem.shippingCode;
        const timestamp = new Date().getTime();
        const shippingExpressCode = dataItem.shippingExpressCode;
        const url = `http://wap.kuaidi100.com/wap_result.jsp?rand=${timestamp}&id=${shippingExpressCode}&fromWeb=null&postid=${shippingCode}`
        window.location.href = url
    }

    render() {
        const {myGroupList} = this.props;
        const {orderGoodsList} = myGroupList;
        let orderStatus = '';
        let showCancelBtn = false;
        let showCancelBtn2 = false;
        let showCancelBtn3 = false;
        let showPayBtn = false;
        let showCommentBtn = false;
        // 确认收货
        let showCompleteBtn = false;
        // 查看物流
        let showViewDeleveryBtn = false;

        switch (myGroupList.orderState) {
            case 0:
                orderStatus = '已取消'
                break;
            case 10:
                orderStatus = '待支付'
                showCancelBtn = true;
                showPayBtn = true;
                break;
            case 15:
                orderStatus = '拼团中'
                showCancelBtn3 = true;
                break;
            case 20:
                orderStatus = '等待发货'
                // showCancelBtn = true;
                showCancelBtn2 = true;
                break;
            case 30:
                orderStatus = '待收货'
                showViewDeleveryBtn = true;
                showCompleteBtn = true;
                break;
            case 40:
                orderStatus = '已完成'
                if (myGroupList.evaluationStatus != 1) {
                    showCommentBtn = true;
                }
                break;
            case 50:
                orderStatus = '已提交'
                showCancelBtn = true;
                break;
            case 60:
                orderStatus = '待发货'
                break;
            default:
                break;
        }
        console.log(myGroupList)
        return <div className='orderitem'>
            {/*<WhiteSpace></WhiteSpace>*/}
            <WhiteSpace style={{backgroundColor: '#f3f3f3'}}></WhiteSpace>
            <div style={{backgroundColor: '#fff'}}>
                <Flex justify='between' style={{padding: '0.2rem 0.26rem', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{color: '#333', fontSize: '0.28rem'}}><img src="./assets/img/weiqing/dianpu-01@2x.png"
                                                                           style={{
                                                                               width: '0.28rem',
                                                                               height: '0.28rem',
                                                                               paddingRight: '0.1rem',
                                                                               position: 'relative',
                                                                               top: '0.03rem'
                                                                           }}/>{myGroupList.storeName}</div>
                    <div className="paystaus" style={{color: '#00a9df', fontSize: '0.24rem'}}>{orderStatus}</div>
                </Flex>
                <div>
                    <div style={{borderBottom: '1px solid #e5e5e5'}}>
                        <Flex onClick={() => this.gotoOrderDetail(myGroupList) } style={{padding: '0.2rem 0.26rem'}}>
                            <div style={{width: '1.62rem', height: '1.62rem'}}><Img
                                src={myGroupList.orderGoodsList[0].goodsImage}
                                style={{width: '1.62rem', height: '1.62rem'}}/></div>
                            <div style={{marginLeft: '0.2rem'}}>
                                <div style={{
                                    color: '#333',
                                    fontSize: '0.28rem',
                                    marginBottom: '0.15rem',
                                    maxHeight: '0.64rem',
                                    lineHeight: '0.35rem',
                                    overflow: 'hidden'
                                }}>{orderGoodsList[0].goodsName}</div>
                                <div style={{color: '#888', fontSize: '0.24rem', paddingBottom: '0.15rem'}}>
                                    规格：{orderGoodsList[0].specInfo}</div>
                                <div style={{color: '#888', fontSize: '0.24rem', paddingBottom: '0.15rem'}}>
                                    数量：{orderGoodsList[0].goodsNum}</div>
                                <div style={{
                                    color: '#e9321f',
                                    fontSize: '0.26rem'
                                }}>{`￥${orderGoodsList[0].goodsPrice}`}</div>
                            </div>
                        </Flex>
                    </div>
                </div>
                <WhiteSpace></WhiteSpace>
                {/* <Flex justify='between'>
                 <div>订单总额: {`￥${dataItem.goodsAmount}`}</div>
                 </Flex>*/}
                <Flex justify='end' style={{padding: '0px 0.26rem'}}>
                    <div>
                        {
                            showCancelBtn && <Button
                                onClick={(e) => this.cancelOrder(myGroupList)}
                                type='ghost' size='small' inline
                                style={{borderColor: '#d7d7d7', color: '#333', fongSize: '0.26rem'}}>取消订单</Button>
                        }
                        {
                            showCancelBtn2 && <Button
                                onClick={(e) => this.cancelPayOrder(myGroupList)}
                                type='ghost' size='small' inline
                                style={{borderColor: '#d7d7d7', color: '#333', fongSize: '0.26rem'}}>取消订单</Button>
                        }
                        {
                            showCancelBtn3 && <Button
                                onClick={(e) => this.showShareActionSheet(myGroupList)}
                                type='ghost' size='small' inline
                                style={{borderColor: '#d7d7d7', color: '#333', fongSize: '0.26rem'}}>邀请好友拼团</Button>
                        }
                        {
                            showPayBtn && <Button
                                onClick={(e) => this.gotoPay(myGroupList)}
                                style={{
                                    marginLeft: '0.1rem',
                                    borderColor: '#d7d7d7',
                                    color: '#333',
                                    fongSize: '0.26rem'
                                }} type='ghost' size='small' inline>去支付</Button>
                        }
                        {
                            showCommentBtn && <Button
                                onClick={(e) => this.gotoComment(myGroupList)}
                                style={{
                                    marginLeft: '0.1rem',
                                    borderColor: '#d7d7d7',
                                    color: '#333',
                                    fongSize: '0.26rem'
                                }} type='ghost' size='small' inline>马上评价</Button>
                        }
                        {
                            showViewDeleveryBtn && <Button
                                onClick={(e) => this.gotoDelivery(myGroupList)}
                                style={{
                                    marginLeft: '0.1rem',
                                    borderColor: '#d7d7d7',
                                    color: '#333',
                                    fongSize: '0.26rem'
                                }} type='ghost' size='small' inline>查看物流</Button>
                        }
                        {
                            showCompleteBtn && <Button
                                onClick={(e) => this.finishorder(myGroupList)}
                                style={{
                                    marginLeft: '0.1rem',
                                    borderColor: '#d7d7d7',
                                    color: '#333',
                                    fongSize: '0.26rem'
                                }} type='ghost' size='small' inline>确认收货</Button>
                        }
                    </div>
                </Flex>
                <WhiteSpace></WhiteSpace>
            </div>

        </div>
    }
}

export default withRouter(OrderItem);
