import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateQuantity, removeFromCart, removeOffer, clearCart } from "../../redux/cartSlice";
import FixedLocationBar from "../Content/FixedLocationBar";
import bucketImage from "../../assets/banner/cartempty.png";

const Cart = () => {
  const dispatch = useDispatch();
  // Control the popup visibility
  const [showClearModal, setShowClearModal] = useState(false);
  
  // NEW: State to track the carry bag checkbox
  const [addCarryBag, setAddCarryBag] = useState(false);

  // Scroll to the top of the page when this component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Read state from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const appliedOffer = useSelector((state) => state.cart.appliedOffer);

  // ==========================================
  // UPDATED SAFE MATH CALCULATIONS (Fixes NaN)
  // ==========================================
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let discountAmount = 0;
  if (appliedOffer) {
    // If database uses a flat 'discount' amount (e.g., 75, 199)
    if (appliedOffer.discount) {
      discountAmount = Number(appliedOffer.discount);
    } 
    // Fallback just in case you ever add a 'discountPercent' back later
    else if (appliedOffer.discountPercent) {
      discountAmount = (subtotal * Number(appliedOffer.discountPercent)) / 100;
    }
  }

  // Ensure discountAmount is a valid number, otherwise default to 0
  discountAmount = isNaN(discountAmount) ? 0 : discountAmount;

  // Make sure subtotal never goes below 0 after a discount
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  
  const taxes = subtotalAfterDiscount * 0.05; // 5% GST
  
  // NEW: Calculate carry bag fee (₹6 if checked, ₹0 if not)
  const carryBagFee = addCarryBag ? 6 : 0;
  
  // NEW: Added carryBagFee to the total
  const total = subtotalAfterDiscount + taxes + carryBagFee;

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // ==========================================

  // EMPTY CART STATE
  if (cartItems.length === 0) {
    return (
      <>
        {/* Full-width Location Bar */}
        <FixedLocationBar />
        <div className="ml-80">
          <div className="flex gap-[12px] mb-4">
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
            <div className="w-3 h-8 bg-[#e4002b]"></div>
          </div>
          <h1 className="text-4xl md:text-4xl font-oswald font-bold text-gray-900 uppercase tracking-tighter mb-6">
            MY CART
          </h1>
        </div>
        <div className=" flex flex-col md:flex-row items-center w-300 h-150 justify-center bg-[#f8f7f5] px-6 md:px-24 py-12 ml-80 ">
          {/* Left Side: Text and Button */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
            <h1 className="text-3xl md:text-5xl font-black text-[#202124] uppercase tracking-tighter leading-[1.05] mb-10">
              Your cart is<br />
              empty. Let's<br />
              start an<br />
              order!
            </h1>
            <Link
              to="/menu"
              className="bg-[#e4002b] text-white px-10 py-3.5 rounded-full font-semibold text-[16px] hover:bg-red-700 transition-colors"
            >
              Start Order
            </Link>
          </div>

          {/* Right Side: Bucket Image */}
          <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
            <img
              src={bucketImage}
              alt="Empty KFC Bucket"
              className="w-full max-w-[500px] object-contain"
            />
          </div>
        </div>
      </>
    );
  }

  // ACTIVE CART STATE
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
                <div key={item.id} className="bg-[#f8f7f5] p-4 md:p-6 rounded-md flex flex-col md:flex-row items-center gap-6 relative">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 bg-white rounded overflow-hidden flex items-center justify-center shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[90%] h-[90%] object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow flex flex-col justify-center w-full md:w-auto text-center md:text-left">
                    <h3 className="font-bold text-[17px] text-gray-900 mb-2">
                      {item.name}
                    </h3>

                    {/* Real description mapped as bullet point if available */}
                    {item.description && (
                      <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
                        <li className="line-clamp-2 leading-relaxed">{item.description}</li>
                      </ul>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-auto">
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-sm font-bold underline text-gray-800 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Right Side Controls (Quantity + Price) */}
                  <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end">
                    {/* Quantity Controller */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                          } else {
                            dispatch(removeFromCart(item.id));
                          }
                        }}
                        className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-200 transition-colors bg-transparent"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                      </button>

                      <span className="font-bold text-lg w-4 text-center text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-200 transition-colors bg-transparent"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                      </button>
                    </div>

                    {/* Line Price */}
                    <div className="font-semibold text-lg text-gray-900 w-20 text-right">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Remove All Button */}
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
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-6">
                  {totalItemCount} - ITEMS
                </h2>

                {/* Promo Code Box */}
                <div className="flex justify-between items-center bg-[#f8f7f5] p-3 rounded mb-6 text-sm">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <svg className="w-5 h-5 text-[#e4002b]" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" /></svg>
                    {appliedOffer ? `Offer Applied: ${appliedOffer.title}` : "Have another promo code?"}
                  </div>
                  {appliedOffer ? (
                    <button onClick={() => dispatch(removeOffer())} className="font-bold underline text-gray-600 hover:text-black">Remove</button>
                  ) : (
                    <Link to="/deals" className="font-bold underline text-gray-800 hover:text-black">Add</Link>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {appliedOffer && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">- ₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>GST</span>
                    <span className="font-semibold text-gray-900">₹{taxes.toFixed(2)}</span>
                  </div>

                  {/* NEW: Show carry bag fee in breakdown if checked */}
                  {addCarryBag && (
                    <div className="flex justify-between items-center">
                      <span>Carry Bag</span>
                      <span className="font-semibold text-gray-900">₹6.00</span>
                    </div>
                  )}
                </div>

                <hr className="border-gray-200 mb-6" />

                {/* UPDATED: Carry Bag Checkbox linked to state */}
                <label className="flex items-start gap-3 mb-8 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={addCarryBag}
                    onChange={(e) => setAddCarryBag(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#e4002b] rounded border-gray-300 focus:ring-[#e4002b]" 
                  />
                  <span className="text-sm text-gray-800 group-hover:text-black">
                    ₹6.00 Tick to add a large carry bag.
                  </span>
                </label>

                {/* Red Checkout Button with embedded total */}
                <button className="w-full bg-[#e4002b] text-white py-4 px-6 rounded-full font-bold flex justify-between items-center hover:bg-red-700 transition-colors shadow-md">
                  <span className="text-lg">Checkout</span>
                  <span className="text-lg">₹{total.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 animate-fade-in-up">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-2">
              Clear Cart?
            </h3>
            <p className="text-gray-600 mb-6 font-medium text-sm">
              Are you sure you want to remove all items from your cart? This cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 py-3 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  setShowClearModal(false);
                }}
                className="flex-1 py-3 rounded-full bg-[#e4002b] font-bold text-white hover:bg-red-700 transition-colors shadow-md"
              >
                Remove All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;