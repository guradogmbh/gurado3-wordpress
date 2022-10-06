import { observer } from 'mobx-react-lite';
import { useLocalStorage } from "./../../useLocalStorage";


const BillingAddressForm = observer(({ cartStore }) => {
 // const [gurado_firstname] = useLocalStorage("gurado_firstname");    
 window.addEventListener("beforeunload", () => localStorage.removeItem('billing_address')); 
 const storageData = JSON.parse(localStorage.getItem("billing_address"));
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
        Kontaktinformation
        <input
          type="email"
          placeholder="E-Mail"
          name="gurado_email"
          id="gurado_email"
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
        Rechnungsadresse
        <input
          type="text"
          placeholder="Vorname"
          name="gurado_firstname"
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
        <input
          type="text"
          style={{ marginTop: '15px' }}
          placeholder="Nachname"
          name="gurado_lastname"
          defaultValue={storageData && storageData.lastname?storageData.lastname:''}
          autoComplete="billing family-name"
          onChange={(e) =>
            cartStore.updateBillingAddress('lastname', e.target.value)
          }
          id="gurado_lastname"
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '15px',
          }}
        >
          <input
            style={{ width: '70%' }}
            type="text"
            placeholder="Straße"
            onChange={(e) =>
              cartStore.updateBillingAddress('street', e.target.value)
            }
            defaultValue={storageData && storageData.street?storageData.street:''}

            autoComplete="billing street-address"
          />
          <input
            style={{ width: '25%', marginLeft: 'auto' }}
            type="text"
            onChange={(e) =>
              cartStore.updateBillingAddress(
                'house_number',
                e.target.value,
              )
            }
            defaultValue={storageData && storageData.house_number?storageData.house_number:''}

            placeholder="Nr."
          />
        </div>
        <input
          type="text"
          style={{ marginTop: '15px' }}
          placeholder="PLZ"
          onChange={(e) =>
            cartStore.updateBillingAddress('postcode', e.target.value)
          }
          defaultValue={storageData && storageData.postcode?storageData.postcode:''}

          autoComplete="billing postal-code"
        />
        <input
          type="text"
          style={{ marginTop: '15px' }}
          autoComplete="billing address-level2"
          onChange={(e) =>
            cartStore.updateBillingAddress('city', e.target.value)
          }
          defaultValue={storageData && storageData.city?storageData.city:''} 

          placeholder="Ort"
        />
        <select
          style={{ marginTop: '15px' }}
         // defaultValue="DE"
          onChange={(e) =>
            cartStore.updateBillingAddress(
              'country_code',
              e.target.value,
            )
          }
          defaultValue={storageData && storageData.country_code?storageData.country_code:'DE'}

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
      </div>
    </>
  );
});
export default BillingAddressForm; 
