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
import * as couponApi from '../api/coupon';
import GievFriends from '../components/GievFriends';

import './gotoCoupons.less';

const Item = List.Item;
const TabPane = Tabs.TabPane;


class Coupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            couponList: [],
            storeId:'',
            isInit: false
        }
    }


    componentDidMount() {
        const storeId=this.props.params.storeId;
        if(storeId!='all'){
            this.state = {
                storeId:storeId
            }
        }
        this.refreshList();
    }

    refreshList = () => {
        couponApi.couponList({storeId:this.state.storeId}).then(result => {
            if (result.result == 1) {
                const data = result.data;
                this.setState({
                    couponList: data,
                    isInit: true
                })
            } else {
                // Toast.info(result.msg);
                console.log('请登录')
            }
        })
    }

    receiveCoupon = (coupon) => {
        couponApi.receiveCoupon({couponId:coupon.id,storeId:this.state.storeId}).then(result => {
            if (result.result == 1) {
                const data = result.data;
                const  list=this.state.couponList.map((element,index)=>{
                    if(element.id==coupon.id){
                        element.isGet=1
                    }
                    return element;
                })
                this.setState({
                    couponList: list,
                    isInit: true
                })
                Toast.info(result.msg);
            } else {
                Toast.info(result.msg);
            }
        })
    }

    render() {
        if (!this.state.isInit) {
            return null
        }
        return (
            <div className='wx-gotocoupon-conten'>
                <List>
                    {
                        this.state.couponList.length > 0 && this.state.couponList.map((coupon, index) => {
                            const {shopActivity}=coupon;
                            const {shopActivityMembership}=shopActivity;
                            console.log(shopActivityMembership)
                            if(coupon.shopActivity.restrictionNum!=0){
                                return <List.Item key={index} style={{padding: '0rem 0.26rem', margin: '0px 0px 0.2rem'}}
                                                  className="gotoCoupons">
                                    <Flex className="coupon_list_box1">
                                        <Flex.Item style={{flex: 1}}>
                                            {/*其他情况*/}
                                            {
                                                (coupon.shopActivity.storeId == 0 && coupon.shopActivity.allStoreUse == 1 ) &&<Flex
                                                    style={{background: 'url(./assets/img/weiqing/youhuiquan-03@2x.png) center center / 100% 100% no-repeat'}}
                                                    className="coupon_list_img" direction="column">
                                                    <div className="coupon_list_value"><span
                                                        style={{fontSize: '0.22rem'}}>￥</span>{coupon.couponSource}</div>
                                                    <div className="coupon_list_txt">满{coupon.limitWhere}元可用</div>
                                                </Flex>
                                            }
                                            {/*自营*/}
                                            {
                                                (coupon.shopActivity.storeId == 0 && coupon.shopActivity.allStoreUse != 1)&& <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-02@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                                    <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{coupon.couponSource}</div>
                                                    <div className="coupon_list_txt">满{coupon.limitWhere}元可用</div>
                                                </Flex>
                                            }
                                            {/*商家*/}
                                            {
                                                (coupon.shopActivity.storeId != 0 && coupon.shopActivity.allStoreUse == 0) && <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-01@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                                    <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{coupon.couponSource}</div>
                                                    <div className="coupon_list_txt">满{coupon.limitWhere}元可用</div>
                                                </Flex>
                                            }

                                        </Flex.Item>
                                        <Flex.Item style={{flex: 2, marginLeft: '0.1rem', height: '1.5rem'}}>
                                            <div style={{paddingLeft: '0rem'}}>
                                                <div className="coupon_list_title">
                                                    {/*商家*/}
                                                    {
                                                        (coupon.shopActivity.storeId != 0 && coupon.shopActivity.allStoreUse == 0) && <span style={{padding: '6px 16px',
                                                        fontSize: '0.2rem',color: '#fff',background: '#e3536c',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>{(coupon.shopActivity.storeName).substring(0,4)}</span>
                                                    }
                                                    {/*自营*/}
                                                    {
                                                        (coupon.shopActivity.storeId == 0 && coupon.shopActivity.allStoreUse != 1) && <span style={{padding: '6px 16px',
                                                            fontSize: '0.2rem',color: '#fff',background: '#ffa920',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>卫青自营</span>
                                                    }
                                                    {/*其他情况*/}
                                                    {
                                                        (coupon.shopActivity.storeId == 0 && coupon.shopActivity.allStoreUse == 1 ) && <span style={{padding: '6px 16px',
                                                            fontSize: '0.2rem',color: '#fff',background: '#77b4f5',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>全平台</span>
                                                    }

                                        {/*<span style={{
                                            padding: '6px 16px',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#00a9e0',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem'
                                        }}>
                                            {coupon.shopActivity.storeId == 0 ? '卫青自营':'商家店铺' }

                                        </span>*/}
                                                    {/*{
                                                        coupon.shopActivity.goodsType == 0 && coupon.shopActivity.allStoreUse == 1 ? '部分商家' : null//商家店铺
                                                    }*/}
                                                    {
                                                        coupon.shopActivity.goodsType == 0 ? '全部商品' : null
                                                    }
                                                    {
                                                        coupon.shopActivity.goodsType== 1? '指定商品分类' : null
                                                    }
                                                    {
                                                        coupon.shopActivity.goodsType== 2 ? '指定商品类型' : null
                                                    }
                                                    {
                                                        coupon.shopActivity.goodsType== 3 ? '指定品牌' : null
                                                    }
                                                    {
                                                        coupon.shopActivity.goodsType== 4 ? '指定商品' : null
                                                    }
                                                    可用
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
                                                               {/* {
                                                                    coupon.shopActivity.goodsType == 0 && coupon.shopActivity.allStoreUse == 1 ? '使用范围' : null//商家店铺
                                                                }*/}
                                                                {
                                                                    coupon.shopActivity.goodsType == 0 ? '适用范围' : null
                                                                }
                                                                {
                                                                    coupon.shopActivity.goodsType== 1? '指定分类' : null
                                                                }
                                                                {
                                                                    coupon.shopActivity.goodsType== 2 ? '指定类型' : null
                                                                }
                                                                {
                                                                    coupon.shopActivity.goodsType== 3 ? '指定品牌' : null
                                                                }
                                                                {
                                                                    coupon.shopActivity.goodsType== 4 ? '指定商品' : null
                                                                }
                                                                ：{coupon.limitInfo}</div>
                                                        </div>
                                                        <div style={{
                                                            color: '#999',
                                                            fontSize: '0.22rem'
                                                        }}>{(coupon.shopActivity.startTimeStr).split(" ")[0].replace("-", ".")}
                                                            -{(coupon.shopActivity.endTimeStr).split(" ")[0].replace("-", ".")}</div>
                                                    </div>

                                                    <div>
                                                        {
                                                            coupon.isGet== 0 && <Button inline size="sm" style={{
                                                                width: '1.2rem',
                                                                height: '0.5rem',
                                                                lineHeight: '0.5rem',
                                                                color: '#00a9e0',
                                                                borderColor: '#00a9e0',
                                                                fontSize: '0.24rem',
                                                                padding: '0px 0.1rem'
                                                            }} onClick={()=>{this.receiveCoupon(coupon)}}>立即领取</Button>
                                                        }
                                                        {
                                                            coupon.isGet== 1 && <Button inline size="sm" style={{
                                                                width: '1.2rem',
                                                                height: '0.5rem',
                                                                lineHeight: '0.5rem',
                                                                fontSize: '0.24rem',
                                                                padding: '0px 0.1rem'
                                                            }} onClick={()=>{this.receiveCoupon(coupon)}} disabled >已领取</Button>
                                                        }
                                                        {
                                                            coupon.isGet== null && <Button inline size="sm" style={{
                                                                width: '1.2rem',
                                                                height: '0.5rem',
                                                                lineHeight: '0.5rem',
                                                                color: '#00a9e0',
                                                                borderColor: '#00a9e0',
                                                                fontSize: '0.24rem',
                                                                padding: '0px 0.1rem'
                                                            }} onClick={()=>{this.receiveCoupon(coupon)}}>立即领取</Button>
                                                        }

                                                    {/*{
                                                        coupon.isGet== 0 ? <Button inline size="sm" style={{
                                                            width: '1.2rem',
                                                            height: '0.5rem',
                                                            lineHeight: '0.5rem',
                                                            color: '#00a9e0',
                                                            borderColor: '#00a9e0',
                                                            fontSize: '0.24rem',
                                                            padding: '0px 0.1rem'
                                                        }} onClick={()=>{this.receiveCoupon(coupon)}}>立即领取</Button>:<Button inline size="sm" style={{
                                                            width: '1.2rem',
                                                            height: '0.5rem',
                                                            lineHeight: '0.5rem',
                                                            fontSize: '0.24rem',
                                                            padding: '0px 0.1rem'
                                                        }} onClick={()=>{this.receiveCoupon(coupon)}} disabled >已领取</Button>
                                                    }*/}
                                            </div>
                                                    {/*<Button inline size="sm" style={{
                                                        width: '1.2rem',
                                                        height: '0.5rem',
                                                        lineHeight: '0.5rem',
                                                        color: '#00a9e0',
                                                        borderColor: '#00a9e0',
                                                        fontSize: '0.24rem',
                                                        padding: '0px 0.1rem'
                                                    }} onClick={()=>{this.receiveCoupon(coupon)}}>{coupon.isGet==0?'立即领取':'已领取'}</Button>*/}
                                                </Flex>
                                            </div>
                                        </Flex.Item>
                                    </Flex>
                                </List.Item>
                            }

                        })
                    }

                    {/*不要删
                     <List.Item style={{padding:'0rem 0.26rem',margin:'0px 0px 0.2rem'}} className="gotoCoupons" >
                     <Flex className="coupon_list_box1">
                     <Flex.Item style={{flex:1}}>
                     <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-02@2x.png) no-repeat'}} className="coupon_list_img" direction="column">
                     <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>45</div>
                     <div className="coupon_list_txt">满200元可用</div>
                     </Flex>
                     </Flex.Item>
                     <Flex.Item  style={{flex:2,marginLeft:'0rem',height:'1.5rem'}}>
                     <div style={{paddingLeft:'0rem'}}>
                     <div className="coupon_list_title">
                     <span style={{padding:'5px 10px',fontSize:'0.2rem',color:'#fff',background:'#ffa91f',borderRadius:'0.3rem',marginRight:'0.15rem'}}>平台自营</span>
                     卫青部分自营商品可用
                     </div>
                     <Flex justify="between" style={{padding:'0.3rem 0px 0px'}}>
                     <span style={{color:'#999',fontSize:'0.22rem'}}>2017.5.13-2017.05.20</span>
                     <Button inline size="sm" style={{width:'1.2rem',height:'0.5rem',lineHeight:'0.5rem',color:'#00a9e0',borderColor:'#00a9e0', fontSize:'0.24rem',padding:'0px 0.1rem'}}>立即领取</Button>
                     </Flex>
                     </div>
                     </Flex.Item>
                     </Flex>
                     </List.Item>

                     <List.Item style={{padding:'0rem 0.26rem',margin:'0px 0px 0.2rem'}} className="gotoCoupons" >
                     <Flex className="coupon_list_box1">
                     <Flex.Item style={{flex:1}}>
                     <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-01@2x.png) no-repeat'}} className="coupon_list_img" direction="column">
                     <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>45</div>
                     <div className="coupon_list_txt">满200元可用</div>
                     </Flex>
                     </Flex.Item>
                     <Flex.Item  style={{flex:2,marginLeft:'0rem',height:'1.5rem'}}>
                     <div style={{paddingLeft:'0rem'}}>
                     <div className="coupon_list_title">
                     <span style={{padding:'5px 10px',fontSize:'0.2rem',color:'#fff',background:'#e2536b',borderRadius:'0.3rem',marginRight:'0.15rem'}}>商家店铺</span>
                     卫青部分自营商品可用
                     </div>
                     <Flex justify="between" style={{padding:'0.3rem 0px 0px'}}>
                     <span style={{color:'#999',fontSize:'0.22rem'}}>2017.5.13-2017.05.20</span>
                     <Button inline size="sm" style={{width:'1.2rem',height:'0.5rem',lineHeight:'0.5rem',color:'#00a9e0',borderColor:'#00a9e0', fontSize:'0.24rem',padding:'0px 0.1rem'}}>立即领取</Button>
                     </Flex>
                     </div>
                     </Flex.Item>
                     </Flex>
                     </List.Item>*/}
                    {/*需要遍历内容 end*/}


                </List>
            </div>
        )
    }
}

export default withRouter(Coupon);