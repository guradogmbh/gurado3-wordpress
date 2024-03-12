import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SuccessPage() { 
  localStorage.setItem('billing_address',{});
  localStorage.clear();
  sessionStorage.setItem('cart_qty', 0);  

  var { t } = useTranslation();
  //CartStore.setShowPaymentWall(false);  


 
  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ fontSize: '16pt' }}>
      {t("THANK_YOU_FOR_YOUR_ORDER")}       </p>
      <Link to="/">
        <button>{t("BACK_TO_THE_VOUCHERS")}</button>
      </Link>
    </div>
  );
}
