import { observer } from 'mobx-react-lite';
import { useLocalStorage } from "./../../useLocalStorage";
import { useTranslation } from 'react-i18next';



const BillingAddressForm = observer(({ cartStore }) => {
 // const [gurado_firstname] = useLocalStorage("gurado_firstname");    
 window.addEventListener("beforeunload", () => localStorage.removeItem('billing_address')); 
 const storageData = JSON.parse(localStorage.getItem("billing_address"));
 var { t } = useTranslation();
 console.info("item data is localStorage",storageData); 
  return (
    <>
      <div
        style={{
          fontSize: '15pt',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {t("CONTACT_INFORMATION")}
        <input
          type="email"
          placeholder={t("EMAIL")}
          name="gurado_email"
          id="gurado_email"
          className="gurado-storefront-form-control"
          style={{height:'50px'}}
          onChange={(e) =>
            cartStore.updateBillingAddress('email', e.target.value) 
          }
          defaultValue={storageData && storageData.email?storageData.email:''} 

          autoComplete="email" 
        />
      </div>
      <div
        style={{
          fontSize: '15pt',
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {t("BILLING_ADDRESS")}
        <input
          type="text"
          placeholder={t("FIRSTNAME")}
          name="gurado_firstname"
          className="gurado-storefront-form-control"
          style={{height:'50px'}}
          //value={gurado_firstname}
          defaultValue={storageData && storageData.firstname?storageData.firstname:''}
          autoComplete="billing given-name"
          onChange={(e) =>
            cartStore.updateBillingAddress(
              'firstname',
              e.target.value,
            )
          }
          id="gurado_firstname"
        />
        </div>
        <div
        style={{
          fontSize: '15pt',
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <input
          type="text"
          style={{ marginTop: '15px',height:'50px'}} 
          placeholder={t("LASTNAME")} 
          name="gurado_lastname"
          className="gurado-storefront-form-control"
          defaultValue={storageData && storageData.lastname?storageData.lastname:''}
          autoComplete="billing family-name"
          onChange={(e) =>
            cartStore.updateBillingAddress('lastname', e.target.value)
          }
          id="gurado_lastname"
        />
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '15px',
          }}
        >
          <input
            style={{ width: '70%',height:'50px' }}
            type="text"
            className="gurado-storefront-form-control"
            placeholder={t("STREET")} 
            onChange={(e) =>
              cartStore.updateBillingAddress('street', e.target.value)
            }
            defaultValue={storageData && storageData.street?storageData.street:''}

            autoComplete="billing street-address"
          />
          <input
            style={{ width: '25%', marginLeft: 'auto',height:'50px' }}
            type="text"
            className="gurado-storefront-form-control"
            onChange={(e) =>
              cartStore.updateBillingAddress(
                'house_number',
                e.target.value,
              )
            }
            defaultValue={storageData && storageData.house_number?storageData.house_number:''}

            placeholder={t("BLOCK_NO")} 
          />
        </div>
        <input
          type="text"
          style={{ marginTop: '15px',height:'50px' }}
          placeholder={t("POSTAL_CODE")} 
          className="gurado-storefront-form-control"
          onChange={(e) =>
            cartStore.updateBillingAddress('postcode', e.target.value)
          }
          defaultValue={storageData && storageData.postcode?storageData.postcode:''}

          autoComplete="billing postal-code"
        />
        <input
          type="text"
          style={{ marginTop: '15px',height:'50px' }}
          className="gurado-storefront-form-control"
          autoComplete="billing address-level2"
          onChange={(e) =>
            cartStore.updateBillingAddress('city', e.target.value)
          }
          defaultValue={storageData && storageData.city?storageData.city:''} 

          placeholder={t("CITY")} 
        />
        <select
          style={{ marginTop: '15px',height:'50px' }}
          className="gurado-storefront-form-control"
         // defaultValue="DE"
          onChange={(e) =>
            cartStore.updateBillingAddress(
              'country_code',
              e.target.value,
            )
          }
          defaultValue={storageData && storageData.country_code?storageData.country_code:' '}

          autoComplete="billing country"
        >
          {cartStore.countries.map((country, c) => {
            return (
              <option value={country.code} key={`gco${c}`}> 
                {country.name}
              </option>
            );
          })}
        </select>
    </>
  );
});
export default BillingAddressForm; 
