import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex
} from 'antd-mobile';
import * as orderApi from '../../api/order';

class ReturnDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      returnDetail: null
    }
  }

  componentDidMount() {
    const refundId = this.props.params.refundId;
    orderApi.returnDetail({
      refundId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          returnDetail: result.data[0]
        })
      }
    })
  }

  render() {
    const { returnDetail } = this.state
    if (!returnDetail) {
      return null;
    }
    // const { refundState, goodsState, sellerState } = returnDetail;
      const { refundType, sellerState, refundState, goodsState } = returnDetail;
    let refundStateShow = '';
      if(refundType == 1){
          //退款
          if(sellerState==2){
              //为待管理员处理
              if(refundState == 1){
                  refundStateShow = '未申请';
              }else if(refundState == 2){
                  refundStateShow = '卖家已同意';
              }else{
                  refundStateShow = '已完成';
              }
          }else if(sellerState == 1){
              //未申请状态
              refundStateShow = '待管理员处理';
          }else{
              refundStateShow = '卖家拒绝申请';
          }
      }else{
          //退货
          if(sellerState==2){
              //为待管理员处理
              if(goodsState == 1){
                  refundStateShow = '买家待发货';
              }else if(goodsState == 2){
                  refundStateShow = '卖家待收货';
              }else if(goodsState == 3){
                  refundStateShow = '未收到';
              }else{
                  refundStateShow = '退换完成';
              }
          }else if(sellerState == 1){
              //未申请状态
              refundStateShow = '待管理员处理';
          }else{
              refundStateShow = '卖家拒绝申请';
          }
        /**/
      }
    /*if (refundState == 3) {
      refundStateShow = '已完成'
    } else {
      if (sellerState == 2 && goodsState == 1) {
        refundStateShow = '商家同意退款'
      } else {
        refundStateShow = '进行中'
      }
    }*/
    return (
      <div className='fix-scroll' style={{paddingTop:'0.9rem'}}>
      <WingBlank >
        <WhiteSpace></WhiteSpace>
        <div>
          退款金额 <span style={{color:'red'}}>【{`￥${returnDetail.refundAmount}`}】</span>  
        </div>
        <Flex justify='between'>
          <p>
            付款支付实物: {returnDetail.refundAmount}
          </p>
          <p style={{ color: 'red' }}>{refundStateShow}</p>  
        </Flex>
        <p style={{color:'red'}}>
          提示：卫青在线商城会将您的支付款退回到对应的支付账户内，注意查收。感谢您的理解和支持
        </p>
        <p>
          差额原因: {returnDetail.reasonInfo==''?'其他':returnDetail.reasonInfo}  
        </p>
        <p>
          退款申请时间: {returnDetail.createTimeStr} 
        </p>
        <p  style={{color:'red'}}>
          退款状态: {refundStateShow} 
        </p>
      </WingBlank >
      </div>
    )
  }
}

export default withRouter(ReturnDetail);
