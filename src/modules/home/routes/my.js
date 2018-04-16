import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    Modal,
    Icon,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Grid,
    Button,
    Badge
} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as memberApi from '../api/member';
import * as goodsApi from 'common/api/goods';

import './my.less';

const Item = List.Item;

const OrderBadge = ({num}) => {
    return <div style={{
        position: 'absolute',
        top: '0.2rem',
        right: '0.35rem'
    }}>
        <Badge text={num}/>
    </div>
}

class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberDetail: null,
            relGoodsRecommedlist: []
        }
    }

    componentDidMount() {
        memberApi.memberDetail().then(result => {
            let data = result.data;
            if (data) {
                this.setState({
                    memberDetail: data[0]
                });
            }
        })

        goodsApi.relGoodsRecommedlist().then(result => {
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            let data = result.data;
            this.setState({
                relGoodsRecommedlist: data
            });
        });
    }

    gotoLogin = () => {
        common.gotoLogin();
    }

    renderItem = (item, index) => {
        const {memberDetail} = this.state;
        return <div style={{
            textAlign: 'center',
            height: '1.2rem',
            paddingTop: '0.1rem',
            position: 'relative'
        }}>
            <img src={item.icon} style={{height: '0.5rem'}}/>
            <div>{item.text}</div>
            {
                index == 0 && memberDetail.noPayOrder != 0 &&
                <OrderBadge num={memberDetail.noPayOrder}></OrderBadge>
            }
            {
                index == 1 && memberDetail.noReceiveOrder != 0 &&
                <OrderBadge num={memberDetail.noReceiveOrder}></OrderBadge>
            }
            {
                index == 2 && memberDetail.finishOrder != 0 &&
                <OrderBadge num={memberDetail.finishOrder}></OrderBadge>
            }
        </div>
    }

    onOrderMenuClick = (menu, index) => {
        // 售后跳售后列表
        if (index != 3) {
            if (index != 4) {
                if(index != 0){
                    this.props.router.push(`/orderList/${index + 2}`);
                }else{
                    this.props.router.push(`/orderList/${index + 1}`);
                }

            } else {
                window.location.href = `/mall/points.html#/pointsOrderList/3`
                // this.props.router.push(`/orderList/${index + 1}`);
            }

        } else {
            this.props.router.push('/afterSale');
        }
    }
    /*我的拼团*/
    gotoGinsegOrder = () => {
        // this.props.router.push('groupBuy.html#/ginsegOrderList/0')
        window.location.href = `/mall/groupBuy.html#/ginsegOrderList/0`;
    }
    /*我的众筹*/
    gotocrowdFunding = () => {
        window.location.href = `/mall/crowdFunding.html#/crowdFundingOrderList/0`;
    }
    gotoOrderList = () => {
        this.props.router.push(`/orderList/0`);
    }

    render() {
        const url = common.SERVER_DOMAIN;
        const orderMenu = [{
            icon: `./assets/img/weiqing/grzx-06@2x.png`,
            text: `待付款`,
        }, {
            icon: `./assets/img/weiqing/grzx-07@2x.png`,
            text: `已发货`,
        }, {
            icon: `./assets/img/weiqing/grzx-08@2x.png`,
            text: `已完成`,
        }, {
            icon: `./assets/img/weiqing/grzx-09@2x.png`,
            text: `退货记录`,
        }, {
            icon: `./assets/img/weiqing/grzx-22@2x.png`,
            text: `积分列表`,
        }
        ];

        const IconClass = ({url}) => {
            return <div style={{
                width: '0.40rem',
                height: '0.40rem',
                background: `url(${url}) center center /  0.4rem 0.4rem no-repeat`,
                display: 'inline-block',
                marginRight: '0.14rem',
                borderRadius: '50%',
                position: 'relative',
                top: '0.06rem'
            }}
            />
        }
        const isLogin = common.isLogin();
        const {memberDetail} = this.state;
        if (memberDetail == null) {
            return null;
        }
        return <div className='wx-my fix-scroll'>
            <Flex style={{height: '1.8rem', background: 'url(./assets/img/weiqing/grzxbj@2x.png) center / 100%'}}>
                <WingBlank style={{width: '100%'}}>
                    <Flex>
                        <div style={{width: '1.1rem', height: '1.1rem', marginRight: '0.2rem'}}><Img
                            style={{width: '1.1rem', height: '1.1rem', borderRadius: '50%'}}
                            src={memberDetail.memberAvatar}></Img></div>
                        <div className="user_account" style={{width: '100%', paddingLeft: '0.2rem'}}>
                            <Flex justify="between">
                                <div>
                                    {
                                        isLogin && memberDetail ? <div className="memberName">
                                            账户 : {memberDetail.memberName}
                                        </div> : null
                                    }
                                    <div className="membership">会员<img src={'./assets/img/weiqing/VIP@2x.png'} style={{
                                        width: '0.2rem',
                                        height: '0.19rem',
                                        paddingLeft: '0.1rem'
                                    }}/></div>
                                </div>
                                <div onClick={() => {
                                    if (common.isLogin()) {
                                        this.props.router.push('/account')
                                    }
                                }}><img src="./assets/img/weiqing/shezhi@2x.png"
                                        style={{width: '0.4rem', height: '0.4rem'}}/></div>
                            </Flex>


                        </div>

                    </Flex>
                </WingBlank>
            </Flex>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <List renderHeader={
                <Flex justify='between'>
                    <div><IconClass url={'./assets/img/weiqing/grzx-10@2x.png'}
                                    style={{borderRadius: '50%'}}></IconClass>
                        <div style={{display: 'inline-block', float: 'right', marginTop: '0.10rem'}}>商品订单</div>
                    </div>
                    <Flex onClick={this.gotoOrderList} style={{fongSize: '0.28rem', color: '#999'}}>
                        全部订单<Icon type='right'/>
                    </Flex>
                </Flex>
            } className="my_order">
                <Grid data={orderMenu}
                      columnNum={5} hasLine={false}
                      onClick={this.onOrderMenuClick}
                      renderItem={this.renderItem}
                      className="my_order_grid">
                </Grid>
            </List>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <List className='wx-my-moneybag' renderHeader={
                <Flex justify='between'>
                    <div><IconClass url={'./assets/img/weiqing/grzx-05@2x.png'}></IconClass>
                        <div style={{display: 'inline-block', float: 'right', marginTop: '0.10rem'}}>我的钱包</div>
                    </div>
                </Flex>}>
                <Flex style={{height: '1.2rem'}}>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/balance')
                    }}>
                        <img src="./assets/img/weiqing/grzx-01@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>可用余额</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/lockBalance')
                    }}>
                        <img src="./assets/img/weiqing/grzx-02@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>锁定余额</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/myIntegral')
                    }}>
                        <img src="./assets/img/weiqing/grzx-03@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>积分纪录</div>
                    </Flex.Item>

                    <Flex.Item onClick={() => {
                        this.props.router.push('/coupon')
                    }}>
                        <img src="./assets/img/weiqing/grzx-04@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>优惠券</div>
                    </Flex.Item>
                </Flex>
            </List>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            {/*个人中心-导航*/}
            <div className="my_navigation">
                <Flex style={{borderBottom: '1px solid #e6e6e6'}}>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/attention/1')
                    }}>
                        <img src="./assets/img/weiqing/grzx-12@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>收藏商品</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/attention/2')
                    }}>
                        <img src="./assets/img/weiqing/grzx-13@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>收藏店铺</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/viewRecord')
                    }}>
                        <img src="./assets/img/weiqing/grzx-14@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>浏览记录</div>
                    </Flex.Item>

                    <Flex.Item onClick={() => {
                        this.props.router.push('/myEvaluate')
                    }}>
                        <img src="./assets/img/weiqing/grzx-15@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>我的评价</div>
                    </Flex.Item>
                    <Flex.Item onClick={this.gotocrowdFunding}>
                        <img src="./assets/img/weiqing/grzx-16@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>我的众筹</div>
                    </Flex.Item>
                </Flex>
                <Flex style={{borderBottom: '1px solid #e6e6e6'}}>
                    <Flex.Item onClick={this.gotoGinsegOrder}>
                        <img src="./assets/img/weiqing/grzx-17@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>我的拼团</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        // this.props.router.push('/barGainOrderList/0')
                        window.location.href = `/mall/bargain.html#/barGainOrderList/0`;
                    }}>
                        <img src="./assets/img/weiqing/grzx-18@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>我的砍价</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/geneDetectioinOrderList/0')
                    }}>
                        <img src="./assets/img/weiqing/grzx-19@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>我的基因检测</div>
                    </Flex.Item>

                    <Flex.Item onClick={() => {
                        this.props.router.push('/customerService')
                    }}>
                        <img src="./assets/img/weiqing/grzx-20@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>联系客服</div>
                    </Flex.Item>
                    <Flex.Item onClick={() => {
                        this.props.router.push('/afterSale')
                    }}>
                        <img src="./assets/img/weiqing/grzx-21@2x.png" style={{paddingButtom: '0.1rem'}}/>
                        <div style={{paddingTop: '0.1rem'}}>售后</div>
                    </Flex.Item>
                </Flex>
            </div>
        </div>
    }
}

export default withRouter(My);
