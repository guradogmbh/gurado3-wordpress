import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const RangePricetag = observer(({ configStore, voucherStore }) => {
  const [showMessage, setShowMessage] = useState(false);
  var { t } = useTranslation();


  const handleAmountChange = (e) => {
    const amount = e.target.value;
    configStore.setPrice(amount);
  //  setShowMessage(amount == 0);
  };

  const handleInputBlur = () => {
    const amount = configStore.price;
    setShowMessage(amount == 0);
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <input
        type="number"
        name="gurado_amount"
        id="gurado_amount"
        style={{height:'50px'}}
        className="gurado-storefront-form-control"
        min={voucherStore.voucher.price_configuration.from}
        max={voucherStore.voucher.price_configuration.to}
        onChange={handleAmountChange}
        onBlur={handleInputBlur}
        placeholder={`${t('AMOUNT')} (${t('FROM')} ${parseFloat(voucherStore.voucher.price_configuration.from).toFixed(2).replace('.', ',')} - ${parseFloat(voucherStore.voucher.price_configuration.to).toFixed(2).replace('.', ',')} ${voucherStore.voucher.currency_code})`}

      />
      {showMessage && <p style={{color:'red'}}>Please enter an amount.</p>}  
    </div>
  );
});

export default RangePricetag;