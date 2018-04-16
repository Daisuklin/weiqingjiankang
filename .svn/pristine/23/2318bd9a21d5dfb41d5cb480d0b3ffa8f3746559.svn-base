import React, {Component} from 'react';
import {Grid, Flex, WhiteSpace, Icon, List, WingBlank} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import './HottesList.less';
const IconClass = ({url}) => {
    return <div style={{
        width: '0.50rem',
        height: '0.50rem',
        background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
        float: 'left',
        marginRight: '0.1rem'
    }}
    />
}
class HomeNewGoodsBlock extends React.PureComponent {

    gotocrowdFundingDetail = (el, index) => {
        common.gotocrowdFundingDetail({raiseId: el.raiseId});
    }

    gotoGroupBuyDetail=(el, index)=>{
        common.gotoSpellDetaileds({specId:el.groupId});
    }

    ongotoTimeBuy = () => {
        window.location.href = `/mall/timeBuy.html#/timeBuy/`+this.props.storeId;
    }
    gotoBargain = () => {
        window.location.href = `/mall/bargain.html#/bargain/`+this.props.storeId;
    }
    gotoGroupBuy = () => {
        console.log(2);
        window.location.href = `/mall/groupBuy.html#/groupBuy/`+this.props.storeId;
    }
    gotoBuy = (el, index) => {
        common.gotoGoodsDetail({specId: el.objectId});
    }
    gotoBargainDetail = (el, index) => {
        common.gotoBargainDetail({id: el.id});
    }
    gotocrowdFunding = () => {
        window.location.href = `/mall/crowdFunding.html#/crowdFunding/`+this.props.storeId;

    }

    //众筹
    renderItem = (dataItem) => {
        return <Flex className="hottesListBox" direction='column' onClick={() => console.log(dataItem)} >
            <Flex.Item style={{textAlign: 'center', position: 'relative'}}>
                <Img src={dataItem.raiseImage}
                     style={{maxWidth: '1.76rem',width:'100%', height: '1.76rem',borderRadius: '13px', marginTop: '0.14rem'}}/>
                <span className="span_txt"><img src="./assets/img/weiqing/zhongchou-02@2x (2).png" style={{width:'80px',height:'36px'}}/></span>
            </Flex.Item>
            <Flex.Item style={{width:'100%'}}>
                <div className="hottesList_name text-overflow-hidden">{dataItem.raiseName}</div>
            </Flex.Item>
            <div>
                <Flex.Item>
                    <div className="hottesList_money">￥{dataItem.raiseMoney}</div>
                </Flex.Item>
            </div>
            <Flex.Item style={{width: '90%'}}>
                <div className="text-overflow-hidden hottesList_oldprice">
                    <del>￥{dataItem.raiseCurrentMoney}</del>
                </div>
            </Flex.Item>

        </Flex>

    }

    //秒杀
    specKillItem = (dataItem) => {
        return <Flex className="hottesListBox" direction='column' onClick={() => console.log(dataItem)}>
            <Flex.Item style={{textAlign: 'center', position: 'relative'}}>
                <Img src={dataItem.goodsImage}
                     style={{maxWidth: '1.76rem',width:'100%', height: '1.76rem', borderRadius: '13px', marginTop: '0.14rem'}}/>
                <span className="span_txt"><img src="./assets/img/weiqing/miaosha-02@2x.png" style={{width:'80px',height:'36px'}}/></span>
            </Flex.Item>
            <Flex.Item style={{width:'100%'}}>
                <div className="hottesList_name text-overflow-hidden">{dataItem.goodsName}</div>
            </Flex.Item>
            <div>
                <Flex.Item>
                    <div className="hottesList_money">￥{dataItem.price}</div>
                </Flex.Item>
            </div>
            <Flex.Item style={{width: '90%'}}>
                <div className="text-overflow-hidden hottesList_oldprice">
                    <del>￥{dataItem.specGoodsPrice}</del>
                </div>
            </Flex.Item>

        </Flex>

    }

    //砍价
    bargainItem = (dataItem) => {
        return <Flex className="hottesListBox" direction='column' onClick={() => console.log(dataItem)}>
            <Flex.Item style={{textAlign: 'center', position: 'relative'}}>
                <Img src={dataItem.pic}
                     style={{maxWidth: '1.76rem',width:'100%', height: '1.76rem', borderRadius: '13px', marginTop: '0.14rem'}}/>
                <span className="span_txt"><img src="./assets/img/weiqing/kanjia-02@2x.png" style={{width:'80px',height:'36px'}}/></span>
            </Flex.Item>
            <Flex.Item style={{width:'100%'}}>
                <div className="hottesList_name text-overflow-hidden">{dataItem.goodsName}</div>
            </Flex.Item>
            <div>
                <Flex.Item>
                    <div className="hottesList_money">￥{dataItem.bargainPrice}</div>
                </Flex.Item>
            </div>
        </Flex>

    }

