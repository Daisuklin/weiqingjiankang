import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  Modal,
  Toast,
  Flex,
  Button,
  List,
  Checkbox,
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../api/order';
import { common } from 'common';

const Item = List.Item;

import './order.less';

class PaySuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payInfo: null
    }
  }

  componentDidMount() {
    orderApi.pointsPay({
        orderId: this.props.params.orderId
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          payInfo: result.data[0].shopPointsOrder
        })
      }
    })
  }

  render() {

      const PlaceHolder = props => (
          <div style={{
              backgroundColor: '#ebebef',
              color: '#bbb',
              textAlign: 'center',
              height: '0.6rem',
              lineHeight: '0.6rem',
              width: '100%',
          }} {...props}
          >Item</div>
      );

      const IconClass = ({ url }) => {
          return <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: `url(${url}) center center /  1.2rem 1.2rem no-repeat`,
              display:'inline-block',
              marginRight:'0.1rem'
          }}
          />
      }

    const { payInfo } = this.state;
    if (!payInfo) {
      return null;
    }
    return <div className='wx-pay-result' style={{backgroundColor:'white',paddingBottom:'0.2rem'}}>
      <Flex>
        <Flex.Item style={{flex:2}}><IconClass url={'./assets/img/successPay.png'}></IconClass></Flex.Item>
        <Flex.Item style={{flex:3}}>
          <div style={{
            fontSize: '.24rem',
            height: '0.8rem',
            lineHeight: '0.4rem',
            overflow:'hidden'
        }}>订单编号：{payInfo.pointOrdersn}</div>
          <div style={{
              fontSize: '.24rem',
              height: '0.8rem',
              lineHeight: '0.4rem',
              overflow:'hidden'
          }}>消费积分：{payInfo.pointAllpoint}积分</div>
        </Flex.Item>
      </Flex>
      <Flex justify="between">
        <Button></Button>
        <Button
            onClick={() => {
                window.location.href ='/mall/points.html#/pointsOrderList/1'
            }}
            type='ghost' size='small' inline style={{borderColor:'#5491d2',color:'#5491d2',fontSize:'0.28rem'}}>查看订单</Button>

        <Button
            onClick={() => {
                window.location.href ='/mall/home.html#/'
            }}
            type='ghost' size='small' inline style={{borderColor:'#5491d2',color:'#5491d2',fontSize:'0.28rem'}}>返回首页</Button>
        <Button></Button>
      </Flex>
           </div>
  }
}

export default withRouter(PaySuccess);
