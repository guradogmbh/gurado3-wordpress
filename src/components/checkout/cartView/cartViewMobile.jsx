import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Api from '../../../helper/api';
import QuantityPicker from './quantityPicker';

const API = new Api();
const CartViewMobile = observer(({ cartStore }) => {
  return (
    <div style={{ width: '100%' }}>
      {cartStore.cart.items.map((item, i) => {
        return (
          <div
            key={`mobileitem${i}`}
            style={{
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '55px', height: '31px' }}>
                <img
                  src={item.voucher_design_template.thumbnail_url}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div style={{ flexGrow: '1', textAlign: 'center' }}>
                <b>{item.name}</b> <br />
                {parseFloat(item.unit_price)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
            </div>
            <div
              style={{
                width: 'calc(100% + 40px)',
                backgroundColor: 'rgb(241, 241, 241)',
                height: '60px',
                marginTop: '3px',
                marginLeft: '-20px',
                paddingLeft: '10px',
                marginRight: '-20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <QuantityPicker item={item} cartStore={cartStore} />
              <FontAwesomeIcon
                icon={faTrash}
                style={{ marginLeft: '10px', color: 'red' }}
                onClick={() => cartStore.deleteItem(item.item_id)}
              />
              <span
                style={{ marginLeft: 'auto', marginRight: '10px' }}
              >
                {parseFloat(item.row_total)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </span>
            </div>
            {item.add_ons.length > 0 && (
              <div style={{ width: '100%' }}>
                {item.add_ons.map((addon, a) => {
                  return (
                    <div
                      style={{ width: '100%', display: 'flex' }}
                      key={`guradoaddon${i}${a}`}
                    >
                      <div>zzgl. {addon.name}:</div>
                      <div style={{ marginLeft: 'auto' }}>
                        {parseFloat(addon.row_total)
                          .toFixed(2)
                          .replace('.', ',')}{' '}
                        {cartStore.cart.currency_code}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <div
        style={{
          width: 'calc(100% + 40px)',
          backgroundColor: 'rgb(241, 241, 241)',
          marginTop: '3px',
          marginLeft: '-20px',
          paddingLeft: '30px',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginRight: '-20px',
          paddingRight: '30px',
        }}
      >
        <div style={{ width: '100%' }}>
          <h4>Bestellübersicht</h4>
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          <div>Zwischensumme:</div>
          <div style={{ marginLeft: 'auto' }}>
            {parseFloat(cartStore.cart.subtotal)
              .toFixed(2)
              .replace('.', ',')}{' '}
            {cartStore.cart.currency_code}
          </div>
        </div>
        {cartStore.cart.taxes.map((tax, t) => {
          return (
            <div
              style={{ width: '100%', display: 'flex' }}
              key={`tax${t}`}
            >
              <div>
                {tax.is_included_in_price === 'YES'
                  ? 'inkl. '
                  : 'zzgl. '}
                MwSt ({tax.rate}%)
              </div>
              <div style={{ marginLeft: 'auto' }}>
                {parseFloat(tax.amount).toFixed(2).replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
            </div>
          );
        })}
        <div style={{ width: '100%', display: 'flex' }}>
          <div>
            <b>Gesamtsumme:</b>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <b>
              {parseFloat(cartStore.cart.grand_total)
                .toFixed(2)
                .replace('.', ',')}{' '}
              {cartStore.cart.currency_code}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
});
export default CartViewMobile;
