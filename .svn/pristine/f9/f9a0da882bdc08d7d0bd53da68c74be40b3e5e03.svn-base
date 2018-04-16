import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Tabs,
  Flex,
  ListView,
  SegmentedControl,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import BargainOrderItem from '../components/BargainOrderItem';
// import * as orderApi from '../../home/api/order';
import * as bargainApi from '../api/bargainApi';
import './barGainOrderList.less';

const TabPane = Tabs.TabPane;
class memberBargain extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    // let status = null;
    // let orderType = 1;
    this.state = {
      selectedIndex: parseInt(props.params.type),
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.fetchData),
      hasMore: false,
      isLoading: false,
      isInit: true
    }
  }

  refreshList = () => {
    let status = null;
    let orderId = null;
    let orderType = 1;
    switch (this.state.selectedIndex) {
      case 0:
        status = null;
        break;
      case 1:
          orderId = 1;
        break;
        case 2:
            status = 20;
            break;
      case 3:
        status = 30;
        break;
      case 4:
        status = 40;
        break;
    }

    console.log('isInit', this.state.isInit);

      bargainApi.memberBargain({ pageNo:this.state.pageNo,orderState: status,orderType,pageSize:10 ,orderId:orderId}).then(result => {

      if (result.result == 1) {
        const data = result.data || [];
        const pageSize = 10;
        const dataLength = data.length;
        let hasMore = true;
        if (dataLength < pageSize) {
          hasMore = false;
        }
          this.fetchData=[...this.fetchData,...data];
        this.setState({
            isLoading: false,
          hasMore,
          pageNo:this.state.pageNo+1,
          dataSource: this.ds.cloneWithRows(this.fetchData),
        })
      }
    })
  }

  // 改变tab
  onChange = (index) => {
  	console.log(index);
      this.fetchData=[];
  	this.setState({
        selectedIndex:index,
        isLoading: false,
        hasMore:true,
        pageNo:1,
        dataSource: this.ds.cloneWithRows(this.fetchData),
    });
    this.props.router.replace('/barGainOrderList/' + index);
  }

  componentDidUpdate(prevProps, prevState) {
    // 当前url参数
    const type = parseInt(this.props.params.type);
    // 如果变化参数
    if (prevState.selectedIndex!= this.state.selectedIndex) {
      // this.setState({
      //   pageNo: 1,
      //   selectedIndex: type,
      //   isInit: true
      // })
      this.refreshList();
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  // refresh = () => {
  //   this.refreshList({
  //     pageNo: 1,
  //     selectedIndex: this.state.selectedIndex
  //   });
  // }

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
        // this.refreshList();

    }

  render() {
    const { selectedIndex, dataSource } = this.state
    const footer = <div style={{ padding: 30, textAlign: 'center',marginBottom:'7.4rem' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;

    return (
      <div style={{
        paddingTop:'2px'
      }}>
        <div style={{padding:'0px 0.26rem',background:'#fff'}}>
          <SegmentedControl
              className='bargainorderlist-header'
              // tintColor={'#00a9df'}
              onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
              selectedIndex={selectedIndex}
              values={['全部', '砍价中','待发货', '待收货', '已完成']} style={{
              height:'0.8rem'
          }}/>
        </div>
        {/*<WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>*/}


      <div className="wx-orderlist">
      
        <div className='orderlist-body'>
          {/*<ListView*/}
            {/*style={{*/}
              {/*height: `${document.documentElement.clientHeight/100-1.6}rem`,*/}
              {/*overflow: 'scroll',*/}
            {/*}}*/}
            {/*pageSize={10}*/}
            {/*renderFooter={()=>footer}*/}
            {/*onEndReached={this.onEndReached}*/}
            {/*onEndReachedThreshold={50}*/}
            {/*dataSource={this.state.dataSource}*/}
            {/*renderRow={(memberBargain) => (*/}
              {/*<BargainOrderItem*/}
                {/*cancelOrder={this.refresh}*/}
                {/*finishorder={this.refresh}*/}
                {/*memberBargain={memberBargain}></BargainOrderItem>*/}
            {/*)}> </ListView>*/}
          <ListView
              style={{
                  height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2.2}rem`,
                  position: 'relative',
                  overflow: 'auto',
                 // margin: '0.1rem 0',
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
              renderRow={(memberBargain) => (
                  <BargainOrderItem
                      cancelOrder={this.refresh}
                      finishorder={this.refresh}
                      memberBargain={memberBargain}></BargainOrderItem>
              )}
          >
          </ListView>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(memberBargain);
