import { observer } from 'mobx-react-lite';
import React from 'react';
import SettingsStore from '../../store/SettingsStore';
import VoucherListStore from '../../store/VoucherListStore';
import GuradoLoader from '../Loader';
import VoucherPage from '../voucherpage/voucherpage';
import BoxView from './boxview/boxview';
import ListView from './listview/listview';

const settingsStore = new SettingsStore();
const voucherListStore = new VoucherListStore();

const VoucherList = observer(({}) => {
  if (!settingsStore.ready) {
    return <GuradoLoader />;
  }
  if (settingsStore.ready) {
    if (settingsStore.product === '*' && !voucherListStore.ready) {
      return <GuradoLoader />;
    }
    if (settingsStore.product !== '*') {
      return <VoucherPage sku={settingsStore.product} />;
    }
  }

  if (settingsStore.display === 'box') {
    return (
      <BoxView
        settingsStore={settingsStore}
        voucherListStore={voucherListStore}
      />
    );
  }

  if (settingsStore.display === 'list') {
    return (
      <ListView
        settingsStore={settingsStore}
        voucherListStore={voucherListStore}
      />
    );
  }
});
export default VoucherList;
