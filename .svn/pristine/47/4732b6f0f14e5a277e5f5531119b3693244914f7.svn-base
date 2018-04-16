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
    Tabs
} from 'antd-mobile';
import * as couponApi from '../api/coupon';
// import GievFriends from '../components/GievFriends';
import { CommonShare} from 'commonComponent';
import CouponList from '../components/CouponList';
import CouponListAlreadyUsed from '../components/CouponListAlreadyUsed';
import CouponListOverdue from '../components/CouponListOverdue';
import './coupon.less';
const Item = List.Item;
const TabPane = Tabs.TabPane;
const goodsTypes = {
  '0': '全部商品',
  '1': '指定商品分类',
  '2': '指定商品类型',
  '3': '指定品牌',
  '4': '指定商品'
}

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponList: [],
        showStatus:0
    }
  }

  refreshList = () => {
    couponApi.couponMemberList({
      couponIsUser: this.props.params.couponIsUser || 0
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        this.setState({
          couponList: data || []
        })
      } else {
        Toast.info(result.msg);
      }
    })
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.couponIsUser !== this.props.params.couponIsUser) {
      this.refreshList();
    }
  }

  onChange = (index) => {
    this.props.router.replace('/coupon/' + index);
  }

  render() {
    const { couponList,showStatus } = this.state;
    let couponIsUser = this.props.params.couponIsUser
    couponIsUser = (couponIsUser && parseInt(couponIsUser)) || 0
    console.log(couponIsUser);
    return (
      <div className='wx-coupon'>
        {/*<SegmentedControl
          selectedIndex={couponIsUser}
          onChange={(e)=>this.onChange(e.nativeEvent.selectedSegmentIndex)}
          style={{ height: '0.8rem' }}
          values={['未使用', '已使用', '已过期']} className="coupon-header">

        </SegmentedControl>*/}
        <List>
          <Tabs defaultActiveKey="0" className="coupon_tabs" activeTextColor="#00a9e2" swipeable={false} onChange={this.onChange}>
            <TabPane tab="未使用" key="0">
                {
                    couponList.map((item, index) => {
                        const { shopActivityPromotionRule } = item
                        const { shopActivity } = shopActivityPromotionRule
                        const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ?
                            shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'
                        return <Item key={index} style={{padding:'0.2rem 0.26rem'}} className="coupon_listItem1">
                          <CouponList  showStatus={showStatus}
                                        shopActivityPromotionRule={shopActivityPromotionRule}
                                        shopActivity={shopActivity}
                                        activityId={item.id}
                                       item={item}
                          ></CouponList>
                        </Item>
                    })
                }
            </TabPane>
            <TabPane tab="已使用" key="1">
                {
                    couponList.map((item, index) => {
                        const { shopActivityPromotionRule } = item
                        const { shopActivity } = shopActivityPromotionRule
                        const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ?
                            shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'
                        return <Item key={index} style={{padding:'0.2rem 0.26rem'}} className="coupon_listItem2">
                          <CouponListAlreadyUsed couponList={couponList} showStatus={showStatus} shopActivityPromotionRule={shopActivityPromotionRule} shopActivity={shopActivity}></CouponListAlreadyUsed>
                        </Item>
                    })
                }
            </TabPane>
            <TabPane tab="已过期" key="2">
                {
                    couponList.map((item, index) => {
                        const { shopActivityPromotionRule } = item
                        const { shopActivity } = shopActivityPromotionRule
                        const showMemberLimit = shopActivity.shopActivityMembership.memberGradle ?
                            shopActivity.shopActivityMembership.memberGradle.gradleName : '全部会员'
                        return <Item key={index} style={{padding:'0.2rem 0.26rem'}} className="coupon_listItem2">
                          <CouponListOverdue couponList={couponList} showStatus={showStatus} shopActivityPromotionRule={shopActivityPromotionRule} shopActivity={shopActivity}></CouponListOverdue>
                        </Item>
                    })
                }
            </TabPane>
          </Tabs>

        </List>
      </div>
    )
  }
}

export default withRouter(Coupon);
