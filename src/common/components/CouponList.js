import React, { Component } from 'react';
import { Img } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Toast,Button } from 'antd-mobile';
import * as storeApi from '../api/store';
import * as couponApi from '../../modules/home/api/coupon';

import './CouponList.less';

const goodsTypes = {
  '0': '全部商品',
  '1': '指定商品分类',
  '2': '指定商品类型',
  '3': '指定品牌',
  '4': '指定商品'
}

class CouponList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * 点击领券
   */
  onSel = (sel) => {
    // console.log(sel);
    storeApi.receiveCoupon({
      couponId: sel.id,
      storeId: sel.shopActivity.storeId
    }).then(result => {
      Toast.info(result.msg);
    })
  };

    receiveCoupon = (coupon) => {
        couponApi.receiveCoupon({couponId:coupon.id,storeId:coupon.shopActivity.storeId}).then(result => {
            if (result.result == 1) {
                const data = result.data;
                const  list=this.props.couponList.map((element,index)=>{
                    if(element.id==coupon.id){
                        element.isGet=1
                    }
                    return element;
                })
                this.setState({
                    couponList: list,
                    isInit: true
                })
                Toast.info(result.msg,1);
            } else {
                Toast.info(result.msg,1);
            }
        })
    }


  render() {
    if (!this.props.storeId) {
      return null;
    }
    const { couponList } = this.props;
    console.log(couponList)
		const IconClass = ({ url }) => {
		  return <div style={{
		    width: '8.27rem',
		    height: '0.50rem',
		    background: `url(${url}) center center /  0.64rem 0.64rem`,
		    display:'inline-block'
		  }}
		  />
		}
    return <div className='wx-CouponList'>
    	
      <List renderHeader={() => '优惠券'}>
      {
          couponList && couponList.map(item => {
            const { shopActivity } = item;
              const { shopActivityMembership } = shopActivity;
            console.log(shopActivityMembership)
            const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ?
              shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'
                if(shopActivity.restrictionNum != 0){
                    {/* return <List.Item key={item.id} onClick={() => { this.onSel(item); }} style={{padding:'0rem 0.26rem',margin:'0px 0px 0.2rem'}} className="coupon_listItem1" >*/}
                    return <List.Item key={item.id}

                                      style={{padding:'0rem 0.26rem',margin:'0px 0px 0.2rem'}} className="coupon_listItem1" >
                        <Flex className="coupon_list_box1">
                            <Flex.Item style={{flex:1,maxWidth:'2.1rem',marginRight:'0.1rem'}}>
                                {/*其他情况*/}
                                {
                                    (item.shopActivity.storeId == 0 && item.shopActivity.allStoreUse == 1 ) &&<Flex
                                        style={{background: 'url(./assets/img/weiqing/youhuiquan-03@2x.png) center center / 100% 100% no-repeat'}}
                                        className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span
                                            style={{fontSize: '0.22rem'}}>￥</span>{item.couponSource}</div>
                                        <div className="coupon_list_txt">满{item.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*自营*/}
                                {
                                    (item.shopActivity.storeId == 0 && item.shopActivity.allStoreUse != 1)&& <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-02@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{item.couponSource}</div>
                                        <div className="coupon_list_txt">满{item.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*商家*/}
                                {
                                    (item.shopActivity.storeId != 0 && item.shopActivity.allStoreUse == 0) && <Flex style={{background:'url(./assets/img/weiqing/youhuiquan-01@2x.png) center center / 100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                        <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{item.couponSource}</div>
                                        <div className="coupon_list_txt">满{item.limitWhere}元可用</div>
                                    </Flex>
                                }
                                {/*<Flex style={{background:'url(./assets/img/weiqing/youhuiquan-03@2x.png) center center /100% 100% no-repeat'}} className="coupon_list_img" direction="column">
                                    <div className="coupon_list_value"><span style={{fontSize:'0.22rem'}}>￥</span>{item.couponSource}</div>
                                    <div className="coupon_list_txt">满{item.limitWhere}元可用</div>
                                </Flex>*/}
                            </Flex.Item>
                            <Flex.Item  style={{flex:1.8,marginLeft:'0rem',height:'1.5rem'}}>
                                <div style={{paddingLeft:'0rem'}}>
                                    <div className="coupon_list_title">
                                        {/*商家*/}
                                        {
                                            (item.shopActivity.storeId != 0 && item.shopActivity.allStoreUse == 0) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#e3536c',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>{(item.shopActivity.storeName).substring(0,4)}</span>
                                        }
                                        {/*自营*/}
                                        {
                                            (item.shopActivity.storeId == 0 && item.shopActivity.allStoreUse != 1) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#ffa920',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>卫青自营</span>
                                        }
                                        {/*其他情况*/}
                                        {
                                            (item.shopActivity.storeId == 0 && item.shopActivity.allStoreUse == 1 ) && <span style={{padding: '6px 16px',
                                                fontSize: '0.2rem',color: '#fff',background: '#77b4f5',borderRadius: '0.3rem',marginRight: '0.15rem',display:'inline-block',width:'0.8rem',textAlign:'center'}}>全平台</span>
                                        }
                                        {/*{
                                            item.shopActivity.goodsType == 0 && item.shopActivity.allStoreUse == 1 ? '部分商家' : null//商家店铺
                                        }*/}
                                        {
                                            item.shopActivity.goodsType == 0 ? '全部商品' : null
                                        }
                                        {
                                            item.shopActivity.goodsType== 1? '指定商品分类' : null
                                        }
                                        {
                                            item.shopActivity.goodsType== 2 ? '指定商品类型' : null
                                        }
                                        {
                                            item.shopActivity.goodsType== 3 ? '指定品牌' : null
                                        }
                                        {
                                            item.shopActivity.goodsType== 4 ? '指定商品' : null
                                        }
                                        可用
                                        {/*<span style={{padding:'5px 10px',fontSize:'0.2rem',color:'#fff',background:'#00a9e0',borderRadius:'0.3rem',marginRight:'0.15rem'}}>全品类</span>*/}
                                        {/*{shopActivity.storeName}*/}
                                    </div>
                                    <Flex justify="between" style={{padding:'0rem 0px 0px'}}>
                                        <div>
                                            <div className="coupon_list_condition">
                                                <div>会员限制：
                                                    {
                                                        shopActivityMembership.memberLevel == '' ? '全部会员':`${shopActivityMembership.memberLevel}`
                                                    }
                                                </div>
                                                <div>
                                                    {/*{
                                                        item.shopActivity.goodsType == 0 && item.shopActivity.allStoreUse == 1 ? '指定商家' : null//商家店铺
                                                    }*/}
                                                    {
                                                        item.shopActivity.goodsType == 0 ? '适用范围' : null
                                                    }
                                                    {
                                                        item.shopActivity.goodsType== 1? '指定分类' : null
                                                    }
                                                    {
                                                        item.shopActivity.goodsType== 2 ? '指定类型' : null
                                                    }
                                                    {
                                                        item.shopActivity.goodsType== 3 ? '指定品牌' : null
                                                    }
                                                    {
                                                        item.shopActivity.goodsType== 4 ? '指定商品' : null
                                                    }：{item.limitInfo}</div>
                                            </div>
                                            <div style={{color:'#999',fontSize:'0.22rem'}}>{shopActivity.startTimeStr.substr(0,10)}-{shopActivity.endTimeStr.substr(0,10)}</div>
                                        </div>

                                        {
                                            item.isGet == 0 ? <Button inline size="sm" onClick={()=>{this.receiveCoupon(item)}} style={{height:'0.5rem',lineHeight:'0.5rem',color:'#00a9e0',borderColor:'#00a9e0', fontSize:'0.24rem'}}>领取</Button> : <Button inline size="sm" onClick={()=>{this.receiveCoupon(item)}} style={{height:'0.5rem',lineHeight:'0.5rem',color:'#00a9e0',borderColor:'#00a9e0', fontSize:'0.24rem'}}>已领取</Button>
                                        }
                                        {/*<Button inline size="sm" style={{height:'0.5rem',lineHeight:'0.5rem',color:'#00a9e0',borderColor:'#00a9e0', fontSize:'0.24rem'}}>领取</Button>*/}
                                    </Flex>
                                </div>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                }

        })  
      }  
      </List>
    </div>
  }
}

export default CouponList;
