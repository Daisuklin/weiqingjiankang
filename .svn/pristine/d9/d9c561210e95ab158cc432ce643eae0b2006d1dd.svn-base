/*
 * 朋友代付
 * */
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Button,
    List,
    Modal,
    ActionSheet
} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './cashiercom.less'
import * as orderApi from '../api/order';

const Item = List.Item;
const prompt = Modal.prompt;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


class FriendsPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInit: false,
            payInfo: {}
        };
    }

    componentDidMount() {
        orderApi.getOrderPay({
            paySn: this.props.params.orderCode
        }).then(result => {
            if (result.result == 1) {
                this.setState({
                    isInit: true,
                    payInfo: result.data[0]
                })
            }
        })
    }


    gotoPay = () => {
        localStorage.setItem('friendPay',location.href);
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23642d83b743fbf5&redirect_uri=' + encodeURIComponent('http://mall.vitaqin.com/mall/payment.html#/payConfirm/' + this.props.params.orderCode + '/' + this.props.params.totalPrice) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
        //跳到确认支付页面
        this.props.router.push(`/payConfirm/${this.props.params.orderCode}/${this.state.payInfo.payAmount}`);
    }

    render() {
        if (!this.state.isInit) {
            return null
        }
        const {orderPay} = this.state.payInfo;
        const buyerName = orderPay.orderList[0].buyerName;
        return <div className="wx-FriendsPay">
            <div style={{backgroundColor: '#fff', paddingBottom: '0.2rem', marginBottom: '0.3rem'}}>
                <div className="FriendsPay_header_product">我在卫青健康挑好了商品，是时候该你仗义疏财了，快来帮我付个款吧~</div>
                <div className="FriendsPay_content">
                    <div className="FriendsPay_bg"
                         style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) center center / 100% 100%'}}></div>
                    <div className="FriendsPay_user">
                        <div className="FriendsPay_user_header">代付金额</div>
                        <div className="FriendsPay_user_payNum"><span
                            style={{fontSize: '0.3rem'}}>￥</span>{parseFloat(this.state.payInfo.payAmount).toFixed(2)}
                        </div>
                        <div className="FriendsPay_user_consignee">
                            购买人：**{buyerName.substring(buyerName.length - 1, buyerName.length)}</div>
                    </div>
                    <div className="FriendsPay_bg"
                         style={{background: 'url(./assets/img/weiqing/dizhi-02@2x.png) center center / 100% 100%'}}></div>
                </div>
                <div className="FriendsPay_button">
                    {
                        this.state.payInfo.paymentState ==1? <div><Button  style={{
                            fontSize: '0.3rem',
                            background: '#939a9a',
                            borderColor: '#939a9a',
                            color: '#fff'
                        }}>已支付成功</Button></div>: <div><Button onClick={this.gotoPay} style={{
                            fontSize: '0.3rem',
                            background: '#f3302e',
                            borderColor: '#f3302e',
                            color: '#fff'
                        }}>豪爽支付</Button></div>
                    }
                    <div className="FriendsPay_Explain">
                        <div className="FriendsPay_Explain_title">说明</div>
                        <div className="FriendsPay_Explain_list">1.付款前务必和好友再次确认，避免是诈骗行为；</div>
                        <div className="FriendsPay_Explain_list">2.如果发生退款，钱将退还到你的微信账户里。</div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: '#fff', paddingBottom: '0.2rem'}}>
                <div className="payment_information">
                    <div className="payment_information_top">代付订单信息</div>
                    {
                        orderPay.orderList.map((item, index) => {
                            return <Flex key={index}>
                                {
                                    item.orderGoodsList.map((orderGoods, orderGoodsIndex) => {
                                        return       <Flex key={orderGoodsIndex}>
                                            <div style={{flex: 1}}><Img src={orderGoods.goodsImage}
                                                                        style={{width: '1.62rem', height: '1.62rem'}}/>
                                            </div>
                                            <div style={{flex: 2.5}}>
                                                <div className="payment_information_title"
                                                     key={orderGoodsIndex}>{orderGoods.goodsName}</div>
                                                <div className="payment_information_price">
                                                    <span>￥{parseFloat(orderGoods.goodsPayPrice).toFixed(2)}</span><span
                                                    style={{paddingLeft: '0.3rem'}}>x{orderGoods.goodsNum}</span></div>
                                            </div>
                                        </Flex>
                                    })
                                }
                            </Flex>
                        })
                    }
                </div>

            </div>


        </div>
    }
}

export default withRouter(FriendsPay);
