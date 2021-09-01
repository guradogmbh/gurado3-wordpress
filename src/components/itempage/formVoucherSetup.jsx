import React from 'react';
import { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { PriceField } from './PriceField';

export default function FormVoucherSetup(props) {
  return (
    <Fragment>
      <Row className="my-4">
        <Col>{PriceField(props, props.setAmount)}</Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <div className="Input mb-2">
            <input
              type="text"
              id="input1"
              className="Input-text"
              placeholder="Für"
              onChange={(e) => props.setRecipientName(e.target.value)}
            />
            <label htmlFor="input1" className="Input-label">
              Für
            </label>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="input2"
              className="Input-text"
              placeholder="Von"
              onChange={(e) => props.setFromName(e.target.value)}
            />
            <label htmlFor="input2" className="Input-label">
              Von
            </label>
          </div>
        </Col>
      </Row>
      {props.voucher.allow_personalized_message === 'YES' && (
        <Row className="my-3">
          <Col>
            <div className="Input my-2">
              <Form.Control
                className="Input-text"
                id="pmsg"
                placeholder="Persönliche Nachricht an den Empfänger"
                as="textarea"
                onChange={(e) => props.setMessage(e.target.value)}
              />
              <label htmlFor="pmsg" className="Input-label">
                Persönliche Nachricht
              </label>
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
