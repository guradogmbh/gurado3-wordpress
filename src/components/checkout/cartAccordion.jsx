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

const CartAccordion = observer(({ cartStore, settingsStore }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div style={{ marginTop: '30px' }}>
      <Accordion>
        <AccordionItem dangerouslySetExpanded>
          <AccordionItemHeading>
            <AccordionItemButton>
              <FontAwesomeIcon icon={faCartArrowDown} /> Warenkorb
              anzeigen
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {isMobile && <CartViewMobile cartStore={cartStore} />}
            {!isMobile && <CartViewDesktop cartStore={cartStore} />}
          </AccordionItemPanel> 
        </AccordionItem>
      </Accordion>
      <div style={{ marginTop: '30px' }}></div>
      <BillingAddressForm cartStore={cartStore} />
      {cartStore.requiresShipping && (
        <div style={{ width: '100%', marginTop: '10px' }}>
          <input
            type="checkbox"
            name="reqshp"
            id="reqshp"
            onClick={() => cartStore.updateUseForShipping()}
          />
          <label htmlFor="reqshp">abweichende Lieferadresse</label>
        </div>
      )}
      {!cartStore.useForShipping && (
        <ShippingAddressForm cartStore={cartStore} />
      )}
      {cartStore.requiresAgreements ? (
        <div style={{ width: '100%', marginTop: '15px' }}>
          {cartStore.agreements.map((agreement, a) => {
            return (
              <div
                style={{ width: '100%', display: 'flex' }}
                key={`agrmnt${a}`}
              >
                <input
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
                    top: '-7px',
                  }}
                >
                  {agreement.title}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ width: '100%', marginTop: '15px' }}>
          Mit dem Klick auf Prüfen und Bezahlen bestätigen Sie die
          {cartStore.agreements.map((agreement, a) => {
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
                backgroundColor:
                  settingsStore.settings.btn_primary_color,
                borderColor:
                  settingsStore.settings.btn_primary_border_color,
              }
        }
        disabled={cartStore.paymentLoading}
        onClick={() => cartStore.handlePayment()}
      >
        {!cartStore.paymentLoading ? (
          <>Prüfen und bezahlen</>
        ) : (
          <>
            <Loader width={30} height={30} type="Circles" />
          </>
        )}
      </button>
    </div>
  );
});
export default CartAccordion;
