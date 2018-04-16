import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    Carousel,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Button,
    Card,
    Grid,
    Progress,
    Steps
} from 'antd-mobile';
import {Img, CartBar} from 'commonComponent';
import {common, utils} from 'common';
import CrowdFundingMoreInfo from '../components/CrowdFundingMoreInfo';
import {Map} from 'immutable'
import * as crowdFundingApi from '../api/crowdFundingApi'
const Item = List.Item;

import './crowdFundingDetail.less';

class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsDetailInfo: Map(),
            modal1: false,
            now: 0,
            init: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.specId != this.props.params.raiseId) {
            console.log('componentDidUpdate', prevProps.params.raiseId, this.props.params.specId);
        }
    }

    refresh = () => {
        Toast.loading();
        // 获取商品详情
        crowdFundingApi.raiseDetail({
            raiseId: this.props.params.raiseId
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            const goodsDetailInfo = Map(result.data);
            this.setState({
                goodsDetailInfo: goodsDetailInfo,
                init: true,
                now: result.now
            });

        });
    }

    componentDidMount() {
        this.refresh();
    }

    gotoCrowdFundingLuck = (raiseItemId) => {
        this.props.router.push(`/crowdFundingLuck/`+raiseItemId);
    }

    gotocrowdFundingFree = (raiseItemId) => {
        this.props.router.push(`/crowdFundingFree/`+raiseItemId);
    }
    gotoCrowdViewDetails = (raiseId) => {
        this.props.router.push(`/viewDetails/${raiseId}`);
    }

    render() {
        if (!this.state.init) {
            return null;
        }
        const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
        const goodsCallyList = goodsDetailInfo.raiseImageMore.split(",");
        const raiseItemList = goodsDetailInfo.raiseItemList;
console.log(goodsDetailInfo)
        return (
            <div className='wx-crowdfunding-detail'>
                <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
                    backgroundColor: 'white'
                }}>
                    <div style={{height: '7.5rem', overflow: 'hidden', position: 'relative'}}>
                        <Carousel autoplay={false} infinite={false} dots={true} selectedIndex={0} className="imgBoxdiv">
                            {
                                goodsCallyList.map((item, index) => (
                                    <Img key={index} src={item} style={{height:'750px'}}/>
                                ))
                            }
                        </Carousel>
                    </div>

                    <Flex className='wx-goods-detail-info' style={{padding: '0.2rem 0.2rem 0'}}>
                        <Flex.Item style={{flex: 2}} className="bargainImgl">
                            <div className="goodsnames">{goodsDetailInfo.raiseName}</div>
                            <div className="goodsIntroduce">{goodsDetailInfo.raiseSubtitleName}</div>
                        </Flex.Item>

                    </Flex>
                    <WhiteSpace size="sm"></WhiteSpace>

                    {goodsDetailInfo.goodsShow == 0 ? <div style={{
                        height: '1rem',
                        background: '#ddd',
                        lineHeight: '1rem',
                        textAlign: 'center',
                        fontSize: '0.5rem'
                    }}>商品已经下架啦~</div> : <div>
                        {/*进度条*/}
                        <div style={{padding: '0 0.2rem 0.2rem'}}>
                            <div className="show-info">
                                <div className="progress"><Progress
                                    percent={(utils.progressSum(goodsDetailInfo.raiseCurrentMoney, goodsDetailInfo.raiseMoney)* 100).toFixed(2)}
                                    position="normal"/></div>
                                <div aria-hidden="true"
                                     className="prigress_pesent">{(utils.progressSum(goodsDetailInfo.raiseCurrentMoney, goodsDetailInfo.raiseMoney) * 100).toFixed(2)}%
                                </div>
                            </div>
                        </div>
                        <Flex className='wx-goods-detail-info' style={{padding: '0.2rem 0.2rem 0.3rem'}}>
                            <Flex.Item style={{flex: 1}}>
                                <div className="crowd_list_title">支持人数</div>
                                <div className="crowd_list_num">{goodsDetailInfo.raisePerson}人</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 1}}>
                                <div className="crowd_list_title">已众筹金额</div>
                                <div className="crowd_list_num">
                                    ￥{utils.changeTwoDecimal_f(goodsDetailInfo.raiseCurrentMoney)}</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 1}}>
                                <div className="crowd_list_title">目标金额</div>
                                <div className="crowd_list_num">
                                    ￥{utils.changeTwoDecimal_f(goodsDetailInfo.raiseMoney)}</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 1}}>
                                <div className="crowd_list_title">剩余时间</div>
                                {
                                    goodsDetailInfo.activityStatus == 30 ? <div className="crowd_list_num">0天</div>:<div
                                        className="crowd_list_num">{Math.floor((goodsDetailInfo.endTime - this.state.now) / (24 * 3600 * 1000))}天
                                    </div>
                                }

                            </Flex.Item>
                        </Flex>
                        <div>
                            <List className="listItem_ification">
                                {
                                    raiseItemList.map((item, index) => {
                                        if (item.itemType == '10') {
                                            return <div key={index}>
                                                    {
                                                        goodsDetailInfo.activityStatus == 30 && <Item
                                                            arrow="horizontal"
                                                            extra="无回报支持党"
                                                            multipleLine
                                                            className="listItem_product listItem_product_no"
                                                            style={{padding: '0 0.2rem'}}>￥{item.minSupportPrice}</Item>
                                                    }
                                                    {
                                                        goodsDetailInfo.activityStatus == 20 && <Item
                                                            arrow="horizontal"
                                                            extra="无回报支持党"
                                                            multipleLine
                                                            onClick={()=>{this.gotocrowdFundingFree(item.raiseItemId)}}
                                                            className="listItem_product"
                                                            style={{padding: '0 0.2rem'}}>￥{item.minSupportPrice}</Item>
                                                    }
                                                </div>
                                        }
                                    })
                                }
                                {
                                    raiseItemList.map((item, index) => {
                                        if (item.itemType == '20') {
                                            return <div key={index}>
                                                    {
                                                        goodsDetailInfo.activityStatus == 30 && <Item
                                                            arrow="horizontal"
                                                            extra="抽奖党"
                                                            multipleLine
                                                            className="listItem_product listItem_product_no"
                                                            style={{padding: '0 0.2rem'}}>￥{item.minSupportPrice}</Item>
                                                    }
                                                    {
                                                        goodsDetailInfo.activityStatus == 20 &&<Item
                                                            arrow="horizontal"
                                                            extra="抽奖党"
                                                            multipleLine
                                                            onClick={()=>{this.gotoCrowdFundingLuck(item.raiseItemId)}}
                                                            className="listItem_product"
                                                            style={{padding: '0 0.2rem'}}>￥{item.minSupportPrice}</Item>
                                                    }

                                            </div>
                                        }
                                    })
                                }
                                <Item
                                    multipleLine
                                    onClick={() => {
                                        this.gotoCrowdViewDetails(goodsDetailInfo.raiseId)
                                    }}
                                    className="listItem_lookproduct"
                                    style={{padding: '0 0.2rem',borderTop:'1px solid #e5e5e5'}}
                                >
                                    查看档位详情
                                </Item>
                            </List>
                        </div>
                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        <CrowdFundingMoreInfo raiseDetail={goodsDetailInfo.raiseDetail} raiseId={goodsDetailInfo.raiseId} goodsDetailInfo={goodsDetailInfo} ></CrowdFundingMoreInfo>
                    </div>}
                    <Flex className="bargainBtn">
                        <Flex.Item style={{flex: 1}}>
                            {
                                goodsDetailInfo.activityStatus == 30 && <Button type='primary' style={{height: '0.65rem', margin: '0rem 0.2rem', lineHeight: '0.65rem',background:'#aaa',borderColor:'#aaa',borderRadius:'3px',fontSize:'0.28rem'}}>去支持（￥{raiseItemList[0].minSupportPrice}起）</Button>
                            }
                            {
                                goodsDetailInfo.activityStatus == 20 && <Button type='primary' onClick={()=>{this.gotoCrowdViewDetails(goodsDetailInfo.raiseId)}}
                                                                                style={{height: '0.65rem', margin: '0rem 0.2rem', lineHeight: '0.65rem',background:'#5491d2',borderColor:'#5491d2',borderRadius:'3px',fontSize:'0.28rem'}}>去支持（￥{raiseItemList[0].minSupportPrice}起）</Button>
                            }

                        </Flex.Item>
                    </Flex>
                </div>


            </div>
        )
    }
}

export default withRouter(GoodsDetail);
