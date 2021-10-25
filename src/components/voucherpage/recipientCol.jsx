import { observer } from 'mobx-react-lite';

const RecipientCol = observer(({ configStore }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          width: '33.333333%',
          minWidth: '33.333333%',
        }}
      >
        Empfänger:
      </div>
      <div
        style={{
          flexGrow: '1',
        }}
      >
        <input
          type="radio"
          name="recipient"
          id="recipient1"
          defaultChecked
          value="self"
          onClick={(e) => configStore.setRecipient(e.target.value)}
        />
        <label htmlFor="recipient1">ich</label>
        <input
          style={{ marginLeft: '30px' }}
          type="radio"
          name="recipient"
          id="recipient2"
          value="other"
          onClick={(e) => {
            configStore.setRecipient(e.target.value);
          }}
        />
        <label htmlFor="recipient2">der Beschenkte</label>
      </div>
    </div>
  );
});
export default RecipientCol;
