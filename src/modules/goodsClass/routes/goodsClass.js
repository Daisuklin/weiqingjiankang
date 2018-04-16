import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Carousel, Modal, SearchBar, WhiteSpace, Icon, Toast, Flex} from 'antd-mobile';
import * as goodsClassApi from '../api/goods';
import GoodsClassMenu from '../components/GoodsClassMenu';
import GoodsList from '../components/GoodsList';

import './goodsClass.less';

class GoodsClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
            goodsList: [],
            value: '',
            focused: false
        }
    }

    componentDidMount() {
        // Toast.loading();
        goodsClassApi.queryClasslist().then(result => {
            // Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }

            let data = result.data;
            this.setState({
                classList: data
            });

            if (data && data.length > 0) {
                this.onMenuChange(data[0]);
            }
        });
    }

    onMenuChange = ({gcAdvid, gcId}) => {
        // 设置滚动条
        const classList = this.refs.classList
        classList.scrollTop = 0;

        goodsClassApi.getGoodsClass({advid: gcAdvid, pId: gcId}).then(result => {
            this.setState({
                goodsList: result.data[0]
            });
        });
    }

    onGoodsClassClick = (item) => {
        let url = `home.html#/search/gcIdSearch/${item.gcRelId}`
        window.location.href = url;
    }
    onChange = (value) => {
        this.setState({
            value: value
        });
    };
    onSubmit = (value) => {
        let searchList = localStorage.getItem('searchList');
        if (searchList) {
            let searchListStr = '';
            searchListStr = value + ',' + searchList;//将搜索记录储存成字符串
            localStorage.setItem('searchList', searchListStr);//保存token值，即历史记录
        } else {
            localStorage.setItem('searchList', value);
        }
        window.location.href = (`home.html#/search/keywordSearch/${value}`)
    }

    render() {
        return (
            <div className="wx-goodsClass-box">
                <div className="goodsClass_header">{/*头部搜索*/}
                    <Flex style={{background: '#5491d2', zIndex: '10000'}}>
                        <Icon type='left' onClick={() => this.props.router.goBack()}/>
                        <Flex.Item>
                            <SearchBar
                                placeholder="请输入商品名称"
                                focused={this.state.focused}
                                onSubmit={value => {
                                    window.location.href = (`home.html#/search/keywordSearch/${value}`)
                                }}
                                onChange={this.onChange}
                                onCancel={
                                    () => {
                                        this.setState({
                                            focused: false
                                        })
                                    }}
                            />
                        </Flex.Item>
                        <button onClick={() => this.onSubmit(this.state.value)}
                                style={{
                                    padding: '0.26rem 0.26rem 0.26rem 0.05rem',
                                    background: '#5491d2',
                                    color: '#fff',
                                    border: '0'
                                }}>搜索
                        </button>
                    </Flex>
                </div>

                <div className='wx-goods-class'>
                    <div className='wx-goods-class-menu'>
                        <GoodsClassMenu data={this.state.classList} onMenuChange={this.onMenuChange}></GoodsClassMenu>
                    </div>
                    <div className='wx-goods-class-list'>
                        <div ref='classList' className='fix-scroll hasbottom' style={{marginBottom: '0.9rem'}}>
                            <GoodsList
                                onGoodsClassClick={this.onGoodsClassClick}
                                data={this.state.goodsList}></GoodsList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(GoodsClass);
