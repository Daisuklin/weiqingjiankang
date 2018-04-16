import React, {Component} from 'react';
import {Grid, Flex, WhiteSpace, Icon, List, WingBlank,Toast} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import {Map} from 'immutable'
import './HomeNewGoodsBlock.less';
import * as timeBuyApi from '../../timeBuy/api/timeBuy';
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
            flashSaleinfo: '',
            isIndex: '1',
            hour: 0,
            minute: 0,
            second: 0,
            now:"",
            goodsList: [],
            init:false
        }
    }

    componentDidMount() {
        this.onGetData();
    }

    componentDidUpdate() {
        this.countDown()
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    onGetData = () => {
        timeBuyApi.flashSaleApiList({
            isIndex: this.state.isIndex,
            pageSize: 3
        }).then(result => {
            if (result.result == 1) {
                const flashSaleinfo = result.countDown;
                this.setState({
                    flashSaleinfo: flashSaleinfo,
                    goodsList: result.data,
                    now:result.hour,
                    hour: parseInt(flashSaleinfo.substring(0, 2)),
                    minute: parseInt(flashSaleinfo.substring(2, 4)),
                    second: parseInt(flashSaleinfo.substring(4, 6)),
                    init: true
                });
                console.log(flashSaleinfo);
            } else {
                //提示弹框
                Toast.info(result.msg);
            }
        });
    }

    ongotoTimeBuy = () => {
        window.location.href = `timeBuy.html#/timeBuy/all`;
    }
    onClick = (el, index) => {
        // console.log(el);
        common.gotoGoodsDetail({specId: el.goodsSpecId});
    }

    countDown = () => {
       this.timeout=setTimeout(() => {
            if (this.state.second - 1 < 0) {
                if (this.state.minute -1< 0) {
                    if (this.state.hour - 1 < 0) {
                        this.onGetData();
                    } else {
                        this.setState({
                            hour: this.state.hour - 1,
                            minute:60
                        })
                    }
                } else {
                    this.setState({
                        minute: this.state.minute - 1,
                        second:60
                    })
                }
            } else {
                this.setState({
                    second: this.state.second - 1
                })
            }
        }, 1000);
    }


    SS = () => {
        if (this.state.hour <= 0) {
            if (this.state.minute <= 0) {
                if (this.state.second - 1 <= 0) {
                    this.onGetData();
                } else {
                    this.setState({
                        second: this.state.second - 1
                    })
                }
            } else {
                if (this.state.second - 1 <= 0) {
                    if (this.state.minute - 1 <= 0) {
                        this.onGetData();
                    } else {
                        this.setState({
                            minute: this.state.minute - 1
                        })
                    }
                } else {
                    this.setState({
                        second: this.state.second - 1
                    })
                }
            }
        } else {
            if (this.state.minute <= 0) {
                if (this.state.second - 1 <= 0) {
                    this.onGetData();
                } else {
                    this.setState({
                        second: this.state.second - 1
                    })
                }
            } else {
                if (this.state.second - 1 <= 0) {
                    if (this.state.minute - 1 <= 0) {
                        this.onGetData();
                    } else {
                        this.setState({
                            minute: this.state.minute - 1
                        })
                    }
                } else {
                    this.setState({
                        second: this.state.second - 1
                    })
                }
            }
        }
    }

    renderItem = (dataItem) => {
        return <Flex direction='column' style={{fontSize: '.24rem'}}>
            <Flex.Item>
                <Img src={dataItem.goodsImage} style={{width: '2rem', height: '2rem'}}/>
            </Flex.Item>
            <div><Flex.Item>
                <div style={{fontSize: '.3rem', color: '#e60012'}}>￥{dataItem.price}</div>
            </Flex.Item></div>
            <Flex.Item style={{width: '90%'}}>
                <div style={{
                    color: 'gray', textAlign: 'center', paddingLeft: '10px', paddingRight: '10px'
                }} className='text-overflow-hidden'>
                    <del>￥{dataItem.specGoodsPrice}</del>
                </div>
            </Flex.Item>

        </Flex>

    }

    render() {
        if (this.state.goodsList.length<=0) {
            return null;
        }

        const flashSaleinfo = this.state.flashSaleinfo;
        const goodsList = this.state.goodsList;
        const {data} = this.props;
        let advContent = null
        let firstBlock = null;
        let sencondBlock = null;

        // if (data.advPosition && data.advPosition.advList && data.advPosition.advList.length > 0) {
        //     advContent = <a href={data.advPosition.advList[0].advUrl} style={{width: '100%'}}><Img
        //         src={data.advPosition.advList[0].resUrl} style={{width: '100%', height: '2rem'}}/></a>
        // }
        return <flex>
            {/*<Flex>*/}
                {/*{advContent}*/}
            {/*</Flex>*/}
            {
               goodsList.length>0?<WingBlank style={{background: '#fff', borderRadius: '0.2rem', paddingBottom: '0.2rem'}}>
                <List renderHeader={() => <div><IconClass url={'./assets/img/hottes_01.png'}></IconClass>
                <div style={{float: 'left', marginTop: '0.10rem'}}>
                    <span style={{fontSize: '0.3rem', color: '#333333'}}>秒杀</span>
                    <span style={{fontSize: '0.25rem', color: '#333333'}}>{this.state.now}点场</span>
                </div>
                <div className="header_time">
                    <span>{this.state.hour<10?"0"+this.state.hour:this.state.hour}</span>:<span>{this.state.minute<10?"0"+this.state.minute:this.state.minute}</span>:<span>{this.state.second<10?"0"+this.state.second:this.state.second}</span>
                </div>

                <div style={{float: 'right'}} onClick={() => {
                    this.ongotoTimeBuy()
                }}>更多<Icon type='right' size='xs'></Icon></div>
            </div>} className="homeNewGoddsBlock_list">
                <List.Item className="dd">
                <Grid data={goodsList.slice(0, 3)} columnNum={3}
                onClick={this.onClick}
                renderItem={(dataItem, index) => (this.renderItem(dataItem))}
                style={{paddingRight: '0px'}} className="homeNewGood">
                </Grid>
                </List.Item>
                </List>
                </WingBlank>:<WingBlank style={{background: '#fff', borderRadius: '0.2rem', paddingBottom: '0.2rem'}}>
                   <List renderHeader={() => <div><IconClass url={'./assets/img/hottes_01.png'}></IconClass>
                       <div style={{float: 'left', marginTop: '0.10rem'}}>
                           <span style={{fontSize: '0.3rem', color: '#333333'}}>秒杀</span>
                           <span style={{fontSize: '0.25rem', color: '#333333'}}>{this.state.now}点场</span>
                       </div>
                       <div className="header_time">
                           <span>{this.state.hour<10?"0"+this.state.hour:this.state.hour}</span>:<span>{this.state.minute<10?"0"+this.state.minute:this.state.minute}</span>:<span>{this.state.second<10?"0"+this.state.second:this.state.second}</span>
                       </div>

                       <div style={{float: 'right'}} onClick={() => {
                           this.ongotoTimeBuy()
                       }}>更多<Icon type='right' size='xs'></Icon></div>
                   </div>} className="homeNewGoddsBlock_list">
                       <List.Item className="dd">
                           <Grid data={goodsList.slice(0, 3)} columnNum={3}
                                 onClick={this.onClick}
                                 renderItem={(dataItem, index) => (this.renderItem(dataItem))}
                                 style={{paddingRight: '0px'}} className="homeNewGood">
                           </Grid>
                       </List.Item>
                   </List>
               </WingBlank>
            }
            <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
        </flex>
    }
}

export default HomeNewGoodsBlock;
