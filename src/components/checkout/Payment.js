import {
  faCartArrowDown,
  faChevronCircleLeft,
  faMoneyBillWaveAlt,
  faStepBackward,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Accordion,
  Card,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import QuantityPicker from '../../helper/quantityPicker';
import AgreementModal from './AgreementModal';

const StyledForm = styled(Form)`
  .form-control,
  select {
    padding: 10px;
    height: 40px;
  }
  .itemname_lower {
    display: none;
  }
  .itemname_upper {
    display: block;
  }
  .item_name_col {
    flex-direction: column;
  }
  .delete_flex {
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: 576px) {
    .card-body {
      padding-bottom: 0px;
      padding-left: 10px;
      padding-top: 0px;
      padding-right: 0px;
    }
    .item_name_col {
      img {
        width: 55px !important;
        height: 31px !important;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .itemname_upper {
      display: none;
    }
    .itemname_lower {
      display: block;
    }
    .delete_text {
      display: none;
    }
    .delete_upper {
      margin-left: 30px;
    }
    .delete_flex {
      flex-direction: row;
      justify-content: flex-start;
      padding-left: 15px;
    }
    .item_name_col {
      flex-direction: row;
      align-items: center;
      img {
        margin-right: 50px;
      }
    }
    .zeilenpreis {
      text-align: right;
      padding-right: 15px;
    }
  }
`;
const QuantityCol = styled(Col)`
  @media only screen and (max-width: 576px) {
    background-color: #f1f1f1;
    padding-bottom: 5px;
    margin-top: 10px;
    padding-left: 30px;
    padding-right: 35px;
    @media only screen and (max-width: 350px) {
      padding-left: 15px;
      padding-right: 30px;
    }

    padding-top: 5px;
  }
`;
const OverviewRow = styled(Row)`
  @media only screen and (max-width: 576px) {
    background-color: #f1f1f1;
    margin-top: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    line-height: 24px;
  }
`;
const CountryCol = styled(Col)``;
const QtyDiv = styled.div``;

function Payment(props) {
  const [isLoading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  //billing address
  const [b_firstname, setBFirstname] = useState('');
  const [b_lastname, setBLastname] = useState('');
  const [b_street, setBStreet] = useState('');
  const [b_housenr, setBHousenr] = useState('0');
  const [b_plz, setBPlz] = useState(12345);
  const [b_city, setBCity] = useState('');
  const [b_country, setBCountry] = useState('DE');
  //general
  const [email, setEmail] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [currencyCode, setCurrencyCode] = useState('EUR');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [differentShipping, setDifferentShipping] = useState(false);
  //shipping address
  const [s_firstname, setSFirstname] = useState('');
  const [s_lastname, setSLastname] = useState('');
  const [s_street, setSStreet] = useState('');
  const [s_housenr, setSHousenr] = useState('0');
  const [s_plz, setSPlz] = useState(12345);
  const [s_city, setSCity] = useState('');
  const [s_country, setSCountry] = useState('DE');
  const [alertText, setAlertText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showPaymentWall, setShowPaymentWall] = useState(false);
  const [hasPhysicalVoucher, setHasPhysicalVoucher] = useState(false);
  const [updatingQtyItem, setUpdatingQtyItem] = useState(null);
  const [agreements, setAgreements] = useState([]);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreementId, setAgreementId] = useState(null);
  const [requiresAcceptance, setRequiresAcceptance] = useState(false);
  const [scriptSet, setScriptSet] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [dStyle, setdStyle] = useState(null);

  //reload the cart with all of its items
  const reloadCart = async () => {
    let cart = await props.API.getCart();
    if (cart.items === null || cart.items === undefined) {
      setSubtotal(0);
      setGrandtotal(0);
      setTax([]);
      setCartItems([]);
      setLoading(false);
      return;
    }
    setSubtotal(cart.subtotal);
    setGrandtotal(cart.grand_total);
    setTax(cart.taxes);
    setCurrencyCode(cart.currency_code);
    setHasPhysicalVoucher(cart.requires_shipping);
    setRequiresAcceptance(cart.requires_agreement_acceptance);
    if (cart.items !== undefined && cart.items.length > 0) {
      setCartItems(cart.items);
      setCurrencyCode(cart.currency_code);
      console.log(cart);
    }
    setDeleteLoading(false);
    setLoading(false);
  };

  //initial load
  useEffect(async () => {
    reloadCart();
    loadAgreements();
    loadCountries();
    loadClientId();
  }, [props.API]);

  //client id is required for the payment wall iFrame
  const loadClientId = async () => {
    let cid = await props.API.getClientId();
    setClientId(cid.data);
  };

  //countries for the Dropdown field
  const loadCountries = async () => {
    let fetched_countries = await props.API.getCountries();
    setCountries(fetched_countries);
  };

  //this function makes sure that the iframe is re-rendered properly, for example if the user decides to go back to change his address and wants to open the payment wall again
  useEffect(() => {
    if (showPaymentWall) {
      //make sure that the external JS from gurado is only loaded once
      if (!scriptSet) {
        const script = document.createElement('script');
        script.setAttribute('id', 'gurado_listener');
        let cart_id = props.API.getCartId();
        script.src =
          'https://storefront.gurado.de/payments-sdk/js?client_id=' +
          clientId +
          '&cart_id=' +
          cart_id;

        script.onload = () => {
          window.gurado
            .Payments({
              onComplete: function () {
                document.body.removeChild(script);
                window.location = '#success';
              },
              onError: function () {
                console.log('error');
              },
            })
            .render('#gurado-payments-container');
        };

        document.body.appendChild(script);
        setScriptSet(true);
      } else {
        //if already loaded, we just append the payment wall to the already existing div to reload it
        let script = document.getElementById('gurado_listener');
        window.gurado
          .Payments({
            onComplete: function () {
              document.body.removeChild(script);
              window.location = '#success';
            },
            onError: function () {
              console.log('error');
            },
          })
          .render('#gurado-payments-container');
      }
    }
  }, [props.API, showPaymentWall]);

  //load user agreements
  const loadAgreements = async () => {
    props.API.getAgreements().then((data) => {
      let pAgreements = data;
      pAgreements.map((a) => {
        a.checked = false;
      });
      setAgreements(pAgreements);
    });
  };

  //delete item from cart
  const deleteItem = async (itemId) => {
    setDeleteItemId(itemId);
    setDeleteLoading(true);
    await props.API.deleteItem(itemId)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        reloadCart();
      });
  };

  //mark an agreement as checked in the state to enable the continue button
  const updateAgreement = (agreement_id, status) => {
    let pAgreements = agreements;
    pAgreements.map((a) => {
      if (a.agreement_id === agreement_id) {
        a.checked = status;
      }
    });
  };

  const changeQty = async (item_id, qty) => {
    setUpdatingQtyItem(item_id);
    if (qty > 0) {
      let pItems = cartItems;
      pItems.map((ci, i) => {
        if (ci.item_id === item_id) {
          pItems[i].qty = qty;
        }
      });
      await props.API.updateQty(item_id, qty);
    } else {
      await deleteItem(item_id);
    }
    await reloadCart();
    setUpdatingQtyItem(null);
  };

  //show agreement modal yes/no
  const doShowAgreementModal = async (agreement_id) => {
    setAgreementId(agreement_id);
    setShowAgreementModal(true);
  };

  const handlePayment = async () => {
    if (requiresAcceptance) {
      let agreements_accepted = true;
      agreements.map((agreement) => {
        if (agreement.checked === false) {
          agreements_accepted = false;
        }
      });
      if (agreements_accepted === false) {
        setAlertText('Bitte Bedingungen lesen und bestätigen');
        return;
      }
    }

    setIsSending(true);
    props.API.setEmail(email);
    let billing_address = new Object();
    billing_address.firstname = b_firstname;
    billing_address.lastname = b_lastname;
    billing_address.street = b_street;
    billing_address.house_number = b_housenr;
    billing_address.postcode = b_plz;
    billing_address.city = b_city;
    billing_address.country_code = b_country;
    billing_address.use_for_shipping = differentShipping ? 0 : 1;

    if (differentShipping) {
      let shipping_address = new Object();
      shipping_address.firstname = s_firstname;
      shipping_address.lastname = s_lastname;
      shipping_address.street = s_street;
      shipping_address.house_number = s_housenr;
      shipping_address.postcode = s_plz;
      shipping_address.city = s_city;
      shipping_address.country_code = s_country;
      props.API.setShippingAddress(shipping_address);
    }
    props.API.setBillingAddress(billing_address);
    await props.API.sendAddress()
      .then((data) => {
        console.log('success');
        setShowPaymentWall(true);
      })
      .catch((err) => {
        setAlertText(err);
      });
    setIsSending(false);
  };

  if (isLoading)
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '500px' }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );

  if (cartItems.length === 0) {
    return (
      <Container fluid className="mt-4 mb-5 ">
        <div
          style={{ height: '200px' }}
          className="d-flex justify-content-center align-items-center gurado_empty_cart_div"
        >
          <p style={{ fontSize: '20px' }}>
            Der Warenkorb ist leer
            <br />
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="primary" className="mt-2">
                Zurück zu den Gutscheinen
              </Button>
            </Link>
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4 mb-5 gurado_ct_container">
      <div
        style={{ cursor: 'pointer ' }}
        className="mb-3 gurado_ct_back_div"
      >
        {!showPaymentWall ? (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              style={{ position: 'relative', top: '1px' }}
            />{' '}
            Zurück zum Gutscheinshop
          </Link>
        ) : (
          <>
            <span onClick={() => setShowPaymentWall(false)}>
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                style={{ position: 'relative', top: '1px' }}
              />{' '}
              Zurück zur Adresseingabe
            </span>
          </>
        )}
      </div>
      <div className="w-100 mb-3 gurado_ct_steps">
        <div
          style={{
            width: '200px',
            position: 'relative',
            margin: '0 auto',
          }}
          className="d-flex"
        >
          <div style={{ zIndex: 1, backgroundColor: 'white' }}>
            <div
              style={{
                borderRadius: '50%',
                backgroundColor: showPaymentWall
                  ? '#575656'
                  : '#23bade',
                width: '35px',
                height: '35px',
                margin: '0 auto',
                fontSize: '13pt',
                color: 'white',
              }}
              className="d-flex justify-content-center align-items-center"
            >
              <span>1</span>
            </div>
            <p
              className="p-0 text-center"
              style={{ margin: '0 auto' }}
            ></p>
          </div>
          <br />
          <span
            style={{
              position: 'relative',
              top: '35px',
              left: '-52px',
              zIndex: 70,
            }}
          >
            Warenkorb
          </span>
          <span
            style={{
              backgroundColor: 'black',
              width: '100%',
              height: '0.5px',
              position: 'absolute',
              top: '16.5px',
              zIndex: 0,
            }}
          />
          <div
            style={{ zIndex: 1, backgroundColor: 'white' }}
            className="ml-auto"
          >
            <div
              style={{
                borderRadius: '50%',
                backgroundColor: showPaymentWall
                  ? '#23bade'
                  : '#575656',
                width: '35px',
                height: '35px',
                zIndex: 1,
                margin: '0 auto',
                fontSize: '13pt',
                color: 'white',
              }}
              className="d-flex justify-content-center align-items-center"
            >
              <span>2</span>
            </div>
            <p
              className="p-0 text-center"
              style={{ margin: '0 auto' }}
            >
              Zahlen
            </p>
          </div>
        </div>
      </div>
      {!showPaymentWall ? (
        <>
          <StyledForm className="gurado_ct_form">
            <Row className="gurado_ct_wrapper_row">
              <Col className="gurado_ct_wrapper_col">
                <Accordion
                  defaultActiveKey="0"
                  className="gurado_ct_accordion"
                >
                  <Card className="gurado_ct_accordion_card">
                    <Card.Header className="gurado_ct_accordion_card_header">
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        className="text-left gurado_ct_accordion card_toggle"
                        eventKey="0"
                      >
                        <FontAwesomeIcon icon={faCartArrowDown} />{' '}
                        Warenkorb anzeigen
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse
                      eventKey="0"
                      className="gurado_ct_accordion_collapse"
                    >
                      <Card.Body className="gurado_ct_accordion_body">
                        <Row
                          className="d-none d-md-flex gurado_ct_accordion_body_row"
                          style={{ fontSize: '18px' }}
                        >
                          <Col xs={12} md={4}>
                            Artikel
                          </Col>
                          <Col xs={12} sm={6} md={4}></Col>
                          <Col>Einzelpreis</Col>
                          <Col>Betrag</Col>
                        </Row>
                        <hr
                          style={{
                            borderWidth: '0.5px',
                            color: 'lightgray',
                          }}
                          className="d-none d-md-block"
                        />
                        {cartItems.length > 0 &&
                          cartItems.map((item, i) => {
                            return (
                              <>
                                <Row
                                  className="item_row"
                                  key={item.item_id}
                                  className="d-flex align-items-center my-3 gurado_ct_item_row"
                                >
                                  <Col
                                    xs={12}
                                    md={4}
                                    className="text-left d-flex item_name_col gurado_ct_item_col"
                                    style={{ paddingLeft: '15px' }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: 'ComoW01-Bold',
                                        fontSize: '18px',
                                        marginBottom: '10px',
                                      }}
                                      className="itemname_upper"
                                    >
                                      {item.name}
                                    </span>
                                    <img
                                      src={
                                        item.voucher_design_template
                                          .thumbnail_url
                                      }
                                      style={{
                                        width:
                                          item.voucher_design_template
                                            .thumbnail_width,
                                        height:
                                          item.voucher_design_template
                                            .thumbnail_height,
                                      }}
                                    />
                                    <span className="itemname_lower">
                                      <b>{item.name}</b>
                                      <br />
                                      {item.unit_price
                                        .toFixed(2)
                                        .replace('.', ',')}{' '}
                                      {currencyCode}
                                    </span>
                                  </Col>
                                  <QuantityCol xs={12} sm={6} md={4}>
                                    <div className="my-2 d-flex align-items-center delete_flex ">
                                      <QuantityPicker
                                        item_id={item.item_id}
                                        changeQty={changeQty}
                                        qty={item.qty}
                                      />
                                      <br />
                                      {deleteItemId ===
                                        item.item_id &&
                                      deleteLoading ? (
                                        <Spinner
                                          as="span"
                                          animation="grow"
                                          size="sm"
                                        />
                                      ) : (
                                        <span
                                          onClick={() =>
                                            deleteItem(item.item_id)
                                          }
                                          style={{
                                            cursor: 'pointer',
                                          }}
                                          className="delete_upper"
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ color: 'red' }}
                                          />{' '}
                                          <span className="delete_text">
                                            Löschen
                                          </span>
                                        </span>
                                      )}
                                      <span className="ml-auto d-md-none d-lg-none d-xl-none d-sm-none">
                                        {parseFloat(
                                          item.unit_price * item.qty,
                                        )
                                          .toFixed(2)
                                          .replace('.', ',')}{' '}
                                        {currencyCode}
                                      </span>
                                    </div>
                                  </QuantityCol>
                                  <Col
                                    md={2}
                                    style={{ display: 'flex' }}
                                    className=" align-items-center d-none d-md-block"
                                  >
                                    <p className="my-2">
                                      {parseFloat(item.unit_price)
                                        .toFixed(2)
                                        .replace('.', ',')}{' '}
                                      {currencyCode}{' '}
                                    </p>
                                  </Col>
                                  <Col
                                    sm={6}
                                    md={2}
                                    xs={9}
                                    className="zeilenpreis"
                                  >
                                    <QtyDiv className="ml-auto d-none d-sm-block">
                                      {parseFloat(
                                        item.qty * item.unit_price,
                                      )
                                        .toFixed(2)
                                        .replace('.', ',')}{' '}
                                      {currencyCode}
                                    </QtyDiv>
                                  </Col>
                                </Row>
                                {item.add_ons.map((addOn) => {
                                  return (
                                    <Row>
                                      <Col xs={2}></Col>
                                      <Col
                                        xs={6}
                                        className="text-right"
                                      >
                                        zzgl. {addOn.name}
                                      </Col>
                                      <Col xs={2}>
                                        {addOn.unit_price
                                          .toFixed(2)
                                          .replace('.', ',')}{' '}
                                        {currencyCode}
                                      </Col>
                                      <Col xs={2}>
                                        {addOn.row_total
                                          .toFixed(2)
                                          .replace('.', ',')}{' '}
                                        {currencyCode}
                                      </Col>
                                    </Row>
                                  );
                                })}
                              </>
                            );
                          })}
                        <OverviewRow className="mt-3 px-1">
                          <Col
                            xs={12}
                            className="d-sm-none text-center mb-4"
                            style={{
                              fontSize: '24px',
                              color: '#23bade',
                            }}
                          >
                            Bestellübersicht
                          </Col>
                          <Col
                            xs={6}
                            sm={9}
                            md={10}
                            className="text-right"
                          >
                            Zwischensumme:
                            <br />
                            {tax.map((t, i) => {
                              return (
                                <span key={`spkeytax${i}`}>
                                  {t.is_included_in_price === 'YES'
                                    ? `inkl`
                                    : `zzgl.`}{' '}
                                  MwSt ({t.rate}%):
                                  <br />
                                </span>
                              );
                            })}
                            Gesamtsumme:
                          </Col>
                          <Col className="text-left">
                            {subtotal.toFixed(2).replace('.', ',')}{' '}
                            {currencyCode}
                            <br />
                            {tax.map((t, i) => {
                              return (
                                <span key={`trkey${i}`}>
                                  {t.amount
                                    .toFixed(2)
                                    .replace('.', ',')}{' '}
                                  {currencyCode}
                                  <br />
                                </span>
                              );
                            })}
                            <b>
                              {grandtotal
                                .toFixed(2)
                                .replace('.', ',')}{' '}
                              {currencyCode}
                            </b>
                          </Col>
                        </OverviewRow>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col style={{ fontSize: '15pt' }}>
                Kontaktinformation
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs={12} sm={6}>
                <Form.Control
                  placeholder="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col style={{ fontSize: '15pt' }}>
                Rechnungsadresse:
              </Col>
            </Row>
            <Row>
              <Col sm={6} className="my-2">
                <Form.Control
                  placeholder="Vorname"
                  autoComplete="billing given-name"
                  onChange={(e) => setBFirstname(e.target.value)}
                />
              </Col>
              <Col sm={6} className="my-2">
                <Form.Control
                  placeholder="Nachname"
                  autoComplete="billing family-name"
                  onChange={(e) => setBLastname(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={6} xs={8} className="my-2">
                <Form.Control
                  placeholder="Straße"
                  autoComplete="billing street-address"
                  onChange={(e) => setBStreet(e.target.value)}
                />
              </Col>
              <Col sm={6} xs={4} className="my-2">
                <Form.Control
                  placeholder="Nr."
                  onChange={(e) => setBHousenr(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={4} className="my-2">
                <Form.Control
                  placeholder="PLZ"
                  autoComplete="billing postal-code"
                  onChange={(e) => setBPlz(e.target.value)}
                />
              </Col>
              <Col xs={12} sm={4} className="my-2">
                <Form.Control
                  placeholder="Ort"
                  autoComplete="billing address-level2"
                  onChange={(e) => setBCity(e.target.value)}
                />
              </Col>
              <CountryCol xs={12} sm={4} className="my-2">
                <Form.Control
                  as="select"
                  id="countrySelect"
                  autoComplete="billing country"
                  custom
                  onChange={(e) => setBCountry(e.target.value)}
                >
                  {countries.map((country) => {
                    return (
                      <option value={country.code} key={country.code}>
                        {country.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </CountryCol>
            </Row>
            {hasPhysicalVoucher && (
              <>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        onChange={(e) =>
                          setDifferentShipping(e.target.checked)
                        }
                        label="abweichende Lieferadresse"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {differentShipping && (
                  <Fragment>
                    <Row className="mt-3">
                      <Col style={{ fontSize: '15pt' }}>
                        Lieferadresse:
                      </Col>
                    </Row>
                    <Row>
                      <Col className="my-3" sm={6}>
                        <Form.Control
                          placeholder="Vorname"
                          onChange={(e) =>
                            setSFirstname(e.target.value)
                          }
                        />
                      </Col>
                      <Col className="my-3" sm={6}>
                        <Form.Control
                          placeholder="Nachname"
                          onChange={(e) =>
                            setSLastname(e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="my-3" sm={6} xs={8}>
                        <Form.Control
                          placeholder="Straße"
                          onChange={(e) => setSStreet(e.target.value)}
                        />
                      </Col>
                      <Col className="my-3" sm={6} xs={4}>
                        <Form.Control
                          placeholder="Hausnr"
                          onChange={(e) =>
                            setSHousenr(e.target.value)
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="my-3" sm={4}>
                        <Form.Control
                          placeholder="PLZ"
                          onChange={(e) => setSPlz(e.target.value)}
                        />
                      </Col>
                      <Col className="my-3" sm={4}>
                        <Form.Control
                          placeholder="Ort"
                          onChange={(e) => setSCity(e.target.value)}
                        />
                      </Col>
                      <Col className="my-3" sm={4}>
                        <Form.Control
                          as="select"
                          id="countrySelect"
                          custom
                          onChange={(e) =>
                            setSCountry(e.target.value)
                          }
                        >
                          {countries.map((country) => {
                            return (
                              <option
                                value={country.code}
                                key={country.code}
                              >
                                {country.name}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </Fragment>
                )}
              </>
            )}
            {!requiresAcceptance && (
              <Row>
                <Col>
                  Mit dem Klick auf "Prüfen und bezahlen" erklären Sie
                  sich mit den Datenschutzbestimmungen, AGBs und
                  Widerrufsbestimmungen einverstanden.
                </Col>
              </Row>
            )}
            {requiresAcceptance ? (
              <>
                {agreements.map((agreement) => {
                  return (
                    <Row
                      key={`agrmnt${agreement.agreement_id}`}
                      style={{ fontSize: '10pt' }}
                      className="my-2 d-flex align-items-center"
                    >
                      {requiresAcceptance && (
                        <Col
                          xs={1}
                          className="d-flex align-items-center"
                        >
                          <Form.Check
                            type="checkbox"
                            className="mr-3"
                            style={{ float: 'left' }}
                            id={`agbox${agreement.agreement_id}`}
                            onChange={(e) =>
                              updateAgreement(
                                agreement.agreement_id,
                                e.target.checked,
                              )
                            }
                          />{' '}
                        </Col>
                      )}
                      <Col className="d-flex align-items-center">
                        <label
                          htmlFor={`agbox${agreement.agreement_id}`}
                          style={{ position: 'relative', top: '6px' }}
                        >
                          {agreement.title}{' '}
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              doShowAgreementModal(
                                agreement.agreement_id,
                              )
                            }
                          >
                            (lesen)
                          </span>
                        </label>
                      </Col>
                    </Row>
                  );
                })}
              </>
            ) : (
              <ul className="mt-2" style={{ color: '#23bade' }}>
                {agreements.map((agreement) => {
                  return (
                    <li
                      style={{ cursor: 'pointer' }}
                      className="my-2"
                      key={`li${agreement.agreement_id}`}
                      onClick={() =>
                        doShowAgreementModal(agreement.agreement_id)
                      }
                    >
                      {agreement.title}
                    </li>
                  );
                })}
              </ul>
            )}
          </StyledForm>
          <Button
            variant="primary"
            size="lg"
            onClick={handlePayment}
            className="w-100 mt-3"
            disabled={isSending}
          >
            {!isSending ? (
              <>
                <FontAwesomeIcon
                  icon={faMoneyBillWaveAlt}
                  as="span"
                  size="sm"
                  className="mr-2"
                />
                Prüfen und bezahlen{' '}
              </>
            ) : (
              <>
                Lädt... <Spinner animation="border" as="span" />
              </>
            )}
          </Button>
          {alertText.length > 0 && (
            <Alert className="mt-3" variant="danger">
              {alertText}
            </Alert>
          )}
        </>
      ) : (
        <>
          <div
            style={{ maxWidth: '750px', margin: '0 auto' }}
            className="w-100"
          >
            <span style={{ fontSize: '20pt' }}>
              <br />
              Zahlungsmethode auswählen:
            </span>
            <div
              id="gurado-payments-container"
              style={{ margin: '50px auto' }}
            ></div>
          </div>
        </>
      )}
      <AgreementModal
        {...props}
        agreementId={agreementId}
        show={showAgreementModal}
        onHide={() => {
          setAgreementId(null);
          setShowAgreementModal(false);
        }}
      />
    </Container>
  );
}
export default Payment;
