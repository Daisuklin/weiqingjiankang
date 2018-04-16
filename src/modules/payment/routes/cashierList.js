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
import * as orderApi from '../api/order';
import {common} from 'common';
import './cashiercom.less'

const Item = List.Item;
const prompt = Modal.prompt;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}


class Cashier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 'none',
            clicked1: 'none',
            clicked2: 'none',
            payInfo: null
        };
    }

    componentDidMount() {
        orderApi.getOrderPay({
            paySn: this.props.params.orderCode
        }).then(result => {
            if (result.result == 1) {
                this.setState({
                    payInfo: result.data[0]
                })
            }
        })
    }

    gotoPay = (type) => {
        if (type == 1) {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23642d83b743fbf5&redirect_uri=' + encodeURIComponent('http://mall.vitaqin.com/mall/payment.html#/payConfirm/' + this.props.params.orderCode + '/' + this.props.params.totalPrice) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
            //跳到确认支付页面
            //this.props.router.push(`/payConfirm/${this.props.params.orderCode}/${this.props.params.totalPrice}`);

        } else if (type == 2) {
            orderApi.toAliH5pay({
                orderCode: this.props.params.orderCode
            }).then(r => {
                alert(r)
                if (r.result == 1) {
                    alert(1)
                } else {
                    alert(r.msg);
                }
            })
        } else if (type == 4) {
            console.log(this.props)
            prompt(
                '请输入支付密码',
                '', [{text: '取消'}, {
                    text: '提交',
                    onPress: passwd => {
                        if (passwd.length != 6) {
                            Toast.info('请输入六位数的密码');
                        } else {
                            orderApi.toBlance({
                                orderCode: this.props.params.orderCode,
                                payPassword: passwd
                            }).then(result => {
                                if (result.result == 1) {
                                    Toast.success("订单支付成功，共消费" + parseFloat(result.payAmount).toFixed(2) + "元", 2, () => {
                                        window.location.href = '/mall/payment.html#/paySuccess/' + this.props.params.orderCode;
                                    })
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
    }

    render() {
        if (this.state.payInfo == null) {
            return null
        }
        const IconClass = ({url}) => {
            return <div style={{
                width: '0.45rem',
                height: '0.45rem',
                background: `url(${url}) center center /  0.45rem 0.45rem no-repeat`,
                display: 'inline-block',
                marginRight: '0.1rem'
            }}
            />
        }

        const imgUrl = ['./assets/img/WechatIMG96.png',
            './assets/img/WechatIMG97.png',
            './assets/img/WechatIMG98.png',
            './assets/img/mine_order.png'
        ];
        let headerContent = '';
        // 充值订单
        if (this.props.params.orderCode.startsWith('R')) {
            headerContent = `充值金额为¥${this.state.payInfo.payAmount}`
        } else {
            // headerContent = `当前订单金额为¥${totalPrice}!`
            headerContent = () => {
                return <Flex justify="between">
                    <div style={{fontSize: '0.28rem', color: '#333'}}>订单金额</div>
                    <div style={{fontSize: '0.28rem', color: '#fc0301'}}>¥{this.state.payInfo.payAmount}</div>
                </Flex>
            }
        }
        return <List renderHeader={headerContent} className="cashier_list">
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <Item thumb={<IconClass url={imgUrl[0]}></IconClass>} arrow='horizontal' onClick={() => this.gotoPay(1)}
                  className="cashier_list_item">微信支付</Item>
            {
                !this.props.params.orderCode.startsWith('R')?<Item thumb={<IconClass url="./assets/img/weiqing/yuezhifu@2x.png"></IconClass>} arrow='horizontal'
                onClick={() => this.gotoPay(4)}>余额支付</Item>:null
            }


        </List>
    }
}

export default withRouter(Cashier);
