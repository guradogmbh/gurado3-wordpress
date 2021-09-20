import React, { useEffect } from 'react';
import { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';

export default function PreviewCarousel(props) {
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
            props.setImage(t.thumbnail_url, t.template_id);
          }}
          className="gurado_vd_carousel_template"
        >
          <img
            className="img-fluid gurado_vd_carousel_img"
            src={t.thumbnail_url}
            style={{
              width: t.thumbnail_width,
              height: t.thumbnail_height,
              border: activeIndex === i ? '3px solid #23bade' : '0px',
              padding: activeIndex === i ? '-3px' : '0px',
            }}
          />
        </div>,
      );
    });
    setTemplates(templates);
  };

  useEffect(() => {
    if (props.shippingMethod === 'virtual') {
      calcTemplates(props.voucher.virtual_voucher_design_templates);
    } else {
      if (
        props.voucher.physical_voucher_design_templates.length === 0
      )
        return;
      calcTemplates(props.voucher.physical_voucher_design_templates);
    }
  }, [props.shippingMethod, activeIndex]);

  return (
    <>
      <div
        style={{
          color:
            props.style === null
              ? '#23bade'
              : props.style.header_color,
          fontSize: '24px',
          marginBottom: '10px',
        }}
        className="gurado_vd_carousel_label"
      >
        {(props.shippingMethod === 'virtual' &&
          props.voucher.virtual_voucher_design_templates.length <
            2) ||
        (props.shippingMethod === 'physical' &&
          props.voucher.physical_voucher_design_templates.length < 2)
          ? `Gutscheinmotiv`
          : `Motiv wählen`}
      </div>
      <AliceCarousel
        autoWidth
        mouseTracking
        activeIndex={activeIndex}
        disableDotsControls
      >
        {templates}
      </AliceCarousel>
    </>
  );
}
