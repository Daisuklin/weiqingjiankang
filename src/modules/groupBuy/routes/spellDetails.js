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
    Popup,
    Modal
} from 'antd-mobile';
import {Img, CartBar} from 'commonComponent';
import {common} from 'common';
import BargainMoreInfo from '../components/BargainMoreInfo';
import BargainStoreInfo from '../components/BargainStoreInfo';
import GoodsSpec from '../components/GoodsSpec';
import {Map} from 'immutable'
import * as groupApi from '../api/groupBuy';
// import * as cartApi from '../api/cart';
import './spellDetails.less';

class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsDetailInfo: Map(),
            modal1: false,
            groupItemId: '',
            init: false,
            buyCount: 1,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.specId != this.props.params.specId) {
            // console.log('componentDidUpdate', prevProps.params.specId, this.props.params.specId);
            this.refresh();
        }
    }

    refresh = () => {
        Toast.loading();
        // 获取商品详情
        groupApi.spellDetails({
            groupId: this.props.params.groupId,
            // goodsNumber:this.state.buyCount
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.info(result.msg);
                return;
            }
            const goodsDetailInfo = result.data;
            this.setState({
                goodsDetailInfo: goodsDetailInfo,
                init: true
            });
        });

    }
    componentDidMount() {
        this.refresh();
    }
    /**
     * 查看拼团详情
     */
    getSpec = (e) => {
         const goodsDetailInfo = this.state.goodsDetailInfo;
        Popup.show(
            <GoodsSpec
                 gotoBuy={this.gotoBuy}
                 buyCount={this.state.buyCount}
                 onChangeBuyNum={this.onChangeBuyNum}
                goodsDetailInfo={goodsDetailInfo}
                groupItemId={this.state.groupItemId}
                onClose={() => Popup.hide()}/>,
            {animationType: 'slide-up'}
        );

    }

    onChangeBuyNum = (num) => {
        this.setState({
            buyCount: num
        });
        console.log(num);
    }

    // 立即购买
    gotoBuy = (groupNumber,specId,groupItemId,groupDetailId) => {
        groupApi.grouppurchase({
            specId:specId,
            groupItemId:groupItemId,
            goodsNumber:groupNumber,
            groupDetailId:groupDetailId
        }).then(result =>{
            const data = result.data;
            console.log(groupDetailId)
            if (result.result == 1) {
                this.props.router.push(`/spellorder/${specId}/${groupItemId}/${groupNumber}/isNot`);
                /*this.props.router.push({
                    pathname: '/spellorder',
                    state: {
                        data
                    }
                })*/
            } else {
                Toast.fail(result.msg);
            }
        })
        // this.props.router.push(`/spellorder/${specId}/${groupItemId}/${groupNumber}/isNot`);
        // console.log(groupNumber,specId,groupItemId)
    }


    showModal = (key, item) => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
            imgurl: item
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    Close = () => {
        this.setState({
            modal1: false,
        });
    }

    render() {
        const goodsDetailInfo = this.state.goodsDetailInfo;
        if (!this.state.init) {
            return null;
        }
        const imageMore = goodsDetailInfo.groupImageMore.split(",");
        // 获取规格组合名
        // 判断是否有规格参数
        const vals_xg = goodsDetailInfo.groupItemList || ''
        //规格参数用变量 vals_xg  代替
        const vals = Object.keys(vals_xg).map(function (key) {
            return vals_xg[key];
        });
        //const selectedSpecGoodsSpec = vals.join(' '); onClick={this.showModal('modal1',item)}
        const selectedSpecGoodsSpec = vals;
        console.log(goodsDetailInfo)
        return (
            <div className='wx-goods-detail'>
                <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
                    backgroundColor: 'white', position: 'relative'
                }}>
                    <div style={{height: '7.5rem', overflow: 'hidden', position: 'relative'}}>
                        <Carousel autoplay={false} infinite={false} dots={true} selectedIndex={0} className="imgBoxdiv" style={{height: '7.5rem'}}>
                            {
                                imageMore.map((item, index) => (
                                    <Img key={index} src={item} onClick={this.showModal('modal1', item)} style={{height:'100% !important' ,maxHeight:'7.5rem',width:'100%'}}/>
                                ))
                            }
                        </Carousel>
                    </div>

                    <Modal title="商品详情"
                           visible={this.state.modal1}
                           transparent
                           maskClosable={true}
                           onClose={this.onClose('modal1')}
                           style={{width: '8rem', height: '10rem'}}
                    >
                        <Img className='imgDe' onClick={() => this.Close()} src={this.state.imgurl}
                             style={{width: '8rem', height: '8rem'}}/>
                    </Modal>
                    <div>
                        <Flex className='wx-goods-detail-info' style={{padding: '0.2rem 0.2rem 0.1rem'}}>
                            <Flex.Item style={{flex: 2}} className="bargainImgl">
                                <div style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}} className="goodsnames">{goodsDetailInfo.groupName}</div>
                                {/*<div className="goodsIntroduce">{goodsDetailInfo.description}</div>*/}
                            </Flex.Item>
                            <Flex.Item style={{flex: 1, textAlign: 'right'}}>
                                <Button type='primary' size='small' inline
                                        onClick={() => common.gotoGoodsDetail({specId: goodsDetailInfo.specId})} activeStyle={false}>查看商品详情</Button>
                            </Flex.Item>
                        </Flex>
                        <div style={{padding: '0rem 0.2rem 0.2rem'}}>
                            <span style={{
                                fontSize: '0.26rem',
                                color: '#e2536b'
                            }}>￥{goodsDetailInfo.groupItemList[0].groupPrice}</span>
                            <del style={{fontSize: '0.24rem', color: '#999', paddingLeft: '0.2rem'}}>
                                ￥{goodsDetailInfo.goodsPrice}</del>
                        </div>
                    </div>
                    {goodsDetailInfo.groupItemList == 0 ? <div style={{
                        height: '1rem',
                        background: '#ddd',
                        lineHeight: '1rem',
                        textAlign: 'center',
                        fontSize: '0.5rem'
                    }}>商品已经下架啦~</div> : <div>
                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>

                        <Flex className='wx-goods-detail-info' style={{padding: '0.3rem 0.2rem'}}>
                            <Flex.Item style={{flex: 4, textAlign: 'right'}}>
                                <div className="felx_btn_box padding-b-20">
                                    <Flex wrap="wrap" justify="between">
                                        {/*已选：{selectedSpecGoodsSpec}*/}
                                        {selectedSpecGoodsSpec.map((value, index) => {
                                            if (value.packageName !== '不限') {
                                                return <Button key={index} onClick={() => {
                                                    this.setState({
                                                        groupItemId: value.groupItemId
                                                    },this.getSpec)

                                                }} type="ghost" inline size="small"
                                                               style={this.state.showButtom == index ? {margin: '0.08rem',} : {
                                                                   margin: '0.08rem',
                                                                   color: '#666',
                                                                   borderColor: '#666',
                                                                   width:'47%'
                                                               }} activeStyle={{background:'#00a9e0',borderColor:'#00a9e0',color:'#fff'}}>￥{value.groupPrice} ({value.groupPerson}人团)</Button>
                                            } else {
                                                return <Button key={index} onClick={() => {
                                                    this.setState({
                                                        groupItemId: value.groupItemId
                                                    },this.getSpec)
                                                }} type="ghost" inline size="small"
                                                               style={this.state.showButtom == index ? {margin: '0.08rem',} : {
                                                                   margin: '0.08rem',
                                                                   color: '#666',
                                                                   borderColor: '#666'
                                                               }}>￥{value.groupPrice} ({value.groupPerson}人团)</Button>
                                            }
                                        })
                                        }
                                    </Flex>
                                </div>
                            </Flex.Item>
                        </Flex>

                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        <BargainStoreInfo goodsDetailInfo={goodsDetailInfo}></BargainStoreInfo>
                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        <BargainMoreInfo goodsDetailInfo={goodsDetailInfo}></BargainMoreInfo>
                    </div>}
                </div>


            </div>
        )
    }
}

export default withRouter(GoodsDetail);
