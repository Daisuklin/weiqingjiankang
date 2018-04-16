import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from 'container/appView';
// import cashier from './cashier';
import cashierList from './cashierList';
import payConfirm from './payConfirm';
import paySuccess from './paySuccess';
import payPointsSuccess from './payPointsSuccess';
import friendsPay from './friendsPay';


const routesConfig = (<Route path="/" component={App}>
  {/*<Route path='cashier/:orderCode/:totalPrice' component={cashier} title='选择支付方式' />*/}
  <Route path='/cashierList/:orderCode/:totalPrice' component={cashierList} title='选择支付方式' />
  <Route path='/payConfirm/:orderCode/:totalPrice' component={payConfirm} title='支付确认' />
  <Route path='/paySuccess/:paySn' component={paySuccess} title='订单支付成功' />
  <Route path='/payPointsSuccess/:orderId' component={payPointsSuccess} title='订单支付成功' />
  <Route path='/friendsPay/:orderCode' component={friendsPay} title='朋友代付' showTitle={false} />
</Route>)

function Routes({ history }) {
  return (
    <Router history={history}>
      {routesConfig}
    </Router>
  );
}

export default Routes;
