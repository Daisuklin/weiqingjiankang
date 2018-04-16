import React, { Component } from 'react'
import { withRouter, Link } from 'react-router'
import {
  Toast,
  Flex,
  Button,
  List,
  WingBlank,
  WhiteSpace,
  Grid,
    ListView
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { common } from 'common';
import * as storeApi from '../../api/store';

import './store.less';

const Item = List.Item;

class StoreNewGoods extends Component {
  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
      this.state = {
          dataSource: this.ds.cloneWithRows([]),
          pageNo: 1,
          hasMore: true,
          isLoading: false,
          sortOrder: 'desc',
      }
  }

  componentDidMount() {
    // storeApi.storegoods({
    //     pageNo,
    //     pageSize,
    //   order: 'asc',
    //   orderField: 'new',
    //   goodsType: 1,
    //   storeId: this.props.params.storeId
    // }).then(result => {
    //   if (result.result == 1) {
    //     const data = result.data;
    //     this.setState({
    //       goodsList: data,
    //     })
    //   }
    // });
      this.refreshList();
  }

    refreshList = () => {
        storeApi.storegoods({
            pageNo:this.state.pageNo,
            pageSize:5,
            // order: 'asc',
            order: this.state.sortOrder,
            orderField: 'new',
            goodsType: 1,
            storeId: this.props.params.storeId
        }).then(result => {
            if (result.result == 1) {
                const data=result.data||[];
                let more;
                if(data.length<5){
                    more=false;
                }else{
                    more=true;
                }
                this.fetchData=[ ...this.fetchData, ...data];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
                    isLoading: false,
                    pageNo:this.state.pageNo+1,
                    hasMore:more,
                });
            }
        })
    }
    onEndReached = (event) => {
        //console.log(1);
        // console.log(this.state.isLoading);
        // console.log(this.state.hasMore);
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading) {
            return;
        }else if(this.state.hasMore===false){
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        //  let pageNo=this.state.pageNo+1;
        this.refreshList();


    }

  onClick = (dataItem) => {
    common.gotoGoodsDetail({ specId: dataItem.specId })
  }

  renderItem = (dataItem) => {
    return <Flex direction='column' style={{ width:'50%',marginTop:'0.2rem' }} onClick={()=>this.onClick(dataItem)}>
      <div>
        <Flex.Item style={{textAlign:'center'}}>
          <Img src={dataItem.goodsImage} style={{ width: '3rem',height:'3rem' }} />
        </Flex.Item>
      </div>
      <div style={{width:'3rem'}}>
        <Flex.Item style={{}}>
          <div style={{
              padding:'0.2rem 0rem',
              overflow:'hidden',
              whiteSpace:'nowrap',
              textOverflow:'ellipsis',
              fontSize: '.24rem',
              textAlign:'center'
          }}>{dataItem.goodsName}</div>
        </Flex.Item>
      </div>
      <Flex.Item>
        <span style={{fontSize:'.24rem',color:'#e1536b'}}>{`¥${dataItem.goodsStorePrice}`}</span>
      </Flex.Item>
    </Flex>
  }

  render() {
    const { goodsList } = this.state;
    return <div className='wx-storegoods' >
      <ListView
          style={{
              height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1}rem`,
              position: 'relative',
              overflow: 'auto',
              margin: '0.1rem 0',
          }}
          ref="lv"
          pageSize={4}
          renderFooter={
              () => <div style={{paddingBottom: '0rem'}}>
				<div style={{textAlign:'center'}}>
				{this.state.isLoading ? '加载中...' : ''}
                    {(this.state.hasMore && this.state.isLoading===false) ? '下拉加载更多...' : ''}
                    {this.state.hasMore===false ? '加载完成' : ''}
				</div>
              </div>
          }

          scrollRenderAheadDistance={500}
          scrollEventThrottle={20}
          onScroll={() => { console.log('scroll'); }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={50}
          dataSource={this.state.dataSource}
          renderRow={this.renderItem}>
      </ListView>
    </div>
  }
}

export default withRouter(StoreNewGoods);
