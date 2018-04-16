import React, { Component } from 'react'
import {
  List,
  Tabs
} from 'antd-mobile';
import { Img } from 'commonComponent';
const TabPane = Tabs.TabPane;

/**
 * 商品更多信息
 * @param {*} param0 
 */
export default function({ groupItemDetail }) {
 /* let mobileBody = goodsDetailInfo.mobileBody;
  let goodsBody = [];
  if (mobileBody instanceof Array) {
    goodsBody = mobileBody
  } else {
    // mobileBody = mobileBody.replace(/&quot;/g, '"');
    if (mobileBody && mobileBody != '') {
      goodsBody = JSON.parse(mobileBody);
    }
  }*/
 // const {groupItemDetail} = this.props;
console.log(groupItemDetail)
  return <Tabs animated={false} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47" style={{padding:'0.2rem'}}>
    <TabPane tab="拼团详情" key="1">
      <div dangerouslySetInnerHTML={{ __html: groupItemDetail.description }}></div>

    </TabPane>
    <TabPane tab="拼团说明" key="2" style={{overflowX:'hidden'}}>
      <div dangerouslySetInnerHTML={{ __html: groupItemDetail.detail }}></div>
    </TabPane>


  </Tabs>
}
