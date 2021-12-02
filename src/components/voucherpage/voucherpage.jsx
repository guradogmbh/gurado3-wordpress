import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import SettingsStore from '../../store/SettingsStore';
import VoucherStore from '../../store/VoucherStore';
import BackButton from '../backButton';
import GuradoLoader from '../Loader';
import ConfigurationSelection from './configurationSelection';
import MotiveSelection from './motiveSelection';
import ShippingMethodSelector from './shippingMethodSelector';
import TopDescription from './topdescription';

const voucherStore = new VoucherStore();
const settingsStore = new SettingsStore();

const VoucherPage = observer(({ urlKey, sku }) => {
  useEffect(() => {
    if (settingsStore.ready) {
      if (
        settingsStore.settings.automatic_scrolling &&
        settingsStore.settings.automatic_scrolling.toString() === 'on'
      ) {
        window.scrollTo(0, 0);
      }
    }
  }, [settingsStore.ready]);
  useState(() => {
    if (urlKey === undefined && sku === undefined) return;
    if (sku === undefined && urlKey !== undefined) {
      voucherStore.init(urlKey);
    }
    if (sku !== undefined && urlKey === undefined) {
      voucherStore.initSku(sku);
    }
  }, [urlKey, sku]);

  if (!voucherStore.ready || !settingsStore.ready) {
    return <GuradoLoader />;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {settingsStore.product === '*' && <BackButton />}
      <h1
        style={{
          color:
            settingsStore.settings.header_color === undefined
              ? 'black'
              : settingsStore.settings.header_color,
        }}
      >
        {voucherStore.voucher.name}
      </h1>
      <TopDescription voucherStore={voucherStore} />
      <hr style={{ borderWidth: '0.5px' }} />
      {voucherStore.voucher.can_deliver_voucher_physically ===
        'YES' && (
        <ShippingMethodSelector
          voucherStore={voucherStore}
          settingsStore={settingsStore}
        />
      )}
      <MotiveSelection
        voucherStore={voucherStore}
        settingsStore={settingsStore}
      />
      <ConfigurationSelection
        voucherStore={voucherStore}
        settingsStore={settingsStore}
      />
    </div>
  );
});
export default VoucherPage;
