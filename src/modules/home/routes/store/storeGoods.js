import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
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
import classnames from 'classnames';
import {common} from 'common';
import {Img} from 'commonComponent';
import GoodsSearchClass from '../../components/GoodsSearchClassFilter';
import * as storeApi from '../../api/store';

import '../goodsSearch.less';

class StoreGoods extends Component {

    static contextTypes = {
        initAction: PropTypes.func,
        clearAction: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.fetchData=[];
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            sortField: '',
            sortOrder: 'asc',
            open: false,
            specList: [],
            storeClassId: '',
            storeClass:{},
            layoutType: 1,
            pageNo: 1,
            hasMore: true,
            isLoading: false
        }
    }

    refreshList = () => {
        storeApi.storegoods({
            orderField:this.state.sortField,
            order: this.state.sortOrder,
            pageNo: this.state.pageNo,
            pageSize: 5,
            storeClassId:this.state.storeClassId,
            goodsName: this.props.params.goodsName,
            storeId: this.props.params.storeId
        }).then(result => {
            if (result.result == 1) {
                const data=result.data||[];
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
        this.refreshList();


    }

    componentWillMount() {
        storeApi.storeClassList({storeId: this.props.params.storeId}).then(result => {
            if (result.result == 1) {
                this.setState({
                    specList: result.data
                })
            }
        })

        this.context.initAction({
            title: '切换',
            action: () => {
                this.setState({
                    layoutType: this.state.layoutType == 1 ? 2 : 1,
                    dataSource: this.ds.cloneWithRows(this.fetchData)
                })
               // this.refreshList();
            }
        });
        // 查询列表
        this.refreshList();
    }

    componentDidUpdate(revProps, prevState){
        // if(this.state.storeClassId!=prevState.storeClassId){
        //     this.refreshList()
        // }
        if(this.state.sortField!=prevState.sortField || this.state.sortOrder!=prevState.sortOrder){
            this.refreshList()
        }
        if(prevState.storeClassId!=this.state.storeClassId && prevState.open==true && this.state.open==false){
            this.refreshList()
        }
    }


    onClickSpValue = (classId) => {
        this.fetchData=[];
        this.setState({
            storeClassId: classId,
            open: false,
            pageNo:1,
            hasMore:true,
            dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
        })
    }

    renderItem = (dataItem) => {
        return (<div>
             {this.state.layoutType==1 ? <Flex style={{borderBottom: '1px solid #e5e5e5',background:'#fff',padding:'0.2rem 0.26rem'}}
                     onClick={() => common.gotoGoodsDetail({specId: dataItem.specId})}>
            <Flex.Item style={{flex: 1}}>
                <Img src={dataItem.goodsImage} style={{width: '1.5rem', height: '1.5rem'}}/>
            </Flex.Item>
            <Flex.Item style={{flex: 3}}>
                <div style={{width: '100%', height: '100%'}}>
                    <div style={{paddingRight: '20px',fontSize:'0.26rem',color:'#333'}}>
                        {dataItem.goodsName}
                    </div>
                    <WhiteSpace></WhiteSpace>
                    <div style={{color: 'rgb(230, 2, 17)',fontSize:'0.28rem',paddingBottom:'0.1rem'}}>
                        {`¥${dataItem.goodsPrice}`}
                    </div>
                    <Flex>
                        <Flex.Item style={{color: '#666',fontSize:'0.24rem'}}>{dataItem.storeName}</Flex.Item>
                        <Flex.Item style={{flex: 0}}></Flex.Item>
                        <Flex.Item className="rsale" style={{marginLeft: '1rem'}}>
                            评论{dataItem.commentnum}条 销量 {dataItem.salenum}
                        </Flex.Item>
                    </Flex>
                </div>
            </Flex.Item>
        </Flex> : <Flex style={{
                 fontSize: '.24rem',
                 width: '50%',
                 float: 'left',
                 color: 'gray',
                 textAlign: 'center', paddingBottom: '20px', margin: '0.2rem 0'
             }} direction='column' onClick={() => onClick(dataItem)}
             >
                 <Flex.Item>
                     <Img src={dataItem.goodsImage} style={{width: '3rem', height: '3rem'}}/>
                 </Flex.Item>
                 <Flex.Item style={{width: '97%'}}>
                     <div style={{
                         fontSize: '.24rem',
                         color: 'gray',
                         paddingLeft: '20px',
                         paddingRight: '20px'
                     }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
                 </Flex.Item>
                 <Flex.Item>
                     <div style={{fontSize: '.24rem', color: 'red'}}>{`¥${dataItem.goodsPrice}`}</div>
                 </Flex.Item>
             </Flex>}</div>)
    }
    renderItem1 = (dataItem) => {
        return <Flex style={{
            fontSize: '.24rem',
            width: '50%',
            float: 'left',
            color: 'gray',
            textAlign: 'center', paddingBottom: '20px', margin: '0.2rem 0'
        }} direction='column' onClick={() => onClick(dataItem)}
        >
            <Flex.Item>
                <Img src={dataItem.goodsImage} style={{width: '3rem', height: '3rem'}}/>
            </Flex.Item>
            <Flex.Item style={{width: '97%'}}>
                <div style={{
                    fontSize: '.24rem',
                    color: 'gray',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                }} className='text-overflow-hidden'>{dataItem.goodsName}</div>
            </Flex.Item>
            <Flex.Item>
                <div style={{fontSize: '.24rem', color: 'red'}}>{`¥${dataItem.goodsPrice}`}</div>
            </Flex.Item>
        </Flex>
    }
    changeOrder = (sortField) => {
        this.setState({
            sortField: sortField,
            sortOrder: this.state.sortOrder == 'desc' ? 'asc' : 'desc',
            pageNo:1,
            hasMore: true,
        });
        this.fetchData=[];
        //this.refreshList({sortField});
    }

    onClickFilter = () => {
        this.setState({open: !this.state.open});
    }

    render() {
        const {data, sortField, sortOrder, specList} = this.state;
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
        const { stateNum } = this.props.location.state;
        console.log(stateNum)
        return <div className='wx-goods-search-page'>
            {
                this.state.open ? <GoodsSearchClass
                    onClickSpValue={this.onClickSpValue}
                    resetSpec={this.resetSpec}
                    filterBySpec={this.filterBySpec}
                    storeClassId={this.state.storeClassId}
                    specList={specList}/> : null
            }
            {
                this.state.open ? <div onClick={() => this.setState({
                    open: false
                })} className="am-modal-mask"></div> : null
            }
            <Flex className='wx-goods-search-header'>
                <Flex.Item onClick={() => this.changeOrder('')}>
                    {
                        sortField == '' ? <span style={{color: '#5491d2'}}>综合</span> : '综合'
                    }
                    <div className='wx-goods-search-order'>
                        <Icon className={allUpClass} type="up"/>
                        <Icon className={allDownClass} type="down"/>
                    </div>
                </Flex.Item>
                <Flex.Item onClick={() => this.changeOrder('salenum')}>
                    {
                        sortField == 'salenum' ? <span style={{color: '#5491d2'}}>销量</span> : '销量'
                    }
                    <div className="wx-goods-search-order">
                        <Icon className={salenumUpClass} type="up"/>
                        <Icon className={salenumDownClass} type="down"/>
                    </div>
                </Flex.Item>
                <Flex.Item onClick={() => this.changeOrder('goodsStorePrice')}>
                    {
                        sortField == 'goodsStorePrice' ? <span style={{color: '#5491d2'}}>价格</span> : '价格'
                    }
                    <div className="wx-goods-search-order">
                        <Icon className={goodsStorePriceUpClass} type="up"/>
                        <Icon className={goodsStorePriceDownClass} type="down"/>
                    </div>
                </Flex.Item>
                <Flex.Item onClick={() => this.onClickFilter()}>
                    {
                        stateNum == 1 ? <span style={{color:'#e1536b',fontWeight:'600',paddingRight:'0.05rem'}}>分类</span> : '筛选'
                    }
                    {
                        stateNum == 1 ? <img style={{width: '.2rem', height: '.2rem'}}
                                             src={`./assets/img/weiqing/list_saixuan.png`}/> : <img style={{width: '.2rem', height: '.2rem'}}
                                                                                                                         src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/list_saixuan.png`}/>
                    }

                </Flex.Item>
            </Flex>
            <div className='fix-scroll' style={{paddingTop: '1.9rem'}}>
                <ListView
                    style={{
                        height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2}rem`,
                        position: 'relative',
                        overflow: 'auto',
                        margin: '0.1rem 0',
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
    }
}

export default withRouter(StoreGoods);
