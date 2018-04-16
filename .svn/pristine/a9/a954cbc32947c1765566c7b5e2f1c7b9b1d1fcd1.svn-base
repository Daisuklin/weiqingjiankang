import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  ListView,
  Button
} from 'antd-mobile';
import { Img } from 'commonComponent';
import AfterSaleOrderItem from '../../components/AfterSaleOrderItem';
import * as orderApi from '../../api/order';
import './afterSale.less';

class AfterSale extends Component {

  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state = {
      pageNo: 1,
      dataSource: this.ds.cloneWithRows([]),
        hasMore: true,
        isLoading: false,
      isInit1: true,
      arr:[]
    }
  }

  refreshList = () => {
    orderApi.orderlist({
      pageNo:this.state.pageNo,
        pageSize:5,
      orderType: 2,
      status: '15,20,30,40'
    }).then(result => {
      this.setState({
        isLoading: false
      });
      if (result.result == 1) {
//         const data = result.data || [];
//         const pageSize = 5;
//         const dataLength = data.length;
//         if (dataLength < pageSize) {
//           this.setState({
// 		        hasMore: false
// 		      });
//         }
//         if (this.state.isInit1) {
//           this.orderList = data;
//           this.setState({
//           	arr:data
//           })
//         } else {
//         	this.orderList =this.state.arr.concat(data)
// //        this.orderList = { ...this.state.arr, ...data };
//         }
//         this.setState({
//           pageNo,
//           dataSource: this.ds.cloneWithRows(this.orderList)
//         })
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

  componentDidMount() {
    this.refreshList();
  }

//   onEndReached = (event) => {
//     if (!this.state.isLoading && !this.state.hasMore) {
//       return;
//     }
// 	  this.setState({
// 	  	isLoading: true,
// 	  	isInit1:false
// 	  });
//     let pageNo = this.state.pageNo + 1;
//     // orderApi.orderlist({
//     //   pageNo,
//     //   orderType: this.state.orderType,
//     //   status: this.state.status
//     // }).then(result => {
//     //   if (result.result == 1) {
//     //     const data = result.data || [];
//     //     const pageSize = 10;
//     //     const dataLength = data.length;
//     //     let hasMore = true;
//     //     if (dataLength < pageSize) {
//     //       hasMore = false;
//     //     }
//     //     this.orderList = [...this.orderList, ...data];
//     //     this.setState({
//     //       hasMore,
//     //       isLoading: false,
//     //       pageNo,
//     //       dataSource: this.ds.cloneWithRows(this.orderList),
//     //     })
//     //   }
//     // })
// //  setTimeout(() => {
// 	if(!this.state.isInit1){
// 		this.refreshList({
//         pageNo,
//         status: this.state.status,
//         orderType: this.state.orderType,
//       });
// 	}
//
// //  }, 1000);
//   }

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



  render() {
    const { dataSource } = this.state
    const footer = <div style={{ padding: 30, textAlign: 'center' }}>
      {this.state.isLoading ? '加载中...' : '加载完毕'}
    </div>;
    return (
      <div className="wx-afterSale">
        <div className=" hastitle hasbottom">
          <ListView
            style={{
                height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1}rem`,
                position: 'relative',
                overflow: 'auto',
            }}
            dataSource={this.state.dataSource}
            renderFooter={()=>footer}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={100}
            renderRow={(dataItem) => {
              console.log(dataItem);
              return (
              <AfterSaleOrderItem
                cancelOrder={() => this.refreshList()}
                dataItem={dataItem}></AfterSaleOrderItem>
            )}}>
          </ListView>
        </div>
        <div style={{background:'#fff',padiingTop:'0.2rem'}} className='progressquery'>
          <Button
                  onClick={() => {
                      this.props.router.push('/progress')
                  }}
                  type='primary' style={{height:'0.7rem',borderRadius:'3px',margin:'0px 0.26rem 0.2rem', lineHeight:'0.65rem',backgroundColor:'#00a9e0',borderColor:'#00a9e0'}}>进度查询</Button>
        </div>

      </div>
    )
  }
}

export default withRouter(AfterSale);
