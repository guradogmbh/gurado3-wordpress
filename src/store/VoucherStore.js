import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import Api from '../helper/api';
import Carousel from './../../src/components/voucherpage/CarosuelComponent';
import ReactDOM from 'react-dom';
import { isArray } from 'lodash';

export default class VoucherStore {
  ready = false;
  voucher = null;
  API = new Api();
  shippingMethod = 'virtual';
  templateId = '0';
  activeImage = null;
  previewImage = '';
  isConfigurable = false;
  options = [];
  chosenOptions = { options: [] };
  requiredOptions = 0;
  estimationLoading = false;
  previewLoading = false;
  configStore = null;
  constructor() {
    makeObservable(this, {
      ready: observable,
      voucher: observable,
      init: action,
      initSku: action,
     setPreviewImage: observable,
      shippingMethod: observable,
      setShippingMethod: action,
      setPreviewLoading: action,
      templateId: observable,
      setTemplateId: action,
      activeImage: observable,
      previewImage:observable,
      setPreviewImage:action,
      setActiveImage: action,
      isConfigurable: observable,
      options: observable,
      chosenOptions: observable,
      setOption: action,
      requiredOptions: observable,
      estimationLoading: observable,
      previewLoading : observable,
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
        console.info("this.voucher=>",this.voucher);
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

  initSku = (sku) => {
    runInAction(() => {
      this.ready = false;
    });
    this.API.getVoucherDetailsSku(sku).then((data) => {
      runInAction(() => {
        console.info("in voucher details sku ");
        this.voucher = data;
        console.info("voucher data is=>",this.voucher); 
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

  init = (urlkey) => {
    runInAction(() => {
      this.ready = false;
    });
    this.API.getVoucherDetails(urlkey).then((data) => {
      console.info("the data is as foll",data);

      runInAction(() => {
        this.voucher = data;
        if (
          data.price_configuration.type.toLowerCase() ===
          'configurable' || data && data.options && data.options.length > 0
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
    console.info("in set method loading=>",method);

    runInAction(() => {
      this.shippingMethod = method;
    });
  };


  setPreviewLoading = (loading) => {
    console.info("in set preview loading=>",loading);
    runInAction(() => {
      this.previewLoading = loading; 
    }); 
  };

  setActiveImage = (image) => {
    runInAction(() => {
      this.activeImage = image;
    });
  };




  setPreviewImage = (image) => {
    autorun(() => {
    runInAction(() => {
      console.info("this.shippingMethod=>",this.shippingMethod);
      this.previewImage = image;
      if(this.previewImage) {
        if(this.shippingMethod == 'virtual' && !isArray(image)) {
          const multipleImage = document.getElementById("updateImage1"); 
          const singleImage = document.getElementById("updateImage"); 
          multipleImage.style.display = "none";
          singleImage.style.display = "block";
          console.info("not is array function");
          document.getElementById('updateImage').src = this.previewImage;  
          runInAction(() => {
            this.previewLoading = false; 
          });
          // console.info("preview Loading output=>",this.previewLoading); 
        }
        else if(this.shippingMethod == 'virtual' && isArray(image)) {
          console.info("is array function");
          const multipleImage = document.getElementById("updateImage1"); 
          const singleImage = document.getElementById("updateImage"); 

          multipleImage.style.display = "block";
          singleImage.style.display = "none";
          let images = [];
          this.previewImage.forEach(element => {
            images.push(element.image_url);
          });

          console.info("in else block set preview image images=>",images);  

          const dynamicContent = <Carousel images={images} />;  

          ReactDOM.render(dynamicContent, multipleImage); 


        }
        else {
          console.info("in else block set preview image");
          // if(window.innerWidth > 995) {
          //   document.getElementById('updateImage1').src = this.previewImage[3].image_url;  
          //   document.getElementById('updateImage2').src = this.previewImage[2].image_url;  
          //   document.getElementById('updateImage3').src = this.previewImage[1].image_url;  
          //   document.getElementById('updateImage4').src = this.previewImage[0].image_url;  
          // } else {
            const element = document.getElementById("updateImages"); 
            console.info("in else block set preview image element=>",element);
            runInAction(() => {
              this.previewLoading = false;
            });

           // const element = document.getElementById("updateImages");

            let images = [];
            this.previewImage.forEach(element => {
              images.push(element.image_url);
            });

            console.info("in else block set preview image images=>",images);  

            const dynamicContent = <Carousel images={images} />;  
            ReactDOM.render(dynamicContent, element);

            //element.innerHTML = dynamicContent;  
         // }
        } 
      }else {
        document.getElementById('updateImage').src = 'https://cdn-int.gurado.de/fileadmin/images/A4-image-2.svg'; 

      } 

      console.info("the preview",this.previewImage);
    });
  });
  };

  getPreview = (i,id,message,price) => {
    console.info("voucherData shipping method",i,i.shippingMethod);
    this.previewLoading = true;
    runInAction(() => {
      console.info("in run in action for true");
      this.setPreviewLoading(true);
      this.previewLoading = true;
    });
    this.API.getPreview(i,id,message,price).then((res) => {
      runInAction(() => {
        console.info("in run in action for false");

        this.previewLoading = false;
        this.setPreviewLoading(false);

      });
      console.info("REs is the follow=>",res);
      let imageData = JSON.parse(res.data);
      console.info("the imagedata is as follow->",imageData); 
      if(imageData && imageData != undefined) { 
        if(imageData && imageData.length == 1){
          console.info("test12345 cartRedemption",imageData[0].image_url); 
          this.setPreviewImage(imageData[0].image_url);  
        } else 
        {
          if(i && i.shippingMethod == 'virtual' && imageData && imageData.length == 1 ) {
            this.setPreviewImage(imageData[0].image_url);   
          }
          else {
            this.setPreviewImage(imageData);   
          }
        //  console.info("test12345 cartRedemption",imageData[0].image_url); 
        }
      
      }


    
      // if(res && res.data && res.data != '')
      // {
      //  let result = JSON.parse(res.data);        
      // } 

  });

  };
}
