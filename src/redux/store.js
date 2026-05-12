import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; // Import the new auth reducer

// 1. Function to LOAD state from localStorage
const loadState = () => {
  try {
    // Changed key to "kfc_app_state" since it now holds both cart and auth
    const serializedState = localStorage.getItem("kfc_app_state");
    if (serializedState === null) {
      return undefined; // If no saved cart/auth, let Redux use its initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from local storage", err);
    return undefined;
  }
};

// 2. Function to SAVE state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("kfc_app_state", serializedState);
  } catch (err) {
    console.error("Could not save state to local storage", err);
  }
};

// 3. Configure the store and pass in the loaded state
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer, // Add the auth reducer here
  },
  preloadedState: loadState(), // Automatically hydrates the store on page load
});

// 4. Subscribe to store changes so it saves every time the cart updates
store.subscribe(() => {
  saveState({
    cart: store.getState().cart, // We save the 'cart' slice to local storage
    auth: store.getState().auth, // We also save the 'auth' slice to local storage
  });
});