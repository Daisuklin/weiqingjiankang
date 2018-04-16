/**
 * 积分商城确认兑换
 * Created by leimingtech-lhm on 2017/5/12.
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Map} from 'immutable';
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
import {Img} from 'commonComponent';
import * as orderApi from '../api/pointsGoods';
import {common, utils} from 'common';
import Shop from '../components/Shop';
import OrderBar from '../components/OrderBar';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import '../components/css/pointGoods.less'

class pointOrder extends Component {
    constructor(props) {
        super(props);
    }

    onSubmitOrder = () => {
        prompt(
            '请输入支付密码',
            '', [{text: '取消'}, {
                text: '提交',
                onPress: passwd => {
                    if (passwd.length != 6) {
                        Toast.info('请输入六位数的密码');
                    } else {
                        // 提交订单
                        const {
                            selectedAddress,
                            cartId
                        } = this.props.pointOrder;
                        // 验证数据
                        if (!selectedAddress) {
                            Modal.fail('请先选择收货地址');
                            return;
                        }
                        orderApi.placeOrder({
                            cartIds: cartId,
                            addressId: selectedAddress.addressId,
                            passwd:passwd
                        }).then(result => {
                            if (result.result) {
                                // window.location.href='/payment.html#/cashierList/'+result.paySn+'/'+result.payAmount;
                                Toast.success("兑换成功!")
                                window.location.href='payment.html#/payPointsSuccess/'+result.data[0].orderid
                            } else {
                                Toast.fail(result.msg);
                            }
                        })
                    }

                }
            }],
            'secure-text',
        )
    }

    onClickSelectedAddress = () => {
        this.props.router.push('/address');
    }

    ontoExchangeComplete = () => {
        this.props.router.push(`/redeemNow`);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.cartId != this.props.params.cartId) {
            const cartIds = this.props.params.cartId;
            orderApi.confirmationOfIntegralOrder({cartIds: cartIds}).then(result => {
                if (result.result == 1) {
                    const data = result.data[0];
                    this.props.dispatch({
                        type: 'init',
                        payload: data,
                        cartId: cartIds
                    })
                }
            })
        }
    }

    componentDidMount() {
        const cartIds = this.props.params.cartId;
        orderApi.confirmationOfIntegralOrder({cartIds: cartIds}).then(result => {
            if (result.result == 1) {
                const data = result.data[0];
                this.props.dispatch({
                    type: 'init',
                    payload: data,
                    cartId: cartIds
                })
            }
        })
    }

    render() {
        const {
            cartVoList,
            selectedAddress,
            totalPrice,
            isInit
        } = this.props.pointOrder;
        if (!isInit) {
            return null
        }
        return <div className='wx-order'>
            <div className='fix-scroll hastitle' style={{paddingBottom: '1.1rem'}}>
                <List style={{
                    background: 'url(./assets/img/weiqing/dizhi-02@2x.png) 0px bottom / 100% 8px no-repeat',
                    paddingBottom: '0.07rem'
                }}>
                    <Item onClick={this.onClickSelectedAddress}
                          arrow="horizontal"
                          multipleLine>
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
                        return <Shop updateShip={this.updateShip} key={index} data={shop}></Shop>
                    })
                }
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                <Flex>
                    <Flex.Item>
                        <List className="extrared">
                            <Item extra={`包邮`} style={{borderBottom: '1px solid #ddd'}}>配送费</Item>
                            <Item extra={totalPrice + `分`} className="span_integ">所需积分</Item>
                        </List>
                    </Flex.Item>
                </Flex>
            </div>
            <OrderBar onSubmitOrder={this.onSubmitOrder} totalPrice={totalPrice}
                      ontoExchangeComplete={this.ontoExchangeComplete} cartIds={this.props.params.cartId}></OrderBar>
        </div>
    }
}

function mapStateToProps({pointOrder}) {
    return {pointOrder};
}

export default withRouter(connect(mapStateToProps)(pointOrder));
