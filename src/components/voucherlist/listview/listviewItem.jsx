import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Voucher from '../../../helper/voucher';

const ListViewItemContainer = styled.div`
  height: 150px;
  width: 100%;
  max-width: 600px;
  background-color: #e9eaed;
  border-radius: 10px;
  margin: 10px;
`;
const ListViewItem = observer(({ voucher, settingsStore }) => {
  const voucherItem = new Voucher(voucher);

  return (
    <Link
      to={``}
      style={{
        textDecoration: 'none',
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <ListViewItemContainer>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
          }}
        >
          <img
            src={voucherItem.image_url}
            style={{ height: '100%' }}
          />
        </div>
      </ListViewItemContainer>
    </Link>
  );
});
export default ListViewItem;
