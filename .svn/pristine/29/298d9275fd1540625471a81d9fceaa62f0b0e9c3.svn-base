import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Button,
    List,
    InputItem,
    Popup
} from 'antd-mobile';
import  wx from 'weixin-js-sdk';
import * as BaseApi from 'common/api/base'
import {Img, CommonShare} from 'commonComponent';
import * as orderApi from '../api/order';
import {common} from 'common';
import Shop from '../components/Shop';
import Fee from '../components/Fee';
import OrderBar from '../components/OrderBar';
import {createForm} from 'rc-form';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import './order.less';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgUrl:'',
            isDisabled:false
        };
    }
    submitOrder = () => {
        // 提交订单
        const {
            selectedAddress,
            paytype,
            isPd,
            freight,
            couponId,
            invoice,
            priceData,
            cartId,
            remark
        } = this.props.order;
        orderApi.saveorder({
            cartIds: cartId,
            addressId: selectedAddress.addressId,
            paytype,
            freight,
            couponId,
            invoiceId: invoice ? invoice.id : null,
            isPd,
            activityIds: null,
            remark:remark
        }).then(result => {
            if (result.result == 1) {
                // 货到付款，成功后跳转到货到付款提示页面
                Toast.hide();
                if (paytype == 2) {
                    Toast.success(result.msg, 1, () => {
                        // console.log(111);
                        window.location.href = '/mall/home.html#/orderList/0';
                    });
                } else {
                    // // 余额数大于 订单支付额
                    // // console.log(priceData);
                    // if (parseFloat(priceData.totalPrice) == 0) {
                    //   console.log('支付成功，跳转到成功页面');
                    //   this.props.router.replace('/paySuccess/' + result.data[0].paySn);
                    // } else {
                    //   // 跳转到收银台
                    //   window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+result.data[0].paySn+'/'+priceData.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
                    //   this.props.router.replace(`/cashier/${result.data[0].paySn}/${priceData.totalPrice}`);
                    // }
                   window.location.href = '/mall/payment.html#/cashierList/' + result.data[0].paySn + '/' + priceData.totalPrice;
                }
            } else {
                Toast.fail(result.msg);
                this.setState({
                    isDisabled:false
                });
            }
        });
    }

    onSubmitOrder = () => {
        if(this.state.isDisabled){
            return
        }
        this.setState({
            isDisabled:true
        });
        // 提交订单
        const {
            selectedAddress,
            paytype,
            isPd,
            freight,
            couponId,
            invoiceId,
            priceData,
        } = this.props.order;
        // 验证数据
        if (!selectedAddress) {
            Modal.fail('请先选择收货地址');
            return;
        }
        Toast.loading('下单中。。。')
        this.submitOrder();
        // // 如果使用余额支付，弹出密码输入框，，否则跳到
        // if (isPd == 1 && paytype == 1) {
        //   prompt(
        //     '请输入支付密码',
        //     '', [{ text: '取消' }, {
        //       text: '提交',
        //       onPress: passwd => {
        //         orderApi.chkPasswd({ passwd }).then(result => {
        //           if (result.result == 1) {
        //             // 密码正确，继续提交订单
        //             this.submitOrder();
        //           } else {
        //             Toast.fail(result.msg);
        //           }
        //         })
        //       }
        //     }],
        //     'secure-text',
        //   )
        //
        // } else {
        //   // 在线支持 提交订单
        //   this.submitOrder();
        // }
    }


    onSubmitOrderFriend = () => {
        // 提交订单
        const {
            selectedAddress,
            paytype,
            isPd,
            freight,
            couponId,
            invoiceId,
            priceData,
        } = this.props.order;
        // 验证数据
        if (!selectedAddress) {
            Modal.fail('请先选择收货地址');
            return;
        }
        Toast.loading('下单中。。。')
        this.gotoFriendPay();
        // // 如果使用余额支付，弹出密码输入框，，否则跳到
        // if (isPd == 1 && paytype == 1) {
        //   prompt(
        //     '请输入支付密码',
        //     '', [{ text: '取消' }, {
        //       text: '提交',
        //       onPress: passwd => {
        //         orderApi.chkPasswd({ passwd }).then(result => {
        //           if (result.result == 1) {
        //             // 密码正确，继续提交订单
        //             this.submitOrder();
        //           } else {
        //             Toast.fail(result.msg);
        //           }
        //         })
        //       }
        //     }],
        //     'secure-text',
        //   )
        //
        // } else {
        //   // 在线支持 提交订单
        //   this.submitOrder();
        // }
    }
    //好友代付
    gotoFriendPay = () => {
      const  shareImgUrl=this.state.imgUrl;
        // 提交订单
        const {
            selectedAddress,
            paytype,
            isPd,
            freight,
            couponId,
            invoice,
            priceData,
            cartId
        } = this.props.order;
        if(paytype==2){
            Toast.fail("请选择在线支付");
            return;
        }
        orderApi.saveorder({
            cartIds: cartId,
            addressId: selectedAddress.addressId,
            paytype,
            freight,
            couponId,
            invoiceId: invoice ? invoice.id : null,
            isPd,
            activityIds: null
        }).then(result => {
            if (result.result == 1) {
                var orderSn= result.data[0].paySn;
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
                                    Toast.success("分享成功！",2,window.location.href=common.SERVER_PATH+"/home.html#/orderList/1")
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                    Toast.success("取消分享！",2, window.location.href = common.SERVER_PATH+'/home.html#/orderList/1')
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
                                    window.location.href = common.SERVER_PATH+'/home.html#/orderList/0';
                                },
                                cancel: function () {
                                    // 用户取消分享后执行的回调函数
                                    Toast.success("取消分享！")
                                    window.location.href = common.SERVER_PATH+'/home.html#/orderList/1';
                                }
                            });
                        });
                    } else {
                        Toast.fail(result.msg)
                    }
                    Popup.show(<CommonShare title={"找好友代付"} txtTYpe={0} redirect={common.SERVER_PATH+'/home.html#/orderList/1'}/>,{animationType: 'slide-up'});
                });
            } else {
                Toast.fail(result.msg);
            }
        });
    }

    // 选择支付方式
    selectPayType = (type) => {
        this.props.dispatch({
            type: 'selectPayType',
            payload: type
        });
        Popup.hide();
    }

    onSelectPayTypeClick = () => {
        Popup.show(<div>
            <List renderHeader={() => '选择支付方式'} style={{padding: '0.2rem 0.26rem'}}>
                <Flex style={{padding: '0.4rem 0.26rem 0.2rem'}}>
                    <div style={{flex: 1}}><Button type='primary' onClick={() => this.selectPayType(1)}
                                                   style={{
                                                       background: '#00a9e0',
                                                       borderColor: '#00a9e0',
                                                       height: '0.6rem',
                                                       lineHeight: '0.6rem',
                                                       fontSize: '0.28rem',
                                                       margin: '0px 0.2rem'
                                                   }}>在线支付</Button></div>
                    <div style={{flex: 1}}><Button type='primary' onClick={() => this.selectPayType(2)} style={{
                        background: '#f1a325',
                        borderColor: '#f1a325',
                        height: '0.6rem',
                        lineHeight: '0.6rem',
                        fontSize: '0.28rem',
                        margin: '0px 0.2rem'
                    }}>货到付款</Button></div>
                </Flex>
                {/*<Item></Item>*/}
                {/*<Item></Item>*/}
                <Item><Button type='ghost' onClick={() => Popup.hide()} style={{
                    borderColor: '#00a9e0',
                    color: '#00a9e0',
                    height: '0.6rem',
                    lineHeight: '0.6rem',
                    fontSize: '0.28rem',
                    margin: '0px 0.2rem'
                }}>取消</Button></Item>
            </List>
        </div>, {animationType: 'slide-up'})
    }

    onClickSelectedAddress = () => {
        this.props.router.push(`/address`);
    }

    onClickCoupon = () => {
        if (this.props.order.couponCount == 0) {
            return;
        }
        this.props.router.push(`/coupon/${this.props.params.cartId}`);
    }

    onClickInvoice = (invoiceShow) => {
        console.log(invoiceShow)
        let invContent = 1
        if (invoiceShow != '不开发票') {
            invContent = 2
        } else {
            invContent = 1
        }
//  this.props.router.push('/invoice/${invoiceShow,invContent}');
        this.props.router.push(`/invoice/${invoiceShow}/${invContent}`);
    }

    onChangePd = (checked) => {
        // 刷新价格显示
        const {paytype, couponId, selectedAddress, cartId, cartVoList} = this.props.order;
        const isPd = checked ? 1 : 0;
        const freight = cartVoList.map(cart => {
            return cart.selectedShip + "|" + cart.storeId;
        })
        orderApi.getPrice({
            cartIds: cartId,
            cityId: selectedAddress.cityId,
            freight: freight.join(),
            couponId,
            isPd
        }).then(r => {
            const priceData = r.data[0];
            this.props.dispatch({
                type: 'changePd',
                payload: {
                    priceData,
                    isPd
                }
            })
        })
    }

    updateShip = ({storeId, shipType}) => {
        this.props.dispatch({
            type: 'updateShip',
            payload: {
                storeId,
                shipType
            }
        })

        const {
            isPd,
            cartId,
            selectedAddress,
            couponId,
            cartVoList
        } = this.props.order;

        const freight = cartVoList.map(cart => {
            return cart.selectedShip + "|" + cart.storeId;
        })

        orderApi.getPrice({
            cartIds: cartId,
            cityId: selectedAddress.cityId,
            isPd,
            freight: freight.join(),
            couponId
        }).then(r => {
            const priceData = r.data[0];
            this.props.dispatch({
                type: 'getPrice',
                payload: {priceData, freight: freight.join()}
            })
        })

    }

    updateRemark = (value) => {
        this.props.dispatch({
            type: 'updateRemark',
            payload: {remark:value}
        })
    }

    componentDidMount() {
        console.log(1);
        const {isPd, freight, paytype, couponId, isInit} = this.props.order;
        console.log(isInit);
        if (!isInit) {
            return;
        }
        console.log(2);
        const cartId = this.props.params.cartId;
        console.log(cartId);
        orderApi.subToOrder({cartId}).then(result => {
            if (result.result == 1) {
                const data = result.data[0];
                // console.log(data);

                if (data.addressList && data.addressList.length > 0) {
                    let currentSelectedAddress = data.addressList[0];
                    orderApi.addShipping({
                        cartIds: cartId,
                        cityId: currentSelectedAddress.cityId
                    }).then(r => {
                        if (result.result == 1) {
                            // this.props.dispatch({
                            //   type: 'addShipping',
                            //   payload: r.data[0]
                            // })
                            this.props.dispatch({
                                type: 'init',
                                payload: data,
                                cartId,
                                shipData: r.data[0]
                            })
                            const goods=data.cartVoList[0];
                            this.setState({
                                imgUrl: common.IMAGE_DOMAIN+goods.list[0].goodsImages
                            })
                            const freight = [];
                            if (r.data && r.data[0]) {
                                const keys = Object.keys(r.data[0])
                                keys.map(storeId => {
                                    const shipObj = r.data[0][storeId]
                                    const freightItem = Object.keys(shipObj)[0] + "|" + storeId
                                    freight.push(freightItem)
                                })
                            }

                            // TDOO: 获取默认物流信息,是否使用余额
                            // console.log(result.data[0]);
                            // console.log(r.data[0]);

                            orderApi.getPrice({
                                cartIds: cartId,
                                cityId: currentSelectedAddress.cityId,
                                isPd,
                                freight: freight.join(),
                                couponId
                            }).then(r => {
                                const priceData = r.data[0];
                                this.props.dispatch({
                                    type: 'getPrice',
                                    payload: {priceData, freight: freight.join()}
                                })
                            })

                        } else {
                            Toast.fail(result.msg);
                        }
                    })
                } else {
                    this.props.dispatch({
                        type: 'addCart',
                        cartId,
                    })
                    Toast.info('您没有收货地址，请添加收货地址！', 1, () => {
                        // this.props.router.push('/address');
                        this.onClickSelectedAddress();
                    })
                }
            }
        })
    }

    render() {
        const {
            cartVoList,
            selectedAddress,
            couponCount,
            memberAvailable,
            priceData,
            shipData,
            isPd,
            paytype,
            invoice,
            remark
        } = this.props.order;
        // const { getFieldProps } = this.props.form;
        let couponShow = couponCount > 0 ? `${couponCount}张优惠券` : '无可用优惠券';
        if (priceData.couponPrice != '0.0') {
            couponShow = `¥${priceData.couponPrice}`
        }
        let invoiceShow = '不开发票'
        // 已填写发票，并且选择的是明细
        if (invoice && invoice.invId && invoice.invContent == 2) {
            invoiceShow = invoice.invTitle
        }
        return <div className='wx-order'>
            <div className='fix-scroll hastitle' style={{paddingBottom: '1.1rem'}}>
                <List className="order-list-content">
                    <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                    <Item onClick={this.onClickSelectedAddress}
                          arrow="horizontal"
                          multipleLine
                          style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) 0px bottom /100% 8px no-repeat'}}>
                        {
                            selectedAddress ? <div style={{padding: '0.2rem 0px'}}>
                                <Flex justify="between">
                                    <Flex.Item style={{flex: 0.2}}>
                                        <img src="./assets/img/weiqing/dizhi-01@2x.png"
                                             style={{width: '25px', height: '35px'}}/>
                                    </Flex.Item>
                                    <Flex.Item style={{flex: 3, marginLeft: '0px'}}>
                                        <span>{selectedAddress.trueName} &nbsp;&nbsp;{selectedAddress.mobPhone}</span>
                                        <Brief>{selectedAddress.areaInfo} {selectedAddress.address}</Brief>
                                    </Flex.Item>
                                </Flex>
                            </div> : '请选择地址'
                        }
                    </Item>
                </List>
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                {
                    cartVoList.map((shop, index) => {
                        return <Shop updateShip={this.updateShip} key={index} data={shop}  updateImg={this.updateImg}></Shop>
                    })
                }
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                <List>
                    <Item
                        onClick={this.onSelectPayTypeClick}
                        arrow="horizontal"
                        extra={paytype == 1 ? '在线支付' : '货到付款'}
                    >
                        支付方式
                    </Item>
                    <Item
                        onClick={this.onClickCoupon}
                        arrow="horizontal"
                        extra={couponShow}
                    >
                        优惠券
                    </Item>
                    {/*<Item
                     extra={<div><Switch checked={isPd == 1} onChange={this.onChangePd} /></div>}
                     >余额支付</Item>
                     <Item
                     extra={memberAvailable}
                     >&nbsp;</Item>*/}
                    <Item
                        onClick={() => this.onClickInvoice(invoiceShow)}
                        arrow="horizontal"
                        extra={invoiceShow}
                    >
                        发票信息
                    </Item>
                    <InputItem
                        clear
                        placeholder="给商家留言"
                        autoFocus
                        className="inputitem"
                        onChange={this.updateRemark}
                    >买家留言</InputItem>

                </List>
                <WhiteSpace></WhiteSpace>
                <Flex>
                    <Flex.Item style={{flex: 2.5, borderRight: '1px solid #ddd'}}>
                        <List className="extrared">
                            <Item extra={`¥${priceData.totalGoodsPrice}`}>商品总额</Item>
                            <Item extra={`+ ¥${priceData.totalFreight}`}>运费</Item>
                            {/*<Item extra={`- ¥${priceData.predepositAmount}`}>余额支付</Item>*/}
                            <Item extra={`- ¥${priceData.couponPrice}`}>抵用券</Item>
                            <Item extra={`- ¥${priceData.conditionPrice}`}>优惠促销</Item>
                        </List>
                    </Flex.Item>

                </Flex>

                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                {/*<Flex>
                 <Flex.Item style={{ background:'#fff',padding:'0.3rem 0.26rem',width:'100%',marginLeft:'0px'}}>
                 <div className="order_all">
                 <div className="order_all_price" onClick={()=>console.log(priceData)}>合计： <span style={{fontSize:'0.28rem',color:'#e2536b'}}>{`¥${priceData.totalPrice}`}</span></div>
                 <div className="order_all_data" >下单时间：2017-7-2 12:35:56</div>
                 </div>
                 </Flex.Item>
                 </Flex>*/}

            </div>
            <OrderBar onSubmitOrder={this.onSubmitOrder}  onGoToFriend={this.onSubmitOrderFriend}   totalPrice={priceData.totalPrice}></OrderBar>
        </div>
    }
}

function mapStateToProps({order}) {
    return {order};
}

export default withRouter(connect(mapStateToProps)(Order));
