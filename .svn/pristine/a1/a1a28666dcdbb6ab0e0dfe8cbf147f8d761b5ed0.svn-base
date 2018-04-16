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
/*    ImmediatelyOffered = () => {
        this.props.ImmediatelyOffered()
    }*/
  return <div>

    <Flex className="bargainBtn">
      <Flex.Item style={{flex:1,textAlign:'center'}}  >
        <Button type='primary' inline onClick={()=>common.gotoGroupBargainDetail({specId:goodsDetailInfo.specId})} style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%',backgroundColor:'#ff7841',borderColor:'#ff7841'}}>邀请好友参团</Button>
        <Button type='primary' inline onClick={()=>this.ImmediatelyOffere} style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%'}}>立即参团</Button>
      </Flex.Item>
    </Flex>
  </div>
}
