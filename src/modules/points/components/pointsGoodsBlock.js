/**
 * 积分商城商品组件
 * Created by leimingtech-lhm on 2017/5/15.
 */
import React, {Component} from 'react';
import { withRouter } from 'react-router'
import {Img} from 'commonComponent';
import {common} from 'common';
import './css/pointGoods.less'

/**图片在上面，文字在下面的布局 */
class PointsGoodsBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    goToDetail = (PointsGoodsId) => {
        this.props.router.push(`/pointsGoodsDetail/${PointsGoodsId}`);
    }
    goToRedeemNow = () => {
        this.props.router.push(`/redeemNow/${PointsGoodsId}`);
    }

    render() {
        const PointsGoods=this.props.dataPoints;
        return <div className="points-goods-block">
            <div className="imgMax" onClick={()=>this.goToDetail((PointsGoods.id))}>
                <Img src={PointsGoods.pointsGoodsImage} className="img"/>
            </div>
                <div className='points-goods-name text-overflow-hidden' onClick={()=>this.goToDetail((PointsGoods.id))}>{PointsGoods.pointsGoodsName}</div>
                <div className="points-bewrite">兑换价:<span className="goods-price">{PointsGoods.pointsnums}</span> 积分</div>
                <div className="goods-button" onClick={()=>this.goToDetail(PointsGoods.id)}>立即兑换</div>
                </div>
    }
}
export default withRouter(PointsGoodsBlock)