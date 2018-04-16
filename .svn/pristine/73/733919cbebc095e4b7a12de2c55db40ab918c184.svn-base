import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import crowdFunding from './crowdFunding';
import crowdFundingDetail from './crowdFundingDetail';
import crowdFundingLuck from './crowdFundingLuck';
import crowdFundingFree from './crowdFundingFree';
import viewDetails from './viewDetails';
import address from './address';
import addressAdd from './addressAdd';
import addressEdit from './addressEdit';
import crowdFundingOrderList from './crowdFundingOrderList';
import applyAfterSale from './applyAfterSale';
const routesConfig = (<Route path="/" component={App}>
  <Route path='/address' component={address} title='收货地址管理' />
  <Route path='/addressAdd' component={addressAdd} title='添加地址' />
  <Route path='/addressEdit' component={addressEdit} title='编辑地址'/>
  <Route path='/crowdFunding/:storeId' component={crowdFunding} title='众筹列表'/>
  <Route path='/crowdFundingDetail/:raiseId' component={crowdFundingDetail} title='众筹详情'/>
  <Route path='/crowdFundingLuck/:raiseItemId' component={crowdFundingLuck} title='抽奖党'/>
  <Route path='/crowdFundingFree/:raiseItemId' component={crowdFundingFree} title='捐款党'/>
  <Route path='/viewDetails/:raiseId' component={viewDetails} title='查看详情'/>
  <Route path='/crowdFundingOrderList/(:type)' component={crowdFundingOrderList} title='我的众筹'/>
  <Route path='/applyAfterSale' component={applyAfterSale} title='退款申请' />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
