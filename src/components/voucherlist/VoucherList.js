import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import VoucherHelper from '../../helper/voucher';
import VoucherListItem from './VoucherListItem';
import { useHistory } from 'react-router-dom';

const ListContainer = styled(Container)`
  justify-content: center;
  @media only screen and (max-width: 576px) {
    justify-content: center;
  }
`;

const voucherHelper = new VoucherHelper();
function VoucherList(props) {
  let history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [style, setStyle] = useState(null);
  useEffect(() => {
    const category_to_show =
      document.getElementById('gurado-category').innerHTML;

    if (category_to_show === '*') {
    }
    props.API.getVoucherList().then((result) => {
      if (result.length === 0) {
        sessionStorage.setItem('voucher_count', '1');
        history.push('/voucher/' + result[0].url_key);
      }
      voucherHelper.extractVouchers(result);
      props.API.getStyle().then((pStyle) => {
        setStyle(pStyle);
        setLoading(false);
      });
    });
  }, [props.API]);

  const voucherList = voucherHelper
    .getVouchers()
    .filter((voucher) => voucher.options === undefined)
    .map((voucher) => {
      return (
        <VoucherListItem
          key={`vli${voucher.getSku()}`}
          voucher={voucher}
          style={style}
        />
      );
    });

  if (isLoading)
    return (
      <Container
        fluid
        className="d-flex align-items-center justify-content-center gurado_vl_container"
        style={{ minHeight: '500px' }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  return (
    <div className="mt-4 mb-5">
      <ListContainer
        fluid
        className="d-flex flex-wrap flex-row justify-content-center"
      >
        {voucherList}
      </ListContainer>
    </div>
  );
}
export default VoucherList;
