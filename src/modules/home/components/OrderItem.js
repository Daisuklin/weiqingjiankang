import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

class OrderItem extends Component {
//未付款时取消订单
  cancelOrder = (orderItem) => {
    Modal.alert('提示', '是否取消订单', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.cancleorder({
            ordersn: orderItem.orderSn
          }).then(result => {
            if (result.result == 1) {
              // 取消成功
              if (this.props.cancelOrder) {
                this.props.cancelOrder();
                console.log(this.props)
                window.location.reload();
              }
            }
          })
        }
      },
    ]);
  }

  gotoPay = (orderItem) => {
    const { orderSn, orderTotalPrice } = orderItem;
    // common.gotoPay({
    //   paySn,
    //   orderTotalPrice
    // })
      window.location.href='/mall/payment.html#/cashierList/'+ orderSn +'/'+orderTotalPrice;
  }

  gotoComment = (orderItem) => {
    this.props.router.push({
      pathname: '/commentList',
      state: {
        orderItem
      }
    })
  }

  // 确认订单
  finishorder = (orderItem) => {
    Modal.alert('提示', <div style={{padding:'0.1rem 0rem'}}>是否确认收货</div>, [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.finishorder({
            ordersn: orderItem.orderSn
          }).then(result => {
            if (result.result == 1) {
              this.props.finishorder();
            }
          })
        }
      }
    ]);
  }

  gotoOrderDetail = (goods) => {
    this.props.router.push('/orderDetail/' + goods.orderId)
  }

  gotoDelivery = (orderItem) => {
      this.props.router.push({
          pathname: '/viewLogistics',
          state: {
              orderItem
          }
      })
    // const shippingCode = dataItem.shippingCode;
    // const timestamp = new Date().getTime();
    // const shippingExpressCode = dataItem.shippingExpressCode;
    //   this.props.router.push('/viewLogistics/'+ shippingCode + '/'+ shippingExpressCode )
    // const url = `http://wap.kuaidi100.com/wap_result.jsp?rand=${timestamp}&id=${shippingExpressCode}&fromWeb=null&postid=${shippingCode}`
    // window.location.href = url
  }
  //已付款之后取消订单
    cancelPayOrder = (orderItem) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                orderItem,
                type: 1 // type 1代表取消订单
            }
        })
    }

  render() {
    const { dataItem } = this.props;
    let orderStatus = '';
    let showCancelBtn = false;
      let showCancelBtn2 = false;
    let showPayBtn = false;
    let showCommentBtn = false;
    // 确认收货
    let showCompleteBtn = false;
    // 查看物流
    let showViewDeleveryBtn = false;
console.log(dataItem.orderState)
    switch (dataItem.orderState) {
      case 0:
        orderStatus = '已取消'
        break;
      case 10:
        orderStatus = '待支付'
        showCancelBtn = true;
        showPayBtn = true;
        break;
      case 15:
         orderStatus = '已支付'
         showCancelBtn2 = true;
         break;
      case 20:
        if(dataItem.lockState == 1){
            orderStatus = '退款申请中'
        }else{
            orderStatus = '等待发货'
            showCancelBtn2 = true;
        }
        break;
      case 30:
        orderStatus = '待收货'
        showViewDeleveryBtn = true;
        showCompleteBtn = true;
        break;
      case 40:
        orderStatus = '已完成'
        if (dataItem.evaluationStatus != 1) {//判断是否评价
          showCommentBtn = true;
        }else{
            orderStatus = '已评价'
        }
        break;
      case 50:
        orderStatus = '已提交'
        showCancelBtn = true;
        break;
      case 60:
        orderStatus = '待发货'
        break;
      default:
        break;
    }
    return <div className='orderitem'>
      <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
      <div style={{backgroundColor:'#fff'}}>
        <Flex justify='between' style={{padding:'0.23rem 0.26rem',borderBottom:'1px solid #e5e5e5'}}>
          <div style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/dianpu-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.1rem',position:'relative',top:'0.03rem'}}/>{dataItem.storeName}</div>
          <div className="paystaus" style={{color:'#00a9df',fontSize:'0.24rem'}}>{orderStatus}</div>
        </Flex>
        {
          dataItem.orderGoodsList.map((goods,index) => {
            return<div style={{borderBottom:'1px solid #e5e5e5'}} key={index}>
              <Flex key={goods.specId} onClick={()=>this.gotoOrderDetail(goods) } style={{padding:'0.2rem 0.26rem'}}>
                <div style={{width: '1.62rem',height:'1.62rem'}}>
                  <Img src={goods.goodsImage} style={{ width: '1.62rem',height:'1.62rem' }} />
                </div>
                <div style={{marginLeft:'0.2rem'}}>
                  <div style={{color:'#333',fontSize:'0.28rem',marginBottom:'0.15rem',maxHeight:'0.8rem',lineHeight:'0.38rem',overflow:'hidden'}}>{goods.goodsName}</div>
                  <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>{goods.specInfo}</div>
                  <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>数量：{goods.goodsNum}</div>
                  <div style={{color:'#e9321f',fontSize:'0.26rem'}}>{`￥${dataItem.goodsAmount}`}</div>
                </div>
              </Flex>
            </div>
          })
        }
        <WhiteSpace></WhiteSpace>
        <Flex justify='end' style={{padding:'0px 0.26rem'}}>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(dataItem)}
                type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
            }
              {
                  showCancelBtn2 && <Button
                      onClick={(e) => this.cancelPayOrder(dataItem)}
                      type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
              }
            {
              showPayBtn && <Button
                onClick={(e) => this.gotoPay(dataItem)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>去支付</Button>
            }
            {
              showCommentBtn && <Button
                onClick={(e) => this.gotoComment(dataItem)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>马上评价</Button>
            }
            {
              showViewDeleveryBtn && <Button
                onClick={(e) => this.gotoDelivery(dataItem)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>查看物流</Button>
            }
            {
              showCompleteBtn && <Button
                onClick={(e) => this.finishorder(dataItem)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>确认收货</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </div>
      {/*<WhiteSpace style={{ backgroundColor: '#ebebef' }}></WhiteSpace>*/}
    </div>
  }
}

export default withRouter(OrderItem);