import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RegiserApi from './RegisterApi';
import RegisterForm from './components/Auth/registerForm';
import VoucherList from './components/voucherlist/VoucherList';
import ProductDetails from './components/voucherpage/ProductDetails';
import VoucherPage from './components/voucherpage/voucherpage';
import LoginForm from './components/Auth/LoginForm';
import reportWebVitals from './reportWebVitals';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './il8n'; 
if (
  document.getElementById('gurado-react') !== null &&
  document.getElementById('gurado-react') !== undefined
) {
  //ReactDOM.render(<App />, document.getElementById('gurado-react'));
}

const shortcodeElement = document.getElementById('my-react-container');
  console.info("shortcodeElement",shortcodeElement);

if (shortcodeElement) {
    ReactDOM.render(<RegiserApi />, shortcodeElement);   
}

const verificationElement = document.getElementById('my-react-verification-container');
if (verificationElement) {
  ReactDOM.render(<h1>In verification</h1>, verificationElement);   
}

const productList = document.getElementById('my-react-product-list-container');

if (productList !== null && productList !== undefined) {  
  ReactDOM.render(<App />, productList);     
}

const productDetails1 = document.getElementById('my-react-product-details-container');

if(productDetails1 !== null && productDetails1 !== undefined)  {
  ReactDOM.render(<ProductDetails/>,productDetails1);  
}

const login = document.getElementById('my-react-login-page-container');

if(login !== null && login !== undefined) { 
  alert("hi");
  ReactDOM.render(<LoginForm/>,login);   

}





//my-react-product-list-container
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
