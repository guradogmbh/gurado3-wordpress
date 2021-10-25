import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const MotiveSelection = observer(
  ({ voucherStore, settingsStore }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [templates, setTemplates] = useState([]);

    const calcTemplates = (pTemplates) => {
      let templates = [];
      pTemplates.map((t, i) => {
        templates.push(
          <div
            key={`tmplt${t.template_id}`}
            style={{
              width: t.thumbnail_width + 10,
              height: t.thumbnail_height + 10,
            }}
            onClick={() => {
              setActiveIndex(i);
              voucherStore.setTemplateId(t.template_id);
              voucherStore.setActiveImage(t.thumbnail_url);
            }}
            className="gurado_vd_carousel_template"
          >
            <img
              className="img-fluid gurado_vd_carousel_img"
              src={t.thumbnail_url}
              style={{
                width: t.thumbnail_width,
                height: t.thumbnail_height,
                border:
                  activeIndex === i ? '3px solid #23bade' : '0px',
                padding: activeIndex === i ? '-3px' : '0px',
              }}
            />
          </div>,
        );
      });
      setTemplates(templates);
    };

    useEffect(() => {
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
      setActiveIndex(0);
    }, [voucherStore.shippingMethod]);

    return (
      <div style={{ width: '100%', marginTop: '30px' }}>
        <h3
          style={{
            color:
              settingsStore.settings.header_color === undefined
                ? 'black'
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
            : `Motiv wählen`}
        </h3>
        {(voucherStore.shippingMethod === 'virtual' &&
          voucherStore.voucher.virtual_voucher_design_templates
            .length === 0) ||
        (voucherStore.shippingMethod === 'physical' &&
          voucherStore.voucher.physical_voucher_design_templates
            .length === 0) ? (
          <p>Kein Motiv auswählbar</p>
        ) : (
          <AliceCarousel
            autoWidth
            mouseTracking
            activeIndex={activeIndex}
            disableButtonsControls
            disableDotsControls
          >
            {templates}
          </AliceCarousel>
        )}
      </div>
    );
  },
);
export default MotiveSelection;
