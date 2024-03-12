import { useEffect, useState } from 'react';
import VoucherConfigurationStore from '../../store/VoucherConfigurationStore';
import PriceCol from './priceCol';
import CustomText from './customText';
import CartItem from '../../helper/cartItem';
import MailConfiguration from './mailConfiguration';
import PostConfiguration from './postConfiguration';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../errorMessage';
import SuccessModal from './successModal';
import ConfigOptions from './configOptions';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Api from '../../helper/api';




const { observer } = require('mobx-react-lite');
const configStore = new VoucherConfigurationStore();
const ConfigurationSelection = observer(
  ({ voucherStore, settingsStore,amount }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const API = new Api(); 



    useEffect(() => {
      if (!voucherStore.ready) return;
      configStore.init(voucherStore);
      voucherStore.connect(configStore);
      console.log("configStore=>",configStore.previewImage);
      console.log("voucherStore=>",voucherStore.voucher.allow_personalized_message); 

    }, [voucherStore.ready]);

    useEffect(() => {
      configStore.setSenderName('');
      //configStore.setPreviewImage('');
      configStore.setRecipientName('');
      configStore.setRecipientMail('');
      configStore.setRecipient('self');
    }, [voucherStore.shippingMethod]);

    const addToCart = () => {
      setLoading(true);
      let cartItem = new CartItem();
      cartItem.setAmount(amount); 
      cartItem.setSku(voucherStore.voucher.sku);
      cartItem.setDeliveryType(voucherStore.shippingMethod);
      cartItem.setDesignTemplate(voucherStore.templateId);
      cartItem.setRecipient(configStore.recipient);
      cartItem.setEmail(configStore.recipientMail);
      cartItem.setRecipientName(configStore.recipientName);
      cartItem.setMessage(configStore.customText);
      cartItem.setSenderName(configStore.senderName);
      cartItem.setOptions(voucherStore.chosenOptions.options);
      console.log("=>=>",cartItem);

      API.addToCart(cartItem).then((res) => { 
        localStorage.setItem('custom_text', ''); 
        console.info("ressss is=>",res);
        if(res) {
          window.location = sessionStorage.getItem('cart_url');
         // console.info("in true block11 register successful");
         // setIsLoading(false);
           // Navigate to the desired route
       // history.push(`/verify?email=${encodeURIComponent(register_email)}`);  
      //  return <VerifyForm email={register_email} />;  
           // Using Link component 
        }
        if (res.sku === undefined || res === null) {
          //setShowErrorMessage(res.message);
         // setIsLoading(false);
  
        } else {
         // setShowErrorMessage('');  
         // setIsLoading(false);
        }
       // setLoading(false);
      });


    };

    var { t } = useTranslation();


    return (

      <div style={{ width: '100%', marginTop: '30px' }}>
        <h3
          // style={{
          //   color:
          //     settingsStore.settings.header_color === undefined
          //       ? ''
          //       : settingsStore.settings.header_color,
          // }}
        >

        </h3>
        {voucherStore.isConfigurable && (
          <ConfigOptions
            voucherStore={voucherStore}
            configStore={configStore}
          />
        )}
        {/* <PriceCol
          voucherStore={voucherStore}
          configStore={configStore}
        /> */}

        {/* {voucherStore.shippingMethod === 'virtual' ? (
          <MailConfiguration configStore={configStore} />
        ) : (
          <PostConfiguration configStore={configStore} />
        )} */}
        {voucherStore && voucherStore.voucher &&  voucherStore.voucher.allow_personalized_message == 'YES' ? (
        <CustomText configStore={configStore} voucherStore={voucherStore} /> 
        ) : (
<></>        )} 

        <div
          style={{
            width: '100%',
            maxWidth: 'calc(33.333333% + 400px)', 
            marginTop: '30px',
          }}
        >
          {window && window.innerWidth > 1000 &&
           <div style={{ flexGrow: '1', paddingBottom: '10px' }}> 
          {(voucherStore.shippingMethod == 'virtual' && voucherStore.voucher.virtual_voucher_design_templates && voucherStore.voucher.virtual_voucher_design_templates.length > 1) || (voucherStore.voucher.allow_personalized_message == 'YES' && voucherStore.voucher.virtual_voucher_design_templates.length == 1) ? (  
            <button
              style={
                settingsStore.settings
                  .btn_primary_color === undefined
                  ? { width: '100%' }
                  : {
                      width: '100%'
                      // backgroundColor:
                      //   settingsStore.settings
                      //     .btn_primary_color,
                    }
              }
              onClick={addToCart} 

              disabled={
                loading ||
                voucherStore.requiredOptions >
                  voucherStore.chosenOptions.options.length ||
                voucherStore.estimationLoading
              }
            >
              {!loading && !voucherStore.estimationLoading ? (
        <>
          {voucherStore.requiredOptions >
          voucherStore.chosenOptions.options.length ? ( 
            <>{t("TO_CHECKOUT")}</>
          ) : (
            <>{t("ADD_TO_CART")} 
            </>
          )}
        </>
      ) : (
        <>
          <Loader
            type="ThreeDots"
            color="blue"
            width="30"
            height="20"
          />
        </>
      )}
              
            </button> 
          ):voucherStore.shippingMethod == 'physical' && voucherStore.voucher.physical_voucher_design_templates && voucherStore.voucher.physical_voucher_design_templates.length >= 1?  <button
          style={
            settingsStore.settings
              .btn_primary_color === undefined
              ? { width: '100%'} 
              : {
                  width: '100%',
                }
          }
          onClick={addToCart} 

          disabled={
            loading ||
            voucherStore.requiredOptions >
              voucherStore.chosenOptions.options.length ||
            voucherStore.estimationLoading
          }
        >
          {!loading && !voucherStore.estimationLoading ? (
    <>
      {voucherStore.requiredOptions >
      voucherStore.chosenOptions.options.length ? ( 
        <>{t("TO_CHECKOUT")}</>
      ) : (
        <>{t("ADD_TO_CART")} 
        </>
      )}
    </>
  ) : (
    <>
      <Loader
        type="ThreeDots"
        color="blue"
        width="30"
        height="20"
      />
    </>
  )}
          
        </button> :<> <button 
          style={
            settingsStore.settings
              .btn_primary_color === undefined
              ? { position:'absolute',
              width:'587px',
              bottom:'-35px'
            }  
              : {
                position:'absolute',
                width:'587px', 
                bottom:'-35px',
              } 
          }
          onClick={addToCart}

          disabled={
            loading ||
            voucherStore.requiredOptions >
              voucherStore.chosenOptions.options.length ||
            voucherStore.estimationLoading
          }
          >
          {!loading && !voucherStore.estimationLoading ? (
          <>
          {voucherStore.requiredOptions >
          voucherStore.chosenOptions.options.length ? (  
          <>{t("TO_CHECKOUT")}</>
          ) : (
          <>{t("ADD_TO_CART")} 
          </>
          )}
          </>
          ) : (
          <>
          <Loader
          type="ThreeDots"
          color="blue"
          width="30"
          height="20"
          />
          </>
          )}

          </button></>}
          
        </div>

          }
          
          {/* <button
            style={
              settingsStore.settings.btn_primary_color === undefined
                ? { width: '100%', marginBottom: '30px' }
                : {
                    width: '100%',
                    marginBottom: '30px',
                    backgroundColor:
                      settingsStore.settings.btn_primary_color,
                  }
            }
            onClick={addToCart}
            disabled={
              loading ||
              voucherStore.requiredOptions >
                voucherStore.chosenOptions.options.length ||
              voucherStore.estimationLoading
            }
          >
            {!loading && !voucherStore.estimationLoading ? (
              <>
                {voucherStore.requiredOptions >
                voucherStore.chosenOptions.options.length ? (
                  <>{t("PLEASE_SELECT_ALL_OPTIONS")}</> 
                ) : (
                  <>{t("ADD_TO_CART")} 
                  </>
                )}
              </>
            ) : (
              <>
                <Loader
                  type="ThreeDots"
                  color="blue"
                  width="30"
                  height="20"
                />
              </>
            )}
          </button> */}
          {errorMessage.length > 0 && (
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <ErrorMessage message={errorMessage.toString()} />
            </div>
          )}
          {showModal && (
            <SuccessModal
              showModal={showModal}
              setShowModal={setShowModal}
              voucherStore={voucherStore}
              configStore={configStore}
              settingsStore={settingsStore}
            />
          )}
        </div>
              </div>
    );
  },
);
export default ConfigurationSelection;
