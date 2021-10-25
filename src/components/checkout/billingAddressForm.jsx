import { observer } from 'mobx-react-lite';

const BillingAddressForm = observer(({ cartStore }) => {
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
          autoComplete="billing postal-code"
        />
        <input
          type="text"
          style={{ marginTop: '15px' }}
          autoComplete="billing address-level2"
          onChange={(e) =>
            cartStore.updateBillingAddress('city', e.target.value)
          }
          placeholder="Ort"
        />
        <select
          style={{ marginTop: '15px' }}
          defaultValue="DE"
          onChange={(e) =>
            cartStore.updateBillingAddress(
              'country_code',
              e.target.value,
            )
          }
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
