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
    ontoExchangeComplete = () => {
        this.props.ontoExchangeComplete();
    }

  render() {
    const { totalPrice,cartIds } = this.props;
    return (
      <div className='wx-orderbar'>
        <Flex style={{ width:'100%'}}>
          <Flex.Item style={{ flex: 1,textAlign:'left',color:'red' }}>
            <WingBlank >合计: {`${totalPrice}分`}</WingBlank>
          </Flex.Item>
          <Flex.Item   style={{flex:2,textAlign:'right'}}>
            <WingBlank ><Button inline size="small" style={{borderColor:'#aaaaaa',color:'#aaaaaa',marginRight:'0.1rem'}} onClick={()=>this.ontoExchangeComplete()}>取消兑换</Button><Button inline size="small" onClick={()=>this._onSubmitOrder()} style={{borderColor:'#77b4f5',color:'#77b4f5'}}>兑换完成</Button></WingBlank>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default OrderBar;
