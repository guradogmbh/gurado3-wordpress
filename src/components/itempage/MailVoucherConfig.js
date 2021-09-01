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
  console.log(props);
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
      <Row className={props.onlyVirtual ? 'mb-3' : 'my-3'}>
        <Col>{PriceField(props, setAmount)}</Col>
      </Row>
      <Row className="my-2 d-flex align-items-center">
        <Col xs={4}>
          <label className="custominput-label">Empfänger</label>
        </Col>
        <Col>
          <Form.Check
            inline
            label="ich"
            name="recipient"
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
            type="radio"
            id="radio-2"
            onChange={(e) => setRecipient(e.target.value)}
            checked={recipient === 'someone_else'}
          />
        </Col>
      </Row>
      {recipient === 'someone_else' && (
        <>
          <Row className="my-3">
            <Col>
              <div className="Input my-2">
                <input
                  type="text"
                  id="recName"
                  className="Input-text"
                  placeholder="Name des Beschenkten"
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <label htmlFor="recName" className="Input-label">
                  Name des Beschenkten
                </label>
              </div>
            </Col>
          </Row>

          <Row className="my-3">
            <Col>
              <div className="Input my-3">
                <input
                  type="text"
                  id="recMail"
                  className="Input-text"
                  placeholder={`E-Mail ${
                    recipient === 'someone_else'
                      ? 'des Beschenkten'
                      : ''
                  }`}
                  onChange={(e) => props.setEmail(e.target.value)}
                />
                <label htmlFor="recMail" className="Input-label">
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
        <Row className="my-4">
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
      <ButtonDiv dStyle={props.style}>
        <Button
          variant="primary"
          className="mt-3 w-100"
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
        <Row className="mt-3" style={{ maxWidth: '600px' }}>
          <Col>
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
