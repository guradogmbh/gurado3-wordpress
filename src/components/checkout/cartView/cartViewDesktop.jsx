import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { Fragment, useState } from 'react';
import Api from '../../../helper/api';
import QuantityPicker from './quantityPicker';
import Loader from 'react-loader-spinner';
import { Trans,useTranslation } from 'react-i18next';
import SettingsStore from '../../../store/SettingsStore';




const API = new Api();
const settingsStore = new SettingsStore(); 

const CartViewDesktop = observer(({ cartStore }) => {
  console.info("cart view desktopp");
  const [loading, setLoading] = useState(false);
   // State to store value from the input field
   const [inputValue, setInputValue] = useState("");

   
   var { t } = useTranslation();
   var {mm} =  'ddddeeeffff'; 

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ width: '100%', display: 'flex', fontSize: '18px' }}
      >
        <div style={{ width: '53%' }}>{t("ARTICLE")}
</div>
<div style={{ width: '17%' }}>{t("QUANTITY")}
</div>
        <div style={{ width: '13%' }}>{t("PRICE")}
</div>
        <div style={{ flexGrow: '1' }}>{t("AMOUNT")}  
</div>
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
                  {t("DELETE")}
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
        style={{ width: '100%', marginTop: '30px' }}
      >
        <div className='row'>
        {cartStore.cart && cartStore.cart.can_apply_redemption && cartStore.cart.can_apply_redemption == 'YES' ?
          (<div className='col-lg-6'>
            <span style={{ display: 'block' }}>
              <div>
              {t("DISCOUNT_CODES")}
              </div>
              <div style={{ marginTop: '15px' }}>
              {t("IF_YOU_HAVE_A_DISCOUNT_CODE_PLEASE_ENTER_IT_HERE")}
              </div>
              
              {cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code ? (
                <div>
                <input
                type="text"
                placeholder=""
                autoComplete="false"
                className="gurado-storefront-form-control"
                style={{height:'50px'}}
                value={cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code?cartStore.cart.redemptions[0].code:''}
                onChange={(e) =>
                  cartStore.setCouponCode(
                    'gurado_coupon_code', 
                    '',
                  )
                }
                disabled={cartStore.cart && cartStore.cart.redemptions && cartStore.cart.redemptions.length && cartStore.cart.redemptions[0].code?true:undefined}
                id="gurado_coupon_code" 
              />
                <button
                  style={
                    settingsStore.settings.btn_primary_color === undefined
                      ? { width: '100%', marginTop: '30px', }
                      : {
                        width: '100%',
                        marginTop: '30px',
                        // backgroundColor:
                        //   settingsStore.settings.btn_primary_color,
                      }
                  }
                  onClick={cartStore.deleteCouponFromCart.bind(this,cartStore.cart.redemptions[0].redemption_id)}  >

                  {!cartStore.redeemLoading ? (
                    <>{t("CANCEL_DISCOUNT_CODE")}</> 
                      ) : (
                        <>
                          <Loader width="30" color="white"
                  height="20" type="ThreeDots" />  
                        </> 
                      )}

                
                   </button> </div>): ( 
                     <div>
                     <input
                     type="text"
                     placeholder=""
                     autoComplete="false"
                     className='gurado-storefront-form-control'
                     style={{height:'50px'}} 
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
                      ? { width: '100%', marginTop: '30px'}
                      : {
                        width: '100%',
                        marginTop: '30px',
                        // backgroundColor:
                        //   settingsStore.settings.btn_primary_color,
                        
                      }
                  }
                  onClick={cartStore.cartRedemption} 
                 
                >
                  {!cartStore.redeemLoading ? (
                    <>{t("REDEEM_DISCOUNT_CODE")}</> 
                      ) : (
                        <>
                          <Loader width="30"
                  height="20" color="white"
                  type="ThreeDots" />
                        </> 
                      )}

                </button></div>)}  


            </span>
          </div>):'' 
}
          <div className={cartStore.cart && cartStore.cart.can_apply_redemption && cartStore.cart.can_apply_redemption == 'YES'?'col-lg-6':'col-lg-12'} style={{ textAlign: 'right',marginLeft:'-58px' }}>
            <span style={{ display: 'inline-flex',marginTop: '30px' }}>
              <div>
              {t("SUBTOTAL")}              
              </div>
              <div style={{
                paddingLeft: '15px',
              }}>
                {parseFloat(cartStore.cart.subtotal)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
            </span>
            <br></br>
            {cartStore.cart.taxes.map((tax, t) => {
              var { trans } = useTranslation();

              return (
                <div
                  key={`gtax${t}`}
                >
                  <span style={{ display: 'inline-flex' }}>

                    <div>
                    <Trans t={t}>TAX_INCLUDED</Trans> : ({tax.rate}%):
                    </div>
                    <div style={{
                      paddingLeft: '15px',
                    }}>
                      {parseFloat(tax.amount).toFixed(2).replace('.', ',')}{' '}
                      {cartStore.cart.currency_code}
                    </div>
                  </span>

                </div>
              );
            })}

            {cartStore.cart.redemptions.map((redemption, t) => {
              //   var {mm} =  'ddddeeeffff';


              var { trans } = useTranslation();
              return (
                <div
                  key={`gtax${t}`}
                >
                  <span style={{ display: 'inline-flex' }}>

                    <div>
                      <Trans t={t}>DISCOUNT</Trans>:  ({redemption.code}):
                    </div>
                    <div style={{
                      paddingLeft: '15px',
                    }}>
                      {parseFloat(redemption.amount).toFixed(2).replace('.', ',')}{' '}
                      {cartStore.cart.currency_code}
                    </div>
                  </span>

                </div>
              );
            })}

            <span style={{ display: 'inline-flex',marginTop: '30px' }}>
              <div>
                <b>{t("TOTAL")}</b>:
              </div>
              <div style={{
                paddingLeft: '15px',
              }}>
                {parseFloat(cartStore.cart.grand_total)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
                {cartStore.cart.currency_code}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>

  );
});
export default CartViewDesktop;
