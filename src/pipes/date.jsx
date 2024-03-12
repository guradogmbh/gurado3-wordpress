import React from "react";

const DatePipe = ({ date,transformValue = false }) => {
  if(transformValue) {
    const formattedDate = this.datePipe.transform(date, 'dd.mm.yyyy');
    return formattedDate;
  } 
  else {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("de-DE", options);
    return <span>{formattedDate}</span>;


  }
  

};

export default DatePipe;