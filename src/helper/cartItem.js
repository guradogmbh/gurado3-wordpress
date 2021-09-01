export default class CartItem {
  constructor() {
    this.delivery_type = 'virtual'; // required, virtual | physical
    this.amount = null; //required
    this.sku = null; //required
    this.qty = 1; //required
    this.deliver_to = 'self'; //required, self | someone_else
    this.personalized_message = '';
    this.delivery_speed = 'immediate';
    this.virtual_voucher_design_template_id = null;
    this.physical_voucher_design_template_id = null;
    this.recipient_email_address = '';
    this.sender_name = '';
    this.recipient_name = '';
    this.options = [];
  }
  setOptions(pOptions) {
    this.options = pOptions;
  }
  getOptions() {
    return this.options;
  }
  getRecipientLastname() {
    return this.recipient_lastname;
  }
  setRecipientLastname(pName) {
    this.recipient_lastname = pName;
  }
  getRecipientName() {
    return this.recipient_name;
  }
  setRecipientName(pName) {
    this.recipient_name = pName;
  }
  getSenderName() {
    return this.sender_name;
  }
  setSenderName(pName) {
    this.sender_name = pName;
  }
  setEmail(pEmail) {
    this.recipient_email_address = pEmail;
  }
  getEmail() {
    return this.recipient_email_address;
  }
  setMessage(pMes) {
    this.personalized_message = pMes;
  }
  getMessage() {
    return this.personalized_message;
  }
  setRecipient(pRec) {
    this.deliver_to = pRec;
  }
  getRecipient() {
    return this.deliver_to;
  }
  setDeliveryType(pType) {
    this.delivery_type = pType;
  }
  getDeliveryType() {
    return this.delivery_type;
  }
  setAmount(pAmount) {
    this.amount = pAmount;
  }
  setSku(pSku) {
    this.sku = pSku;
  }
  setQty(pQty) {
    this.qty = pQty;
  }
  setDesignTemplate(pId) {
    this.virtual_voucher_design_template_id = pId;
    this.physical_voucher_design_template_id = pId;
  }
  getAmount() {
    return this.amount;
  }
  getSku() {
    return this.sku;
  }
  getQty() {
    return this.qty;
  }
  getDesignTemplate() {
    return this.virtual_voucher_design_template;
  }
}
