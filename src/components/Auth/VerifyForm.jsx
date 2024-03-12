import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import useForm from './customHooks'; 
import { useParams } from "react-router-dom";
import Register from '../../helper/register';
import GuradoLoader from '../Loader';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../errorMessage';
import SuccessMessage from '../successMessage';
import {Col,Row} from 'react-bootstrap';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const settingsStore = JSON.parse(localStorage.getItem('settings')); 


const VerifyForm = observer(({props}) => { 
  const verification_code = useRef(); 
  console.info("settingStore is as follow=>",settingsStore);
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;   
 // const [searchParams, setSearchParams] = useParams();
 const [showErrorMessage, setShowErrorMessage] = useState(false); 
 const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

 const [cVerificationClass, setCVerificationClass] = useState('form-control');
 const [isRegisterVerificationDirty, setIsRegisterVerificationDirty] = useState(false); 
 const [isLoading, setIsLoading] = useState(false);
 const [isResendCodeLoading, setIsResendCodeLoading] = useState(false);
 var verifyEmailAddress = '';
 var guradoEmailAddress = '';

 console.info("in verify form");




  const {inputs, handleInputChange, handleSubmit} = useForm({email:'',password:''});
  const emailAddress = window.location.href.split("?");
  console.log(emailAddress); 
  if(emailAddress && emailAddress[1]){
    verifyEmailAddress = emailAddress[1].split("email=");
    guradoEmailAddress = verifyEmailAddress[1];

  }

  const API = new Register();

  const checkVerificationCode = (e) => {
    setIsRegisterVerificationDirty(true);
    if(isRegisterVerificationDirty) {
      if(verification_code.current.value) {
        setShowErrorMessage(false);
        setCVerificationClass('form-control is-valid')
      }
      else {
        setShowErrorMessage(true)
        setCVerificationClass('form-control is-invalid')
      }
    }
  }


  const doSubmit = async (event) => {

    setIsLoading(true);

   // event.preventDefault();
    let gurado_verification_code = document.getElementById('gurado_verification_code').value; 

    let verificationData = {
      confirmation_code:gurado_verification_code,
      email_address:guradoEmailAddress,
    };

    API.verifyForm(verificationData).then((res) => { 
      console.info("in verify loader");
     

      if(res == true) {
        setIsLoading(false);
        window.location = proxy_url + '/login';
      }
      else{
        console.info("res is=>",res);
        if(res && res.code == 'VALIDATION_ERROR') {
          setIsLoading(false);
          setShowErrorMessage('The verification code format is invalid.'); 
        }
      }
    });



  
  };

  const resendCode = async (event) => {
    // event.preventDefault();
     let verificationData = {
       email_address:guradoEmailAddress
     };
 
     API.resendVerificationCode(verificationData).then((res) => {   
       console.info("in verify"); 
       setIsResendCodeLoading(true);

 
       if(res == true) {
        setIsResendCodeLoading(false);

          // Navigate to the desired route
       //  return <VerifyForm email={register_email} />; 
          // Using Link component 
       }
       else{
        setIsResendCodeLoading(false);
         console.info("res is=>",res);
         if(res && res.code == 'VALIDATION_ERROR') {
           alert("error");
           //if(res && res.)
         }
       }
     
      // setLoading(false);
     });
   };


   return (
    <>
            <div>
    <a href={proxy_url + '/register'} style = {{fontSize:'18px',marginLeft:'20px',marginTop:'20px'}}> <FontAwesomeIcon
                //style={{position:'absolute',right:'30px',marginTop:'20px'}}
                icon={faArrowLeft}
      />
          &nbsp;&nbsp;Zuruck</a> 
          <div style={{display: 'grid', 
              justifyContent: 'center',
              textAlign: 'center',
              alignContent: 'center',
              marginTop: '20px',
              border:'none'}}> 
          <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i>
          </div>

          <div><p style={{marginLeft: '20px',textAlign: 'center',letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}>Kontobestätigung ist erforderlich. Bitte beachten Sie dazu den Bestätigungslink in der E-Mail</p></div>
      <div className="card-body">
        <div className="card-text"></div>
      <div className="gurado-storefront-row">
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12">
            <input
              type="input"
              placeholder="Enter Verification Code"
              name="verification_code"
              className={cVerificationClass} 
              id="gurado_verification_code"
              onChange={checkVerificationCode}
              onPaste = {checkVerificationCode}
              autoComplete="email" 
              required={true}
              ref={verification_code} 
              style={{
                height:'50px',
                marginBottom:'16px'
              }}

            />
          </div>
        </div> 
        {showErrorMessage.length > 0 && ( 
            <div style={{ width: '100%',display:'grid',justifyContent:'center',padding:'10px'}}>
              <ErrorMessage message={showErrorMessage.toString()} /> 
            </div>
          )}

      <div className="gurado-storefront-row" style={{marginBottom:'1px'}}>
      <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-xl-12">
      <button
                  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        textTransform:'uppercase',
                      }
                  }
                  onClick={() => doSubmit()} 

                >
                   {!isLoading ? (
                    <>Verify</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button> 
      </div>

      <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-xl-12">
      <button
                  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined 
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        textTransform:'uppercase',
                      }
                  }
                  onClick={() => resendCode()} 

                >
                   {!isResendCodeLoading ? ( 
                    <>Resend Code</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button> 

      </div>
      </div>
      </div>
      </div>
      
      </>
  );
});
export default VerifyForm;    
