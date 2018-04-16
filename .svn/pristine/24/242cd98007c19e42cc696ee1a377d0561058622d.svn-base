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
export default function({ goodsDetailInfo }) {
  let mobileBody = goodsDetailInfo.mobileBody;
  let goodsBody = [];
  if (mobileBody instanceof Array) {
    goodsBody = mobileBody
  } else {
    // mobileBody = mobileBody.replace(/&quot;/g, '"');
    if (mobileBody && mobileBody != '') {
      goodsBody = JSON.parse(mobileBody);
    }
  }

  return <Tabs animated={false} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47" style={{padding:'0.2rem'}}>
    <TabPane tab="拼团详情" key="1">
      <div dangerouslySetInnerHTML={{ __html: goodsDetailInfo.description }}></div>
        {/*{*/}
            {/*goodsBody && goodsBody.length > 0 && goodsBody.map((item,index) => {*/}

                {/*if (item.type == 'image') {*/}
                    {/*return*/}
                  {/*<Img key={index} src={item.value} style={{width:'100%'}}></Img>*/}
                    {/**/}
                {/*}*/}
            {/*})*/}
        {/*}*/}
    </TabPane>
    <TabPane tab="拼团说明" key="2" style={{overflowX:'hidden'}}>
      <div dangerouslySetInnerHTML={{ __html: goodsDetailInfo.groupDetails }}></div>
    </TabPane>
    {/*<TabPane tab="亲友团出刀" key="2">
      <div style={{minHeight:'200px'}}>
        {goodsDetailInfo.afterSale}
      </div>
    </TabPane>
    <TabPane tab="砍价排行TOP" key="3">
      <div style={{minHeight:'200px'}}>
          {goodsDetailInfo.afterSale}
      </div>
    </TabPane>*/}

  </Tabs>
}
