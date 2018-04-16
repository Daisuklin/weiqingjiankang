/**
 * 积分商城兑换完成
 * Created by leimingtech-lhm on 2017/5/12.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Button,
    List,
    Switch,
    Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../order/api/order';
import { common } from 'common';
import ExchangeCompleteshop from '../components/ExchangeCompleteshop';
// import OrderBar from '../components/OrderBar';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import '../components/css/pointGoods.less'

class Order extends Component {
    constructor(props) {
        super(props);
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
            cartId
        } = this.props.order;
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
                // 货到付款，成功后跳转到货到付款提示页面
                if (paytype == 2) {
                    Toast.success(result.msg, 1, () => {
                        window.location.href = '/mall/home.html#/orderList/0';
                    });
                } else {
                    // 余额数大于 订单支付额
                    // console.log(priceData);
                    if (parseFloat(priceData.totalPrice) == 0) {
                        console.log('支付成功，跳转到成功页面');
                        this.props.router.replace('/paySuccess/' + result.data[0].paySn);
                    } else {
                        // 跳转到收银台
                        window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/'+result.data[0].paySn+'/'+priceData.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
                        this.props.router.replace(`/cashier/${result.data[0].paySn}/${priceData.totalPrice}`);
                    }
                }
            } else {
                Toast.fail(result.msg);
            }
        });
    }

    onSubmitOrder = () => {

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

        // 如果使用余额支付，弹出密码输入框，，否则跳到
        if (isPd == 1 && paytype == 1) {
            prompt(
                '请输入支付密码',
                '', [{ text: '取消' }, {
                    text: '提交',
                    onPress: passwd => {
                        orderApi.chkPasswd({ passwd }).then(result => {
                            if (result.result == 1) {
                                // 密码正确，继续提交订单
                                this.submitOrder();
                            } else {
                                Toast.fail(result.msg);
                            }
                        })
                    }
                }],
                'secure-text',
            )

        } else {
            // 在线支持 提交订单
            this.submitOrder();
        }
    }



    onClickSelectedAddress = () => {
        this.props.router.push('/address');
    }



    updateShip = ({ storeId, shipType }) => {
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
                payload: priceData
            })
        })

    }

    componentDidMount() {
        const { isPd, freight, paytype, couponId, isInit } = this.props.order;
        if (!isInit) {
            return;
        }
        const cartId = this.props.params.cartId;
        console.log(cartId);
        orderApi.subToOrder({ cartId }).then(result => {
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
                                    payload: priceData
                                })
                            })

                        } else {
                            Toast.fail(result.msg);
                        }
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
            invoice
        } = this.props.order;
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
            <div className='fix-scroll hastitle' style={{paddingBottom:'1.1rem'}}>
                {
                    cartVoList.map((shop, index) => {
                        return <ExchangeCompleteshop updateShip={this.updateShip} key={index} data={shop}></ExchangeCompleteshop>
                    })
                }
                <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                <Flex>
                    <Flex.Item>
                        <List className="extrared">
                            <Item extra={`${priceData.totalFreight}分`} className="span_integ">所需积分</Item>
                        </List>
                    </Flex.Item>
                </Flex>
            </div>
            {/*<OrderBar onSubmitOrder={this.onSubmitOrder} totalPrice={priceData.totalPrice}></OrderBar>*/}
            <div className='wx-orderbar-exchange'>
                <Flex style={{ width:'100%'}}>
                    <Flex.Item   style={{flex:2,textAlign:'right'}}>
                        <WingBlank ><Button  onClick={()=>this.onSubmitOrder()} className="orderbar-exchange-btn" style={{borderColor:'#e70012',color:'#fff',backgroundColor:'#e70012',borderRadius:'5px',}}>确定支付</Button></WingBlank>
                    </Flex.Item>
                </Flex>
            </div>
        </div>
    }
}

function mapStateToProps({ order }) {
    return { order };
}

export default withRouter(connect(mapStateToProps)(Order));
