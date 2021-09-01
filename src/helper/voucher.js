export default class VoucherHelper {
  constructor() {
    this.vouchers = [];
  }
  extractVouchers = (data) => {
    this.vouchers = [];
    for (let i = 0; i < data.length; i++) {
      this.vouchers.push(new Voucher(data[i]));
    }
  };
  getVouchers() {
    return this.vouchers;
  }
}

class Voucher {
  constructor(data) {
    this.currency_code = data.currency_code;
    this.image_url = data.images[0].image_url;
    this.name = data.name;
    this.price_configuration = data.price_configuration;
    this.short_description = data.short_description;
    this.sku = data.sku;
    this.url_key = data.url_key;
  }
  getCurrencyCode() {
    return this.currency_code;
  }
  getUrlKey() {
    return this.url_key;
  }
  getImageUrl() {
    return this.image_url;
  }
  getName() {
    return this.name;
  }
  getPriceConfiguration() {
    return this.price_configuration;
  }
  getShortDescription() {
    return this.short_description;
  }
  getSku() {
    return this.sku;
  }
}
