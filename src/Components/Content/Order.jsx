import React from 'react'
import { Link } from "react-router-dom";


const Order = ({onStart}) => {
  return (
    <div>
      <div className="bg-[#1a1a1a] w-full py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 ">
        <p className="text-white  font-bebas font-semibold text-xl    uppercase">
          Let&apos;s Order for Delivery, Pick Up, or Dine-In
        </p>
        <button
          
          className="bg-[#e4002b] hover:bg-red-800 h-10 w-40 flex items-center justify-center active:scale-95 text-white  font-oswald text-sm px-5 sm:px-7 py-2 rounded-full transition-all duration-150 whitespace-nowrap shadow-md"
          onClick={onStart}
        >
          Start Order
        </button>
      </div>
    </div>
  )
}

export default Order
