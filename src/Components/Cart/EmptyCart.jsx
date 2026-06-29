import React from "react";
import { Link } from "react-router-dom";
import FixedLocationBar from "../../Components/Layout/Header/FixedLocationBar"; // Adjust path
import bucketImage from "../../assets/banner/cartempty.png"; // Adjust path

const EmptyCart = () => {
  return (
    <>
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
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
          <h1 className="text-3xl md:text-5xl font-black text-[#202124] uppercase tracking-tighter leading-[1.05] mb-10">
            Your cart is
            <br />
            empty. Let's
            <br />
            start an
            <br />
            order!
          </h1>
          <Link
            to="/menu"
            className="bg-[#e4002b] text-white px-10 py-3.5 rounded-full font-semibold text-[16px] hover:bg-red-700 transition-colors"
          >
            Start Order
          </Link>
        </div>
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
};

export default EmptyCart;