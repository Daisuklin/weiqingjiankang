/**
 * 我的物流信息
 * Created by leimingtech-lhm on 2017/5/12.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
    Button,
    List
} from 'antd-mobile';
import {Map} from 'immutable';
import {Img} from 'commonComponent';
import * as memberApi from '../api/member';
import './viewLogistics.less'
const Item = List.Item;
class ViewLogistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
        developListBox:Map(),
        developList:Map(),
        init:'false',
        pageNo: 1,

    }
  }

    componentDidMount() {
        const { orderItem } = this.props.location.state;
      console.log(orderItem)
    memberApi.search({
        type:orderItem.shippingExpressCode,
        postid:orderItem.shippingCode,
        shippingExpressId:orderItem.shippingExpressId
    }).then(result => {
      if (result.result == 1) {
        const data=result.data;
          console.log(data)
        this.setState({
          // ...result.data
            developListBox:result,
            developList:data,
            init:true
        })
      }
    })
  }

  render() {
      const { orderItem } = this.props.location.state;
      const { developList,developListBox } = this.state;
      if (!this.state.init) {
          return null
      }
      console.log(developList)
    return (
      <div className="ViewLogistics-scroll">

          <List>
              <div className="viewLogistice_list">
                  <Item
                      multipleLine
                      onClick={() => {}}
                      platform="android"
                      extra={orderItem.paymentName}>支付方式</Item>
                  <Item
                      multipleLine
                      onClick={() => {}}
                      platform="android"
                      extra={developListBox.seName}>承运人</Item>
                {/*  <Item
                      multipleLine
                      onClick={() => {}}
                      platform="android"
                      extra={'968852'}>承运人电话</Item>*/}
                      <div className="view_shippingCode">
                          <div className="view_shippingCode_l">订单编号</div>
                          <div className="view_shippingCode_r">{orderItem.shippingCode}</div>
                      </div>
                  {/*<Item
                      multipleLine
                      onClick={() => {}}
                      platform="android"
                      extra={orderItem.shippingCode}>订单编号</Item>*/}
              </div>
          </List>
          <div className="viewLogistice_process">
              <ul className="list-progress">
                  {
                      developList.length > 0 && developList.map((item, index)=>{
                          console.log(item.createTime)
                          return <li key={index}>
                              <h4 className="time">
                                  {item.context}
                              </h4>
                              <p>{item.ftime}</p>
                          </li>
                      })
                  }
              </ul>
              <WhiteSpace></WhiteSpace>
              <div style={{width:'100%',textAlign:'center'}}><a href="https://m.kuaidi100.com/" target="_blank">快递查询</a></div>
          </div>


      </div>
    )
  }
}

export default withRouter(ViewLogistics);
