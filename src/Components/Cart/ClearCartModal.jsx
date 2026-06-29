import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice"; // Adjust path

const ClearCartModal = ({ showClearModal, setShowClearModal }) => {
  const dispatch = useDispatch();

  if (!showClearModal) return null;

  return (
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
  );
};

export default ClearCartModal;