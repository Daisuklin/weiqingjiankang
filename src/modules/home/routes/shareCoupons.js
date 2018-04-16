import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
    Button,
    Accordion,
  SegmentedControl,
    Tabs,
    Modal

} from 'antd-mobile';
import { Img } from 'commonComponent';
import {common} from 'common';
import './shareCoupons.less';
import * as couponApi from '../api/coupon';

const Item = List.Item;
const TabPane = Tabs.TabPane;


class shareCoupons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: null,
            member:{},
            modal1: false,
            show:true,
            Msg:""
        }
    }


    componentDidMount() {
        this.refreshList();
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    refreshList = () => {
        couponApi.receiveCouponShare({memberCouponId: this.props.params.memberCouponId}).then(result => {
            if (result.result == 1) {
                this.setState({
                    coupon: result.data.shopActivityMemberCoupon,
                    member:result.data.member
                })
            } else {
                this.setState({
                    modal1: true,
                    Msg:result.msg
                })
            }
        })
    }
    onClickUseCoupons = () =>{
        const  {coupon,member}=this.state;
        const shopActivityPromotionRule=coupon.shopActivityPromotionRule;
        const {shopActivity}=shopActivityPromotionRule;
        if(shopActivity.storeId != 0 && shopActivity.allStoreUse == 0){
            // 指定店铺的，跳到店铺主页。
            common.gotoStore({ storeId: shopActivity.storeId });
        }else if(shopActivity.goodsType== 3){
            // 指定品牌的，跳到品牌对应的列表。
            window.location.href = common.SERVER_PATH + "/home.html#/brand";
        }else if(shopActivity.goodsType== 1){
            // 指定分类的，跳到分类商品列表。
            window.location.href = (`home.html#/search/keywordSearch/${coupon.limitInfo}`)
        }else{
            // 没有使用限制的，跳到首页。
            window.location.href = common.SERVER_PATH + "/home.html";
        }



    }


    render() {
        const  {coupon,member}=this.state;
        if (coupon == null) {
            return   <Modal
                title="提示"
                transparent
                maskClosable={false}
                visible={this.state.modal1}
                onClose={this.onClose('modal1')}
                footer={[{ text: '确定', onPress: () => { window.location.href='home.html#/'; this.onClose('modal1')(); } }]}
            >
                {this.state.Msg}
            </Modal>
        }
        // debugger
        const shopActivityPromotionRule=coupon.shopActivityPromotionRule;
        const {shopActivity}=shopActivityPromotionRule;
        const {shopActivityMembership} = shopActivity;
        return (
            <div className='wx-gotocoupon'>
                <List>
                    <List.Item style={{padding: '0rem 0.26rem', margin: '0px 0px 0.2rem'}} className="gotoCoupons">
                        <Flex className="coupon_list_box1">
                            <Flex.Item style={{flex: 1,maxWidth:'2.1rem',paddingRight:'0.1rem'}}>
                                {/*其他情况*/}
                                {
                                    (shopActivity.storeId == 0 && shopActivity.allStoreUse == 1 ) &&<Flex
                                        style={{background: 'url(./assets/img/weiqing/youhuiquan-03@2x.png) center center / 100% 100% no-repeat'}}
                                        className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span
                                            style={{fontSize: '0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                                        <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*自营*/}
                                {
                                    (shopActivity.storeId == 0 && shopActivity.allStoreUse != 1)&& <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-02@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                                        <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*商家*/}
                                {
                                    (shopActivity.storeId != 0 && shopActivity.allStoreUse == 0) && <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-01@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                                        <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*<Flex style={{background: 'url(./assets/img/weiqing/youhuiquan-03@2x.png)center center / 100% 100% no-repeat'}}
                                      className="coupon_list_img" direction="column">
                                    <div className="coupon_list_value"><span style={{fontSize: '0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                                    <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                                </Flex>*/}
                            </Flex.Item>
                            <Flex.Item style={{flex: 2, marginLeft: '0rem', height: '1.5rem'}}>
                                <div style={{paddingLeft: '0rem'}}>
                                    <div className="coupon_list_title">
                                        {/*商家*/}
                                        {
                                            (shopActivity.storeId != 0 && shopActivity.allStoreUse == 0) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#e3536c',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>{(shopActivity.storeName).substring(0,4)}</span>
                                        }
                                        {/*自营*/}
                                        {
                                            (shopActivity.storeId == 0 && shopActivity.allStoreUse != 1) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#ffa920',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>卫青自营</span>
                                        }
                                        {/*其他情况*/}
                                        {
                                            (shopActivity.storeId == 0 && shopActivity.allStoreUse == 1 ) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#77b4f5',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>全平台</span>
                                        }
                                        {/*<span style={{
                                            padding: '5px 10px',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#00a9e0',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem'
                                        }}>全品类</span>*/}
                                        {/*{
                                            shopActivity.goodsType == 0 && shopActivity.allStoreUse == 1 ? '部分商家' : null//商家店铺
                                        }*/}
                                        {
                                            shopActivity.goodsType == 0 ? '全部商品' : null
                                        }
                                        {
                                            shopActivity.goodsType== 1? '指定商品分类' : null
                                        }
                                        {
                                            shopActivity.goodsType== 2 ? '指定商品类型' : null
                                        }
                                        {
                                            shopActivity.goodsType== 3 ? '指定品牌' : null
                                        }
                                        {
                                            shopActivity.goodsType== 4 ? '指定商品' : null
                                        }
                                        可用
                                        {/*{ShopActivity.storeName}*/}
                                    </div>
                                    <Flex justify="between" style={{padding: '0rem 0px 0px'}}>
                                        <div>
                                            <div className="coupon_list_condition">
                                                <div>会员限制：
                                                    {
                                                        shopActivityMembership.memberLevel == '' ? '全部会员':`${shopActivityMembership.memberLevel}`
                                                    }

                                                </div>
                                                <div>
                                                    {
                                                        shopActivity.goodsType == 0 && shopActivity.allStoreUse == 1 ? '指定商家' : null//商家店铺
                                                    }
                                                    {
                                                        shopActivity.goodsType == 0 && shopActivity.allStoreUse == 0 ? '适用范围' : null
                                                    }
                                                    {
                                                        shopActivity.goodsType== 1? '指定分类' : null
                                                    }
                                                    {
                                                        shopActivity.goodsType== 2 ? '指定类型' : null
                                                    }
                                                    {
                                                        shopActivity.goodsType== 3 ? '指定品牌' : null
                                                    }
                                                    {
                                                        shopActivity.goodsType== 4 ? '指定商品' : null
                                                    }
                                                    ：{coupon.limitInfo}</div>
                                            </div>
                                            <div style={{
                                                color: '#999',
                                                fontSize: '0.22rem'
                                            }}>{(shopActivity.startTimeStr).split(" ")[0].replace("-", ".")}
                                                -{(shopActivity.endTimeStr).split(" ")[0].replace("-", ".")}</div>
                                        </div>
                                        {/*<span
                                            style={{color: '#999', fontSize: '0.22rem'}}>{ShopActivity.startTimeStr.substr(0,10)}-{ShopActivity.endTimeStr.substr(0,10)}</span>*/}
                                        <div><Button inline size="sm" onClick={()=>{
                                           this.onClickUseCoupons()
                                        }} style={{
                                            width: '1.2rem',
                                            height: '0.5rem',
                                            lineHeight: '0.5rem',
                                            color: '#00a9e0',
                                            borderColor: '#00a9e0',
                                            fontSize: '0.24rem',
                                            padding: '0px 0.1rem'
                                        }}>立即使用</Button></div>
                                    </Flex>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <div style={{fontSize: '0.24rem', color: '#666', padding: '0.2rem 0.26rem'}}>优惠券已放入账号：{member.memberName}</div>
                    <div>
                        <Flex style={{padding: '0.2rem 0.26rem', background: '#fff'}} justify="between"
                              className="coupon_list_user">
                            <div>
                                <div style={{float: 'left'}}>
                                    <Img src={member.memberAvatar} style={{
                                        width: '0.9rem',
                                        height: '0.9rem',
                                        paddingRight: '0.2rem',
                                        borderRadius: '50%'
                                    }}/>
                                </div>
                                <div style={{float: 'left'}}>
                                    <div style={{fontSize: '0.28rem', color: '#333'}}>{member.memberName}</div>
                                    <div style={{fontSize: '0.24rem', color: '#999', paddingTop: '0.2rem'}}>{coupon.createTimeStr}
                                    </div>
                                </div>
                            </div>
                            <div>{shopActivityPromotionRule.couponSource}元</div>
                        </Flex>
                    </div>
                    <div style={{background: '#fff', padding: '0.2rem 0.26rem'}}>
                        <Flex style={{padding: '0.1rem 0px 0.2rem'}}>
                            <div style={{flex: 1, height: '0.32rem'}}><span style={{
                                height: '1px',
                                width: '100%',
                                background: '#e5e5e5',
                                display: 'block',
                                marginTop: '15px'
                            }}></span></div>
                            <div style={{flex: 1, fontSize: '0.28rem', color: '#666', textAlign: 'center'}}>优惠券使用规则
                            </div>
                            <div style={{flex: 1, height: '0.32rem'}}><span style={{
                                height: '1px',
                                width: '100%',
                                background: '#e5e5e5',
                                display: 'block',
                                marginTop: '15px'
                            }}></span></div>
                        </Flex>
                        <div className="coupon_list_product">
                            <div>1. 优惠券仅限在卫青商城平台使用</div>
                            <div>2. 仅限在、红包可与其他优线支付使用，且领取优惠券输入的手机号和账号中的手机号需为同一手机号</div>
                            <div>3. 优惠券仅限在有效期间内使用，过期作废。</div>
                            <div>4. 其他未尽事宜，请咨询客服</div>
                            <div>5、卫青健康保留法律范围内允许的对活动的解释权</div>
                        </div>
                    </div>

                </List>
            </div>
        )
    }
}


export default withRouter(shareCoupons);