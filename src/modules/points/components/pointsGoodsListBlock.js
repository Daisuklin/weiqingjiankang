/**
 * 积分商城列表模块
 * Created by leimingtech-lhm on 2017/5/15.
 */
import React, {Component} from 'react';
import {Img} from 'commonComponent';
import {Toast,Flex} from 'antd-mobile';
import PointsGoodsBlock from './pointsGoodsBlock';
import {withRouter} from 'react-router'

const IconClass = ({url}) => {
    return <div style={{
        width: '0.50rem',
        height: '0.50rem',
        background: `url(${url}) center center /  0.44rem 0.44rem no-repeat`,
        display: 'inline-block',
        marginRight: '0.1rem'
    }}
    />
}

class PointsGoodsListBlock extends Component {

    render() {
        const pointsGoodsList=this.props.pointsGoodsList;

        let goodsList=pointsGoodsList && pointsGoodsList.map((pointsGoods,index)=>{
                return <PointsGoodsBlock  key={index} dataPoints={pointsGoods}></PointsGoodsBlock>
            })
        return <div style={{background:'#eee',overflow:'hidden',paddingBottom:'0.2rem'}}>{goodsList}</div>
    }
}

export default withRouter(PointsGoodsListBlock);