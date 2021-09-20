import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  Spinner,
  Alert,
} from 'react-bootstrap';
import CartItem from '../../helper/cartItem';
import { useHistory } from 'react-router-dom';
import { PriceField } from './PriceField';
import SuccessModal from './SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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
`;

function MailVoucherConfig(props) {
  const [amount, setAmount] = useState(10);
  const [recipient, setRecipient] = useState('self');
  const [recipientName, setRecipientName] = useState('');
  const [isAdding, setAdding] = useState(false);
  const [hasAlert, setAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('primary');
  const [alertText, setAlertText] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const addToCart = async () => {
    setAlert(false);
    setAdding(true);
    let cart_item = new CartItem();
    cart_item.setSku(props.voucher.sku);
    cart_item.setAmount(amount);
    cart_item.setDesignTemplate(props.templateId);
    cart_item.setRecipient(recipient);
    cart_item.setEmail(props.email);
    cart_item.setMessage(props.message);
    cart_item.setRecipientName(recipientName);
    if (props.voucherOptions.options.length > 0) {
      cart_item.setOptions(props.voucherOptions.options);
    }
    await props.API.addToCart(cart_item)
      .then((result) => {
        setAdding(false);
        if (result.sku === undefined || result === null) {
          setAlertVariant('danger');
          setAlertText(result.message);
          setAlert(true);
        } else {
          setAlertVariant('success');
          setAlertText(
            'Der Gutschein wurde dem Warenkorb hinzugefügt',
          );
          setAlert(true);
          setModalShow(true);
        }
      })
      .catch((err) => {
        setAlertVariant('danger');
        setAlertText(err);
        setAlert(true);
      });
  };

  return (
    <Fragment>
      <Row
        className={
          props.onlyVirtual
            ? 'mb-3 gurado_vd_pricefield_row'
            : 'my-3 gurado_vd_pricefield_row'
        }
      >
        <Col className="gurado_vd_pricefield_col">
          {PriceField(props, setAmount)}
        </Col>
      </Row>
      <Row className="my-2 d-flex align-items-center gurado_vd_recipient_row">
        <Col xs={4} className="gurado_vd_recipient_col_left">
          <label className="custominput-label">Empfänger</label>
        </Col>
        <Col className="gurado_vd_recipient_col_right">
          <Form.Check
            inline
            label="ich"
            name="recipient"
            className="gurado_vd_checkbox"
            type="radio"
            value="self"
            onChange={(e) => setRecipient(e.target.value)}
            id="radio-1"
            checked={recipient === 'self'}
          />
          <Form.Check
            inline
            label="der Beschenkte"
            name="recipient"
            value="someone_else"
            className="gurado_vd_checkbox"
            type="radio"
            id="radio-2"
            onChange={(e) => setRecipient(e.target.value)}
            checked={recipient === 'someone_else'}
          />
        </Col>
      </Row>
      {recipient === 'someone_else' && (
        <>
          <Row className="my-3 gurado_vd_recipient_name_row">
            <Col className="gurado_vd_recipient_name_col">
              <div className="Input my-2 gurado_vd_recipient_name_wrapper">
                <input
                  type="text"
                  id="recName"
                  className="Input-text gurado_vd_input_text"
                  placeholder="Name des Beschenkten"
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <label
                  htmlFor="recName"
                  className="Input-label gurado_vd_input_label"
                >
                  Name des Beschenkten
                </label>
              </div>
            </Col>
          </Row>

          <Row className="my-3 gurado_vd_recipient_mail_row">
            <Col className="gurado_vd_recipient_mail_col">
              <div className="Input my-3 gurado_vd_recipient_mail_wrapper">
                <input
                  type="text"
                  id="recMail"
                  className="Input-text gurado_vd_input_text"
                  placeholder={`E-Mail ${
                    recipient === 'someone_else'
                      ? 'des Beschenkten'
                      : ''
                  }`}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
                <label
                  htmlFor="recMail"
                  className="Input-label gurado_vd_input_label"
                >
                  E-Mail{' '}
                  {recipient === 'someone_else'
                    ? 'des Beschenkten'
                    : ''}
                </label>
              </div>
            </Col>
          </Row>
        </>
      )}
      {props.voucher.allow_personalized_message === 'YES' && (
        <Row className="my-4 gurado_vd_message_row">
          <Col className="gurado_vd_message_col">
            <div className="Input my-2 gurado_vd_message_wrapper">
              <Form.Control
                className="Input-text gurado_vd_input_text"
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
      <ButtonDiv dStyle={props.style}>
        <Button
          variant="primary"
          className="mt-3 w-100 gurado_vd_cart_button"
          disabled={isAdding}
          style={{ maxWidth: '600px' }}
          onClick={addToCart}
        >
          {isAdding ? (
            <>
              Lädt...{' '}
              <Spinner
                as="span"
                size="sm"
                animation="border"
                style={{ position: 'relative', top: '-3px' }}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faShoppingCart}
                as="span"
                size="sm"
                className="mr-2"
              />
              <span>In den Warenkorb</span>
            </>
          )}
        </Button>
      </ButtonDiv>
      {hasAlert && (
        <Row
          className="mt-3 gurado_vd_alert_box_row"
          style={{ maxWidth: '600px' }}
        >
          <Col className="gurado_vd_alert_box_col">
            <Alert variant={alertVariant}>{alertText}</Alert>
          </Col>
        </Row>
      )}
      <SuccessModal
        show={modalShow}
        amount={amount}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </Fragment>
  );
}
export default MailVoucherConfig;
