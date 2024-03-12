import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  @media (min-width: 500px) {
    display: flex;
  }
`;
// const StyledImg = styled.div`
//   width: 41.666667%;
//   min-width: 41.666667%;
//   padding-right: 15px;
//   @media (max-width: 500px) {
//     width: 100%;
//     min-width: 100%;
//   }
// `;

const TopDescription = observer(({ voucherStore }) => {
  return (
    <StyledWrapper>
      <div className='row'>
        <div className = 'col-lg-5'>
       
        </div>

        <div className = 'col-lg-7'>
      <div
        style={{ paddingLeft: '15px', paddingRight: '15px' }}
        dangerouslySetInnerHTML={{
          __html: voucherStore.voucher.description,
        }}
      ></div>
      </div> 
      </div>

    </StyledWrapper>
  );
});
export default TopDescription;
