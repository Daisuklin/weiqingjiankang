import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
    Carousel,
    WhiteSpace,
    WingBlank,
    Toast,
    Flex,
    List,
    Button,
    Stepper,
    Grid,
    Popup,
    Modal
} from 'antd-mobile';
import { Img, CartBar,CommonShare } from 'commonComponent';
import { common } from 'common';
import CouponList from 'commonComponent/CouponList';
import * as BaseApi from 'common/api/base'
import  wx from 'weixin-js-sdk';
import GinsegMoreInfo from '../components/GinsegMoreInfo';
import GinsengPeople from '../components/GinsengPeople';
import ImmediatelyOffered from '../components/ImmediatelyOffered';
import { Map } from 'immutable'
import * as groupBuylApi from '../api/groupBuy';

import './ginsengGroup.less';

class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupItemDetail: Map(),
            init:false,
            groupDetail:'',
            groupVo:'',
            buyCount: 1,

        }
    }

  /*  componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.specId != this.props.params.specId) {
            console.log('componentDidUpdate', prevProps.params.specId,
                this.props.params.specId);

            this.refresh();
        }
    }*/

    refresh = () => {
        Toast.loading();
        // 获取商品详情
        groupBuylApi.itemDetail({
            groupDetailId: this.props.params.groupDetailId
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            // const groupItemDetail = result.data;
            console.log(result.data)
            this.setState({
                groupItemDetail:result.data,
                groupDetail:result.data.groupDetail,
                groupVo:result.data.groupVo,
                init:true
            });

            const node = this.refs.detailScroll;
            node.scrollTop = 0;

            // 登录后才上报 浏览记录
            /*if (common.isLogin()) {
                setTimeout(function() {
                    groupBuylApi.goodsBrowseSaveOrUpdate({
                        goodsId: goodsDetailInfo.get('goodsId')
                    });
                }, 100);
            }*/
        });
    }

    componentDidMount() {
        this.refresh();
    }
    /**
     * 点击立即参团
     */
    ImmediatelyOffere = (e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        const {groupItemDetail,groupVo,groupDetail} = this.state;
        Popup.show(
            <ImmediatelyOffered
                gotoBuy={this.gotoBuy}
                buyCount={this.state.buyCount}
                onChangeSpec={this.onChangeSpec}
                onChangeBuyNum={this.onChangeBuyNum}
                groupItemDetail={groupItemDetail}
                groupVo={groupVo}
                groupDetail={groupDetail}
                onClose={() => Popup.hide()} />, { animationType: 'slide-up' }
        );
    }

    onChangeBuyNum = (num) => {
        this.setState({
            buyCount: num
        });
        console.log(num);
    }

    /**
     * 点击获取参团人
     */
    getSpec = (e) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
        const {groupItemDetail,groupVo,groupDetail} = this.state;
        Popup.show(
            <GinsengPeople
                onChangeSpec={this.onChangeSpec}
                onChangeBuyNum={this.onChangeBuyNum}
                groupItemDetail={groupItemDetail}
                groupVo={groupVo}
                groupDetail={groupDetail}
                onClose={() => Popup.hide()} />, { animationType: 'slide-up' }
        );
    }

    // 立即购买
    gotoBuy = (groupNumber,specId,groupItemId,groupDetailId) => {
        groupBuylApi.grouppurchase({
            specId:specId,
            groupItemId:groupItemId,
            goodsNumber:groupNumber,
            groupDetailId:groupDetailId
        }).then(result =>{
            const data = result.data;
            console.log(data)
            if (result.result == 1) {
                // this.props.router.push(`/spellorder/${specId}/${groupItemId}/${groupNumber}/${groupDetailId}`);
                // console.log(groupNumber,specId,groupItemId)
                this.props.router.push(`/spellorder/${specId}/${groupItemId}/${groupNumber}/${groupDetailId}`);
              /*  this.props.router.push({
                    pathname: '/spellorder',
                    state: {
                        data
                    }
                })*/
            } else {
                Toast.fail(result.msg);
            }
        })

    }
    showShareActionSheet = () => {
        const {groupVo} = this.state;
        var    shareImgurl=common.IMAGE_DOMAIN+groupVo.groupImage;
        BaseApi.getToken({
            pageUrl: location.href.split('#')[0]
        }).then(result => {
            if (result.result == 1) {
                Popup.show(
                    <CommonShare />, {animationType: 'slide-up'}
                );
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
                    let shareUrl=location.href;
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: "快来一起参团吧！", // 分享标题
                        link:shareUrl,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:shareImgurl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.fail("您已取消分享")
                        }
                    });
                    //分享给好友
                    wx.onMenuShareAppMessage({
                        title: "快来一起参团吧", // 分享标题
                        desc: '', // 分享描述
                        link:shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:shareImgurl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功！")
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            Toast.fail("您已取消分享")
                        }
                    });
                });
            } else {
                Toast.fail(result.msg)
            }
        });
    }
    render() {
        const {groupItemDetail,groupVo,groupDetail} = this.state;
        if(!this.state.init){
            return null;
        }
      console.log(groupDetail)
        return (
            <div className='wx-goods-detail'>
                <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
                    backgroundColor: 'white',position:'relative'}}>
                    <div className="points_redeemNow">
                        <Flex justify="between" style={{padding:'0 0.2rem'}} onClick={()=>common.gotoSpellDetaileds({specId:groupVo.groupId})}>
                            <List.Item style={{flex:1,minWidth:'1.65rem',paddingRight:'0.1rem'}} onClick={()=>console.log(groupItemDetail)} className="redeeNow_img">
                                <Img src={groupVo.groupImage} className="img" width="162px" height="130px"/>
                            </List.Item>
                            <List.Item style={{flex:3}} onClick={()=>console.log(PointsGoods)}>
                                <div className="reddemNow_name">{groupVo.groupName}</div>
                                    <div style={{flex:3}}>
                                        <div className="redeeNow_weight"><span>{groupDetail.groupPerson}人团</span>    <span>已参团{groupDetail.currentPerson}人</span></div>
                                        <div className="redeeNow_integral">￥{groupVo .groupPrice}
                                        <span style={{fontSize:'0.24rem',color:'#333',float:'right'}}>库存：{groupVo.goodsStorage}</span></div>
                                    </div>
                            </List.Item>
                        </Flex>
                    </div>

                    {groupItemDetail.goodsShow==0?<div style={{height:'1rem',background:'#ddd',lineHeight:'1rem',textAlign:'center',fontSize:'0.5rem'}}>商品已经下架啦~</div>:<div>
                        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>

                        <List className='wx-goods-detail-list'  style={{padding:'0.3rem 0.2rem'}}>
                            <List.Item style={{textAlign:'right'}} arrow="horizontal" onClick={this.getSpec}>
                                <div className="felx_btn_box">
                                    {
                                        groupDetail.groupMembersList.map((groupMenber,index)=>{
                                            return <span style={{width:'0.9rem',height:'0.9rem',borderRadius:'50%',position:'relative',display:'inline-block',marginRight:'0.1rem'}} key={index}>
                                                    {
                                                        groupMenber.isCreate == 1 &&<img src="./assets/img/weiqing/tuanzhang-01@2x.png" style={{width:'0.54rem',height:'0.34rem',position:'absolute',left:'-13px',top:'-14px'}}/>
                                                    }
                                                <Img src={groupMenber.memberAvatar} style={{width:'0.9rem',height:'0.9rem',borderRadius:'50%'}}/>
                                            </span>
                                        })
                                    }
                                </div>

                            </List.Item>
                            {
                                groupDetail.finished == 1 ? <div className="text_product"><img src="./assets/img/weiqing/naozhong@2x.png" width="28px" height="28px" style={{paddingRight:'0.1rem',position:'relative',top:'3px'}}/>拼团已完成
                                </div> : <div className="text_product"><img src="./assets/img/weiqing/naozhong@2x.png" width="28px" height="28px" style={{paddingRight:'0.1rem',position:'relative',top:'3px'}}/>拼团中，还差{groupDetail.remainPerson}人</div>
                            }

                        </List>

                        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                        <GinsegMoreInfo groupItemDetail={groupItemDetail}></GinsegMoreInfo>
                    </div>}
                </div>
                <div>
                    {
                        groupDetail.finished == 1 ? <Flex className="bargainBtn">
                            <Flex.Item style={{flex:1,textAlign:'center'}}  >
                                <Button type='primary' onClick={()=> this.props.router.push('/spellDetails/'+ groupVo.groupId)}  style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',background:'#77b4f5',borderColor:'#77b4f5',color:'#fff'}}>去开团
                                </Button>
                            </Flex.Item>
                        </Flex> : <Flex className="bargainBtn">
                            <Flex.Item style={{flex:1,textAlign:'center'}}  >
                                        <Button type='primary' inline onClick={()=>this.showShareActionSheet()}  style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%',backgroundColor:'#ff7841',borderColor:'#ff7841'}}>邀请好友参团</Button>
                                        <Button type='primary' inline onClick={this.ImmediatelyOffere} style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%'}}>立即参团</Button>
                            </Flex.Item>
                        </Flex>
                    }
                    {/*<Flex className="bargainBtn">
                        <Flex.Item style={{flex:1,textAlign:'center'}}  >
                            {
                                groupDetail.finished == 1 ?<Button type='primary' onClick={()=> this.props.router.push('/spellDetails/'+ groupVo.groupId)}  style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',background:'#77b4f5',borderColor:'#77b4f5',color:'#fff'}}>去开团
                                </Button> : <div>
                                    <Button type='primary' inline onClick={()=>this.showShareActionSheet()}  style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%',backgroundColor:'#ff7841',borderColor:'#ff7841'}}>邀请好友参团</Button>
                                    <Button type='primary' inline onClick={this.ImmediatelyOffere} style={{height:'0.7rem',margin:'0rem 0.2rem',lineHeight:'0.7rem',width:'43%'}}>立即参团</Button>
                                </div>
                            }

                        </Flex.Item>
                    </Flex>*/}
                </div>

            </div>
        )
    }
}

export default withRouter(GoodsDetail);
