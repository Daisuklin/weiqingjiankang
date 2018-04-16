/*
* 订单之查看物流
* */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  Modal,
  WhiteSpace,
  WingBlank,
    Steps,
  Flex,
  Button,
  List,
    InputItem,
  Popup
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';
import { createForm } from 'rc-form';

const Item = List.Item;
const Step = Steps.Step;
import './viewLogistics.less';

class Order extends Component {
  constructor(props) {
    super(props);
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
    return <div className='wx-viewLogistics'>
      <div className='fix-scroll hastitle' style={{paddingBottom:'1.1rem'}}>
      <List>
        <div className="extrared_success">
          <Item
              onClick={this.onSelectPayTypeClick}
              extra={paytype==1?'在线支付':'货到付款'}
          >
            支付方式
          </Item>
          <Item extra={`¥${priceData.totalGoodsPrice}`}>承运人</Item>
          <Item extra={`+ ¥${priceData.totalFreight}`}>承运人电话</Item>
          <Item extra={`+ ¥${priceData.totalFreight}`}>订单编号</Item>
        </div>

      </List>
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
        <div style={{backgroundColor:'#fff',padding:'0.2rem 0.26rem'}}>
          <Steps size="small" current={1} className="viewLonistics">
            <Step title="Finished" description="This is description" />
            <Step title="In Progress" description="This is description" />
            <Step title="Waiting" description="This is description" />
          </Steps>

        </div>

      </div>  
    </div>
  }
}

function mapStateToProps({ order }) {
  return { order };
}

export default withRouter(connect(mapStateToProps)(Order));
