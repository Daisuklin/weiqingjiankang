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

  //找好友代付
  onGoToFriend=()=>{
      this.props.onGoToFriend();
  }

  render() {
    const { totalPrice } = this.props;
    return (
      <div className='wx-orderbar'>
        <Flex style={{ width:'100%'}}>
          {/*<Flex.Item style={{ flex: 2,textAlign:'center',color:'red' }}>
            实付款: {`¥${totalPrice}`}
          </Flex.Item>
          <Flex.Item  onClick={()=>this._onSubmitOrder()} style={{flex:1}}>
            <WingBlank ><Button type='primary'>确认订单</Button></WingBlank>
          </Flex.Item>*/}

          <div className="left-guding">
            <span style={{fontSize:'0.24rem',color:'#666'}}>合计:</span><span style={{fontSize:'0.3rem',color:'#e9000b',paddingLeft:'0.2rem'}}>{`¥${totalPrice}`}</span>
          </div>
          <Flex className="right-guding-huangkeyuan" >
              <Flex.Item  style={{width:'33.3%'}}>
                  <Button type='primary'inline className="btn_gotoSub"style={{
                      height:'0.6rem',
                      lineHeight:'0.6rem',
                      fontSize:'0.28rem',
                      color:'#999',
                      background:'#fff',
                      borderColor:'#aaa',
                      padding:'0px',
                      width:'100%'}}>取消订单</Button>
              </Flex.Item>
              <Flex.Item  style={{width:'33.3%'}}>
                  <Button type='primary'inline className="btn_gotoSub" onClick={this.onGoToFriend} style={{
                      height:'0.6rem',
                      lineHeight:'0.6rem',
                      fontSize:'0.28rem',
                      color:'#00a9df',
                      background:'#fff',
                      borderColor:'#00a9df',
                      padding:'0px',
                      width:'100%'}}>好友代付</Button>
              </Flex.Item>
              <Flex.Item  style={{width:'33.3%'}}>
                  <Button type='warning'inline className="btn_gotoSub"style={{
                      height:'0.6rem',
                      lineHeight:'0.6rem',
                      fontSize:'0.28rem',
                      color:'#00a9df',
                      borderColor:'#00a9df',
                      padding:'0px',
                      width:'100%'}} onClick={()=>{
                      this._onSubmitOrder()
                  }}>去支付</Button>
              </Flex.Item>
          </Flex>

        </Flex>
      </div>
    );
  }
}

export default OrderBar;
