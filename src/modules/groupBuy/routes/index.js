import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import groupBuy from './groupBuy';
import spellDetails from './spellDetails';
import spellorder from './spellorder';
import ginsengGroup from './ginsengGroup';
import ginsegOrderList from './ginsegOrderList';
import invoice from './invoice';
import orderDetail from './orderDetail';
import applyAfterSale from './applyAfterSale';
import commentList from './commentList';
import comment from './comment';
import address from './address';
import addressAdd from './addressAdd';
import addressEdit from './addressEdit';

const routesConfig = (<Route path="/" component={App}>
  <Route path='/groupBuy/:storeId' component={groupBuy} title='拼团列表'/>
  <Route path='/spellDetails/:groupId' component={spellDetails} title='拼团详情'/>
  <Route path='/ginsengGroup/:groupDetailId' component={ginsengGroup} title='去参团'/>
  {/*<Route path='/spellorder/:specId/:groupItemId(/:buyCount)/:groupDetailId' component={spellorder} title='拼团订单'/>*/}
  <Route path='/spellorder/:specId/:groupItemId/:groupNumber/:groupDetailId' component={spellorder} title='拼团订单'/>
  <Route path='/ginsegOrderList/(:type)' component={ginsegOrderList} title='我的拼团'/>
  <Route path='/invoice/:invoiceShow/:invContent' component={invoice} title='发票信息' />
  <Route path='/orderDetail/(:id)' component={orderDetail} title='我的拼团详情'/>
  <Route path='/applyAfterSale' component={applyAfterSale} title='退款申请' />
  <Route path='/commentList' component={commentList} title='评价晒单' />
  <Route path='/comment' component={comment} title='评价晒单'/>
  <Route path='/address' component={address} title='收货地址管理' />
  <Route path='/addressAdd' component={addressAdd} title='添加地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑地址'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
