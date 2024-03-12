import { observer } from 'mobx-react-lite';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import CartViewMobile from './cartView/cartViewMobile';
import Loader from 'react-loader-spinner';
import BillingAddressForm from './billingAddressForm';
import ShippingAddressForm from './shippingAddressForm';
import CartViewDesktop from './cartView/cartViewDesktop';
import Modal from 'react-modal';
import React from 'react';
import ReactDOM from 'react-dom';
import SuccessModal from '../voucherpage/successModal';
import AgreementModal from '../voucherpage/agreementModal';
import { useTranslation } from 'react-i18next';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


//let subtitle;

const CartBillingAddress = observer(({ cartStore, settingsStore }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  //const [modalIsOpen, setIsOpen] = React.useState(false);
  const [model,setModel] = React.useState(false);
  const [tempData,setTempData] = React.useState([]);

  const getData = (title,content) => {
    console.info("the title is",title);
    console.info("the content is",content);

    let tempData = [title,content];
    setTempData(item=>[1,...tempData]);
    return setModel(true);


  }
   // const [modalIsOpen, setIsOpen] = React.useState(false);



   var { t } = useTranslation();

  return (
    <div style={{ marginTop: '30px' }}>
      <BillingAddressForm cartStore={cartStore} />
      {cartStore.requiresShipping && (
        <div style={{ width: '100%', marginTop: '10px' }}>
          <input
            type="checkbox"
            name="reqshp"
            id="reqshp"
            onClick={() => cartStore.updateUseForShipping()}
          />
          <label htmlFor="reqshp">{t("DIFFERENT_DELIVERY_ADDRESS")}</label>
        </div>
      )}
      {!cartStore.useForShipping && (
        <ShippingAddressForm cartStore={cartStore} />
      )}
      {cartStore.requiresAgreements ? (
      //  <div></div>
        <div style={{ width: '100%', marginTop: '15px' }}>
          {cartStore.agreementData.map((agreement,a) => { 
            console.log("agreement is",agreement); 
            console.log("agreement a is",a); 

            return (
              <div
                style={{ width: '100%', display: 'flex' }}
                key={`agrmnt${a}`}
              >
<input  style={{ 
                    marginRight:'0.5rem'   
                  }}
                  type="checkbox"
                  id={`agmt${a}`}
                  onClick={(e) =>
                    cartStore.setAgreementsChecked(
                      a,
                      e.target.checked,
                    )
                  }
                />
                <label
                  htmlFor={`agmt${a}`}
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    top: '3px',  
                    marginBottom:'0.5rem',
                    textDecoration:'underline' 
                  }}
                >
                   <div>
      <a onClick={()=>getData(agreement.title,agreement.content)}>{agreement.title}</a>  
      
      {model === true?<AgreementModal title={tempData[1]} content={tempData[2]} hide={()=>setModel(false)}/>:''}

    </div>
                </label>
              </div>
            );
          })}


        </div>
        
      ) : (
        <div style={{ width: '100%', marginTop: '15px' }}>
          {/* /CONFIRM_BY_CLICKING_ON_CHECK_AND_PAY_BUTTON */}
          {t("CONFIRM_BY_CLICKING_ON_CHECK_AND_PAY_BUTTON")} 
            {cartStore.agreementData.map((agreement, a) => {
            console.info("the content is",agreement.content);
            return (
              <span key={`agrmnft${a}`}>
                {' '}
                {agreement.title}
                {a !== cartStore.agreements.length - 1 && <>,</>}{' '}
              </span>
            );
          })}
          .
        </div>
      )}

      <button
        style={
          settingsStore.settings.btn_primary_color === undefined
            ? { marginBottom: '20px', width: '100%' }
            : {
                marginBottom: '20px',
                width: '100%',
                // backgroundColor:
                //   settingsStore.settings.btn_primary_color,
                // borderColor:
                //   settingsStore.settings.btn_primary_border_color,
              }
        }
        disabled={cartStore.paymentLoading}
        onClick={() => cartStore.handlePayment()}
      >
        {!cartStore.paymentLoading ? (
          <>{t("CHECK_AND_PAY")} </> 
        ) : (
          <>
            <Loader width={30} height={30} type="Circles" />  
          </>
        )}
      </button>
    </div>
  );
});
export default CartBillingAddress; 
