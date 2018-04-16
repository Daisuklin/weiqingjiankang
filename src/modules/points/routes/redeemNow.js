/**
 * 积分商城立即兑换
 * Created by leimingtech-lhm on 2017/5/12.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router'
import {Toast, Flex, List, Stepper, WhiteSpace, Button, Checkbox, Popup} from 'antd-mobile';
import {Img} from 'commonComponent';
import {common} from 'common';
import {Map} from 'immutable'
import CartShop from  '../components/CartShop'
import CartTop from  '../components/CartTopAction'
import * as goodsApi from '../api/pointsGoods';
import '../components/css/pointGoods.less'

const AgreeItem = Checkbox.AgreeItem;

class reddemNow extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired,
        initAction: PropTypes.func,
        clearAction: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            shopCarlist: Map(),
            goodsTotalPrice: 0.00,
            editStatus: 0,
            init: false

        }
    }

    componentWillUnmount() {
        this.context.clearAction();
    }

    componentDidMount() {
        Toast.loading();
        this.initAction();
        this.refreshCartList();
        this.refreshTotalPriceAndCount(this.state.shopCarlist);
    }

    initAction = () => {
        // 绑定头部事件
        this.context.initAction({
            title: <CartTop status={this.state.editStatus} onChange={this.onChangeEditStatus}></CartTop>
        })
    }

    refreshCartList = () => {
        goodsApi.shopCarlist({}).then(result => {
            if (result.result == 1) {
                Toast.hide();
                let data = result.data;
                let cartList = data[0].list || [];
                this.setState({
                    shopCarlist: cartList,
                    editStatus: 0,
                    init: true
                });
                this.initAction();
                this.refreshTotalPriceAndCount(cartList);
            }
        });
    }

    onChangeEditStatus = (status) => {
        this.setState({
            editStatus: status
        })
    }

    gotoBuy = () => {
        let cartId = [];
        this.state.shopCarlist.forEach(cart => {
                if (cart.checked) {
                    cartId.push(cart.id);
                }
        })
        if (cartId.length == 0) {
            Toast.info('请先选择商品', 1)
            return;
        }
        this.props.router.push("/confirmExchange/"+ cartId.join(','))
    }

    updateCart = (goods, num) => {
        goodsApi.changeTheNumberOfShoppingCarts({
            shopPointsCartId: goods.id,
            pointsGoodsNum: num
        }).then(result => {
            if (result.result == 1) {
                // 修改商品数量
                goods.pgoodsChoosenum = num;
                //选中商品
                this.checkGoods(goods.pgoodsId, true);
            }
        });
    }

    delCart = (ids) => {
        goodsApi.delCartGoods({ids: ids}).then(result => {
            if (result.result == 1) {
                this.refreshCartList();
            } else {
                Toast.info(result.msg)
            }
        })
    }

    // 选择购物车
    checkGoods = (pgoodsId, checked) => {
        // 遍历当前店铺的所有商品
        const checkedList = this.state.shopCarlist.map(goods => {
            if (pgoodsId == goods.pgoodsId) {
                goods.checked = checked;
            }
            return goods
        })

        let isCheckAll = true;
        if (this.state.shopCarlist.find(goods => !goods.checked)) {
            isCheckAll = false;
        }
        this.setState({
            checkAll: isCheckAll
        });
        this.refreshTotalPriceAndCount(checkedList);
    }

    //删除选中的商品
    delBySelected = () => {
        let cartId = [];
        this.state.shopCarlist.forEach(goods => {
            if (goods.checked) {
                cartId.push(goods.id);
            }
        })
        if (cartId.length == 0) {
            Toast.info('请先选择商品', 1)
            return;
        }
        goodsApi.delCartGoods({ids: cartId.join(',')}).then(result => {
            if (result.result == 1) {
                Toast.info('删除成功', 1, () => {
                    this.refreshCartList();
                })
            }
        })
    }

    //全选
    checkAll = (checked) => {
        const cartList = this.state.shopCarlist.map(goods => {
            goods.checked = checked;
            return goods;
        })
        this.setState({
            checkAll: checked,
            shopCarlist: cartList
        });
        this.refreshTotalPriceAndCount(cartList);
    }

    // 刷新数量和金额
    refreshTotalPriceAndCount = (cartList) => {
        let totalPrice = 0;
        let goodsNum = 0;
        cartList.forEach(goods => {
            if (goods.checked) {
                goodsNum += goods.pgoodsChoosenum
                totalPrice = totalPrice + goods.pgoodsPoints * goods.pgoodsChoosenum;
            }
        });
        this.setState({
            goodsNum,
            goodsTotalPrice: totalPrice
        })
    }

    render() {
        const {
            shopCarlist,
            editStatus
        } = this.state;

        if (!this.state.init) {
            return null
        }
        return (
            <div className="points_redeemNow">
                {
                    shopCarlist && shopCarlist.map((PointsGoods, index) => {
                        return <CartShop key={index} goods={PointsGoods} updateCart={this.updateCart}
                                         delCart={this.delCart} checkGoods={this.checkGoods}></CartShop>
                    })
                }
                {
                    shopCarlist.length == 0 &&
                    <div style={{padding: '20px 20px'}}>
                        <img src={`${common.SERVER_DOMAIN}/res_v4.0/h5/images/b_3.png`}></img>
                        <span style={{fontSize: '28px', color: 'gray'}}>请先选择您要兑换的积分礼品</span>
                    </div>
                }
                {/*<WhiteSpace size="md" style={{background: '#f3f3f3'}}/>*/}
                <div style={{position: 'fixed', bottom: ' 0rem', left: '0px', width: '100%',}}>
                    <div className='wx-cart-list-bar'>
                        <Flex style={{background:'#fff',height:'0.9rem',lineHeight:'0.9rem',paddingLeft:'0.26rem'}}>
                            {
                                editStatus == 0 ?[] : [<Flex.Item>
                                    <AgreeItem checked={this.state.checkAll}
                                               onChange={(e) => this.checkAll(e.target.checked)} className="car_agreeItem"
                                    >全选</AgreeItem>
                                </Flex.Item>]
                            }

                            {
                                editStatus == 0 ? [
                                    <Flex.Item key={1} style={{flex:2}}>
                                        <div style={{
                                            minWidth: '100px',
                                            height: '0.9rem',
                                            lineHeight: '0.9rem',
                                            fontSise: '0.28rem',
                                            color: '#666'
                                        }}>积分总计: {this.state.goodsTotalPrice}积分
                                        </div>
                                        {/*<span>共{this.state.goodsNum}件</span>*/}
                                    </Flex.Item>,
                                    <Flex.Item key={2} style={{
                                        textAlign: 'right',flex:1
                                    }}>
                                        <Button type='primary' size='small' inline onClick={this.gotoBuy} style={{
                                            height: '100%',
                                            width: '100%',
                                            background: '#e1536b',
                                            fontSize: '0.28rem',
                                            borderRadius: '0px',
                                            lineHeight: '0.9rem'
                                        }}>确认兑换</Button>
                                    </Flex.Item>
                                ] : [
                                    <Flex.Item key={1}>
                                        <Button size='small' inline onClick={this.delBySelected}>删除</Button>
                                    </Flex.Item>,
                                    <Flex.Item key={2}>&nbsp;</Flex.Item>
                                ]
                            }

                        </Flex>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(reddemNow);
