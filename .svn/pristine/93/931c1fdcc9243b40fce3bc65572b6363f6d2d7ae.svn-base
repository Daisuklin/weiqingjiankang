import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as storeApi from '../../api/store';

import './store.less';

const Item = List.Item;

class StoreDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      store: null
    }
  }

  componentDidMount() {
    storeApi.storedetail({
      storeId: this.props.params.storeId
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          goodsList: data.goodsList,
          store: data.store[0]
        })
      }
    });
  }

  storecollection = () => {
    storeApi.storecollection({
      storeId: this.props.params.storeId,
      favType: 2,
      goodsId: null
    }).then(result => {
      if (result.result == 1) {
        Toast.info(result.msg);
        const store = {
          ...this.state.store,
          isFav: result.isfav
        };
        this.setState({
          store
        })
      }

    });
  }

  render() {
    const { store, goodsList } = this.state;
    if (!store) {
      return null;
    }
    const { params, router } = this.props;
    const storeCodeShow = <Img src={store.storeCode} />;
    const storeBannerShow = `url(${common.IMAGE_DOMAIN}${store.storeBanner}) no-repeat center center`;
    return <div className='wx-store'>
      <div className='fix-scroll hastitle'>
        <div style={{background:'#ffffff'}}>
      <div className='wx-store-header'style={{height:'1.4rem',borderBottom:'1px solid #e5e5e5'}}>
        <WingBlank size='sm' style={{padding:'0.2rem 0.1rem'}}>
          <Flex className='wx-store-header-body' style={{bottom:'0rem',position:'static'}}>
            <Img src={store.storeLogo} style={{
              width: '2rem',
              height: '0.7rem'
            }} />
            <Flex.Item>
              <div style={{textAlign:'left',paddingBottom:'0.1rem'}}>{store.storeName}</div>
              <div style={{textAlign:'left',color:'#686868'}}>{store.storeCollect}人关注</div>
            </Flex.Item>
            {/*<Flex.Item>*/}
            {/*</Flex.Item>*/}
            <Button className='rightBtn' type='primary' size='small' onClick={this.storecollection} style={{background:'none',color:'#00a9e0',border:'2px dashed #00a9e0'}}>
              {
                store.isFav==1?'已关注':'关注'
              }
            </Button>
          </Flex>
        </WingBlank>
      </div>
      <WhiteSpace></WhiteSpace>
      <Flex style={{textAlign: 'center',padding:'0.1rem 0rem 0.2rem',color:'#666666'}}>
        <Flex.Item onClick={()=>
          router.push(`/store/${params.storeId}/goods`)
        }>
          <div style={{paddingBottom:'0.1rem'}}>全部商品</div>
          <div>{store.storeGoodsCount}</div>
        </Flex.Item>
        <Flex.Item onClick={()=>
          router.push(`/store/${params.storeId}/newgoods`)
        }>
          <div style={{paddingBottom:'0.1rem'}}>上新</div>
          <div>{store.newGoodsNum}</div>
        </Flex.Item>
        <Flex.Item onClick={()=>
            router.push(`/gotoCoupons/${params.storeId}`)
        }>
          <div style={{paddingBottom:'0.1rem'}}>优惠券</div>
          <div>{store.couponNum}</div>
        </Flex.Item>
      </Flex>
      </div>
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
      <List>
        <Item extra={store.storeTel} style={{paddingRight:'0.2rem'}}>
          商家电话
        </Item>
        <Item extra={storeCodeShow} style={{paddingRight:'0.2rem'}}>
          店铺二维码
        </Item>
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
        <Item>
          店铺介绍 <span style={{color:'#999',float:'right',paddingRight:'0.2rem'}}> {store.storeName}</span>
        </Item>
        <Item>
          开始时间 <span style={{color:'#999',float:'right',paddingRight:'0.2rem'}}> {store.createTimeStr}</span>
        </Item>
        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
        <Item>
          授权品牌
        </Item>
        </List>
      </div>  
    </div>
  }
}

export default withRouter(StoreDetail);
