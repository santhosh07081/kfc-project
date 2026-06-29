// Home.jsx
import React, { useContext, useEffect } from "react";
import Order from "../Components/Order/Order"; // This is your "Start Order" banner component
import OrderSelector from "../Components/Order/OrderSelector"; // This is the 2nd image view
import ProductBanner from "../Components/Common/ProductBanner";
import BrowseCategories from "../Components/Menu/BrowseCategories";
import OfferCard from "../Components/Common/OfferCard";
import RedLine from "../Components/Common/RedLine";
import { LocationContext } from "../Context/LocationContext";
import { useSelector } from "react-redux";
import FixedLocationBar from "../Components/Layout/Header/FixedLocationBar";

const Home = () => {
  const { isOrderStarted, setIsOrderStarted } = useContext(LocationContext);

  // Get auth state from Redux
  const user = useSelector((state) => state.auth.user);

  // Automatically "start order" if user is already signed in
  useEffect(() => {
    if (user) {
      setIsOrderStarted(true);
    }
  }, [user, setIsOrderStarted]);

  return (
    <div className="min-h-screen bg-white">
      {/* Logic: If order hasn't started AND user is NOT logged in, show the "Start Order" banner.
         Otherwise, show the Select Order Type bar (2nd image).
      */}
      {!isOrderStarted && !user ? (
        <Order onStart={() => setIsOrderStarted(true)} />
      ) : (
        <>
          <FixedLocationBar />
          <OrderSelector />
        </>
      )}

      <ProductBanner />
      <BrowseCategories />
      <RedLine />
      <OfferCard />
    </div>
  );
};

export default Home;
