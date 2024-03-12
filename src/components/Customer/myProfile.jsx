import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import Register from '../../helper/register'; 
import Loader from 'react-loader-spinner';
import DatePipe from '../../pipes/date';
import {Col,Row} from 'react-bootstrap';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';




const MyProfileForm = observer(({ cartStore }) => { 
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const API = new Register(); 
  const register_firstname = useRef();
  const register_lastname = useRef();
  const register_email = useRef();
  const dob = useRef();
  const deletion_code = useRef()
  const current_password = useRef();
  const password = useRef();
  const cPassword = useRef();

  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [conlyPasswordClass, setCOnlyPasswordClass] = useState('form-control');




  const [cFirstnameClass, setCFirstnameClass] = useState('form-control');
  const [cLAstnameClass, setCLastnameClass] = useState('form-control');
  const [cEmailClass, setCEmailClass] = useState('form-control');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCustomerLoading,setIsDeleteCustomerLoading] = useState(false);
  const [error, setError] = useState('');



  const [isRegisterFirstnamDirty, setIsRegisterFirstnamDirty] = useState(false); 
  const [date_of_birth, setDateOfBirth] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isRegisterLastnameDirty, setIsRegisterLastnameDirty] = useState(false); 
  const [isRegisterEmailDirty, setIsRegisterEmailDirty] = useState(false); 
  const [cPasswordClass, setCPasswordClass] = useState('form-control');
  const [isRegisterPasswordDirty, setIsRegisterPAsswordDirty] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]  = useState(false);

  const [showProfile,setShowProfile] = useState(false);
  const [showDeletePopup,setShowDeletePopup] = useState(false); 
  const [formattedDate, setFormattedDate] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false); 
  const [showDeletionText,setShowDeletionText] = useState(false);
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;  
  const modalRef = useRef(null);

  useEffect(() => { 
    fetchData();
    setShowProfile(true);
    console.info("in use effect 123 showProfile");

    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) { 
        setShowErrorMessage(false);
        setCPasswordClass('form-control is-valid')
      } else {
        setShowErrorMessage(true)
        setCPasswordClass('form-control is-invalid') 
      }
    }
  }, []);  


  const doSubmit = async () => {
    setIsLoading(true);

    let register_firstname = document.getElementById('register_firstname').value;
    let register_lastname = document.getElementById('register_lastname').value; 
    let register_email = document.getElementById('register_email').value; 
    let dob = document.getElementById('date_of_birth').value;
    console.info("the dob is as follow=>",dob);
    if(dob && dob!='') {
      let parts = dob.split(".");
      dob = parts[2] + "-" + parts[1] + "-" + parts[0];
    }

  


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

   

    let registerData = {
      firstname:register_firstname,
      lastname:register_lastname,
      email_address:register_email, 
      date_of_birth:dob 
    };

    API.saveMyProfileData(registerData).then((res) => {   
      if(res == true) {
        console.info("in true block register successful"); 
        setIsLoading(false);
        fetchData(true);
        console.info("in saveMyProfileData effect 123 showProfile"); 


      }
      if (res.sku === undefined || res === null) { 
        setShowErrorMessage(res.message);
        setIsLoading(false);

      } else {
        setShowErrorMessage('');  
        setIsLoading(false);
      }
    });
    console.log("register name is=>",register_firstname);
  }; 


  const changePassword = async () => { 
    setIsLoading(true);

    let current_password = document.getElementById('current_password').value;
    let password = document.getElementById('password').value; 
    let confirm_password = document.getElementById('confirm_password').value; 
   
    if(current_password == '') {  
      setShowErrorMessage(true)
      setCFirstnameClass('form-control is-invalid');  
    }

    if(password == '') {
      setShowErrorMessage(true);
      setCLastnameClass('form-control is-invalid');
    }

    if(confirm_password == '') {
      setShowErrorMessage(true);
      setCEmailClass('form-control is-invalid');
    }

   

    let data = {
      current_password:current_password,
      password:password,
      password_confirmation:confirm_password 
    };

    API.changePassword(data).then((res) => {  
      if(res == true) {
        console.info("in true block register successful"); 
        setIsLoading(false);
        fetchData(true);

      }
      if (res.sku === undefined || res === null) {
        setShowErrorMessage(res.message);
        setIsLoading(false);

      } else {
        setShowErrorMessage('');  
        setIsLoading(false);
      }
    });
    console.log("register name is=>",register_firstname);
  };

  const deleteAccount = async () => {
    setShowDeletePopup(true) ;  
  }


  const handleCloseModal = () => {
    setShowDeletePopup(false);
  };

  const sendAccountDeletionCode = () => {
    API.accountDeletionCode().then((res) => {
      if(res == true) {
        console.info("in true block");
        setShowProfile(false);
        setShowDeletePopup(false); 
        setShowDeletionText(true); 
      } 
      else {
        console.info("in false block");
      }
      console.info("res is as follow",res); 
    });

  };

  const deletionCode = () => {

    setIsLoading(true);

    let deletion_code = document.getElementById('deletion_code').value;

    let deletionData = {
      deletion_code:deletion_code,
    };


    API.deletionCode(deletionData).then((res)=>{ 
      if(res == true) {
        console.info("deletion Code");
        window.location = proxy_url + '/login'; 
      }
      else {
        console.info("deletion Code Else");
      }

    })

  };

  const fetchData = async (responseData = false) => {
    try {

      API.getMyProfile().then((res) => {
        const data =  res;
        if(data) {
          if (data.date_of_birth) {
            const options = { year: "numeric", month: "2-digit", day: "2-digit" };

            const formatted =  new Date(data.date_of_birth).toLocaleDateString("de-DE", options)
            setFormattedDate(formatted);  
          }
        }
        console.info("the result data is as follow=>",data);
        setData(data);

        if(responseData == true) {
          setEditMode(false);
        }

        else {
          if (data && data.message == 'Unauthenticated.') {
            window.location = proxy_url + '/login'; 
            localStorage.setItem('customerToken','');
          } 
        }
        
      }); 
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Perform save/update logic here
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const settingsStore = JSON.parse(localStorage.getItem('settings'));   


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
      } else {
        setError('');
        setShowErrorMessage(true);
        setCOnlyPasswordClass('form-control is-valid');

        // Perform further actions if password is valid
      }
    };    }

  const handleDOBChange = (event) => {
    const inputDOB =  document.getElementById('date_of_birth').value; 
   
    setDateOfBirth(inputDOB); 

    // Regular expression to validate DOB in the format "dd-mm-yyyy"
    const dobRegex = /^(0[1-9]|1\d|2\d|3[01]).(0[1-9]|1[0-2]).(19|20)\d{2}$/;

    setIsValid(dobRegex.test(inputDOB));
  };

  console.log("the register form is");

  return ( 
    <>
      <div>
        {showProfile && (
        <div>
        <div className='gurado-user-icon' style={{marginTop:'20px',display:'grid',justifyContent:'center',textAlign:'center'}}>
        <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i>

        </div>

      <h5 style={{textAlign:'center',textTransform: 'uppercase',fontWeight: 400,letterSpacing: '3px'/*! margin-top: 20px; */}}>Hallo {data.firstname}</h5>
      <Row style={{marginBottom:'3px'}}>
        <Col xl={6} lg={6}> 
        <div><h6 style={{letterSpacing: '2px',textTransform: 'uppercase',fontWeight: '600',fontSize: '18px'}}>Meine Daten</h6></div>
        </Col>

        <Col xl={6} lg={6}>
        {editMode ? (
            <a onClick={handleSaveClick} style={{cursor:'pointer'}}>Cancel</a>
          ) : (
            <a onClick={handleEditClick} style={{cursor:'pointer'}}>Edit</a> 
          )} 
        </Col>
      </Row>

          {editMode ? (
            <div style={{marginTop:'-20px'}}>  
            <Row style={{marginBottom:'3px'}}>
              <Col sm={12} md={12} xl={6} lg={6}>
                <input
                  type="text"
                  placeholder="Vorname*"
                  name="register_firstname"
                 // className="form-control"
                  autoComplete="register register_firstname"
                  onChange={checkFirstName}
                  onPaste={checkFirstName}
                  className='gurado-storefront-form-control'
                  id="register_firstname" 
                  ref={register_firstname} 
                  defaultValue={data.firstname}
                  style={{height:'50px'}}
                />
                {}
              </Col>

              <Col sm={12} md={12} xl={6} lg={6}>
                <input
                  type="text"
                  placeholder="Nachname*"
                  name="register_lastname"
                  autoComplete="register_lastname"
                  className='gurado-storefront-form-control'
                  ref= {register_lastname} 
                  onChange={checkLastName}
                  onPaste={checkLastName}
                  defaultValue={data.lastname}
                  id="register_lastname"
                  style={{height:'50px'}}
                />
              </Col>

              </Row>
              <Row style={{marginBottom:'3px'}}>
            
    
            </Row>
            <Row style={{marginBottom:'3px'}}> 
              <Col sm={12} md={12}>
                <input
                  type="email"
                  placeholder="E-Mail*"
                  name="register_email"
                  className='gurado-storefront-form-control'
                  id="register_email"
                  onChange={checkEmail}
                  onPaste={checkEmail}
                  ref = {register_email}
                  defaultValue={data.email}
                  autoComplete="register_email"
                  style={{height:'50px'}}
                />
              </Col>
            </Row>

            <Row style={{marginBottom:'3px'}}>
              <Col sm={12} md={12}>
                <input
                  type="text"                     
                  placeholder="Date Of Birth*"
                  name="date_of_birth"
                  className='gurado-storefront-form-control'
                  id="date_of_birth"
                  onChange={handleDOBChange}
                  onPaste={handleDOBChange}
                  defaultValue={formattedDate}  
                  autoComplete="register_email"
                  style={{height:'50px'}}
                />
                 {!isValid && <p>Please enter a valid date of birth (dd.mm.yyyy).</p>}
              </Col>
            </Row>

            <Row style={{marginBottom:'3px'}}> 
<Col className="col mt-3">
    <div><button style={{width:'100%',textTransform:'uppercase',letterSpacing:'1px'}} className="btn btn-primary" onClick={() => doSubmit()}>
      {!isLoading ? ( 
            <>Daten speichern</> 
              ) : (
                <>
                  <Loader width={30} height={30} color="white" type="ThreeDots" />  
                </> 
              )} 
      </button></div> 
  </Col>
</Row> 
          
            </div>

 
          ) : (
<div>
        <Row style={{marginBottom:'3px'}}>
          <Col sm={12} md={12} lg={6} xl={6} style={{display:'grid'}}>
            <label htmlFor="firstname">Vorname</label>
            <label>{data.firstname}</label>
          </Col>

          <Col sm={12} md={12} lg={6} xl={6} style={{display:'grid'}}>
          <label htmlFor="firstname">Nachname</label> 
            <label>{data.lastname}</label>
          </Col>
          </Row>
 
        <Row style={{marginBottom:'3px'}}>
          <Col sm={12} md={12} style={{display:'grid'}}>
          <label htmlFor="firstname">Email</label>
            <label>{data.email}</label>
          </Col>
        </Row>

        <Row style={{marginBottom:'3px'}}>
          <Col sm={12} md={12} style={{display:'grid'}}>
          <label htmlFor="firstname">Date Of Birth</label>
            <label><DatePipe date={data.date_of_birth?data.date_of_birth:''} /></label>  
          </Col>
        </Row>
        </div>
        

      
          )}



<Accordion allowZeroExpanded>  
      <div>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
            <span style={{fontWeight:600}}>Passwort ändern</span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
          <div>  
            <Row style={{marginBottom:'3px'}}>
              <Col sm={12} md={12} xl={12} lg={12}>
              <div className="password-input" style={{display:'flex',position:'relative'}}> 

              <input
              type={showPassword ? "text" : "password"} 
              name="current_password"
              id="current_password"
              className='gurado-storefront-form-control'
              placeholder="Aktuelles Passwort*"
              onChange={checkonlypassword}
              onPaste={checkonlypassword}
              autoComplete="current_password"
              ref={current_password}
              style={{height:'50px',marginBottom:'16px'}}
            />

      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        onClick={toggleShowPassword}
        style={{position:'absolute',right:'30px',marginTop:'20px'}}
      />
      </div> 
               
              </Col>
            </Row>

              <Row style={{marginBottom:'3px'}}>
          <Col md={12} lg={6} xl={6} sm={12}>
          <div className="password-input" style={{display:'flex',position:'relative'}}>
            <input
              type={showConfirmPassword ? "text" : "password"} 
              name="password"
              id="password"
              className='gurado-storefront-form-control'
              placeholder="Neues Passwort*"
              onChange={checkonlypassword}
              onPaste = {checkonlypassword} 
              autoComplete="password"
              ref={password}
              style={{height:'50px',marginBottom:'16px'}}
            />
             <FontAwesomeIcon
                style={{position:'absolute',right:'30px',marginTop:'20px'}}
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleConfirmPassword}
      />
          </div>
          </Col>

          <Col md={12} lg={6} xl={6} sm={12}>
          <div className="password-input" style={{display:'flex',position:'relative'}}>  
            <input
              type={showCurrentPassword ? "text" : "password"} 
              name="confirm_password"
              id="confirm_password"
              ref={cPassword}
              onChange={checkPasswords}
              onPaste={checkPasswords} 
              className='gurado-storefront-form-control'
              placeholder="Neues Passwort bestätigen*" 
              style={{height:'50px',marginBottom:'16px'}}
              
            >
          </input> 
          <FontAwesomeIcon
            style={{position:'absolute',right:'30px',marginTop:'20px'}}
            icon={showCurrentPassword ? faEyeSlash : faEye}
            onClick={toggleCurrentPassword} 
          />
           </div>
            
          </Col> 
          </Row>

            <Row style={{marginBottom:'3px'}}>
<Col className="col mt-3">
    <div><button style={{width:'100%',height:'50px',textTransform:'uppercase',letterSpacing:'1px'}} className="btn btn-primary" onClick={() => changePassword()}>
      {!isLoading ? ( 
            <>Passwort ändern</> 
              ) : (
                <>
                  <Loader width={30} height={30} color="white" type="ThreeDots" />  
                </> 
              )} 
      </button></div> 
  </Col>
</Row> 
          
            </div>           </AccordionItemPanel>
        </AccordionItem>
        </div>
      </Accordion>

      <Row style={{marginTop:'16px',textAlign:'center'}}>
          <Col sm={12} md={12} style={{display:'grid'}}>
          <a href="#" style={{width:'100%',height:'50px'}} onClick={() => deleteAccount()}>
      {!isLoading ? ( 
            <>Account löschen</> 
              ) : (
                <>
                  <Loader width={30} height={30} color="white" type="ThreeDots" />  
                </> 
              )} 
      </a>
          </Col>
        </Row>
      </div>

        )}

        {showDeletePopup && (
          <div>
              <div className="modal" ref={modalRef} id="designModal1" tabIndex="-1" style={{display:'block'}}> 
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
          <button type="button" className="btn-close modal-close" data-bs-dismiss="modal" onClick={handleCloseModal} aria-label="Close"></button> 
          <div className="modal-body"> 
          Bist du dir sicher, dass du dein Konto löschen willst?          
          Hinweis: Nach Bestätigung erhälst du einen Bestätigungscode per E-Mail.

          <ul className="row nav" id="voucherOptions" role="tablist"> 
											<li xl={6} lg={6} sm={6} md={6} classname="nav-item"
												role="presentation" style={{display: 'grid'}}>

												<button className="btn btn-primary gr-button-active active" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        // backgroundColor:
                        // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        color:'white'
                      }
                  } onClick={handleCloseModal} 
													id="closeTab" data-bs-toggle="tab"
													data-bs-target="#closeTab" type="button" role="tab"
													aria-controls="closeTab" aria-selected="true"
													data-toggle="tab" href="#closeTab"><span>Cancel</span></button>  
											</li>
                      <li xl={6} lg={6} sm={6} md={6} classname="nav-item"
												role="presentation" style={{display: 'grid'}}>
                      <button className="btn btn-primary gr-button-active active" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined 
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        // backgroundColor:
                        // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        color:'white'
                      }
                  } onClick={sendAccountDeletionCode} 
													id="deleteAccount" data-bs-toggle="tab"
													data-bs-target="#deleteAccount" type="button" role="tab"
													aria-controls="deleteAccount" aria-selected="true"
													data-toggle="tab" href="#deleteAccount"><span>Delete</span><br/></button></li> 
                      </ul> 

            </div>

                  
            </div>
            </div>
            </div>
            </div>
        ) 
        }

        {showDeletionText && (
          <div>
           <div style={{textAlign: 'center'}}>
           <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i>
           </div>
                 <div><h4 style={{textAlign: 'center',letterSpacing: '1px',fontWeight: '600',textTransform:'uppercase'}}> Benutzerkonto löschen </h4></div>
     
                 <div><p style={{letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}> Code zum Löschen des Benutzerkontos eingeben
 </p></div>
                 <Row style={{marginBottom:'3px'}}>
            <div className="col-sm-12 col-md-12 col-xl-6 col-lg-6"> 
              <input
                type="text"
                placeholder=""
                name="deletion_code"
                required={true}
                ref={deletion_code}  
                id="deletion_code"
                style={{height:'50px'}}  
              />
            </div>

            <Col sm={12} md={12} xl={6} lg={6}>
            <button
                  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        // backgroundColor:
                        //   settingsStore.btn_primary_color, 
                        height:'50px',
                        textTransform:'uppercase',
                        color:'white'

                      }
                  }
                  onClick={() => deletionCode()} 

                >
                   {!isDeleteCustomerLoading ? ( 
                    <> Löschen </> 
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button> 
            </Col>
          </Row>
                 </div>
        )}
    </div> 
    </>
  );
});
export default MyProfileForm;   
