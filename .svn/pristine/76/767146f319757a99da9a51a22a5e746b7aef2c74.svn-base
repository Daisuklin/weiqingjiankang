import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    List,
    Flex,
    Tabs
} from 'antd-mobile';
import {Img} from 'commonComponent';
import * as bargainApi from '../api/bargainApi';
import './BargainSpec.less'
const TabPane = Tabs.TabPane;

/**
 * 商品更多信息
 * @param {*} param0
 */
class BargainMoreInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpBargainList: [],
            topBargainList: []
        }
    }

    helpBargain = () => {
        if(this.props.bargainId){
            bargainApi.bargainRankingList({bargainId:this.props.bargainId}).then(result => {
                if (result.result == 1) {
                    this.setState({
                        helpBargainList: result.data
                    })
                }
            });
        }

    }

    topBargain = () => {
        bargainApi.bargainTopList({bargainActivityId:this.props.barbarianDetail.id}).then(result => {
            if (result.result == 1) {
                this.setState({
                    topBargainList: result.data
                })
            }
        });
    }

    handleTabClick = (key) => {
        switch (key) {
            case "2":
                this.helpBargain();
                break;
            case "3":
                this.topBargain();
                break;
        }
    }

    render() {
        let goodsDetailInfo=this.props.goodsDetailInfo;
        let barbarianDetail=this.props.barbarianDetail;
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
        return <Tabs animated={false} defaultActiveKey="1" swipeable={false} activeTextColor="#E43F47"  onChange={this.handleTabClick}
                     style={{padding: '0.2rem'}} className="wx-bargainMoreInfo">
            <TabPane tab="活动规则" key="1" style={{overflowX: 'hidden'}} >
                <div dangerouslySetInnerHTML={{__html: barbarianDetail.activityContent}}></div>
            </TabPane>
            <TabPane tab="亲友团出刀" key="2">
                <div style={{minHeight: '200px'}}>
                    {
                        this.state.helpBargainList.length > 0 && this.state.helpBargainList.map((item, index) => {
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
                                        ￥{item.bargainCutPrice}
                                    </Flex.Item>
                                </Flex>
                            </List.Item>
                        })
                    }
                </div>
            </TabPane>
            <TabPane tab="砍价排行TOP" key="3">
                <div style={{minHeight: '200px'}}>
                    {
                        this.state.topBargainList.length > 0 && this.state.topBargainList.map((item, index) => {
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
                                        ￥{item.bargainPrice}
                                    </Flex.Item>
                                </Flex>
                            </List.Item>
                        })
                    }
                </div>
            </TabPane>
            <TabPane tab="商品详情" key="4">
                {
                    goodsBody && goodsBody.length > 0 && goodsBody.map((item, index) => {
                        if (item.type == 'image') {
                            return <Img key={index} src={item.value} style={{width: '100%'}}></Img>
                        }
                    })
                }
            </TabPane>
        </Tabs>
    }
}
export  default withRouter(BargainMoreInfo);
