import React, {Component} from 'react';
import {Img} from 'commonComponent';
import {common} from 'common';
import * as orderApi from '../api/order';
import {withRouter} from 'react-router'
import {
    WhiteSpace,
    WingBlank,
    Flex,
    ListView,
    Button,
    Modal
} from 'antd-mobile';

class AfterSaleOrderItem extends Component {

    cancelOrder = (orderItem) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                orderItem,
                type: 1 // type 1代表取消订单
            }
        })
//  Modal.alert('提示', '是否取消订单', [
//    { text: '取消' },
//    {
//      text: '确定',
//      onPress: () => {
//        orderApi.cancleorder({
//          ordersn: orderItem.orderSn
//        }).then(result => {
//          if (result.result == 1) {
//            // 取消成功
//            if (this.props.cancelOrder) {
//              this.props.cancelOrder();
//            }
//          }
//        })
//      }
//    },
//  ]);
    }

    gotoApply = (dataItem, goods) => {
        this.props.router.push({
            pathname: '/applyAfterSale',
            state: {
                orderItem: dataItem,
                goodsItem: goods,
                type: 2 // type 2代表申请售后
            }
        })
    }

    gotoOrderDetail = (goods) => {
        this.props.router.push('/orderDetail/' + goods.orderId)
    }

    render() {
        const {dataItem} = this.props;
        let orderStatus = '';
        let showCancelBtn = false;
        let showApplyBtn = false;
        let hidden=false;

        switch (dataItem.orderState) {
            case 20:
                orderStatus = '等待发货'
                showCancelBtn = true;
                break;
            case 30:
                orderStatus = '已发货'
                showApplyBtn = true;
                break;
            case 40:
                orderStatus = '已完成'
                showApplyBtn = true;
                break;
        }

        if (dataItem.lockState==1) {
            showApplyBtn=true;
            // hidden=true;
        }
        function formatDate(now) {
            var year = now.getYear() - 100;
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }

        let d = new Date(dataItem.createTime);

        return <div className='orderitem'>
            {dataItem.orderState == 30 ? '' : <WhiteSpace></WhiteSpace>}
            <div >
                <Flex justify='between' style={{borderBottom: '1px solid #e5e5e5', padding: '0.2rem 0.26rem'}}>
                    {/*<div onClick={()=>console.log(dataItem)}>{dataItem.orderState==30?'':dataItem.storeName}</div>*/}
                    <div className="orderitem_top">
                        <div onClick={() => console.log(dataItem)}
                             style={{fontSize: '0.22rem', color: '#666', paddingBottom: '0.18rem'}}>
                            订单编号：{dataItem.orderSn}</div>

                        <div style={{fontSize: '0.22rem', color: '#666'}}>下单时间：{formatDate(d)}</div>
                    </div>
                    <div className="paystaus">{orderStatus}</div>
                </Flex>
                {
                    dataItem.orderGoodsList.map(goods => {
                        return <div key={goods.specId} className="orderItem_list">
                            <Flex onClick={() => this.gotoOrderDetail(goods)}>
                                <div style={{width: '2rem', height: '2rem'}}>
                                    <Img src={goods.goodsImage} style={{width: '2rem', height: '2rem'}}/>
                                </div>
                                <div className="orderItem_list_r">
                                    <div style={{
                                        margin: '0.1rem 0px 0.15rem',
                                        height: '0.8rem',
                                        lineHeight: '0.4rem',
                                        overflow: 'hidden',
                                        fontSize: '0.28rem', color: '#333'
                                    }}>{goods.goodsName}</div>
                                    <div className="orderItem_list_item2">规格：{goods.specInfo}</div>
                                    <div className="orderItem_list_item2">数量：{goods.goodsNum}</div>
                                    {/*<div className="orderItem_list_item2">退货时间：2017-05-25</div>*/}
                                    {/*<p style={{fontSize:'.24rem',color:'gray',marginLeft:'0.2rem'}} dangerouslySetInnerHTML={{ __html: goods.specInfo }}></p>*/}
                                </div>
                            </Flex>
                            <Flex justify='end'>
                                {
                                    showApplyBtn && <Button
                                        onClick={(e) => this.gotoApply(dataItem, goods)}
                                        type='ghost' size='small' inline>申请售后</Button>
                                }
                                {
                                    hidden&&<Button type='warning' size='small' across style={{borderRight:'1px solid #ddd',borderLeft:'1px solid #ddd',borderRadius:'10px'}} >已申请</Button>
                                }
                            </Flex>
                        </div>
                    })
                }
                {dataItem.orderState == 30 ? '' : <WhiteSpace></WhiteSpace>}
                <Flex justify='end' style={{padding: '0rem 0.26rem'}}>
                    {/*{dataItem.orderState==30?'':<div>实付款: {`￥${dataItem.goodsAmount}`}</div>}*/}
                    <div >
                        {
                            showCancelBtn && <Button
                                onClick={(e) => this.cancelOrder(dataItem)}
                                type='ghost' size='small' inline
                                style={{borderColor: '#d7d7d7', color: '#333'}}>取消订单</Button>
                        }
                    </div>
                </Flex>
                {dataItem.orderState == 30 ? '' : <WhiteSpace></WhiteSpace>}
            </div>
            {<WhiteSpace style={{backgroundColor: '#ebebef'}}></WhiteSpace>}
        </div>
    }
}

export default withRouter(AfterSaleOrderItem);
