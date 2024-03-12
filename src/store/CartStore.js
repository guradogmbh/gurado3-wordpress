import { times } from 'lodash';
import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import AgreementModal from '../components/voucherpage/agreementModal';
import Api from '../helper/api';

export default class CartStore {
  ready = false;
  found = false;
  cart = null;
  agreementData = []; 
  reloading = false;
  API = new Api();
  countries = [];
  countriesReady = false;
  couponCode = {};
  billingAddress = {};
  shippingAddress = {};
  requiresShipping = false;
  useForShipping = true;
  agreementsReady = false;
  paymentLoading = false;
  redeemLoading = false;
  clientId = null;
  requiresAgreements = false;
  showPaymentWall = false;
  showContactInformationForm = false;
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
      agreementData:observable, 
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
      redeemLoading: observable,
      handlePayment: action,
      showPaymentWall: observable,
      setShowPaymentWall: action,
      showContactInformationForm:observable,
      setShowContactInformationForm:action, 
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

  setShowContactInformationForm = (p) => {
    console.info("pth value is as follow=>",p);

    runInAction(() => {
      this.showContactInformationForm = p; 
    });

  };

  handlePayment = () => {
    console.info("in handle payment123");
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
      console.info("the result is 12345",res);
      runInAction(() => {
        console.info("In run action 12345");
        this.paymentLoading = false;
        this.showPaymentWall = true;
        this.showContactInformationForm = false;
      });
    });
  };

  setAgreementsChecked = (num, c) => {
    runInAction(() => {
      this.agreementsChecked[num] = c;
      console.log("set agreements",this.agreementsChecked[num]);
<AgreementModal
            //closeModal={() => this.closeModal()}
            isOpen={true}/>    }); 
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

  setCouponCode = (key, value) => {
    runInAction(() => {
      this.couponCode[key] = value;
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

  cartRedemption = () => {
    this.redeemLoading = true;
    let result = '';
    console.info("test12345",this.couponCode);
    this.API.cartRedemption(this.couponCode.gurado_coupon_code).then((res) => {
      console.info("test12345 cartRedemption",res); 
      if(res && res.data && res.data != '')
      {
        result = JSON.parse(res.data);        
        this.redeemLoading = false;


      }
      else {
        this.reloadCart();  
        document.getElementById('gurado_coupon_code').value = ''; 

        this.redeemLoading = false;


      }

      if(result &&  result.code == 'INVALID_REDEMPTION_CODE') { 
        alert("Ungültiger Gutscheincode"); 
      }
    });
  }

  
  deleteCouponFromCart = (redemption_id) => {
    this.redeemLoading = true;
    console.info("test1235",redemption_id);

    this.API.deleteCouponFromCart(redemption_id).then((res) => { 
      this.setCouponCode('gurado_coupon_code','');
      //document.getElementById('gurado_coupon_code').reset(); 


      console.info ("the result is=>",res);
      this.reloadCart();  
      this.redeemLoading = false;
      document.getElementById('gurado_coupon_code').value = '';
    });
  }

  // getAgreementContent = (agreement_id) => {
  //  // this.redeemLoading = true;
  //   console.info("test1235 agreement_id",agreement_id);

  //   this.API.getAgreementData(agreement_id).then((res) => { 
  //   //  this.setCouponCode('gurado_coupon_code','');
  //     //document.getElementById('gurado_coupon_code').reset(); 
  //     this.agreementData = res;

  //     return JSON.parse(res).content;

  //   //  return res;
  //     console.info ("the result is=>",res);
  //   //  this.reloadCart();  
  //    // this.redeemLoading = false;
  //    // document.getElementById('gurado_coupon_code').value = ''; 
  //   });
  // }

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
          this.couponCode['gurado_coupon_code'] = ''; 
        });
      });
    }
    if (this.agreements.length === 0) {
      this.API.getAgreements().then((agreements) => {
        console.log("agreements are",agreements);
        runInAction(() => {
          this.agreements = agreements;
          this.agreements.forEach(data=>{
          //  this.agreementData['agreement_id'] = data.agreement_id;
            //this.agreementData.push({agreement_id:data.agreement_id,title:data.title})
         //   this.agreementData['title'] = data.title;
            console.info("the main data is",data.agreement_id);
                this.API.getAgreementData(data.agreement_id).then((res) => {  
              //  this.agreementData = JSON.parse(res.data).content;
              this.agreementData.push({agreement_id:data.agreement_id,title:data.title,content:JSON.parse(res.data).content})

             // this.agreementData.push({content:JSON.parse(res.data).content}); 

                //this.agreementData['content'] = JSON.parse(res.data).content; 
                console.info("the main data is this.agreementData",this.agreementData); 

                 })

                 console.info("the agreement final array is",this.agreementData);

          });


          for (let i = 0; i < agreements.length; i++) {
            this.agreementsChecked[i] = false;
          }
          this.agreementsReady = true;
        });
      });

      // this.API.getAgreementData(1).then((res) => {  
      //   runInAction(() => {
      //   //  this.setCouponCode('gurado_coupon_code','');
      //     //document.getElementById('gurado_coupon_code').reset(); 
      //     this.agreementData = Object.entries(res);  
    
      //   //  return JSON.parse(res).content;
    
      //   //  return res;
         
      //   //  this.reloadCart();  
      //    // this.redeemLoading = false;
      //    // document.getElementById('gurado_coupon_code').value = ''; 
      //   });
      // });

      // this.API.getAgreement().then((agreements) => {
      //   console.log("agreements 12345 are",agreements);
      //   runInAction(() => {
      //     this.agreements = agreements;
      //     for (let i = 0; i < agreements.length; i++) {
      //       this.agreementsChecked[i] = false;
      //     }
      //     this.agreementsReady = true;
      //   });
      // });
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
        this.setCouponCode('gurado_coupon_code','');  
      });
    });
    this.API.getClientId().then((res) => {
      runInAction(() => {
        this.clientId = res.data;
      });
    });
  };
}
