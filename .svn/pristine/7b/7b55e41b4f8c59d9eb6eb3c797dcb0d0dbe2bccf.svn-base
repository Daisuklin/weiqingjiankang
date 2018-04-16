import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    Tabs,
    Button,
    ListView
} from 'antd-mobile';
import * as timeBuyApi from '../api/timeBuy';
import {Img} from 'commonComponent';
import {common} from 'common';

import './timeBuy.less';

const TabPane = Tabs.TabPane;

class TimeBuy extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.timer = null;
        this.fetchData=[];
        this.state = {
            qiangClass: [],
            hour: "00",
            newHour:"00",
            index: 0,
            isIndex:false,
            showList:[],
            dataSource: this.ds.cloneWithRows([]),
            init:false,
            key:1,
            pageNo: 1,
            hasMore: true,
            isLoading: false
        }
    }

    componentDidMount() {
        // 获取分类TAB
        timeBuyApi.flashSaleApiList({
            pageNo: 1,
            pageSize: 20,
            isIndex:1
        }).then(result => {
            if (result.result == 1) {
                let showList = [];
                let check=false;
                for (let i = 0; i < 7; i++) {
                    let timeShow = i * 3;
                    let timeStr = "";
                    let showObj = {timeStr: "", checked: true, index: 0,isEnd:true};
                    if (i == 0) {
                        timeStr = "06"
                    } else if (i == 6) {
                        timeStr = "00"
                    } else {
                        if (i==1) {
                            timeStr = "09"
                        } else {
                            timeStr = timeShow + 6;
                        }
                    }
                    if (timeStr == result.hour) {
                        this.setState({
                            index: i

                        })
                        check=true;
                        showObj = {timeStr: timeStr + ":00", checked: true, index: i}
                    } else {
                        if(check){
                            showObj = {timeStr: timeStr + ":00", checked: false, index: i,isEnd:false}
                        }else {
                            showObj = {timeStr: timeStr + ":00", checked: false, index: i,isEnd:true}
                        }
                    }
                    showList.push(showObj);
                }
                const qiangClassList = result.data;
                this.setState({
                    dataSource: this.ds.cloneWithRows(qiangClassList),
                    hour: result.hour,
                    isIndex:true,
                    showList:showList,
                    init:true,
                    key:this.state.index
                });

            }
        })
        //this.refreshList({key:this.state.key});
    }

    onTabChange = (key) => {
        // if(key>=this.state.index){
        //     let startObj={};
        //     let endObj={};
        //     let endIndex=parseInt(key)+1;
        //     if(key<6){
        //          startObj=this.state.showList[key];
        //          endObj=this.state.showList[endIndex];
        //     }else{
        //          startObj=this.state.showList[key];
        //          endObj=this.state.showList[0];
        //     }
        console.log(1,key);
        if(this.state.key!=key) {

            this.fetchData=[];
           // this.setState({pageNo: 1, key: key})
            console.log(2,key);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
                isLoading: false,
                pageNo:1,
                hasMore:true,
                isIndex:false,
                key: key
            });


        }

        console.log(this.state.key!=key);
            // this.refreshList({
            //     startTime:startObj.timeStr.replace(":",""),
            //     endTime:endObj.timeStr.replace(":",""),
            //     key
            // });
      //  }
    }

    refreshList = ({key}) => {
        if(key>=this.state.index){
            let startObj={};
            let endObj={};
            let endIndex=parseInt(key)+1;
            if(key<6){
                startObj=this.state.showList[key];
                endObj=this.state.showList[endIndex];
            }else{
                startObj=this.state.showList[key];
                endObj=this.state.showList[0];
            }
            console.log(3,key);
        timeBuyApi.flashSaleApiList({
            pageNo: this.state.pageNo,
            pageSize: 5,
            startTime:startObj.timeStr.replace(":",""),
            endTime:endObj.timeStr.replace(":",""),
        }).then(result => {
            if (result.result == 1) {
                //const qiangClassList = result.data;
                const ss=result.hour.substring(0,2);

                // this.setState({
                //     dataSource: this.ds.cloneWithRows(qiangClassList),
                //     isIndex:false,
                //     newHour:result.hour.substring(0,2)
                // });

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
                    isIndex:false,
                    newHour:result.hour.substring(0,2)
                });
            }
        })
        }else {
            this.fetchData=[];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.fetchData),
                isLoading: false,
                pageNo:1,
                hasMore:false,
                isIndex:false,

            });
        }

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
        this.refreshList({key:this.state.key});


    }

    componentDidUpdate(pp,ps){
        if(this.state.key!=ps.key){
           // this.refreshList({key:this.state.key});
        }
    }

    countdown = () => {
        const goodsList = this.goodsList.map(function (dataItem) {
            const currentTime = dataItem.currentTime
            const endTime = dataItem.endTime

            // 秒数
            let seconds = parseInt((endTime - currentTime) / 1000);
            // 总的小时数
            let h = Math.floor(seconds / 60 / 60);
            // 天数
            let d = parseInt(h / 24);
            // 显示的小时数
            let showHour = Math.floor(h - d * 24);
            let m = Math.floor((seconds - h * 60 * 60) / 60);
            let s = Math.floor((seconds - h * 60 * 60 - m * 60));

            if (seconds < 0) {
                h = '0';
                m = '00';
                s = '00';
                d = '00';
                showHour = '00';
            }

            dataItem.currentTime = currentTime + 1000;
            dataItem.countdown = `${d} 天 ${showHour < 10 ? `0${showHour}` : showHour} 时 ${m < 10 ? `0${m}` : m} 分 ${s < 10 ? `0${s}` : s} 秒 `
            return dataItem;
        });
        this.goodsList = goodsList;
        this.setState({
            dataSource: this.ds.cloneWithRows(goodsList)
        })
    }

    renderItem = (dataItem) => {
        return <Flex className="hotList">
            <Flex.Item style={{flex: 1, position: 'relative'}}>
                <Img src={dataItem.goodsImage} style={{width: '1.9rem', height: '1.9rem'}}/>
                <span className="spanIcon"><img src="./assets/img/weiqing/miaosha-02@2x.png"
                                                style={{width: '80px', height: '36px'}}/></span>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
                <div className="hotName">
                    {dataItem.goodsName}
                </div>
                <Flex justify='between' style={{marginRight: '.1rem'}}>
                    <Flex.Item style={{flex: 3}}>
                        <div style={{color: '#eb000d', float: 'left', fontSize: '0.3rem'}}>{'¥' + dataItem.price}</div>
                        <div style={{
                            textDecoration: 'line-through',
                            float: 'left',
                            paddingLeft: '0.2rem',
                            fontSize: '0.3rem',
                            color: '#999'
                        }}>{'¥' + dataItem.specGoodsPrice}</div>
                        <p style={{
                            height: '0.28rem',
                            color: '#878787',
                            clear: 'left',
                            margin: '0px',
                            paddingTop: '0.1rem',
                            fontSize: '0.25rem'
                        }}>{dataItem.countdown}</p>
                    </Flex.Item>
                    <Flex.Item style={{flex: 1.5, textAlign: 'right'}}>
                        {
                            this.state.isIndex?<Button size='small' inline type='primary' onClick={() => this.gotoBuy(dataItem)} style={{
                                background: '#00a9e0',
                                borderColor: '#00a9e0',
                                height: '0.5rem',
                                lineHeight: '0.5rem',
                                padding: '0px 0.25rem'
                            }}>马上抢</Button>:this.state.hour==this.state.newHour? <Button size='small' inline type='primary' onClick={() => this.gotoBuy(dataItem)} style={{
                                background: '#00a9e0',
                                borderColor: '#00a9e0',
                                height: '0.5rem',
                                lineHeight: '0.5rem',
                                padding: '0px 0.25rem'
                            }}>马上抢</Button>: <Button size='small' inline type='primary' style={{
                                background: '#e2e2e2',
                                borderColor: '#e2e2e2',
                                height: '0.5rem',
                                lineHeight: '0.5rem',
                                padding: '0px 0.25rem'
                            }}>未开始</Button>
                        }
                    </Flex.Item>
                </Flex>
            </Flex.Item>
        </Flex>
    }

    gotoBuy = (item) => {
        common.gotoGoodsDetail({
            specId: item.goodsSpecId
        })
    }

    renderHeader = () => {
        const {dataSource, hour,showList} = this.state;

        return <Tabs swipeable={false} onChange={this.onTabChange} defaultActiveKey={this.state.index.toString()} animated={true}>
            {
                showList.map((item, index) => {
                    const timebefore= <div style={{lineHeight: '0.3rem', paddingBottom: '0.1rem'}}><span >{item.timeStr}</span><br/><span>{item.checked?"抢购中":(item.isEnd?"已结束":"未开始")}</span></div>
                    const val=item.index;
                        return <TabPane tab={timebefore} key={val}>
                        </TabPane>
                })
            }
        </Tabs>
    }

    render() {
        if(!this.state.init){
            return null
        }
        return <div className='' style={{
            paddingTop: '0rem'
        }}>
            {this.renderHeader()}
            <WhiteSpace></WhiteSpace>
            {/*<ListView*/}
                {/*dataSource={this.state.dataSource}*/}
                {/*renderRow={this.renderItem}*/}
                {/*stickyHeader*/}
                {/*delayTime={10}>*/}
            {/*</ListView>*/}
            <ListView
                style={{
                    height: `${document.documentElement.clientHeight/parseFloat(document.getElementsByTagName('html')[0].style.fontSize)-2.2}rem`,
                    position: 'relative',
                    overflow: 'auto',
                 //   margin: '0.1rem 0',
                }}
              //  ref="lv"
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
    }
}

export default withRouter(TimeBuy);
