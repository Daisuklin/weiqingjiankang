import React, {Component} from 'react';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as pointsGoodsApi from '../api/pointsGoods';
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Flex,
    ListView,
    Button,
    Modal
} from 'antd-mobile';

class OrderItem extends Component {


    gotoOrderDetail = (orderList) => {
        this.props.router.push('/pointsOrderDetail/' + orderList.id)
    }
    // 确认订单
    finishorder = (orderList) => {
        Modal.alert('提示', <div style={{padding:'0.1rem 0rem'}}>是否确认收货</div>, [
            { text: '取消' },
            {
                text: '确定',
                onPress: () => {
                    pointsGoodsApi.finishOrder({
                        orderid: orderList.id
                    }).then(result => {
                        if (result.result == 1) {
                            this.props.finishorder();
                        }
                    })
                }
            }
        ]);
    }

    render() {
        const {orderList} = this.props;
        let orderStatus = '';
        // 确认收货
        let showCompleteBtn = false;
        // 查看物流
        let showViewDeleveryBtn = false;
        switch (orderList.pointOrderstate) {
            case 30:
                orderStatus = ' 已兑换并扣除积分'
                break;
            case 40:
                orderStatus = '已完成'
                showCompleteBtn = true;
                /*if (orderList.evaluationStatus != 1) {
                    showCompleteBtn = true;
                }*/
                break;
            case 50:
                orderStatus = '已收货'
                break;
            case 60:
                orderStatus = '已完成'
                break;
            case 70:
                orderStatus = '已取消'
                break;
            default:
                break;
        }
        console.log(orderList)
        return <div className='orderitem'>
            <WhiteSpace style={{backgroundColor: '#f3f3f3'}}></WhiteSpace>
            <Flex justify='between' style={{padding: '0.23rem 0.26rem', borderBottom: '1px solid #e5e5e5'}}>
                <div style={{color: '#333', fontSize: '0.28rem'}}><img
                    src="./assets/img/weiqing/dianpu-01@2x.png" style={{
                    width: '0.28rem',
                    height: '0.28rem',
                    paddingRight: '0.1rem',
                    position: 'relative',
                    top: '0.03rem'
                }}/>{/*{dataItem.storeName}*/}卫青健康
                </div>
                <div className="paystaus"
                     style={{color: '#00a9df', fontSize: '0.24rem'}}>{orderStatus}</div>
            </Flex>
            {
                orderList.orderGoodsList.map((orderGoods, index) => {
                    return <div style={{backgroundColor: '#fff'}} key={index}>
                        <div style={{borderBottom: '1px solid #e5e5e5'}}>
                            <Flex onClick={() => this.gotoOrderDetail(orderList) } style={{padding: '0.2rem 0.26rem'}}>
                                <div style={{width: '1.62rem', height: '1.62rem'}}>
                                    <Img src={orderGoods.pointGoodsimage} style={{width: '1.62rem', height: '1.62rem'}}/>
                                </div>
                                <div style={{marginLeft: '0.2rem'}}>
                                    <div style={{
                                        color: '#333',
                                        fontSize: '0.28rem',
                                        marginBottom: '0.15rem',
                                        maxHeight: '0.64rem',
                                        lineHeight: '0.35rem',
                                        overflow: 'hidden'
                                    }}>{orderGoods.pointGoodsname}</div>
                                    {/*<div style={{color:'#888',fontSize:'0.24rem',paddingBottom:'0.15rem'}}></div>*/}
                                    <div style={{color: '#888', fontSize: '0.24rem', paddingBottom: '0.15rem'}}>
                                        数量：{orderGoods.pointGoodsnum}</div>
                                    <div style={{
                                        color: '#e9321f',
                                        fontSize: '0.26rem'
                                    }}>{`消耗积分：${(orderGoods.pointGoodsnum*orderGoods.pointGoodspoints)}`}</div>
                                </div>
                            </Flex>
                        </div>
                        <WhiteSpace></WhiteSpace>
                    </div>
                })
            }

            <Flex justify='end' style={{padding: '0px 0.26rem'}}>
                <div>
                    {
                        showCompleteBtn && <Button
                            onClick={(e) => this.finishorder(orderList)}
                            style={{ marginLeft: '0.1rem',borderColor:'#d7d7d7',color:'#333',fongSize:'0.26rem',marginRight:'0.2rem' }} type='ghost' size='small' inline>确认收货</Button>
                    }
                    <Button
                        onClick={(e) => this.gotoOrderDetail(orderList)}
                        type='ghost' size='small' inline
                        style={{borderColor: '#d7d7d7', color: '#333', fongSize: '0.26rem'}}>查看详情</Button>
                </div>
            </Flex>
            <WhiteSpace></WhiteSpace>
        </div>
    }
}

export default withRouter(OrderItem);
