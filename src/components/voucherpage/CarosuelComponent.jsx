import React, { useState } from 'react';

const Carousel = ({ images }) => {
  console.info("in carosuel component");
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel">
      <button onClick={goToPrevImage} className="gurado-prev-button">&lt;</button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      <button onClick={goToNextImage} className="gurado-next-button">&gt;</button> 
    </div>
  );
};

export default Carousel;  