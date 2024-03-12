import React from "react";

const CurrencyPipe = ({ value }) => {
  const formattedValue = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);

  return <span>{formattedValue}</span>; 
};

export default CurrencyPipe;