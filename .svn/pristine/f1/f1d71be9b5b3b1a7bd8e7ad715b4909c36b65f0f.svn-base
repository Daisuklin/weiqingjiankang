import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  InputItem,
  Button
} from 'antd-mobile';
import { createForm } from 'rc-form';
import * as memberApi from '../../api/member';
import { common } from 'common';
import './recharge.less';
import * as orderApi from '../../../payment/api/order';

const Item = List.Item;

class Recharge extends Component {

  state = {
    memberDetail: {
      availablePredeposit: '0.0'
    }
  }

  componentDidMount() {
    const { getFieldProps } = this.props.form;
    memberApi.memberDetail().then(result => {
      if (result.result == 1 && result.data && result.data.length > 0) {
        this.setState({
          memberDetail: result.data[0]
        });
      }
    })
  }

  next = () => {
    const getFieldsValue = this.props.form.getFieldsValue();
    if (!getFieldsValue.amount || getFieldsValue.amount == '') {
      Toast.info('请输入金额');
      return;
    }

    memberApi.recharge({
      amount: getFieldsValue.amount
    }).then(result => {
      console.log(result);
      if (result.result == 1 && result.data && result.data.length > 0) {
        // common.gotoPay({
        //   paySn: result.data[0].pdrSn,
        //   orderTotalPrice: result.data[0].pdrAmount
        // })

            let paySn=result.data[0].pdrSn;
            let orderTotalPrice=result.data[0].pdrAmount;

          // orderApi.getOrderPay({
          //     paySn: paySn
          // }).then(()=>{
          //     if (result.result == 1) {
          //       console.log(result);
                 // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/cashier/' + paySn + '/' + orderTotalPrice + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
                  // window.location.href = `order.html#/cashierList/${paySn}/${orderTotalPrice}`;

                //  window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5779f16d36f07efb&redirect_uri=http://testbbc.leimingtech.com/dist/order.html#/payConfirm/'+this.props.params.orderCode+'/'+this.props.params.totalPrice+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
                  //跳到确认支付页面
                  // this.props.router.push(`/payConfirm/${paySn}/${orderTotalPrice}`);
                  //home.html#/payConfirm/R20170707095445640/11.0

              // }else {
              //     console.log(result);
              // }
          //})
         // window.location.href = `order.html#/cashierList/${paySn}/${orderTotalPrice}`;
         //  window.location.href=`/mall/payment.html#/cashierList/${paySn}/${orderTotalPrice}`;
          window.location.href=`/mall/payment.html#/cashierList/${paySn}/${orderTotalPrice}`;

          //j
        //  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx23642d83b743fbf5&redirect_uri=' + encodeURIComponent('http://mall.vitaqin.com/mall/payment.html#/payConfirm/' + this.props.params.orderCode + '/' + this.props.params.totalPrice) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
          //跳到确认支付页面
         // this.props.router.push(`/payConfirm/${this.props.params.orderCode}/${this.props.params.totalPrice}`);



      } else {
        Toast.info(result.msg)
      }
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { memberDetail } = this.state;
    return (
      <div className="wx-recharge">
        <List>
          <InputItem
            {...getFieldProps('balance') }
            editable={false}
            value={`￥${memberDetail.availablePredeposit}`}
          >账户余额：</InputItem>
          <InputItem
            {...getFieldProps('amount')}  
            placeholder="请输入金额"
            autoFocus
            type='number'
          >充值金额:</InputItem>
          <Item style={{padding:'0.2rem 0.26rem'}}>
            <Button onClick={this.next} type='primary'style={{background:'#5491d2',borderColor:'#5491d2',fontSize:'0.28rem'}}>下一步</Button>
          </Item>
        </List>
      </div>
    )
  }
}

export default withRouter(createForm()(Recharge));
