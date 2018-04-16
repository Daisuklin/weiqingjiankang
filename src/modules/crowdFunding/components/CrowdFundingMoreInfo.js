import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    List,
    Tabs,
    Flex,
    Steps
} from 'antd-mobile';
import {Img} from 'commonComponent';
import {Map} from 'immutable'
import * as crowdFundingApi from '../api/crowdFundingApi'
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
import './CrowdFundingMoreInfo.less'
/**
 * 商品更多信息
 * @param {*} param0
 */
class CrowdFundingMoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            developList: Map(),
            joinList: Map(),
            luckyerList: Map(),
            now: 0,
        }
    }

    onChangeTab = (key) => {
        if (key == 2) {
            crowdFundingApi.raiseDevelop({
                raiseId: this.props.raiseId,
                pageSize: 10,
                pageNo: 1
            }).then(result => {
                if (result.result == 1) {
                    this.setState({
                        developList: result.data.developList,
                        now:  result.data.now
                    });
                }
            })
        } else if (key == 3) {
            crowdFundingApi.raiseJoin({
                raiseId: this.props.raiseId,
                pageSize: 10,
                pageNo: 1
            }).then(result => {
                if (result.result == 1) {
                    console.log(result.data)
                    this.setState({
                        joinList: result.data
                    });
                }
            })
        } else if (key == 4) {
            crowdFundingApi.raiseLuckyer({
                raiseId: this.props.raiseId,
                pageSize: 10,
                pageNo: 1
            }).then(result => {
                if (result.result == 1) {
                    console.log(result.data)
                    this.setState({
                        luckyerList: result.data
                    })
                }
            })
        }
    }


    render() {
        const goodsDetailInfo = this.props.goodsDetailInfo;
        const {developList} =this.state;

        let mobileBody = this.props.raiseDetail;
        let goodsBody = [];
        if (mobileBody instanceof Array) {
            goodsBody = mobileBody
        } else {
            mobileBody = mobileBody.replace(/&quot;/g, '"');
            if (mobileBody && mobileBody != '') {
                goodsBody = JSON.parse(mobileBody);
            }
        }

console.log(developList)
        return <Tabs animated={false} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47"
                     style={{padding: '0.2rem'}} onChange={this.onChangeTab}>
            <TabPane tab="详情" key="1" style={{overflowX: 'hidden'}}>

                {
                    goodsBody.map((item, index) => {
                        if (item.type == 'text') {
                            return <p key={index}>{item.value}</p>
                        }
                    })
                }
                {
                    goodsBody.map((item, index) => {
                        if (item.type == 'image') {
                            return <Img key={index} src={item.value}/>
                        }
                    })
                }
            </TabPane>
            <TabPane tab="进展" key="2">
                <div style={{minHeight: '200px', padding: '0.4rem 0.4rem 0rem'}} className="crowdFunding_progress">
                    <ul className="list-progress">
                        {
                            this.state.developList.length > 0 && this.state.developList.map((item, index)=>{
                                console.log(item.createTime)
                                return <li key={index}>
                                    <h4 className="time">
                                        {Math.floor((this.state.now - item.createTime) / (24 * 3600 * 1000))}天前
                                    </h4>
                                    <p>{item.description}</p>
                                    <div className="single-thumbs clearfix">
                                        {
                                            item.images.split(',').map((imgItem, imgIndex) => {
                                                return <Img key={imgIndex} src={imgItem}
                                                            style={{width: '2rem', height: '2rem'}}/>
                                            })
                                        }
                                    </div>
                                </li>
                            })
                        }
                    </ul>

                    {/*<Steps size="small" current={1} className="stepsBox">
                        {
                            this.state.developList.length > 0 && this.state.developList.map((item, index) => {
                                return <Step key={index} title={<span
                                    style={{
                                        fontSize: '0.26rem',
                                        color: '#666',
                                        fontWeight: '400'
                                    }}>{item.description}</span>}
                                             description={<span>
                                                 {
                                                     item.images.split(',').map((imgItem, imgIndex) => {
                                                         return <Img key={index} src={imgItem}
                                                              style={{width: '2rem', height: '2rem'}}/>
                                                     })
                                                 }
                                                 </span>}/>
                            })
                        }
                    </Steps>*/}
                </div>
            </TabPane>
            <TabPane tab="参与者" key="3">
                <div style={{}}>
                    <List>
                        {
                            this.state.joinList.length > 0 && this.state.joinList.map((item, index) => {
                                return <List.Item style={{paddingLeft: '0px'}} key={index}>
                                    <Flex>
                                        <Flex.Item style={{flex: 1}}>
                                            <Img src={item.memberAvatar}
                                                 style={{width: '90px', height: '90px', borderRadius: '50%'}}/>
                                        </Flex.Item>
                                        <Flex.Item style={{flex: 3}}>
                                            <div style={{fontSize: '0.28rem', color: '#333'}}>{item.memberName.substring(0,1)+'****'+item.memberName.substring(item.memberName.length-1,item.memberName.length)}</div>
                                            <div style={{fontSise: '0.26rem', color: '#999'}}>{item.createTimeStr}</div>
                                        </Flex.Item>
                                        <Flex.Item
                                            style={{flex: 1.5, fontSize: '0.28rem', color: '#333', textAlign: 'right'}}>
                                            ￥{item.raisePrice}
                                        </Flex.Item>
                                    </Flex>
                                </List.Item>
                            })
                        }
                    </List>
                </div>
            </TabPane>
            {
                goodsDetailInfo.activityStatus==30 && <TabPane tab="幸运者" key="4">
                    <List>
                        {
                            this.state.luckyerList.length > 0 && this.state.luckyerList.map((item, index) => {
                                return <List.Item style={{paddingLeft: '0px'}} key={index}>
                                    <Flex>
                                        <Flex.Item style={{flex: 1}}>
                                            <Img src={item.memberAvatar}
                                                 style={{width: '90px', height: '90px', borderRadius: '50%'}}/>
                                        </Flex.Item>
                                        <Flex.Item style={{flex: 3}}>
                                            <div style={{fontSize: '0.28rem', color: '#333'}}>{item.memberName.substring(0,1)+'****'+item.memberName.substring(item.memberName.length-1,item.memberName.length)}</div>
                                            <div style={{fontSise: '0.26rem', color: '#999'}}>{item.createTimeStr}</div>
                                        </Flex.Item>
                                        <Flex.Item
                                            style={{flex: 1.5, fontSize: '0.28rem', color: '#333', textAlign: 'right'}}>
                                            ￥{item.raisePrice}
                                        </Flex.Item>
                                    </Flex>
                                </List.Item>
                            })
                        }
                    </List>
                </TabPane>
            }

        </Tabs>
    }
}
export default withRouter(CrowdFundingMoreInfo);
