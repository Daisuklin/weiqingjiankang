import React, { Component } from 'react';
import {
  Flex,
  InputItem,
  Button,
  WingBlank,
  WhiteSpace,
  Toast
} from 'antd-mobile';
import { Img } from 'commonComponent';

import './GoodsSearchSpecFilter.less'

class GoodsSearchSpecFilter extends Component {

  // 点击规格值
  onClickSpValue = (spec, value) => {
    this.props.onClickSpValue(spec, value);
  }


  onClickBrandValue = (spec, value) => {
        this.props.onClickBrandValue(spec, value);
  }
  reset = () => {
    this.props.resetSpec();
    this.onChangePrice(1,'');
      this.onChangePrice(2,'');
  }

  onChangePrice = (type, val) => {
    // 最低价
    if (type == 1) {
      this.props.changePrice({
        minimumPrice: val
      });
    } else {
      this.props.changePrice({
        maximumPrice: val
      });
    }
  }

  submit = () => {
    const { specList, maximumPrice, minimumPrice } = this.props;
    // 最低最高
    if (maximumPrice != '' && minimumPrice == '') {
      Toast.info('最低价不能为空', 1)
      return;
    } else if (minimumPrice != '' && maximumPrice == '') {
      Toast.info('最高价不能为空', 1)
      return;
    } else if (minimumPrice != '' && maximumPrice != '' &&
      parseFloat(minimumPrice) >= parseFloat(maximumPrice)) {
      Toast.info('最低价不能大于最高价', 1)
      return;
    }
    console.log(minimumPrice, maximumPrice);
    this.props.filterBySpec();
  }

  render() {
    const { specList, maximumPrice, minimumPrice } = this.props;
    return <div className='wx-GoodsSearchSpecFilter' style={{position:'fixed'}}>
      <div style={{overflowY:'auto',height:'95%'}}>
      <div className='price-filter'>
        <div>价格区间</div>
        <Flex className="price_between">
          <InputItem
            onChange={(val) => this.onChangePrice(1, val)}  
            placeholder="最低价"
            type='number'
            value={minimumPrice}
          ></InputItem>
          <InputItem
            type='number'  
            value={maximumPrice}  
            onChange={(val)=>this.onChangePrice(2,val)}  
            placeholder="最高价"
          ></InputItem>
        </Flex>
      </div>
      <div className='spec-value-list'>
        <WingBlank>
        {
          specList.map((spec, index) => {
            
            return <div key={index}>
              <WhiteSpace></WhiteSpace>
              <div style={{fontSize:'0.28rem',color:'#333'}}>{spec.spName}</div>
              <WhiteSpace></WhiteSpace>
              <Flex wrap="wrap" justify="between">
                {
                  spec.specValueList.map((value,i) => {
                    let type = 'ghost'
                    if (value.checked) {
                      type = 'primary'  
                    }
                    return <div key={i} className='spec-value'>
                      <Button style={{
                        width:'2.3rem',
                          height:'0.6rem',
                          fontSize:'0.26rem',
                          lineHeight:'0.6rem',
                          color:'#333',
                          backgroundColor:'#f5f5f5',
                          borderColor:'#f5f5f5',
                          padding:'0rem 0.08rem'}}
                              onClick={() =>{spec.spName!='品牌'?this.onClickSpValue(spec, value):this.onClickBrandValue(spec, value)}}
                        type={type}>{value.spValueName}</Button>
                    </div>  
                  })
                }
              </Flex>
            </div>
          })
        }
        </WingBlank>
      </div>
      <Flex className='spec-btn'>
        <Flex.Item style={{flex:1}}>
            <Button onClick={this.reset} style={{height:'0.9rem',lineHeight:'0.9rem',width:'100%',borderRadius:'0px',borderBottom:'none'}}>重置</Button>
        </Flex.Item>
        <Flex.Item style={{flex:1,marginLeft:'0px'}}>
          <Button type='primary' onClick={this.submit} style={{background:'#5491d2',height:'0.9rem',lineHeight:'0.9rem',borderColor:'#5491d2',width:'100%',borderRadius:'0px'}}>确定</Button>
        </Flex.Item>
      </Flex>
      </div>
    </div>
  }
}

export default GoodsSearchSpecFilter;
