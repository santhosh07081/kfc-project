// src/Components/Header/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";  //navigate to different pages without reloading

import kfcLogo from "../../../assets/nav/kfchome.svg";
import bucket from "../../../assets/nav/bucket.svg";
import account from "../../../assets/nav/AccountIcon.webp";
// Add to your existing Redux imports at the top
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch(); // Initialize the Redux dispatch function
  const user = useSelector((state) => state.auth.user); // Get the logged-in user from Redux state (user:santa)

  // Added logic to calculate total items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      
      {/* ── TOP BAR 2: Main Navbar ── */}
      <nav className="bg-white border-b border-gray-200  z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:h-22.5 flex items-center justify-between">
          {/* LEFT — Hamburger (mobile) + Logo + Nav links */}

          <div className="relative flex items-center justify-center md:justify-start gap-5 w-full">
            {/* Mobile hamburger  button*/}
            <button
              className="absolute left-0 md:hidden flex flex-col justify-center gap-1 w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >                                                
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} //become\
              />
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`} //become/
              />
            </button>  {/*3 bars that transform into an X when opened*/}

            {/* KFC Logo — links to home */}
            <Link to="/" className="flex-shrink-0 ">
              <img src={kfcLogo} alt="KFC" className="h-5 w-auto " />
            </Link>

            {/* Desktop nav links */}

            <div className="hidden md:flex items-center gap-7">
              <Link
                to="/menu"
                className="text-gray-900 font-semibold text-[15px] hover:text-red-600 transition-colors duration-150 tracking-wide"
              >
                Menu
              </Link>
              <Link
                to="/deals"
                className="text-gray-900 font-semibold text-[15px] hover:text-red-600 transition-colors duration-150 tracking-wide"
              >
                Deals
              </Link>
            </div>
          </div>

         {/* RIGHT — Sign In + Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* CONDITIONAL SIGN IN / LOGGED IN USER */}
            {user ? (
              // LOGGED IN STATE
            <div className="hidden md:flex items-center gap-2 group relative cursor-pointer py-2">
                <img src={account} alt="Profile image" className="h-5 w-7" />
                <span className="text-gray-900 font-bold text-[14px] whitespace-nowrap">
                  Hi, {user.name.split(' ')[0]}
                </span>                {/* santhosh kumar,split as santhosh ,kumar and only 0 index */}
                
                {/* THE FIX: We use 'pt-2' (padding) on the outer wrapper to create an invisible hover bridge, 
                  and put the white background on the inner div! 
                */}
                <div className="absolute top-full left-0 pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-[100]">
                   <div className="bg-white shadow-lg border border-gray-100 rounded p-1 min-w-[100px]">
                     <button 
                       onClick={() => dispatch(logout())} 
                       className="text-sm font-bold text-[#e4002b] hover:text-black whitespace-nowrap px-4 py-2 w-full text-left rounded hover:bg-gray-50 transition-colors"
                     >
                       Log Out
                     </button>   {/* onclick dispatch logout,and sign in button appears */}
                   </div>
                </div>
              </div>
            ): (
              // LOGGED OUT STATE (Your exact original code)
              <>
                {/* Sign In button with user icon */}
                <Link
                  to="/signin"
                  className="hidden md:flex items-center gap-2 text-gray-800 font-semibold text-[14px] hover:text-red-600 transition-colors duration-150 whitespace-nowrap"
                >
                  <img src={account} alt="Profile image" className="h-5 w-7" />
                </Link>

                {/* Sign In button text */}
                <Link
                  to="/signin"
                  className="hidden md:flex items-center gap-2 text-gray-800 font-semibold text-[14px] hover:text-red-600 transition-colors duration-150 whitespace-nowrap"
                >
                  Sign In
                </Link>
              </>
            )}
            {/* ── VERTICAL LINE ── */}
            <div className="hidden md:block h-6 w-[1px] bg-gray-300 mx-2"></div>

            {/* Cart icon with dynamic badge */}
            <Link to="/cart">
              <div className="relative inline-flex items-center justify-center">
                <img src={bucket} alt="KFC" className="h-15 w-auto" />
                
                {/* Number overlay - shows only if items exist */}
                {totalItemCount > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center font-bold text-gray-900 text-base pt-1">
                    {totalItemCount}
                  </span> // Display the total item count in the cart
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/deals"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
            >
              Deals
            </Link>
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
            >
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;