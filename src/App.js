import VoucherList from './components/voucherlist/VoucherList';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VoucherPage from './components/voucherpage/voucherpage';
import Checkout from './components/checkout/checkout';
import SuccessPage from './components/success';
function App(props) {
  return (
    <HashRouter>
      <Switch>
        <Route
          path="/voucher/:urlkey"
          render={(props) => (
            <VoucherPage urlKey={props.match.params.urlkey} />
          )}
        />

        <Route
          path="/checkout"
          render={(props) => <Checkout {...props} />}
        />
        <Route
          path="/success"
          render={(props) => <SuccessPage {...props} />}
        />
        <Route
          path="/"
          render={(props) => <VoucherList {...props} />}
        />
      </Switch>
    </HashRouter>
  );
}

export default App;
