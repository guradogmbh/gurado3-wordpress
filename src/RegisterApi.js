import VoucherList from './components/voucherlist/VoucherList';
import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import VoucherPage from './components/voucherpage/voucherpage';
import Checkout from './components/checkout/checkout';
import SuccessPage from './components/success';
import RegisterForm from './components/Auth/registerForm';
//import LoginForm from './components/Auth/LoginForm';
import ForgetPasswordForm from './components/Auth/ForgetPasswordForm';
import VerifyForm from './components/Auth/VerifyForm';
import PageRenderer from './pageRenderer';


function RegisterApi(props) {
  return (
    <HashRouter>
      <Switch>
        {/* <Route
        path="/login"
        render={(props)=><LoginForm/>}  
        /> */}
        <Route path="/verify" component={VerifyForm} props={'aaaa'} /> 

        <Route 
        path="/forget-password"
        render={(props)=><ForgetPasswordForm/>}  
        />
         <Route
        path="/"
        render={(props)=><PageRenderer/>}  
        /> 
      </Switch> 
    </HashRouter> 
  );
}

export default RegisterApi; 
