import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../redux/cartSlice"; // Adjust path

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#f8f7f5] p-4 md:p-6 rounded-md flex flex-col md:flex-row items-center gap-6 relative">
      <div className="w-32 h-32 flex-shrink-0 bg-white rounded overflow-hidden flex items-center justify-center shadow-sm">
        <img
          src={item.image}
          alt={item.name}
          className="w-[90%] h-[90%] object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex-grow flex flex-col justify-center w-full md:w-auto text-center md:text-left">
        <h3 className="font-bold text-[17px] text-gray-900 mb-2">
          {item.name}
        </h3>
        {item.description && (
          <ul className="text-sm text-gray-600 mb-4 space-y-1 list-disc list-inside">
            <li className="line-clamp-2 leading-relaxed">
              {item.description}
            </li>
          </ul>
        )}
        <div className="flex items-center justify-center md:justify-start gap-4 mt-auto">
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-sm font-bold underline text-gray-800 hover:text-black"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (item.quantity > 1) {
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                );
              } else {
                dispatch(removeFromCart(item.id));
              }
            }}
            className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-200 transition-colors bg-transparent"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <span className="font-bold text-lg w-4 text-center text-gray-900">
            {item.quantity}
          </span>

          <button
            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            className="w-8 h-8 rounded-full border border-black flex items-center justify-center hover:bg-gray-200 transition-colors bg-transparent"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="font-semibold text-lg text-gray-900 w-20 text-right">
          ₹{(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;