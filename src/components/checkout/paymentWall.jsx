import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Api from '../../helper/api';
import SuccessPage from './../success';

const API = new Api();

const PaymentWall = observer(({ cartStore }) => {
  useEffect(() => {
    //make sure that the external JS from gurado is only loaded once
    if (document.getElementById('gurado_listener') === null) {
      console.log('not set');
      const script = document.createElement('script');
      script.setAttribute('id', 'gurado_listener');
      let cart_id = API.getCartId();
      script.src =
        'https://storefront.gurado.de/payments-sdk/js?client_id=' +  
        cartStore.clientId +
        '&cart_id=' +
        cart_id;
     // script.src = 'https://storeFront-vahuja.dev.gurado.de/';

      script.onload = () => {
        console.log("in onload");
        window.gurado
          .Payments({
            onComplete: function () {
              document.body.removeChild(script);
              console.log("on complete");
             //cartStore.setShowPaymentWall(false); 
              window.location = '#success'; 
            },
            onError: function () {
              console.log('error');
            },
          })
          .render('#gurado-payments-container'); 
      };

      document.body.appendChild(script); 
      cartStore.setScriptSet(true);
    } else {
      console.log('not set else'); 

      //if already loaded, we just append the payment wall to the already existing div to reload it
      let script = document.getElementById('gurado_listener'); 
      window.gurado
        .Payments({
          onComplete: function () {
            document.body.removeChild(script);
            window.location = '#success';
          },
          onError: function () {
            console.log('error');
          },
        })
        .render('#gurado-payments-container');
    }
  }, [cartStore.showPaymentWall]);

  return (
    <div
      id="gurado-payments-container"
      style={{ margin: '50px auto' }}
    ></div>
  );
});
export default PaymentWall;
