import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const QPWrapper = styled.div`
  width: 120px;
  height: 40px;
  .bcol {
  }
`;
const QPSelectorCol = styled(Col)`
  background-color: white;
  border: 1px solid black;
`;

export default function QuantityPicker(props) {
  return (
    <QPWrapper>
      <Row className="h-100">
        <QPSelectorCol
          style={{ cursor: 'pointer' }}
          onClick={() => {
            props.changeQty(props.item_id, props.qty - 1);
          }}
          xs={4}
          className="d-flex justify-content-center align-items-center"
        >
          <FontAwesomeIcon icon={faMinus} />
        </QPSelectorCol>
        <Col
          xs={4}
          className="d-flex justify-content-center align-items-center"
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            backgroundColor: 'white',
          }}
        >
          {props.qty}
        </Col>
        <QPSelectorCol
          style={{ cursor: 'pointer' }}
          onClick={() => {
            props.changeQty(props.item_id, props.qty + 1);
          }}
          xs={4}
          className="d-flex justify-content-center align-items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
        </QPSelectorCol>
      </Row>
    </QPWrapper>
  );
}
