import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartStore from '../../store/CartStore';
import SettingsStore from '../../store/SettingsStore';
import BackButton from '../backButton';
import GuradoLoader from '../Loader';
import CartAccordion from './cartAccordion';
import CartNotFound from './cartNotFound';
import PaymentWall from './paymentWall';
import TopTabs from './topTabs';

const cartStore = new CartStore();
const settingsStore = new SettingsStore();

const Checkout = observer(({}) => {
  useEffect(() => {
    cartStore.init();
  }, []);
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
          <BackButton />
        ) : (
          <>
            <div
              style={{ cursor: 'pointer ', marginBottom: '10px' }}
              onClick={() => cartStore.setShowPaymentWall(false)}
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                style={{ position: 'relative', top: '1px' }}
              />{' '}
              Zurück zur Addresseingabe
            </div>
          </>
        )}
        <CartNotFound />
      </div>
    );

  return (
    <div style={{ marginTop: '20px' }}>
      {!cartStore.showPaymentWall ? (
        <BackButton />
      ) : (
        <div
          style={{ cursor: 'pointer ', marginBottom: '10px' }}
          onClick={() => cartStore.setShowPaymentWall(false)}
        >
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            style={{ position: 'relative', top: '1px' }}
          />{' '}
          Zurück zur Addresseingabe
        </div>
      )}
      <TopTabs step={cartStore.showPaymentWall ? '2' : '1'} />
      {!cartStore.showPaymentWall ? (
        <CartAccordion
          cartStore={cartStore}
          settingsStore={settingsStore}
        />
      ) : (
        <>
          <PaymentWall cartStore={cartStore} />
        </>
      )}
    </div>
  );
});
export default Checkout;
