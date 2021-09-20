import React, { Fragment, useEffect, useState } from 'react';
import {
  Col,
  Row,
  Form,
  Button,
  Alert,
  Spinner,
  ProgressBar,
} from 'react-bootstrap';
import { PriceField } from './PriceField';
import CartItem from '../../helper/cartItem';
import FormVoucherSetup from './formVoucherSetup';
import FormShippingAddress from '../checkout/formShippingAddress';
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

function PhysicalVoucherConfig(props) {
  const [amount, setAmount] = useState(10);
  const [recipientName, setRecipientName] = useState('');
  const [fromName, setFromName] = useState('');
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
    cart_item.setDeliveryType('physical');
    cart_item.setRecipientName(recipientName);
    cart_item.setSenderName(fromName);
    cart_item.setMessage(props.message);
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
      <>
        <FormVoucherSetup
          {...props}
          setRecipientName={setRecipientName}
          setFromName={setFromName}
          setAmount={setAmount}
        />
        <Row className="gurado_pv_button_row">
          <Col className="gurado_pv_button_col">
            <ButtonDiv
              dStyle={props.style}
              className="gurado_pv_button_wrapper"
            >
              <Button
                variant="primary"
                className="mt-3 w-100 gurado_pv_button"
                style={{ maxWidth: '600px' }}
                disabled={isAdding}
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
                className="mt-3 gurado_pv_alert_row"
                style={{ maxWidth: '600px' }}
              >
                <Col className="gurado_pv_alert_col">
                  <Alert variant={alertVariant}>{alertText}</Alert>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </>
      <SuccessModal
        show={modalShow}
        amount={amount}
        onHide={() => setModalShow(false)}
        {...props}
      />
    </Fragment>
  );
}
export default PhysicalVoucherConfig;
