import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon ,Button} from 'antd-mobile';
import * as goodsDetailApi from '../../goodsDetail/api/goodsDetail';
import classnames from 'classnames';

import './ImmediatelyOffered.less'

class SpecGroup extends Component {
  render() {
    const { values, selectedValue, onChangeSpec } = this.props;
    return <div className='wx-goods-detail-spec-group'>
      {
        values.map((value, index) => {
          const tagClass = classnames('am-tag', {
            'am-tag-active': selectedValue.includes(value.spValueId),
            'am-tag-normal': !selectedValue.includes(value.spValueId)
          })  
          return <div key={index} onClick={() => onChangeSpec(value)} className={tagClass} style={{ marginLeft: '0.18rem' }}>
            <div className="am-tag-text">{value.spValueName}</div>
          </div>
        })
      }
    </div>
  }
}

class GoodsSpec extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            buyCount: 1,
        }
    }

  renderHeader = () => {
      const {groupItemDetail,groupVo,groupDetail} = this.props;
    return <div>
      <div style={{ position: 'relative' }}>
        <div style={{float:'left',color:'#333',fontSize:'0.28rem',maxWidth:'80%',overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{groupVo.groupName}</div>
        <span
          style={{
            position: 'absolute', right: 3, top: -5,
          }}
          onClick={() => this.props.onClose('cancel')}>
          <Icon type="cross" />
        </span>
      </div>

    </div>
  }

  onChangeSpec = (spec) => {
    const { goodsSpec, goodsSpecValueAll } = this.state;
    // 当前选择的所有规则
    let currentSpecs = goodsSpec.specGoodsSpec;
    // 删除当前规则组的所有子选项
    const goodsSpecValueGroup = goodsSpecValueAll[spec.spId];
    // 只有1个规则项，不做处理
    if (goodsSpecValueGroup.length == 1) {
      // const currentGroup = this.refs[`specGroup-${spec.spId}`];
      return;
    } else {
      //  当前规则组 ，存在多个规则时 切换处理
      goodsSpecValueAll[spec.spId].forEach(item => {
        delete currentSpecs[item.spValueId]
      })
      this.onChangeNum(1);
      // 添加当前规则到 已选择的规则
      currentSpecs[spec.spValueId] = spec.spValueName
      const specIds = Object.keys(currentSpecs).join()
      goodsDetailApi.getSpecByGoodsIdAndSpecIds({
        goodsId: goodsSpec.goodsId,
        specIds
      }).then(result => {
        if (result.result == 1) {
          const data = result.data[0]
          // 更新组件相关数据
          this.setState({
            goodsSpec: {
              ...this.state.goodsSpec,
              specGoodsPrice: data.price,
              specGoodsStorage: data.num,
              goodsSpecId: data.specId
            }
          })
          // 同步状态到外部页面
          this.props.onChangeSpec(currentSpecs, data);
        }
      })
    }
  }

  onChangeNum = (num) => {
    this.setState({
      buyCount: num
    })
    this.props.onChangeBuyNum(num);
  }
    gotoBuy = () => {
        const {groupItemDetail,groupVo,groupDetail} = this.props;
        const specId = groupVo.specId;
        const groupItemId = groupVo.groupItemId;
        const groupNumber = this.state.buyCount;
        const groupDetailId = groupDetail.groupDetailId;
        this.props.gotoBuy(groupNumber,specId,groupItemId,groupDetailId);
        console.log(groupNumber,specId,groupItemId);
        this.props.onClose();
    }

  render() {
      const {groupItemDetail,groupVo,groupDetail} = this.props;
      const buyCount = this.state.buyCount;
console.log(this.props.buyCount)
    return <div style={{ marginBottom: '1.1rem'}}>
      <List renderHeader={() => (this.renderHeader())}>
        <div className="textIntroduce">
          <div className="textIntroduce_span">1.本团尾限定人次拼团</div>
          <div className="textIntroduce_span">2.人次达标即可拼团</div>
          <div className="textIntroduce_span">3.拼团结束后，退还起步价和团加差价</div>
        </div>
        {/**/}
        <div>
          <Flex style={{ height: '200px' ,padding:'0.2rem 0.3rem',borderBottom:'1px solid #ddd'}}>
            <Flex.Item style={{flex:1,textAlign:'center'}}>
              <Img src={groupVo.groupImage} style={{height:'130px',width:'1.62rem'}}></Img>
            </Flex.Item>
            <Flex.Item style={{flex:2}} className="goodscontent">
              <div className="goodsname">{groupVo.groupName}</div>
              {/*<div className="goodsproduct">{goodsName}</div>*/}
              <div className="div_bottm">
                <div className="span_picese">{`¥${groupVo .groupPrice}`}</div>
                <span className="span_kunum">库存：{groupVo.goodsStorage}</span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
        <List.Item extra={
          <Stepper ref='stepper'
                   className="redeeNow_stepper"
                   style={{ width: '50%', minWidth: '1.5rem' }}
                   showNumber min={0}
                   max={parseInt(groupVo.limitNumber)}
                   size="small"
                   onChange={this.onChangeNum}
                   value={this.state.buyCount}
                   />
        }>购买数量（限购<span style={{color:'#e60012'}}> {groupVo.limitNumber} </span>件）</List.Item>
        <Flex className="bargainBtn">
          <Flex.Item style={{flex:1}}  >
            <Button type='primary'onClick={()=>this.gotoBuy()} style={{height:'0.65rem',margin:'0rem 0.2rem',lineHeight:'0.65rem',backgroundColor:'#5491d2',borderColor:'#5491d2'}}>下一步</Button>
          </Flex.Item>
        </Flex>
{/**/}
        
      </List>
    </div>
  }
}

export default GoodsSpec;
