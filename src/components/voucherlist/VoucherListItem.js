import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  max-width: 300px;
  height: 270px;
  background-color: #f6f7f8;
  margin: 10px;
  cursor: pointer;
  @media only screen and (max-width: 576px) {
    margin-bottom: 20px;
    height: 200px;
  }
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 168px;
  img {
    width: 100%;
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }
  :hover img {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    max-height: 168px !important;
  }
  overflow: hidden;
  @media only screen and (max-width: 578px) {
    height: 130px;
  }
`;
const VoucherName = styled.p`
  font-size: 14pt;
  margin-top: 10px;
  margin-bottom: 5px !important;
  @media only screen and (max-width: 578px) {
    margin-top: 0px;
    font-size: 12pt;
  }
`;
const PriceConfiguration = styled.span`
  color: darkblue;
  font-size: 10pt;
  @media only screen and (max-width: 578px) {
    font-size: 8pt;
  }
`;

const renderPriceConfiguration = (p, v) => {
  console.log(p);
  switch (p.type.toLowerCase()) {
    case 'configurable':
      return 'ab ' + p.minimum + ' ' + v.getCurrencyCode();
    case 'range':
      return p.from + ' - ' + p.to + ' ' + v.getCurrencyCode();
    case 'fixed':
      if (p.amount === '0') return 'konfigurierbar';
      return p.amount + ' ' + v.getCurrencyCode();
    case 'dropdown':
      return (
        p.options[0] +
        ' ' +
        v.getCurrencyCode() +
        ' - ' +
        p.options[p.options.length - 1] +
        ' ' +
        v.getCurrencyCode()
      );
  }
  return p + ' ' + v.getCurrencyCode();
};
function VoucherListItem(props) {
  const voucher = props.voucher;
  return (
    <Link
      to={'/voucher/' + voucher.getUrlKey()}
      style={{ textDecoration: 'none' }}
    >
      <Wrapper className="text-center gurado_vl_item">
        <ImgDiv className="gurado_vl_img">
          <img alt="Gutscheinbild" src={voucher.getImageUrl()} />
        </ImgDiv>
        <VoucherName className="gurado_vl_title">
          <b
            style={{
              color:
                props.style === null
                  ? '#23bade'
                  : props.style.header_color,
            }}
          >
            {voucher.getName()}
          </b>
        </VoucherName>
        <PriceConfiguration className="gurado_vl_price">
          {renderPriceConfiguration(
            voucher.getPriceConfiguration(),
            voucher,
          )}
        </PriceConfiguration>
      </Wrapper>
    </Link>
  );
}
export default VoucherListItem;
