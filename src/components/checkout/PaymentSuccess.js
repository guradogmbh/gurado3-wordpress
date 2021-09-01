import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SuccessWrapper = styled.div`
  height: 100%;
  min-height: 500px;
  width: 100%;
  color: #23bade;
  font-size: 24px;
  display: table;
`;

export default function PaymentSuccess(props) {
  return (
    <SuccessWrapper>
      <Container className="h-100">
        <Row className="h-100">
          <Col className="h-100 d-flex align-items-center justify-content-center flex-column">
            <p className="text-center">
              Vielen Dank für ihre Bestellung
            </p>
            <Link to="/">
              <Button variant="primary" size="lg">
                Zurück zu den Gutscheinen
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </SuccessWrapper>
  );
}
