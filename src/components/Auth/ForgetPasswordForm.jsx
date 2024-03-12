import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha'; 
import Register from '../../helper/register';
import { useHistory } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../errorMessage';
import {Col,Row} from 'react-bootstrap';


const ForgetPasswordForm = observer(({ cartStore }) => {  
  const password = useRef();
  const cPassword = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState('form-control');
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [cEmailClass, setCEmailClass] = useState('form-control');
  const [isLoading, setIsLoading] = useState(false);
  const register_email = useRef(); 
  const [isRegisterEmailDirty, setIsRegisterEmailDirty] = useState(false); 
  const history = useHistory();
  const API = new Register();
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;   

  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  }; 

  const [token, setToken] = useState('')
  const verifyRecaptchaCallback = React.useCallback((token) => { 
    setToken(token)
  }, []);

  useEffect(() => {
    loadCaptchaEnginge(6);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) { 
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid')
      }
    }
  }, [isCPasswordDirty]) 

  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid')
      }
    }

  }


  const checkEmail = (e) => {
    setIsRegisterEmailDirty(true);
    if(isRegisterEmailDirty) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.info("email match=>",emailRegex.test(register_email.current.value)); 
      if(emailRegex.test(register_email.current.value)) {
        setShowErrorMessage(false);
        setCEmailClass('form-control is-valid')
      }
      else {
        setShowErrorMessage(true);
        setCEmailClass('form-control is-invalid');
      }
    }
  }

  const doSubmit = () => {
    let user_captcha = document.getElementById('user_captcha_input').value;
    console.info("validate captcha",user_captcha);
    let email = document.getElementById('register_email').value; 

    if (validateCaptcha(user_captcha) == true) {
      alert('Captcha Matched');
      loadCaptchaEnginge(6);
     // document.getElementById('user_captcha_input').value = "";
      let forgetPasswordData = {
        email_address:email,
      };
      setIsLoading(true);
  
  
      API.forgetPasswordForm(forgetPasswordData).then((res) => {
        setIsLoading(true);
        console.info("in true block register successful",res);
        if(res == true) {
          setIsLoading(false);
          window.location = proxy_url + '/login'; 
        }
        else if(res && res.code == 'ACCOUNT_NOT_CONFIRMED')
        {
          setIsLoading(false);
          setShowErrorMessage(res.message); 
          window.location = proxy_url+'/register/#/verify?email='+email;  
        }
         else {
          setShowErrorMessage(res.message);  
          setIsLoading(false);
        }
       // setLoading(false);
      });
    }
    else {
      alert('Captcha Does Not Match');
      document.getElementById('user_captcha_input').value = ""; 
    }
  };

  console.log("the register form is");
  return (
    <>
      <div> 
      <a href={proxy_url + '/login'} style = {{fontSize:'18px',marginLeft:'20px',marginTop:'20px'}}>
      <FontAwesomeIcon
                //style={{position:'absolute',right:'30px',marginTop:'20px'}}
                icon={faArrowLeft}
      />
          &nbsp;&nbsp;Back to login</a>  

          <div style={{display: 'grid',
            justifyContent: 'center', 
            textAlign: 'center',
            alignContent: 'center',
            marginTop: '20px',
            border:'none'}}> 
          <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i>
          </div>      
          <div><h5 style={{marginLeft: '20px',textAlign: 'center',letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}> PASSWORT VERGESSEN? </h5></div> 
          <div><h5 style={{marginLeft: '20px',textAlign: 'center',letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}> Gib Deine E-Mail-Adresse ein, um einen Code per E-Mail zu erhalten, mit dem Du Dein Passwort zurücksetzen kannst. </h5></div>   


      <div className="card-body">
        <div className="card-text">
        <div style={{marginTop:'-20px'}}>   

        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12" Col sm={12}>
          <div style={{ marginBottom: '3px' }}>
      <div style={{ marginBottom: '16px', position: 'relative' }}>
        <input
          type="email"
          placeholder=""
          name="register_email"
          style={{
            height: '50px',
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
          id="register_email"
          value={email}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          autoComplete="register_email"
        />
        <label
          htmlFor="register_email"
          style={{
            position: 'absolute',
            top: isFocused || email ? '-4px' : '50%',
            paddingTop: isFocused || email ? '5px' : '',  
            left: '10px',
            transform: isFocused || email ? 'translateY(0)' : 'translateY(-50%)', 
            pointerEvents: 'none',
            color: isFocused || email ? '#888' : '#000',
            transition: '0.2s',
            fontSize: isFocused || email ? '14px' : '16px',
          }}
        >
          E-Mail
        </label>
      </div>
    </div>
          </div>
          </div>

          <div className="gurado-storefront-row">
          <div className="gurado-storefront-col-md-6 gurado-storefront-col-xl-6" style={{height:'50px',marginBottom:'16px'}}>  
            <LoadCanvasTemplateNoReload className={cEmailClass}/> 
          </div>
          <div className="gurado-storefront-col-md-6 gurado-storefront-col-xl-6">
            <div><input className='gurado-storefront-form-control' style={{height:'50px',marginBottom:'16px'}} placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
          </div>
          </div>
          </div>

          {showErrorMessage.length > 0 && ( 
            <div style={{ width: '100%',display:'grid',justifyContent:'center',padding:'10px',fontSize:'20px'}}> 
              <ErrorMessage message={showErrorMessage.toString()} /> 
            </div>
          )}


          <div className="gurado-storefront-row"> 
            <div className="gurado-storefront-col-xl-12 gurado-storefront-col-md-12 gurado-storefront-col-lg-12">
            <div><button style={{width:'100%',textTransform:'uppercase'}} className="btn btn-primary" onClick={() => doSubmit()}>
            {!isLoading ? (
                    <>Passwort zurücksetzen</> 
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )}
              </button></div>  
              </div>
            </div>
           </div>
          </div>
      </div>

    </>
  );
});
export default ForgetPasswordForm;   
