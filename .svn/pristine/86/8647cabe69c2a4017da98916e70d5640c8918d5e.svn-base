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
import OrderItem from '../components/OrderItem';
import * as pointsGoodsApi from '../api/pointsGoods';
import './pointsOrderList.less';

const TabPane = Tabs.TabPane;
class OrderList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.orderList = []
    // let status = null;
    // let orderType = 1;
    this.state = {
      selectedIndex: parseInt(props.params.type),
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.orderList),
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
        status = 30;
        break;
      case 3:
        status = 40;
        break;
    }

    console.log('isInit', this.state.isInit);

      pointsGoodsApi.orderList({ pageNo, orderType, status }).then(result => {

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
          this.orderList = data;
        } else {
          this.orderList = [...this.orderList, ...data];
        }
          console.log(data)
        this.setState({
          hasMore,
          pageNo,
          dataSource: this.ds.cloneWithRows(this.orderList),
        })
      }
    })
  }

/*  // 改变tab
  onChange = (index) => {
  	console.log(index)
    this.props.router.replace('/pointsOrderList/' + index);
  }*/

  componentDidUpdate(prevProps, prevState) {
    // 当前url参数
    // const type = parseInt(this.props.params.type);
    // 如果变化参数
/*    if (type != this.state.selectedIndex) {
      this.setState({
        pageNo: 1,
        selectedIndex: type,
        isInit: true
      })

      this.refreshList({
        pageNo: 1,
        selectedIndex: type
      });
    }*/
  }

  componentDidMount() {
    console.log(this.refreshList)
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
    const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;

    return (
      <div style={{
        paddingTop:'2px'
      }}>
      <div className="wx-points-orderlist">
      
        <div className='orderlist-body'>
          <ListView
            style={{
              // height: `${document.documentElement.clientHeight/100-1.6}rem`,
                height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1}rem`,
              overflow: 'scroll',
                // height: `${document.documentElement.clientHeight * 1 / 4}rem`,
            }}
            pageSize={10}
            renderFooter={()=>footer}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={50}
            dataSource={this.state.dataSource}
            renderRow={(orderList) => (
              <OrderItem
                cancelOrder={this.refresh}
                finishorder={this.refresh}
                orderList={orderList}></OrderItem>
            )}></ListView>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(OrderList);
