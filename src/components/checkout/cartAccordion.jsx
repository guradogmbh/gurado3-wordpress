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
import SuccessModal from './../voucherpage/successModal';
import AgreementModal from './../voucherpage/agreementModal';
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

const CartAccordion = observer(({ cartStore, settingsStore }) => {
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
      <Accordion> 
      <div>
        <AccordionItem dangerouslySetExpanded>
          <AccordionItemHeading>
            <AccordionItemButton>
              <FontAwesomeIcon icon={faCartArrowDown} /> {t("VIEW_SHOPPING_CART")} 
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {isMobile && <CartViewMobile cartStore={cartStore} />}
            {!isMobile && <CartViewDesktop cartStore={cartStore} />}  
          </AccordionItemPanel>
        </AccordionItem>
        </div>
      </Accordion>
      <div className="gurado-cart-button" style={{marginTop:'20px'}} >
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
      
      onClick={() => cartStore.setShowContactInformationForm(true)}
    >
               {t("CONTINUE")}   
    </button>
    </div>
    </div>
    
  );
});
export default CartAccordion; 
