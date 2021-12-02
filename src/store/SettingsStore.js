import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import Api from '../helper/api';

export default class SettingsStore {
  ready = false;
  settings = {};
  API = new Api();
  display = 'box';
  product = '*';
  constructor() {
    makeObservable(this, {
      ready: observable,
      settings: observable,
      loadSettings: action,
      display: observable,
      product: observable,
    });
    this.ready = false;
    this.loadSettings();
  }

  loadSettings = () => {
    runInAction(() => {
      this.display =
        document.getElementById('gurado-display').innerHTML;
      this.product =
        document.getElementById('gurado-product').innerHTML;
    });

    this.API.getSettings().then((settings) => {
      runInAction(() => {
        this.settings = settings;
        this.ready = true;
      });
    });
  };
}
