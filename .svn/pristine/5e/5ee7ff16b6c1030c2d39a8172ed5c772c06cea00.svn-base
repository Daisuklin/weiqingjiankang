import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  SearchBar,
  WhiteSpace,
    NavBar,
  WingBlank,
    List,
  Flex,
  Icon,
  Button,
    ListView
} from 'antd-mobile';
import * as memberApi from '../api/member';
import {Map} from 'immutable';
import { Img } from 'commonComponent';
import './brand.less'

class BrandList extends Component {
  constructor(props) {
    super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.fetchData=[];
    this.state={
        dataSource: this.ds.cloneWithRows([]),
        brandList:[],
        storeId:'',
        init:'false',
        searchStatus: 1,
        searchKey:'',
        pageNo: 1,
        hasMore: true,
        isLoading: false,
        value:''
    }
  }

    componentDidMount() {
        this.refreshList();
    }

    refreshList=(brandName)=>{
        memberApi.brandList({
            pageNo: this.state.pageNo,
            pageSize: 10,
            brandName:this.state.searchKey
        }).then(result => {
            if (result.result == 1) {
                // const brandList=result.data;
                // this.setState({
                //     // ...result.data
                //     brandList:brandList
                // })
                let data = result.data;

                let more;
                if(data.length<10){
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

    /*内容搜索*/
    onChangeSearchKey = (value) => {
        const searchKey = this.state.value;
        this.fetchData=[];
        this.setState({
            searchKey,
            pageNo:1,
            dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
            isLoading: false,
            hasMore:true,
           // search:true,
        });
        console.log(searchKey);
        //this.onEndReached();
        // clearTimeout(this.timeout);
        // console.log(searchKey);
        // this.timeout = setTimeout(() => {
        //     // memberApi.brandList({ brandName: searchKey }).then(result => {
        //     //     console.log(result);
        //     //     if (result.result == 1) {
        //     //         this.setState({
        //     //             brandList: result.data
        //     //         })
        //     //     } else {
        //     //          ;
        //     //         this.setState({
        //     //             brandList: []
        //     //         })
        //     //     }
        //     //
        //     // })
        //     this.refreshList(searchKey);
        // }, 200);


    }
   /* onSubmit=(value)=>{
        console.log(value)
        this.props.router.push(`/search/keywordSearch/${value}`)
    }*/
    onChange= (value) => {
        this.setState({
            value:value
        });
    };

    conponentDidUpdate(pp,ps){
           if(ps.searchKey!=this.state.searchKey){
               this.onEndReached();
           }
    }

    renderItem=(brand)=>{
        return (
            <div className="img_li">
              <div>
                <div>
                    <Img src={brand.brandPic} className="brandPic" onClick={()=>this.brandList(brand)} />
                </div>
                <div className="brandName_box">{brand.brandName}</div>
              </div>
            </div>
        )
    }
    brandList=(brand)=>{
        this.props.router.push(`/search/BrandIdSearch/` + brand.brandId)
    }
    clear = () => {
        this.setState({ val: '' });
    };
  render() {
      const { searchStatus ,searchKey} = this.state;
      if (!this.state.init) {
          return null
      }
    return (
        <div>
            <div >
                <Flex className='wx-navbar' style={{background:'#f5f5f9'}}>
                    <Flex.Item style={{padding: '0rem 0.1rem 0px 0.46rem'}} >
                        <SearchBar
                            placeholder="请输入品牌名称"
                            autoFocus
                            onChange={this.onChange}
                            style={{background:'none',padding:'0px',height:'60px', background: '#fff',borderRadius:'0.3rem',padding: '0px 0.2rem'}}
                        />

                    </Flex.Item>
                    <span style={{padding:'0.2rem 0.26rem',fontSize:'0.28rem',color:'#666',marginRight:'0.26rem'}} onClick={()=>this.onChangeSearchKey(this.state.value)}>搜索</span>

                </Flex>

            </div>
            <div className='brand_box' style={{marginTop:'1rem'}}>

                <ListView
                    style={{
                        height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-1.2}rem`,
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
        </div>
    )
  }
}

export default withRouter(BrandList);
