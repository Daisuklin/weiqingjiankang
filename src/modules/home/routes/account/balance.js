import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
  Button
} from 'antd-mobile';
import * as memberApi from '../../api/member';

class Balance extends Component {

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
      <div style={{}}>
        <div style={{height:'2rem',background:'url(./assets/img/weiqing/zhyebj@2x.png)center center / 100% 100% no-repeat'}} >
            <div style={{textAlign:'left',width:'100%',fontSize:'0.24rem',color:'#fff',padding:'0.34rem 0.26rem 0.1rem'}}>可用余额（元）</div>
            <div style={{color:'#fff',fontSize:'.8rem',width:'100%',padding:'0.17rem 0.26rem 0.2rem'}}>{`${memberDetail.availablePredeposit}`}</div>
        </div>

        <div>
          <div style={{padding:'0.3rem 0.26rem',backgroundColor:'#fff',margin:'0.2rem 0px'}} onClick={() => {
              this.props.router.push('/recharge')
          }}>
            <span style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/zhye@2x.png" style={{width:'32px',height:'32px',paddingRight:'0.2rem',float:'left'}}/>充值</span>
            <img src="./assets/img/weiqing/youjiantou-01@2x.png" style={{float:'right',paddingTop:'0.07rem'}}/>
          </div>
          <div style={{padding:'0 0.26rem'}}>
            <img src="./assets/img/banner1.jpg" style={{width:'100%'}} />
          </div>

        </div>

        {/*<Button onClick={() => {
          this.props.router.push('/recharge')
          }} type='primary' style={{background:'#fff',border:'none',border}}><span style={{color:'#333',fontSize:'0.28rem'}}>充值</span><img src="./assets/img/weiqing/youjiantou-01@2x.png"/></Button>*/}
      </div>
    );
  }
}

export default withRouter(Balance);
