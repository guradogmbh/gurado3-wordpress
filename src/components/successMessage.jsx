import React, { useState, useEffect } from 'react';

export default function ErrorMessage({ message }) {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
     {showMessage && (
     <div
      style={{
        width: '100%',
        backgroundColor: '#D1E7DD',
        color: '#0F5132',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding:'20px'
      }}
    >
      {message} 
    </div>
     )}
    
    </>
   
  );
}
