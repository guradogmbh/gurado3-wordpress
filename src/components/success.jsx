import { Link } from 'react-router-dom';

export default function SuccessPage() {
  localStorage.setItem('billing_address',{});
  localStorage.clear();
  sessionStorage.setItem('cart_qty', 0);  
 
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
        Vielen Dank für ihre Bestellung
      </p>
      <Link to="/">
        <button>Zurück zu den Gutscheinen</button>
      </Link>
    </div>
  );
}
