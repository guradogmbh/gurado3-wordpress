import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 500px) {
    display: flex;
  }
`;
const StyledImg = styled.div`
  width: 41.666667%;
  min-width: 41.666667%;
  padding-right: 15px;
  @media (max-width: 500px) {
    width: 100%;
    min-width: 100%;
  }
`;

const TopDescription = observer(({ voucherStore }) => {
  return (
    <StyledWrapper>
      <StyledImg>
        <img
          src={
            voucherStore.voucher.images.length > 0
              ? voucherStore.voucher.images[0].image_url
              : 'https://i.stack.imgur.com/y9DpT.jpg'
          }
          style={{ height: 'auto', width: '100%' }}
        />
      </StyledImg>
      <div
        style={{ paddingLeft: '15px', paddingRight: '15px' }}
        dangerouslySetInnerHTML={{
          __html: voucherStore.voucher.description,
        }}
      ></div>
    </StyledWrapper>
  );
});
export default TopDescription;
