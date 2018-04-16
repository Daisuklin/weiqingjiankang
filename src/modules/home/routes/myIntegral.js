import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex
} from 'antd-mobile';
import * as memberApi from '../api/member';
import './myIntegral.less'

class MyIntegral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopPointsLogsList: [],
      pointsNum: 0
    }
  }

  componentWillMount() {
    memberApi.shopPointsLogList({
      pageNo: 1,
      pageSize: 50
    }).then(result => {
      if (result.result == 1) {
        this.setState({
          ...result.data
        })
      }
    })
  }

  render() {
    const {
      pointsNum,
      shopPointsLogsList
    } = this.state;
    return (
      <div className='fix-scroll hastitle'>
        {/*<div style={{
          height: '1.3rem',
          padding: '0.5rem 0.3rem',
          textAlign: 'center',
          background:'red',
          color:'#fff'
        }}>
          <p style={{
              marginTop:'.30rem'
          }}>可用积分</p>
          <p style={{
            fontSize:'.45rem',
            marginTop:'0'
          }}>{pointsNum}分</p>

       </div>*/}
        <div style={{height:'2rem',background:'url(./assets/img/weiqing/zhyebj@2x.png)center center / 100% 100% no-repeat'}} direction="column" justify="start">
          <div style={{textAlign:'left',fontSize:'0.24rem',color:'#fff',padding:'0.34rem 0.26rem 0.1rem'}}>可用积分</div>
          <div style={{color:'#fff',fontSize:'.8rem',padding:'0.17rem 0.26rem 0.2rem'}}>{pointsNum}<span style={{fontSize:'0.28rem'}}>分</span></div>
        </div>
        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
       <div style={{background:'#fff'}}>

         <div style={{padding:'0.3rem 0.26rem',backgroundColor:'#fff',margin:'0.2rem 0px',borderBottom:'1px solid #e5e5e5'}}>
           <span style={{color:'#333',fontSize:'0.28rem'}}><img src="./assets/img/weiqing/grzx-10@2x.png" style={{width:'40px',height:'40px',paddingRight:'0.2rem',float:'left'}}/>明细</span>
         </div>

        {
          shopPointsLogsList.map(pointsLog => {
            return <div>
              <Flex key={pointsLog.id} justify='between' style={{
              borderBottom:'1px solid #e5e5e5',padding:'0.2rem 0.26rem'
            }}>
              <div>
                <div style={{color:'#333',fontSize:'0.28rem',paddingBottom:'0.15rem'}}>{pointsLog.stage}</div>
                <div style={{color:'#999',fontSize:'0.26rem'}}>{pointsLog.createTimeStr}</div>
              </div>
              <div style={{color:'#333',fontSize:'0.28rem'}}>
                {pointsLog.points}
              </div>
            </Flex>
            </div>
          })
        }
        </div>
      </div>
    )
  }
}

export default withRouter(MyIntegral);
