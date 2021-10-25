import { observer } from 'mobx-react-lite';

const FixedPricetag = observer(({ configStore, voucherStore }) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      {parseFloat(configStore.price).toFixed(2).replace('.', ',')}{' '}
      {voucherStore.voucher.currency_code}{' '}
      {voucherStore.shippingMethod === 'physical' && (
        <>
          (+
          {parseFloat(
            voucherStore.voucher.physical_voucher_price.total,
          )
            .toFixed(2)
            .replace('.', ',')}{' '}
          {voucherStore.voucher.currency_code} Versand und Druck)
        </>
      )}
    </div>
  );
});
export default FixedPricetag;
