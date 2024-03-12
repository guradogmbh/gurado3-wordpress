import { useTranslation } from 'react-i18next';

export default function CartNotFound() {
  var {t} = useTranslation(); 
  return (
    <div
      style={{
        width: '100%',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h4>{t('THE_CART_IS_EMPTY')}</h4>  
    </div>
  );
}
