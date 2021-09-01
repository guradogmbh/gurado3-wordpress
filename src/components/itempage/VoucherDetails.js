import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VoucherDescription from './VoucherDescription';
import PreviewCarousel from './PreviewCarousel';
import VoucherDetailSelection from './VoucherDetailSelection';
import VoucherPreview from '../placeholder/VoucherPreview';
import 'react-alice-carousel/lib/alice-carousel.css';

function VoucherDetails(props) {
  const [voucher, setVoucher] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [message, setMessage] = useState('');
  const [shippingMethod, setShippingMethod] = useState('virtual');
  const [templateId, setTemplateId] = useState(null);
  const [style, setStyle] = useState(null);
  const [email, setEmail] = useState('');
  const [voucherOptions, setVoucherOptions] = useState({
    options: [],
  });

  const setImage = (src, value) => {
    console.log('new image ' + src);
    setActiveImage(src);
    setTemplateId(value);
  };

  useEffect(() => {
    console.log(activeImage);
  }, [activeImage]);

  const chooseShippingThumbnail = () => {
    if (voucher.virtual_voucher_design_templates.length === 0) return;
    setActiveImage(
      voucher.virtual_voucher_design_templates[0].thumbnail_url,
    );
    setTemplateId(
      voucher.virtual_voucher_design_templates[0].template_id,
    );
  };

  const choosePhysicalThumbnail = () => {
    console.log(voucher);
    setActiveImage(
      voucher.physical_voucher_design_templates[0].thumbnail_url,
    );
    setTemplateId(
      voucher.physical_voucher_design_templates[0].template_id,
    );
  };

  useEffect(() => {
    props.API.getVoucherDetails(props.match.params.urlkey).then(
      (response) => {
        props.API.getStyle().then((style) => {
          setVoucher(response);
          setStyle(style);
          setLoading(false);
        });
      },
    );
  }, [props.API]);

  useEffect(() => {
    console.log(voucher);
    if (voucher === null) return;
    if (shippingMethod === 'virtual') {
      chooseShippingThumbnail();
      return;
    }
    if (voucher.physical_voucher_design_templates.length === 0) {
      setShippingMethod('virtual');
      console.log('test');
      return;
    }

    choosePhysicalThumbnail();
  }, [shippingMethod, voucher]);

  if (isLoading) {
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
  }
  return (
    <div className="mb-5 mt-4">
      {!sessionStorage.getItem('voucher_count') && (
        <div style={{ cursor: 'pointer ' }} className="mb-4">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              style={{ position: 'relative', top: '1px' }}
            />{' '}
            Zurück zum Gutscheinshop
          </Link>
        </div>
      )}
      <VoucherDescription voucher={voucher} style={style} />
      <hr style={{ borderWidth: '0.5px' }} />
      <Container fluid className="w-100 pt-5">
        <Row>
          <Col className="px-3">
            <VoucherDetailSelection
              voucher={voucher}
              setMessage={setMessage}
              setImage={setImage}
              style={style}
              message={message}
              templateId={templateId}
              activeImage={activeImage}
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
              setVoucherOptions={setVoucherOptions}
              voucherOptions={voucherOptions}
              email={email}
              setEmail={setEmail}
              {...props}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default VoucherDetails;
