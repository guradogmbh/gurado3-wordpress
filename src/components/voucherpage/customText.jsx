import { observer } from 'mobx-react-lite';

const CustomText = observer(({ configStore }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'calc(33.333333% + 400px)',
        marginTop: '30px',
      }}
    >
      <textarea
        onChange={(e) => configStore.setCustomText(e.target.value)}
        style={{ width: '100%' }}
        placeholder="Persönliche Nachricht an den Empfänger"
      />
    </div>
  );
});
export default CustomText;
