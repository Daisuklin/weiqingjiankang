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
import GeneDetectionOrderItem from '../../components/GeneDetectionOrderItem';
import * as geneDetectApi from '../../api/gene';
import './geneDetectioinOrderList.less';

const TabPane = Tabs.TabPane;
class GeneDetectOrderList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.genePersonalCenter = []
    // let status = null;
    // let orderType = 1;
    this.state = {
      selectedIndex: parseInt(props.params.type),
      pageNo: 1,
      dataSource: this.ds.cloneWithRows(this.genePersonalCenter),
      hasMore: false,
      isLoading: false,
      isInit: true,
        status:''
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
        status = 20;
        break;
      case 2:
        status = 30;
        break;
      case 3:
        status = 40;
        break;
    }

    console.log('isInit', this.state.isInit);

      geneDetectApi.genePersonalCenter({ pageNo, orderState:status,pageSize:10 }).then(result => {
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
          this.genePersonalCenter = data;
        } else {
          this.genePersonalCenter = [...this.genePersonalCenter, ...data];
        }
        this.setState({
          hasMore,
          pageNo,
          dataSource: this.ds.cloneWithRows(this.genePersonalCenter),
        })
      }
    })
  }

  // 改变tab
  onChange = (index) => {
  	console.log(index)
      if(index!=4) {
          this.props.router.replace('/geneDetectioinOrderList/' + index);
      }else if(index==4){
          this.props.router.push('/geneQuery');
      }
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
        <div style={{padding:'0px 0.26rem',background:'#fff'}}>
          <SegmentedControl
              className='genedetecorderlist-header'
              // tintColor={'#00a9df'}
              onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
              selectedIndex={selectedIndex}
              values={['全部', '待发货', '待收货', '已完成','查询']} style={{
              height:'0.8rem'
          }}/>
        </div>
      <div className="wx-geneDetectionOrderlist">

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
            renderRow={(genePersonalCenter) => (
              <GeneDetectionOrderItem
                cancelOrder={this.refresh}
                finishorder={this.refresh}
                genePersonalCenter={genePersonalCenter}></GeneDetectionOrderItem>
            )}> </ListView>
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(GeneDetectOrderList);
