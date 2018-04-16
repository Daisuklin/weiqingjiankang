/**
 * 众筹列表
 * Created by 10400 on 2017/6/9.
 */
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    Modal,
    WingBlank,
    Progress,
    Tabs,
    List,
    Flex,
    Button,
    Toast
} from 'antd-mobile';
import {common,utils} from 'common';
import {Img} from 'commonComponent';
import * as crowdFundingApi from '../api/crowdFundingApi'
import './crowdFunding.less';

const TabPane = Tabs.TabPane;

class Attention extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beginRaiseList: [],
            endRaiseList: [],
            now:new Date().getMilliseconds(),
            storeId:"",
            init: false
        }
    }

    componentDidMount() {
        const storeId=this.props.params.storeId;
        if(storeId!='all'){
            this.state = {
                storeId:storeId
            }
        }
        this.onChangeTab(1);
    }

    onChangeTab = (key) => {
        if(key==1){
            crowdFundingApi.raiseList({
                storeId: this.state.storeId,
                activityStatus: 20,
                pageno: 1,
                pageSize: 20
            }).then(result => {
                if (result.result == 1) {
                        this.setState({
                            beginRaiseList: result.data.raiseList,
                            now:result.data.now,
                            init:true
                        })
                } else {
                    Toast.msg(result.msg)
                }
            })
        }else if(key==2){
            crowdFundingApi.raiseList({
                storeId: this.state.storeId,
                activityStatus: 30,
                pageno: 1,
                pageSize: 20
            }).then(result => {
                if (result.result == 1) {
                        this.setState({
                            endRaiseList: result.data.raiseList,
                            now:result.data.now,
                            init:true
                        })
                } else {
                    Toast.msg(result.msg)
                }
            })
        }
    }

    onClick = (raiseId) => {
        common.gotocrowdFundingDetail({raiseId: raiseId});
    }

    gotoStore = (item) => {
        if (item.store.storeId == 0) {
            return;
        }
        this.props.router.push(`/store/${item.store.storeId}/index`)
    }

    render() {
        const {
            beginRaiseList,
            endRaiseList,
            now
        } = this.state;
        if(!this.state.init){
            return null;
        }
        console.log(beginRaiseList)
        return (
            <div className='wx-attention-crowfunding fix-scroll'>
                <Tabs swipeable={false} defaultActiveKey="1" onChange={this.onChangeTab} style={{marginTop: '0.9rem'}}>
                    <TabPane tab="众筹中" key="1">
                        <List style={{padding: '0.3rem 0rem'}}>
                            {
                                beginRaiseList.length>0 && beginRaiseList.map((item, index) => <List.Item key={index}
                                                                                                 className="wx-crowd-content"
                                                                                                 style={{background: 'none'}}>
                                        <Flex direction="column" className="wx-crowd-content-Flex">
                                            <Flex.Item
                                                onClick={() => this.onClick(item.raiseId)}
                                                style={{width: '100%'}}><Img src={item.raiseImage}
                                                                             style={{width: '100%', height: '3.5rem'}}/>
                                            </Flex.Item>
                                            <Flex.Item style={{width: '100%', marginLeft: '0px', padding: '0px 0.2rem'}}>
                                                <Flex justify="between" style={{padding: '0.15rem 0px 0.08rem'}}>
                                                    <div onClick={() => this.onClick(item.raiseId)}
                                                         className='text-overflow-hidden'>{item.raiseSubtitleName}</div>
                                                    <div style={{textAlign: 'right'}}>
                                                        <Button type='primary' size='small' inline style={{
                                                            backgroundColor: '#5491d2',
                                                            borderColor: '#5491d2',
                                                            fontSize: '0.24rem',
                                                            padding: '0px 0.2rem'
                                                        }}>众筹中</Button>
                                                    </div>
                                                </Flex>
                                                <div style={{
                                                    color: '#666',
                                                    fontSize: '0.24rem',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>{item.storeName}</div>
                                                <WhiteSpace size="sm"/>
                                                <div className="show-info">
                                                    <div className="progress"><Progress percent={(utils.progressSum(item.raiseCurrentMoney,item.raiseMoney) * 100).toFixed(2)} position="normal"/>
                                                    </div>
                                                    <div aria-hidden="true" className="prigress_pesent">{(utils.progressSum(item.raiseCurrentMoney,item.raiseMoney) * 100).toFixed(2)}%</div>
                                                </div>
                                                <WhiteSpace size="lg"/>
                                                <Flex justify="between">
                                                    <Flex.Item style={{flex: 1.5}}><img
                                                        src="./assets/img/weiqing/zhongchou-02@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">￥{utils.changeTwoDecimal_f(item.raiseCurrentMoney)}</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1.5}}><img
                                                        src="./assets/img/weiqing/zhongchou-03@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">￥{utils.changeTwoDecimal_f(item.raiseMoney)}</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1.5, textAlign: 'center'}}><img
                                                        src="./assets/img/weiqing/zhongchou-04@2x.png" style={{
                                                        width: '0.24rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span className="span_price">{item.raisePerson}人</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1.5, textAlign: 'right'}}><img
                                                        src="./assets/img/weiqing/zhongchou-05@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">{Math.floor((item.endTime - now) / (24 * 3600 * 1000))}天</span></Flex.Item>
                                                </Flex>

                                            </Flex.Item>
                                        </Flex>
                                    </List.Item>
                                )
                            }
                        </List>
                    </TabPane>
                    <TabPane tab="已结束" key="2">
                        <List style={{padding: '0.3rem 0rem'}}>
                            {
                                endRaiseList.length>0 && endRaiseList.map((item, index) => <List.Item key={index}
                                                                                                          className="wx-crowd-content"
                                                                                                          style={{background: 'none'}}>
                                        <Flex direction="column" className="wx-crowd-content-Flex">
                                            <Flex.Item
                                                onClick={() => this.onClick(item.raiseId)}
                                                style={{width: '100%'}}><Img src={item.raiseImage}
                                                                             style={{width: '100%', height: '3.5rem'}}/>
                                            </Flex.Item>
                                            <Flex.Item style={{width: '100%', marginLeft: '0px', padding: '0px 0.3rem'}}>
                                                <Flex justify="between" style={{padding: '0.15rem 0px 0.08rem'}}>
                                                    <div onClick={() => this.onClick(item)}
                                                         className='text-overflow-hidden'>{item.raiseSubtitleName}</div>
                                                    <div style={{textAlign: 'right'}}>
                                                        <Button type='primary' size='small' inline style={{
                                                            backgroundColor: '#999',
                                                            borderColor: '#999',
                                                            fontSize: '0.24rem',
                                                            padding: '0px 0.1rem',
                                                            color:'#fff'
                                                        }}>已结束</Button>
                                                    </div>
                                                </Flex>
                                                <div style={{
                                                    color: '#666',
                                                    fontSize: '0.24rem',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>{item.storeName}</div>
                                                <WhiteSpace size="sm"/>
                                                <div className="show-info">
                                                    <div className="progress"><Progress percent={(utils.progressSum(item.raiseCurrentMoney,item.raiseMoney) * 100).toFixed(2)} position="normal"/>
                                                    </div>
                                                    <div aria-hidden="true" className="prigress_pesent">{(utils.progressSum(item.raiseCurrentMoney,item.raiseMoney) * 100).toFixed(2)}%</div>
                                                </div>
                                                <WhiteSpace size="lg"/>
                                                <Flex justify="between">
                                                    <Flex.Item style={{flex: 1.5}}><img
                                                        src="./assets/img/weiqing/zhongchou-02@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">￥{utils.changeTwoDecimal_f(item.raiseCurrentMoney)}</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1.5}}><img
                                                        src="./assets/img/weiqing/zhongchou-03@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">￥{utils.changeTwoDecimal_f(item.raiseMoney)}</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1.5, textAlign: 'center'}}><img
                                                        src="./assets/img/weiqing/zhongchou-04@2x.png" style={{
                                                        width: '0.24rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span className="span_price">{item.raisePerson}人</span></Flex.Item>
                                                    <Flex.Item style={{flex: 1, textAlign: 'right'}}><img
                                                        src="./assets/img/weiqing/zhongchou-05@2x.png" style={{
                                                        width: '0.34rem',
                                                        height: '0.34rem',
                                                        position: 'relative',
                                                        bottom: '3px'
                                                    }}/><span
                                                        className="span_price">{/*{Math.floor((item.endTime - now) / (24 * 3600 * 1000))}*/ }0 天</span></Flex.Item>
                                                </Flex>

                                            </Flex.Item>
                                        </Flex>
                                    </List.Item>
                                )
                            }
                        </List>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default withRouter(Attention);

