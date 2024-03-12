import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';



const ShippingAddressForm = observer(({ cartStore }) => {
  var { t } = useTranslation();
  return (
    <>
      <div
        style={{
          fontSize: '15pt',
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
          {t("DELIVERY_ADDRESS")}         
          <input
          type="text"
          placeholder={t("FIRSTNAME")}
          autoComplete="shipping given-name"
          onChange={(e) =>
            cartStore.updateShippingAddress(
              'firstname',
              e.target.value,
            )
          }
        />
        <input
          type="text"
          style={{ marginTop: '15px' }}
          placeholder={t("LASTNAME")}
          autoComplete="shipping family-name"
          onChange={(e) =>
            cartStore.updateShippingAddress(
              'lastname',
              e.target.value,
            )
          }
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
            placeholder={t("STREET")}
            onChange={(e) =>
              cartStore.updateShippingAddress(
                'street',
                e.target.value,
              )
            }
            autoComplete="shipping street-address"
          />
          <input
            style={{ width: '25%', marginLeft: 'auto' }}
            type="text"
            onChange={(e) =>
              cartStore.updateShippingAddress(
                'house_number',
                e.target.value,
              )
            }
            placeholder={t("BLOCK_NO")}
          />
        </div>
        <input
          type="text"
          style={{ marginTop: '15px' }}
          placeholder={t("POSTAL_CODE")}
          onChange={(e) =>
            cartStore.updateShippingAddress(
              'postcode',
              e.target.value,
            )
          }
          autoComplete="shipping postal-code"
        />
        <input
          type="text"
          style={{ marginTop: '15px' }}
          autoComplete="shipping address-level2"
          onChange={(e) =>
            cartStore.updateShippingAddress('city', e.target.value)
          }
          placeholder={t("CITY")}
        />
        <select
          style={{ marginTop: '15px' }}
          defaultValue="DE"
          onChange={(e) =>
            cartStore.updateShippingAddress( 
              'country_code',
              e.target.value,
            )
          }
          autoComplete="shipping country"
        >
          {cartStore.countries.map((country, c) => {
            return (
              <option value={country.code} key={`gcos${c}`}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
});
export default ShippingAddressForm;
