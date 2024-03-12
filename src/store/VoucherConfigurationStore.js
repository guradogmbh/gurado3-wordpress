import {
  action,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

export default class VoucherConfigurationStore {
  loading = true;
  price = 0.0;
  recipient = 'self';
  recipientName = '';
  recipientMail = '';
  customText = '';
  senderName = '';
  constructor() {
    makeObservable(this, {
      price: observable,
      setPrice: action,
      recipient: observable,
      setRecipient: action,
      init: action,
      recipientName: observable,
      setRecipientName: action,
     // previewImage: observable,
    //  setPreviewImage: action, 
      recipientMail: observable,
      setRecipientMail: action,
      customText: observable,
      setCustomText: action,
      senderName: observable,
      setSenderName: action,
    });
  }

  setSenderName = (name) => {
    runInAction(() => {
      this.senderName = name;
    });
  };

  init = (voucherStore) => {
    switch (
      voucherStore.voucher.price_configuration.type.toLowerCase()
    ) {
      case 'range':
        runInAction(() => {
          this.price = parseFloat(
            voucherStore.voucher.price_configuration.from,
          ).toFixed(2);
        });
        break;
      case 'configurable':
        runInAction(() => {
          this.price = parseFloat(
            voucherStore.voucher.price_configuration.minimum,
          ).toFixed(2);
        });
        break;
      case 'fixed':
        runInAction(() => {
          this.price = parseFloat(
            voucherStore.voucher.price_configuration.amount,
          ).toFixed(2);
        });
        break;
      case 'dropdown':
        runInAction(() => {
          this.price = parseFloat(
            voucherStore.voucher.price_configuration.options[0],
          ).toFixed(2);
        });
        break;
    }
  };

  setCustomText = (text,voucherStore,configStore) => {
    runInAction(() => {
      this.customText = text;
      const timeoutId = setTimeout(() => {
        console.info("in set timeout",voucherStore); 

        voucherStore.getPreview(voucherStore,voucherStore.templateId,this.customText,configStore.price) ;
        localStorage.setItem('custom_text',text);   
      }, 1000);
  
      return () => {
        console.info("in clear timeout"); 
        clearTimeout(timeoutId);
      };
    //  console.log("custom text=>",this.customText);
      });
  };

  setRecipientMail = (mail) => {
    runInAction(() => {
      this.recipientMail = mail;
    });
  };

  setRecipientName = (name) => {
    runInAction(() => {
      this.recipientName = name;
    });
  };

  setPrice = (price) => {
    runInAction(() => {
      this.price = parseFloat(price).toFixed(2);
    });
  };

  setRecipient = (recipient) => {
    console.log(recipient);

    runInAction(() => {
      this.recipient = recipient;
    });
  };
}
