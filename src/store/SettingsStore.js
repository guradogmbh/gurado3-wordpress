import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import register from '../helper/register';

export default class SettingsStore {
  ready = false;
  settings = {};
  API = new register();
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

    // this.API.getSettings().then((settings) => {
    //   console.info("in load setting");

    //   runInAction(() => {
    //     this.settings = settings;
    //     localStorage.setItem('settings',JSON.stringify(this.settings));  
         this.ready = true; 
    //   });
    // });
  };
}
