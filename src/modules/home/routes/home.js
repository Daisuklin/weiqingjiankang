import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Carousel, Modal, SearchBar, Flex, WhiteSpace, WingBlank, Icon, Toast} from 'antd-mobile';
import {queryIndexData} from '../api';
import HomeCarouselBlock from '../components/HomeCarouselBlock'
import HomeFunctionBlock from '../components/HomeFunctionBlock'
import {Img} from 'commonComponent';
// import HomePromotionBlock from '../components/HomePromotionBlock'
import HomeFloorGoods from '../components/HomeFloorGoods';
import HomeNewGoodsBlock from '../components/HomeNewGoodsBlock';
import HomeRecommendGoods from 'commonComponent/RecommendGoods';

import './home.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floorList: [],
            relGoodsRecommedlist: [],
            activityBeenList: [], //
            advList: [], // 轮播
            navigationList: [],
            recommendGoodslist: [],
            adv: [],
            isInit: false
        }
    }

    componentWillMount() {
        Toast.loading();
        queryIndexData().then(result => {
            Toast.hide();
            let data = result.data[0];
            this.setState({
                advList: data.advPosition.advList,
                activityBeenList: data.activityBeenList,
                recommendGoodslist: data.recommendGoodslist,
                relGoodsRecommedlist: data.relGoodsRecommedlist,
                floorList: data.floorList,
                navigationList: data.navigationList,
                adv: data.advList,
                isInit: true
            });
        });
    }

    onSearch = () => {
        this.props.router.push('/gotoSearch');
    }

    render() {
        const {
            floorList,
            relGoodsRecommedlist,
            activityBeenList,
            advPosition,
            recommendGoodslist,
            navigationList,
            isInit
        } = this.state;
        if (!isInit) {
            return null;
        }
        return (
            <div className='wx-index fix-scroll'>
                {/*搜索*/}
                <div className='index-search'>
                    <Flex justify='between'>
                        <SearchBar placeholder="产品搜索" onFocus={this.onSearch}></SearchBar>
                        <div style={{width: '10%', paddingRight: '0.1em'}}>
                            <img src='./assets/img/img-index_01.png' style={{width: '80%'}} onClick={() => {
                                window.location.href = '/mall/goodsClass.html#/';
                            }}/>
                        </div>
                    </Flex>
                </div>
                {/*搜索*/}

                <HomeCarouselBlock data={this.state.advList}></HomeCarouselBlock>
                <HomeFunctionBlock data={this.state.navigationList}></HomeFunctionBlock>
                {/*{
                 this.state.activityBeenList && this.state.activityBeenList.map(activityBeen => {
                 return <HomePromotionBlock key={activityBeen.activityTypeValue}
                 data={activityBeen}></HomePromotionBlock>
                 })
                 }*/}
                <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                {
                    this.state.adv.length>0 && <Flex style={{height: '2rem'}}>
                        <a href={this.state.adv[0].advUrl} style={{width: '100%'}}>
                            <Img src={this.state.adv[0].resUrl} style={{width: '100%', height: '2rem'}}/>
                            {/*<img src="./assets/img/icon-ad_01.jpg" width="100%"/>*/}
                        </a>
                    </Flex>
                }
                {/*<WhiteSpace size="md" style={{background: '#f3f3f3'}}/>*/}
                <HomeNewGoodsBlock data={this.state.recommendGoodslist}></HomeNewGoodsBlock>

                {
                    this.state.adv.length>1 && <Flex style={{height: '2rem',paddingBottom:'0.1rem'}}>
                        <a href={this.state.adv[1].advUrl} style={{width: '100%'}}>
                            <Img src={this.state.adv[1].resUrl} style={{width: '100%', height: '2.05rem'}}/>
                            {/*<img src="./assets/img/icon-ad_01.jpg" width="100%"/>*/}
                        </a>
                    </Flex>
                }
                {
                    this.state.floorList && this.state.floorList.map((floor, index) => {
                        // console.log(index)
                        return <HomeFloorGoods
                            stateIndex={index}
                            key={index} data={floor}></HomeFloorGoods>
                    })
                }
                <WhiteSpace style={{height: '1rem'}}/>
                {/*<HomeRecommendGoods data={this.state.relGoodsRecommedlist}></HomeRecommendGoods>*/}
            </div>
        )
    }
}

export default withRouter(Home);
