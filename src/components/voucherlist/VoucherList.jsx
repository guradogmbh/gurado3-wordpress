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
console.info("voucher list from product list",settingsStore.display);
console.info("voucher list from product list voucherListStore vouchers",voucherListStore.vouchers.length);


const VoucherList = observer(({}) => {
  // if (!settingsStore.ready) {
  //   return <GuradoLoader />;
  // }

 // if()

  if (settingsStore.ready) {
    if (settingsStore.product === '*' && !voucherListStore.ready) {
      return <GuradoLoader />;
    }
    if (settingsStore.product !== '*') {
      return <VoucherPage sku={settingsStore.product} />; 
   }

    console.info("settingsStore=>",settingsStore.product);
  }


  if(voucherListStore && voucherListStore.ready) {
    if(voucherListStore && voucherListStore.vouchers && voucherListStore.vouchers.length && voucherListStore.vouchers.length == 1) {
      return <VoucherPage sku={voucherListStore.vouchers[0].sku} />; 
    }
  } 

   if (settingsStore.display === 'box') {
    console.info("display box");
    return (
      <BoxView
        settingsStore={settingsStore}
        voucherListStore={voucherListStore}
      >
      </BoxView>
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
