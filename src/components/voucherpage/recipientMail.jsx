import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';


const RecipientMail = observer(({ configStore }) => {
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
        type="email"
        style={{ width: '100%' }}
        placeholder={t("EMAIL_OF_THE_GIFT_RECIPIENT")}  
        onChange={(e) => configStore.setRecipientMail(e.target.value)} 
      />
    </div>
  );
});
export default RecipientMail;
