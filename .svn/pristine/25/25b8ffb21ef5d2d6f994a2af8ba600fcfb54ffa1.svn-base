import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Button,
    Accordion,
    SegmentedControl,
    Tabs

} from 'antd-mobile';
import {common} from 'common';
import './shareCoupons.less';
import * as couponApi from '../api/coupon';

const Item = List.Item;
const TabPane = Tabs.TabPane;


class shareCouponsList  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: null,
            member:{}
        }
    }


    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        couponApi.receiveAccess({shareOrderId: this.props.params.shareOrderId}).then(result => {
            if (result.result == 1) {
                this.setState ({
                    coupon: result.data.shopActivityMemberCoupon,
                    member:result.data.member
                })
            } else {
                Toast.fail(result.msg,2,window.location.href=common.SERVER_PATH+"/home.html")
            }
        })
    }


    render() {
        const  {coupon,member}=this.state;
        if (coupon == null) {
            return null
        }
        const shopActivityPromotionRule=coupon.shopActivityPromotionRule;
        const ShopActivity=shopActivityPromotionRule.shopActivity;
        return (
            <div className='wx-gotocoupon'>
                <List>
                    <List.Item style={{padding: '0rem 0.26rem', margin: '0px 0px 0.2rem'}} className="gotoCoupons">
                        <Flex className="coupon_list_box1">
                            <Flex.Item style={{flex: 1,maxWidth:'2.1rem',paddingRight:'0.1rem'}}>
                                <Flex style={{background: 'url(./assets/img/weiqing/youhuiquan-03@2x.png) center center / 100% 100% no-repeat'}}
                                      className="coupon_list_img" direction="column">
                                    <div className="coupon_list_value"><span style={{fontSize: '0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                                    <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                                </Flex>
                            </Flex.Item>
                            <Flex.Item style={{flex: 2, marginLeft: '0rem', height: '1.5rem'}}>
                                <div style={{paddingLeft: '0rem'}}>
                                    <div className="coupon_list_title">
                                        <span style={{
                                            padding: '5px 10px',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#00a9e0',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem'
                                        }}>全品类</span>
                                        {ShopActivity.storeName}
                                    </div>
                                    <Flex justify="between" style={{padding: '0.3rem 0px 0px'}}>
                                        <span
                                            style={{color: '#999', fontSize: '0.22rem'}}>{ShopActivity.startTimeStr.substr(0,10)}-{ShopActivity.endTimeStr.substr(0,10)}</span>
                                        <Button inline size="sm" onClick={()=>{
                                            window.location.href = common.SERVER_PATH+"/home.html";
                                        }} style={{
                                            width: '1.2rem',
                                            height: '0.5rem',
                                            lineHeight: '0.5rem',
                                            color: '#00a9e0',
                                            borderColor: '#00a9e0',
                                            fontSize: '0.24rem',
                                            padding: '0px 0.1rem'
                                        }}>立即使用</Button>
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
                                    <img src={member.memberAvatar} style={{
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

export default withRouter(shareCouponsList);
