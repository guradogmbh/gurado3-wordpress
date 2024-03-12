import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import useForm from './customHooks'; 
import Loader from 'react-loader-spinner';
import Register from '../../helper/register';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../errorMessage';
import {Col,Row} from 'react-bootstrap';

const LoginForm = observer(({ cartStore }) => { 
  const {inputs, handleInputChange, handleSubmit} = useForm({email:'',password:''});
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isRegisterEmailDirty, setIsRegisterEmailDirty] = useState(false); 
  const [cEmailClass, setCEmailClass] = useState('form-control');
  const [error, setError] = useState('');
  const [conlyPasswordClass, setCOnlyPasswordClass] = useState('form-control');
  const [isRegisterPasswordDirty, setIsRegisterPAsswordDirty] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const login_email = useRef();
  const password = useRef(); 
  const [showPassword, setShowPassword] = useState(0);


  const API = new Register();
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;  
  console.info("ProxyUrl is=>",proxy_url); 

  useEffect(() => {
    console.info("if in login profile");
    fetchData();
  }, []); 

  const fetchData = async (responseData = false) => {
    try {

      API.getMyProfile().then((res) => {
        const data =  res;
        if(responseData == true) {
          if(localStorage && localStorage.getItem('customerToken') && localStorage.getItem('customerToken') != '') {
            window.location = proxy_url + '/my-profile';
          }

        }
      }); 
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const doSubmit = async (event) => {
    setIsLoading(true);
   // event.preventDefault();
    let email_address = document.getElementById('login_email').value;  
    let password = document.getElementById('password').value; 
    let loginData = {
      email_address:email_address,
      password:password,
    };

    API.loginForm(loginData).then((res) => { 
      console.info("in Login loader =>",res);  
      setIsLoading(false);


      if(res.status == true) {
        localStorage.setItem('customerToken',res.token);
        window.location = proxy_url+'/my-profile';

        
        setIsLoading(false);
      }
      else{
        console.info("res is=>",res);
        if(res && res.code == 'VALIDATION_ERROR') {
          setIsLoading(false);
          alert("error"); 
          //if(res && res.)
        }
        //ACCOUNT_NOT_CONFIRMED
        else if(res && res.code == 'ACCOUNT_NOT_CONFIRMED')
        {
          setIsLoading(false);
          setShowErrorMessage(res.message); 
          window.location = proxy_url+'/register/#/verify?email='+email_address; 
        }
        
        else {
          setShowErrorMessage(res.message); 

        }
      }
    
     // setLoading(false);
    });
  };


  const checkEmail = (e) => {
    setIsRegisterEmailDirty(true);
    if(isRegisterEmailDirty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.info("email match=>",emailRegex.test(login_email.current.value));  
      if(emailRegex.test(login_email.current.value)) {
        setShowErrorMessage(false);
        setCEmailClass('form-control is-valid')
      }
      else {
        setShowErrorMessage(true);
        setCEmailClass('form-control is-invalid');
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPassword = (e) => {
    setIsRegisterPAsswordDirty(true);
    if(isRegisterPasswordDirty) {
      if (password.current.value.length < 8) {
        setError('Password must be at least 8 characters long');
      } else if (!/[A-Z]/.test(password.current.value)) {
        setError('Password must contain at least one uppercase letter');
      } else if (!/[a-z]/.test(password.current.value)) {
        setError('Password must contain at least one lowercase letter');
      } else if (!/\d/.test(password.current.value)) {
        setError('Password must contain at least one digit');
      } else {
        setError('');
        setShowErrorMessage(true);
        setCOnlyPasswordClass('form-control is-valid');

        // Perform further actions if password is valid
      }
    };    }
  return (
    <>

      <div>
          <div style={{display: 'grid',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            marginTop: '20px',
            border:'none'}}> 
          <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i> 
          </div>
          <div><p style={{marginLeft: '20px',textAlign: 'center'}}>Wenn Du bereits ein Benutzerkonto besitzt, melde Dich bitte hier an. </p></div>
      <div className="card-body">
        <div className="card-text"></div> 
      <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12">
            <input
              type="email"
              placeholder="E-Mail"
              name="login_email"
              className='gurado-storefront-form-control'
              id="login_email"
              ref= {login_email} 
              onChange={checkEmail}
              onPaste={checkEmail}
              autoComplete="email" 
              required={true}
              style={{height:'50px',marginBottom:'16px'}} 
            />
          </div>
          </div>
        <div className="gurado-storefront-row">
          <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12">
          <div className="password-input" style={{display:'flex',position:'relative'}}>
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              id="password"
              className='gurado-storefront-form-control'
              placeholder="Passwort"
              ref= {password} 
              onChange={checkPassword}
              onPaste={checkPassword}
              autoComplete="register register_firstname"
              required={true}
              style={{height:'50px',marginBottom:'16px'}}
            />
             <FontAwesomeIcon
                style={{position:'absolute',right:'20px',marginTop:'20px',fontSize:'16px'}}
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
      />

            </div>
          </div>
          </div>
        {showErrorMessage.length > 0 && ( 
            <div style={{ width: '100%',display:'grid',justifyContent:'center',padding:'10px'}}>
              <ErrorMessage message={showErrorMessage.toString()} /> 
            </div>
          )}
     
          <div className="gurado-storefront-row" style={{marginBottom:'16px'}}>
            <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12 gurado-storefront-col-xl-12">
            <button 
            style={{width:'100%',marginTop:'30px',textTransform:'uppercase'}}
            onClick={()=>doSubmit()} 
            >

                    {!isLoading ? ( 
                    <>Login</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />   
                        </>  
                      )} 
            </button> 

           
            </div>
          </div>

          <div className="my-gurado-storefront-row" style={{display:'grid',justifyContent:'center'}}> 
          <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12" style={{marginBottom:'16px'}}> 
          <a 
                  style= {{
                        width: '100%',
                        marginTop: '30px',
                        textTransform:'uppercase'
                      }} 

                      href={proxy_url+'/forgetpasswordform'} 
                 

                >
                   Password vergessen? </a> 
          </div>

          <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-sm-12"> 
          <a 
                  style={{
                        width: '100%',
                        marginTop: '30px',
                        textTransform:'uppercase'

                      }}  

                      href={proxy_url+'/register'} 
                    
                   // onClick={() => doSubmit()}  
                >
                   Noch keinen Account? </a> 
           
          </div>
          </div>

        </div>
        </div> 
        


    </>
  );
});
export default LoginForm;   
