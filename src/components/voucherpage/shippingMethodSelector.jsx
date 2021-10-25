import { observer } from 'mobx-react-lite';

const ShippingMethodSelector = observer(
  ({ voucherStore, settingsStore }) => {
    return (
      <div style={{ width: '100%', marginTop: '40px' }}>
        <h3
          style={{
            color:
              settingsStore.settings.header_color === undefined
                ? 'black'
                : settingsStore.settings.header_color,
          }}
        >
          Versandmethode wählen
        </h3>
        <div style={{ width: '100%', display: 'flex' }}>
          <div
            style={{
              minWidth: '50%',
              width: '50%',
              paddingRight: '15px',
            }}
          >
            <button
              style={
                settingsStore.settings.btn_primary_color === undefined
                  ? {
                      width: '100%',
                    }
                  : {
                      width: '100%',
                      borderColor:
                        voucherStore.shippingMethod === 'virtual'
                          ? settingsStore.settings
                              .btn_primary_border_color
                          : settingsStore.settings
                              .btn_secondary_border_color,
                      backgroundColor:
                        voucherStore.shippingMethod === 'virtual'
                          ? settingsStore.settings.btn_primary_color
                          : settingsStore.settings
                              .btn_secondary_color,
                    }
              }
              onClick={() =>
                voucherStore.setShippingMethod('virtual')
              }
            >
              <span
                style={{
                  color:
                    settingsStore.settings.btn_font_color ===
                    undefined
                      ? 'white'
                      : settingsStore.settings.btn_font_color,
                }}
              >
                E-Mail
              </span>
            </button>
          </div>
          <div style={{ width: '50%', paddingLeft: '15px' }}>
            <button
              style={
                settingsStore.settings.btn_secondary_color ===
                undefined
                  ? {
                      width: '100%',
                    }
                  : {
                      width: '100%',
                      borderColor:
                        voucherStore.shippingMethod === 'physical'
                          ? settingsStore.settings
                              .btn_primary_border_color
                          : settingsStore.settings
                              .btn_secondary_border_color,
                      backgroundColor:
                        voucherStore.shippingMethod === 'physical'
                          ? settingsStore.settings.btn_primary_color
                          : settingsStore.settings
                              .btn_secondary_color,
                    }
              }
              onClick={() =>
                voucherStore.setShippingMethod('physical')
              }
            >
              <span
                style={{
                  color:
                    settingsStore.settings.btn_font_color ===
                    undefined
                      ? 'white'
                      : settingsStore.settings.btn_font_color,
                }}
              >
                Post
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  },
);
export default ShippingMethodSelector;
