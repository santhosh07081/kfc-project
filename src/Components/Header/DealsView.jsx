import React, { useEffect } from 'react';

const DealsView = ({ isOpen, onClose, offer }) => {
  
  // 1. MUST BE AT THE TOP: Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Locks scroll
    } else {
      document.body.style.overflow = 'auto';   // Unlocks scroll
    }

    // Cleanup function just in case the component unmounts entirely
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // 2. EARLY RETURN COMES AFTER HOOKS
  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 font-sans transition-opacity duration-300">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-black uppercase tracking-wide text-gray-900">
            View Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 flex flex-col items-center">
          
          {/* Modal Image with Red Coupon Border */}
          <div className="w-48 h-32 mb-6 relative">
            <div className="absolute inset-0 border-4 border-red-600 border-dotted z-10 pointer-events-none"></div>
            <div className="absolute inset-1 bg-red-600 p-2">
               <img 
                 src={offer.imgSrc} 
                 alt={offer.title} 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>

          {/* Title & Validity */}
          <h3 className="text-xl font-black uppercase text-gray-900 mb-2 text-center">
            {offer.title}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Valid till {offer.validUntil || '31/12/28'}
          </p>

          {/* Warning Banner */}
          <div className="w-full bg-[#fff9e6] rounded p-4 flex items-start gap-3 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-800">Please review the conditions below</p>
          </div>

      {/* Terms & Conditions List (NOW DYNAMIC) */}
          <div className="w-full text-sm text-gray-700">
            <ul className="list-disc pl-5 space-y-3">
              {/* Checks if terms exist in the database, if yes, maps through them */}
              {offer.terms && offer.terms.length > 0 ? (
                offer.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))
              ) : (
                /* Fallback if you forgot to add terms to a specific offer in db.json */
                <li>Standard KFC Terms and Conditions apply.</li>
              )}
            </ul>
          </div>

        </div>

        {/* Footer Area */}
        <div className="p-4 flex justify-center mt-auto border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-48 border border-black hover:bg-gray-100 text-black rounded-full py-2.5 text-sm font-bold transition-colors focus:outline-none"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};

export default DealsView;