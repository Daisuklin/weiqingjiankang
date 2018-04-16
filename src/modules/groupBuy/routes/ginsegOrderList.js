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
import GinsegOrderItem from '../components/GinsegOrderItem';
import * as groupBuy from '../api/groupBuy';
import './ginsegOrderList.less';

const TabPane = Tabs.TabPane;
class GinseOrderList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.myGroupList = []
    // let status = null;
    // let orderType = 1;
    this.state = {
      selectedIndex: parseInt(props.params.type),
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.myGroupList),
      hasMore: false,
      isLoading: false,
      isInit: true
    }
  }

  refreshList = ({ pageNo, selectedIndex }) => {
    let status = null;
    let orderType = 1;
    switch (selectedIndex) {
      case 0:
        status = null;
        break;
      case 1:
        status = 10;
        break;
      case 2:
        status = 15;
        break;
        case 3:
            status = 20;
            break;
      case 4:
        status = 30;
        break;
      case 5:
            status = 40;
            break;
    }

    console.log('isInit', this.state.isInit);
      groupBuy.myGroupList({ pageNo, orderState:status, pageSize:10 }).then(result => {
      this.setState({
        isLoading: false
      });
      if (result.result == 1) {
        const data = result.data || [];
        const pageSize = 10;
        const dataLength = data.length;
        let hasMore = true;
        if (dataLength < pageSize) {
          hasMore = false;
        }
        if (this.state.isInit) {
          this.myGroupList = data;
        } else {
          this.myGroupList = [...this.myGroupList, ...data];
        }
        this.setState({
          hasMore,
          pageNo,
          dataSource: this.ds.cloneWithRows(this.myGroupList),
        })
      }
    })
  }

  // 改变tab
  onChange = (index) => {
  	console.log(index)
    this.props.router.replace('/ginsegOrderList/' + index);
  }

  componentDidUpdate(prevProps, prevState) {
    // 当前url参数
    const type = parseInt(this.props.params.type);
    // 如果变化参数
    if (type != this.state.selectedIndex) {
      this.setState({
        pageNo: 1,
        selectedIndex: type,
        isInit: true
      })

      this.refreshList({
        pageNo: 1,
        selectedIndex: type
      });
    }
  }

  componentDidMount() {
    this.refreshList({
      pageNo: 1,
      selectedIndex: this.state.selectedIndex
    });
  }

  refresh = () => {
    this.refreshList({
      pageNo: 1,
      selectedIndex: this.state.selectedIndex
    });
  }

  onEndReached = (event) => {
  	console.log(1)
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({
      isLoading: true,
      isInit: false
    });
    let pageNo = this.state.pageNo + 1;
    this.refreshList({
      pageNo,
      selectedIndex: this.state.selectedIndex,
    });
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
        <div style={{padding:'0px 0.1rem',background:'#fff'}}>
          <SegmentedControl
              className='ginsegorderlist-header'
              // tintColor={'#00a9df'}
              onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
              selectedIndex={selectedIndex}
              values={['全部', '待付款','待成团','待发货', '待收货', '已完成']} style={{
              height:'0.8rem'
          }}/>
        </div>
        {/*<WhiteSpace style={{ backgroundColor: '#f3f3f3' }}></WhiteSpace>*/}


      <div className="wx-ginsegorderlist">
      
        <div className='orderlist-body'>
          <ListView
            style={{
              height: `${document.documentElement.clientHeight/100-1.6}rem`,
              overflow: 'scroll',
            }}
            pageSize={10}
            renderFooter={()=>footer}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={50}
            dataSource={this.state.dataSource}
            renderRow={(myGroupList) => (
              <GinsegOrderItem
                cancelOrder={this.refresh}
                finishorder={this.refresh}
                myGroupList={myGroupList}></GinsegOrderItem>
            )}> </ListView>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(GinseOrderList);