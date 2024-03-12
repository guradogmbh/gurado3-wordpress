import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import GuradoLoader from '../Loader';
import axios from 'axios';




const MotiveSelection = observer(
  ({ voucherStore, settingsStore,configStore }) => { 
    console.info("tttt configStore is as follow=>",configStore); 

    const [activeIndex, setActiveIndex] = useState(0);
    const [templates, setTemplates] = useState([]);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    var { t } = useTranslation();

    const responsive = {
      0: {
        items: 1,
      },
      340: {
        items: 2,
      },
      510: {
        items: 3,
      },
      680: {
        items: 4,
      },
      850: {
        items: 5,
      },
    };

    console.log(
      Math.floor(
        parseFloat(
          document.getElementById('gurado-react').offsetWidth / 170, 
        ),
      ),
    );
    const calcTemplates = (pTemplates) => {
      let templates = [];
      pTemplates.map((t, i) => {
        templates.push(
          <div
            key={`tmplt${t.template_id}`}
            style={{
              width: 200 + 10,
              height: 'auto',
              padding:'10px'
            }}
            onClick={() => {
              setActiveIndex(i);
              voucherStore.getPreview(voucherStore,t.template_id,'',configStore);  
              voucherStore.setTemplateId(t.template_id);
              voucherStore.setActiveImage(t.thumbnail_url);
            }}
            className="gurado_vd_carousel_template"
          >
            <img
              className="img-fluid gurado_vd_carousel_img"
              src={t.thumbnail_url}
              style={{
                width: 120,
                height: 'auto',
                border:
                  activeIndex === i ? '3px solid' : '0px',
                padding: activeIndex === i ? '-3px' : '5px', 
                //borderColor:'inherit'?
              }}
            />
          </div>,
        );
      });
      setTemplates(templates);
    };

    useEffect(() => {
      if (!voucherStore.ready) return;
      
      console.log("voucherStore=>",voucherStore.voucher.allow_personalized_message); 

    }, [voucherStore.ready]);

    useEffect(() => {
      console.info("in use effect1");
      if (voucherStore.shippingMethod === 'virtual') {
        calcTemplates(
          voucherStore.voucher.virtual_voucher_design_templates,
        );
      } else {
        if (
          voucherStore.voucher.physical_voucher_design_templates
            .length === 0
        )
          return;
        calcTemplates(
          voucherStore.voucher.physical_voucher_design_templates,
        );
      }
    }, [voucherStore.shippingMethod, activeIndex]);

    useEffect(() => {
      console.info("in use effect2=>",voucherStore.voucher.physical_voucher_design_templates,voucherStore.voucher);

      setActiveIndex(0);
      if(voucherStore.shippingMethod === 'virtual') {
        console.info("configStore.price111",configStore); 
        <GuradoLoader />

        let amount = 
        voucherStore.getPreview(voucherStore, voucherStore.voucher.virtual_voucher_design_templates[0].template_id,'',configStore);
      }  else {
        console.info("configStore.price1",configStore); 
        <GuradoLoader />

        voucherStore.getPreview(voucherStore, voucherStore.voucher.physical_voucher_design_templates[0].template_id,'',configStore); 
      }
    }, [voucherStore.shippingMethod]);


    return (

      <div style={{ width: '100%'}}>
        {/* <h3
          style={{
            color:
              settingsStore.settings.header_color === undefined
                ? ''
                : settingsStore.settings.header_color,
          }}
        >
          {(voucherStore.shippingMethod === 'virtual' &&
            voucherStore.voucher.virtual_voucher_design_templates
              .length < 2) ||
          (voucherStore.shippingMethod === 'physical' &&
            voucherStore.voucher.physical_voucher_design_templates
              .length < 2)
            ? `Gutscheinmotiv` 
            : 'Motiv wählen'}  
        </h3> */}
        {(voucherStore.shippingMethod === 'virtual' &&
          voucherStore.voucher.virtual_voucher_design_templates
            .length === 0) ||
        (voucherStore.shippingMethod === 'physical' &&
          voucherStore.voucher.physical_voucher_design_templates
            .length === 0) ? (
          <p>{t("NO_MOTIVE_SELECTABLE")}</p> 
        ) : (
          <div>



          {(voucherStore.shippingMethod === 'virtual' && voucherStore.voucher.virtual_voucher_design_templates && voucherStore.voucher.virtual_voucher_design_templates.length > 1) &&  <AliceCarousel
            activeIndex={activeIndex}
            controlsStrategy={'responsive'}
            responsive={responsive}
            disableButtonsControls={isMobile}
            disableDotsControls={!isMobile}
            items={templates}
          /> }

            {(voucherStore.shippingMethod === 'physical' && voucherStore.voucher.physical_voucher_design_templates && voucherStore.voucher.physical_voucher_design_templates.length > 1) &&  <AliceCarousel
                        activeIndex={activeIndex}
                        controlsStrategy={'responsive'}
                        responsive={responsive}
                        disableButtonsControls={isMobile}
                        disableDotsControls={!isMobile}
                        items={templates}
            /> } 
                    
         
          </div> 
        
          
        )}
      </div>
    );
  },
);
export default MotiveSelection;
