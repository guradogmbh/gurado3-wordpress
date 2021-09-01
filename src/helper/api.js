import axios from 'axios';
export default class Api {
  constructor() {
    this.proxy_url = window.gurado_js_ajax.urls.proxy;
    this.cart_id = null;
    this.billing_address = null;
    this.shipping_address = null;
    this.email = null;

    if (sessionStorage.getItem('cart_id')) {
      this.cart_id = sessionStorage.getItem('cart_id');
    }
    console.log(this.cart_id);
  }

  getCartId = () => {
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
        )
        .then((result) => {
          resolve(result);
        });
    });
  };

  getAgreements = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(this.proxy_url + '?endpoint=/getAgreements')
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };

  updateQty = async (item_id, qty) => {
    return new Promise(async (resolve, reject) => {
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
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
            '?endpoint=/getAgreement&agreementId=' +
            agreementId,
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
    return new Promise(async (resolve, reject) => {
      axios
        .get(this.proxy_url + '?endpoint=/countries')
        .catch((err) => {
          reject(err);
        })
        .then((result) => {
          resolve(JSON.parse(result.data));
        });
    });
  };

  getCart = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url +
            '?endpoint=/getCart&cartId=' +
            this.cart_id,
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

  getStyle = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(this.proxy_url + '?endpoint=/style')
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
        await this.createCart();
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
        )
        .catch((err) => {
          reject(err);
        })
        .then(async (result) => {
          let data = JSON.parse(result.data);
          if (
            data.code !== null &&
            data.code !== undefined &&
            data.code === 'CART_NOT_FOUND'
          ) {
            await this.createCart();
            sessionStorage.setItem('cart_qty', 1);
            resolve(this.addToCart(cart_item));
            return;
          }
          let cart_qty;
          if (
            sessionStorage.getItem('cart_qty') === null ||
            sessionStorage.getItem('cart_qty') === undefined
          ) {
            cart_qty = 1;
          } else {
            cart_qty =
              parseFloat(sessionStorage.getItem('cart_qty')) + 1;
          }
          sessionStorage.setItem('cart_qty', cart_qty);
          console.log('blabla');
          resolve(data);
        });
    });
  };

  deleteItem = async (item_id) => {
    return new Promise(async (resolve, reject) => {
      if (this.cart_id === null) return;
      let req = await axios
        .get(
          this.proxy_url +
            '?endpoint=/deleteItem&cartId=' +
            this.cart_id +
            '&item_id=' +
            item_id,
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
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(this.proxy_url + '?endpoint=/createCart')
        .catch((err) => {
          reject(err);
        });
      let data = JSON.parse(req.data);
      sessionStorage.setItem('cart_id', data.cart_id);
      this.cart_id = data.cart_id;
      console.log('created cart ' + data.cart_id);
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
      let sku = data.data[0].sku;

      let result = await axios
        .get(this.proxy_url + '?endpoint=/product&sku=' + sku)
        .catch((err) => {
          reject(err);
        });

      data = JSON.parse(result.data);
      resolve(data);
    });
  };

  getVoucherList = async () => {
    /* 
    returns: a Promise with an array of vouchers as a response
    TODO: Error handling    
    */
    return new Promise(async (resolve, reject) => {
      let first_page = await axios.get(
        this.proxy_url + '?endpoint=/products&page=1&page_size=20',
      );
      let data = JSON.parse(first_page.data);
      let vouchers = data.data;
      let current_page = data.pagination.current_page;
      let last_page = data.pagination.last_page;
      if (current_page === last_page) resolve(vouchers);
      let promises = [];
      for (let cp = current_page + 1; cp <= last_page; cp++) {
        promises.push(
          new Promise(async (resolve, reject) => {
            let promise_result = await axios.get(
              this.proxy_url +
                '?endpoint=/products&page_size=20&page=' +
                cp,
            );
            let promise_data = JSON.parse(promise_result.data);
            resolve(promise_data.data);
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
