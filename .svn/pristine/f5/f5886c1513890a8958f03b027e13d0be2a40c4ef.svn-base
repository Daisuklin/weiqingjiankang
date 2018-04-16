import React, { Component } from 'react'
import {
  List,
  Tabs,
    Flex,
    Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
// import Flex from "antd-mobile/lib/flex/Flex.web.d";
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
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
    mobileBody = mobileBody.replace(/&quot;/g, '"');
    if (mobileBody && mobileBody != '') {
      goodsBody = JSON.parse(mobileBody);
    }
  }

  return <Tabs animated={false} defaultActiveKey="2" swipeable={false} activeTextColor="#E43F47" style={{padding:'0.2rem'}}>

    <TabPane tab="详情" key="1" style={{overflowX:'hidden'}}>
      <div dangerouslySetInnerHTML={{ __html: goodsDetailInfo.goodsProperty }}></div>
    </TabPane>
    <TabPane tab="进展" key="2">
      <div style={{minHeight:'200px',paddingTop:'0.4rem'}}>
        <Steps size="small" current={1} className="stepsBox">
          <Step title={<span style={{fontSize:'0.26rem',color:'#666',fontWeight:'400'}}>项目进展中项目进展中项目进展中项目进展中项目进展中项目进展中项目进展中项目进展中。</span>} description={<span><img src="./assets/img/product.jpg" style={{width:'2rem',height:'2rem'}}/></span>} />
          <Step title={<span style={{fontSize:'0.26rem',color:'#666',fontWeight:'400'}}>项目进展中。</span>} description={<span><img src="./assets/img/product.jpg" style={{width:'2rem',height:'2rem'}}/></span>} />
          <Step title={<span style={{fontSize:'0.26rem',color:'#666',fontWeight:'400'}}>项目进展中。</span>} description={<span><img src="./assets/img/product.jpg" style={{width:'2rem',height:'2rem'}}/></span>} />
        </Steps>
      </div>
    </TabPane>
    <TabPane tab="参与者" key="3">
      <div style={{}}>
        <List>
            {
                goodsBody && goodsBody.length > 0 && goodsBody.map((item,index) => {
                    return <List.Item style={{paddingLeft:'0px'}} key={index}>
                      <Flex>
                        <Flex.Item style={{flex:1}}>
                          <img src="./assets/img/bargain_detail.png" style={{width:'90px',height:'90px',borderRadius:'50%'}} />
                        </Flex.Item>
                        <Flex.Item style={{flex:3}}>
                          <div style={{fontSize:'0.28rem',color:'#333'}}>昵称</div>
                          <div style={{fontSise:'0.26rem',color:'#999'}}>2017-05-15 16:25:58</div>
                        </Flex.Item>
                        <Flex.Item style={{flex:1.5,fontSize:'0.28rem',color:'#333',textAlign:'right'}}>
                          ￥1.00
                        </Flex.Item>
                      </Flex>
                    </List.Item>
                })
            }
        </List>
      </div>
    </TabPane>
    <TabPane tab="幸运者" key="4">
      <List>
        {
            goodsBody && goodsBody.length > 0 && goodsBody.map((item,index) => {
                return <List.Item style={{paddingLeft:'0px'}} key={index}>
                    <Flex>
                      <Flex.Item style={{flex:1}}>
                        <img src="./assets/img/bargain_detail.png" style={{width:'90px',height:'90px',borderRadius:'50%'}} />
                      </Flex.Item>
                      <Flex.Item style={{flex:3}}>
                        <div style={{fontSize:'0.28rem',color:'#333'}}>昵称</div>
                        <div style={{fontSise:'0.26rem',color:'#999'}}>2017-05-15 16:25:58</div>
                      </Flex.Item>
                      <Flex.Item style={{flex:1.5,fontSize:'0.28rem',color:'#333',textAlign:'right'}}>
                        ￥1.00
                      </Flex.Item>
                    </Flex>
                  </List.Item>
            })
        }
    </List>
    </TabPane>
  </Tabs>
}
