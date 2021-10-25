import { observer } from 'mobx-react-lite';
import PriceTag from './priceTag';

const PriceCol = observer(({ voucherStore, configStore }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '33.333333%', minWidth: '33.333333%' }}>
        Betrag:
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
