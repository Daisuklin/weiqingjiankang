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

    cancelOrder = (genePersonalCenter) => {
        Modal.alert('提示', '是否取消订单', [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    orderApi.cancleorder({
                        ordersn: genePersonalCenter.orderSn
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
  gotoPay = (genePersonalCenter) => {
    const { orderSn, orderAmount } = genePersonalCenter;
    common.gotoPay({
        paySn:orderSn,
        orderTotalPrice:orderAmount
    })
  }

  gotoComment = (orderItem) => {
    this.props.router.push({
      pathname: '/commentList',
      state: {
          orderItem
      }
    })
  }
    onqueryResult = () => {
        this.props.router.push('/queryResult/f8253ddd554d41a386acedbad9cad846');
    }
  // 确认订单
  finishorder = (genePersonalCenter) => {
    Modal.alert('提示', '是否确认收货', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.finishorder({
            ordersn: genePersonalCenter.orderSn
          }).then(result => {
            if (result.result == 1) {
              this.props.finishorder();
            }
          })
        }
      }
    ]);
  }

  gotoOrderDetail = (genePersonalCenter) => {
    this.props.router.push('/orderDetail/' + genePersonalCenter.orderId)
  }

  gotoDelivery = (genePersonalCenter) => {
    const shippingCode = genePersonalCenter.shippingCode;
    const timestamp = new Date().getTime();
    const shippingExpressCode = genePersonalCenter.shippingExpressCode;
    const url = `http://wap.kuaidi100.com/wap_result.jsp?rand=${timestamp}&id=${shippingExpressCode}&fromWeb=null&postid=${shippingCode}`
    window.location.href = url
  }

  render() {
    const { genePersonalCenter } = this.props;
    const { orderGoodsList } = genePersonalCenter;
    let orderStatus = '';
    let showCancelBtn = false;
      let showCancelBtn2 = false;
    let showPayBtn = false;
    let showCommentBtn = false;
    // 确认收货
    let showCompleteBtn = false;
    // 查看物流
    let showViewDeleveryBtn = false;
    console.log(genePersonalCenter);
    switch (genePersonalCenter.orderState) {
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
        orderStatus = '等待发货'
        // showCancelBtn = true;
          showCancelBtn2 = true;
        break;
      case 30:
        orderStatus = '待收货'
        showViewDeleveryBtn = true;
        showCompleteBtn = true;
        break;
      case 40:
        orderStatus = '已完成'
        if (genePersonalCenter.evaluationStatus != 1) {
          showCommentBtn = true;
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
        debugger
    }
    // console.log(orderGoodsList[0])
    return <div className='orderitem'>
      {/*<WhiteSpace></WhiteSpace>*/}
      <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
      <div style={{backgroundColor:'#fff'}}>
        <Flex justify='between' style={{padding:'0.28rem 0.26rem',borderBottom:'1px solid #e5e5e5'}}>
          <div style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/dianpu-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.1rem',position:'relative',top:'0.03rem'}}/>{genePersonalCenter.storeName}</div>
          <div className="paystaus" style={{color:'#00a9df',fontSize:'0.24rem'}}>{orderStatus}</div>
        </Flex>
          {
              genePersonalCenter.orderState == 10 ? <Flex justify='between' style={{padding:'0.28rem 0.26rem',borderBottom:'1px solid #e5e5e5'}} onClick={this.onqueryResult}>
                <div style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/daishouhuo-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.1rem',position:'relative',top:'0.03rem'}}/>寄送采集器进行中</div>
                <div className="paystaus" style={{color:'#00a9df',fontSize:'0.24rem'}}><img src="./assets/img/weiqing/youjiantou-01@2x.png"/></div>
              </Flex> : ''
          }
        <div>
          <div style={{borderBottom:'1px solid #e5e5e5'}}>
            <Flex onClick={()=>this.gotoOrderDetail(genePersonalCenter) } style={{padding:'0.2rem 0.26rem'}}>
              <div style={{width: '1.62rem',height:'1.62rem'}}>
                  { genePersonalCenter.orderGoodsList.length>0 ? <Img src={orderGoodsList[0].goodsImage} style={{ width: '1.62rem',height:'1.62rem' }} /> : ''}

              </div>
              <div style={{marginLeft:'0.2rem'}}>
                <div style={{color:'#333',fontSize:'0.28rem',marginBottom:'0.15rem',height:'0.64rem',lineHeight:'0.35rem',overflow:'hidden'}}>{orderGoodsList[0].goodsName}</div>
                  {/*<div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.1rem'}}>规格：500g</div>*/}
                <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>数量：{orderGoodsList[0].goodsNum}</div>
                <div style={{color:'#e9321f',fontSize:'0.26rem'}}>{`￥${orderGoodsList[0].goodsPreAmount}`}</div>
              </div>
            </Flex>
          </div>
        </div>
        <WhiteSpace></WhiteSpace>
        <Flex justify='end' style={{padding:'0px 0.26rem'}}>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(genePersonalCenter)}
                type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
            }
              {
                  showCancelBtn2 && <Button
                      onClick={(e) => this.cancelPayOrder(genePersonalCenter)}
                      type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
              }
            {
              showPayBtn && <Button
                onClick={(e) => this.gotoPay(genePersonalCenter)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline >去支付</Button>
            }
            {
              showCommentBtn && <Button
                onClick={(e) => this.gotoComment(genePersonalCenter)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>马上评价</Button>
            }
            {
              showViewDeleveryBtn && <Button
                onClick={(e) => this.gotoDelivery(genePersonalCenter)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>查看物流</Button>
            }
            {
              showCompleteBtn && <Button
                onClick={(e) => this.finishorder(genePersonalCenter)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>确认收货</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </div>
      {/*<WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>*/}
    </div>
  }
}

export default withRouter(OrderItem);
