import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge,WingBlank } from 'antd-mobile';

import "./OrderBarSuccess.less"

class OrderBarSuccess extends React.Component {

  constructor(props) {
    super(props);
  }

  // 立即购买
  _onSubmitOrder = () => {
    this.props.onSubmitOrder();
  }

  render() {
    const { totalPrice } = this.props;
    return (
      <div className='wx-OrderBarSuccess'>
        <Flex style={{ width:'100%'}}>
          {/*<Flex.Item style={{ flex: 2,textAlign:'center',color:'red' }}>
            实付款: {`¥${totalPrice}`}
          </Flex.Item>
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1}}>
            <WingBlank ><Button type='primary'>确认订单</Button></WingBlank>
          </Flex.Item>*/}
         {/* <div>
            <span style={{fontSize:'0.24rem',color:'#666'}}>合计:</span><span style={{fontSize:'0.3rem',color:'#e9000b',paddingLeft:'0.2rem'}}>{`¥${totalPrice}`}</span>
          </div>*/}
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1,textAlign:'right'}}>
            <Button type='primary'inline className="btn_gotoSub" style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.26rem',
                color:'#999',
                background:'#fff',
                borderColor:'#aaa',
                padding:'0 0.1rem',
                marginLeft:'0.2rem'}}>删除订单</Button>
            <Button type='primary'inline className="btn_gotoSub"style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.26rem',
                color:'#999',
                background:'#fff',
                borderColor:'#aaa',
                padding:'0 0.1rem',
                marginLeft:'0.2rem'}}>返修、退换</Button>
              <Button type='primary'inline className="btn_gotoSub" style={{
                  height:'0.6rem',
                  lineHeight:'0.6rem',
                  fontSize:'0.26rem',
                  color:'#999',
                  background:'#fff',
                  borderColor:'#aaa',
                  padding:'0 0.1rem',
                  marginLeft:'0.2rem'}}>评价晒单</Button>
            <Button type='warning'inline className="btn_gotoSub"style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.26rem',
                color:'#fff',
                background:'#e2536b',
                borderColor:'#e2536b',
                padding:'0 0.1rem',
                marginLeft:'0.2rem'}}>再次购买</Button>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default OrderBarSuccess;
