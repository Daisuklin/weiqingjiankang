import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as crowdFundingApi from '../../home/api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

class CrowdFundingOrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderState:''

        }
    }

  cancelOrder = (crowdListOrder) => {
    Modal.alert('提示', '是否取消订单', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
            orderApi.cancleorder({
            ordersn: crowdListOrder.orderSn
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
    cancelPayOrder = (crowdListOrder) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                crowdListOrder,
                type: 1 // type 1代表取消订单
            }
        })
    }
  gotoPay = (crowdListOrder) => {
    const { orderSn, orderAmount } = crowdListOrder;
    common.gotoPay({
      paySn:orderSn,
      orderTotalPrice:orderAmount
    })
  }

  gotoComment = (crowdListOrder) => {
    this.props.router.push({
      pathname: '/commentList',
      state: {
          crowdListOrder
      }
    })
  }

  // 确认订单
  finishorder = (crowdListOrder) => {
    Modal.alert('提示', '是否确认收货', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.finishorder({
            ordersn: crowdListOrder.orderSn
          }).then(result => {
            if (result.result == 1) {
              this.props.finishorder();
            }
          })
        }
      }
    ]);
  }

  gotoOrderDetail = (crowdListOrder) => {
      window.location.href = /*common.SERVER_PATH+*/'/home.html#/orderDetail/'+ crowdListOrder.orderId;
      // window.location.href= common.SERVER_PATH + 'home.html#/orderDetail/'+ crowdListOrder.orderId;
    // this.props.router.push('/orderDetail/' + crowdListOrder.orderId)
  }

  gotoDelivery = (crowdListOrder) => {
    const shippingCode = crowdListOrder.shippingCode;
    const timestamp = new Date().getTime();
    const shippingExpressCode = crowdListOrder.shippingExpressCode;
    const url = `http://wap.kuaidi100.com/wap_result.jsp?rand=${timestamp}&id=${shippingExpressCode}&fromWeb=null&postid=${shippingCode}`
    window.location.href = url
  }

  render() {

    const { crowdListOrder } = this.props;
      const { orderGoodsList } = crowdListOrder;
      const orderGoodsListrap=orderGoodsList[0];
    let orderStatus = '';
    let showCancelBtn = false;
      let showCancelBtn2 = false;
    let showPayBtn = false;
    let showCommentBtn = false;
    // 确认收货
    let showCompleteBtn = false;
    // 查看物流
    let showViewDeleveryBtn = false;
console.log(crowdListOrder)
    switch (crowdListOrder.orderState) {
      case 0:
        orderStatus = '已取消'
        break;
      case 10:
        orderStatus = '待付款'
        showCancelBtn = true;
        showPayBtn = true;
        break;
      case 15:
            orderStatus = '支付完成'
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
        if (crowdListOrder.evaluationStatus != 1) {
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
        case 90:
            orderStatus = '已退款'
            break;
      default:
        break;
    }
    return <div className='orderitem'>
      <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
      <div style={{backgroundColor:'#fff'}}>
          {
              orderGoodsListrap &&<div>
                <div style={{borderBottom:'1px solid #e5e5e5'}}>
                  <Flex onClick={()=>this.gotoOrderDetail(crowdListOrder) } style={{padding:'0.2rem 0.26rem'}}>
                    <div style={{ width: '1.62rem',height:'1.62rem',position:'relative' }}>
                      <div style={{width:'1.62rem',height:'1.62rem'}}>
                        <Img src={crowdListOrder.raiseImage} style={{ width: '1.62rem',height:'1.62rem' }} />
                      </div>
                        {
                            crowdListOrder.activityStatus == 20 &&<span style={{fontSize:'0.22rem',color:'#fff',padding:'6px 10px',backgroundColor:'#00a9e0',borderRadius:'0.3rem',position:'absolute',top:'0px',left:'0px'}}>众筹中</span>
                        }
                        {
                            crowdListOrder.activityStatus == 30 && (crowdListOrder.raiseStatus || 0) == 0 && <span style={{fontSize:'0.22rem',color:'#fff',padding:'6px 10px',backgroundColor:'#aaaaaa',borderRadius:'0.3rem',position:'absolute',top:'0px',left:'0px'}}>众筹失败</span>
                        }
                        {
                            crowdListOrder.activityStatus == 30 && crowdListOrder.raiseStatus == 1 && <span style={{fontSize:'0.22rem',color:'#fff',padding:'6px 10px',backgroundColor:'#ff7841',borderRadius:'0.3rem',position:'absolute',top:'0px',left:'0px'}}>众筹成功</span>
                        }
                        {
                            crowdListOrder.activityStatus == 30 && crowdListOrder.raiseStatus == 10 && <span style={{fontSize:'0.22rem',color:'#fff',padding:'6px 10px',backgroundColor:'#e1536b',borderRadius:'0.3rem',position:'absolute',top:'0px',left:'0px'}}>待处理</span>
                        }



                    </div>
                    <div style={{marginLeft:'0.2rem'}}>
                      <div style={{color:'#333',fontSize:'0.28rem',marginBottom:'0.15rem',maxHeight:'0.64rem',lineHeight:'0.35rem',overflow:'hidden'}}>{crowdListOrder.raiseName}</div>
                      <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>{crowdListOrder.raiseSubtitleName}</div>
                      <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>支持数量：{crowdListOrder.orderNum}</div>
                      <div style={{color:'#e9321f',fontSize:'0.26rem'}}>{`￥${crowdListOrder.orderAmount}`}</div>
                    </div>
                  </Flex>
                </div>
              </div>
          }


        <WhiteSpace></WhiteSpace>
        <Flex justify='end' style={{padding:'0px 0.26rem'}}>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(crowdListOrder)}
                type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
            }
              {
                  showCancelBtn2 && <Button
                      onClick={(e) => this.cancelPayOrder(crowdListOrder)}
                      type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>申请退款</Button>
              }
            {
              showPayBtn && <Button
                onClick={(e) => this.gotoPay(crowdListOrder)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline >去支付</Button>
            }
            {
              showCommentBtn && <Button
                onClick={(e) => this.gotoComment(crowdListOrder)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>马上评价</Button>
            }
            {
              showViewDeleveryBtn && <Button
                onClick={(e) => this.gotoDelivery(crowdListOrder)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>查看物流</Button>
            }
            {
              showCompleteBtn && <Button
                onClick={(e) => this.finishorder(crowdListOrder)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>确认收货</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </div>

    </div>
  }
}

export default withRouter(CrowdFundingOrderItem);
