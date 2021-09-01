import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'react-image-picker/dist/index.css';
import MailVoucherConfig from './MailVoucherConfig';
import PhysicalVoucherConfig from './PhysicalVoucherConfig';
import styled from 'styled-components';
import PreviewCarousel from './PreviewCarousel';

const StyledDiv = styled.div`
  font-size: 15px;
  input {
    min-height: 35px;
  }
`;
const ButtonDiv = styled.div`
  .btn-primary {
    background-color: ${(props) =>
      props.dStyle === null
        ? '#007bff'
        : props.dStyle.btn_primary_color};
    border-color: ${(props) =>
      props.dStyle === null
        ? '#007bff'
        : props.dStyle.btn_primary_border_color};
  }
  .btn-secondary {
    background-color: ${(props) =>
      props.dStyle === null
        ? '#007bff'
        : props.dStyle.btn_secondary_color};
    border-color: ${(props) =>
      props.dStyle === null
        ? '#007bff'
        : props.dStyle.btn_secondary_border_color};
  }
  .btn {
    color: ${(props) =>
      props.dStyle === null
        ? '#ffffff'
        : props.dStyle.btn_font_color};
  }
`;
function VoucherDetailSelection(props) {
  const [onlyVirtual, setOnlyVirtuak] = useState(
    props.voucher.can_deliver_voucher_physically === 'NO'
      ? true
      : false,
  );
  console.log(props.style);
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
        hidden={props.voucher.can_deliver_voucher_physically === 'NO'}
      >
        Versandmethode wählen
      </div>
      <StyledDiv>
        <ButtonDiv
          hidden={
            props.voucher.can_deliver_voucher_physically === 'NO'
          }
          style={{ maxWidth: '600px', marginBottom: '40px' }}
          dStyle={props.style}
        >
          <Button
            variant={`${
              props.shippingMethod === 'virtual'
                ? 'primary'
                : 'secondary'
            }`}
            style={{ width: 'calc(50% - 5px)' }}
            onClick={() => props.setShippingMethod('virtual')}
          >
            E-Mail
          </Button>
          <Button
            variant={`${
              props.shippingMethod === 'physical'
                ? 'primary'
                : 'secondary'
            }`}
            disabled={
              props.voucher.can_deliver_voucher_physically === 'NO'
            }
            style={{ width: 'calc(50% - 5px)', float: 'right' }}
            onClick={() => props.setShippingMethod('physical')}
          >
            Post
          </Button>
          <br />
          <p
            className="mt-2"
            hidden={props.shippingMethod === 'virtual'}
          >
            Nach erfolgreichem Zahlungseingang werden die Gutscheine
            am nächsten Werktag versendet.
          </p>
        </ButtonDiv>
        <Row>
          <Col>
            <PreviewCarousel
              voucher={props.voucher}
              shippingMethod={props.shippingMethod}
              setImage={props.setImage}
              {...props}
            />
          </Col>
        </Row>
        <div
          style={{
            color:
              props.style === null
                ? '#23bade'
                : props.style.header_color,
            fontSize: '24px',
            marginBottom: '10px',
          }}
        >
          Personalisierung
        </div>
        {props.shippingMethod === 'virtual' && (
          <MailVoucherConfig {...props} onlyVirtual={onlyVirtual} />
        )}
        {props.shippingMethod === 'physical' && (
          <PhysicalVoucherConfig {...props} onlyVirtual={false} />
        )}
      </StyledDiv>
    </>
  );
}
export default VoucherDetailSelection;
