import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {Toast} from 'antd-mobile';
import {common} from 'common';
import {Map} from 'immutable';
import GoodsTop from '../components/GoodsTop';
import GoodsMoreInfo from '../components/GoodsMoreInfo';
import PointsBuy from '../components/PointsBuy';
import * as goodsApi from '../api/pointsGoods';

class GoodsDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsDetailInfo: Map(),
            isSuccess:0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.pointsGoodsId != this.props.params.pointsGoodsId) {
            this.refresh();
        }
    }

    componentDidMount() {
        this.refresh();
    }

    //刷新
    refresh = () => {
        Toast.loading();
        goodsApi.pointsGoodsdetail({
            id:this.props.params.pointsGoodsId
        }).then(result => {
            Toast.hide();
            if (result.result != 1) {
                Toast.fail(result.msg);
                return;
            }
            const goodsDetailInfo = Map(result.data[0]);
            this.setState({
                goodsDetailInfo:goodsDetailInfo,
                isSuccess:1
            });
        });
    }

    render() {
        const goodsDetailInfo = this.state.goodsDetailInfo.toJS();
        if (this.state.isSuccess==0) {
            return  null;
        }
        const pointsGoodsImage=goodsDetailInfo.pointsGoodsImage //商品图片
        const pointsGoodsName=goodsDetailInfo.pointsGoodsName //商品名称
        const pointsGoodsStorePrice=goodsDetailInfo.pointsGoodsStorePrice //积分商品市场价
        const pointsGoodsTransfeeCharge=goodsDetailInfo.pointsGoodsTransfeeCharge //运费
        const pointsGoodsBody=goodsDetailInfo.pointsGoodsBody //积分商品详情

        return (
            <div className="page-content">
                <GoodsTop goodsPrice={pointsGoodsStorePrice} goodsImg={pointsGoodsImage}
                          goodsName={pointsGoodsName} goodsPoints={goodsDetailInfo.pointsnums}
                          pointsGoodsTransfeeCharge={pointsGoodsTransfeeCharge}></GoodsTop>
                <GoodsMoreInfo pointsGoodsBody={pointsGoodsBody}></GoodsMoreInfo>
                <PointsBuy pointsGoodsId={this.props.params.pointsGoodsId}></PointsBuy>
            </div>
        )
    }
}

export default withRouter(GoodsDetail);
