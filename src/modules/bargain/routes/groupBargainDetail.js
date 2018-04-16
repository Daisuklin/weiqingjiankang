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
    Card,
    Grid,
    Popup,
    Modal
} from 'antd-mobile';
import { Img, CartBar } from 'commonComponent';
import { common } from 'common';
import BargainMoreInfo from '../components/BargainMoreInfo';
import { Map } from 'immutable'
import './groupBargainDetail.less';
import * as goodsDetailApi from '../api/goodsDetail';
class GoodsDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsDetailInfo: Map(),
            buyCount: 1,
            cartNum: 0,
            isFav: 0,
            modal1: false,
            modal2:false,
            imgurl:''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.specId != this.props.params.specId) {
            console.log('componentDidUpdate', prevProps.params.specId,
                this.props.params.specId);

            this.refresh();
        }
    }

    refresh = () => {
        Toast.loading();
        // 获取商品详情
        goodsDetailApi.goodsdetail({
            specId: this.props.params.specId
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            const goodsDetailInfo = Map(result.data[0]);
            // alert(JSON.stringify(goodsDetailInfo));
            this.setState({
                goodsDetailInfo,
                isFav: goodsDetailInfo.isFav
            });

            const node = this.refs.detailScroll;
            node.scrollTop = 0;

            // 登录后才上报 浏览记录
            if (common.isLogin()) {
                setTimeout(function() {
                    goodsDetailApi.goodsBrowseSaveOrUpdate({
                        goodsId: goodsDetailInfo.get('goodsId')
                    });
                }, 100);
            }
        });
    }

    componentDidMount() {
        this.refresh();
    }

    gotoEvaluateList = (goodsDetailInfo) => {
        this.props.router.push(`/evaluteList/${goodsDetailInfo.goodsId}`);
    }

    gotoConsultation = (goodsDetailInfo) => {
        this.props.router.push(`/consultList/${goodsDetailInfo.goodsId}`);
    }


    onChangeBuyNum = (num) => {
        this.setState({
            buyCount: num
        });
    }
    showModal2 = key => (e) => {
        // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
        // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    /*onClose2 = key => () => {
        this.setState({
            [key]: false,
        });
    }*/
    showModal = (key,item) => (e) => {
        e.preventDefault();
        this.setState({
            [key]: true,
            imgurl:item
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    Close=()=>{
        this.setState({
            modal1: false,
        });
    }
    render() {
        const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
        if (!goodsDetailInfo || !goodsDetailInfo.goodsCallyList) {
            return null;
        }
        console.log('render', goodsDetailInfo);

        return (
            <div className='wx-goods-detail'>
                <div ref='detailScroll' className='fix-scroll hastitle hasbottom' style={{
                    backgroundColor: 'white',position:'relative'}}>
                    <div style={{height:'7.5rem',overflow:'hidden',position:'relative'}}>
                        <Carousel autoplay={false} infinite={false} dots={true} selectedIndex={1} className="imgBoxdiv">
                            {
                                goodsDetailInfo.goodsCallyList.map((item,index) => (
                                    <Img key={index} src={item} onClick={this.showModal('modal1',item)} />
                                ))
                            }
                        </Carousel>
                        <div className="spanNum_box">
                            <p className="spanNum">已有{goodsDetailInfo.evaluateNum}人参与砍价 <span style={{float:'right'}}>砍价倒计时：02:33:29</span></p>
                        </div>
                    </div>

                    <Modal title="商品详情"
                           visible={this.state.modal1}
                           transparent
                           maskClosable={true}
                           onClose={this.onClose('modal1')}
                           style={{width:'8rem',height:'10rem'}}
                    >
                        <Img className='imgDe' onClick={()=>this.Close()} src={this.state.imgurl} style={{width:'8rem',height:'8rem'}}/>
                    </Modal>

                    <Flex className='wx-goods-detail-info'  style={{padding:'0.2rem'}}>
                        <Flex.Item style={{flex:2}} className="bargainImgl">
                            <div className="goodsnames">{goodsDetailInfo.goodsName}</div>
                            <div className="goodsIntroduce">{goodsDetailInfo.goodsSubtitle}</div>
                        </Flex.Item>
                        <Flex.Item style={{flex:1,textAlign:'right'}}  >
                            <Button type='primary' size='small' inline onClick={()=>common.gotoGoodsDetail({specId:goodsDetailInfo.specId})} style={{background:'#5491d2',borderColor:"#5491d2"}}>查看商品详情</Button>
                        </Flex.Item>
                    </Flex>
                    {goodsDetailInfo.goodsShow==0?<div style={{height:'1rem',background:'#ddd',lineHeight:'1rem',textAlign:'center',fontSize:'0.5rem'}}>商品已经下架啦~</div>:<div>
                        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                        <Flex className='wx-goods-detail-info'  style={{padding:'0.2rem'}}>
                            <Flex.Item style={{flex:1}} className="bargainImgl">
                                <img src="./assets/img/bargain_detail.png" style={{width:'1rem',height:'1rem',borderRadius:'50%'}} />
                            </Flex.Item>
                            <Flex.Item style={{flex:2}}  >
                                <div style={{overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis',color:'#9c9c9c',padding:'0rem 0px 0.15rem',fontSize:'0.28rem',color:'#333'}}>{goodsDetailInfo.gcName}</div>
                                <div style={{color:'#e1536b',fontSize:'0.28rem',paddingBottom:'0.1rem'}}>￥{goodsDetailInfo.goodCostPrice}<del style={{fontSize:'0.24rem',color:'#999',paddingLeft:'0.2rem'}}>￥900.00</del></div>
                                <div style={{fontSize:'0.22rem',color:'#999'}}>底价：￥3.00</div>

                            </Flex.Item>
                            <Flex.Item style={{flex:4,textAlign:'right'}}  >
                                <Button type='primary' size='small' inline style={{marginLeft:'0.1rem',backgroundColor:'#ff7841',color:'#fff',borderColor:'#ff7841'}}>已参加</Button><Button type='primary' size='small' inline style={{marginLeft:'0.1rem',backgroundColor:'#fff',color:'#00a9e0',borderColor:'#00a9e0'}}>{goodsDetailInfo.evaluateNum}人帮砍</Button>
                            </Flex.Item>
                        </Flex>
                        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>

                        <Flex  style={{padding:'0.25rem 0.2rem'}}>
                            <Flex.Item style={{color:'#666666',fontSize:'0.28rem',lineHeight:'0.45rem'}}>
                                已经有五位亲友帮忙砍价，共砍掉<span style={{color:'#e50414'}}>￥5.00</span>,想以最低价收入囊中。那就赶紧找亲友拔刀相助吧！
                            </Flex.Item>

                        </Flex>

                        <WhiteSpace size="md" style={{background:'#f3f3f3'}}/>
                        <BargainMoreInfo goodsDetailInfo={goodsDetailInfo}></BargainMoreInfo>
                    </div>}
                    <Flex className="bargainBtn">
                        <Flex.Item style={{flex:1}}  >
                            <Button type='primary' onClick={this.showModal2('modal2')} inline style={{height:'0.65rem',width:'42%',margin:'0rem 0.2rem',lineHeight:'0.65rem',backgroundColor:'#ff7841',borderColor:'#ff7841',borderRadius:'5px'}}>找亲友帮我砍刀</Button>
                            <Button type='primary' inline onClick={()=>common.gotoHelpBargainDetail({specId:goodsDetailInfo.specId})} style={{height:'0.65rem',width:'42%',margin:'0rem 0.2rem',lineHeight:'0.65rem',backgroundColor:'#e70012',borderColor:'#e70012',borderRadius:'5px'}}>立即购买</Button>
                        </Flex.Item>
                    </Flex>
                    <Modal
                        // title="这是 title"
                        transparent
                        maskClosable={false}
                        visible={this.state.modal2}
                        onClose={this.onClose('modal1')}
                        footer={[{ text: '取消', onPress: () => { console.log('ok'); this.onClose('modal2')(); } }]}
                    >
                       <img src="./assets/img/bargain_park_01.png"/>
                        <p style={{marginTop:'0.1rem'}}>成功砍价5.8元</p>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default withRouter(GoodsDetail);
