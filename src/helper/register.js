import axios from 'axios';
export default class Register {
  constructor() {
    this.proxy_url = window.gurado_js_ajax.urls.proxy;
    this.cart_id = null;
    this.billing_address = null;
    this.agreementsRequired = false;
    this.shipping_address = null;
    this.email = null;
  }
  
  registerForm = async (registerData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .post(
          this.proxy_url + '?endpoint=/registerForm',registerData,  
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

  forgetPasswordForm = async (registerData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/forgetPasswordForm&forgetPasswordData='+
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

  verifyForm = async (registerData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/verifyForm&verifyData='+ 
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


  loginForm = async (loginData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .post(
          this.proxy_url + '?endpoint=/loginForm',loginData, 
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

  accountDeletionCode = async() => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/sendAccountDeletionCode&token='+localStorage.getItem('customerToken'), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token')  
            }
          }
        )
        .catch((err) => {
          reject(err);
        });
      let data = JSON.parse(req.data);
      resolve(data);
    });
  } 


  deletionCode = async(deletionData) => {
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/deletionCode&token='+localStorage.getItem('customerToken')+'&deletionData='+
          JSON.stringify(deletionData), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token')  
            }
          }
        )
        .catch((err) => {
          reject(err);
        });
      let data = JSON.parse(req.data);
      resolve(data);
    });

  }

  resendVerificationCode = async (verifyData) => { 
    return new Promise(async (resolve, reject) => {
      let req = await axios
        .get(
          this.proxy_url + '?endpoint=/resendVerificationCode&verifyData='+
          JSON.stringify(verifyData), 
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

  getCustomerAgreements = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/getCustomerAgreements',
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };

  getMyProfile = async () => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/getMyProfile&token='+localStorage.getItem('customerToken'), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token') 
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };


  saveMyProfileData = async (registerData) => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/saveMyProfile&token='+localStorage.getItem('customerToken')+'&registerData='+
          JSON.stringify(registerData), 
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token') 
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };


  changePassword = async (data) => {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          this.proxy_url + '?endpoint=/changePassword&token='+localStorage.getItem('customerToken'),
          data,  
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token') 
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };

  logout = async (data) => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/logout&token='+localStorage.getItem('customerToken'),   
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token') 
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });
  };

  voucherCode = async(data) => {
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/voucherCode&data='+JSON.stringify(data)+'&token='+localStorage.getItem('customerToken'),  
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token') 
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
        });
    });

  };

  getVouchers = async()=>{
    return new Promise(async (resolve, reject) => {
      axios
        .get(
          this.proxy_url + '?endpoint=/getVouchers&token='+localStorage.getItem('customerToken'),  
          {
            headers: {
              'Cache-Control': 'no-store',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Customer-Authorization':localStorage.getItem('token')  
            }
          }
        )
        .then((data) => {
          resolve(JSON.parse(data.data));
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


}





