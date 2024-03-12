import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import SettingsStore from '../../store/SettingsStore';
import VoucherStore from '../../store/VoucherStore';
import BackButton from '../backButton';
import GuradoLoader from '../Loader';
import ConfigurationSelection from './configurationSelection';
import PriceCol from './priceCol';
import MotiveSelection from './motiveSelection';
import ShippingMethodSelector from './shippingMethodSelector';
import TopDescription from './topdescription'; 
import TemplateModal from './TemplateModal'; 
import FirstModal from './ReactCustomModal';
import VoucherConfigurationStore from '../../store/VoucherConfigurationStore';
import {Col,Row} from 'react-bootstrap';

import React from 'react';
import axios from 'axios';

import { useTranslation } from 'react-i18next';



const voucherStore = new VoucherStore();
const settingsStore = new SettingsStore();
const configStore = new VoucherConfigurationStore();
let amount = 0;



const VoucherPage = observer(({ urlKey, sku }) => {
 // const price = useSelector(state => state.price);
 // alert(price);

  const [showModal, setShowModal] = useState(false);
  const [isComponentVisible, setIsComponentVisible] = useState(0);

  console.log("voucher page 12345");
  var { t } = useTranslation(); 


  useEffect(() => {
    if (!voucherStore.ready) return;
    configStore.init(voucherStore);
    voucherStore.connect(configStore);
    amount = configStore.price;
    console.log("amount is as follow=>",amount);
    console.log("configStore.pricetest is=>",configStore.price); 
    console.log("voucherStore=>",voucherStore.voucher.price_configuration); 

  }, []);  

  useEffect(() => { 
    if (settingsStore.ready) {
      if (
        settingsStore.settings.automatic_scrolling &&
        settingsStore.settings.automatic_scrolling.toString() === 'on'
      ) {
        window.scrollTo(0, 0);
      }
    }
  }, [settingsStore.ready]);
  useState(() => {
    if (urlKey === undefined && sku === undefined) return; 

    if (sku === undefined && urlKey !== undefined) {
      voucherStore.init(urlKey);
     // configStore.init(voucherStore);

    }
    if (sku !== undefined && urlKey === undefined) {
      voucherStore.initSku(sku);
      //configStore.init(voucherStore);

    }
  }, [urlKey, sku]);

  const addToCart = () => {
    console.info("in settt");
    //setShowModal(true);
    setIsComponentVisible(isComponentVisible + 1); 

  
  };

  if (!voucherStore.ready || !settingsStore.ready) {
    return <GuradoLoader />;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <div className='gurado-storefront-row'>
      <div className='gurado-storefront-col-lg-5'>      {settingsStore.product === '*' && <BackButton />} 
      <img
          src={
            voucherStore.voucher.images.length > 0
              ? voucherStore.voucher.images[0].image_url
              : 'https://i.stack.imgur.com/y9DpT.jpg'
          }
          style={{ height: 'auto', width: '100%' }}
        />
      </div>
      <div className='gurado-storefront-col-lg-7' style={{marginTop:'13px',height: 'auto',minHeight: '500px'}}>  
      <h1
        // style={{
        //   color:
        //     settingsStore.settings.header_color === undefined
        //       ? '' 
        //       : settingsStore.settings.header_color, 
        // }}
      >
       {voucherStore.voucher.name} 
      </h1> 

      <div
        style={{ paddingRight: '15px' }}
        dangerouslySetInnerHTML={{
          __html: voucherStore.voucher.description,
        }}
      ></div> 
              <br/>


        <PriceCol
          voucherStore={voucherStore}
          configStore={configStore}
        />
        
        <br/>

      
              <button style={
                settingsStore && settingsStore.settings.btn_primary_color && settingsStore.settings.btn_primary_color === undefined
                  ? { width: '100%', marginTop: '30px' }
                  : {
                    width: '100%',
                    marginTop: '30px',
                    //backgroundColor:
                    //settingsStore.settings.btn_primary_color,  
                    textTransform:'uppercase',
                    color:'white'
                  }

              } onClick={addToCart}
              disabled={voucherStore.voucher.price_configuration.type.toLowerCase() !== 'fixed' && voucherStore.voucher.price_configuration.type.toLowerCase() !== 'configurable' && !(configStore.price !== undefined && !isNaN(configStore.price) && configStore.price > 0)} 
          >         {t("CONTINUE")}   
          </button>

      </div>
      </div> 

      
     
      {/* {voucherStore.voucher.can_deliver_voucher_physically ===
        'YES' && (
        <ShippingMethodSelector
          voucherStore={voucherStore}
          settingsStore={settingsStore}
        />
  
      )} */}
{[...Array(isComponentVisible)].map((_, i) => (
 
        <FirstModal
        showModal={isComponentVisible}  
        setShowModal={setShowModal}
        voucherStore={voucherStore}
        //configStore={configStore}
        settingsStore={settingsStore} 
        configStore = {voucherStore.voucher.price_configuration.type.toLowerCase() == 'fixed'?voucherStore.voucher.price_configuration.amount:configStore.price} 
        key={i} 
      />
      ))}

     
      {/* <MotiveSelection
        voucherStore={voucherStore}
        settingsStore={settingsStore}
      /> */}
      {/* <ConfigurationSelection
        voucherStore={voucherStore}
        settingsStore={settingsStore}
      /> */}
    </div>
  );
});
export default VoucherPage;
