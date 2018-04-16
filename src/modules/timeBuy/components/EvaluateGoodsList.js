import React, { Component } from 'react'
import {
  List,
  Flex,
  Button,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';

/**
 * 商品评价
 */
export default function({ goodsDetailInfo, gotoEvaluateList, gotoConsultation }) {

  const { evaluateGoodsList } = goodsDetailInfo;

  const goodsEvalue = goodsDetailInfo.evaluate / 5;
  const evalue = goodsEvalue.toFixed(2) * 100
  return <List>
    <List.Item onClick={()=>gotoEvaluateList(goodsDetailInfo)} extra={<div style={{fontSize:'0.28rem',color:'#999'}}>好评<span style={{color:'rgb(232, 34, 49)'}}>{evalue}%</span></div>} arrow="horizontal">
	      <div style={{fontSize:'0.28rem',color:'#999'}}>商品评价（{`${goodsDetailInfo.commentnum}`}）&nbsp;</div>
    </List.Item>
    {
      evaluateGoodsList && evaluateGoodsList.map((item, index) => {
        const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.5rem',height:'1.5rem'}}/>)
        return <WingBlank key={index} style={{borderBottom:'1px solid #e6e6e6',marginBottom:'0.2rem'}}>
          <WhiteSpace></WhiteSpace>
          <Flex>
            <Flex.Item>
              {
                [...Array(item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '.3rem',height:'.3rem'  }} />
                })
              }
              {
                [...Array(5-item.gevalScore)].map((_, i) => {
                  return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '.3rem',height:'.3rem' }} />
                })
              }
            </Flex.Item>
            <Flex.Item style={{textAlign:'right'}}>
              {item.gevalFrommembername}
            </Flex.Item>
          </Flex>
          <WhiteSpace></WhiteSpace>
          <div>{item.gevalContent}</div>
          <WhiteSpace></WhiteSpace>
          {
            item.gevalImage && <div>{gevalImageShow}</div>
          }
          <WhiteSpace></WhiteSpace>
        </WingBlank>
      })
    }
    <List.Item>
      <Flex>
        <Flex.Item>
          <Button onClick={()=>gotoEvaluateList(goodsDetailInfo)} style={{fontSize:'0.24rem',color:'#9d9c9c',height:'0.6rem',lineHeight:'0.6rem',width:'95%'}}>商品晒单 ({goodsDetailInfo.commentnum})</Button>
        </Flex.Item>
        <Flex.Item>
          <Button onClick={()=>gotoConsultation(goodsDetailInfo)} style={{fontSize:'0.24rem',color:'#9d9c9c',height:'0.6rem',lineHeight:'0.6rem',width:'95%'}}>购买咨询 ({goodsDetailInfo.consultationNum})</Button>
        </Flex.Item>
      </Flex>
    </List.Item>
  </List>
}
