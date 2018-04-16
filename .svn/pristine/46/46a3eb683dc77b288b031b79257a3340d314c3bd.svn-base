/**
 * 积分商城列表
 * Created by leimingtech-lhm on 2017/5/12.
 */

import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Toast,Flex,ListView} from 'antd-mobile';
import PointsGoodsListBlock from '../components/pointsGoodsListBlock'
import * as goodsApi from '../api/pointsGoods';
import {Img} from 'commonComponent';
import './pointsList.less'

class PointsList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.fetchData=[];
        this.state = {
            pointsGoodsList: [],
            dataSource: this.ds.cloneWithRows([]),
            begin:1,
            end:null,
            pageNo: 1,
            hasMore: true,
            isLoading: false
        }
    }

    componentDidMount() {
        Toast.loading();
        this.refreshList();

    }

    refreshList=()=>{
        goodsApi.pointsGoodsList({
            pageSize:5,
            pageNo:this.state.pageNo,
            begin:this.state.begin,
            end:this.state.end}).then(result => {
            if(result.result==1){
                Toast.hide();
                let data = result.data;
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
        });
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

    goToDetail = (PointsGoodsId) => {
        this.props.router.push(`/pointsGoodsDetail/${PointsGoodsId}`);
    }
    goToRedeemNow = () => {
        this.props.router.push(`/redeemNow/${PointsGoodsId}`);
    }

    renderItem=(PointsGoods)=>{
       return (
           <div className="points-goods-block">
            <div className="imgMax" onClick={()=>this.goToDetail((PointsGoods.id))}>
                <Img src={PointsGoods.pointsGoodsImage} className="img"/>
            </div>
            <div className='points-goods-name text-overflow-hidden' onClick={()=>this.goToDetail((PointsGoods.id))}>{PointsGoods.pointsGoodsName}</div>
            <div className="points-bewrite">兑换价:<span className="goods-price">{PointsGoods.pointsnums}</span> 积分</div>
            <div className="goods-button" onClick={()=>this.goToDetail(PointsGoods.id)}>立即兑换</div>
        </div>)

    }

  render(){
     // const {
    //      pointsGoodsList
  //    } = this.state;

     // return <PointsGoodsListBlock pointsGoodsList={this.state.pointsGoodsList}></PointsGoodsListBlock>
      return (
          <div className="ponitsList">
              <ListView
                  style={{
                      height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1}rem`,
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
                  renderRow={this.renderItem}>
              </ListView>
          </div>
      )
  }
}

export default withRouter(PointsList)