import React from 'react';
import Loader from 'react-loader-spinner';

export default function GuradoLoader() {
  console.info("dfdfdf");
  return (
    <div
      style={{
        width: '100%',
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Loader type="Oval" />
    </div>
  );
}
