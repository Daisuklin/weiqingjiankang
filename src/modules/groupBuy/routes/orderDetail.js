import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Button,
    List,
    Popup,
    Modal
} from 'antd-mobile';
import {common} from 'common';
import * as orderApi from '../../home/api/order';
import  wx from 'weixin-js-sdk';
import * as BaseApi from 'common/api/base'
import {Img, CommonShare} from 'commonComponent';
import './orderDetail.less'
const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;
class OrderDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderDetail: null,
            shareImgUrl:''
        }
    }

    cancelOrder = () => {
        Modal.alert('提示', [<div style={{textAlign:'center',paddingBottom:'0.3rem'}}>是否取消订单</div>], [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    orderApi.cancleorder({
                        ordersn:this.state.orderDetail.orderSn
                    }).then(result => {
                        if (result.result == 1) {
                            // 取消成功
                            window.location.reload();
                        }else {
                            Toast.fail(result.msg)
                        }
                    })
                }
            },
        ]);
    }

    componentDidMount() {
        const orderid = this.props.params.id;
        orderApi.orderdetail({
            orderid
        }).then(result => {
            if (result.result == 1) {
                const data = result.data[0]
                    this.setState({
                        orderDetail: data,
                        shareImgUrl:data.orderGoodsList[0].goodsImage
                    });
            }
        })
    }

    getStatusShowText = (status) => {
        const orderStatus = {
            '0': '已取消',
            '10': '待支付',
            '20': '待发货',
            '30': '待收货',
            '40': '确认收货',
            '50': '已提交',
            '60': '待发货',
        }
        return orderStatus[status]
    }

    gotoPay = () => {
        const { orderSn, orderAmount } = this.state.orderDetail;
        window.location.href='/mall/payment.html#/cashierList/'+orderSn+'/'+orderAmount;
    }

    gotoFriendPay = () => {
        var orderSn= this.state.orderDetail.orderSn;
        var url=common.SERVER_PATH +'/payment.html#/friendsPay/'+orderSn;
        var shareImgUrl=common.IMAGE_DOMAIN+this.state.shareImgUrl;
        BaseApi.getToken({
            pageUrl: location.href.split('#')[0]
        }).then(result => {
            if (result.result == 1) {
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
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: "求付款，帮我付款才是真友谊", // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:shareImgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                            window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1';
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.success("取消分享！")
                            window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1';
                        }
                    });
                    //分享给好友
                    wx.onMenuShareAppMessage({
                        title: "求付款，帮我付款才是真友谊！", // 分享标题
                        desc: "你的一小笔开支，是我们关系的一大步，为我付款吧~", // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: shareImgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                            window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1';
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.success("取消分享！")
                            window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1';
                        }
                    });
                });
            } else {
                Toast.fail(result.msg)
            }
        });
        Popup.show(<CommonShare title={"找好友代付"} txtTYpe={0}/>,{animationType: 'slide-up'});
    }

    render() {
        const {orderDetail} = this.state
        let goodsPrice = 0;
        if (!orderDetail) {
            return null;
        }
        return (
            <div className="wx-orderDetail">
                <List className="order-list-content">
                    <Item extra={<div style={{fontSize:'0.26rem'}}>{this.getStatusShowText(orderDetail.orderState)}</div>}
                          multipleLine>
                        <div style={{padding: '0.2rem 0px'}} className="item_list">
                            <Flex  >
                                <span className="item_list_name">订单号：{orderDetail.orderSn}</span>
                                {/*<div className="item_list_protime">请于28分35秒内付款，超时订单自动关闭</div>*/}
                            </Flex>
                        </div>
                    </Item>

                    <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                    <Item
                        multipleLine
                        style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) 0px bottom /100% 8px no-repeat'}}>
                        <div style={{padding: '0.2rem 0px'}}>
                            <Flex justify="between">
                                <Flex.Item style={{flex: 0.2}}>
                                    <img src="./assets/img/weiqing/dizhi-01@2x.png"
                                         style={{width: '25px', height: '35px'}}/>
                                </Flex.Item>
                                <Flex.Item style={{flex: 3, marginLeft: '0px'}}>
                                    <span>{orderDetail.address.trueName}</span>
                                    <Brief>{orderDetail.address.areaInfo} {orderDetail.address.address}</Brief>
                                </Flex.Item>
                            </Flex>
                        </div>

                    </Item>
                </List>
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                <div>
                    <List className='wx-order-shop' renderHeader={<div>{orderDetail.storeName}</div>}>
                        {
                            orderDetail.orderGoodsList.map((goods, index) => {
                                goodsPrice += parseInt(goods.goodsPrice);
                                // const showShip = null
                                return <div key={index}><Item
                                    multipleLine style={{
                                    padding: '0.2rem 0.26rem 0.2rem 0.26rem',
                                    borderBottom: '1px solid #e5e5e5'
                                }}>
                                    <Flex key={goods.specId} onClick={() => {
                                        common.gotoGoodsDetail({
                                            specId: goods.specId
                                        })
                                    }}>
                                        <div style={{width: '1.5rem', height: '1.5rem'}}><Img src={goods.goodsImage}
                                                                                              style={{
                                                                                                  width: '1.5rem',
                                                                                                  height: '1.5rem'
                                                                                              }}/></div>
                                        <div className="shop-list-box">
                                            <div className="shop_name">{goods.goodsName}</div>
                                            {/*<div className="shop_product">产品介绍</div>*/}
                                            <div style={{fontSize: '0.26rem', color: '#666'}}>数量: {goods.goodsNum}</div>
                                            <div style={{color: '#e9331e', fontSize: '0.3rem'}}>
                                                ¥{goods.goodsPrice}</div>
                                        </div>
                                    </Flex>
                                </Item>
                                </div>
                            })
                        }
                        {/*<Flex justify="end" style={{padding:'0.2rem 0.26rem'}}>
                         <Button inline type="primary" style={{height:'0.6rem',lineHeight:'0.6rem',background:'#00a9e0',borderColor:'#00a9e0',fontSize:'0.28rem'}}>联系客服</Button>
                         </Flex>*/}
                    </List>
                    <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                    <div>
                        <List>
                            <Item
                                onClick={this.onSelectPayTypeClick}
                                extra={orderDetail.paymentName}>
                                支付方式
                            </Item>
                            {/* <Item
                             onClick={this.onClickCoupon}
                             extra="优惠券">
                             优惠券
                             </Item>*/}
                            <Item onClick={() => this.onClickInvoice(invoiceShow)} extra={orderDetail.invoice}>
                                发票信息
                            </Item>
                        </List>
                    </div>

                </div>
                <Flex>
                    <Flex.Item style={{flex: 2.5, borderRight: '1px solid #ddd'}}>
                        <List className="extrared">
                            {/*<Item extra={`¥` + parseFloat(goodsPrice).toFixed(2)}>商品总额</Item>*/}
                            <Item extra={`¥` + orderDetail.orderGoodsList[0].goodsPrice}>商品总额</Item>
                            <Item extra={`+` + orderDetail.shippingFee}>运费</Item>
                            <Item extra={`- ¥` + orderDetail.discount}>优惠金额</Item>
                        </List>
                    </Flex.Item>
                </Flex>

                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                <Flex>
                    <Flex.Item
                        style={{background: '#fff', padding: '0.3rem 0.26rem', width: '100%', marginLeft: '0px'}}>
                        <div className="order_all">
                            <div className="order_all_price">合计： <span style={{
                                fontSize: '0.28rem',
                                color: '#e2536b'
                            }}>{`¥` + orderDetail.orderTotalPrice}</span></div>
                            <div className="order_all_data">下单时间：{orderDetail.createTimeStr}</div>
                        </div>
                    </Flex.Item>
                </Flex>

                <div className='wx-orderbar'>
                    <Flex style={{width: '100%'}}>
                        <Flex.Item  style={{flex: 1, textAlign: 'right'}}>
                            {orderDetail.orderState != 10 ? <div><Button type='primary' inline  style={{
                                height: '0.6rem',
                                lineHeight: '0.6rem',
                                fontSize: '0.28rem',
                                color: '#fff',
                                borderColor: '#00a9df',
                                background:'#00a9df',
                                padding: '0 0.1rem',
                                width: '2rem', marginLeft: '0.2rem'
                            }}>已支付</Button>< Button type='primary' inline className="btn_gotoSub" onClick={this.cancelOrder} style={{
                                height: '0.6rem',
                                lineHeight: '0.6rem',
                                fontSize: '0.28rem',
                                color: '#999',
                                background: '#fff',
                                borderColor: '#aaa',
                                padding: '0 0.1rem',
                                width: '1.5rem', marginLeft: '0.2rem'
                            }}>取消订单</Button> </div>:
                                <div>
                                    < Button type='primary' inline className="btn_gotoSub" onClick={this.cancelOrder} style={{
                                        height: '0.6rem',
                                        lineHeight: '0.6rem',
                                        fontSize: '0.28rem',
                                        color: '#999',
                                        background: '#fff',
                                        borderColor: '#aaa',
                                        padding: '0 0.1rem',
                                        width: '1.5rem', marginLeft: '0.2rem'
                                    }}>取消订单</Button>
                                    <Button type='primary' inline className="btn_gotoSub" onClick={this.gotoFriendPay} style={{
                                        height: '0.6rem',
                                        lineHeight: '0.6rem',
                                        fontSize: '0.28rem',
                                        color: '#00a9df',
                                        background: '#fff',
                                        borderColor: '#00a9df',
                                        padding: '0 0.1rem',
                                        width: '2rem', marginLeft: '0.2rem'
                                    }}>好友代付</Button>
                                    <Button type='warning' inline className="btn_gotoSub" onClick={this.gotoPay} style={{
                                        height: '0.6rem',
                                        lineHeight: '0.6rem',
                                        fontSize: '0.28rem',
                                        color: '#00a9df',
                                        // background:'#e2536b',
                                        borderColor: '#00a9df',
                                        padding: '0 0.1rem',
                                        width: '1.2rem', marginLeft: '0.2rem'
                                    }}>去支付</Button></div>
                            }
                        </Flex.Item>
                    </Flex>
                </div>


            </div>
        )
    }
}

export default withRouter(OrderDetail);
