import { observer } from 'mobx-react-lite';

const RangePricetag = observer(({ configStore, voucherStore }) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <input
        type="number"
        min={voucherStore.voucher.price_configuration.from}
        max={voucherStore.voucher.price_configuration.to}
        onChange={(e) => configStore.setPrice(e.target.value)}
        placeholder={`Betrag ( von ${parseFloat(
          voucherStore.voucher.price_configuration.from,
        )
          .toFixed(2)
          .replace('.', ',')} - ${parseFloat(
          voucherStore.voucher.price_configuration.to,
        )
          .toFixed(2)
          .replace('.', ',')} ${
          voucherStore.voucher.currency_code
        } )`}
      />
    </div>
  );
});
export default RangePricetag;
