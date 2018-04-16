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
  Modal,
  List
} from 'antd-mobile';

const Item = List.Item;

class ProgressItem extends Component {

  gotoProgressDetail = (orderItem) => {
    if (this.props.type == 0) {
      this.props.router.push(`/progressDetail/${this.props.type}/${orderItem.refundId}`)
    } else {
      this.props.router.push(`/progressDetail/${this.props.type}/${orderItem.barterId}`)
    }
  }

  gotoReturnDetail = (orderItem) => {
    this.props.router.push('/returnDetail/' + orderItem.refundId)
  }

  changeGoods = (orderItem) => {
    Modal.alert('提示', '是否确认换货?', [
      { text: '取消' },
      {
        text: '确认',
        onPress: () => {
          orderApi.finishBarter({
            barterId: orderItem.barterId
          }).then(result => {
            if (result.result == 1) {
              this.props.onFinishBarter();
            } else {
              Toast.info(result.msg);
            }
          })
        }
      },
    ]);
  }

  render() {
    // type 0 代表退货退款列表，1 代表换货
    const { dataItem, type } = this.props;
    // 1 退款 2 退货
    const { refundType, sellerState, refundState, goodsState } = dataItem

    let showReturnBtn = false;
    let showRedundBtn = true;
    let showChangeGoodsBtn = false;
    let showConfirmBtn = false;
      let showRedundBtn2 = false;
    let statusShow = '';
      // console.log(type);//1
      console.log(refundType);//y:1，no:1，进行中：1
      console.log(sellerState);//y:2，no:3，进行中：1
      console.log(refundState);//y:2，no:1，进行中：1
      console.log(goodsState);//y:0，no:0，进行中：0
      // refundType   申请类型:1为退款,2为退货
      // sellerState; 卖家处理状态:1为待审核,2为同意,3为不同意
      // refundState:申请状态:1为未申请,2为待管理员处理,3为已完成
      // goodsState  物流状态:1为待发货,2为待收货,3为未收到,4为已收货
    if (type == 0) {//代表退货退款列表
      if(refundType == 1){
        //退款
          if(sellerState==2){
            //为待管理员处理
              if(refundState == 1){
                  statusShow = '未申请';
              }else if(refundState == 2){
                  statusShow = '卖家已同意';
              }else{
                  statusShow = '已完成';
              }
          }else if(sellerState == 1){
            //未申请状态
              statusShow = '待管理员处理';
          }else{
              statusShow = '卖家拒绝申请';
          }
      }else{
        //退货
          showRedundBtn = false;
          showRedundBtn2 = true;
          if(sellerState==2){
              //为待管理员处理
              if(goodsState == 1){
                  statusShow = '买家待发货';
                  showReturnBtn = true;
              }else if(goodsState == 2){
                  statusShow = '卖家待收货';
              }else if(goodsState == 3){
                  statusShow = '未收到';
              }else{
                  statusShow = '退换完成';
              }
          }else if(sellerState == 1){
              //未申请状态
              statusShow = '待管理员处理';
          }else{
              statusShow = '卖家拒绝申请';
          }
          /**/
      }
    } else {
        //换货
        if (goodsState == 4) {
            statusShow = '进行中'
            showConfirmBtn = true;
            showChangeGoodsBtn = false;
        } else if (goodsState == 5) {
            showConfirmBtn = false;
            showChangeGoodsBtn = false;
            statusShow = '已完成'
        } else if (goodsState == 1 && sellerState == 30) {
            showConfirmBtn = false;
            showChangeGoodsBtn = true;
            statusShow = '商家同意换货'
        } else {
            showConfirmBtn = false;
            showChangeGoodsBtn = false;
            statusShow = '进行中'
        }
    }
/*if(type==0){
  /!*if (refundType == 2) {
   if (refundState == 3) {
   statusShow = '已完成'
   } else {
   if (sellerState == 2 && goodsState == 1) {
   showReturnBtn = true;
   statusShow = '商家同意退货'
   } else {
   statusShow = '进行中'
   }
   }
   } else {
   if (refundState == 3) {
   statusShow = '已完成'
   } else {
   if (sellerState == 2 && goodsState == 1) {
   statusShow = '商家同意退款'
   } else {
   statusShow = '进行中'
   }
   }
   }*!/
}else{
  /!*if (goodsState == 4) {
 statusShow = '进行中'
 showConfirmBtn = true;
 showChangeGoodsBtn = false;
 } else if (goodsState == 5) {
 showConfirmBtn = false;
 showChangeGoodsBtn = false;
 statusShow = '已完成'
 } else if (goodsState == 1 && sellerState == 30) {
 showConfirmBtn = false;
 showChangeGoodsBtn = true;
 statusShow = '商家同意换货'
 } else {
 showConfirmBtn = false;
 showChangeGoodsBtn = false;
 statusShow = '进行中'
 }*!/
}*/
    console.log(showChangeGoodsBtn);
    return <div className='progressItem' style={{background:'#fff'}}>
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between'>
          <div>{type==0?dataItem.refundSn:dataItem.barterSn}</div>
          <div>
            <Button type='ghost'
              onClick={()=>this.gotoProgressDetail(dataItem)}
              size='small' inline style={{borderColor:'#77b4f5',color:'#77b4f5'}}>进度查询</Button>
          </div>
        </Flex>
        <div>
          <p>{dataItem.goodsName}</p>
          <p style={{color:'#5491d2'}}>状态: {statusShow}</p>
          <p style={{color:'#bbb'}}>申请时间: {dataItem.createTimeStr}</p>

          {
            type ==0 && <Flex.Item>
              <Flex justify='end'>
                {
                  showReturnBtn && <Button
                    type='ghost'
                    size='small'
                    style={{marginRight:'0.1rem'}}
                    onClick={() => { 
                      this.props.router.push(`/returnGoods/${dataItem.refundId}`)
                    }}
                    inline>退货</Button> 
                }
                {
                  showRedundBtn && <Button size='small'
                    onClick={() => this.gotoReturnDetail(dataItem)}
                    inline>退款详情</Button>
                }
                  {
                      showRedundBtn2 && <Button size='small'
                                               onClick={() => this.gotoReturnDetail(dataItem)}
                                               inline>退货详情</Button>
                  }
              </Flex>
            </Flex.Item>
          }
          {
            type == 1 && <Flex.Item>
              <Flex justify='end'>
                {
                  showConfirmBtn && <Button
                    type='ghost'
                    size='small'
                    onClick={() => { 
                      this.changeGoods(dataItem)
                    }}
                    inline>确认换货</Button> 
                }
                {
                  showChangeGoodsBtn && <Button
                    type='ghost'
                    size='small'
                    onClick={() => { 
                      this.props.router.push(`/changeGoods/${dataItem.barterId}`)
                    }}
                    inline>换货</Button> 
                }
              </Flex>
            </Flex.Item> 
          }
        </div>
      </WingBlank>
      <WhiteSpace></WhiteSpace>
      <WhiteSpace style={{
        height: '0.2rem',
        backgroundColor:'#ebebef'
      }}></WhiteSpace>
    </div>
  }
}

export default withRouter(ProgressItem);