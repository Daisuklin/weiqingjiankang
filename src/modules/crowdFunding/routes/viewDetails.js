/**
 * 众筹查看列表
 * Created by 10400 on 2017/6/9.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    WhiteSpace,
    Modal,
    WingBlank,
    Progress,
    Tabs,
    List,
    Flex,
    Button
} from 'antd-mobile';
import { common } from 'common';
import * as crowdFundingApi from '../api/crowdFundingApi';
import { Img } from 'commonComponent';
import {Map} from 'immutable';
import './viewDetails.less';

const TabPane = Tabs.TabPane;

class ViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crowdItemsList: Map(),
            init:'false',
            goodsDetailInfo: Map(),
        }
    }

    componentDidMount() {
        crowdFundingApi.crowdItems({
            raiseId:this.props.params.raiseId
        }).then(result => {
            if (result.result == 1) {
                const crowdItemsList=result.data;
                // const itemType=crowdItemsList;
                // console.log(itemType);
                this.setState({
                    // ...result.data
                    crowdItemsList:crowdItemsList
                })

            }
        });

        crowdFundingApi.raiseDetail({
            raiseId: this.props.params.raiseId
        }).then(result => {
            if (result.result == 1) {
                const goodsDetailInfo = result.data;
                this.setState({
                    goodsDetailInfo: goodsDetailInfo,
                    init: true
                });
            }
        });
    }
    gotoCrowdFundingLuck = (raiseItemId) => {
        this.props.router.push(`/crowdFundingLuck/`+raiseItemId);
    }

    gotocrowdFundingFree = (raiseItemId) => {
        this.props.router.push(`/crowdFundingFree/`+raiseItemId);
    }
    render() {
        const {
            crowdItemsList,goodsDetailInfo
        } = this.state;
        if (!this.state.init) {
            return null
        }
        console.log(goodsDetailInfo);
        return (
            <div className='wx-viewDetail'>
                {
                    crowdItemsList && crowdItemsList.map((crowdItems,index)=>{
                        return <div className="viewDetail_contentFree" key={index}>
                            <Flex>
                                {
                                    crowdItems.itemType == 10 && <Flex.Item style={{flex:2}}>
                                        <span className="view_title">无私奉献</span>
                                    </Flex.Item>
                                }
                                {
                                    crowdItems.itemType == 20 && <Flex.Item style={{flex:2}}>
                                        <span className="view_title">档位金额： ￥{crowdItems.minSupportPrice}</span>
                                        <Button size="small" inline style={{background:'#5491d2',
                                            color:'#fff',borderColor:'#5491d2',borderRadius:'0.3rem',lineHeight:'0.5rem',height:'0.5rem'}}>抽奖</Button>
                                    </Flex.Item>
                                }

                                <Flex.Item style={{flex:1,textAlign:'right'}}>
                                    {
                                        crowdItems.itemType == 10 && <Button size="small" inline style={{background:'#5491d2',
                                            color:'#fff',borderColor:'#5491d2',lineHeight:'0.5rem',height:'0.5rem'}} onClick={()=>{this.gotocrowdFundingFree(crowdItems.raiseItemId)}}>去支持</Button>
                                    }
                                    {
                                        crowdItems.itemType == 20 && <Button size="small" inline style={{background:'#5491d2',
                                            color:'#fff',borderColor:'#5491d2',lineHeight:'0.5rem',height:'0.5rem'}} onClick={()=>{this.gotoCrowdFundingLuck(crowdItems.raiseItemId)}}>去支持</Button>
                                    }
                                </Flex.Item>
                            </Flex>
                            <div className="viewDetail_report">
                                汇报内容：<br />
                                {crowdItems.itemDescription}
                            </div>
                            {
                                crowdItems.itemType == 20 ? <div>
                                    <div className="viewDetail_font">配送运费：{crowdItems.shippingPrice}</div>
                                    <div className="viewDetail_font">预计回报发送时间：项目成功结束后 {goodsDetailInfo.returnTime} 天内</div>
                                </div> : ''
                            }
                            <div className="viewDetail_font">已有 {crowdItems.currentPerson} 人支持</div>
                        </div>
                    })
                }

                {/*<div className="viewDetail_contentLuck">
                    <Flex>
                        <Flex.Item style={{flex:2}}>
                            <span className="view_title">档位金额： ￥1.00</span>
                            <Button size="small" inline style={{background:'#5491d2',
                            color:'#fff',borderColor:'#5491d2',borderRadius:'0.3rem',lineHeight:'0.5rem',height:'0.5rem'}}>抽奖</Button>
                        </Flex.Item>
                        <Flex.Item style={{flex:1,textAlign:'right'}}>
                            <Button size="small" inline style={{background:'#5491d2',
                                color:'#fff',borderColor:'#5491d2',lineHeight:'0.5rem',height:'0.5rem'}}>去支持</Button>
                        </Flex.Item>
                    </Flex>
                    <div className="viewDetail_report">
                        汇报内容：<br />
                        感谢您对我的信任，我们将带着您的这份信任杨帆远航感谢您对我的信任，我们将带着您的这份信任杨帆远航
                    </div>
                    <div className="viewDetail_font">配送运费：免运费</div>
                    <div className="viewDetail_font">预计回报发送时间：项目成功结束后15天内</div>
                    <div className="viewDetail_font">已有34人支持</div>
                </div>

                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>

                <div className="viewDetail_contentFree">
                    <Flex>
                        <Flex.Item style={{flex:2}}>
                            <span className="view_title">无私奉献</span>
                        </Flex.Item>
                        <Flex.Item style={{flex:1,textAlign:'right'}}>
                            <Button size="small" inline style={{background:'#5491d2',
                                color:'#fff',borderColor:'#5491d2',lineHeight:'0.5rem',height:'0.5rem'}}>去支持</Button>
                        </Flex.Item>
                    </Flex>
                    <div className="viewDetail_report">
                        汇报内容：<br />
                        感谢您对我的信任，我们将带着您的这份信任杨帆远航感谢您对我的信任，我们将带着您的这份信任杨帆远航
                    </div>
                    <div className="viewDetail_font">已有34人支持</div>
                </div>*/}


            </div>
        )
    }
}

export default withRouter(ViewDetails);

