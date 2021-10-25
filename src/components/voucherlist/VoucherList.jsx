import { observer } from 'mobx-react-lite';
import React from 'react';
import SettingsStore from '../../store/SettingsStore';
import VoucherListStore from '../../store/VoucherListStore';
import GuradoLoader from '../Loader';
import BoxView from './boxview/boxview';

const settingsStore = new SettingsStore();
const voucherListStore = new VoucherListStore();

const VoucherList = observer(({}) => {
  if (!settingsStore.ready || !voucherListStore.ready) {
    return <GuradoLoader />;
  }
  return (
    <BoxView
      settingsStore={settingsStore}
      voucherListStore={voucherListStore}
    />
  );
});
export default VoucherList;
