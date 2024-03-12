import { observer } from 'mobx-react-lite';
import PriceTag from './priceTag';
import { useTranslation } from 'react-i18next';


const PriceCol = observer(({ voucherStore, configStore }) => {
  console.info("ppp",configStore); 
  var { t } = useTranslation();

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height:'50px'
      }}
    >
      <div style={{ width: '33.333333%', minWidth: '33.333333%' }}>
      {t("AMOUNT")} 
      </div>
      <div style={{ flexGrow: '1' }}>
        <PriceTag
          voucherStore={voucherStore}
          configStore={configStore} 
        />
      </div>
    </div>
  );
});
export default PriceCol;
