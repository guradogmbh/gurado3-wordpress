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
  constructor() {
    makeObservable(this, {
      ready: observable,
      settings: observable,
      loadSettings: action,
    });
    this.ready = false;
    this.loadSettings();
  }

  loadSettings = () => {
    this.API.getSettings().then((settings) => {
      runInAction(() => {
        this.settings = settings;
        this.ready = true;
      });
    });
  };
}
