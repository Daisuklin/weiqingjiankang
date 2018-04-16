import React, { Component } from 'react'
import {
  List,
  Tabs,
  WingBlank,
  Flex,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;

const gotoStore = (goodsDetailInfo) => {
  common.gotoStore({ storeId: goodsDetailInfo.storeId });
}

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ goodsDetailInfo }) {
  const { evaluateStore, storeId } = goodsDetailInfo;
  return <WingBlank style={{padding:'0.2rem 0rem'}}>
    <Flex >
      <Flex.Item style={{ flex: 1 }}>
        {/*<Img src={goodsDetailInfo.storeLabel} style={{width:'100%'}}></Img>*/}
        <img src="./assets/img/banner1.jpg" style={{width:'95%',height:'0.9rem'}}/>
      </Flex.Item>
      <Flex.Item style={{ flex: 2 }}>
        <Flex>
          <Flex.Item style={{ flex: 2 }}><div><span style={{fontSize:'0.3rem'}}>卫青基因检测中心</span><br/><span style={{color:'#9c9c9c'}}>正品行货，欢迎选购</span></div></Flex.Item>
          <Flex.Item style={{ flex: 1 }}><div style={{ color: 'red', textAlign: 'right' }}>{evaluateStore.averageCredit}</div></Flex.Item>
        </Flex>  
      </Flex.Item>
    </Flex>
    <WhiteSpace size="md"></WhiteSpace>
    <Flex>
      <Flex.Item>
          <Flex direction='column'>
          <Flex.Item className="item_name">商品{evaluateStore.sevalDesccredit}</Flex.Item>
          <Flex.Item className="item_price">{goodsDetailInfo.evaluateNum}</Flex.Item>
            <Flex.Item className="item_num">关注人数</Flex.Item>
          </Flex>
      </Flex.Item>
        <Flex.Item>
          <Flex direction='column'>
            <Flex.Item className="item_name">服务{evaluateStore.sevalServicecredit}</Flex.Item>
            <Flex.Item className="item_price">{goodsDetailInfo.storeGoodsNum}</Flex.Item>
            <Flex.Item className="item_num">服务商数量</Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex direction='column'>
            <Flex.Item className="item_name">物流{evaluateStore.sevalDeliverycredit}</Flex.Item>
            <Flex.Item className="item_price">149</Flex.Item>
            <Flex.Item className="item_num">店铺动态</Flex.Item>
          </Flex>
      </Flex.Item>  
      </Flex>
    <WhiteSpace></WhiteSpace>  
    {
      storeId != "0" && <Flex>
        <Flex.Item><Button style={{fontSize:'0.24rem',color:'#9d9c9c',height:'0.6rem',lineHeight:'0.6rem',width:'95%'}}> <img src="./assets/img/weiqing/kefu@2x.png" style="width: 0.28rem; padding-right: 0.14rem; top: 3px;" />联系客服</Button></Flex.Item>
        <Flex.Item><Button onClick={() => gotoStore(goodsDetailInfo)} style={{fontSize:'0.24rem',color:'#9d9c9c',height:'0.6rem',lineHeight:'0.6rem',width:'95%'}}> <img src="./assets/img/weiqing/dianpu-02@2x.png" style="width: 0.27rem; padding-right: 0.14rem; top: 3px;" />进入店铺</Button></Flex.Item>
      </Flex>
    }  
  </WingBlank>
}
