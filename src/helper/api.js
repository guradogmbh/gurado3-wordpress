import axios from 'axios';
export default class Api {
  constructor() {
    this.proxy_url = window.gurado_js_ajax.urls.proxy;
    this.cart_id = null;
    this.billing_address = null;
    this.agreementsRequired = false;
    this.shipping_address = null;
    this.email = null;

    if (sessionStorage.getItem('cart_id')) {
      this.cart_id = sessionStorage.getItem('cart_id');
    }
  }

  setAgreementsRequired = (p) => {
    this.agreementsRequired = p;
  };

  getCartId = () => {
    if (this.cart_id === undefined || this.cart_id === null) {
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    return this.cart_id;
  };
  getEmail = () => {
    return this.email;
  };
  setEmail = (email) => {
    this.email = email;
  };

  getBillingAddress = () => {
    return this.billing_address;
  };
  setBillingAddress = (address) => {
    //TODO: Checking for valid address
    this.billing_address = address;
  };

  getShippingAddress = () => {
    return this.shipping_address;
  };
  setShippingAddress = (address) => {
    this.shipping_address = address;
  };

  getClientId = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(this.proxy_url + '?endpoint=/clientId')
        .then((result) => {
          resolve(result);
        });
    });
  };

  getPriceEstimation = async (sku, options) => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/priceEstimate&sku=' +
          sku +
          '&options=' +
          JSON.stringify(options),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((result) => {
          resolve(JSON.parse(result.data));
        });
    });
  };

  getAgreements = async () => {
    var defaultLanguage = window.gurado_js_ajax.urls.language;
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/getAgreements&defaultLanguage='+defaultLanguage,
          {
            headers: {
              'Cache-Control': 'no-store', 
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };

  updateQty = async (item_id, qty) => { 
    return new Promise(async (resolve, reject) => {
      if (this.cart_id === undefined || this.cart_id === null) {
        this.cart_id = sessionStorage.getItem('cart_id');
      }
      let request_body = [
        {
          op: 'replace',
          path: '/qty',
          value: qty,
        },
      ];
      axios
        .get(
          this.proxy_url +
          '?endpoint=/updateQty&cartId=' +
          this.cart_id +
          '&itemId=' +
          item_id +
          '&item=' +
          JSON.stringify(request_body),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          if (data.data === '') {
            resolve();
          } else {
            reject(JSON.parse(data.data).message);
          }
        });
    });
  };

  getAgreement = async (agreementId) => {
    var defaultLanguage = window.gurado_js_ajax.urls.language;
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/getAgreement&agreementId=' +
          agreementId+'&defaultLanguage='+defaultLanguage,  
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  }; 

  cartRedemption = async (couponCode) => { 
    console.info("in cart redemption12345",couponCode); 
    if (this.cart_id === undefined || this.cart_id === null) { 
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    let request_body = 
      {
        code: couponCode,
      };
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/cartRedemption&cartId=' + 
          this.cart_id+
          '&couponCode=' +
          JSON.stringify(request_body), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  };

  getPreview = async (voucherData,currentTemplateId,customMessage,configStore) => {
    console.info("the selected Options is as follow=>",voucherData.chosenOptions.options);
    console.info("the voucherPreview is as follow=>",voucherData.voucher);
    console.info("the voucherPreview is as follow=>",voucherData.voucher.amount);
    console.info("the configStore is as follow1111=>",configStore);  
    let request_body = {};

    // configStore.price

    if (this.cart_id === undefined || this.cart_id === null) { 
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    if(voucherData.shippingMethod == 'virtual') {
       request_body = 
      {"sku":voucherData.voucher.sku,"delivery_type":voucherData.shippingMethod,"amount":parseFloat(configStore),"qty":1,"virtual_voucher_design_template_id":currentTemplateId,"deliver_to":"self","personalized_message":customMessage,"delivery_speed":"immediate"}; 

      if(voucherData && voucherData.chosenOptions && voucherData.chosenOptions.options && voucherData.chosenOptions.options.length > 0) {
        request_body.options = voucherData.chosenOptions;
      }

    } else if(voucherData.shippingMethod == 'physical') {
        request_body = 
      {"sku":voucherData.voucher.sku,"delivery_type":voucherData.shippingMethod,"amount":parseFloat(configStore),"qty":1,"physical_voucher_design_template_id":currentTemplateId,"deliver_to":"self","personalized_message":customMessage,"delivery_speed":"immediate"}; 
    }
   

    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/previewTemplate&cartId=' + 
          this.cart_id+
          '&couponCode=' +
          JSON.stringify(request_body), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {

          resolve(data);
        });
    });  }

  
  deleteCouponFromCart = async (redemptionId) => { 
    console.info("in cart redemption12345",redemptionId); 
    if (this.cart_id === undefined || this.cart_id === null) {
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    let request_body = 
      {
        redemption_id: redemptionId,
      };
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/deleteCartRedemption&cartId=' + 
          this.cart_id+
          '&redemptionId=' +
          redemptionId, 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          resolve(data);
        });
    });
  };

  getAgreementData = async (agreementId) => { 
    var defaultLanguage = window.gurado_js_ajax.urls.language;
    console.info("in cart agreementId",agreementId); 
    if (this.cart_id === undefined || this.cart_id === null) {
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    let request_body = 
      {
        agreementId: agreementId,
      };
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/getAgreement&agreementId=' +
          agreementId+'&defaultLanguage='+defaultLanguage,  
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          resolve(data); 
        });
    });
  };


  

  sendAddress = async () => {
    return new Promise(async (resolve, reject) => {
      let request_body = [
        {
          op: 'add',
          path: '/guest',
          value: {
            email_address: this.email,
          },
        },
        {
          op: 'add',
          path: '/billing-address',
          value: this.billing_address,
        },
      ];
     // localStorage.setItem('billing_address',this.billing_address);
     localStorage.setItem('billing_address', JSON.stringify(this.billing_address));
      if (this.agreementsRequired) { 
        request_body.push({
          op: 'add',
          path: '/agreements',
          value: [
            {
              agreement_id: '1',
            },
            {
              agreement_id: '2',
            },
            {
              agreement_id: '3',
            },
          ],
        });
      }
      if (this.billing_address.use_for_shipping === 0) {
        request_body.push({
          op: 'add',
          path: '/shipping-address',
          value: this.shipping_address,
        });
      }
      axios
        .get(
          this.proxy_url +
          '?endpoint=/patchCart&cartId=' + 
          this.cart_id +
          '&item=' +
          JSON.stringify(request_body),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          if (data.data === '') {
            resolve();
          } else {
            reject(JSON.parse(data.data).message);
          }
        });
    });
  };

  sendInvoiceOrder = async () => {
    console.info("send invoice order");
    return new Promise(async (resolve, reject) => {
      if (!this.billing_address) reject('No billing address');
      let pBillingAddress = this.billing_address;
      pBillingAddress.billing_salutation = 'mr';
      pBillingAddress.cart_id = this.cart_id;
      pBillingAddress.payment_method = 'invoice'; 
      axios
        .get(
          this.proxy_url +
          '?endpoint=/invoiceOrder&order=' +
          JSON.stringify(pBillingAddress),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        })
        .then((result) => {
          resolve(JSON.parse(result.data));
        });
    });
  };

  getCountries = async () => {
    var defaultLanguage = window.gurado_js_ajax.urls.language;
    console.info("defaultLanguage is as follow123=>",defaultLanguage);

    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/countries&defaultLanguage='+defaultLanguage, 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              //'Content-Language':'it-IT'

            }
          }
        )
        .catch((err) => {
          reject(err);
        })
        .then((result) => {
          resolve(JSON.parse(result.data));
        });
    });
  };

  sendAgreements = async (pAgreements) => {
    let request_body = [
      {
        op: 'add',
        path: '/agreements',
        value: pAgreements,
      },
    ];
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
          '?endpoint=/patchCart&cartId = ' +
          this.cart_id +
          '&item=' +
          JSON.stringify(request_body),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .then((result) => {
          resolve();
        });
    });
  };

  getCart = async () => {
    return new Promise(async (resolve, reject) => {
      if (
        this.cart_id === undefined ||
        this.cart_id === null ||
        this.cart_id.length < 2
      ) {
        if (sessionStorage.getItem('cart_id')) {
          this.cart_id = sessionStorage.getItem('cart_id');
        }
      }
      axios
        .get(
          this.proxy_url +
          '?endpoint=/getCart&cartId=' +
          this.cart_id,
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          console.log(err);
          reject(err);
        })
        .then((result) => {
          let data = JSON.parse(result.data);
          resolve(data);
        });
    });
  };

  getSettings = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/style',
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        })
        .then((result) => {
          resolve(result.data);
        });
    });
  };

  addToCart = async (cart_item) => {
    return new Promise(async (resolve, reject) => {
      if (this.cart_id === null) {
        if (
          sessionStorage.getItem('cart_id') === undefined ||
          sessionStorage.getItem('cart_id') === null ||
          sessionStorage.getItem('cart_id').length < 1
        ) {
          await this.createCart();
        } else {
          this.cart_id = sessionStorage.getItem('cart_id');
        }
      }
      console.log(JSON.stringify(cart_item));
      console.log('adding voucher to cart ' + this.cart_id);
      let url = window.location.href;
      let url_splitted = url.split('#');
      let new_url = url_splitted[0] + '#/checkout';
      sessionStorage.setItem('cart_url', new_url);
      axios
        .get(
          this.proxy_url +
          '?endpoint=/addCartItem&cartId=' +
          this.cart_id +
          '&item=' +
          JSON.stringify(cart_item),
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        })
        .then(async (result) => {
          console.info("cart data is as follow123 1=>",result);
          let data;
          if(data && data.includes('CART_NOT_FOUND')) {
            console.info("Cart Not ffff");
             data = JSON.parse(result.data);  
          }else { 
             data = result.data; 
          }
          if (
            data && data?.code && data.code !== null &&
            data.code !== undefined &&
            data.code === 'CART_NOT_FOUND'
          ) {
            console.info("in cart if condition");
            await this.createCart();
            sessionStorage.setItem('cart_qty', 1);
            resolve(this.addToCart(cart_item));
            return; 
          }
          console.info("cart data is as follow123 2=>",data);

          let cart_qty;
          console.info("cart data is as follow123 3=>",data);

          if (
            data && data?.code && data.code !== undefined &&
            data.code !== null &&
            data.code.length > 1
          ) {
            resolve(data);
            return;
          }
          console.info("cart data is as follow123 4=>",data);

          if (
            sessionStorage.getItem('cart_qty') === null ||
            sessionStorage.getItem('cart_qty') === undefined
          ) {
            cart_qty = 1;
          } else {
            cart_qty =
              parseFloat(sessionStorage.getItem('cart_qty')) + 1; 
          }
          console.info("cart data is as follow123 5=>",data); 

          sessionStorage.setItem('cart_qty', cart_qty);
          console.info("Till Quantity");
          resolve(data); 
        });
    });
  };

  deleteItem = async (item_id) => {
    return new Promise(async (resolve, reject) => {
      if (this.cart_id === undefined || this.cart_id === null) {
        this.cart_id = sessionStorage.getItem('cart_id');
      }
      let req = await axios
        .get(
          this.proxy_url +
          '?endpoint=/deleteItem&cartId=' +
          this.cart_id +
          '&item_id=' +
          item_id,
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        });
      if (
        sessionStorage.getItem('cart_qty') !== null &&
        sessionStorage.getItem('cart_qty') !== undefined &&
        parseFloat(sessionStorage.getItem('cart_qty')) > 0
      ) {
        let new_qty =
          parseFloat(sessionStorage.getItem('cart_qty')) - 1;
        sessionStorage.setItem('cart_qty', new_qty);
      }
      resolve(true);
    });
  };

  createCart = async () => {
    console.info("in create cart");
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/createCart',
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        });
      let data = JSON.parse(req.data);
      sessionStorage.setItem('cart_id', data.cart_id);
      this.cart_id = data.cart_id;
      console.log('created cart ' + data.cart_id);
      resolve(data);
      console.info("create cart end");
    });
  };

  registerForm = async (registerData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/registerForm&registerData='+
          JSON.stringify(registerData), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        });
      let data = JSON.parse(req.data);
     // sessionStorage.setItem('cart_id', data.cart_id);
    //  this.cart_id = data.cart_id;
    //  console.log('created cart ' + data.cart_id);
      resolve(data);
    });
  };



  getVoucherDetails = async (urlKey) => {
    /* 
    returns: a Promise containing voucher detail info as JSON object
    TODO: Error handling
    */
    return new Promise(async (resolve, reject) => {
      let req = await axios.get(
        this.proxy_url + '?endpoint=/urlKey&key=' + urlKey,
      );
      // let req = await axios
      //   .get(this.proxy_url + '?endpoint=/product&sku=' + sku)
      //   .catch((err) => {
      //     reject(err);
      //   });
      let data = JSON.parse(req.data);
      console.info("DAta is as follow=>",data); 
      let sku = data.data[0].sku;

      let result = await axios
        .get(
          this.proxy_url + '?endpoint=/product&sku=' + sku,
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        });

      data = JSON.parse(result.data);
      resolve(data);
    });
  };

  getVoucherDetailsSku = async (sku) => {
    return new Promise(async (resolve, reject) => {
      let result = await axios
        .get(
          this.proxy_url + '?endpoint=/product&sku=' + sku,
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .catch((err) => {
          reject(err);
        });

      let data = JSON.parse(result.data);
      resolve(data);
    });
  };

  getVoucherList = async () => {
    /* 
    returns: a Promise with an array of vouchers as a response
    TODO: Error handling    
    */
    return new Promise(async (resolve, reject) => {
      let category =
        document.getElementById('gurado-category').innerHTML;
      let first_page = await axios.get(
        this.proxy_url +
          '?endpoint=/products&page=1&page_size=20&collection_id=' +
          category,
      );
      let data = JSON.parse(first_page.data);
      let vouchers = data.data;
      let current_page = parseInt(data.pagination.current_page);
      let last_page = parseInt(data.pagination.last_page);
      if (current_page === last_page) resolve(vouchers);
      let promises = [];
      for (let cp = current_page + 1; cp <= last_page; cp++) {
        console.log(cp);
        promises.push(
          new Promise(async (res, reject) => {
            let promise_result = await axios
            .get(
              this.proxy_url +
              '?endpoint=/products&page_size=20&page=' +
              cp +
              '&collection_id=' +
              category,
              {
                headers: {
                  'Cache-Control': 'no-store',
                  'Pragma': 'no-cache',
                  'Expires': '0'
                }
              }
            );
            let promise_data = JSON.parse(promise_result.data);
            res(promise_data.data);
          }),
        );
      }
      await Promise.all(promises).then((results) => {
        for (let i = 0; i < results.length; i++) {
          vouchers = [...vouchers, ...results[i]];
        }
        resolve(vouchers);
      });
    });
  };
}





