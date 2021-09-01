import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Spinner,
  Button,
  Alert,
  Form,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowCircleLeft,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';

export default function FormShippingAddress(props) {
  return (
    <Fragment>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => props.setStep(1)}
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} className="mr-2" />
        Zurück
      </span>
      <p style={{ fontSize: '15pt' }} className="mt-3 mb-3">
        <b>Lieferadresse</b>
      </p>
      <Row className="my-3">
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="frstnm"
              className="Input-text"
              placeholder="Vorname"
              onChange={(e) => props.setFirstname(e.target.value)}
            />
            <label htmlFor="frstnm" className="Input-label">
              Vorname
            </label>
          </div>
        </Col>
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="lstnm"
              className="Input-text"
              placeholder="Nachname"
              onChange={(e) => props.setLastname(e.target.value)}
            />
            <label htmlFor="lstnm" className="Input-label">
              Nachname
            </label>
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={9}>
          <div className="Input my-2">
            <input
              type="text"
              id="strt"
              className="Input-text"
              placeholder="Straße"
              onChange={(e) => props.setStreet(e.target.value)}
            />
            <label htmlFor="strt" className="Input-label">
              Straße
            </label>
          </div>
        </Col>
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="hsnmr"
              className="Input-text"
              placeholder="Nr."
              onChange={(e) => props.setHouseNumber(e.target.value)}
            />
            <label htmlFor="hsnmr" className="Input-label">
              Nr.
            </label>
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="pstcd"
              className="Input-text"
              placeholder="PLZ"
              onChange={(e) => props.setPostCode(e.target.value)}
            />
            <label htmlFor="pstcd" className="Input-label">
              PLZ
            </label>
          </div>
        </Col>
        <Col>
          <div className="Input my-2">
            <input
              type="text"
              id="cty"
              className="Input-text"
              placeholder="Ort"
              onChange={(e) => props.setCity(e.target.value)}
            />
            <label htmlFor="cty" className="Input-label">
              Ort
            </label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="Input my-2">
            <Form.Control
              as="select"
              style={{ height: '44px', color: 'black' }}
              className="custominput Input-text"
              onChange={(e) => props.setCountryCode(e.target.value)}
            >
              {props.countries.map((country) => {
                return (
                  <option
                    key={`cntry${country.code}`}
                    value={country.code}
                  >
                    {country.name}
                  </option>
                );
              })}
            </Form.Control>
          </div>
        </Col>
      </Row>
      <Button
        variant="primary"
        disabled={props.isAdding}
        className="mt-4 w-100"
        onClick={props.addToCart}
      >
        In den Warenkorb{' '}
        {props.isAdding && <Spinner animation="border" />}
      </Button>
      {props.hasAlert && (
        <Row className="mt-3">
          <Col>
            <Alert variant={props.alertVariant}>
              {props.alertText}
            </Alert>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
