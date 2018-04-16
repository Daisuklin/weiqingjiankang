// import React, { Component, PropTypes } from 'react'
// import { withRouter } from 'react-router'
// import {
//   Modal,
//   WhiteSpace,
//   WingBlank,
//   Toast,
//   Flex,
//   Icon,
//   ListView,
//   Button,
//   InputItem
// } from 'antd-mobile';
// import GoodsSearchComp from '../components/GoodsSearch';
// import classnames from 'classnames';
// import { common } from 'common';
// import { Img } from 'commonComponent';
// import GoodsSearchSpecFilter from '../components/GoodsSearchSpecFilter';
// import Immutable from 'immutable';
//
// import * as goodsApi from '../api/goods';
//
// import './hotGoodsSearch.less';
//
// class GoodsSearch extends Component {
//
//   static contextTypes = {
//     initAction: PropTypes.func,
//     clearAction: PropTypes.func,
//   }
//
//   constructor(props) {
//     super(props);
//     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//       this.fetchData=[];
//     this.state = {
//       dataSource: this.ds.cloneWithRows([]),
//       sortField: '',
//       sortOrder: 'asc',
//       open: false,
//       specList: [],
//       maximumPrice: '',
//       minimumPrice: '',
//       layoutType: 1,
//         pageNo: 1,
//         hasMore: true,
//         isLoading: false
//     }
//   }
//   componentWillUnmount() {
//     this.context.clearAction();
//   }
//
//   refreshList = (sortField) => {
//     const specValueIds = [];
//     const mapedList = this.state.specList.forEach(specItem => {
//       specItem.specValueList.forEach(specValue => {
//         if (specValue.checked) {
//           specValueIds.push(specValue.spValueId);
//         }
//       })
//     });
//     console.log(specValueIds);
//     goodsApi.goodslist({
//       sortField: sortField,
//       sortOrder: this.state.sortOrder,
//       keyword: this.props.params.keyword,
//         pageSize: 5,
//         pageNo: this.state.pageNo,
//       // 'keywordSearch'
//       searchType: this.props.params.searchType,
//       maximumPrice: this.state.maximumPrice,
//       minimumPrice: this.state.minimumPrice,
//       specFilter: specValueIds.join(',')
//     }).then(result => {
//       if (result.result == 1) {
//         // this.setState({
//         //   dataSource: this.ds.cloneWithRows(result.data)
//         // })
//           let data = result.data;
//
//           let more;
//           if(data.length<5){
//               more=false;
//           }else{
//               more=true;
//           }
//
//           // console.log(data)
//           this.fetchData=[ ...this.fetchData, ...data];
//           this.setState({
//               dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
//               isLoading: false,
//               pageNo:this.state.pageNo+1,
//               hasMore:more,
//           });
//       }
//     })
//   }
//
//     onEndReached = (event) => {
//         //console.log(1);
//         // console.log(this.state.isLoading);
//         // console.log(this.state.hasMore);
//         // load new data
//         // hasMore: from backend data, indicates whether it is the last page, here is false
//         if (this.state.isLoading) {
//             return;
//         }else if(this.state.hasMore===false){
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         //  let pageNo=this.state.pageNo+1;
//         this.refreshList({sortField:this.state.sortField});
//
//
//     }
//
//   componentWillMount() {
//
//       /* this.context.initAction({
//          title: '切换',
//          action: () => {
//            this.setState({
//              layoutType: this.state.layoutType == 1 ? 2 : 1
//            })
//            this.refreshList();
//          }
//        });*/
//     // 查询列表
//     this.refreshList();
//
//     // 初始化过滤条件
//     goodsApi.goodsfiltermore({
//       keyword: this.props.params.keyword,
//       searchType: this.props.params.searchType,
//     }).then(result => {
//       if (result.result == 1) {
//         const data = result.data;
//         if (data && data.length > 0) {
//           const specList = data[0].specList;
//           this.setState({
//             specList
//           });
//         }
//       }
//     })
//   }
//
//   resetSpec = () => {
//     const specList = this.state.specList;
//     const mapedList = specList.map(specItem => {
//       const specValueList = specItem.specValueList.map(specValue => {
//         specValue.checked = false;
//         return specValue;
//       })
//       specItem.specValueList = specValueList;
//       return specItem;
//     });
//     this.setState({
//       specList: mapedList
//     })
//   }
//
//   // 修改价格过滤
//   changePrice = (priceFilter) => {
//     this.setState({
//       ...priceFilter
//     })
//   }
//
//   filterBySpec = () => {
//     this.setState({
//       open: false
//     })
//     this.refreshList();
//   }
//
//   onClickSpValue = (spec, spValue) => {
//     const specList = this.state.specList;
//     let mapedList = null;
//     // 当前选择的规格值是选中状态
//     if (spValue.checked) {
//       mapedList = specList.map(specItem => {
//         if (specItem.spId == spec.spId) {
//           console.log(specItem);
//           const specValueList = specItem.specValueList.map(specValue => {
//             if (specValue.spValueId == spValue.spValueId) {
//               specValue.checked = false;
//             }
//             return specValue;
//           })
//           specItem.specValueList = specValueList;
//         }
//         return specItem;
//       });
//       console.log(mapedList);
//     } else {
//       mapedList = specList.map(specItem => {
//         if (specItem.spId == spec.spId) {
//           const specValueList = specItem.specValueList.map(specValue => {
//             if (specValue.spValueId == spValue.spValueId) {
//               specValue.checked = true;
//             } else {
//               specValue.checked = false;
//             }
//             return specValue;
//           })
//           specItem.specValueList = specValueList;
//         }
//         return specItem;
//       });
//     }
//     this.setState({
//       specList: mapedList
//     })
//   }
//
//   renderItem = (dataItem) => {
//   	const IconClass = ({ url }) => {
// 		  return <div style={{
// 		    width: '0.5rem',
// 		    height: '0.50rem',
// 		    background: `url(${url}) center center /  0.64rem 0.64rem`,
// 		    display:'inline-block'
// 		  }}
// 		  />
// 		}
//     return <Flex style={{borderBottom:'1px solid #e5e5e5',padding:'0.2rem 0.26rem',background:'#fff'}} onClick={() => common.gotoGoodsDetail({specId:dataItem.specId})}>
//       <Flex.Item style={{flex:1,position:'relative',height:'2.2rem'}}>
//         <Img src={dataItem.goodsImage==undefined||dataItem.goodsImage==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:dataItem.goodsImage} style={{width:'2.2rem',height:'2.2rem'}}/>
//           {
//               dataItem.goodsSerial == 0 &&<span style={{fontSize:'0.22rem',color:'#fff',width:'1rem',heigth:'1rem',lineHeight:'1rem',textAlign:'center',position:'absolute',top:'0.6rem',left:'0.6rem',background:'url(./assets/img/weiqing/bj.png)',borderRadius:'50%'}}>无货</span>
//           }
//           {
//               dataItem.goodsSerial>0 ?<span style={{fontSize:'0.22rem',color:'#fff',width:'2.2rem',textAlign:'center',position:'absolute',bottom:'0px',left:'0px',background:'url(./assets/img/weiqing/bj.png)',heigth:'0.4rem',lineHeight:'0.4rem'}}>还剩 {dataItem.goodsSerial} 件</span> : ''
//           }
//         {/*<span style={{fontSize:'0.22re',color:'#fff',width:'2.2rem',textAlign:'center',position:'absolute',bottom:'0px',left:'0px',background:'url(./assets/img/weiqing/bj.png)',heigth:'0.4rem',lineHeight:'0.4rem'}}>还剩5件</span>*/}
//         {/*<span style={{fontSize:'0.22re',color:'#fff',width:'1rem',heigth:'1rem',lineHeight:'1rem',textAlign:'center',position:'absolute',top:'0.6rem',left:'0.6rem',background:'url(./assets/img/weiqing/bj.png)',borderRadius:'50%'}}>无货</span>*/}
//       </Flex.Item>
//       <Flex.Item style={{flex:2}}>
//         <div style={{width:'100%',height:'100%'}}>
//           <div style={{paddingRight:'20px',fontSize:'0.28rem',color:'#333',height:'0.8rem',overflow:'hidden',lineHeight:'0.4rem'}}>
//             {dataItem.goodsName}
//           </div>
//           <WhiteSpace></WhiteSpace>
//           <div style={{color:'#e60211',fontSize:'0.3rem'}}>
//             {`¥${dataItem.goodsPrice}`}
//           </div>
//           <Flex>
//             {/*<Flex.Item style={{color:'red'}}>{dataItem.storeName}</Flex.Item>*/}
//             {/*<Flex.Item style={{flex:0}}></Flex.Item>*/}
//             <Flex.Item className="rsale" style={{fongSize:'0.26rem',color:'#999',paddingTop:'0.35rem'}}>
//                 {dataItem.commentnum}条评论&nbsp;&nbsp;&nbsp;&nbsp;好评{dataItem.salenum}%
//             </Flex.Item>
//           </Flex>
//         </div>
//       </Flex.Item>
//     </Flex>
//   }
// 	/*renderItem1 = (dataItem) => {
//     return <Flex style={{fontSize: '.24rem',
//     	width:'50%',
//     	float:'left',
//       color: 'gray',
// 			textAlign: 'center',paddingBottom:'20px',margin:'0.2rem 0'}} direction='column' onClick={() => onClick(dataItem)}
// 			>
//     <Flex.Item>
//       <Img src={dataItem.goodsImage} style={{width:'3rem',height:'3rem' }} />
//     </Flex.Item>
//     <Flex.Item style={{width:'97%',margin:'0'}}>
//       <div style={{fontSize: '.24rem',
//       color: 'gray',
//       paddingLeft:'20px',
//       paddingRight:'20px'}} className='text-overflow-hidden'>{dataItem.goodsName}</div>
//     </Flex.Item>
//     <Flex.Item>
//       <div style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</div>
//     </Flex.Item>
//   </Flex>
//   }*/
//   changeOrder = (sortField) => {
//     this.setState({
//       sortField: sortField,
//       sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc'
//     })
//     this.refreshList(sortField);
//   }
//
//   onClickFilter = () => {
//     this.setState({ open: !this.state.open });
//   }
//
//   render() {
//     const { data, sortField, sortOrder, specList } = this.state;
//     const allUpClass = classnames('wx-goods-search-order-up', {
//       'selected': sortField == '' && sortOrder == 'desc'
//     })
//     const allDownClass = classnames('wx-goods-search-order-down', {
//       'selected': sortField == '' && sortOrder == 'asc'
//     })
//
//     const salenumUpClass = classnames('wx-goods-search-order-up', {
//       'selected': sortField == 'salenum' && sortOrder == 'desc'
//     })
//     const salenumDownClass = classnames('wx-goods-search-order-down', {
//       'selected': sortField == 'salenum' && sortOrder == 'asc'
//     })
//
//     const goodsStorePriceUpClass = classnames('wx-goods-search-order-up', {
//       'selected': sortField == 'goodsStorePrice' && sortOrder == 'desc'
//     })
//     const goodsStorePriceDownClass = classnames('wx-goods-search-order-down', {
//       'selected': sortField == 'goodsStorePrice' && sortOrder == 'asc'
//     })
//
//     return <div className='wx-goods-hotSearch-page'>
//       {
//         this.state.open ? <GoodsSearchSpecFilter
//           changePrice={this.changePrice}
//           onClickSpValue={this.onClickSpValue}
//           resetSpec={this.resetSpec}
//           filterBySpec={this.filterBySpec}
//           maximumPrice={this.state.maximumPrice}
//           minimumPrice={this.state.minimumPrice}
//           specList={specList} /> : null
//       }
//       {
//         this.state.open ? <div onClick={() => this.setState({
//           open:false
//         })} className="am-modal-mask"></div> : null
//       }
//         <Flex className='wx-goods-search-header'>
//           <Flex.Item onClick={()=>this.changeOrder('')}>
//             {
//               sortField == '' ? <span style={{color:'#1586ca'}}>综合</span>:'综合'
//             }
//             <div className='wx-goods-search-order'>
//               <Icon className={allUpClass} type="up" />
//               <Icon className={allDownClass} type="down" />
//             </div>
//           </Flex.Item>
//           <Flex.Item onClick={()=>this.changeOrder('salenum')}>
//             {
//               sortField == 'salenum' ? <span style={{color:'#1586ca'}}>销量</span>:'销量'
//             }
//             <div className="wx-goods-search-order">
//               <Icon className={salenumUpClass} type="up" />
//               <Icon className={salenumDownClass} type="down" />
//             </div>
//           </Flex.Item>
//           <Flex.Item onClick={()=>this.changeOrder('goodsStorePrice')}>
//             {
//               sortField == 'goodsStorePrice' ? <span style={{color:'#1586ca'}}>价格</span>:'价格'
//             }
//             <div className="wx-goods-search-order">
//               <Icon className={goodsStorePriceUpClass} type="up"/>
//               <Icon className={goodsStorePriceDownClass} type="down" />
//             </div>
//           </Flex.Item>
//           <Flex.Item onClick={()=>this.onClickFilter()}>
//             筛选<img style={{width:'.2rem',height:'.2rem'}} src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/list_saixuan.png`} />
//           </Flex.Item>
//         </Flex>
//         <div className='' style={{paddingTop:'1rem'}}>
//           {/*<ListView*/}
//             {/*style={{*/}
//               {/*height:'100%'*/}
//             {/*}}  */}
//             {/*dataSource={this.state.dataSource}*/}
//             {/*renderRow={this.renderItem}*/}
//             {/*delayTime={10}>*/}
//             {/*</ListView>*/}
//           <ListView
//               style={{
//                   height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2}rem`,
//                   position: 'relative',
//                   overflow: 'auto',
//                   //margin: '0.1rem 0',
//               }}
//               ref="lv"
//               pageSize={4}
//               renderFooter={
//                   () => <div style={{paddingBottom: '1rem'}}>
// 				<span>
// 				{this.state.isLoading ? '加载中...' : ''}
//                     {(this.state.hasMore && this.state.isLoading===false) ? '下拉加载更多...' : ''}
//                     {this.state.hasMore===false ? '加载完成' : ''}
// 				</span>
//                   </div>
//               }
//
//               scrollRenderAheadDistance={500}
//               scrollEventThrottle={20}
//               onScroll={() => { console.log('scroll'); }}
//               onEndReached={this.onEndReached}
//               onEndReachedThreshold={50}
//               dataSource={this.state.dataSource}
//               renderRow={this.renderItem}>
//           </ListView>
//
//         </div>
//     </div>
//   }
// }
//
// export default withRouter(GoodsSearch);
import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Icon,
    ListView,
    Button,
    InputItem
} from 'antd-mobile';
import GoodsSearchComp from '../components/GoodsSearch';
import classnames from 'classnames';
import { common } from 'common';
import { Img } from 'commonComponent';
import GoodsSearchSpecFilter from '../components/GoodsSearchSpecFilter';
import Immutable from 'immutable';

