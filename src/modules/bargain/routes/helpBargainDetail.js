import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {
    Carousel,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Button,
    Card,
    Grid,
    Popup,
    Modal
} from 'antd-mobile';
import {Img, CartBar,CommonShare} from 'commonComponent';
import {common} from 'common';
import * as BaseApi from 'common/api/base'
import BargainMoreInfo from '../components/BargainMoreInfo';
import BargainStoreInfo from '../components/BargainStoreInfo';
import  wx from 'weixin-js-sdk';
import {Map} from 'immutable';
import * as bargainApi from '../api/bargainApi';
import './helpBargainDetail.less';

class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bargainActivity: Map(),
            storeInfo: Map(),
            modal1: false,
            init: false,
            modal2: false,
            bargainingNumber: 0,
            isJoin: false,
            bargainInfo: Map(),
            member: Map(),
            timeShow: '',
            mowTime:new Date().setMilliseconds()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.id != this.props.params.id) {
            console.log('componentDidUpdate', prevProps.params.id, this.props.params.id);
            this.refresh();
        }
    }

    refresh = () => {
        Toast.loading();
        // 获取商品详情
        bargainApi.bargargainDetail({
            id: this.props.params.id,
            bargainId:this.props.params.bargainId
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            const bargargainDetail = result.data;
            if (bargargainDetail.shopBargain) {
                this.setState({
                    isJoin: true,
                    bargainInfo: bargargainDetail.shopBargain,
                    bargainActivity: bargargainDetail.bargainActivity[0],
                    storeInfo: bargargainDetail.storeInfo,
                    member: bargargainDetail.member,
                    init: true,
                    mowTime: result.now,
                    bargainingNumber: bargargainDetail.shopBargain.bargainingNumber
                });
            } else {
                this.setState({
                    bargainActivity: bargargainDetail.bargainActivity[0],
                    storeInfo: bargargainDetail.storeInfo,
                    member: bargargainDetail.member,
                    init: true,
                    mowTime: result.now
                });
            }
        });
    }

    //加入砍价
    joinBargain = () => {
        bargainApi.bargain({
            bargainActivityId: this.props.params.id,
            bargainId:this.props.params.bargainId
        }).then(result => {
            Toast.hide();
            if (result.result == 0) {
                Toast.fail(result.msg);
                return;
            }
            const bargainOperation = result.data.shopBargain;
            this.setState({
                isJoin:true,
                bargainingNumber: bargainOperation.bargainingNumber,
                bargainInfo: bargainOperation,
                modal2:true
            });
        });
    }

    componentDidMount() {
        this.refresh();
    }

    showModal2 = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }

    showModal = (key, item) => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
            imgurl: item
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    Close = () => {
        this.setState({
            modal1: false,
        });
    }
    /*找亲友帮忙砍刀*/
    showShareActionSheet = (goodsDetailInfo) => {
        const self=this;
        let url=window.location.href;
        BaseApi.getToken({
            pageUrl:location.href.split('#')[0]
        }).then(result => {
            if (result.result == 1) {
                var data = result.data[0];
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，
                    jsApiList: [
                        "chooseImage",// 选择图片
                        "previewImage", //预览图片
                        "uploadImage", //上传图片
                        "downloadImage",  //下载图片
                        "onMenuShareTimeline", //分享到朋友圈
                        "onMenuShareAppMessage",//分享给好友
                        // "onMenuShareQQ",
                        // "onMenuShareWeibo",
                        // "onMenuShareQZone",
                        "hideOptionMenu",
                        "showOptionMenu",
                        "hideMenuItems",
                        "showMenuItems",
                        "hideAllNonBaseMenuItem",
                        "showAllNonBaseMenuItem"
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.hideAllNonBaseMenuItem(); //隐藏非基础功能按钮
                    wx.showMenuItems({
                        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:favorite"] // 要显示的菜单项，所有menu项见附录3
                    });
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: "快来帮我砍价吧", // 分享标题
                        link:url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: common.IMAGE_DOMAIN + goodsDetailInfo.goodsImage, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.success("取消分享！")
                        }
                    });
                    //分享给好友
                    wx.onMenuShareAppMessage({
                        title: "快来帮我砍价吧", // 分享标题
                        desc: '', // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: common.IMAGE_DOMAIN + goodsDetailInfo.goodsImage, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.success("取消分享！")
                        }
                    });
                });
            }else {
                Toast.fail(result.msg)
            }
        });
        Popup.show(
            <CommonShare />, { animationType: 'slide-up' }
        );
    }
    render() {
        if (!this.state.init) {
            return null;
        }

        const bargargainDetail = this.state.bargainActivity;
        const goodsDetailInfo = bargargainDetail.goods;
        const goodsCallyList = goodsDetailInfo.goodsImageMore.split(",");
        goodsCallyList.pop();
        const bargainingNumber = this.state.bargainingNumber;
        const member = this.state.member;
        const bargainInfo=this.state.bargainInfo;
        const self=this;
        setTimeout(function () {
            const currentTime = self.state.mowTime;
            const endTime = self.state.bargainActivity.endTime;
            // 秒数
            let seconds = parseInt((endTime - currentTime) / 1000);
            if (seconds > 0) {
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

                let timeShow = `${d} 天 ${showHour < 10 ? `0${showHour}` : showHour} 时 ${m < 10 ? `0${m}` : m} 分 ${s < 10 ? `0${s}` : s} 秒 `;
                const now = parseInt((currentTime + 1000));
                self.setState({
                    timeShow: timeShow,
                    mowTime: now
                })
            } else {
                let timeShow = `已结束 `;
            }
        }, 1000,0)
        return (
            <div className='wx-goods-detail'>
                <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
                    backgroundColor: 'white', position: 'relative'
                }}>
                    <div style={{height: '7.5rem', overflow: 'hidden', position: 'relative'}}>
                        <Carousel autoplay={false} infinite={false} dots={true} selectedIndex={0} className="imgBoxdiv">
                            {
                                goodsCallyList.map((item, index) => (
                                    <Img key={index} src={item} onClick={this.showModal('modal1', item)}/>
                                ))
                            }
                        </Carousel>
                        <div className="spanNum_box">
                            <p className="spanNum">已有{bargargainDetail.bargainNumber}人参与砍价
                                {
                                    bargargainDetail.isOpen != 1 ? <span style={{float: 'right'}}>还剩：0 天</span> : <span style={{float: 'right'}}>还剩：{this.state.timeShow}</span>
                                }

                            </p>
                        </div>
                    </div>

                    <Modal title="商品详情"
                           visible={this.state.modal1}
                           transparent
                           maskClosable={true}
                           onClose={this.onClose('modal1')}
                           style={{width: '8rem', height: '10rem'}}
                    >
                        <Img className='imgDe' onClick={() => this.Close()} src={this.state.imgurl}
                             style={{width: '8rem', height: '8rem'}}/>
                    </Modal>

                    <Flex className='wx-goods-detail-info' style={{padding: '0.2rem'}}>
                        <Flex.Item style={{flex: 2}} className="bargainImgl">
                            <div className="goodsnames">{bargargainDetail.goodsName}</div>
                            <div className="goodsIntroduce">{goodsDetailInfo.goodsSubtitle}</div>
                        </Flex.Item>
                        <Flex.Item style={{flex: 1, textAlign: 'right'}}>
                            <Button type='primary' size='small' inline
                                    onClick={() => common.gotoGoodsDetail({specId: goodsDetailInfo.specId})}
                                    style={{background: '#5491d2', borderColor: "#5491d2"}}>查看商品详情</Button>
                        </Flex.Item>
                    </Flex>
                    {bargargainDetail.isOpen != 1 ? <div style={{
                        height: '1rem',
                        background: '#ddd',
                        lineHeight: '1rem',
                        textAlign: 'center',
                        fontSize: '0.5rem'
                    }}>活动已结束~</div> : <div>
                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        <Flex className='wx-goods-detail-info' style={{padding: '0.2rem'}}>
                            <Flex.Item style={{flex: 1}} className="bargainImgl">
                                <Img src={member.memberAvatar} style={{width: '1rem', height: '1rem'}}/>
                            </Flex.Item>
                            <Flex.Item style={{flex: 2}}>
                                <div style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: '#9c9c9c',
                                    padding: '0rem 0px 0.15rem',
                                    fontSize: '0.28rem',
                                    color: '#333'
                                }}>{member.memberName}</div>
                                <div style={{color: '#e1536b', fontSize: '0.28rem', paddingBottom: '0.1rem'}}>
                                    ￥{bargainInfo.bargainPrice?bargainInfo.bargainPrice:bargargainDetail.bargainPrice}
                                    <del style={{fontSize: '0.24rem', color: '#999', paddingLeft: '0.2rem'}}>
                                        ￥{bargargainDetail.bargainPrice}
                                    </del>
                                </div>
                                <div style={{fontSize: '0.22rem', color: '#999'}}>
                                    底价：￥{bargargainDetail.cutMinimumPrice}</div>
                            </Flex.Item>
                            <Flex.Item style={{flex: 4, textAlign: 'right'}}>
                                {
                                    this.state.isJoin ? <div>
                                        <Button type='primary' size='small'
                                                inline style={{
                                            marginLeft: '0.1rem',
                                            backgroundColor: '#ff7841',
                                            color: '#fff',
                                            borderColor: '#ff7841'
                                        }}>已参加</Button>
                                        <Button type='primary' size='small' inline style={{
                                            marginLeft: '0.1rem',
                                            backgroundColor: '#fff',
                                            color: '#00a9e0',
                                            borderColor: '#00a9e0'
                                        }}>{bargainingNumber}人帮砍</Button>

                                    </div> : <div>
                                        <Button type='primary' size='small' inline
                                                style={{background: '#5491d2', borderColor: "#5491d2"}}>未参加</Button>
                                        <Button type='primary' size='small' inline
                                                style={{
                                                    marginLeft: '0.1rem',
                                                    backgroundColor: '#fff',
                                                    borderColor: '#5491d2',
                                                    color: '#5491d2'
                                                }}>0人帮砍</Button>
                                    </div>
                                }
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        {
                            this.state.isJoin ? <Flex style={{padding: '0.25rem 0.2rem'}}>
                                <Flex.Item style={{color: '#666666', fontSize: '0.28rem', lineHeight: '0.45rem'}}>
                                    已经有{bargainingNumber}位亲友帮忙砍价，共砍掉<span style={{color: '#e50414'}}>￥{parseFloat(bargainInfo.cutTotalPrice).toFixed(2)}</span>,想以最低价收入囊中。那就赶紧找亲友拔刀相助吧！
                                </Flex.Item>
                            </Flex> : <BargainStoreInfo goodsDetailInfo={this.state.storeInfo}></BargainStoreInfo>
                        }

                        <WhiteSpace size="md" style={{background: '#f3f3f3'}}/>
                        <WhiteSpace></WhiteSpace>
                        <BargainMoreInfo goodsDetailInfo={goodsDetailInfo} bargainId={bargainInfo.bargainId} barbarianDetail={bargargainDetail}></BargainMoreInfo>
                    </div>}
                    {this.state.isJoin ?
                        <Flex className="bargainBtn">
                            <Flex.Item style={{flex:1}}  >
                                <Button type='primary' className="bargainItem" onClick={() => {this.joinBargain()}} inline style={{width:'26%',backgroundColor:'#ffa91e',height:'0.65rem',lineHeight:'0.65rem', borderColor:'#ffa91e'}}>帮TA砍刀</Button>
                                <Button type='primary' className="bargainItem" onClick={()=>this.showShareActionSheet(goodsDetailInfo)}  inline style={{width:'33%',backgroundColor:'#ffa91e',height:'0.65rem',lineHeight:'0.65rem',borderColor:'#ffa91e'}}>找亲友帮TA砍</Button>
                                <Button type='primary' className="bargainItem" onClick={()=>common.gotoBargainDetail({id:this.props.params.id})} inline style={{width:'26%',backgroundColor:'#5491d2',height:'0.65rem',lineHeight:'0.65rem',borderColor:'#5491d2'}}>我也要玩</Button>
                            </Flex.Item>
                        </Flex>: <Flex className="bargainBtn">
                            <Flex.Item style={{flex: 1}}>
                                <Button type='primary'
                                        onClick={() => {
                                            this.joinBargain()
                                        }}
                                        style={{
                                            background: '#5491d2',
                                            borderColor: '#5491d2',
                                            height: '0.65rem',
                                            margin: '0rem 0.2rem',
                                            lineHeight: '0.65rem'
                                        }}>砍下一刀</Button>
                            </Flex.Item>
                        </Flex>
                    }
                    <Modal
                        transparent
                        maskClosable={false}
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        footer={[{
                            text: '确定', onPress: () => {
                                console.log('ok');
                                this.onClose('modal2')();
                            }
                        }]}
                    >
                        <div style={{textAlign:'center'}}><img src="./assets/img/bargain_park_01.png"/></div>
                        <p style={{marginTop: '0.1rem',textAlign:'center'}}>成功砍价{bargainInfo.bargainCutPrice}元</p>
                    </Modal>
                </div>
                {/*<CommonShare></CommonShare>*/}

            </div>
        )
    }
}

export default withRouter(GoodsDetail);
