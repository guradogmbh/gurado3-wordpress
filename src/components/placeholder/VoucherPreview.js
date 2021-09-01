import React, { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';

const PreviewWrapper = styled.div`
  @media only screen and (max-width: 576px) {
    margin-bottom: 30px;
  }
`;
const ImageSelection = styled.div`
  img {
    height: 57px !important;
    padding: 1px;
  }
  .notselected:hover {
    border: 1px solid blue;
    padding: 0px;
    cursor: pointer;
  }
  .selected {
    border: 2px solid blue;
    padding: -1px;
  }
`;
function VoucherPreview(props) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    console.log('asdf');
    if (props.shippingMethod === 'virtual') {
      setTemplates(props.voucher.virtual_voucher_design_templates);
      return;
    }
    setTemplates(props.voucher.physical_voucher_design_templates);
  }, [props.shippingMethod]);

  return (
    <PreviewWrapper>
      <img
        src={props.thumbnail}
        alt="Vorschaubild"
        style={{ width: '100%' }}
        className="mb-2"
      />
      <ImageSelection className="d-flex justify-content-start flex-wrap">
        {templates.map((template, i) => {
          return (
            <img
              key={`vvdtimg${template.template_id}`}
              src={template.thumbnail_url}
              style={{
                width: 'calc( 25% - 1.5rem / 4 )',
                cursor: 'pointer',
              }}
              className={`${i % 4 !== 0 ? 'ml-1' : 'ml-0'} ${
                (i + 1) % 4 !== 0 ? ' mr-1' : ' mr-0'
              } ${
                props.thumbnail === template.thumbnail_url
                  ? ' selected'
                  : ' notselected'
              }`}
              onClick={() =>
                props.setImage(
                  template.thumbnail_url,
                  template.template_id,
                )
              }
            />
          );
        })}
      </ImageSelection>
    </PreviewWrapper>
  );
}
export default VoucherPreview;
