import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Voucher from '../../../helper/voucher';
import PriceConfigurationLabel from '../priceConfigurationLabel';
import { Link } from 'react-router-dom';

const BoxViewItemContainer = styled.div`
  width: 288px;
  height: 233px;
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

  overflow: hidden;
`;
const PriceConfiguration = styled.span`
  font-size: 10pt;
  @media only screen and (max-width: 578px) {
    font-size: 8pt;
  }
`;

console.info("in box view item");

const BoxViewItem = observer(({ voucher, settingsStore }) => {
  const voucherItem = new Voucher(voucher);
  console.info("voucherItem is as follow=>",voucherItem);
  return (
    <Link
      to={'/voucher/' + voucherItem.getUrlKey()}
      style={{ textDecoration: 'none' }}
    >
      <BoxViewItemContainer>
        <ImgDiv>
          <img
            src={voucherItem.image_url}
            style={{ width: '288px', height: '162px' }}
          />
        </ImgDiv>
        <a
          style={{
            textAlign: 'center',
            minHeight: '31px', 
            display:'grid',
            width:'100%',
          }}
        >
          <b>{voucherItem.name}</b>
        <span style={{ textAlign: 'center'}}>
          <PriceConfiguration>
            <PriceConfigurationLabel
              p={voucherItem.getPriceConfiguration()}
              v={voucherItem}
            />
          </PriceConfiguration>
        </span> 
        </a> 
      </BoxViewItemContainer>
    </Link>
  );
});

export default BoxViewItem;
