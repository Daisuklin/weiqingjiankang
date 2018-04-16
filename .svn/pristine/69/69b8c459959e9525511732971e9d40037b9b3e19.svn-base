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
import {Img} from 'commonComponent';
import * as bargainApi from '../api/bargainApi';
import {common} from 'common';
import Shop from '../components/Shop';
import OrderBar from '../components/OrderBar';
import {createForm} from 'rc-form';

const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;

import './order.less';

class barginOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remark: '',
            isDisabled:false
        }
    }

    submitOrder = () => {
        // 提交订单
        const {
            selectedAddress,
            invoice,
            bargainId
        } = this.props.barginOrder;
        bargainApi.bargainOrder({
            addressId: selectedAddress.addressId,
            bargainId: bargainId,
            remark: this.state.remark,
            invoiceId: invoice ? invoice.id : null
        }).then(result => {
            if (result.result == 1) {
                // Toast.success("提交订单成功！")
                const orderPay=result.data.orderPay;
                window.location.href='/mall/payment.html#/cashierList/'+orderPay.paySn+'/'+orderPay.payAmount;
            } else {
                this.setState({
                    isDisabled : false
                });
                Toast.fail(result.msg);
            }
        });
    }

    onSubmitOrder = () => {
        if(this.state.isDisabled){
            return
        }
        this.setState({
            isDisabled : true
        });
        // 提交订单
        const {
            selectedAddress
        } = this.props.barginOrder;
        // 验证数据
        if (!selectedAddress) {
            Toast.fail('请先选择收货地址');
            return;
        }
        this.submitOrder();
    }

    onClickSelectedAddress = () => {
        this.props.router.push('/address');
    }

    onClickInvoice = (invoiceShow) => {
        console.log(invoiceShow)
        let invContent = 1
        if (invoiceShow != '不开发票') {
            invContent = 2
        } else {
            invContent = 1
        }
        this.props.router.push(`/invoice/${invoiceShow}/${invContent}`);
    }

    updateShip = () => {
        const {
            selectedAddress,
            specId
        } = this.props.barginOrder;

        bargainApi.getFree({
            cityId: selectedAddress.cityId,
            specId: specId,
            goodsNum: 1
        }).then(success => {
            if (success.result == 1) {
                const free = success.shippingFee;
                this.props.dispatch({
                    type: 'addShipping',
                    payload: {
                        freight: free,
                        goodsPrice: this.props.barginOrder.goodsPrice
                    }
                })
            }
        })

    }

    remarkChange = (value) => {
        this.setState({
            remark: value
        })
    }

    componentDidMount() {
        const bargainId = this.props.params.bargainId;
        bargainApi.bargainPurchase({bargainId: bargainId}).then(result => {
            if (result.result == 1) {
                const data = result.data;
                this.props.dispatch({
                    type: 'init',
                    payload: data
                })
                if (data.addressList && data.addressList.length > 0) {
                    let currentSelectedAddress = data.addressList[0];
                    bargainApi.getFree({
                        cityId: currentSelectedAddress.cityId,
                        specId: data.specId,
                        goodsNum: 1
                    }).then(success => {
                        if (success.result == 1) {
                            const free = success.shippingFee;
                            this.props.dispatch({
                                type: 'addShipping',
                                payload: {
                                    freight: free,
                                    goodsPrice: this.props.barginOrder.goodsPrice
                                }
                            })
                        }
                    })
                }
            }
        })
    }

    render() {
        const {
            selectedAddress,
            priceData,
            freight,
            invoice,
            goods,
            totalPrice,
            goodsPrice,
            isInit

        } = this.props.barginOrder;
        if (isInit) {
            return null;
        }
        let invoiceShow = '不开发票'
        // 已填写发票，并且选择的是明细
        if (invoice && invoice.invId && invoice.invContent == 2) {
            invoiceShow = invoice.invTitle
        }
        console.log(goods)
        return <div className='wx-order'>
            <div className='fix-scroll hastitle' style={{paddingBottom: '1.1rem'}}>
                <List className="order-list-content">
                    <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                    <Item onClick={this.onClickSelectedAddress}
                          arrow="horizontal"
                          multipleLine
                          style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) 0px bottom / 100% 8px no-repeat'}}>
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
                <List className='wx-order-shop'>
                    <Item onClick={() => {
                        common.gotoGoodsDetail({specId: goods.specId})
                    }} arrow="horizontal" multipleLine
                          style={{padding: '0.2rem 0rem 0.2rem 0.26rem', borderBottom: '1px solid #e5e5e5'}}>
                        <Flex>
                            <Img src={goods.goodsImage} style={{height: '2rem', width: '2rem'}}/>
                            <div className="shop-list-box">
                                <div className="shop_name">{goods.goodsName}</div>
                                <div style={{fontSize: '0.26rem', color: '#666'}}>数量: {goods.goodsNumber}</div>
                                <div style={{color: '#e9331e', fontSize: '0.3rem'}}>¥{goods.bargainPrice}</div>
                            </div>
                        </Flex>

                    </Item>
                </List>
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                <List>
                    <Item arrow="horizontal" extra={ '在线支付'}>
                        支付方式
                    </Item>
                    <Item onClick={() => this.onClickInvoice(invoiceShow)} arrow="horizontal" extra={invoiceShow}>
                        发票信息
                    </Item>
                    <InputItem
                        clear
                        placeholder="给商家留言"
                        autoFocus
                        className="inputitem"
                        value={this.state.remark}
                        onChange={this.remarkChange}>买家留言</InputItem>

                </List>
                <WhiteSpace></WhiteSpace>
                <Flex>
                    <Flex.Item style={{flex: 2.5, borderRight: '1px solid #ddd'}}>
                        <List className="extrared">
                            <Item extra={`¥ ${goodsPrice}`}>商品总额</Item>
                            <Item extra={`¥ ${goods.shippingFee}`}>运费</Item>
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
            <OrderBar onSubmitOrder={this.onSubmitOrder} totalPrice={totalPrice}></OrderBar>
        </div>
    }
}

function mapStateToProps({barginOrder}) {
    return {barginOrder};
}

export default withRouter(connect(mapStateToProps)(barginOrder));
