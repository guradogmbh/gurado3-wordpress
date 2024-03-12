import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next'; 

const TopTabs = observer(({ step, settingsStore }) => {
  var { t } = useTranslation();
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '250px',
        }}
      >
        <div style={{ width: '100%', display: 'flex' }}>
          <div
            style={{
              width: '35px',
              height: '35px',
              backgroundColor:
                step === '1'
                  ? settingsStore.settings.checkout_step_color_primary
                    ? settingsStore.settings
                        .checkout_step_color_primary
                    : '#007bff'
                  : settingsStore.settings
                      .checkout_step_color_secondary
                  ? settingsStore.settings
                      .checkout_step_color_secondary
                  : 'rgb(87, 86, 86)',
              color: settingsStore.settings.checkout_step_color_text
                ? settingsStore.settings.checkout_step_color_text
                : 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            1
          </div>
          <div
            style={{
              flexGrow: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <hr
              width="100%"
              style={{ margin: '0', backgroundColor: 'black' }}
            />
          </div>
          <div
            style={{
              width: '35px',
              height: '35px',
              backgroundColor:
                step === '2'
                  ? settingsStore.settings.checkout_step_color_primary
                    ? settingsStore.settings
                        .checkout_step_color_primary
                    : '#6c757d'
                  : settingsStore.settings
                      .checkout_step_color_secondary
                  ? settingsStore.settings
                      .checkout_step_color_secondary
                  : 'rgb(87,86,86)',
              color: settingsStore.settings.checkout_step_color_text
                ? settingsStore.settings.checkout_step_color_text
                : 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            2
          </div>
          <div
            style={{
              flexGrow: '1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <hr
              width="100%"
              style={{ margin: '0', backgroundColor: 'black' }}
            />
          </div> 
          <div
            style={{
              width: '35px',
              height: '35px',
              backgroundColor:
                step === '3'
                  ? settingsStore.settings.checkout_step_color_primary
                    ? settingsStore.settings
                        .checkout_step_color_primary
                    : '#6c757d'
                  : settingsStore.settings
                      .checkout_step_color_secondary
                  ? settingsStore.settings
                      .checkout_step_color_secondary
                  : 'rgb(87,86,86)',
              color: settingsStore.settings.checkout_step_color_text
                ? settingsStore.settings.checkout_step_color_text
                : 'white',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            3
          </div>
        
        </div>
        <div style={{ width: '100%', backgroundColor: 'yellow' }}>
          <div
            style={{
              float: 'left',
              position: 'relative',
              left: '-16px',
            }}
          >
           {t("SHOPPING_CART")}
          </div>
          <div
            style={{
              float: 'right',
              position: 'relative',
              left: '-84px',
            }}
          >
          {t("CONTACT_INFO")} 
          </div>
          <div
            style={{
              float: 'right',
              position: 'relative',
              left: '92px', 
            }}
          >
          {t("PAY")}
          </div>
        </div>
      </div>
    </div>
  );
});
export default TopTabs;
