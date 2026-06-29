// src/Components/Header/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; 
import kfclogo from "../assets/nav/kfchome.svg";

const SignIn = () => {
  const [step, setStep] = useState(1); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState(""); 
  
  // 1. ADD AN ERROR STATE
  const [error, setError] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. UPDATE PHONE SUBMIT LOGIC
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    // Strip out any spaces or dashes the user might have accidentally typed
    const cleanedNumber = phoneNumber.replace(/\D/g, "");

    // Check if it is exactly 10 digits
    if (cleanedNumber.length === 10) {
      setError(""); // Clear any previous errors
      setStep(2);   // Move to Step 2
    } else {
      // Set the error message to show to the user
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name: userName, phone: phoneNumber }));
    navigate("/");
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-white px-4 py-12 font-sans mt-10 mb-10">
      <div className="w-200 flex flex-col items-center text-center">
        
        <p className="text-[13px] font-semibold text-gray-800 mb-6">
          Sign In / Sign up
        </p>

        <img
          src={kfclogo}
          alt="KFC"
          className="h-6 w-auto mb-10 object-contain"
        />

        <h1 className="text-[25px] leading-tight font-oswald font-bold uppercase tracking-tighter text-[#202124] mb-10">
          {step === 1
            ? "Let's sign in or create account with your phone number!"
            : "Welcome! Please enter your name to continue."}
        </h1>

        {/* STEP 1: PHONE NUMBER FORM */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="w-full">
            <div className="w-full mb-4 text-left">
              <input
                type="tel"
                value={phoneNumber}
                // Optional: You can restrict them from typing letters right in the input!
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} 
                placeholder="Phone Number*"
                className={`w-full pb-2 border-b text-gray-900 focus:outline-none transition-colors placeholder:text-gray-600 bg-transparent ${
                  error ? "border-red-500 focus:border-red-500" : "border-gray-400 focus:border-black"
                }`}
                required
              />
              {/* 3. SHOW THE ERROR MESSAGE IF IT EXISTS */}
              {error && (
                <p className="text-red-500 text-xs font-bold mt-2">{error}</p>
              )}
            </div>

            <p className="text-[11px] text-gray-800 text-left mb-10 font-medium mt-6">
              By "logging in to KFC", you agree to our{" "}
              <a
                href="https://privacy.kfc.co.in/policies"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-black"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://online.kfc.co.in/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-black"
              >
                Terms & Conditions
              </a>
              .
            </p>

            <button
              type="submit"
              className="w-50 bg-[#202124] text-white py-3.5 rounded-full font-bold text-sm hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Send Me a Code
            </button>
          </form>
        )}

        {/* STEP 2: NAME FORM */}
        {step === 2 && (
          <form onSubmit={handleNameSubmit} className="w-full flex flex-col items-center">
            <div className="w-full mb-10 text-left">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Full Name*"
                className="w-full pb-2 border-b border-gray-400 text-gray-900 focus:outline-none focus:border-black transition-colors placeholder:text-gray-600 bg-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-50 bg-[#e4002b] text-white py-3.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
            >
              Complete Sign In
            </button>
          </form>
        )}

        {/* Divider with "or" */}
        <div className="w-full flex items-center justify-center gap-4 my-8">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-500 text-sm font-medium">or</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Skip as Guest Button */}
        <Link
          to="/menu"
          className="w-full border border-[#202124] text-[#202124] py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Skip, Continue As Guest
        </Link>
      </div>
    </div>
  );
};

export default SignIn;