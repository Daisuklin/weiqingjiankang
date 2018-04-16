import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  SegmentedControl
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import Moment from 'moment';
import {Map} from 'immutable';
// import {Img} from 'commonComponent';
import * as memberApi from '../api/member';
import './myEvaluateDetail.less'
// import FlexItem from "antd-mobile/lib/flex/FlexItem.d";

const Item = List.Item;

class EvaluteListDetail extends Component {
    constructor(props) {
        super(props);
    }

  render() {
      const  {myEvaluate} =this.props.location.state;
      console.log(myEvaluate)
      // const gevalImageShow = evaluteList[0].gevalImage && evaluteList[0].gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.52rem',height:'1.52rem',borderRadius:'13px',padding:'0.1rem 0rem'}}/>)
    return (
      <div className="wx-myEvaluteList">

        <div className='myEvaluteListfix-scroll' style={{paddingTop:'0rem'}}>
        <List>
            <WingBlank style={{margin:'0px 0px',padding:'0.2rem 0.26rem',background:'#fff',marginBottom:'0.2rem'}} >
                <WhiteSpace></WhiteSpace>
                {/*账户信息*/}
                <Flex justify='between' className="evalutelist_content1" >
                    <Flex.Item style={{flex:0.7}}><Img src={myEvaluate.goodsImage} style={{ width: '.9rem',height:'.9rem',borderRadius:'50%'}}/></Flex.Item>
                    <Flex.Item style={{flex:3}}>
                        <div>
                            <span className="evalute_name">{myEvaluate.gevalGoodsName}</span>
                            <span className="evalute_data">{myEvaluate.createTimeStr}</span>
                        </div>
                        <div className="evalute_iconimg">
                            {
                             [...Array(myEvaluate.gevalScore)].map((_, i) => {
                                return <img key={i} src={`./assets/img/weiqing/xingxing-01@2x.png`} style={{ width: '.23rem',height:'.22rem'  }} />
                             })
                             }
                        </div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace style={{height:'0.1rem'}}></WhiteSpace>
                <Flex>
                    <Flex.Item style={{flex:3}}>
                        <div className="evalute_product">{myEvaluate.gevalContent}</div>
                        <WhiteSpace></WhiteSpace>
                        {
                            myEvaluate.gevalImage.split(",").map((gevalImage,index)=>{
                                return <Img key={index} src={gevalImage} style={{ width: '1.5rem',height:'1.5rem',marginRight:'0.2rem',borderRadius:'0.15rem' }}/>
                            })
                        }
                    </Flex.Item>
                </Flex>
            </WingBlank>
        </List>
        </div>
      </div>
    )
  }
}

export default withRouter(EvaluteListDetail);
