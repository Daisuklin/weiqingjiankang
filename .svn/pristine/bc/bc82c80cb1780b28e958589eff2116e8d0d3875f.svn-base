import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';

import timeBuy from './timeBuy';
import timeBuyDetail from './timeBuyDetail';
import evaluteList from './evaluteList';


const routesConfig = (<Route path="/" component={App}>
  <Route path='/timeBuy/:storeId' component={timeBuy} title='秒杀'/>
  <Route path='/timeBuyDetail/:specId' component={timeBuyDetail} title='秒杀详情'/>
  <Route path='/evaluteList/:specId' component={evaluteList} title='特卖详情'/>
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
