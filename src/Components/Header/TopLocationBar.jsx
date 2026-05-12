import React, { useContext } from 'react';
import { LocationContext } from '../Content/LocationContext'; 

const TopLocationBar = () => {
  // We ONLY need setIsModalOpen to trigger the popup. 
  // We ignore orderDetails here so the text never changes.
  const { setIsModalOpen } = useContext(LocationContext);

  return (
    <div className="bg-white w-full py-2 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4 z-40">
      
      {/* Icon and Text */}
      <div className="flex items-center gap-2 text-[#202124] text-[13px]  uppercase tracking-wide">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-[18px] w-[18px] text-[#e4002b]" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        
        {/* Completely static text as requested */}
        <span className='font-bebas text-sm'>Allow location access for local store menu and promos</span>
      </div>

      {/* Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-[#202124] text-white rounded-full px-5 py-1 text-[13px] font-semibold hover:bg-black transition-colors duration-200 cursor-pointer"
      >
        {/* Completely static button text */}
        Set Location
      </button>

    </div>
  );
};

export default TopLocationBar;