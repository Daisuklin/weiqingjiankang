import React, { Component, PropTypes } from 'react'
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
import * as memberApi from '../api/member';
import { common } from 'common';
import { Img } from 'commonComponent';

const TabPane = Tabs.TabPane;

class GoodsViewRecord extends Component {

  static contextTypes = {
    initAction: PropTypes.func,
    clearAction: PropTypes.func,
  }

  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state = {
        dataSource: this.ds.cloneWithRows([]),
      goodsList: [],
      storeList: [],
      type: "0",
        pageNo: 1,
        hasMore: true,
        isLoading: false
    }
  }

  onClick = (el) => {
    common.gotoGoodsDetail({ specId: el.browseSpecId });
  }

  componentWillMount() {
    this.context.initAction({
      title: '清空',
      action: () => {
        // 清空处理
        Modal.alert('提示', '是否全部清除?', [
          { text: '取消' },
          {
            text: '确定',
            onPress: () => {
              console.log(this.state);
              memberApi.delGoodsBrowseByAll({
                browseState: this.state.type
              }).then(result => {
                Toast.info(result.msg);
                // 刷新页面
                this.onChangeTab(this.state.type);
              });
            }
          }
        ]);
      }
    });
  }

  componentWillUnmount() {
    this.context.clearAction();
  }


  componentDidMount() {
    this.onChangeTab(this.state.type);
      this.refreshList();
  }

    refreshList=()=>{
        // let getdata;
        //   if(this.state.type==1){
        //       getdata=memberApi.memberfavotites;
        //   }else if(this.state.type==2){
        //       getdata=memberApi.memberfavotites;
        //   }
        memberApi.goodsBrowseList({
            browseState: this.state.type,
            pageNo: this.state.pageNo,
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

  cancelAttention = (item) => {
    const alertInstance = Modal.alert('提示', '确定删除此浏览记录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          memberApi.delGoodsBrowse({
            browseId: item.browseId
          }).then(result => {
            Toast.info(result.msg);
            // 刷新页面
            this.onChangeTab(this.state.type);
              setTimeout(()=>{
                  this.refreshList()
              })
          });
        }
      }
    ]);
  }

  onChangeTab = (value) => {
      this.fetchData=[];
      console.log(value);
    this.setState({
      type: value,
        dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
        isLoading: false,
        pageNo:1,
        hasMore:false,
    })

    // memberApi.goodsBrowseList({
    //   browseState: value,
    //   pageno: 1,
    //   pageSize: 10000
    // }).then(result => {
    //   if (result.result == 1) {
    //     if (value == "0") {
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

    renderItem=(item)=>{
        return (<div>
            {this.state.type==0 ?
                <div style={{paddingLeft:'0rem',background:'#fff',borderBottom:'1px solid #e5e5e5'}}
                          >
                  <Flex style={{padding:'0.1rem 0.26rem'}}>
                    <Flex.Item
                        onClick={()=>this.onClick(item)}
                        style={{ flex: 1.3 }}><Img src={item.browseGoodsImage} style={{ width: '2.2rem', height: '2.2rem' }} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div onClick={() => this.onClick(item)} style={{
                          whiteSpace: 'normal',
                          height: '0.8rem',
                          lineHeight: '0.4rem',
                          overflow: 'hidden',fontSize:'0.28rem',color:'#333',marginBottom:'0.4rem'
                      }}>{item.browseGoodsName}</div>
                      <Flex justify="between">
                        <div onClick={()=>this.onClick(item)} style={{color:'red'}}>¥{item.browseGoodsPrice}</div>
                        <div style={{ textAlign: 'right' }}>
                          <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)} style={{background:'#fff',borderColor:'#d7d7d7',padding:'0rem 0.2rem',fontSize:'0.24rem',color:'#666'}}>删除</Button>
                        </div>
                      </Flex>

                    </Flex.Item>
                  </Flex>
                </div>:
                <div style={{paddingLeft:'0rem',background:'#fff',borderBottom:'1px solid #e5e5e5'}}
                         >
                  <Flex style={{padding:'0.1rem 0.26rem'}}>
                    <Flex.Item
                        onClick={() => {
                            this.props.router.push(`/store/${item.storeId}/index`)
                        }}
                        style={{ flex: 1.3 }}><Img src={item.storeLogo} style={{ width: '2.2rem', height: '2.2rem' }} /></Flex.Item>
                    <Flex.Item style={{flex:2}}>
                      <div
                          onClick={() => {
                              this.props.router.push(`/store/${item.storeId}/index`)
                          }}
                          style={{fontSize:'0.28rem',color:'#333',paddingBottom:'0.4rem'}}>{item.storeName}</div>
                      <div style={{ textAlign: 'right' }}>
                        <Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}style={{background:'#fff',borderColor:'#d7d7d7',padding:'0rem 0.2rem',fontSize:'0.24rem',color:'#666'}}>删除</Button>
                      </div>
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
          <TabPane tab="商品浏览记录" key="0">
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)+3}rem`,
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
            {/*<List>*/}
              {/*{*/}
                {/*goodsList && goodsList.map((item, index) => */}
                    {/*<List.Item style={{paddingLeft:'0rem'}}*/}
                  {/*key={index}>*/}
                  {/*<Flex style={{padding:'0.1rem 0.26rem'}}>*/}
                    {/*<Flex.Item*/}
                      {/*onClick={()=>this.onClick(item)}*/}
                      {/*style={{ flex: 1.3 }}><Img src={item.browseGoodsImage} style={{ width: '2.2rem', height: '2.2rem' }} /></Flex.Item>*/}
                    {/*<Flex.Item style={{flex:2}}>*/}
                      {/*<div onClick={() => this.onClick(item)} style={{*/}
                        {/*whiteSpace: 'normal',*/}
                        {/*height: '0.8rem',*/}
                        {/*lineHeight: '0.4rem',*/}
                        {/*overflow: 'hidden',fontSize:'0.28rem',color:'#333',marginBottom:'0.4rem'*/}
                      {/*}}>{item.browseGoodsName}</div>*/}
                      {/*<Flex justify="between">*/}
                        {/*<div onClick={()=>this.onClick(item)} style={{color:'red'}}>¥{item.browseGoodsPrice}</div>*/}
                        {/*<div style={{ textAlign: 'right' }}>*/}
                          {/*<Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)} style={{background:'#fff',borderColor:'#d7d7d7',padding:'0rem 0.2rem',fontSize:'0.24rem',color:'#666'}}>删除</Button>*/}
                        {/*</div>*/}
                      {/*</Flex>*/}

                    {/*</Flex.Item>*/}
                  {/*</Flex> */}
                {/*</List.Item>*/}
                {/*)*/}
              {/*}*/}
            {/*</List>*/}
            
          </TabPane>
          <TabPane tab="店铺浏览记录" key="1">
            {/*<List>*/}
              {/*{*/}
                {/*storeList && storeList.map((item, index) => <List.Item style={{paddingLeft:'0rem'}}*/}
                  {/*key={index}>*/}
                  {/*<Flex style={{padding:'0.1rem 0.26rem'}}>*/}
                    {/*<Flex.Item*/}
                      {/*onClick={() => { */}
                        {/*this.props.router.push(`/store/${item.storeId}/index`)*/}
                      {/*}}*/}
                      {/*style={{ flex: 1.3 }}><Img src={item.storeLogo} style={{ width: '2.2rem', height: '2.2rem' }} /></Flex.Item>*/}
                    {/*<Flex.Item style={{flex:2}}>*/}
                      {/*<div*/}
                        {/*onClick={() => { */}
                          {/*this.props.router.push(`/store/${item.storeId}/index`)*/}
                        {/*}}*/}
                      {/*style={{fontSize:'0.28rem',color:'#333',paddingBottom:'0.4rem'}}>{item.storeName}</div>*/}
                      {/*<div style={{ textAlign: 'right' }}>*/}
                        {/*<Button type='primary' size='small' inline onClick={()=>this.cancelAttention(item)}style={{background:'#fff',borderColor:'#d7d7d7',padding:'0rem 0.2rem',fontSize:'0.24rem',color:'#666'}}>删除</Button>*/}
                      {/*</div>*/}
                    {/*</Flex.Item>*/}
                  {/*</Flex> */}
                {/*</List.Item>)*/}
              {/*}*/}
            {/*</List>*/}
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)+3 }rem`,
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

export default withRouter(GoodsViewRecord);
