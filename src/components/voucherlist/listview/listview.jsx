import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import ListViewItem from './listviewItem';

const ListViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
`;

const ListView = observer(({ settingsStore, voucherListStore }) => {
  return (
    <ListViewContainer>
      {voucherListStore.vouchers.map((voucher, i) => {
        return (
          <ListViewItem
            key={`lvitm${i}`}
            voucher={voucher}
            settingsStore={settingsStore}
          />
        );
      })}
    </ListViewContainer>
  );
});
export default ListView;
