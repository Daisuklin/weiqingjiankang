import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Modal,
  Toast,
  Flex,
  Button,
  Checkbox,
  List,
  Icon,
  Stepper
} from 'antd-mobile';
import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';
import * as cartApi from '../api/cart';
import { common } from 'common';

import './CartShop.less';
const Item = List.Item;
const AgreeItem = Checkbox.AgreeItem;

class CartShop extends Component {
  constructor(props) {
    super(props);
  }

  // 领券  
  getCoupon = (shop) => {
    this.props.getCoupon(shop);
  }

  // 删除店
  delShopCart = (shop) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delShopCart(shop);
        }
      },
    ]);
  }

  // 删除购物车商品
  delCart = (goods) => {
    Modal.alert('提示', '确定要删除吗', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          this.props.delCart(goods);
        }
      },
    ]);
  }

  // 更新购物车数量
  updateCart = (store, goods, num,goodsNowStorage) => {
    if(num<=100){
        console.log(num)
        if(num > goodsNowStorage){//如果输入的值大于库存，数量就用库存的值
            this.props.updateCart(store, goods, goodsNowStorage);
            Toast.info('库存不足，请重新输入', 1)
        }
        this.props.updateCart(store, goods, num);
    }else{
      Toast.fail('购买数量已达上限',1)
    }
  }

  // 选择购物车
  checkGoods = (store, goods, e) => {
    this.props.checkGoods(store, goods, e.target.checked);
  }
  // 选中店
  checkShop = (store, e) => {
    this.props.checkShop(store, e.target.checked);
  }

  renderHeader = () => {
    const { data } = this.props;
    return <Flex>
      <div style={{maxWidth:'60%',textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>
        <Checkbox checked={data.checked}
                  onChange={(e)=>this.checkShop(data,e)}
                  className="cartShop_header_checkbox"></Checkbox>
        <img src="./assets/img/weiqing/dianpu-01@2x.png" style={{width:'0.28rem',height:'0.28rem',paddingRight:'0.15rem'}}/>{data.storeName}
      </div>

      <Flex.Item style={{ textAlign: 'right' }}>
        <Button size='small' inline onClick={()=>this.getCoupon(data)} style={{padding:'0px 0.15rem',fontSize:'0.28rem',color:'#666',height:'0.5rem',lineHeight:'0.5rem',borderRadius:'3px',marginRight:'0.1rem'}}>领券</Button>
        <Button size='small' inline onClick={()=>this.delShopCart(data)} style={{padding:'0px 0.15rem',fontSize:'0.28rem',color:'#666',height:'0.5rem',lineHeight:'0.5rem',borderRadius:'3px'}}>删除</Button>
      </Flex.Item>
    </Flex>
  }

  gotoGoodsDetail = (goods) => {
    common.gotoGoodsDetail({
      specId: goods.specId
    });
  }

  render() {
    const { data } = this.props;
    const gotoGoodsDetail = this.gotoGoodsDetail;
      /*const { list } = data;
    console.log(list)*/
    return <List renderHeader={this.renderHeader} className="cartShop_list">
      {
        data.list.map((goods,index) => {
          return <Item key={index} style={{padding:'0.1rem 0.26rem'}}>
            <Flex>
              <Checkbox checked={goods.checked} onChange={e => this.checkGoods(data,goods,e)} className="cartShop_body_checkbox"></Checkbox>
              <Img src={goods.goodsImages} style={{ height: '1.62rem', width: '1.62rem' }} />
              <Flex.Item>
                <div className='text-overflow-hidden' onClick={()=>gotoGoodsDetail(goods)}>{goods.goodsName}</div>
                <div className='text-overflow-hidden' onClick={()=>gotoGoodsDetail(goods)} style={{ fontSize: '.24rem',color:'#666' }}
                  dangerouslySetInnerHTML={{ __html: goods.specInfo }}>
                </div>
                <div style={{color:'#999',fontSize:'0.24rem'}}>数量：1</div>
                <Flex justify='between'>
                  <div onClick={()=>gotoGoodsDetail(goods)} style={{fontSize:'0.3rem',color:'#e2526b'}}>{`￥${goods.goodsPrice}`}</div>
                </Flex>
                <div className="cartShop_Stepper">
                  <Stepper showNumber min={1} max={100} value={goods.goodsNum} onChange={(val)=>this.updateCart(data,goods,val,goods.goodsNowStorage)} style={{minWidth:'1rem',float:'right'}} />
                  <Button style={{float:'right',padding:'0px 0.15rem',fontSize:'0.24rem',color:'#666',height:'0.42rem',lineHeight:'0.42rem',borderRadius:'3px',marginRight:'0.1rem',background:'#efefef'}} size='small' inline onClick={() => this.delCart(goods)}>删除</Button>
                </div>
              </Flex.Item>
            </Flex>
          </Item>
        })
      }  
    </List>
  }
}

export default CartShop;
