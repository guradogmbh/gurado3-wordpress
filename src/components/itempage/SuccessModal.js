import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SModal = styled(Modal)`
  .modal-content {
    width: 600px;
  }
  .hd-lg {
    display: block;
  }
  .hd-sm {
    display: none;
  }
  @media only screen and (max-width: 576px) {
    .hd-lg {
      display: none;
    }
    .hd-sm {
      display: block;
    }
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
export default function SuccessModal(props) {
  const { show, onHide, ...rest } = props;
  return (
    <SModal show={show} onHide={onHide} centered>
      <Modal.Body className="p-0 gurado_modal_body">
        <div
          className="w-100 p-0 m-0 mb-3 d-flex align-items-center justify-content-center gurado_modal_body_wrapper"
          style={{
            height: '30px',
            backgroundColor: 'green',
            color: 'white',
          }}
        >
          <span className="hd-lg">
            <FontAwesomeIcon icon={faCheck} className="mr-3" /> Der
            Gutschein wurde dem Warenkorb hinzugefügt
          </span>
          <span className="hd-sm">
            <FontAwesomeIcon icon={faCheck} className="mr-3" /> Zum
            Warenkorb hinzugefügt
          </span>
        </div>
        <Row>
          <Col xs={4} className="text-center d-none d-sm-block">
            <img
              src={props.activeImage}
              style={{ height: '95px', marginLeft: '15px' }}
            />
          </Col>
          <Col className="text-center pt-2 mb-2 gurado_modal_title_col">
            <b>{props.voucher.name}</b>
            <br />
            {props.amount}€<br />
            <ButtonDiv dStyle={props.style}>
              <Button
                variant="outline-primary"
                className="mx-3 mt-4 gurado_modal_button gurado_modal_button_close"
                onClick={onHide}
              >
                Weiter einkaufen
              </Button>
              <Link
                to={'/checkout'}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="primary"
                  className="mx-3 mt-4 gurado_modal_button gurado_modal_button_checkout"
                >
                  Zur Kasse
                </Button>
              </Link>
            </ButtonDiv>
          </Col>
        </Row>
      </Modal.Body>
    </SModal>
  );
}
