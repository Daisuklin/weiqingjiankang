/**
 * 我的评价列表
 * Created by leimingtech-lhm on 2017/5/12.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  WhiteSpace,
  WingBlank,
  Flex,
    Button,
    ListView
} from 'antd-mobile';
import {Map} from 'immutable';
import {Img} from 'commonComponent';
import * as memberApi from '../api/member';
import './myEvaluate.less'
// import Button from "antd-mobile/lib/button/index.d";

class Myevaluate extends Component {
  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state = {
        dataSource: this.ds.cloneWithRows([]),
        myEvaluate:Map(),
        evaluate:Map(),
        showALl:true,
        init:'false',
        pageNo: 1,
        hasMore: true,
        isLoading: false
    }
  }

    componentDidMount() {
        this.refreshList();

    // memberApi.evaluateGoods({
    //   pageNo: 1,
    //   pageSize: 50
    // }).then(result => {
    //   if (result.result == 1) {
    //     const myEvaluate=result.data;
    //     this.setState({
    //       // ...result.data
    //         myEvaluate:myEvaluate,
    //         evaluate:myEvaluate
    //     })
    //   }
    // })
  }

    refreshList=()=>{
        // let getdata;
        //   if(this.state.type==1){
        //       getdata=memberApi.memberfavotites;
        //   }else if(this.state.type==2){
        //       getdata=memberApi.memberfavotites;
        //   }
        memberApi.evaluateGoods({
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

  gotoEvaluateDetail=(EvaluateDetail)=>{
      this.props.router.push({
          pathname: '/myEvaluateDetail',
          state: {
              myEvaluate:EvaluateDetail
          }
      })

  }

    renderItem=(Evaluate)=>{
      return (
          <Flex className="myEavaluate_list" >
              <Flex.Item style={{flex:1.3}} onClick={()=>console.log(myEvaluate)}>
                  <Img src={Evaluate.goodsImage} style={{width:'160px',height:'160px'}}/>
              </Flex.Item>
              <Flex.Item style={{flex:3}}>
                  <div className="evaluate_name">{Evaluate.gevalGoodsName}</div>
                  <div className="evaluate_product">{Evaluate.gevalContent}</div>
                  <Flex justify="end">
                      <Button size="small" type="primary" onClick={()=>this.gotoEvaluateDetail(Evaluate)} style={{width:'1.5rem',height:'0.5rem',lineHeight:'0.5rem', backgroundColor:'#5491d2',borderColor:'#5491d2',fontSize:'0.28rem',padding:'0px 0.1rem'}}>查看评价</Button>
                  </Flex>
              </Flex.Item>
          </Flex>
      )
    }

  render() {

 const  {evaluate} =this.state;

      if (!this.state.init) {
          return null
      }
console.log(evaluate);

    return (
      <div className="myEvaluate-scroll">

          <ListView
              style={{
                  height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1}rem`,
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
        {/*<div>*/}
            {/*{*/}
                {/*evaluate && evaluate.map((Evaluate, index) => {*/}
                    {/*return <Flex className="myEavaluate_list" key={index}>*/}
                      {/*<Flex.Item style={{flex:1.3}} onClick={()=>console.log(myEvaluate)}>*/}
                        {/*<Img src={Evaluate.goodsImage} style={{width:'160px',height:'160px'}}/>*/}
                      {/*</Flex.Item>*/}
                      {/*<Flex.Item style={{flex:3}}>*/}
                        {/*<div className="evaluate_name">{Evaluate.gevalGoodsName}</div>*/}
                        {/*<div className="evaluate_product">{Evaluate.gevalContent}</div>*/}
                        {/*<Flex justify="end">*/}
                          {/*<Button size="small" type="primary" onClick={()=>this.gotoEvaluateDetail(index)} style={{width:'150px',height:'50px',lineHeight:'0.5rem', backgroundColor:'#5491d2',borderColor:'#5491d2',fontSize:'0.28rem',padding:'0px 0.1rem'}}>查看评价</Button>*/}
                        {/*</Flex>*/}
                      {/*</Flex.Item>*/}
                    {/*</Flex>*/}

                {/*})*/}
            {/*}*/}
        {/*</div>*/}

      </div>
    )
  }
}

export default withRouter(Myevaluate);
