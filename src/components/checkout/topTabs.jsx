import { observer } from 'mobx-react-lite';

const TopTabs = observer(({ step, settingsStore }) => {
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
          maxWidth: '200px',
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
        </div>
        <div style={{ width: '100%', backgroundColor: 'yellow' }}>
          <div
            style={{
              float: 'left',
              position: 'relative',
              left: '-16px',
            }}
          >
            Warenkorb
          </div>
          <div
            style={{
              float: 'right',
              position: 'relative',
              left: '4px',
            }}
          >
            Zahlen
          </div>
        </div>
      </div>
    </div>
  );
});
export default TopTabs;
