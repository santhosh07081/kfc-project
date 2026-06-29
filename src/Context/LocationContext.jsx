// LocationContext.jsx
import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  // NEW: Track if the user has initialized the order flow
  const [isOrderStarted, setIsOrderStarted] = useState(false);

  return (
    <LocationContext.Provider value={{
      userLocation, 
      setUserLocation,
      isModalOpen, 
      setIsModalOpen,
      activeTab,      
      setActiveTab,
      orderDetails,      
      setOrderDetails,
      isOrderStarted,   // Export new state
      setIsOrderStarted // Export new setter
    }}>
      {children}
    </LocationContext.Provider>
  );
};