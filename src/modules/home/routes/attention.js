import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  Modal,
  WingBlank,
  Toast,
  Tabs,
  List,
  Flex,
  Button,
    ListView
} from 'antd-mobile';
import { common } from 'common';
import * as memberApi from '../api/member';
import * as storeApi from '../api/store';

import { Img } from 'commonComponent';
import RecommendGoods from 'commonComponent/RecommendGoods';

import './attention.less';

const TabPane = Tabs.TabPane;

class Attention extends Component {
  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      goodsList: [],
      storeList: [],
      recommendGoodsList: [],
      type: props.params.type,
        pageNo: 1,
        hasMore: true,
        isLoading: false
     }
  }

  componentDidMount() {
    this.onChangeTab(this.state.type);
      this.refreshList();
  }

  cancelAttention = (item) => {
    const alertInstance = Modal.alert('提示', '是否取消关注', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          let params = {
            favType: this.state.type,
          }
          // 商品
          if (this.state.type == 1) {
            params.goodsId = item.goods.goodsId;
          } else {
            params.storeId = item.store.storeId;
          }
          storeApi.storecollection(params).then(result => {
            // Toast.info(result.msg);
              Toast.info('取消关注成功！',1);
            // 刷新页面
              console.log(this.state.type)
            this.onChangeTab(this.state.type);
              setTimeout(()=>{
                  this.refreshList()
              })
              // this.refreshList();
          });
        }
      }
    ]);
  }
    refreshList=()=>{
    // let getdata;
    //   if(this.state.type==1){
    //       getdata=memberApi.memberfavotites;
    //   }else if(this.state.type==2){
    //       getdata=memberApi.memberfavotites;
    //   }
        memberApi.memberfavotites({
            type: this.state.type,
            pageno: this.state.pageNo,
            pageSize: 5
        }).then(result => {
            if (result.result == 1) {
                let data = result.data;
                let more;
                if(data.length<5){
                    more=false;
                }else{
                    more=true;
                }

                // console.log(data)
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

  onChangeTab = (value) => {
      // debugger
    console.log(value);
      this.fetchData=[];
    this.setState({
      type: value,
          dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
          isLoading: false,
          pageNo:1,
          hasMore:false,

    })

    // memberApi.memberfavotites({
    //   type: value,
    //   pageno: 1,
    //   pageSize: 50
    // }).then(result => {
    //   if (result.result == 1) {
    //     if (value == 1) {
    //       this.setState({
    //         goodsList: result.data
    //       })
    //     } else {
    //       this.setState({
    //         storeList: result.data
    //       })
    //     }
    //   }
    // })
    if (value == 1) {
      memberApi.centRecommendList().then(result => {
        this.setState({
          recommendGoodsList: result.data
        })
      })
    }
  }

    componentDidUpdate(prevProps,prevState){
        // this.refreshList({});

        //sortField: sortField,
        // sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc',
        if(this.state.type!=prevState.type ){
            this.refreshList()
        }

        console.log(this.state);
    }

  onClick = (el) => {
    common.gotoGoodsDetail({ specId: el.goods.specId });
  }

  gotoStore = (item) => {
    if (item.store.storeId == 0) {
      return;
    }
    this.props.router.push(`/store/${item.store.storeId}/index`)
  }

    renderItem=(item)=>{
      return (<div style={{borderBottom:'1px solid #e5e5e5'}}>
          {this.state.type==1 ?
              <div  style={{padding:'0.1rem 0.26rem',background:'#fff'}}>
            <Flex>
              <Flex.Item
                  onClick={()=>this.onClick(item)}
                  style={{ flex: 1.3 }}><Img src={item.goods.goodsImage} style={{ width: '1.62rem', height: '1.62rem' }} /></Flex.Item>
              <Flex.Item style={{flex:3}}>
                <div
                    onClick={()=>this.onClick(item)}
                    className='text-overflow-hidden'>{item.goods.goodsName}</div>
                <WhiteSpace size="lg" />
                <Flex justify="between">
                  <div style={{color:'#e60115',fontSize:'0.28rem'}}>￥{item.goods.goodsPrice}</div>
                  <div style={{ textAlign: 'right'}}>
                    <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)} style={{background:'#00a9e0',borderColor:'#00a9e0',padding:'0rem 0.2rem'}}>取消关注</Button>
                  </div>
                </Flex>
              </Flex.Item>
            </Flex>
          </div>:
              <div  style={{padding:'0.1rem 0.26rem',background:'#fff'}}>
                <Flex>
                  <Flex.Item
                      onClick={() => {
                          this.gotoStore(item)
                      }}
                      style={{ flex: 1 }}><Img src={item.store.storeLogo} style={{ width: '1.62rem', height: '1.62rem' }} /></Flex.Item>
                  <Flex.Item style={{flex:2}}>
                    <div
                        onClick={() => {
                            this.gotoStore(item)
                        }}
                        className='text-overflow-hidden' style={{paddingBottom:'0.4rem'}}>{item.store.storeName}</div>
                    <Flex justify="between">
                      <div style={{color:'#999',fontSize:'0.26rem'}}> {item.store.storeCollect}人关注</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)} style={{background:'#fff',borderColor:'#d7d7d7',padding:'0rem 0.2rem',fontSize:'0.24rem',color:'#666'}}>取消关注</Button>
                      </div>
                    </Flex>
                  </Flex.Item>
                </Flex>
              </div>
          }
      </div>)
    }

  render() {
    const {
      goodsList,
      storeList,
      recommendGoodsList,
      type
    } = this.state;
    return (
      <div className='wx-attention fix-scroll'>
        <Tabs swipeable={false} defaultActiveKey={type} onChange={this.onChangeTab} style={{marginTop:'0.9rem'}}>
          <TabPane tab="关注的商品" key="1">
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2}rem`,
                    position: 'relative',
                    overflow: 'auto',
                  //  margin: '0.1rem 0',
                }}
                ref="lv"
                pageSize={4}
                renderFooter={
                    () => <div style={{paddingBottom: '1rem'}}>
				<span>
				{this.state.isLoading ? '加载中...' : ''}
                    {(this.state.hasMore && this.state.isLoading===false) ? '下拉加载更多...' : ''}
                    {this.state.hasMore===false ? '加载完成' : ''}
				</span>
                    </div>
                }
                className="attention_list1"

                scrollRenderAheadDistance={500}
                scrollEventThrottle={20}
                onScroll={() => { console.log('scroll'); }}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={50}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}>
            </ListView>
          </TabPane>
          <TabPane tab="关注的店铺" key="2">
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2}rem`,
                    position: 'relative',
                    overflow: 'auto',
                    //  margin: '0.1rem 0',
                }}
                ref="lv"
                pageSize={4}
                renderFooter={
                    () => <div style={{paddingBottom: '1rem'}}>
				<span>
				{this.state.isLoading ? '加载中...' : ''}
                    {(this.state.hasMore && this.state.isLoading===false) ? '下拉加载更多...' : ''}
                    {this.state.hasMore===false ? '加载完成' : ''}
				</span>
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
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Attention);
