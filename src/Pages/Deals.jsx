import React, { useState, useEffect } from "react";
import axios from "axios";
import FixedLocationBar from "../Components/Layout/Header/FixedLocationBar";
import DealsView from "../Components/Menu/Dealsview"; // Modal component to show offer details

// REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { applyOffer } from "../redux/cartSlice"; // Adjust path if necessary

const Deals = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // REDUX SETUP
  const dispatch = useDispatch();
  const appliedOffer = useSelector((state) => state.cart.appliedOffer);

  // Function to open modal and set the specific offer data
  const handleViewDetails = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/offers")
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching deals:", err);
        setError("Failed to load offers. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading Deals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-bold">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-12 font-sans">
      {/* Full-width Location Bar */}

      <FixedLocationBar />

      {/* Top Banner */}
      <div
        className="relative w-full h-48 md:h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/Offers/offer-banner.png')`,
        }}
      >
        <h1 className="text-white text-3xl md:text-7xl font-bebas font-bold tracking-wider uppercase text-center px-4">
          Save More As You Order
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 ">
        {/* Section Heading */}
        <div className="mb-8">
          <div className="flex flex-col items-center md:items-start">
            {/* KFC Red Lines Decorator */}
            <div className="flex gap-3 mb-6">
              <div className="w-3 h-9 bg-red-600"></div>
              <div className="w-3 h-9 bg-red-600"></div>
              <div className="w-3 h-9 bg-red-600"></div>
            </div>
            <h2 className="text-5xl font-bebas font-bold uppercase tracking-wide text-gray-900">
              Save More As You Order
            </h2>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {offers.map((offer) => {
            // Check if this specific offer is currently applied
            const isApplied = appliedOffer?.id === offer.id;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                {/* Card Image Area - Red border removed */}
                <div className="h-60 w-full relative">
                  <img
                    src={offer.imgSrc}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Valid on 1st order tag condition */}
                  {offer.id === 1 && (
                    <div className="absolute bottom-0 left-0 w-full text-center bg-red-600 text-white text-xs font-bold py-1 z-30">
                      OFFER VALID ONLY ON 1ST ORDER
                    </div>
                  )}
                </div>

                {/* Card Details Area */}
                <div className="p-6  bg-zinc-50 flex flex-col items-center flex-grow text-center">
                  <h3 className="text-lg font-black uppercase text-gray-900 h-14 flex items-center justify-center mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    Min. Order Value {offer.minOrder}
                  </p>

                  <div className="mt-auto w-full flex flex-col items-center gap-4">
                    <button
                      onClick={() => handleViewDetails(offer)}
                      className="text-sm font-semibold underline text-gray-800 hover:text-black focus:outline-none"
                    >
                      View Details
                    </button>

                    {/* REDUX APPLY OFFER BUTTON */}
                    <button
                      onClick={() => dispatch(applyOffer(offer))}
                      disabled={isApplied}
                      className="w-32 bg-black hover:bg-gray-800 text-white rounded-full py-2.5 text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isApplied ? "Applied" : "Apply Offer"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Render the Modal at the bottom of the component */}
      <DealsView
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        offer={selectedOffer}
      />
    </div>
  );
};

export default Deals;
