import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button,
  SegmentedControl
} from 'antd-mobile';
import { Img } from 'commonComponent';
import * as orderApi from '../../api/order';
import ProgressItem from '../../components/ProgressItem';

import './progress.less';

class Progress extends Component {

  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state = {
        dataSource: this.ds.cloneWithRows([]),
        pageNo: 1,
        hasMore: true,
        isLoading: false
    }
  }

  refreshList = () => {
    const type = this.props.params.type ? this.props.params.type : 0;
    let load;
    if (type == 0) {
      load= orderApi.returnList;
    }else if(type ==1){
        load= orderApi.barterList;
    }

      load({
        pageNo: this.state.pageNo,
        pageSize: 5
      }).then(result => {
        if (result.result == 1) {
            let data = result.data||[];
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

    // else {
    //   orderApi.barterList({
    //     pageNo: 1,
    //     pageSize: 15
    //   }).then(result => {
    //     if (result.result == 1 && result.data) {
    //       this.setState({
    //         dataSource: this.ds.cloneWithRows(result.data)
    //       })
    //     }
    //   })
    // }
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


  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.type !== this.props.params.type) {
      //this.refreshList();
    }
  }

  onChange = (index) => {
    this.props.router.replace('/progress/' + index);
      this.fetchData=[];
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
          isLoading: false,
          pageNo:1,
          hasMore:true,
      });

  }

  onFinishBarter = () => {
    this.refreshList();
  }

  render() {
    const { dataSource } = this.state
    let type = this.props.params.type
    type = (type && parseInt(type)) || 0

    const listHeight = `${document.documentElement.clientHeight/100 - 1.7}rem`

    return (
      <div className="wx-progress">
          <SegmentedControl
            style={{ height: '0.8rem',width:'100%'}}  
            // tintColor={'#ff0000'}
            onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex)}
            selectedIndex={type}
            values={['退款退货列表', '换货列表']} className="progressorderlist-header" />


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
            renderRow={(dataItem)=>(
              <ProgressItem
                  onFinishBarter={this.onFinishBarter}
                  type={type}
                  dataItem={dataItem}></ProgressItem>
            ) }>
        </ListView>
      </div>
    )
  }
}

export default withRouter(Progress);
