import React, { Component } from 'react';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import { List, Flex, Tag, Stepper, Icon ,Button} from 'antd-mobile';
/*import * as goodsDetailApi from '../../goodsDetail/api/goodsDetail';
import classnames from 'classnames';*/

import './GinsengPeople.less'

class GoodsSpec extends React.PureComponent {

  constructor(props) {
    super();
    // console.log('props', props);
    this.state = {
      /*goodsSpecValueAll: props.goodsDetailInfo.goodsSpecValueAll,
      goodsSpec: props.goodsDetailInfo.goodsSpec,
      specName: props.goodsDetailInfo.specName,
      goodsId: props.goodsDetailInfo.goodsId,
      goodsName: props.goodsDetailInfo.goodsName,
      goodsImage: props.goodsDetailInfo.goodsImage,
      buyCount: props.buyCount*/
    }
  }

  renderHeader = () => {
    const { goodsImage, goodsSpec, goodsName } = this.state;
    return <div>
      <div>
        <span
          style={{
            position: 'absolute', right:'0.16rem' , top:'0.2rem',
          }}
          onClick={() => this.props.onClose('cancel')}>
          <Icon type="cross" />
        </span>
      </div>

    </div>
  }


  render() {
    // 获取规格属性
    /*const {
      goodsSpecValueAll, // 所有的规格属性
      goodsSpec, // 当前选择的规格值  
      specName,
      goodsName,
      goodsImage,
    } = this.state;*/
    // 当前选中的规格
    // const { specGoodsSpec } = goodsSpec;
      const {groupItemDetail,groupVo,groupDetail} = this.props;
    return <div style={{ marginBottom: 'rem'}}>
      <List renderHeader={() => (this.renderHeader())} style={{ position: 'relative' }} className="listBox">
        {/**/}
        {/*<div>
          <Flex style={{ padding:'0.2rem 0rem',borderBottom:'1px solid #ddd',margin:'0px 0.26rem'}} direction="column" className="goodscontent2">
            <div>
              <Img src={goodsImage} style={{width:'1.1rem',height:'1.1rem',borderRadius:'50%'}} />
            </div>
            <div>
              <div className="goodsname">{goodsName}</div>
              <div className="goodsproduct">2017-05-14 14:56:25 开团</div>
            </div>
          </Flex>
        </div>*/}
        <div>
          <Flex style={{ padding:'0.2rem 0rem',borderBottom:'1px solid #ddd',margin:'0px 0.26rem'}} direction="column" className="goodscontent2">
            <div style={{position:'relative'}}>
                {
                    groupDetail.groupMembersList[0].isCreate == 1 &&<img src="./assets/img/weiqing/tuanzhang-01@2x.png" style={{width:'0.54rem',height:'0.34rem',position:'absolute',left:'-13px',top:'-14px'}}/>
                }
              <Img src={groupDetail.groupMembersList[0].memberAvatar} style={{width:'1.1rem',height:'1.1rem',borderRadius:'50%'}} />
            </div>
            <div>
              <div className="goodsname">{groupDetail.groupMembersList[0].memberName}</div>
              <div className="goodsproduct">{groupDetail.groupMembersList[0].createTimeStr} 开团</div>
            </div>
          </Flex>
        </div>

          {
              groupDetail.groupMembersList.map((groupMenber,index)=>{
                  return <div>

                          {
                              index >= 1 && <div>
                                <Flex className='wx-goodspece-detail-info2'  style={{padding:'0.2rem',background:'#fff'}}>
                                  <Flex.Item style={{flex:1,textAlign:'center'}} className="bargainImgl">
                                    <Img src={groupMenber.memberAvatar} style={{width:'0.9rem',height:'0.9rem',borderRadius:'50%'}} />
                                  </Flex.Item>
                                  <Flex.Item style={{flex:3}} onClick={()=>common.gotoginsengGroup({specId:goodsSpec.goodsSpecId})} >
                                    <div><span style={{fongSize:'0.26rem',color:'#333',paddingRight:'0.2rem'}}>{groupMenber.memberName}</span>
                                      <span style={{fongSize:'0.26rem',color:'#999'}}>{groupMenber.createTimeStr}开团</span></div>

                                  </Flex.Item>
                                </Flex>
                              </div>
                          }



                      </div>


              })
          }


{/**/}
      </List>
    </div>
  }
}

export default GoodsSpec;
