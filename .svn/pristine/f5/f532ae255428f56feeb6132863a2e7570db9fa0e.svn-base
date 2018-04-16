import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import pointsList from './pointsList';
import GoodsDetail from './GoodsDetail.js';
import redeemNow from './redeemNow';
import confirmExchange from './confirmExchange';
import exchangeComplete from './exchangeComplete';
import address from './address';
import addressAdd from './addressAdd';
import addressEdit from './addressEdit';
import pointsOrderList from './pointsOrderList';
import pointsOrderDetail from './pointsOrderDetail';

const routesConfig = (<Route path="/" component={App}>
  <IndexRoute component={pointsList} title='积分商城'/>
  <Route path='pointsGoodsDetail/(:pointsGoodsId)' component={GoodsDetail} title='积分商品详情' />
  <Route path='/redeemNow' component={redeemNow} title='立即兑换' />
  <Route path='/address' component={address} title='收货地址管理' />
  <Route path='/addressAdd' component={addressAdd} title='添加地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑地址'/>
  <Route path='/confirmExchange/:cartId' component={confirmExchange} title='确认兑换' />
  <Route path='/exchangeComplete/:cartId' component={exchangeComplete} title='兑换完成' />
  <Route path='/pointsOrderList/(:type)' component={pointsOrderList} title='积分兑换列表' />
  <Route path='/pointsOrderDetail/(:id)' component={pointsOrderDetail} title='积分列表详情' />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
