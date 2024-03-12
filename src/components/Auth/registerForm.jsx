import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import CartStore from '../../store/CartStore';
import VerifyForm from './VerifyForm';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Register from '../../helper/register'; 
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ErrorMessage from '../errorMessage';
import {Col,Row} from 'react-bootstrap';


import { Captcha, captchaSettings } from 'reactjs-captcha';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import de from 'date-fns/locale/de'; 

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
registerLocale('de', de);

const RegisterForm = observer(({}) => {
  const password = useRef();
  const cPassword = useRef();
  const loyalty_card_number = useRef();
  const register_firstname = useRef();
  const register_lastname = useRef();
  const register_email = useRef();
  const register_dob = useRef();
  const cartStore = new CartStore();
  const [data, setData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState('form-control');
  const [dobClass, setDobClass] = useState('form-control');

  const [cFirstnameClass, setCFirstnameClass] = useState('form-control');
  const [cagreementsClass, setCAgreementsClass] = useState('');

  const [cLAstnameClass, setCLastnameClass] = useState('form-control');
  const [cEmailClass, setCEmailClass] = useState('form-control');
  const [conlyPasswordClass, setCOnlyPasswordClass] = useState('form-control');
  const [error, setError] = useState('');
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [isRegisterFirstnamDirty, setIsRegisterFirstnamDirty] = useState(false); 
  const [isRegisterLastnameDirty, setIsRegisterLastnameDirty] = useState(false); 
  const [isRegisterEmailDirty, setIsRegisterEmailDirty] = useState(false); 
  const [isRegisterPasswordDirty, setIsRegisterPAsswordDirty] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const [date, setDate] = useState("__.__.____");
  const [startDate, setStartDate] = useState(null);
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;   



  const API = new Register(); 
  const history = useHistory();
  const [token, setToken] = useState('')
  const verifyRecaptchaCallback = React.useCallback((token) => {  
    setToken(token)
  }, []);

  useEffect(() => {
    console.info("in useeee sss");
    cartStore.init();
    fetchData();
    console.info(cartStore);


   // loadCaptchaEnginge(6);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) { 
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid')
      }
    }
    if(isRegisterFirstnamDirty){
      if(register_firstname.current.value == '') {
        console.info("firstname",register_firstname.current.value);
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

  const handleDateChange = (event) => {
    const input = event.target.value;
    let formattedDate = "__.__.____";
    
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d{2}$/;
    regex.test(input)
    
    setDate(event.target.value); 
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); 
  }

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
      setCAgreementsClass('is-valid');


    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkboxValue));
      setCAgreementsClass('form-control is-invalid');

    }
  };

  const checkFirstName = (e) => {
    setIsRegisterFirstnamDirty(true);
    if(isRegisterFirstnamDirty) {
      if(register_firstname.current.value) {
        setShowErrorMessage(false);
        setCFirstnameClass('form-control is-valid')
      }
      else {
        setShowErrorMessage(true)
        setCFirstnameClass('form-control is-invalid')
      }
    }
  }

  const checkLastName = (e) => {
    setIsRegisterLastnameDirty(true);
    if(isRegisterLastnameDirty) {
      if(register_lastname.current.value) {
        setShowErrorMessage(false);
        setCLastnameClass('form-control is-valid')
      }
      else {
        setShowErrorMessage(true)
        setCLastnameClass('form-control is-invalid')
      }
    }
  }

  const checkonlypassword = (e) => {
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
      }
      else if (!/[!@\#$%^&*?_~]/.test(password.current.value)) { 
        setError('Password must contain at least one special character'); 
      } else { 
        setError('');
        setShowErrorMessage(true);
        setCOnlyPasswordClass('form-control is-valid');

        // Perform further actions if password is valid
      }
    };    }

 // }

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

  const fetchData = async () => {
    try {

      API.getCustomerAgreements().then((res) => {
        const data =  res;
        console.info("the result data is as follow=>",data);
        setData(data);
       // setLoading(false);
      });
    
    } catch (error) {
      console.error(error);
    }
  }



  const doSubmit = async () => {
    console.info("selectedCheckboxes",selectedCheckboxes);
    let register_firstname = document.getElementById('register_firstname').value;
    let register_lastname = document.getElementById('register_lastname').value; 
    let register_email = document.getElementById('register_email').value; 
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value; 
    let loyalty_card_number = document.getElementById('loyalty_card_number').value; 
    let dob = document.getElementById('register_dob').value; 

    if(dob && dob!='') {
      let parts = dob.split(".");
      dob = parts[2] + "-" + parts[1] + "-" + parts[0];
    }

  console.info("dob=>",dob);

    let agreements = [];
    if(selectedCheckboxes && selectedCheckboxes.length) {
      selectedCheckboxes.forEach(data=>{
        agreements.push({'agreement_id':data});
      });

      setCAgreementsClass('is-valid');



    }
    else {
      setCAgreementsClass('form-control is-invalid');

    }

    console.info("customer agreements aaaa=>",agreements); 

    if(register_firstname == '') { 
      setShowErrorMessage(true)
      setCFirstnameClass('form-control is-invalid');  
    }

    if(register_lastname == '') {
      setShowErrorMessage(true);
      setCLastnameClass('form-control is-invalid');
    }

    if(register_email == '') {
      setShowErrorMessage(true);
      setCEmailClass('form-control is-invalid');
    }

    if(password == '') {
      setShowErrorMessage(true);
      setCOnlyPasswordClass('form-control is-invalid');
    }

    if(confirm_password == '') {
      setShowErrorMessage(true);
      setCPasswordClass('form-control is-invalid'); 
    }

    if(agreements && agreements.length == 0) { 
      setShowErrorMessage(true)
      setCFirstnameClass('form-control is-invalid');  
    }

   
    if (register_firstname && register_lastname && register_email && password && confirm_password && agreements && agreements.length && dob) { 
      setIsLoading(true);

      let registerData = {
        firstname:register_firstname,
        lastname:register_lastname,
        email_address:register_email,
        password:password,
        password_confirmation:confirm_password,
        agreements:agreements,
        date_of_birth:dob, 
        loyalty_card_number:loyalty_card_number
      };
  
      API.registerForm(registerData).then((res) => {
        if(res == true) {
          console.info("in true block register successful");
          setIsLoading(false);
           // Navigate to the desired route
          history.push(`/verify?email=${encodeURIComponent(register_email)}`);  
        //  return <VerifyForm email={register_email} />; 
           // Using Link component 
        }
        if (res.sku === undefined || res === null) {
          setShowErrorMessage(res.message);
          setIsLoading(false);
  
        } else {
          setShowErrorMessage('');  
          setIsLoading(false);
        }
       // setLoading(false);
      });

    }
    



    
  };

  console.log("the register form is");
  return (
    <>
        <div>
          <div style={{display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
  alignContent: 'center',
  marginTop: '20px',
  border:'none'}}> 
    <i className="fa fa-user-plus" style={{fontSize:'xxx-large'}} aria-hidden="true"></i> 
          </div>
      <h1 style={{textAlign:'center',fontWeight: 400,letterSpacing: '3px'/*! margin-top: 20px; */}}>Registrieren</h1><div>
        <p style={{marginLeft: '20px',textAlign: 'center',letterSpacing: '1px',fontWeight: '500',fontSize: '18px',padding:'0px 20px'}}>Fülle alle Felder aus, um ein kostenloses Kundenkonto anzulegen. Du erhältst im Anschluss eine E-Mail mit einem Bestätigungscode, damit das Konto aktiviert wird.</p></div>
      <div className="card-body">
        <div className="card-text">
        <div className="gurado-storefront-row" style={{marginBottom:'3px',marginTop:'20px'}} > 
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12">
            <input
              type="text"
              placeholder="Vorname*"
              name="register_firstname"
             // className="gurado-storefront-form-control"
              autoComplete="register register_firstname"
              onChange={checkFirstName}
              onPaste = {checkFirstName} 
              className='gurado-storefront-form-control'  
              id="register_firstname" 
              ref={register_firstname}  
              style={{height:'50px',marginBottom:'16px'}}
            />
            {}
          </div>
          </div>
          <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12">
            <input
              type="text"
              placeholder="Nachname*"
              name="register_lastname"
              autoComplete="register_lastname" 
              className='gurado-storefront-form-control'  
              ref= {register_lastname} 
              onChange={checkLastName}
              onPaste = {checkLastName} 
              id="register_lastname"
              style={{height:'50px',marginBottom:'16px'}} 
            />
          </div>

        </div>
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12">
            <input
              type="email"
              placeholder="E-Mail*"
              name="register_email"
              className='gurado-storefront-form-control'  
              id="register_email"
              onChange={checkEmail}
              onPaste = {checkEmail}
              ref = {register_email}
              autoComplete="register register_email"
              style={{height:'50px',marginBottom:'16px'}}
            />
          </div>
        </div>
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-xl-12 gurado-storefront-date-picker">
          <DatePicker className='gurado-storefront-form-control gurado-storefront-date-picker' style={{height:'50px',marginBottom:'16px'}} placeholderText="Geburtsdatum*" name="register_dob" ref={register_dob} id="register_dob"  selected={startDate} dateFormat="dd.MM.yyyy" locale={de} onChange={(date) => setStartDate(date)} />
          </div>
        </div>
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-xl-12 gurado-storefront-col-sm-12">
          <div className="password-input" style={{display:'flex',position:'relative'}}>

            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              id="password"
              className='gurado-storefront-form-control'  
              placeholder="Passwort*"
              onChange={checkonlypassword}
              onPaste = {checkonlypassword}
              autoComplete="register password"
              ref={password}
              style={{height:'50px',marginBottom:'16px'}}
            />
              <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        onClick={toggleShowPassword}
        style={{position:'absolute',right:'20px',marginTop:'20px'}} 
      />

        </div>
        {error && <p style={{color:'red'}}>{error}</p>}

          </div>

          <div className="gurado-storefront-col-md-12 gurado-storefront-col-lg-12 gurado-storefront-col-xl-12 gurado-storefront-col-sm-12">
          <div className="password-input" style={{display:'flex',position:'relative'}}>

            <input
              type={showConfirmPassword ? "text" : "password"} 
              name="confirm_password"
              id="confirm_password"
              ref={cPassword}
              onChange={checkPasswords}
              onPaste = {checkPasswords}
              className='gurado-storefront-form-control'  
              placeholder="Passwort bestätigen*"
              style={{height:'50px',marginBottom:'16px'}}
            />
                  <FontAwesomeIcon
        icon={showConfirmPassword ? faEyeSlash : faEye} 
        onClick={toggleShowConfirmPassword}
        style={{position:'absolute',right:'20px',marginTop:'20px'}}   
      />
      </div>
      {error && <p style={{color:'red'}}>{error}</p>} 

          </div> 
          </div>
          <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
          <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-xl-12 gurado-storefront-col-lg-12">
          <input
              type="text"
              className='gurado-storefront-form-control'
              placeholder="kunderkartecode" 
              name="loyalty_card_number"
              autoComplete="loyalty_card_number"
              ref= {loyalty_card_number} 
              id="loyalty_card_number"
              style={{height:'50px',marginBottom:'16px'}}
            />          </div>
        </div>
      {data && (
        <>
         <div> 
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
        <div className="gurado-storefront-col">

        {data && data.map((item) => (
        <div key={item.agreement_id}>
          <input
            type="checkbox"
            value={item.agreement_id}
            className = {cagreementsClass}
            checked={selectedCheckboxes.includes(item.agreement_id)} 
            onChange={handleCheckboxChange}
            onPaste = {handleCheckboxChange}

            required
          />
          <label style={{marginLeft:'10px'}}>{item.title}</label> 
        </div>
      ))}
        </div>
      </div>
    </div>
        
        
        
        
        
        
        </>

      )}
       
    {showErrorMessage.length > 0 && ( 
            <div style={{ width: '100%',display:'grid',justifyContent:'center',padding:'10px'}}>
              <ErrorMessage message={showErrorMessage.toString()} /> 
            </div>
          )}
     
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
        <div className="col mt-3">
            <div><button style={{width:'100%',letterSpacing:'1px'}}  onClick={() =>doSubmit()}>
              {!isLoading ? ( 
                    <>Jetzt Registrieren</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} 
              </button>
              </div> 
          </div>
        </div>  
        <div className="gurado-storefront-row" style={{marginBottom:'3px'}}>
        <div className="gurado-storefront-col-mt-3" style={{display:'flex',justifyContent:'center'}}> 
        <a href={proxy_url + '/login'} style={{marginTop:'10px',fontSize:'18px'}}>Bereits registriert ? </a>  
          </div>
        </div>
              </div>
      </div>
    </div>
    

    </>
  );
});
export default RegisterForm;  
