import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../../redux/cartSlice"; // Adjust path if needed

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-white rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden bg-gray-50 h-64 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-[80%] h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />

        {/* Conditional Render for button or counter based on cart state */}
        {quantityInCart === 0 ? (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded shadow-md flex items-center justify-center text-2xl font-bold transition-colors"
          >
            +
          </button>
        ) : (
          <div className="absolute w-32 h-12 bottom-4 right-4 bg-white  flex justify-center items-center gap-0 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
            {/* Minus Button */}
            <button
              onClick={() => {
                if (quantityInCart > 1) {
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: quantityInCart - 1,
                    })
                  );
                } else {
                  dispatch(removeFromCart(item.id));
                }
              }}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-lg rounded-xl transition-colors"
            >
              -
            </button>
            {/* Quantity Display */}
            <span className="px-4 font-bold text-black text-base w-10 text-center">
              {quantityInCart}
            </span>
            {/* Plus Button */}
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-lg rounded-xl transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 leading-tight line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-[15px]">₹{item.price}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <div
            className={`w-3 h-3 rounded-sm flex items-center justify-center border ${
              item.isVeg ? "border-green-600" : "border-red-600"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            ></div>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {item.isVeg ? "Veg" : "Non Veg"}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mt-auto">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default MenuItemCard;