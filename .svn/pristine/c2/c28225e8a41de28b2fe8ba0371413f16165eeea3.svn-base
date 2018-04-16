import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  List,
  Button,
  Steps
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
const Step = Steps.Step;
const Item = List.Item;
import './progress.less';

class ProgressDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progressDetail: null
    }
  }

  componentDidMount() {
    const refundId = this.props.params.refundId;
    const type = this.props.params.type;
    if (type == 0) {
      orderApi.returnDetail({
        refundId
      }).then(result => {
        if (result.result == 1) {
          this.setState({
            progressDetail: result.data[0]
          })
        }
      })
    } else {
      orderApi.barterDetail({
        barterId: refundId
      }).then(result => {
        if (result.result == 1) {
          this.setState({
            progressDetail: result.data[0]
          })
        }
      })
    }

  }

  render() {
    const { progressDetail } = this.state
    if (!progressDetail) {
      return null;
    }
    const type = this.props.params.type;
console.log(progressDetail)
    const list = type == 0 ? progressDetail.returnLogList : progressDetail.shopBarterLogList;
    return (
      <div className="wx-progress-detail fix-scroll">
        <List className="wx-progress-detail-list">
            {/*<div>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>换货编号：</span><span style={{color:'#999',fontSize:'0.26rem'}}>{progressDetail.refundSn}</span></div>
                <div style={{color:'#00aae0',fontSize:'0.28rem'}}>同意</div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>商品名称：</span><span style={{color:'#999',fontSize:'0.26rem'}}>{progressDetail.goodsName}</span></div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>换货数量：</span><span style={{color:'#999',fontSize:'0.26rem'}}>154645585555</span></div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>申请时间：</span><span style={{color:'#999',fontSize:'0.26rem'}}>154645585555</span></div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>下单时间：</span><span style={{color:'#999',fontSize:'0.26rem'}}>154645585555</span></div>
              </Flex>
            </Item>
          </div>
          <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
          <div>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>卖家备注：</span><span style={{color:'#999',fontSize:'0.26rem'}}>154645585555</span></div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>发货人</span></div>
                <div style={{color:'#999',fontSize:'0.26rem'}}>卫青健康</div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>配货公司</span></div>
                <div style={{color:'#999',fontSize:'0.26rem'}}>卫青健康</div>
              </Flex>
            </Item>
            <Item>
              <Flex justify="between">
                <div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>物流单号</span></div>
                <div style={{color:'#999',fontSize:'0.26rem'}}>卫青健康</div>
              </Flex>
            </Item>

          </div>*/}


          <Item><div><span style={{color:'#333',fontSize:'0.28rem',paddingRight:'0.1rem'}}>问题描述</span></div></Item>
          <Item style={{height:'2rem',borderTop:'1px dashed #e5e5e5'}} className="item_textCenter">
            <div style={{color:'#999',width:'100%',whiteSpace:'normal',fontSize:'0.26rem'}}>{progressDetail.buyerMessage}</div>
          </Item>
          <Item>审核留言</Item>
          <Item style={{height:'2rem',borderTop:'1px dashed #e5e5e5'}} className="item_textCenter">
            <div style={{color:'#999',width:'100%',whiteSpace:'normal',fontSize:'0.26rem'}}>{progressDetail.sellerMessage}</div>
          </Item>

          <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
          <Item>审核进度</Item>
          <Item style={{borderTop:'1px dashed #e5e5e5'}}>
            <Steps current={list.length} size='small' style={{padding:'0.2rem 0'}} className="wx-progress-detail-step">
              {
                list.map((log,index) => {
                	console.log(log)
                  return <Step key={index} title={<div style={{color:'#333',fontSize:'0.28rem',fontWeight:'400'}}>{log.stateInfo}</div>}
                    description= {<div style={{fontSize:'0.24rem',color:'#999'}}>{log.createTimeStr}</div>}
                     />
                })
              }
            </Steps>
          </Item>
        </List> 
      </div>
    )
  }
}

export default withRouter(ProgressDetail);
