import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of product objects
  appliedOffer: null, // Stores the applied deal (e.g., { code: "ZINGER20", discountPercent: 20 })
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Add new item with a default quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    applyOffer: (state, action) => {
      state.appliedOffer = action.payload;
    },
    removeOffer: (state) => {
      state.appliedOffer = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedOffer = null; // optional: removes any applied offer too
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, applyOffer, removeOffer, clearCart } = cartSlice.actions;
export default cartSlice.reducer;