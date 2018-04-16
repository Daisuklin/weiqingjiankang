import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge,WingBlank } from 'antd-mobile';

import "./OrderBar.less"

class OrderBar extends React.Component {

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
      <div className='wx-orderbar'>
        <Flex style={{ width:'100%'}}>
          <Flex.Item style={{ flex: 2,textAlign:'center',color:'red' }}>
            实付款: {`¥${totalPrice}`}
          </Flex.Item>
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1}}>
            <WingBlank ><Button type='primary'>确认订单</Button></WingBlank>
          </Flex.Item>
{/*          <div>
            <span style={{fontSize:'0.24rem',color:'#666'}}>合计:</span><span style={{fontSize:'0.3rem',color:'#e9000b',paddingLeft:'0.2rem'}}>{`¥${totalPrice}`}</span>
          </div>
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1,textAlign:'right'}}>
            <Button type='primary'inline className="btn_gotoSub" style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.28rem',
                color:'#999',
                background:'#fff',
                borderColor:'#aaa',
                padding:'0 0.1rem',
                width:'2rem',marginLeft:'0.2rem'}}>微信好友代付</Button>
            <Button type='primary'inline className="btn_gotoSub"style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.28rem',
                color:'#999',
                background:'#fff',
                borderColor:'#aaa',
                padding:'0 0.1rem',
                width:'1.5rem',marginLeft:'0.2rem'}}>取消订单</Button>
            <Button type='warning'inline className="btn_gotoSub"style={{
                height:'0.6rem',
                lineHeight:'0.6rem',
                fontSize:'0.28rem',
                color:'#00a9df',
                // background:'#e2536b',
                borderColor:'#00a9df',
                padding:'0 0.1rem',
                width:'1.2rem',marginLeft:'0.2rem'}}>去支付</Button>
          </Flex.Item>*/}
        </Flex>
      </div>
    );
  }
}

export default OrderBar;
