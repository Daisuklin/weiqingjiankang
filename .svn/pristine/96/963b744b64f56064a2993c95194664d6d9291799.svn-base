import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Carousel, Modal, SearchBar,Flex, WhiteSpace, WingBlank,Icon,Toast} from 'antd-mobile';
import * as indexApi from '../api';
import * as timeBuyApi from '../../timeBuy/api/timeBuy';
import HottesList from '../components/HottesList';
import './hottestActivity.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raiseList:[],
            groupList:[],
            bargainList:[],
            specKillList:[],
            init:false,
            isIndex: '1',
        }
    }

    componentDidMount() {
        Toast.loading();
        indexApi.hostList().then(result => {
            Toast.hide();
            let data = result.data;
            this.setState({
                raiseList:data.raiseList,
                groupList:data.groupList,
                bargainList:data.bargainList,
                // specKillList:data.specKillList,
                init:true
            });
        });
        timeBuyApi.flashSaleApiList({
            isIndex: this.state.isIndex,
            pageSize: 4
        }).then(result => {
            Toast.hide();
            let data = result.data;
            console.log(data)
            this.setState({
                specKillList:data,
                init:true
            });
        });
    }


    render() {
        const {
            raiseList,
            groupList,
            bargainList,
            specKillList
        } = this.state;
        if(!this.state.init){
            return null;
        }
        return (
            <div className='wx-index fix-scroll'>
                <HottesList raiseList={raiseList} groupList={groupList} bargainList={bargainList} specKillList={specKillList} storeId="all"></HottesList>
            </div>
        )
    }
}

export default withRouter(Home);
