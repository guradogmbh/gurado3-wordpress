import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';


const SenderName = observer(({ configStore }) => {
  var { t } = useTranslation();

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
        placeholder={t("NAME_OF_THE_GIFT_RECIPIENT")}
        onChange={(e) => configStore.setSenderName(e.target.value)}
      />
    </div>
  );
});
export default SenderName;
