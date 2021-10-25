import { times } from 'lodash';
import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import Api from '../helper/api';

export default class CartStore {
  ready = false;
  found = false;
  cart = null;
  reloading = false;
  API = new Api();
  countries = [];
  countriesReady = false;
  billingAddress = {};
  shippingAddress = {};
  requiresShipping = false;
  useForShipping = true;
  agreementsReady = false;
  paymentLoading = false;
  clientId = null;
  requiresAgreements = false;
  showPaymentWall = false;
  scriptSet = false;
  agreements = [];
  agreementsChecked = [];
  constructor() {
    makeObservable(this, {
      ready: observable,
      init: action,
      found: observable,
      reloadCart: action,
      updateQty: action,
      cart: observable,
      countries: observable,
      reloading: observable,
      countriesReady: observable,
      billingAddress: observable,
      requiresShipping: observable,
      updateBillingAddress: action,
      useForShipping: observable,
      updateUseForShipping: action,
      shippingAddress: observable,
      updateShippingAddress: action,
      requiresAgreements: observable,
      clientId: observable,
      agreements: observable,
      agreementsReady: observable,
      agreementsChecked: observable,
      setAgreementsChecked: action,
      paymentLoading: observable,
      handlePayment: action,
      showPaymentWall: observable,
      setShowPaymentWall: action,
      scriptSet: observable,
      setScriptSet: action,
    });
  }

  setScriptSet = (p) => {
    runInAction(() => {
      times.scriptSet = p;
    });
  };

  setShowPaymentWall = (p) => {
    runInAction(() => {
      this.showPaymentWall = p;
    });
  };

  handlePayment = () => {
    runInAction(() => {
      this.paymentLoading = true;
    });
    if (this.requiresAgreements) {
      let good = true;
      for (let i = 0; i < this.agreementsChecked.length; i++) {
        if (this.agreementsChecked[i] === false) {
          good = false;
        }
      }
      if (!good) {
        alert('Bitte die Bedingungen lesen und akzeptieren');
        runInAction(() => {
          this.paymentLoading = false;
        });
        return;
      }
    }
    this.API.setAgreementsRequired(this.requiresAgreements);
    this.API.setEmail(this.billingAddress['email']);
    if (!this.useForShipping) {
      this.API.setShippingAddress(this.shippingAddress);
    }
    if (this.requiresShipping) {
      runInAction(() => {
        this.billingAddress['use_for_shipping'] = this.useForShipping
          ? 1
          : 0;
      });
    }
    this.API.setBillingAddress(this.billingAddress);
    this.API.sendAddress().then((res) => {
      runInAction(() => {
        this.paymentLoading = false;
        this.showPaymentWall = true;
      });
    });
  };

  setAgreementsChecked = (num, c) => {
    runInAction(() => {
      this.agreementsChecked[num] = c;
      console.log(this.agreementsChecked[num]);
    });
  };

  updateUseForShipping = () => {
    runInAction(() => {
      this.useForShipping = !this.useForShipping;
      console.log(this.useForShipping);
    });
  };

  updateShippingAddress = (key, value) => {
    runInAction(() => {
      this.shippingAddress[key] = value;
    });
  };
  updateBillingAddress = (key, value) => {
    runInAction(() => {
      this.billingAddress[key] = value;
    });
  };

  reloadCart = () => {
    this.init();
  };

  deleteItem = (item_id) => {
    this.API.deleteItem(item_id).then(() => {
      this.reloadCart();
    });
  };

  updateQty = (item_id, qty) => {
    let index = this.cart.items.findIndex(
      (item) => item.item_id === item_id,
    );
    runInAction(() => {
      this.reloading = true;
      if (qty < 1) {
        // this.cart.items = this.cart.items.slice(index, 1);
      } else {
        this.cart.items[index].qty = qty;
      }
    });
    if (qty < 1) {
      this.API.deleteItem(item_id).then(() => {
        this.reloadCart();
      });
    } else {
      this.API.updateQty(item_id, qty).then((res) => {
        this.reloadCart();
      });
    }
  };

  init = () => {
    runInAction(() => {
      this.reloading = true;
    });
    if (this.countries.length === 0) {
      this.API.getCountries().then((countries) => {
        console.log(countries);
        runInAction(() => {
          this.countries = countries;
          this.countriesReady = true;
          this.billingAddress['country_code'] = 'DE';
          this.shippingAddress['country_code'] = 'DE';
        });
      });
    }
    if (this.agreements.length === 0) {
      this.API.getAgreements().then((agreements) => {
        runInAction(() => {
          this.agreements = agreements;
          for (let i = 0; i < agreements.length; i++) {
            this.agreementsChecked[i] = false;
          }
          this.agreementsReady = true;
        });
      });
    }
    this.API.getCart().then((res) => {
      console.log(res);
      runInAction(() => {
        if (
          (res.code !== undefined &&
            res.code.toLowerCase() === 'cart_not_found') ||
          res.items.length === 0
        ) {
          this.found = false;
        } else {
          this.found = true;
          this.cart = res;
        }
        if (res.requires_shipping === true) {
          this.requiresShipping = true;
          this.useForShipping = true;
        }
        if (res.requires_agreement_acceptance) {
          this.requiresAgreements = true;
        }
        this.ready = true;
        this.reloading = false;
      });
    });
    this.API.getClientId().then((res) => {
      runInAction(() => {
        this.clientId = res.data;
      });
    });
  };
}
