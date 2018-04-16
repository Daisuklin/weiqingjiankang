import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    InputItem,
    Flex,
    Button,
    List,
    Switch,
    Popup
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import ShopSpell from '../components/ShopSpell';
import Fee from '../components/Fee';
import SpellOrderBar from '../components/SpellOrderBar';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import './spellOrder.less';

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
            <List renderHeader={() => '选择支付方式'}>
                <Item><Button type='primary' onClick={() => this.selectPayType(1)}>在线支付</Button></Item>
                <Item><Button type='primary' onClick={() => this.selectPayType(2)}>货到付款</Button></Item>
                <Item><Button type='ghost' onClick={()=>Popup.hide()}>取消</Button></Item>
            </List>
        </div>, { animationType: 'slide-up' })
    }

    onClickSelectedAddress = () => {
        this.props.router.push('/address');
    }

    onClickCoupon = () => {
        if (this.props.order.couponCount == 0) {
            return;
        }
        this.props.router.push(`/coupon/${this.props.params.cartId}`);
    }

    onClickInvoice = (invoiceShow) => {
        console.log(invoiceShow)
        let invContent=1
        if(invoiceShow!='不开发票'){
            invContent=2
        }else{
            invContent=1
        }
//  this.props.router.push('/invoice/${invoiceShow,invContent}');
        this.props.router.push(`/invoice/${invoiceShow}/${invContent}`);
    }

    onChangePd = (checked) => {
        // 刷新价格显示
        const { paytype, couponId, selectedAddress, cartId, cartVoList } = this.props.order;
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
    showShipSelect = () => {
        const { data } = this.props;
        let showShip = null;
        if (!data || !data.shipPrice) {
            return;
        }

        let keys = Object.keys(data.shipPrice);
        const BUTTONS = Object.keys(data.shipPrice).map((key, index) => {
            if (key == 'kd') {
                return '快递'
            } else if (key == 'py') {
                return '平邮'
            } else {
                return '其他'
            }
        })
        BUTTONS.push('取消')

        console.log(keys);

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                maskClosable: true,
            },
            (buttonIndex) => {
                console.log(buttonIndex);
                if (buttonIndex == BUTTONS.length - 1) {
                    return;
                }
                this.props.updateShip({
                    storeId: data.storeId,
                    shipType: keys[buttonIndex]
                })
            });
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
        const { data } = this.props;
        console.log(data);
        console.log(12);
        let showShip = null;
        if (data && data.shipPrice) {
            const shipPrice = data.shipPrice;
            const selectedShip = data.selectedShip;
            if (shipPrice && Object.keys(shipPrice).length > 0) {
                if (selectedShip == 'kd') {
                    showShip = '快递:' + shipPrice[selectedShip]
                } else if (selectedShip == 'py') {
                    showShip = '平邮:' + shipPrice[selectedShip]
                } else {
                    // showShip = '';
                }
            } else {
                showShip = '免运费'
            }
        }
        return <div className='wx-order'>
            <div className='fix-scroll hastitle' style={{paddingBottom:'1.1rem'}}>
                <List>
                    <Item onClick={()=>console.log(selectedAddress)}
                          extra={<div><img src="./assets/img/weiqing/dengdaifukuan@2x.png" style={{width:'0.8rem',height:'0.92rem',paddingRight:'0.3rem'}}/></div>}
                          multipleLine>
                        <div style={{padding:'0.2rem 0px'}} className="item_list">
                                <Flex justify="between" >
                                    <Flex.Item style={{flex:3,marginLeft:'0px'}}>
                                        <span className="item_list_name">等待卖家付款</span>
                                        <div className="item_list_protime">请于28分35秒内付款，超时订单自动关闭</div>
                                    </Flex.Item>
                                </Flex>
                            </div>
                    </Item>

                    <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                    <Item onClick={this.onClickSelectedAddress}
                          arrow="horizontal"
                          multipleLine>
                        {
                            selectedAddress ?<div style={{padding:'0.2rem 0px'}}>
                                <Flex justify="between" >
                                    <Flex.Item style={{flex:0.2}}>
                                        <img src="./assets/img/weiqing/dizhi-01@2x.png" style={{width:'25px',height:'35px'}}/>
                                    </Flex.Item>
                                    <Flex.Item style={{flex:3,marginLeft:'0px'}}>
                                        <span>{selectedAddress.trueName} &nbsp;&nbsp;{selectedAddress.mobPhone}</span>
                                        <Brief>{selectedAddress.areaInfo} {selectedAddress.address}</Brief>
                                    </Flex.Item>
                                </Flex>
                            </div>: '请选择地址'
                        }
                    </Item>
                </List>
                <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                {
                    cartVoList.map((shop, index) => {
                        return <ShopSpell updateShip={this.updateShip} key={index} data={shop}></ShopSpell>
                    })
                }
                <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                <List className="spellOrder_list">
                    <Item className="spellOrder_list_input"
                        extra={<div><InputItem  placeholder="选填对本次交易的说明" clear></InputItem></div>}
                    >
                        买家留言
                    </Item>
                    <Item
                        onClick={this.onSelectPayTypeClick}
                        arrow="horizontal"
                        extra={paytype==1?'在线支付':'货到付款'}
                    >
                        支付方式
                    </Item>
                    <Item onClick={this.showShipSelect} extra={showShip}>配送信息</Item>
                    <Item
                        onClick={()=>this.onClickInvoice(invoiceShow)}
                        arrow="horizontal"
                        extra={invoiceShow}
                    >
                        发票信息
                    </Item>

                </List>
                <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                <Flex direction="column" >
                    <Flex.Item style={{borderRight: '1px solid #ddd',width:'100%'}}>
                        <List className="extrared">
                            <Item extra={`¥${priceData.totalGoodsPrice}`}>商品总价</Item>
                            <Item extra={`+ ¥${priceData.totalFreight}`}>运费</Item>
                        </List>
                    </Flex.Item>
                    <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                    <Flex.Item style={{ background:'#fff',padding:'0.3rem 0.26rem',width:'100%',marginLeft:'0px'}}>
                        <div className="order_all">
                            <div className="order_all_price" onClick={()=>console.log(priceData)}>合计： <span style={{fontSize:'0.28rem',color:'#e2536b'}}>{`¥${priceData.totalPrice}`}</span></div>
                            <div className="order_all_data" >下单时间：2017-7-2 12:35:56</div>
                        </div>
                    </Flex.Item>
                </Flex>
            </div>
            <SpellOrderBar onSubmitOrder={this.onSubmitOrder} totalPrice={priceData.totalPrice}></SpellOrderBar>
        </div>
    }
}

function mapStateToProps({ order }) {
    return { order };
}

export default withRouter(connect(mapStateToProps)(Order));
