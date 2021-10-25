import { observer } from 'mobx-react-lite';

const DropdownPricetag = observer(({ voucherStore, configStore }) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <select
        className="gurado_pricedropdown"
        onChange={(e) => configStore.setPrice(e.target.value)}
      >
        {voucherStore.voucher.price_configuration.options.map(
          (opt, o) => {
            return (
              <option key={`gurado_opt${o}`} value={opt}>
                {parseFloat(opt).toFixed(2).replace('.', ',')}{' '}
                {voucherStore.voucher.currency_code}
              </option>
            );
          },
        )}
      </select>
      {voucherStore.shippingMethod === 'physical' && (
        <span>
          (+
          {parseFloat(
            voucherStore.voucher.physical_voucher_price.total,
          )
            .toFixed(2)
            .replace('.', ',')}{' '}
          {voucherStore.voucher.currency_code} Versand und Druck)
        </span>
      )}
    </div>
  );
});
export default DropdownPricetag;
