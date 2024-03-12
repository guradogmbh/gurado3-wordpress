import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';


const CustomText = observer(({ configStore,voucherStore }) => {
  const customTextData = localStorage.getItem("custom_text"); 
  var { t } = useTranslation();
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 'calc(33.333333% + 400px)',
        marginTop: '30px',
      }}
    >
      <textarea
        onBlur={(e) => configStore.setCustomText(e.target.value,voucherStore,configStore)} 
        style={{ width: '100%',height:'100px' }}
        placeholder={t("PERSONAL_MESSAGE_TO_THE_RECIPIENT")} 
       defaultValue={customTextData ? customTextData :''} 
      />
    </div>
  );
});
export default CustomText;
