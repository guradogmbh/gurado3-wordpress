import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SModal = styled(Modal)`
  .modal-dialog {
    width: 100%;
    max-width: 800px;
  }
`;
export default function AgreementModal(props) {
  const { show, onHide, ...rest } = props;
  const [htmlData, setHtmlData] = useState('');

  useEffect(() => {
    if (props.agreementId === null) {
      setHtmlData('');
      return;
    }
    console.log(props.agreementId);
    props.API.getAgreement(props.agreementId).then((data) => {
      let pData = JSON.parse(data.data);
      let content = pData.content;
      setHtmlData(content);
    });
  }, [props.agreementId]);

  return (
    <SModal show={show} onHide={onHide} centered>
      <Modal.Body
        className={`p-3 d-flex ${
          htmlData === ''
            ? 'justify-content-center align-items-middle'
            : ''
        }`}
      >
        {htmlData === '' ? (
          <Spinner animation="border" />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: htmlData,
            }}
          ></div>
        )}
      </Modal.Body>
    </SModal>
  );
}
