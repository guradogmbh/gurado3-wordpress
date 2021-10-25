import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Voucher from '../../../helper/voucher';
import PriceConfigurationLabel from '../priceConfigurationLabel';
import { Link } from 'react-router-dom';

const BoxViewItemContainer = styled.div`
  width: 310px;
  height: 270px;
  margin: 15px;
  background-color: rgb(246, 247, 248);
  cursor: pointer;
`;
const ImgDiv = styled.div`
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
    max-height: 174.38px !important;
  }
  overflow: hidden;
`;
const PriceConfiguration = styled.span`
  color: darkblue;
  font-size: 10pt;
  @media only screen and (max-width: 578px) {
    font-size: 8pt;
  }
`;

const BoxViewItem = observer(({ voucher, settingsStore }) => {
  const voucherItem = new Voucher(voucher);
  return (
    <Link
      to={'/voucher/' + voucherItem.getUrlKey()}
      style={{ textDecoration: 'none' }}
    >
      <BoxViewItemContainer>
        <ImgDiv>
          <img
            src={voucherItem.image_url}
            style={{ width: '100%', height: '174.38px' }}
          />
        </ImgDiv>
        <div
          style={{
            textAlign: 'center',
            fontSize: '13pt',
            marginTop: '5px',
            color:
              settingsStore.settings.header_color === undefined
                ? 'black'
                : settingsStore.settings.header_color,
            minHeight: '31px',
          }}
        >
          <b>{voucherItem.name}</b>
        </div>
        <p style={{ textAlign: 'center', color: 'darkblue' }}>
          <PriceConfiguration>
            <PriceConfigurationLabel
              p={voucherItem.getPriceConfiguration()}
              v={voucherItem}
            />
          </PriceConfiguration>
        </p>
      </BoxViewItemContainer>
    </Link>
  );
});

export default BoxViewItem;
