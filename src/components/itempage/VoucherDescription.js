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
    <DescriptionContainer fluid>
      <Row>
        <HeaderCol className="mb-2">
          <h1
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
          <img src={props.voucher.images[0].image_url} />
        </Col>
        <Col className="text-left">
          <div
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
