import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import RegisterForm from './components/Auth/registerForm';
function Register(props) {
  return (
    <HashRouter>
      <Switch>
         <Route
        path="/" 
        render={(props)=><RegisterForm/>}  
        /> 
      </Switch> 
    </HashRouter>
  );
}

export default Register;
