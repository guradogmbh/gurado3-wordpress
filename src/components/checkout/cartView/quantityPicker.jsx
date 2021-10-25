import { observer } from 'mobx-react-lite';

const QuantityPicker = observer(({ item, cartStore }) => {
  return (
    <div
      style={{
        width: '140px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid black',
      }}
    >
      <div
        style={{
          height: '100%',
          width: '33.33333%',
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20pt',
          borderRight: '1px solid black',
        }}
        onClick={() =>
          cartStore.updateQty(item.item_id, parseInt(item.qty) - 1)
        }
      >
        -
      </div>
      <div
        style={{
          height: '100%',
          width: '33.33333%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13pt',
          borderRight: '1px solid black',
        }}
      >
        {item.qty}
      </div>
      <div
        style={{
          height: '100%',
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          justifyContent: 'center',
          fontSize: '20pt',
        }}
        onClick={() =>
          cartStore.updateQty(item.item_id, parseInt(item.qty) + 1)
        }
      >
        +
      </div>
    </div>
  );
});
export default QuantityPicker;
