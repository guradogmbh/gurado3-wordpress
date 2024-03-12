import { observer } from 'mobx-react-lite';
import React from 'react'; 
import MyProfileForm from './myProfile';
import SettingsStore from '../../store/SettingsStore';
import MyVoucherForm from './myVouchers';
import MyDashboard from './myDashboard';
import Register from '../../helper/register'; 
import { useState } from 'react';
import Loader from 'react-loader-spinner';

const settingsStore = JSON.parse(localStorage.getItem('settings'));   

const leftSection = observer(({}) => {  
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API = new Register(); 
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;    
  const [selectedValue, setSelectedValue] = useState('');
  const handleClick = (value) => {
    console.info("the value is as follow=>",value);
    if(value == 'Meine Gutscheine'){
        setSelectedComponent(<MyVoucherForm />);
    } 

    else if(value == 'My Dashboard') {
      setSelectedComponent(<MyDashboard />);
    }

    else if(value == 'Meine Daten') {
      setSelectedComponent(<MyProfileForm />)
    }
    
    else {
      console.info("dashboard=>")
      setSelectedComponent(<MyDashboard />);  
    }
    
    setSelectedValue(value); 

  };

  const logout = async () => { 
    setIsLoading(true);


    API.logout().then((res) => {
      setIsLoading(true);

      if(res == true) {
        console.info("in true block register successful"); 
        localStorage.setItem('customerToken','');  
        window.location = proxy_url + '/login';
        setIsLoading(false);

      }
      else if (res && res.message == 'Unauthenticated.') {
        window.location = proxy_url + '/login';  
        localStorage.setItem('customerToken',''); 
      } 

    });
  }; 

  console.log("the register form is1111");
  return (
    <>
     <div  style={{minHeight:'400px'}}>  
    <div className="gurado-storefront-left-panel"> 
    <ul>
      <h5 style={{textDecoration:'underline'}}> MEINE KONTO </h5>
      <li onClick={() => handleClick('My Dashboard')}>
        <a className={selectedValue === 'My Dashboard' ? 'active' : ''} href="#/home">Dashboard</a> 
      </li>
      <li onClick={() => handleClick('Meine Daten')}>
        <a className={selectedValue === 'Meine Daten' ? 'active' : ''} href="#/my-profile">Meine Daten</a>
      </li>
      <li onClick={() => handleClick('Meine Gutscheine')}>
        <a className={selectedValue === 'Meine Gutscheine' ? 'active' : ''} href="#/my-vouchers">Meine Gutscheine</a> 
      </li>

    <button
                  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { marginTop: '30px' }
                      : {
                        marginTop: '30px'
                      }
                  }
                  onClick={() => logout()} 

                >
                   {!isLoading ? (
                    <>Logout</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button>  


    </ul>
    </div>


<div style={{marginLeft:'25%',padding:'1px 16px',height:'auto',borderLeft:'1px dotted',borderColor:'inherit'}}>
{selectedComponent ? selectedComponent :<MyDashboard/> }</div>  
</div>
    </>
  );
});
export default leftSection;   
