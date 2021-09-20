import React from 'react';
import { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { PriceField } from './PriceField';

export default function FormVoucherSetup(props) {
  return (
    <Fragment>
      <Row className="my-4 gurado_pv_pricefield_row">
        <Col className="gurado_pv_pricefield_col">
          {PriceField(props, props.setAmount)}
        </Col>
      </Row>
      <Row className="mb-3 gurado_pv_recipient_row">
        <Col className="gurado_pv_recipient_col">
          <div className="Input mb-2 gurado_pv_recipient_wrapper">
            <input
              type="text"
              id="input1"
              className="Input-text gurado_vd_input_text"
              placeholder="Für"
              onChange={(e) => props.setRecipientName(e.target.value)}
            />
            <label
              htmlFor="input1"
              className="Input-label gurado_vd_input_label"
            >
              Für
            </label>
          </div>
        </Col>
      </Row>
      <Row className="my-4 gurado_pv_from_row">
        <Col className="gurado_pv_from_col">
          <div className="Input my-2 gurado_pv_from_wrapper">
            <input
              type="text"
              id="input2"
              className="Input-text gurado_vd_input_text"
              placeholder="Von"
              onChange={(e) => props.setFromName(e.target.value)}
            />
            <label
              htmlFor="input2"
              className="Input-label gurado_vd_input_label"
            >
              Von
            </label>
          </div>
        </Col>
      </Row>
      {props.voucher.allow_personalized_message === 'YES' && (
        <Row className="my-3 gurado_pv_message_row">
          <Col className="gurado_pv_message_col">
            <div className="Input my-2 gurado_pv_message_wrapper">
              <Form.Control
                className="Input-text gurado_pv_message"
                id="pmsg"
                placeholder="Persönliche Nachricht an den Empfänger"
                as="textarea"
                onChange={(e) => props.setMessage(e.target.value)}
              />
              <label
                htmlFor="pmsg"
                className="Input-label gurado_vd_input_label"
              >
                Persönliche Nachricht
              </label>
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
