import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeOffer } from "../../redux/cartSlice"; // Adjust path

const OrderSummary = ({ 
  totalItemCount, 
  appliedOffer, 
  subtotal, 
  discountAmount, 
  taxes, 
  addCarryBag, 
  setAddCarryBag, 
  total 
}) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full lg:w-[380px] flex-shrink-0">
      <div className="bg-white p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-24">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 mb-6">
          {totalItemCount} - ITEMS
        </h2>

        <div className="flex justify-between items-center bg-[#f8f7f5] p-3 rounded mb-6 text-sm">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <svg className="w-5 h-5 text-[#e4002b]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
            </svg>
            {appliedOffer ? `Offer Applied: ${appliedOffer.title}` : "Have another promo code?"}
          </div>
          {appliedOffer ? (
            <button
              onClick={() => dispatch(removeOffer())}
              className="font-bold underline text-gray-600 hover:text-black"
            >
              Remove
            </button>
          ) : (
            <Link to="/deals" className="font-bold underline text-gray-800 hover:text-black">
              Add
            </Link>
          )}
        </div>

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

          {addCarryBag && (
            <div className="flex justify-between items-center">
              <span>Carry Bag</span>
              <span className="font-semibold text-gray-900">₹6.00</span>
            </div>
          )}
        </div>

        <hr className="border-gray-200 mb-6" />

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

        <button className="w-full bg-[#e4002b] text-white py-4 px-6 rounded-full font-bold flex justify-between items-center hover:bg-red-700 transition-colors shadow-md">
          <span className="text-lg">Checkout</span>
          <span className="text-lg">₹{total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;