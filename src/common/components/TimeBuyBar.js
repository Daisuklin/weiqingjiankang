import React, { Component } from 'react'
import { common } from 'common';
import { Grid, Flex, List, WhiteSpace, Button, Badge } from 'antd-mobile';

import "./TimeBuyBar.less"

class CartBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // 收藏
  _storecollection = () => {
    this.props.storecollection();
  }
  // 去购物车
  _gotoCart = () => {
    this.props.gotoCart();
  }
  // 加入购物车处理
  _addCart = () => {
    this.props.addCart();
  }
  // 立即购买
  _gotoBuy = () => {
    this.props.gotoBuy();
  }

  render() {
    const { showCollectionCart } = this.props;
    const filename = this.props.isFav == 1 ? 'xingxing-03@2x.png' : 'xingxing-04@2x.png'
    const isFavUrl = `./assets/img/weiqing/${filename}`
    return (
      <div className='wx-timecartbar'>
        <Flex style={{
          width: '100%'
        }}>
          {
            showCollectionCart && <Flex.Item style={{ flex: 1, textAlign: 'center' }} onClick={() => this._storecollection()}>
              <img src={isFavUrl} style={{width:'.44rem',height:'.44rem',paddingRight:'0.1rem'}} alt=""/>
              <div style={{display:'inline-block',fontSize:'0.26rem',color:'#666',position:'relative',bottom:'11px'}}>收藏</div>
            </Flex.Item>
          }
          <Flex.Item className='addCart' onClick={()=>this._addCart()} style={{flex:1}}>
            <Button disabled={this.props.data==0?true:false} type='primary' style={{background:'#ffaa01',borderColor:'#ffaa01',height:'1rem',lineHeight:'1rem',borderRadius:'0px',fontSize:'0.28rem'}}>添加购物车</Button>
          </Flex.Item>
          <Flex.Item className='goBuy' onClick={()=>this._gotoBuy()} style={{flex:1}}>
            <Button disabled={this.props.data==0?true:false} type='primary' style={{background:'#e70012',borderColor:'#e70012',height:'1rem',lineHeight:'1rem',borderRadius:'0px',fontSize:'0.28rem'}}>立即购买</Button>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}

export default CartBar;
