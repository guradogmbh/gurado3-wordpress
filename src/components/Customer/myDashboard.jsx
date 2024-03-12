import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import Register from '../../helper/register'; 
import SettingsStore from '../../store/SettingsStore';
import Loader from 'react-loader-spinner';
import DatePipe from '../../pipes/date';
import CurrencyPipe from '../../pipes/currency';
import {Col,Row} from 'react-bootstrap';

const settingsStore = JSON.parse(localStorage.getItem('settings'));  
const MyDashboard = observer(({ cartStore }) => { 
  const voucher_amount = useRef();
  const [rechargeMode, setShowRechargeMode] = useState(false); 
  const [dashboardMode, setShowDashboardMode] = useState(true); 
  const [points, setPoints] = useState('');

  const API = new Register();
  const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;  

  const recharge = async () => { 
    setShowRechargeMode(true);
    setShowDashboardMode(false);
  };

  useEffect(() => {
    console.info("if in login profile"); 
    fetchData();
  }, []); 

  const fetchData = async (responseData = false) => {
    try {

      API.getMyProfile().then((res) => {
        const data =  res;
        console.info("the data is as follow=>",data);
        setPoints(data.total_reward_points);
       if (res && res.message == 'Unauthenticated.') {
          window.location = proxy_url + '/login';
          localStorage.setItem('customerToken','');
        } 
      }); 
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
    return (
      <>
      <div>
      {dashboardMode && (
      <div className="gurado-storefront-row" style={{marginTop:'20px',marginLeft:'20px'}}>
      <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-xl-8 gurado-storefront-col-lg-8">
        <h4 style={{textTransform:'uppercase'}}> Punkteübersicht</h4> 
        <div>
          <p>
          Aktueller Stand: {points} Punkte
          </p>
        </div>    
        </div>

      <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-xl-4 gurado-storefront-col-lg-4" style={{display:'grid'}}>
      <button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                    ? { marginTop: '30px',marginRight:'30px' }
                      : {
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color,
                      }
                  }  onClick={() => recharge()} value="5"><span><span>Guthaben aufladen</span></span></button> 
     	<button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined 
                    ? { marginTop: '30px',marginRight:'30px'} 
                      : {
                        marginTop: '30px',
                        //backgroundColor:
                        //settingsStore.btn_primary_color,
                        
                      }
                  }  onClick="setValues(this)" value="5"><span><span>google Wallet</span></span></button>
       	<button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                    ? { marginTop: '30px',marginRight:'30px' }
                      : {
                        marginTop: '30px',
                        // backgroundColor:
                        // settingsStore.btn_primary_color,
                      }
                  }  onClick="setValues(this)" value="5"><span><span>Apple Wallet</span></span></button>

      </div>


      </div>
      )}



      {rechargeMode && (
        <>
      <div><h4 style={{textAlign: 'center',letterSpacing: '1px',fontWeight: '600',textTransform:'uppercase'}}>Guthaben aufladen</h4></div>

<div><p style={{letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}> Lade neues Guthaben auf Deine Kundenkarte. Einfach den den Betrag angeben und zur Kasse gehen. </p></div>

<div><p style={{letterSpacing: '1px',fontWeight: '500',fontSize: '18px'}}>Betrag selbst eingeben</p></div>

<div className="gurado-storefront-row" style={{marginBottom:'3px',textAlign:'center',display:'block'}}>
            <div className="gurado-storefront-col-sm-12 gurado-storefront-col-md-12 gurado-storefront-col-xl-12 gurado-storefront-col-lg-12"> 
              <input
                type="text"
                placeholder="€" 
                name="voucher_amount"
                required={true}
                ref={voucher_amount}  
                id="voucher_amount"
                style={{height:'50px',fontSize:'20px'}}  
              />
            </div>

            <div style={{display:'grid',fontSize:"18px",marginTop:'20px'}}> 
            <label>- oder -</label>
            <label>Betrag auswählen</label> 

          </div>

            
          </div> 
         

          <div className="buttons-set recharge-value" style={{textAlign:'center',marginBottom:'20px'}}>
					<button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                    ? { width: '85px', marginTop: '30px',marginRight:'30px' }
                      : {
                        width: '85px',
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color, 
                        textTransform:'uppercase',
                        marginRight:'30px'
                      }
                  }  onClick="setValues(this)" value="5"><span><span>5€</span></span></button>
          <button type="button"  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                    ? { width: '85px', marginTop: '30px',marginRight:'30px' }
                      : {
                        width: '85px',
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        marginRight:'30px'
                      }
                  }  onClick="setValues(this)" value="10"><span><span>10€</span></span></button>
          <button type="button"style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                    ? { width: '85px', marginTop: '30px',marginRight:'30px' }
                      : {
                        width: '85px',
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        marginRight:'30px'
                      }
                  }   onClick="setValues(this)" value="50"><span><span>50€</span></span></button>
          <button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined 
                    ? { width: '85px', marginTop: '30px',marginRight:'30px' }
                      : {
                        width: '85px',
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        marginRight:'30px'
                      }
                  }   onClick="setValues(this)" value="100"><span><span>100€</span></span></button>
          <button type="button" style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined 
                    ? { width: '85px', marginTop: '30px',marginRight:'30px' }
                      : {
                        width: '85px',
                        marginTop: '30px',
                       // backgroundColor:
                       // settingsStore.btn_primary_color,
                        textTransform:'uppercase',
                        marginRight:'30px'
                      }
                  }  onClick="setValues(this)" value="150"><span><span>150€</span></span></button>   
          </div>
          </>
      )}
          </div>
      </>
    );
  });
  
export default MyDashboard;    
