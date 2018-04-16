import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class LockBalance extends Component {

  state = {
    memberDetail: null
  }

  componentDidMount() {
    memberApi.memberDetail().then(result => {
      if (result.result == 1 && result.data && result.data.length > 0) {
        this.setState({
          memberDetail: result.data[0]
        });
      }
    })
  }

  render() {
    const { memberDetail } = this.state;
    if (!memberDetail) {
      return null;
    }
    return (
      <div>
        <Flex style={{height:'4rem',background:'url(./assets/img/weiqing/sdyebj@2x.png)center center / 100% 100% no-repeat'}}>
          <Flex.Item style={{color:'#fff',fontSize:'.8rem',width:'100%',textAlign:'center'}}><span style={{fontSize:'0.5rem'}}>￥</span>{`${memberDetail.freezePredeposit}`}</Flex.Item>
        </Flex>
        {/*<div style={{height:'4rem',background:'url(./assets/img/weiqing/sdyebj@2x.png)center center / 100% 400px no-repeat'}} direction="column" justify="start">
          <div style={{color:'#fff',fontSize:'.8rem',width:'100%',padding:'0.17rem 0.26rem 0.2rem'}}>{`${memberDetail.availablePredeposit}`}</div>
        </div>*/}
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <div style={{fontSize:'0.26rem',color:'#999'}}>提示：手机账户余额仅支持最大化使用</div>
        </WingBlank>
      </div>
    );
  }
}

export default withRouter(LockBalance);
