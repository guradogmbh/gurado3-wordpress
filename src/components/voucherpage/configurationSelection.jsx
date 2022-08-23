import { useEffect, useState } from 'react';
import VoucherConfigurationStore from '../../store/VoucherConfigurationStore';
import PriceCol from './priceCol';
import CustomText from './customText';
import CartItem from '../../helper/cartItem';
import Api from '../../helper/api';
import MailConfiguration from './mailConfiguration';
import PostConfiguration from './postConfiguration';
import Loader from 'react-loader-spinner';
import ErrorMessage from '../errorMessage';
import SuccessModal from './successModal';
import ConfigOptions from './configOptions';

const { observer } = require('mobx-react-lite');
const configStore = new VoucherConfigurationStore();
const API = new Api();

const ConfigurationSelection = observer(
  ({ voucherStore, settingsStore }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      if (!voucherStore.ready) return;
      configStore.init(voucherStore);
      voucherStore.connect(configStore);
    }, [voucherStore.ready]);

    useEffect(() => {
      configStore.setSenderName('');
      configStore.setRecipientName('');
      configStore.setRecipientMail('');
      configStore.setRecipient('self');
    }, [voucherStore.shippingMethod]);

    const addToCart = () => {
      setLoading(true);
      let cartItem = new CartItem();
      cartItem.setAmount(configStore.price);
      cartItem.setSku(voucherStore.voucher.sku);
      cartItem.setDeliveryType(voucherStore.shippingMethod);
      cartItem.setDesignTemplate(voucherStore.templateId);
      cartItem.setRecipient(configStore.recipient);
      cartItem.setEmail(configStore.recipientMail);
      cartItem.setRecipientName(configStore.recipientName);
      cartItem.setMessage(configStore.customText);
      cartItem.setSenderName(configStore.senderName);
      cartItem.setOptions(voucherStore.chosenOptions.options);
      console.log(cartItem);
      API.addToCart(cartItem).then((res) => {
        if (res.sku === undefined || res === null) {
          setErrorMessage(res.message);
        } else {
          setErrorMessage('');
          setShowModal(true);
        }
        setLoading(false);
      });
    };

    return (
      <div style={{ width: '100%', marginTop: '30px' }}>
        <h3
          style={{
            color:
              settingsStore.settings.header_color === undefined
                ? 'black'
                : settingsStore.settings.header_color,
          }}
        >
          Personalisierung
        </h3>
        {voucherStore.isConfigurable && (
          <ConfigOptions
            voucherStore={voucherStore}
            configStore={configStore}
          />
        )}
        <PriceCol
          voucherStore={voucherStore}
          configStore={configStore}
        />

        {voucherStore.shippingMethod === 'virtual' ? (
          <MailConfiguration configStore={configStore} />
        ) : (
          <PostConfiguration configStore={configStore} />
        )}
        
        {voucherStore && voucherStore.voucher &&  voucherStore.voucher.allow_personalized_message == 'YES' ? ( 
        <CustomText configStore={configStore} />
        ) : (
            <></>   
        )} 

        <div
          style={{
            width: '100%',
            maxWidth: 'calc(33.333333% + 400px)',
            marginTop: '30px',
          }}
        >
          <button
            style={
              settingsStore.settings.btn_primary_color === undefined
                ? { width: '100%', marginBottom: '30px' }
                : {
                    width: '100%',
                    marginBottom: '30px',
                    backgroundColor:
                      settingsStore.settings.btn_primary_color,
                  }
            }
            onClick={addToCart}
            disabled={
              loading ||
              voucherStore.requiredOptions >
                voucherStore.chosenOptions.options.length ||
              voucherStore.estimationLoading
            }
          >
            {!loading && !voucherStore.estimationLoading ? (
              <>
                {voucherStore.requiredOptions >
                voucherStore.chosenOptions.options.length ? (
                  <>Bitte alle Optionen auswählen</>
                ) : (
                  <>In den Warenkorb</>
                )}
              </>
            ) : (
              <>
                <Loader
                  type="ThreeDots"
                  color="blue"
                  width="30"
                  height="20"
                />
              </>
            )}
          </button>
          {errorMessage.length > 0 && (
            <div style={{ width: '100%', maxWidth: '500px' }}>
              <ErrorMessage message={errorMessage.toString()} />
            </div>
          )}
          {showModal && (
            <SuccessModal
              showModal={showModal}
              setShowModal={setShowModal}
              voucherStore={voucherStore}
              configStore={configStore}
              settingsStore={settingsStore}
            />
          )}
        </div>
      </div>
    );
  },
);
export default ConfigurationSelection;
