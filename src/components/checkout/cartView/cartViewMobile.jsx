import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Api from '../../../helper/api';
import QuantityPicker from './quantityPicker';
import SettingsStore from '../../../store/SettingsStore';
import Loader from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

const API = new Api();
const settingsStore = JSON.parse(localStorage.getItem('settings')); 

const CartViewMobile = observer(({ cartStore }) => {
  var { t } = useTranslation();

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
                //backgroundColor: 'rgb(241, 241, 241)', 
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
       {cartStore.cart && cartStore.cart.can_apply_redemption && cartStore.cart.can_apply_redemption == 'YES' ?
      (<div
        style={{
          width: 'calc(100% + 40px)',
          //backgroundColor: 'rgb(241, 241, 241)',
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
          <h4>{t('DISCOUNT_CODES')}</h4>
          <h6>{t('IF_YOU_HAVE_A_DISCOUNT_CODE_PLEASE_ENTER_IT_HERE')}</h6> 
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
        {cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code ? (
                <div>
                <input
                type="text"
                placeholder=""
                name="gurado_coupon_code"
                className='gurado-storefront-form-control'
                style={{height:'50px'}} 
                autoComplete=""
                value={cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code?cartStore.cart.redemptions[0].code:''}
                disabled={cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code?true:undefined}
                onChange={(e) =>
                  cartStore.setCouponCode(  
                    'gurado_coupon_code',
                    e.target.value,
                  )
                }
                id="gurado_coupon_code"
              />
                <button
                  style={
                    settingsStore.settings.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px'
                        // backgroundColor:
                        //   settingsStore.settings.btn_primary_color,
                      }
                  }
                  onClick={cartStore.deleteCouponFromCart.bind(this,cartStore.cart.redemptions[0].redemption_id)}  

                >
                   {!cartStore.redeemLoading ? (
                    <>{t('CANCEL_DISCOUNT_CODE')}</>
                      ) : (
                        <>
                          <Loader width={30} height={30} color="white" type="ThreeDots" />  
                        </> 
                      )} </button> </div>): ( 
                     <div>
                     <input
                     type="text"
                     placeholder=""
                     name="gurado_coupon_code"
                     className='gurado-storefront-form-control'
                     style={{height:'50px'}} 
                     autoComplete=""
                     onChange={(e) =>
                       cartStore.setCouponCode(
                         'gurado_coupon_code',
                         e.target.value,
                       )
                     }
                     id="gurado_coupon_code"  
                   />
                
                
                <button
                  style={
                    settingsStore.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px' }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        // backgroundColor:
                        //   settingsStore.btn_primary_color, 
                      }
                  }
                  onClick={cartStore.cartRedemption} 
                >
                   {!cartStore.redeemLoading ? (
                    <>{t('REDEEM_DISCOUNT_CODE')}</> 
                      ) : (
                        <>
                          <Loader width={30} height={30}
                   color="white"
                  type="ThreeDots" />
                        </> 
                      )}
                </button></div>)}  
        </div>
      </div> ):''} 


      <div
        style={{
          width: 'calc(100% + 40px)',
          //backgroundColor: 'rgb(241, 241, 241)',
          marginTop: '20px',
          marginLeft: '-20px',
          paddingLeft: '30px',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginRight: '-20px',
          paddingRight: '30px',
        }}
      >
        <div style={{ width: '100%' }}>
          <h4>{t('ORDER_OVERVIEW')}</h4>
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          <div>{t('SUBTOTAL')}:</div>
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
         {cartStore.cart.redemptions.map((redemption, t) => {
              return (
                <div
                style={{ width: '100%', display: 'flex' }}

                  key={`gtax${t}`}
                >
                    <div>
                    {t('DISCOUNT')}  ({redemption.code}):
                    </div>
                    <div style={{
                     marginLeft: 'auto'
                    }}>
                      {parseFloat(redemption.amount).toFixed(2).replace('.', ',')}{' '}
                      {cartStore.cart.currency_code}
                    </div>

                </div>
              );
            })}
        <div style={{ width: '100%', display: 'flex' }}>
          <div>
            <b>{t('TOTAL')} :</b>
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
