import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as orderApi from '../../home/api/order';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  ListView,
  Button,
  Modal
} from 'antd-mobile';

class BargainOrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderState:''

        }
    }
  cancelOrder = (memberBargain) => {
    Modal.alert('提示', '是否取消订单', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.cancleorder({
            ordersn: memberBargain.orderSn
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
    cancelPayOrder = (memberBargain) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                memberBargain,
                type: 1 // type 1代表取消订单
            }
        })
    }
  gotoPay = (memberBargain) => {
    const { orderSn, bargainPrice } = memberBargain;
    common.gotoPay({
        paySn:orderSn,
        orderTotalPrice:bargainPrice
    })
  }

  gotoComment = (memberBargain) => {
    this.props.router.push({
      pathname: '/commentList',
      state: {
          memberBargain
      }
    })
  }

  // 确认订单
  finishorder = (memberBargain) => {
    Modal.alert('提示', '是否确认收货', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          orderApi.finishorder({
            ordersn: memberBargain.orderSn
          }).then(result => {
            if (result.result == 1) {
              this.props.finishorder();
            }
          })
        }
      }
    ]);
  }

  gotoOrderDetail = (memberBargain) => {
   console.log(memberBargain)
      if(memberBargain.orderId){
          this.props.router.push('/orderDetail/' + memberBargain.orderId);
      }else{
          common.gotoBargainDetail({id:memberBargain.bargainActivityId})
          // this.props.router.push('/orderDetail/' + memberBargain.bargainActivityId);
      }
    //
  }

  gotoDelivery = (memberBargain) => {
    const shippingCode = memberBargain.shippingCode;
    const timestamp = new Date().getTime();
    const shippingExpressCode = memberBargain.shippingExpressCode;
    const url = `http://wap.kuaidi100.com/wap_result.jsp?rand=${timestamp}&id=${shippingExpressCode}&fromWeb=null&postid=${shippingCode}`
    window.location.href = url
  }

  render() {
    const { memberBargain } = this.props;
    let orderStatus = '';
    let showCancelBtn = false;
      let showCancelBtn2 = false;
    let showPayBtn = false;
    let showCommentBtn = false;
    // 确认收货
    let showCompleteBtn = false;
    // 查看物流
    let showViewDeleveryBtn = false;

    switch (memberBargain.orderState) {
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
        if (memberBargain.evaluationStatus != 1) {
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
    }
     console.log(this.props.params.type)
    return <div className='orderitem'>
      {/*<WhiteSpace></WhiteSpace>*/}
      <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
      <div style={{backgroundColor:'#fff'}}>
        <Flex justify='between' style={{padding:'0.2rem 0.26rem',borderBottom:'1px solid #e5e5e5'}} onClick={()=>console.log(memberBargain)}>
          <div style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/dianpu-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.1rem',position:'relative',top:'0.03rem'}}/>{memberBargain.storeName}</div>
          <div className="paystaus" style={{color:'#00a9df',fontSize:'0.24rem'}}>{orderStatus}</div>
        </Flex>
        <div>
          <div style={{borderBottom:'1px solid #e5e5e5'}}>
            <Flex onClick={()=>this.gotoOrderDetail(memberBargain) } style={{padding:'0.2rem 0.26rem'}}>
              <div style={{width:'1.62rem',height:'1.62rem'}}><Img src={memberBargain.goodsImage} style={{ width: '1.62rem',height:'1.62rem' }} /></div>
              <div style={{marginLeft:'0.2rem'}}>
                <div style={{color:'#333',fontSize:'0.28rem',marginBottom:'0.15rem',maxHeight:'0.64rem',lineHeight:'0.35rem',overflow:'hidden'}}>{memberBargain.goodsName}</div>
                <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>规格：{memberBargain.specInfo}</div>
                <div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}>数量：1</div>
                <div style={{color:'#e9321f',fontSize:'0.26rem'}}>{`￥${memberBargain.bargainPrice}`}</div>
              </div>
            </Flex>
          </div>
        </div>

        <WhiteSpace></WhiteSpace>
        <Flex justify='end' style={{padding:'0px 0.26rem'}}>
          <div>
            {
              showCancelBtn && <Button
                onClick={(e) => this.cancelOrder(memberBargain)}
                type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
            }
              {
                  showCancelBtn2 && <Button
                      onClick={(e) => this.cancelPayOrder(memberBargain)}
                      type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>取消订单</Button>
              }
              {
                  !memberBargain.orderId && <Button
                      onClick={() => common.gotoBargainDetail({id:memberBargain.bargainActivityId})}
                      type='ghost' size='small' inline style={{borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem'}}>邀请好友砍价</Button>
              }
            {
              showPayBtn && <Button
                onClick={(e) => this.gotoPay(memberBargain)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline >去支付</Button>
            }
            {
              showCommentBtn && <Button
                onClick={(e) => this.gotoComment(memberBargain)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>马上评价</Button>
            }
            {
              showViewDeleveryBtn && <Button
                onClick={(e) => this.gotoDelivery(memberBargain)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>查看物流</Button>
            }
            {
              showCompleteBtn && <Button
                onClick={(e) => this.finishorder(memberBargain)}
                style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem' }} type='ghost' size='small' inline>确认收货</Button>
            }
          </div>
        </Flex>
        <WhiteSpace></WhiteSpace>
      </div>

    </div>
  }
}

export default withRouter(BargainOrderItem);
