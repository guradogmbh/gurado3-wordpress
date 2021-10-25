import { observer } from 'mobx-react-lite';

const TopDescription = observer(({ voucherStore }) => {
  return (
    <div
      style={{ width: '100%', marginBottom: '20px', display: 'flex' }}
    >
      <div
        style={{
          width: '41.666667%',
          minWidth: '41.666667%',
          paddingRight: '15px',
        }}
      >
        <img
          src={
            voucherStore.voucher.images.length > 0
              ? voucherStore.voucher.images[0].image_url
              : 'https://i.stack.imgur.com/y9DpT.jpg'
          }
          style={{ height: 'auto', width: '100%' }}
        />
      </div>
      <div
        style={{ paddingLeft: '15px', paddingRight: '15px' }}
        dangerouslySetInnerHTML={{
          __html: voucherStore.voucher.description,
        }}
      ></div>
    </div>
  );
});
export default TopDescription;
