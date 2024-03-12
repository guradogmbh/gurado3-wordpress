import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react';
import Register from '../../helper/register'; 
import Loader from 'react-loader-spinner';
import DatePipe from '../../pipes/date';
import CurrencyPipe from '../../pipes/currency';
import ErrorMessage from '../errorMessage'; 
import {Col,Row} from 'react-bootstrap';

const settingsStore = JSON.parse(localStorage.getItem('settings')); 

const MyVoucherForm = observer(({ cartStore }) => { 
    const [isLoading, setIsLoading] = useState(false);
    const [isVoucherCodeLoading, setIsVoucherCodeLoading] = useState(false);
    const [data, setData] = useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const API = new Register();
    const voucher_code = useRef();

    const proxy_url = window.gurado_js_ajax.urls.proxy_site_url;  
    console.info("ProxyUrl is=>",proxy_url); 


    const voucherCode = async (event) => {
      let data = document.getElementById('voucher_code').value;
      let voucherData = {
        'voucher_code':data
      };

      setIsVoucherCodeLoading(true);


      API.voucherCode(voucherData).then((res) => {
        if(res == true) {
          console.info("in true block register successful");
          setIsLoading(false);
          setIsVoucherCodeLoading(false);
          fetchData();
        }
        else {
          setShowErrorMessage(res.message);   
          setIsVoucherCodeLoading(false);
          setIsLoading(false);
        }
       // setLoading(false);
      });
      
    }


    useEffect(() => { 
      fetchData();
    },[]);

    const fetchData = async () => { 
      try {
  
        API.getVouchers().then((res) => {
          const data =  res.data; 
          console.info("the result data is as follow=>",data);
          setData(data);
        }); 
      } catch (error) {
        console.error(error);
      }
    }
  

    return (
      <>
      <div style={{textAlign: 'center',marginTop:'20px'}}>
      <i className="fa fa-user" style={{fontSize:'xxx-large'}} aria-hidden="true"></i>
      </div>
            <div><h4 style={{textAlign: 'center',letterSpacing: '1px',fontWeight: '600',textTransform:'uppercase',marginTop:'20px'}}>Meine Gutscheine </h4></div>

            <div><p style={{letterSpacing: '1px',fontWeight: '500',fontSize: '18px',marginTop:'20px'}}>Hier kannst Du alle Deine Gutscheine einsehen. Falls Du einen Gutschein geschenkt bekommen hast, kannst Du den Gutscheincode hier eintragen. Den Code findest Du auf der Rückseite Deines Gutscheins.  </p></div>

            <div><p style={{letterSpacing: '1px',fontWeight: '500',fontSize: '18px',marginTop:'20px'}}>Du hast einen Gutschein geschenkt bekommen? </p></div>
        <div>
  
          <div className="card-text"></div>
          {showErrorMessage.length > 0 && ( 
            <div style={{ width: '100%',display:'grid',justifyContent:'center',padding:'10px'}}>
              <ErrorMessage message={showErrorMessage.toString()} /> 
            </div>
          )}
        <Row style={{marginBottom:'3px',marginTop:'20px'}}>
            <Col sm={12} md={12} xl={6} lg={6}> 
              <input
                type="text"
                placeholder="Gutscheincode"
                name="voucher_code"
                className='gurado-storefront-form-control' 
                required={true}
                ref={voucher_code}  
                id="voucher_code"
                style={{height:'50px'}}  
              />
            </Col>

            <Col sm={12} md={12} xl={6} lg={6}>
            <button
                  style={
                    settingsStore && settingsStore.btn_primary_color && settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        // backgroundColor:
                        //   settingsStore.btn_primary_color,
                        
                        textTransform:'uppercase',
                       

                      }
                  }
                  onClick={() => voucherCode()} 

                >
                   {!isVoucherCodeLoading ? ( 
                    <> Hinterlegen </> 
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button> 
            </Col>
          </Row>



          {data  && data.length > 0 && ( 

             <div className="gurado-voucher-table">
              <div><h4 style={{marginBottom:'15px',textTransform:'uppercase',marginTop:'20px'}}> Meine gespeicherten Gutscheine </h4></div>  
             <table>
       <tr>
         <th>Code</th>
         <th>Guthaben</th>
         <th>Artikel</th>
         <th>Ablaufdatum</th>
     
       </tr>
       <>
       {data.map((item) => (
       <tr>
         <td>{item.code}</td>
         <td><CurrencyPipe value={item.balance} /></td>
         <td>{item.product_name}</td>
         <td> <DatePipe date={item.expire_at} /></td>  
     
       </tr>
       ))}
     </>
      
     </table>
             </div> 
          )}
       
         
        
  
           
          </div> 
          
  
  
      </>
    );
  });
  
export default MyVoucherForm;    
