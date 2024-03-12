import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import Api from '../helper/api';

export default class VoucherListStore {
  ready = false;
  vouchers = [];
  API = new Api();
  constructor() {
    makeObservable(this, {
      ready: observable,
      vouchers: observable,
      loadVouchers: action,
    });
    this.loadVouchers();
  }

  loadVouchers = () => {
    console.info("in load vvv");
    this.API.getVoucherList().then((list) => {
      runInAction(() => {
        console.info("list is as follow=>",list);

        this.vouchers = list;
        this.ready = true;
      });
    });
  };
}
