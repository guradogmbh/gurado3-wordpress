import VoucherList from './components/voucherlist/VoucherList';
import Api from './helper/api';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VoucherDetails from './components/itempage/VoucherDetails';
import CartView from './components/checkout/cartView';
import Payment from './components/checkout/Payment';
import PaymentSuccess from './components/checkout/PaymentSuccess';

function App(props) {
  const api = new Api();

  return (
    <HashRouter>
      <Switch>
        <Route
          path="/voucher/:urlkey"
          render={(props) => <VoucherDetails {...props} API={api} />}
        />
        <Route
          path="/cart"
          render={(props) => <CartView {...props} API={api} />}
        />
        <Route
          path="/checkout"
          render={(props) => <Payment {...props} API={api} />}
        />
        <Route
          path="/success"
          render={(props) => <PaymentSuccess {...props} />}
        />
        <Route
          path="/"
          render={(props) => <VoucherList {...props} API={api} />}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
