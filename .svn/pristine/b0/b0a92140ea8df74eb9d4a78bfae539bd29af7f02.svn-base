import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class CustomerService extends Component {

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
      <div style={{padding:'0.3rem 0.26rem'}}>
        <div style={{padding:'0 0.2rem',background:'#fff'}}>
          <Flex style={{padding:'0.9rem 0 0.4rem',borderBottom:'1px dashed #efefef'}} direction="column">
            <div style={{}}><img src="./assets/img/weiqing/lxkf-01@2x.png" style={{width:'267px',height:'202px'}}/></div>
            <div style={{color:'#666',fontSize:'.28rem',padding:'0.4rem 0.26rem 0.2rem'}}>客服电话：001-119</div>
          </Flex>
        </div>
        <div style={{padding:'0 0.2rem',background:'#fff',}}>
          <Flex style={{padding:'0.9rem 0 0.4rem',borderBottom:'1px dashed #efefef'}} direction="column">
            <div style={{}}><img src="./assets/img/weiqing/lxkf-02@2x.png" style={{width:'267px',height:'202px'}}/></div>
            <div style={{color:'#666',fontSize:'.28rem',padding:'0.4rem 0.26rem 0.2rem'}}>客服QQ：001-119</div>
          </Flex>
        </div>
          <div style={{padding:'0 0.2rem',background:'#fff'}}>
            <Flex style={{padding:'0.9rem 0 0.4rem'}} direction="column">
              <div style={{}}><img src="./assets/img/weiqing/lxkf-03@2x.png" style={{width:'273px',height:'225px'}}/></div>
              <div style={{color:'#666',fontSize:'.28rem',padding:'0.4rem 0.26rem 0.2rem'}}>客服微信：001-119</div>
            </Flex>
          </div>
      </div>
    );
  }
}

export default withRouter(CustomerService);
