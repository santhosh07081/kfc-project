import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DealsView from "./DealsView"; // Importing your existing modal

// REDUX IMPORTS ADDED HERE
import { useDispatch, useSelector } from "react-redux";
import { applyOffer } from "../../redux/cartSlice"; 

const Offercard = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const navigate = useNavigate();
  
  // Create a reference to the scrollable container
  const scrollRef = useRef(null);

  // REDUX HOOKS ADDED HERE
  const dispatch = useDispatch();
  const appliedOffer = useSelector((state) => state.cart.appliedOffer);

  // Fetch offers
  useEffect(() => {
    axios
      .get("http://localhost:4000/offers")
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deals:", err);
        setError("Failed to load offers.");
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  // Function to handle clicking the left/right arrows
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      // Calculate scroll amount (approx width of one card + gap)
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) {
    return <div className="py-8 text-center font-bold">Loading Offers...</div>;
  }

  if (error) {
    return null; // Silently fail on home/menu pages if offers don't load
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        {/* Left Side: Decorator & Title */}
        <div className="flex flex-col items-start">
          <h2 className="text-3xl md:text-4xl font-bebas font-bold uppercase tracking-wide text-gray-900">
            Save More As You Order
          </h2>
        </div>

        {/* Right Side: View Offers Button */}
        <button
          onClick={() => navigate("/deals")} // Navigates to your main Deals.jsx page
          className="text-sm font-bold text-gray-800 hover:text-black mb-1 flex items-center gap-1 group"
        >
          View Offers
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Carousel Wrapper with Relative positioning for the buttons */}
      <div className="relative group">
        
        {/* Left Scroll Button */}
        <button 
          onClick={() => handleScroll("left")}
          className="absolute left-0 top-[50%] -translate-y-1/2 -ml-4 md:-ml-6 z-40 bg-white border border-gray-200 hover:bg-red-500 text-gray-800 hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 pr-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Horizontal Scrolling Carousel Area */}
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {offers.map((offer) => {
            // REDUX CHECK: Is this specific offer currently applied in the cart?
            const isApplied = appliedOffer && appliedOffer.id === offer.id;

            return (
              <div
                key={offer.id}
                className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] flex-shrink-0 snap-start bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Image Area */}
                <div className="h-48 w-full relative">
                  <img
                    src={offer.imgSrc}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Valid on 1st order tag condition */}
                  {offer.id === 1 && (
                    <div className="absolute bottom-0 left-0 w-full text-center bg-red-600 text-white text-[10px] sm:text-xs font-bold py-1 z-30">
                      OFFER VALID ONLY ON 1ST ORDER
                    </div>
                  )}
                </div>

                {/* Card Details Area */}
                <div className="p-6 h-60 bg-zinc-50 flex flex-col items-center flex-grow text-center">
                  <h3 className="text-lg font-black uppercase text-gray-900 h-14 flex items-center justify-center mb-2 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    Min. Order Value {offer.minOrder}
                  </p>

                  <div className="w-full flex flex-col items-center gap-4">
                    <button
                      onClick={() => handleViewDetails(offer)}
                      className="text-sm font-semibold underline text-gray-800 hover:text-black focus:outline-none"
                    >
                      View Details
                    </button>
                    
                    {/* REDUX CONNECTED BUTTON */}
                    <button 
                      onClick={() => dispatch(applyOffer(offer))}
                      disabled={isApplied}
                      className={`w-32 rounded-full py-2.5 text-sm font-bold transition-colors ${
                        isApplied 
                          ? "bg-gray-400 text-white cursor-not-allowed" 
                          : "bg-black hover:bg-gray-800 text-white"
                      }`}
                    >
                      {isApplied ? "Applied" : "Apply Offer"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        <button 
          onClick={() => handleScroll("right")}
          className="absolute right-0 top-[50%] -translate-y-1/2 -mr-4 md:-mr-6 z-40 bg-white hover:bg-red-500 border border-gray-200 text-gray-800 hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 pl-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

      </div>

      {/* Reusing your DealsView Modal */}
      <DealsView
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        offer={selectedOffer}
      />
    </div>
  );
};

export default Offercard;