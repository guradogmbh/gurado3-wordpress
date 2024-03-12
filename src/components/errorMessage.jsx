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
        backgroundColor: '#f8d7da',
        color: '#721c24',
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