import * as goodsApi from '../api/goods';

import './goodsSearch.less';

class GoodsSearch extends Component {

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
            sortField:'salenum',
            sortOrder: 'asc',
            open: false,
            specList: [],
            maximumPrice: '',
            minimumPrice: '',
            layoutType: 1,
            pageNo:1,
            hasMore: true,
            isLoading: false
        }
    }
    componentWillUnmount() {
        this.context.clearAction();
    }

    refreshList = () => {
        const specValueIds = [];
        const mapedList = this.state.specList.forEach(specItem => {
            specItem.specValueList.forEach(specValue => {
                if (specValue.checked) {
                    specValueIds.push(specValue.spValueId);
                }
            })
        });
        console.log(specValueIds);
        goodsApi.goodslist({
            sortField: this.state.sortField,
            sortOrder: this.state.sortOrder,
            keyword: this.props.params.keyword,
            pageSize: 5,
            pageNo: this.state.pageNo,
            // 'keywordSearch'
            searchType: this.props.params.searchType,
            maximumPrice: this.state.maximumPrice,
            minimumPrice: this.state.minimumPrice,
            specFilter: specValueIds.join(',')
        }).then(result => {
            if (result.result == 1) {
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
        // this.refreshList({sortField:this.state.sortField});
        this.refreshList();

    }

    componentWillMount() {

      /* this.context.initAction({
       title: '切换',
       action: () => {
       this.setState({
       layoutType: this.state.layoutType == 1 ? 2 : 1
       })
       this.refreshList();
       }
       });*/
        // 查询列表
        this.refreshList();

        // 初始化过滤条件
        goodsApi.goodsfiltermore({
            keyword: this.props.params.keyword,
            searchType: this.props.params.searchType,
        }).then(result => {
            if (result.result == 1) {
                const data = result.data;
                if (data && data.length > 0) {
                    const specList = data[0].specList;
                    this.setState({
                        specList
                    });
                }
            }
        })
    }

    resetSpec = () => {
        const specList = this.state.specList;
        const mapedList = specList.map(specItem => {
            const specValueList = specItem.specValueList.map(specValue => {
                specValue.checked = false;
                return specValue;
            })
            specItem.specValueList = specValueList;
            return specItem;
        });
        this.setState({
            specList: mapedList
        })
    }

    // 修改价格过滤
    changePrice = (priceFilter) => {
        this.setState({
            ...priceFilter
        })
    }

    filterBySpec = () => {
        this.setState({
            open: false,
            pageNo:1,
            hasMore:true,

        });
        this.fetchData=[];
        //this.refreshList();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.sortField!=prevState.sortField || this.state.sortOrder!=prevState.sortOrder){
            // this.refreshList()
        }
        if(this.state.pageNo==1 && prevState.open==true && this.state.open==false){
            this.refreshList()
        }
        console.log(this.state);
    }

    onClickSpValue = (spec, spValue) => {
        const specList = this.state.specList;
        let mapedList = null;
        // 当前选择的规格值是选中状态
        if (spValue.checked) {
            mapedList = specList.map(specItem => {
                if (specItem.spId == spec.spId) {
                    console.log(specItem);
                    const specValueList = specItem.specValueList.map(specValue => {
                        if (specValue.spValueId == spValue.spValueId) {
                            specValue.checked = false;
                        }
                        return specValue;
                    })
                    specItem.specValueList = specValueList;
                }
                return specItem;
            });
            console.log(mapedList);
        } else {
            mapedList = specList.map(specItem => {
                if (specItem.spId == spec.spId) {
                    const specValueList = specItem.specValueList.map(specValue => {
                        if (specValue.spValueId == spValue.spValueId) {
                            specValue.checked = true;
                        } else {
                            specValue.checked = false;
                        }
                        return specValue;
                    })
                    specItem.specValueList = specValueList;
                }
                return specItem;
            });
        }
        this.setState({
            specList: mapedList
        })
    }

    renderItem = (dataItem) => {
        const IconClass = ({ url }) => {
            return <div style={{
                width: '0.5rem',
                height: '0.50rem',
                background: `url(${url}) center center /  0.64rem 0.64rem`,
                display:'inline-block'
            }}
            />
        }
        return <Flex style={{borderBottom:'1px solid #e5e5e5',padding:'0.2rem 0.26rem',background:'#fff'}} onClick={() => common.gotoGoodsDetail({specId:dataItem.specId})}>
          <Flex.Item style={{flex:1,position:'relative',height:'2.2rem'}}>
            <Img src={dataItem.goodsImage==undefined||dataItem.goodsImage==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:dataItem.goodsImage} style={{width:'2.2rem',height:'2.2rem'}}/>
              {
                  dataItem.goodsSerial == 0 &&<span style={{fontSize:'0.22rem',color:'#fff',width:'1rem',heigth:'1rem',lineHeight:'1rem',textAlign:'center',position:'absolute',top:'0.6rem',left:'0.6rem',background:'url(./assets/img/weiqing/bj.png)',borderRadius:'50%'}}>无货</span>
              }
              {
                  dataItem.goodsSerial>0 ?<span style={{fontSize:'0.22rem',color:'#fff',width:'2.2rem',textAlign:'center',position:'absolute',bottom:'0px',left:'0px',background:'url(./assets/img/weiqing/bj.png)',heigth:'0.4rem',lineHeight:'0.4rem'}}>还剩 {dataItem.goodsSerial} 件</span> : ''
              }
          </Flex.Item>
          <Flex.Item style={{flex:2}}>
            <div style={{width:'100%',height:'100%'}}>
              <div style={{paddingRight:'20px',fontSize:'0.28rem',color:'#333',height:'0.8rem',overflow:'hidden',lineHeight:'0.4rem'}}>
                  {dataItem.goodsName}
              </div>
              <WhiteSpace></WhiteSpace>
              <div style={{color:'#e60211',fontSize:'0.3rem'}}>
                ¥<span style={{paddingLeft:'5px'}}>{`${dataItem.goodsPrice}`}</span>
              </div>
              <Flex>
                  {/*<Flex.Item style={{color:'red'}}>{dataItem.storeName}</Flex.Item>*/}
                  {/*<Flex.Item style={{flex:0}}></Flex.Item>*/}
                <Flex.Item className="rsale" style={{fongSize:'0.26rem',color:'#999',paddingTop:'0.35rem'}}>
                    {dataItem.commentnum}条评论&nbsp;&nbsp;&nbsp;&nbsp;好评{dataItem.salenum}%
                </Flex.Item>
              </Flex>
            </div>
          </Flex.Item>
        </Flex>
    }
  /*renderItem1 = (dataItem) => {
   return <Flex style={{fontSize: '.24rem',
   width:'50%',
   float:'left',
   color: 'gray',
   textAlign: 'center',paddingBottom:'20px',margin:'0.2rem 0'}} direction='column' onClick={() => onClick(dataItem)}
   >
   <Flex.Item>
   <Img src={dataItem.goodsImage} style={{width:'3rem',height:'3rem' }} />
   </Flex.Item>
   <Flex.Item style={{width:'97%',margin:'0'}}>
   <div style={{fontSize: '.24rem',
   color: 'gray',
   paddingLeft:'20px',
   paddingRight:'20px'}} className='text-overflow-hidden'>{dataItem.goodsName}</div>
   </Flex.Item>
   <Flex.Item>
   <div style={{fontSize:'.24rem',color:'red'}}>{`¥${dataItem.goodsPrice}`}</div>
   </Flex.Item>
   </Flex>
   }*/
    changeOrder = (sortField) => {
        this.setState({
            sortField: sortField,
            sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc',
            pageNo:1,
            hasMore:true,
            dataSource: this.ds.cloneWithRows([]),
        })
        this.fetchData=[];
        // this.refreshList(sortField);
    }

    onClickFilter = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        const { data, sortField, sortOrder, specList } = this.state;
        const allUpClass = classnames('wx-goods-search-order-up', {
            'selected': sortField == '' && sortOrder == 'desc'
        })
        const allDownClass = classnames('wx-goods-search-order-down', {
            'selected': sortField == '' && sortOrder == 'asc'
        })

        const salenumUpClass = classnames('wx-goods-search-order-up', {
            'selected': sortField == 'salenum' && sortOrder == 'desc'
        })
        const salenumDownClass = classnames('wx-goods-search-order-down', {
            'selected': sortField == 'salenum' && sortOrder == 'asc'
        })

        const goodsStorePriceUpClass = classnames('wx-goods-search-order-up', {
            'selected': sortField == 'goodsStorePrice' && sortOrder == 'desc'
        })
        const goodsStorePriceDownClass = classnames('wx-goods-search-order-down', {
            'selected': sortField == 'goodsStorePrice' && sortOrder == 'asc'
        })

        return <div className='wx-goods-search-page'>
            {
                this.state.open ? <GoodsSearchSpecFilter
                    changePrice={this.changePrice}
                    onClickSpValue={this.onClickSpValue}
                    resetSpec={this.resetSpec}
                    filterBySpec={this.filterBySpec}
                    maximumPrice={this.state.maximumPrice}
                    minimumPrice={this.state.minimumPrice}
                    specList={specList} /> : null
            }
            {
                this.state.open ? <div onClick={() => this.setState({
                    open:false
                })} className="am-modal-mask"></div> : null
            }
          <Flex className='wx-goods-search-header'>
            <Flex.Item onClick={()=>this.changeOrder('')}>
                {
                    sortField == '' ? <span style={{color:'#1586ca'}}>综合</span>:'综合'
                }
              <div className='wx-goods-search-order'>
                <Icon className={allUpClass} type="up" />
                <Icon className={allDownClass} type="down" />
              </div>
            </Flex.Item>
            <Flex.Item onClick={()=>this.changeOrder('salenum')}>
                {
                    sortField == 'salenum' ? <span style={{color:'#1586ca'}}>销量</span>:'销量'
                }
              <div className="wx-goods-search-order">
                <Icon className={salenumUpClass} type="up" />
                <Icon className={salenumDownClass} type="down" />
              </div>
            </Flex.Item>
            <Flex.Item onClick={()=>this.changeOrder('goodsStorePrice')}>
                {
                    sortField == 'goodsStorePrice' ? <span style={{color:'#1586ca'}}>价格</span>:'价格'
                }
              <div className="wx-goods-search-order">
                <Icon className={goodsStorePriceUpClass} type="up"/>
                <Icon className={goodsStorePriceDownClass} type="down" />
              </div>
            </Flex.Item>
            <Flex.Item onClick={()=>this.onClickFilter()}>
              筛选<img style={{width:'.2rem',height:'.2rem'}} src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/list_saixuan.png`} />
            </Flex.Item>
          </Flex>
          <div className='' style={{paddingTop:'1rem'}}>
              {/*<ListView*/}
              {/*style={{*/}
              {/*height:'100%'*/}
              {/*}}  */}
              {/*dataSource={this.state.dataSource}*/}
              {/*renderRow={this.renderItem}*/}
              {/*delayTime={10}>*/}
              {/*</ListView>*/}
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2}rem`,
                    position: 'relative',
                    overflow: 'auto',
                    //margin: '0.1rem 0',
                }}
                // ref="lv"
                pageSize={4}
                renderFooter={
                    () => <div style={{paddingBottom: '1rem',textAlign:'center'}}>

                        {this.state.isLoading ? '加载中...' : ''}
                        {(this.state.hasMore && this.state.isLoading===false) ? '下拉加载更多...' : ''}
                        {this.state.hasMore===false ? '加载完成' : ''}

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
    }
}

export default withRouter(GoodsSearch);
