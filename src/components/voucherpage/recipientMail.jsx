import { observer } from 'mobx-react-lite';

const RecipientMail = observer(({ configStore }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'calc(33.333333% + 400px)',
        marginTop: '30px',
      }}
    >
      <input
        type="email"
        style={{ width: '100%' }}
        placeholder="E-Mail des Beschenkten"
        onChange={(e) => configStore.setRecipientMail(e.target.value)}
      />
    </div>
  );
});
export default RecipientMail;
