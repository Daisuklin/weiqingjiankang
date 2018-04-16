/**
 * 赠送好友组件
 * Created by leimingtech-lhm on 2017/5/15.
 */
import React, {Component} from 'react';
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
    Tabs

} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import GievFriends from '../components/GievFriends';
import '../routes/coupon.less'
const Item = List.Item;
/**图片在上面，文字在下面的布局 */
class CouponList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showStatus:0
        }
    }
/*分享展开显示*/
    showShare = () =>{
        this.setState({
            showStatus:  this.state.showStatus ==0 ? 1 :0
        })
    }

    render() {
        const { showStatus }=this.state;
        // const { couponList  }=this.props;
        const {shopActivity, shopActivityPromotionRule} = this.props;
        return <div>
            <Flex className="coupon_list_box2">
                <Flex.Item style={{flex:1}}>
                    <Flex style={{background:'url(./assets/img/weiqing/wdyhq-07@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                        <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{shopActivityPromotionRule.couponSource}</div>
                        <div className="coupon_list_txt">满{shopActivityPromotionRule.limitWhere}元可用</div>
                    </Flex>
                </Flex.Item>
                <Flex.Item  style={{flex:2,marginLeft:'0.1rem',height:'1.5rem'}}>
                    <div style={{paddingLeft:'0rem'}}>

                        <Flex justify="between" style={{padding:'0.1rem 0px'}}>
                            <div style={{flex:2,overflow: 'hidden',whiteSpace: 'nowrap',textOverflow:'ellipsis'}}>
                                <div className="coupon_list_title">
                                    {/*商家*/}
                                    {
                                        (shopActivity.storeId != 0 && shopActivity.allStoreUse == 0) && <span style={{
                                            padding: '0.05rem 0.1rem',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#aaaaaa',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem',
                                            display:'inline-block',
                                            width:'0.8rem',textAlign:'center'
                                        }} >{(shopActivity.storeName).substring(0,4)}</span>
                                    }
                                    {/*自营*/}
                                    {
                                        (shopActivity.storeId == 0 && shopActivity.allStoreUse != 1) && <span style={{
                                            padding: '0.05rem 0.1rem',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#aaaaaa',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem'
                                        }}>卫青自营</span>
                                    }
                                    {/*其他情况*/}
                                    {
                                        (shopActivity.storeId == 0 && shopActivity.allStoreUse == 1 ) && <span style={{
                                            padding: '0.05rem 0.1rem',
                                            fontSize: '0.2rem',
                                            color: '#fff',
                                            background: '#aaaaaa',
                                            borderRadius: '0.3rem',
                                            marginRight: '0.15rem',display:'inline-block',
                                            width:'0.8rem',textAlign:'center'
                                        }}>全品类</span>
                                    }

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
                                    {/*<span style={{padding:'5px 10px',fontSize:'0.2rem',color:'#fff',background:'#aaaaaa',borderRadius:'0.3rem',marginRight:'0.15rem'}}>全品类</span>
                                    {shopActivity.storeName}*/}
                                </div>
                                <span style={{color:'#999',fontSize:'0.22rem'}}>{shopActivity.startTimeStr.substr(0, 10)}-{shopActivity.endTimeStr.substr(0, 10)}</span>
                            </div>
                            <div style={{flex:0.7,textAlign:'right'}}><img src="./assets/img/weiqing/wdyhq-08@2x.png" style={{height:'83px',width:'86px'}}/></div>
                        </Flex>
                    </div>
                    <Flex justify="between" style={{borderTop:'1px dashed #e5e5e5',padding:'0rem 0px'}} onClick={()=>this.showShare() }>
                        <span style={{fontSize:'0.22rem',color:'#999'}}>详细信息</span>
                        <span><img src="./assets/img/weiqing/wdyhq-01@2x.png" style={{width:'0.16rem',height:'0.16rem',paddingBottom:'0.1rem'}}/></span>
                    </Flex>
                </Flex.Item>
            </Flex>
            {
                showStatus == 1 ? <GievFriends couponList={this.couponList}></GievFriends> :''
            }
        </div>
    }
}
export default withRouter(CouponList)