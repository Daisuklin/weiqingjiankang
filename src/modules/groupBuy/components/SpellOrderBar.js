import React, {Component} from 'react'
import {common} from 'common';
import  wx from 'weixin-js-sdk';
import * as BaseApi from 'common/api/base'
import {Img, CommonShare} from 'commonComponent';
import {Grid, Flex, List, WhiteSpace, Button, Badge, WingBlank,Toast,Popup} from 'antd-mobile';

import "./SpellOrderBar.less"
import * as groupApi from '../api/groupBuy';
class OrderBar extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            isDisabled:false
        }
    }

    // // 立即购买
    // _onSubmitOrder = () => {
    //   this.props.onSubmitOrder();
    // }
    //取消订单
    cancelgrouporder = () => {
        // window.location.href='/mall/groupBuy.html#/groupBuy/all';
        window.location.href = '/mall/home.html';
    }
    //去支付
    refresh = () => {
        // Toast.loading();
        // 获取拼团详情
        //debugger
        //let payAmount;
        const {totalPrice} = this.props;
        groupApi.grouporder({
            addressId: this.props.addressId,
            specId: this.props.specId,
            groupItemId: this.props.groupItemId,
            shippingFee: this.props.shippingFee,
            goodsNumber: this.props.buyCount,
            groupDetailId: this.props.groupDetailId
        }).then(result => {
            if (result.result == 1) {
                //debugger
                const grouporderInfo = result.data;
                const orderPay = result.data.orderPay;
                console.log(orderPay);
                console.log(123);
                window.location.href = '/mall/payment.html#/cashierList/' + orderPay.paySn + '/' + orderPay.payAmount;
            } else {
                this.setState({
                    isDisabled:false
                });
                Toast.fail(result.msg);
            }
        });
    }


    gotoFriend=()=>{
        var shareImgUrl=this.props.shareUrl;
        groupApi.grouporder({
            addressId: this.props.addressId,
            specId: this.props.specId,
            groupItemId: this.props.groupItemId,
            shippingFee: this.props.shippingFee,
            goodsNumber: this.props.buyCount,
            groupDetailId: this.props.groupDetailId
        }).then(result => {
            if (result.result == 1) {
                const orderPay = result.data.orderPay;
                var orderSn= orderPay.paySn
                var url=common.SERVER_PATH +'/payment.html#/friendsPay/'+orderSn;
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
                                imgUrl: shareImgUrl, // 分享图标
                                success: function () {
                                    // 用户确认分享后执行的回调函数
                                    Toast.success("分享成功！",2,window.location.href=common.SERVER_PATH+"/groupBuy.html#/ginsegOrderList/0")
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                    Toast.success("取消分享！",2,window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1')
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
                                    window.location.href = common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/0';
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
                Popup.show(<CommonShare title={"找好友代付"} txtTYpe={0} redirect={common.SERVER_PATH+'/groupBuy.html#/ginsegOrderList/1'}/>,{animationType: 'slide-up'});
            } else {
                Toast.fail(result.msg);
            }
        });
    }


    cancelgrouppayment = () => {
        if(this.state.isDisabled){
            return
        }
        this.setState({
            isDisabled:true
        });
        Toast.loading('下单中。。。')
        this.refresh();
    }

    render() {
        const {totalPrice} = this.props;
        return (
            <div className='wx-orderbar'>
                <Flex style={{width: '100%'}}>
                    <Flex.Item
                        style={{flex: 1, textAlign: 'right'}}>
                        <Button onClick={this.cancelgrouporder}
                                type='primary' inline className="btn_gotoSub" style={{
                            height: '0.6rem',
                            lineHeight: '0.6rem',
                            fontSize: '0.28rem',
                            color: '#999',
                            background: '#fff',
                            borderColor: '#aaa',
                            padding: '0 0.1rem',
                            width: '1.5rem', marginLeft: '0.2rem'
                        }}>取消订单</Button>
                        <Button type='primary' inline className="btn_gotoSub" onClick={this.gotoFriend} style={{
                            height: '0.6rem',
                            lineHeight: '0.6rem',
                            fontSize: '0.28rem',
                            color: '#00a9df',
                            background: 'none',
                            borderColor: '#00a9df',
                            padding: '0 0.1rem',
                            width: '2rem', marginLeft: '0.2rem'
                        }}>好友代付</Button>
                        <Button onClick={this.cancelgrouppayment}
                                type='primary' inline className="btn_gotoSub" style={{
                            height: '0.6rem',
                            lineHeight: '0.6rem',
                            fontSize: '0.28rem',
                            color: '#00a9df',
                            background: 'none',
                            borderColor: '#00a9df',
                            padding: '0 0.1rem',
                            width: '1.2rem', marginLeft: '0.2rem'
                        }}>去支付</Button>
                    </Flex.Item>
                </Flex>
            </div>
        );
    }
}

export default OrderBar;
