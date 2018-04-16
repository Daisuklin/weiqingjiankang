import React, { Component } from 'react'
import {
  List,
  Flex,
  Button,
  WingBlank,
  WhiteSpace,
    Modal
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import './GoodsSpec.less'

/**
 * 商品评价
 */

class EvaluateGoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal1: false
        }
    }

     showModal = (key,image) => (e) => {
    e.preventDefault();
    this.setState({
        [key]: true,
        imgurl:image
    });
}
     onClose = key => () => {
    this.setState({
        [key]: false,
    });
}
     Close=()=>{
    this.setState({
        modal1: false,
    });
}
    render() {
      const {
          gotoEvaluateList,
          gotoConsultation,
          goodsDetailInfo
      }= this.props;
        const { evaluateGoodsList } = goodsDetailInfo;
        const goodsEvalue = goodsDetailInfo.evaluate / 5;
        const evalue = goodsEvalue.toFixed(2) * 100;
        return <List className="goods-Detail-evaluate">
          <List.Item onClick={()=>gotoEvaluateList(goodsDetailInfo)} extra={`${evalue}%好评`} arrow="horizontal" style={{borderBottom:'1px solid #e5e5e5'}}>
            商品评价({`${goodsDetailInfo.commentnum}`})
          </List.Item>
          <div className="Detail-evaluate">
              {
                  evaluateGoodsList && evaluateGoodsList.map((item, index) => {
                      const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) =>
                              <div style={{width:'1.5rem',height:'1.5rem',marginRight:'0.1rem',overflow:'hidden',display:'inline-block',textAlign:'center'}}>
                                <Img key={i} src={image} style={{height:'1.5rem',maxWidth:'3rem'}} onClick={this.showModal('modal1',image)} /></div>)
                      return <WingBlank key={index} style={{padding:'0.2rem 0px'}}>
                        <WhiteSpace></WhiteSpace>
                        <Flex>
                          <Flex.Item>
                              {
                                  [...Array(item.gevalScore)].map((_, i) => {
                                      return <img key={i} src={`./assets/img/weiqing/xingxing-01@2x.png`} style={{ width: '.23rem',height:'.22rem',paddingRight:'0.14rem'  }} />
                                  })
                              }
                              {
                                  [...Array(5-item.gevalScore)].map((_, i) => {
                                      return <img key={i} src={`./assets/img/weiqing/xingxing-02@2x.png`} style={{ width: '.23rem',height:'.22rem',paddingRight:'0.14rem' }} />
                                  })
                              }
                          </Flex.Item>
                          <Flex.Item style={{textAlign:'right'}}>
                              {item.gevalFrommembername}
                          </Flex.Item>
                        </Flex>
                        <WhiteSpace></WhiteSpace>
                        <div style={{fontSize:'0.26rem',color:'#666',lineHeight:'0.45rem'}}>{item.gevalContent}</div>
                        <WhiteSpace></WhiteSpace>
                          {
                              item.gevalImage && <div className="gevalImageShow_img">{gevalImageShow}</div>
                          }
                        <Modal title="商品评价大图"
                               visible={this.state.modal1}
                               transparent
                               maskClosable={true}
                               onClose={this.onClose('modal1')}
                               style={{width:'8rem',height:'auto !important',backgroundColor:'#fff',padding:'0rem 0rem 0.3rem'}}
                        >
                          <Img className='imgDe_evalute' onClick={()=>this.Close()} src={this.state.imgurl} style={{
                            // width:'8rem',
                            //   height:'8rem'
                              maxWidth:'8rem',
                              maxHeight:'8rem'

                          }}/>
                        </Modal>
                      </WingBlank>
                  })
              }
          </div>
          <List.Item>
            <Flex style={{paddingBottom:'0.2rem'}}>
              <Flex.Item>
                <Button onClick={()=>gotoEvaluateList(goodsDetailInfo)} style={{
                    height:'0.6rem',
                    lineHeight:'0.6rem',
                    color:'#333',
                    fontSize:'0.22rem',
                    borderColor:'#e6e6e6'
                }}>商品晒单 ({goodsDetailInfo.commentnum})</Button>
              </Flex.Item>
              <Flex.Item>
                <Button onClick={()=>gotoConsultation(goodsDetailInfo)} style={{
                    height:'0.6rem',
                    lineHeight:'0.6rem',
                    color:'#333',
                    fontSize:'0.22rem',
                    borderColor:'#e6e6e6'
                }}>购买咨询 ({goodsDetailInfo.consultationNum})</Button>
              </Flex.Item>
            </Flex>
          </List.Item>
        </List>
    }
}
export default EvaluateGoodsList;