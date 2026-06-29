import React, { useContext } from 'react';
import { LocationContext } from '../../../Context/LocationContext';

const FixedLocationBar = () => {
  const { userLocation, setIsModalOpen, activeTab, orderDetails } = useContext(LocationContext);

  const getLocationText = () => {
    const tab = activeTab?.toUpperCase();    // Ensure tab is in uppercase for comparison
    if (tab === 'DELIVERY') return 'Delivery to: ';
    if (tab === 'PICK UP') return 'Pick Up at: ';
    if (tab === 'DINE IN') return 'Dine In at: ';
    return 'Select Mode: '; 
  };

  return (
    <div className="bg-[#1a1a1a] w-full py-5 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
      <div className="flex items-center gap-2 text-white text-sm font-medium tracking-wide">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e4002b]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>
          {getLocationText()} <span className="font-bold">{userLocation || 'Select Location'}</span>  {/* 1st span selectmode,2nd select location */}
        </span>
      </div> 

      {/* TIME: reads from orderDetails if available, else shows ASAP */}
      <div className="flex items-center gap-2 text-white text-sm font-medium tracking-wide">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e4002b]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        {/* ADD date display + time from orderDetails */}
        <span className="font-bold">
          {orderDetails 
            ? `${orderDetails.date} • ${orderDetails.time}` 
            : 'ASAP'}
        </span>
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer text-white border border-white rounded-full px-5 py-1.5 text-xs font-semibold hover:bg-white hover:text-black transition-colors duration-200"
      >
        Change
      </button>
    </div>
  );
};
export default FixedLocationBar;