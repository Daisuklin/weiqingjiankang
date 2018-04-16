import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  SegmentedControl,
    Modal
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import Moment from 'moment';
import * as goodsDetailApi from '../api/goodsDetail';
import './evaluteList.less'

const Item = List.Item;

class EvaluteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluteList: [],
      countAll: null,
      selectedIndex: 0,
        modal1: false
    }
  }

  componentDidMount() {
    this.onChange();
  }

  onChange = (index) => {
    let gevalScore = null;
    let gevalImg = 1;
    switch (index) {
      case 0:
        gevalScore = null;
        break;
      case 1:
        gevalScore = 5;
        break;
      case 2:
        gevalScore = 3;
        break;
      case 3:
        gevalScore = 1;
        break;
      case 4:
        gevalScore = '';
        gevalImg = 0;
        break;
      default:
        break;
    }

    this.setState({
      selectedIndex: index
    })

    goodsDetailApi.goodsEvaluteList({
      goodsId: this.props.params.goodsId,
      gevalScore,
      gevalImg
    }).then(result => {
      if (result.result == 1) {
        const data = result.data;
        if (data && data.length > 0) {
          this.setState({
            evaluteList: data[0].beanList || [],
            countAll: data[0].countAll
          })
        }
      }
    })
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
    const { evaluteList, countAll, selectedIndex } = this.state;

    const tabs = [];
    if (countAll) {
      tabs.push(<div>全部评论<div>({countAll.all})</div></div>);
      tabs.push(<div>好评<div>({countAll.good})</div></div>);
      tabs.push(<div>中评<div>({countAll.general})</div></div>);
      tabs.push(<div>差评<div>({countAll.bad})</div></div>);
      tabs.push(<div>晒图<div>({countAll.ImgCount})</div></div>);
    }

    return (
      <div className="wx-EvaluteList">
        {
         countAll && <SegmentedControl selectedIndex={selectedIndex}
            style={{
              textAlign: 'center',
              height: '1rem',
              position: 'fixed',
              top: '0.9rem',
              left: 0,
              width: '100%',
              zIndex:100
            }} values={tabs}
            onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)} className="myEvaluteList_header" >
          </SegmentedControl>
        }
        <div className='fix-scroll myEvaluteListfix-scroll' style={{paddingTop:'2.1rem',backgroundColor:'white'}}>
        <List>
          <WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>
            {
                evaluteList && evaluteList.map((item, index) => {
                    const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) =><div style={{width:'1.5rem',height:'1.5rem',marginRight:'0.1rem',overflow:'hidden',display:'inline-block',textAlign:'center'}}>
                          <Img key={i} src={image} style={{height:'1.5rem',maxWidth:'3rem',borderRadius:'13px',padding:'0.1rem 0rem'}} onClick={this.showModal('modal1',image)}/>
                        </div>)
                    return <WingBlank key={index} style={{margin:'0px 0px',padding:'0.2rem 0.26rem',borderBottom:'1px solid #e5e5e5'}}>
                      <WhiteSpace></WhiteSpace>
                      <Flex justify='between' className="evalutelist_content1">
                        <Flex.Item style={{flex:0.7}}><Img src={item.gevalFrommemberAvatar} style={{ width: '.9rem',height:'.9rem',borderRadius:'50%'}}/></Flex.Item>
                        <Flex.Item style={{flex:3}}>
                          <div>
                            <span className="evalute_name">{item.gevalFrommembername}</span>
                            <span className="evalute_data">{Moment(item.gevalAddTime).format('YYYY-MM-DD')}</span>
                          </div>
                          <div className="evalute_iconimg">
                              {
                                  [...Array(item.gevalScore)].map((_, i) => {
                                      return <img key={i} src={`./assets/img/weiqing/xingxing-01@2x.png`} style={{ width: '.23rem',height:'.22rem'  }} />
                                  })
                              }
                              {
                                  [...Array(5-item.gevalScore)].map((_, i) => {
                                      return <img key={i} src={`./assets/img/weiqing/xingxing-02@2x.png`} style={{ width: '.23rem',height:'.22rem' }} />
                                  })
                              }
                          </div>

                        </Flex.Item>
                      </Flex>
                      <WhiteSpace style={{height:'0.3rem'}}></WhiteSpace>
                      <Flex>
                        <Flex.Item style={{flex:0.7}}></Flex.Item>
                        <Flex.Item style={{flex:3}}>
                          <div className="evalute_product">{item.gevalContent}</div>
                          <WhiteSpace></WhiteSpace>
                            {
                                item.gevalImage && <div>{gevalImageShow}</div>
                            }
                          <p style={{fontSize: '.24rem',color:'#999',margin:'0.1rem 0rem'}}>商品规格：{item.specInfo}</p>
                          <p style={{
                              fontSize: '.24rem',
                              color:'#999',
                              margin:'0.1rem 0rem'
                          }}>购买日期:{Moment(item.orderAddTime).format('YYYY-MM-DD')}</p>
                        </Flex.Item>
                      </Flex>
                      <Modal title="评价"
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
            {/*<Flex style={{padding:'0.1rem'}} wrap="wrap" justify="around">晒图代码,不要删
             {
             evaluteList && evaluteList.map((item, index) =>{
             return <div key={index} style={{padding:'0rem'}}>
             <img src={item.gevalImage} style={{width:'1.8rem',height:'1.8rem',padding:'0.1rem 0px'}}/>
             </div>
             })
             }
             </Flex>*/}

        </List>  
        </div>
      </div>
    )
  }
}

export default withRouter(EvaluteList);


{/*{
 evaluteList && evaluteList.map((item, index) => {
 const gevalImageShow = item.gevalImage && item.gevalImage.split(',').map((image, i) => <Img key={i} src={image} style={{width:'1.5rem',height:'1.5rem'}}/>)
 return <WingBlank key={index}>
 <WhiteSpace></WhiteSpace>
 <Flex justify='between'>
 <div><Img src={item.gevalFrommemberAvatar} style={{ width: '.36rem',height:'.36rem'}}/><span>{item.gevalFrommembername}</span></div>
 <div>{Moment(item.gevalAddTime).format('YYYY-MM-DD HH:mm:ss')}</div>
 </Flex>
 <WhiteSpace></WhiteSpace>
 <Flex>
 <Flex.Item>
 {
 [...Array(item.gevalScore)].map((_, i) => {
 return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-on.png`} style={{ width: '.36rem',height:'.36rem'  }} />
 })
 }
 {
 [...Array(5-item.gevalScore)].map((_, i) => {
 return <img key={i} src={`${common.SERVER_DOMAIN}/res_v4.0/js/jquery.raty/img/star-off.png`} style={{ width: '.36rem',height:'.36rem' }} />
 })
 }
 </Flex.Item>

 </Flex>
 <WhiteSpace></WhiteSpace>
 <div>{item.gevalContent}</div>
 <WhiteSpace></WhiteSpace>
 {
 item.gevalImage && <div>{gevalImageShow}</div>
 }
 <p style={{
 fontSize: '.24rem',
 color:'gray'
 }} dangerouslySetInnerHTML={{ __html: item.specInfo }} ></p>
 <p style={{
 fontSize: '.24rem',
 color:'gray'
 }}>购买日期:{Moment(item.orderAddTime).format('YYYY-MM-DD HH:mm:ss')}</p>
 </WingBlank>
 })
 }  */}