    //拼团
    groupItem = (dataItem) => {
        return <Flex className="hottesListBox" direction='column' onClick={() => console.log(dataItem)}>
            <Flex.Item style={{textAlign: 'center', position: 'relative'}}>
                <Img src={dataItem.groupImage}
                     style={{maxWidth: '1.76rem',width:'100%', height: '1.76rem',borderRadius: '13px', marginTop: '0.14rem'}}/>
                <span className="span_txt"><img src="./assets/img/weiqing/pintuan-01@2x.png" style={{width:'80px',height:'36px'}}/></span>
            </Flex.Item>
            <Flex.Item style={{width:'100%'}}>
                <div className="hottesList_name text-overflow-hidden">{dataItem.goodsName}</div>
            </Flex.Item>
            <Flex.Item>
                <div className="hottesList_money">￥{dataItem.groupPrice}</div>
            </Flex.Item>
            <div>
                <Flex.Item>
                    <div className="text-overflow-hidden hottesList_oldprice"><del>￥{dataItem.goodsPrice}</del></div>
                </Flex.Item>
            </div>
        </Flex>

    }


    render() {
        const {
            raiseList,
            groupList,
            bargainList,
            specKillList
        } = this.props;

        return <div>
            <Flex style={{background: '#ffffff'}}>
                <List style={{width: '100%'}} renderHeader={() => <div><IconClass url={'./assets/img/weiqing/miaosha-01@2x.png'}></IconClass>
                          <div style={{float: 'left', marginTop: '0.10rem'}}><span
                              style={{fontSize: '0.3rem', color: '#333333'}}>秒杀</span></div>
                          <div style={{float: 'right'}} onClick={this.ongotoTimeBuy}>更多<Icon type='right' size='xs'></Icon></div>
                      </div>}>
                    <List.Item>
                        <Grid data={specKillList} columnNum={4}
                              onClick={this.gotoBuy}
                              renderItem={(dataItem, index) => (this.specKillItem(dataItem))} className="homeNewGood_hottest homeNew_selected">
                        </Grid>
                    </List.Item>
                </List>
            </Flex>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <Flex style={{background: '#ffffff'}}>
                <List style={{width: '100%'}}
                      renderHeader={() => <div><IconClass url={'./assets/img/weiqing/kajia-01@2x.png'}></IconClass>
                          <div style={{float: 'left', marginTop: '0.10rem'}}><span
                              style={{fontSize: '0.3rem', color: '#333333'}}>砍价</span></div>
                          <div style={{float: 'right'}} onClick={this.gotoBargain}>更多<Icon type='right'
                                                                                           size='xs'></Icon></div>
                      </div>}>
                    <List.Item>
                        <Grid data={bargainList} columnNum={4}
                              onClick={this.gotoBargainDetail}
                              renderItem={(dataItem, index) => (this.bargainItem(dataItem))} className="homeNewGood_hottest">
                        </Grid>
                    </List.Item>
                </List>
            </Flex>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <Flex style={{background: '#ffffff'}}>
                <List style={{width: '100%'}}
                      renderHeader={() => <div><IconClass url={'./assets/img/weiqing/pintuan-02@2x.png'}></IconClass>
                          <div style={{float: 'left', marginTop: '0.10rem'}}><span
                              style={{fontSize: '0.3rem', color: '#333333'}}>拼团</span></div>
                          <div style={{float: 'right'}} onClick={this.gotoGroupBuy}>更多<Icon type='right'
                                                                                            size='xs'></Icon></div>
                      </div>}>
                    <List.Item>
                        <Grid data={groupList} columnNum={4}
                              onClick={this.gotoGroupBuyDetail}
                              renderItem={(dataItem, index) => (this.groupItem(dataItem))} className="homeNewGood_hottest homeNew_selected">
                        </Grid>
                    </List.Item>
                </List>
            </Flex>
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
            <Flex style={{background: '#ffffff'}}>
                <List style={{width: '100%'}}
                      renderHeader={() => <div><IconClass url={'./assets/img/weiqing/zhongchou-01@1x.png'}></IconClass>
                          <div style={{float: 'left', marginTop: '0.10rem'}}><span
                              style={{fontSize: '0.3rem', color: '#333333'}}>众筹</span></div>
                          <div style={{float: 'right'}} onClick={this.gotocrowdFunding}>更多<Icon type='right'
                                                                                                size='xs'></Icon></div>
                      </div>}>
                    <List.Item>
                        <Grid data={raiseList} columnNum={4}
                              onClick={this.gotocrowdFundingDetail}
                              renderItem={(dataItem, index) => (this.renderItem(dataItem))} className="homeNewGood_hottest homeNew_selected">
                        </Grid>
                    </List.Item>
                </List>
            </Flex>
        </div>
    }
}

export default HomeNewGoodsBlock;
