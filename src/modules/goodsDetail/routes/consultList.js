import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  List,
  Button,
  Icon,
  ListView
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as goodsDetailApi from '../api/goodsDetail';
import comment from 'svg/comment.svg';

import './consultList.less';

let pageNo = 1;

class ConsultList extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.consultList = []

    this.state = {
      hasMore: false,
      isLoading: false,
      dataSource: this.ds.cloneWithRows(this.consultList)
    }
  }

  componentWillUnmount() {
    this.context.clearAction();
  }

  refreshList = (currentPageNo = 1) => {
    goodsDetailApi.goodsConsultList({
      goodsId: this.props.params.goodsId,
      pageNo: currentPageNo
    }).then(result => {
      if (result.result == 1) {
        const data = result.data || [];
        let hasMore = true;
        if (data.length < 10) {
          hasMore = false;
        }
        this.consultList = [...this.consultList, ...data];
        this.setState({
          isLoading: false,
          hasMore,
          dataSource: this.ds.cloneWithRows(this.consultList)
        })
      }
    })
  }

  componentDidMount() {
    // 绑定头部事件
    this.context.initAction({
      title: <Icon type={comment} onClick={() => {
        this.props.router.push('/consultEdit/'+this.props.params.goodsId);
      }} />
    })
    this.refreshList();
  }

  renderItem = (item) => {
    return <div style={{width:'100%'}} className="goods_consultlist">
      <WhiteSpace></WhiteSpace>
      <WingBlank>
        <Flex justify='between' align="top">
          <div>
            <div className="consulutlist_imgl">
                {item.isanonymous ? <span style={{ width: '.36rem' }}>&nbsp;</span>
                    : <Img src={item.memberImg} style={{ width: '.90rem', height: '.9rem',borderRadius:'50%' }} />}
            </div>
            <div className="consulutlist_imgr">
              <span style={{fontSize:'0.28rem',color:'#333'}}>{item.cmemberName}</span>
            </div>
          </div>
          <div>
            <span style={{color:'#999',fontSize:'0.26rem'}}>{item.createTimeStr}</span>
          </div>

        </Flex>
        <div className="goods_consultlist_text">
          <div className="goods_consultlist_question">
            <span style={{float:'left'}}><img src="./assets/img/weiqing/wen@2x.png" style={{width:'0.3rem',height:'0.3rem',paddingRight:'0.2rem'}}/></span>
            <div style={{float:'left',fontSize:'0.26rem',color:'#333'}}>{item.consultContent}</div></div>
          {/*<div className="goods_consultlist_answer">
            <span style={{float:'left'}}><img src="./assets/img/weiqing/da@2x.png" style={{width:'0.3rem',height:'0.3rem',paddingRight:'0.2rem'}}/></span>
              <div style={{float:'left',width:'90%',fontSize:'0.26rem',color:'#333'}}>您好！一会为您解答！</div>
          </div>*/}
        </div>
        {/*<div style={{}}><span><img src="./assets/img/weiqing/wen@2x.png" style={{width:'0.3rem',height:'0.3rem'}}/></span>咨询内容:</div>
        <p style={{width:'80%',display:'inline-block',wordWrap:'break-word'}}>
            {item.consultContent}
            </p>*/}
      </WingBlank>
      <WhiteSpace></WhiteSpace>
    </div>
  }

  onEndReached = () => {
    console.log(this.state.isLoading, this.state.hasMore);
    if (!this.state.hasMore || this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true
    });

    this.refreshList(++pageNo);
  }

  render() {
    const { consultList } = this.state;
    const footer = <div style={{
      textAlign: 'center'
    }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;
    return (
      <div className='wx-ConsultList fix-scroll hastitle'>
        <ListView
          style={{
            height: '100%'
          }}
          pageSize={10}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={200}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}></ListView>
      </div>
    )
  }
}

export default withRouter(ConsultList);
