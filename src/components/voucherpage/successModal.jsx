import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
const SuccessModal = (props) => {
  const ref = useRef();
  const isMobile = useMediaQuery({ maxWidth: 500 });

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      console.log('larifari');
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        props.showModal &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        props.setShowModal(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener(
        'mousedown',
        checkIfClickedOutside,
      );
    };
  }, [props.showModal]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: '5',
      }}
    >
      <div
        ref={ref}
        style={{
          position: 'absolute',
          left: !isMobile ? 'calc(50% - 250px)' : 'calc(50% - 150px)',
          top: 'calc(50% - 86px)',
          backgroundColor: 'white',
          height: '172px',
          width: !isMobile ? '500px' : '300px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '30px',
            backgroundColor: 'rgb(0, 128, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <FontAwesomeIcon
            icon={faCheck}
            style={{ marginRight: '5px' }}
          />{' '}
          {!isMobile ? (
            <>Der Gutschein wurde dem Warenkorb hinzugefügt</>
          ) : (
            <>Gutschein hinzugefügt</>
          )}
        </div>
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 30px)',
            display: 'flex',
          }}
        >
          <div
            style={{
              width: '176px',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={props.voucherStore.activeImage} height="90px" />
          </div>
          <div
            height="100%"
            style={{
              flexGrow: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <b>{props.voucherStore.voucher.name}</b>
              <br />
              {parseFloat(props.configStore.price)
                .toFixed(2)
                .replace('.', ',')}{' '}
              {props.voucherStore.voucher.currency_code}
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
              <div style={{ width: '50%', padding: '10px' }}>
                <button
                  style={
                    props.settingsStore.settings.btn_primary_color ===
                    undefined
                      ? { width: '100%' }
                      : {
                          width: '100%',
                          backgroundColor:
                            props.settingsStore.settings
                              .btn_secondary_color,
                        }
                  }
                  onClick={() => props.setShowModal(false)}
                >
                  Schließen
                </button>
              </div>
              <div style={{ flexGrow: '1', padding: '10px' }}>
                <Link
                  to={'/checkout'}
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    style={
                      props.settingsStore.settings
                        .btn_primary_color === undefined
                        ? { width: '100%' }
                        : {
                            width: '100%',
                            backgroundColor:
                              props.settingsStore.settings
                                .btn_primary_color,
                          }
                    }
                  >
                    {!isMobile ? <>Zur Kasse</> : <>Kasse</>}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SuccessModal;
