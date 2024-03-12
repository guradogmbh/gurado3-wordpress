import VoucherList from './components/voucherlist/VoucherList';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VoucherPage from './components/voucherpage/voucherpage';
import Checkout from './components/checkout/checkout';
import SuccessPage from './components/success';
import RegisterForm from './components/Auth/registerForm';
import LoginForm from './components/Auth/LoginForm';
import ForgetPasswordForm from './components/Auth/ForgetPasswordForm';
import VerifyForm from './components/Auth/VerifyForm';
import leftSection from './components/Customer/leftSection';
import PageRenderer from './pageRenderer';

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
        path="/register"
        render={(props)=><RegisterForm/>}  
        /> 
        <Route
        path="/login"
        render={(props)=><LoginForm/>}  
        />
        <Route
        path="/verify/:emailAddress"
        render={(props)=>(
          <VerifyForm emailAddress={props.match.params.emailAddress} /> 
        )}
        />

        <Route 
        path="/forget-password"
        render={(props)=><ForgetPasswordForm/>} 
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
          render={(props) => <VoucherList />}   
        />
       
      </Switch> 
    </HashRouter>
  );
}

export default App;
