import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    Modal,
    Toast,
    Flex,
    Button,
    List,
    Popup,
    Checkbox,
} from 'antd-mobile';
import {Img, CommonShare} from 'commonComponent';
import * as BaseApi from 'common/api/base'
import * as orderApi from '../api/order';
import  wx from 'weixin-js-sdk';
import {common} from 'common';

const Item = List.Item;

import './order.less';

class PaySuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payInfo: null,
            title: "",
            isShare: false,
            shareOrderId: null
        }
    }

    // 分享红包
    shareCoup=(orderCode)=>{
        orderApi.shareCoupon({orderId: orderCode}).then(result => {
            if (result.result == 1) {
                var shareOrderId=result.data.shareOrderId;
                var shareUrl = common.SERVER_DOMAIN + "/thirdlogin/shareCoupon?shareOrderId=" + shareOrderId;
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
                        const imgURl=common.SERVER_DOMAIN +'/upload/img/adv/share2.jpg'
                        wx.ready(function () {
                            wx.hideAllNonBaseMenuItem(); //隐藏非基础功能按钮
                            wx.showMenuItems({
                                menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:favorite"] // 要显示的菜单项，所有menu项见附录3
                            });
                            //分享到朋友圈
                            wx.onMenuShareTimeline({
                                title: "快来领取优惠券吧！", // 分享标题
                                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: imgURl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    Toast.success("分享成功！")
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                    Toast.success("取消分享！")
                                }
                            });
                            //分享给好友
                            wx.onMenuShareAppMessage({
                                title: "快来领取优惠券吧！", // 分享标题
                                desc: '手快有，手慢无~', // 分享描述
                                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:imgURl, // 分享图标
                                type: '', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    Toast.success("分享成功！")
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                    Toast.success("取消分享！")
                                }
                            });
                        });
                    } else {
                        Toast.fail(result.msg)
                    }
                });
                if(result.data.couponNumber){
                    this.setState({
                        isShare: true,
                        title: "您已获得" + result.data.couponNumber + "个红包，赶紧去分享吧！",
                        shareOrderId: result.data.shareOrderId
                    })
                }

            }
        })
    }

    //邀请拼团
    showShareActionSheet=(shareUrl,shareImgUrl)=>{
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
                this.setState({
                    isShare: true,
                    title: "快找好友一起来拼团吧",
                })
            } else {
                Toast.fail(result.msg)
            }
        });
    }

    componentDidMount() {
        orderApi.getOrderPay({
            paySn: this.props.params.paySn
        }).then(result => {
            if (result.result == 1) {
                this.setState({
                    payInfo: result.data[0]
                })
                const orderPay=result.data[0].orderPay;
                const orderList=orderPay.orderList;
                var shareImgUrl='';
                var shareUrl='';
                let orderTypeGroup=false;
                orderList.map((order,index)=>{
                    if(order.orderType==20){
                        orderTypeGroup=true;
                        shareImgUrl=common.IMAGE_DOMAIN+order.orderGoodsList[0].goodsImage;
                    }
                });
                //判断是否为拼团订单
                if(orderTypeGroup){
                    orderApi.groupDetail({orderId:result.data[0].orderId}).then(result=>{
                        if(result.result==1){
                            shareUrl=common.SERVER_PATH+"/groupBuy.html#/ginsengGroup/"+result.data.groupDetailId;
                            this.showShareActionSheet(shareUrl,shareImgUrl)
                        }
                    })
                }else {
                    this.shareCoup(result.data[0].orderId);
                }
            }
        })
    }

    render() {
        const PlaceHolder = props => (
            <div style={{
                backgroundColor: '#ebebef',
                color: '#bbb',
                textAlign: 'center',
                height: '0.6rem',
                lineHeight: '0.6rem',
                width: '100%',
            }} {...props}
            >Item</div>
        );

        const IconClass = ({url}) => {
            return <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: `url(${url}) center center /  1.2rem 1.2rem no-repeat`,
                display: 'inline-block',
                marginRight: '0.1rem'
            }}
            />
        }

        const {payInfo} = this.state;
        if (!payInfo) {
            return null;
        }
        return <div className='wx-pay-result' style={{backgroundColor: 'white'}}>
            <Flex>
                <Flex.Item style={{flex: 2}}><IconClass url={'./assets/img/successPay.png'}></IconClass></Flex.Item>
                <Flex.Item style={{flex: 3}}>
                    <div style={{
                        fontSize: '.24rem',
                        height: '0.8rem',
                        lineHeight: '0.4rem',
                        overflow: 'hidden'
                    }}>支付单号：{payInfo.paySn}</div>
                    <div style={{
                        fontSize: '.24rem',
                        height: '0.8rem',
                        lineHeight: '0.4rem',
                        overflow: 'hidden'
                    }}>订单金额：{payInfo.payAmount}</div>
                </Flex.Item>
            </Flex>
            <Flex justify="between">
                <Button></Button>
                <Button
                    onClick={() => {
                        window.location.href = common.SERVER_PATH+'/home.html#/orderList/0';
                    }}
                    type='ghost' size='small' inline
                style={{borderColor:'#5491d2',color:'#5491d2' }} activeStyle={false}>查看订单</Button>

                <Button
                    onClick={() => {
                        window.location.href = common.SERVER_PATH+'/home.html#/'
                    }}
                    type='ghost' size='small' inline activeStyle={false} style={{borderColor:'#5491d2',color:'#5491d2' }}>返回首页</Button>
                <Button></Button>
            </Flex>
            {this.state.isShare ? Popup.show(<CommonShare title={this.state.title}
                                                          txtTYpe={0}/>, {animationType: 'slide-up'}) : null}
        </div>
    }
}

export default withRouter(PaySuccess);
