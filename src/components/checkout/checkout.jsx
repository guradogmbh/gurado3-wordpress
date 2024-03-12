import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import CartStore from '../../store/CartStore';
import CartBillingAddress from './cartBillingAddress';
import CartItem from '../../helper/cartItem';

import SettingsStore from '../../store/SettingsStore';
import BackButton from '../backButton';
import GuradoLoader from '../Loader';
import CartAccordion from './cartAccordion';
import CartNotFound from './cartNotFound';
import PaymentWall from './paymentWall';
import TopTabs from './topTabs';
import { useTranslation } from 'react-i18next';


const cartStore = new CartStore();
const settingsStore = new SettingsStore();


const Checkout = observer(({}) => {
  var { t } = useTranslation();
  const [showCartPage, setShowCartPage] = useState(false);


  const showAddressToggle = async () => {
    cartStore.setShowPaymentWall(false);
    cartStore.setShowContactInformationForm(true);
  } 

  const showCartToggle = async () => {
    console.info("Cart toogle On");
    cartStore.setShowPaymentWall(false);
    cartStore.setShowContactInformationForm(false);
  //  setShowCartPage(true);
  }

  // const showBackToggle = aync() => {

  // }

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
  useEffect(() => {
    cartStore.init();
    cartStore.setShowPaymentWall(false);
  }, []);
  useEffect(() => {
    console.log("cartStore.showPaymentWall",cartStore.showPaymentWall); 
    console.log("cartStore.showContactInformationForm",cartStore.showContactInformationForm); 

    if (
      cartStore.showPaymentWall &&
      settingsStore.settings.automatic_scrolling &&
      settingsStore.settings.automatic_scrolling.toString() === 'on'
    ) {
      window.scrollTo(0, 0);
    }
  }, [cartStore.showPaymentWall]);
  if (
    !cartStore.ready ||
    !cartStore.countriesReady ||
    !cartStore.agreementsReady ||
    !settingsStore.ready
  ) {
    return <GuradoLoader />;
  }

  if (!cartStore.found)
    return (
      <div style={{ marginTop: '20px' }}>
        
        {!cartStore.showPaymentWall ? (
          <div
        style={{ cursor: 'pointer ', marginBottom: '10px' }} 
        onClick={() => showCartToggle()}
        >
        <FontAwesomeIcon
          icon={faChevronCircleLeft}
          style={{ position: 'relative', top: '1px' }}
        />{' '}
              {t("BACK_TO_CART")}
        </div>        ) : (
          <>
            <div
              style={{ cursor: 'pointer ', marginBottom: '10px' }}
              onClick={() => showAddressToggle()}
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                style={{ position: 'relative', top: '1px' }}   
              />{' '}
                {t("BACK_TO_ADDRESS_ENTRY")} 
            </div>
          </>
        )}
        <CartNotFound />
      </div>
    );

  return (

    <div style={{ marginTop: '20px' }}>
      {!cartStore.showPaymentWall && !cartStore.showContactInformationForm? (
                <BackButton />
                ) :!cartStore.showPaymentWall? (
        <div
          style={{ cursor: 'pointer ', marginBottom: '10px' }} 
          onClick={() => showCartToggle()}
        >
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ position: 'relative', top: '1px' }}
          />{' '}
                {t("BACK_TO_CART")}
        </div>
      ):(
        <div
          style={{ cursor: 'pointer ', marginBottom: '10px' }}
          onClick={() => showAddressToggle()}
        >
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ position: 'relative', top: '1px' }}
          />{' '}
                {t("BACK_TO_ADDRESS_ENTRY")}
        </div>
      )}

      <TopTabs
        step={cartStore.showContactInformationForm ?'2':cartStore.showPaymentWall ? '3' : '1' } 
        settingsStore={settingsStore}
      />
      {!cartStore.showPaymentWall && !cartStore.showContactInformationForm ? (
        <CartAccordion
          cartStore={cartStore}
          settingsStore={settingsStore}
        /> 
      ) : !cartStore.showPaymentWall? 
       <CartBillingAddress cartStore={cartStore} settingsStore={settingsStore} />  : (
        <><PaymentWall cartStore={cartStore}/></> 
      )}

      {/* {showCartPage && <CartAccordion cartStore={cartStore} settingsStore={settingsStore} />} */}
      </div>
  );
});
export default Checkout; 
