import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import {
    Flex,
    ListView,
    Button,
} from 'antd-mobile';
import { common } from 'common';
import { Img } from 'commonComponent';
import * as bargainApi from '../api/bargainApi';
import './bargain.less';

class BargainList extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            layoutType: 0
        }
    }

    refreshList = (storeId) => {
        bargainApi.bargainList({
            pageSize: 20,
            pageNo: 1,
            storeId:storeId
        }).then(result => {
            if (result.result == 1) {
                this.setState({
                    dataSource: this.ds.cloneWithRows(result.data),
                    layoutType:1
                })
            }
        })
    }

    componentDidMount() {
        const storeId=this.props.params.storeId;
        if(storeId!='all'){
            this.refreshList(storeId);
        }else {
            this.refreshList("");
        }
        // 查询列表

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
        return <Flex style={{borderBottom:'1px solid #d8d8d8',padding:'0.2rem'}} onClick={() => common.gotoBargainDetail({id:dataItem.id})}>
            <Flex.Item style={{flex:1.5,maxWidth:'2.2rem'}} className="bargainImgl">
                <span className="bargainSpantit"><img src="./assets/img/weiqing/kanjia-02@2x.png" style={{width:'80px',height:'36px'}}/></span>
                <Img src={dataItem.pic==undefined||dataItem.pic==''?<IconClass url={'./assets/img/img_default.png'}></IconClass>:dataItem.pic} style={{width:'2.2rem',height:'2.2rem'}}/>
            </Flex.Item>
            <Flex.Item style={{flex:2.5}}>
                <div style={{width:'100%',height:'100%'}}>
                    <div style={{paddingRight:'20px',fontSize:'0.3rem',height:'1.05rem',overflow:'hidden',color:'#333'}}>
                        {dataItem.goodsName}
                    </div>
                    <Flex>
                        <Flex.Item >
                            <div style={{color:'#e2536b',fontSize:'0.28rem',paddingBottom:'0.1rem'}}>
                                {`¥${dataItem.bargainPrice}`}
                            </div>
                            <div style={{color:'#888',fontSize:'0.24rem'}}>{dataItem.bargainNumber}人已参与</div>
                        </Flex.Item>
                        {/*<Flex.Item style={{flex:0}}></Flex.Item>*/}
                        <Flex.Item className="rsale" style={{marginLeft:'1rem',textAlign:'right'}}>
                            <Button type='primary' size='small' inline onClick={()=>common.gotoBargainDetail({id:dataItem.id})}>参与</Button>
                        </Flex.Item>
                    </Flex>
                </div>
            </Flex.Item>
        </Flex>
    }

    render() {
        const { layoutType} = this.state;
        if(layoutType==0){
            return null;
        }
        return <div className='wx-goods-search-page'>
            <div className='fix-scroll' style={{paddingTop:'0.9rem'}}>
                <ListView
                    style={{
                        height:'100%'
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    delayTime={10}>
                </ListView>
            </div>
        </div>
    }
}

export default withRouter(BargainList);
