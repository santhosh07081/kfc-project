import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import kfcbanner1 from '../../assets/banner/kfcbanner1.png';
import kfcbanner2 from '../../assets/banner/kfcbanner2.png';
import kfcbanner3 from '../../assets/banner/kfcbanner3.png';    

const ProductBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Array of your 3 promotion images
  const promos = [
    {
      id: 1,
      image: kfcbanner1, 
      alt: "Crispy Shawowrma Wrap"
    },
    {
      id: 2,
      image: kfcbanner2, 
      alt: "KFC Chicken Bucket"
    },
    {
      id: 3,
      image: kfcbanner3, 
      alt: "Family Feast Combo"
    }
  ];

  // 1. Auto-play logic: Change image every 5 seconds (5000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === promos.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    // Cleanup timer if the component unmounts
    return () => clearInterval(timer);
  }, [promos.length]);

  // 2. Navigation logic: Go to menu when clicked
  const handleBannerClick = () => {
    navigate('/menu');
  };

  return (
    <div 
      className="mt-8 relative w-full h-[400px] md:h-[800px] bg-[#1a1a1a] cursor-pointer overflow-hidden group"
      onClick={handleBannerClick}
    >
      {/* Images container with fade transition */}
      {promos.map((promo, index) => (
        <img
          key={promo.id}
          src={promo.image}
          alt={promo.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Numbered Indicators (01, 02, 03) based on your reference image */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 z-20 flex gap-3">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Stops the click from triggering handleBannerClick
              setCurrentIndex(index);
            }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              index === currentIndex 
                ? 'border-white text-white scale-110' 
                : 'border-white/50 text-white/50 hover:border-white hover:text-white'
            }`}
          >
            0{index + 1}
          </button>
        ))}
      </div>
      
      {/* Optional Hover Overlay for user feedback */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProductBanner;