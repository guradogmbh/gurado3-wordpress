import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';


const RecipientCol = observer(({ configStore }) => {
  var { t } = useTranslation();

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
       {t("RECIPIENT")}
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
        <label style={{ marginLeft: '5px' }} htmlFor="recipient1">
        {t("I")}
        </label>
        <input
          style={{ marginLeft: '30px' }}
          type="radio"
          name="recipient"
          id="recipient2"
          value="someone_else"
          onClick={(e) => {
            configStore.setRecipient(e.target.value);
          }}
        />
        <label style={{ marginLeft: '5px' }} htmlFor="recipient2">
        {t("THE_RECIPIENT")} 
        </label>
      </div>
    </div>
  );
});
export default RecipientCol;
