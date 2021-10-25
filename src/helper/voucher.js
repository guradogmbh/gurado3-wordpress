export default class Voucher {
  constructor(data) {
    this.currency_code = data.currency_code;
    if (
      data.images.length === 0 ||
      data.images[0].image_url === undefined ||
      data.images[0].image_url === null ||
      typeof data.images[0].image_url === 'object'
    ) {
      this.image_url = 'https://i.stack.imgur.com/y9DpT.jpg';
    } else {
      this.image_url = data.images[0].image_url;
    }

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
