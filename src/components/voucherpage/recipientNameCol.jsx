import { observer } from 'mobx-react-lite';

const RecipientName = observer(({ configStore }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'calc(33.333333% + 400px)',
        marginTop: '30px',
      }}
    >
      <input
        type="text"
        style={{ width: '100%' }}
        placeholder="Name des Beschenkten"
        onChange={(e) => configStore.setRecipientName(e.target.value)}
      />
    </div>
  );
});
export default RecipientName;
