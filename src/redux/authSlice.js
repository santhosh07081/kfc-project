// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // null means nobody is logged in
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Saves the user's name and phone
    },
    logout: (state) => {
      state.user = null; // Clears the user data on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;