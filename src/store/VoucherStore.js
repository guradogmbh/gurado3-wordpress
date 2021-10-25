import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import Api from '../helper/api';

export default class VoucherStore {
  ready = false;
  voucher = null;
  API = new Api();
  shippingMethod = 'virtual';
  templateId = '0';
  activeImage = null;
  isConfigurable = false;
  options = [];
  chosenOptions = { options: [] };
  requiredOptions = 0;
  estimationLoading = false;
  configStore = null;
  constructor() {
    makeObservable(this, {
      ready: observable,
      voucher: observable,
      init: action,
      shippingMethod: observable,
      setShippingMethod: action,
      templateId: observable,
      setTemplateId: action,
      activeImage: observable,
      setActiveImage: action,
      isConfigurable: observable,
      options: observable,
      chosenOptions: observable,
      setOption: action,
      requiredOptions: observable,
      estimationLoading: observable,
      configStore: observable,
      connect: action,
    });

    autorun(() => {
      if (!this.ready) return;
      if (!this.isConfigurable) return;
      if (!this.chosenOptions.options.length > 0) return;
      runInAction(() => {
        this.estimationLoading = true;
      });
      this.API.getPriceEstimation(
        this.voucher.sku,
        this.chosenOptions,
      ).then((res) => {
        runInAction(() => {
          this.estimationLoading = false;
          this.configStore.setPrice(res.price);
        });
      });
    });

    autorun(() => {
      if (!this.ready) return;
      if (this.shippingMethod === 'virtual') {
        this.setTemplateId(
          this.voucher.virtual_voucher_design_templates[0]
            .template_id,
        );
        this.setActiveImage(
          this.voucher.virtual_voucher_design_templates[0]
            .thumbnail_url,
        );
      }
      if (this.shippingMethod === 'physical') {
        this.setTemplateId(
          this.voucher.physical_voucher_design_templates[0]
            .template_id,
        );
        this.setActiveImage(
          this.voucher.physical_voucher_design_templates[0]
            .thumbnail_url,
        );
      }
    });
  }

  connect = (configStore) => {
    runInAction(() => {
      this.configStore = configStore;
    });
  };

  setOption = (pOptionId, pValue) => {
    if (
      this.chosenOptions.options.filter(
        (option) => option.option_id === pOptionId,
      ).length > 0
    ) {
      let index = this.chosenOptions.options.findIndex(
        (option) => option.option_id === pOptionId,
      );
      let opt = [...this.chosenOptions.options];
      opt[index].value = pValue;
      runInAction(() => {
        this.chosenOptions = { options: opt };
      });
      return;
    }
    runInAction(() => {
      this.chosenOptions = {
        options: [
          ...this.chosenOptions.options,
          { option_id: pOptionId, value: pValue },
        ],
      };
    });
  };

  setTemplateId = (id) => {
    runInAction(() => {
      this.templateId = id;
    });
  };

  init = (urlkey) => {
    runInAction(() => {
      this.ready = false;
    });
    this.API.getVoucherDetails(urlkey).then((data) => {
      runInAction(() => {
        this.voucher = data;
        if (
          data.price_configuration.type.toLowerCase() ===
          'configurable'
        ) {
          this.isConfigurable = true;
          this.options = data.options;
          this.chosenOptions = { options: [] };
          let pRequiredOptions = 0;
          data.options.map((option) => {
            if (option.is_required.toLowerCase() === 'yes') {
              pRequiredOptions++;
            }
          });
          this.requiredOptions = pRequiredOptions;
        } else {
          this.isConfigurable = false;
          this.options = [];
          this.chosenOptions = { options: [] };
          this.requiredOptions = 0;
        }
        this.ready = true;
        this.templateId =
          data.virtual_voucher_design_templates[0].template_id;
      });
    });
  };

  setShippingMethod = (method) => {
    runInAction(() => {
      this.shippingMethod = method;
    });
  };

  setActiveImage = (image) => {
    runInAction(() => {
      this.activeImage = image;
    });
  };
}
