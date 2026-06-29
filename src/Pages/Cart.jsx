import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import FixedLocationBar from "../Components/Layout/Header/FixedLocationBar";
import EmptyCart from "../Components/Cart/EmptyCart";
import CartItemCard from "../Components/Cart/CartItemCard";
import OrderSummary from "../Components/Cart/OrderSummary";
import ClearCartModal from "../Components/Cart/ClearCartModal";

const Cart = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [addCarryBag, setAddCarryBag] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartItems = useSelector((state) => state.cart.items);
  const appliedOffer = useSelector((state) => state.cart.appliedOffer);

  // --- MATH CALCULATIONS ---
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedOffer) {
    if (appliedOffer.discount) {
      discountAmount = Number(appliedOffer.discount);
    } else if (appliedOffer.discountPercent) {
      discountAmount = (subtotal * Number(appliedOffer.discountPercent)) / 100;
    }
  }

  discountAmount = isNaN(discountAmount) ? 0 : discountAmount;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const taxes = subtotalAfterDiscount * 0.05; 
  const carryBagFee = addCarryBag ? 6 : 0;
  const total = subtotalAfterDiscount + taxes + carryBagFee;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // --- RENDER EMPTY STATE ---
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  // --- RENDER ACTIVE CART ---
  return (
    <>
      <FixedLocationBar />
      <div className="min-h-screen bg-white px-4 font-sans ">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex gap-[12px] mb-4">
              <div className="w-3 h-8 bg-[#e4002b]"></div>
              <div className="w-3 h-8 bg-[#e4002b]"></div>
              <div className="w-3 h-8 bg-[#e4002b]"></div>
            </div>
            <h1 className="text-4xl md:text-4xl font-oswald font-bold text-gray-900 uppercase tracking-tighter mb-6">
              MY CART
            </h1>
            <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
              <Link to="/menu" className="underline hover:text-black">
                Back to Menu
              </Link>
              <Link to="/deals" className="underline hover:text-black">
                View Offers &rarr;
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Side: Horizontal List View */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              <div className="mt-4 mb-20">
                <button
                  onClick={() => setShowClearModal(true)}
                  className="text-sm font-bold underline text-gray-800 hover:text-black focus:outline-none"
                >
                  Remove All
                </button>
              </div>
            </div>

            {/* Right Side: Order Summary Box */}
            <OrderSummary 
              totalItemCount={totalItemCount}
              appliedOffer={appliedOffer}
              subtotal={subtotal}
              discountAmount={discountAmount}
              taxes={taxes}
              addCarryBag={addCarryBag}
              setAddCarryBag={setAddCarryBag}
              total={total}
            />
          </div>
        </div>
      </div>

      <ClearCartModal 
        showClearModal={showClearModal} 
        setShowClearModal={setShowClearModal} 
      />
    </>
  );
};

export default Cart;