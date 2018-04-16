import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
    Flex,
    ListView,
    Button,
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as groupApi from '../api/groupBuy';
import './groupBuy.less';

class GoodsSearch extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            pageSize: 20,
            pageNo: 1,
            hasMore: false,
            isLoading: false,
            isInit: true
        }
    }

    refreshList = (storeId) => {
        groupApi.groupList({
            storeId:storeId,
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo
        }).then(result => {
            if (result.result == 1) {
                this.setState({
                    dataSource: this.ds.cloneWithRows(result.data.groupList)
                })
            }
        })
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
        this.refreshList({pageNo});
    }

    componentWillMount() {
        const storeId=this.props.params.storeId;
        if(storeId!='all'){
            this.refreshList(storeId);
        }else {
            this.refreshList("");
        }

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
        return <Flex style={{borderBottom:'1px solid #d8d8d8',padding:'0.2rem'}} onClick={() => console.log(dataItem)}>
          <Flex.Item style={{flex:1.8}} className="bargainImgl">
              <div style={{position:'relative',width:'2.2rem',margin:'0px auto'}}>
                  <span className="bargainSpantit"><img src="./assets/img/weiqing/pintuan-01@2x.png" style={{width:'80px',height:'36px'}}/></span>
                  <Img src={dataItem.groupImage==undefined||dataItem.groupImage==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:dataItem.groupImage} style={{width:'2.2rem',height:'2.2rem'}}/>
              </div>

          </Flex.Item>
          <Flex.Item style={{flex:3}}>
            <div style={{width:'100%',height:'100%'}}>
              <div style={{paddingRight:'20px',fontSize:'0.3rem',height:'0.8rem',overflow:'hidden',lineHeight:'0.4rem',marginBottom:'0.3rem'}} onClick={()=>console.log(dataItem) }>
                  {dataItem.groupName}
              </div>
              <Flex>
                <Flex.Item >
                  <div style={{color:'red',fontSize:'0.28rem',paddingBottom:'0.1rem'}}>
                      {`¥${dataItem.groupPrice}`}<del style={{color:'#888',fontSize:'0.24rem',paddingLeft:'0.2rem'}}>{`¥${dataItem.goodsPrice}`}</del>
                  </div>
                  <div style={{color:'#888',fontSize:'0.24rem'}}>{dataItem.minPerson}人团</div>
                </Flex.Item>
                <Flex.Item className="rsale" style={{marginLeft:'1rem',textAlign:'right'}}>
                  <Button type='primary' size='small' inline onClick={()=>common.gotoSpellDetaileds({specId:dataItem.groupId})} style={{width:'1.1rem',height:'0.5rem',lineHeight:'0.45rem',padding:'0px',fontSize:'0.26rem'}}>去开团</Button>
                </Flex.Item>
              </Flex>
            </div>
          </Flex.Item>
        </Flex>
    }

    render() {
        const { selectedIndex, dataSource } = this.state
        const footer = <div style={{ padding: 30, textAlign: 'center',marginBottom:'7.4rem' }}>
            {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>;

        const { data, sortField, sortOrder, specList } = this.state;
        return <div className='wx-goods-search-page'>
          <div className='fix-scroll' style={{paddingTop:'0.9rem'}}>
            <ListView
                style={{
                    height:'100%'
                }}
                pageSize={10}
                renderFooter={()=>footer}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={50}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                delayTime={10}>
            </ListView>
          </div>
        </div>
    }
}

export default withRouter(GoodsSearch);
