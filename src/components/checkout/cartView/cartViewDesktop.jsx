import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import Api from '../../../helper/api';
import QuantityPicker from './quantityPicker';

const API = new Api();
const CartViewDesktop = observer(({ cartStore }) => {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ width: '100%', display: 'flex', fontSize: '18px' }}
      >
        <div style={{ width: '66.66666%' }}>Artikel</div>
        <div style={{ width: '16.66666%' }}>Einzelpreis</div>
        <div style={{ flexGrow: '1' }}>Betrag</div>
      </div>
      <hr style={{ width: '100%' }} />
      {cartStore.cart.items.map((item, i) => {
        return (
          <Fragment key={`dsdk${i}`}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '30px',
                fontSize: '16px',
              }}
            >
              <div style={{ width: '46.66666%' }}>
                {item.name}
                <br />
                <img
                  src={item.voucher_design_template.thumbnail_url}
                  style={{ width: '160px', height: '90px' }}
                />
              </div>
              <div
                style={{
                  width: '20%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <QuantityPicker cartStore={cartStore} item={item} />
                <span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: 'pointer' }}
                    onClick={() => cartStore.deleteItem(item.item_id)}
                  />{' '}
                  Löschen
                </span>
              </div>
              <div
                style={{
                  width: '16.66666%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {parseFloat(item.unit_price)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
              <div
                style={{
                  flexGrow: '1',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {parseFloat(item.row_total)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
            </div>
            {item.add_ons.length > 0 && (
              <>
                {item.add_ons.map((addon, a) => {
                  return (
                    <div
                      key={`gaddon${i}${a}`}
                      style={{ width: '100%', display: 'flex' }}
                    >
                      <div
                        style={{
                          width: '66.66666%',
                          textAlign: 'end',
                          paddingRight: '15px',
                        }}
                      >
                        zzgl. {addon.name}
                      </div>
                      <div style={{ width: '16.66666%' }}>
                        {parseFloat(addon.unit_price)
                          .toFixed(2)
                          .replace('.', ',')}{' '}
                        {cartStore.cart.currency_code}
                      </div>
                      <div style={{ flexGrow: '1' }}>
                        {parseFloat(addon.row_total)
                          .toFixed(2)
                          .replace('.', ',')}{' '}
                        {cartStore.cart.currency_code}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </Fragment>
        );
      })}
      <div
        style={{ width: '100%', display: 'flex', marginTop: '30px' }}
      >
        <div style={{ width: '66.66666%' }}></div>
        <div
          style={{
            width: '16.66666%',
            textAlign: 'end',
            paddingRight: '15px',
          }}
        >
          Zwischensumme:
        </div>
        <div style={{ flexGrow: '1' }}>
          {parseFloat(cartStore.cart.subtotal)
            .toFixed(2)
            .replace('.', ',')}{' '}
          {cartStore.cart.currency_code}
        </div>
      </div>
      {cartStore.cart.taxes.map((tax, t) => {
        return (
          <div
            key={`gtax${t}`}
            style={{
              width: '100%',
              display: 'flex',
            }}
          >
            <div style={{ width: '66.66666%' }}></div>
            <div
              style={{
                width: '16.66666%',
                textAlign: 'end',
                paddingRight: '15px',
              }}
            >
              inkl. MwSt ({tax.rate}%):
            </div>
            <div style={{ flexGrow: '1' }}>
              {parseFloat(tax.amount).toFixed(2).replace('.', ',')}{' '}
              {cartStore.cart.currency_code}
            </div>
          </div>
        );
      })}
      <div
        style={{ width: '100%', display: 'flex', marginTop: '30px' }}
      >
        <div style={{ width: '66.66666%' }}></div>
        <div
          style={{
            width: '16.66666%',
            textAlign: 'end',
            paddingRight: '15px',
          }}
        >
          <b>Gesamtsumme</b>:
        </div>
        <div style={{ flexGrow: '1' }}>
          {parseFloat(cartStore.cart.grand_total)
            .toFixed(2)
            .replace('.', ',')}{' '}
          {cartStore.cart.currency_code}
        </div>
      </div>
    </div>
  );
});
export default CartViewDesktop;
