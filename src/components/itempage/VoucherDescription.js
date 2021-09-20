import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const DescriptionContainer = styled(Container)`
  @media only screen and (max-width: 576px) {
    text-align: center;
  }
`;
const HeaderCol = styled(Col)`
  font-size: 2rem;
  @media only screen and (max-width: 576px) {
    font-size: 1rem;
  }
`;

function VoucherDescription(props) {
  return (
    <DescriptionContainer
      fluid
      className="gurado_vd_description_container"
    >
      <Row>
        <HeaderCol className="mb-2">
          <h1
            className="gurado_vd_header"
            style={{
              color:
                props.style === null
                  ? '#000000'
                  : props.style.header_color,
            }}
          >
            {props.voucher.name}
          </h1>
        </HeaderCol>
      </Row>
      <Row className="mb-5">
        <Col sm={5} className="pb-3">
          <img
            className="gurado_vd_description_image"
            src={
              props.voucher.images.length > 0
                ? props.voucher.images[0].image_url
                : 'https://i.stack.imgur.com/y9DpT.jpg'
            }
          />
        </Col>
        <Col className="text-left">
          <div
            className="gurado_vd_description_text"
            dangerouslySetInnerHTML={{
              __html: props.voucher.description,
            }}
          />
        </Col>
      </Row>
    </DescriptionContainer>
  );
}
export default VoucherDescription;
