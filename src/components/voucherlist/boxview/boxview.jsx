import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import BoxViewItem from './boxviewItem';

const BoxViewContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
`;

const BoxView = observer(({ settingsStore, voucherListStore }) => {
  return (
    <BoxViewContainer>
      {voucherListStore.vouchers.map((voucher, i) => {
        return (
          <BoxViewItem
            key={`bvitm${i}`}
            voucher={voucher}
            settingsStore={settingsStore}
          />
        );
      })}
    </BoxViewContainer>
  );
});
export default BoxView;
