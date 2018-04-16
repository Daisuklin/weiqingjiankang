import React, { Component } from 'react'
import {Img } from 'commonComponent';
import {Carousel, Modal, SearchBar,Flex, WhiteSpace, WingBlank,Icon,Toast} from 'antd-mobile';
import  './css/pointGoods.less';
/**
 * 商品图片、名称、价格
 * @param {*} param0 
 */

class GoodsTop extends React.PureComponent{
  render(){
      const goodsPrice=this.props.goodsPrice;
      const goodsImg=this.props.goodsImg;
      const goodsName=this.props.goodsName;
      const goodsPoints=this.props.goodsPoints;
      const pointsGoodsTransfeeCharge=this.props.pointsGoodsTransfeeCharge;
      return <div className="wx-goods-detail">
        <Img src={goodsImg} style={{width:'100%'}}/>
        <div className="base-detail">
            <div className="goodsName">{goodsName}</div>
         <p className="goodsIntorduce"> {goodsName}     </p>
            <div className="goods-points">
                <span style={{color:'#e82231',fontSize:'.3rem',paddingRight:'0.2rem'}}>{goodsPoints}积分</span>
                <span className="goods-price">¥{goodsPrice}</span>
            </div>
        </div>
          {/*<Flex className='base-detail'  justify="between" align='center' >
              <Flex.Item style={{flex:3}}>
                  <Flex.Item className="goodsName">{goodsName}</Flex.Item>
                  <p className="goodsIntorduce" > {goodsName} </p>
                  <p style={{margin:'10px 0px 15px'}}>
                      <span style={{color:'#e82231',fontSize:'.3rem',paddingRight:'0.2rem'}}>{`${goodsPoints}积分`}</span>
                      <del style={{color:'#9a9a9a',fontSize:'.27rem'}}>{`¥${goodsPrice}`}</del></p>
              </Flex.Item>
              <Flex.Item style={{flex:1,textAlign:'center',color:'#656565'}}>
                  <img src='./assets/img/img_default.png' style={{width:'0.5rem',height:'0.5rem',paddingBottom:'0.1rem'}}/><br /><span style={{fontSize:'0.25rem'}}>附件下载</span>
              </Flex.Item>
          </Flex>*/}
        <div className="free-block">
            运费：免运费
        </div>
      </div>
  }
}

export default GoodsTop