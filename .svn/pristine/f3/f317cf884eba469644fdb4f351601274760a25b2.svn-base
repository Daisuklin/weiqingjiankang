import React, {Component} from 'react';
import {Grid, Flex, WhiteSpace, Icon, List, WingBlank} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as indexApi from '../api';
import HottesList from '../components/HottesList';
import './StoreList.less';
const IconClass = ({url}) => {
    return <div style={{
        width: '0.50rem',
        height: '0.50rem',
        background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
        float: 'left',
        marginRight: '0.1rem'
    }}
    />
}
class HomeNewGoodsBlock extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            raiseList: [],
            groupList: [],
            bargainList: [],
            specKillList: [],
            init: false
        }
    }

    componentDidMount() {
        Toast.loading();
        indexApi.hostList().then(result => {
            Toast.hide();
            let data = result.data;
            this.setState({
                raiseList: data.raiseList,
                groupList: data.groupList,
                bargainList: data.bargainList,
                specKillList: data.specKillList,
                init: true
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
        if (!this.state.init) {
            return null;
        }
        return (
            <div className='wx-index fix-scroll'>

            </div>
        )
    }
}

export default HomeNewGoodsBlock;
