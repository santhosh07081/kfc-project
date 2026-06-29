import React, { useContext } from "react";
import { LocationContext } from "../../Context/LocationContext"; // Adjust path as needed

const OrderSelector = () => {
  const { activeTab, setActiveTab, orderDetails, setOrderDetails } =
    useContext(LocationContext);
  const tabs = ["DELIVERY", "PICK UP", "DINE IN"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // If order details already exist, sync the type with the newly selected tab
    if (orderDetails) {
      setOrderDetails({ ...orderDetails, type: tab });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full animate-fade-in">
      <div className="flex gap-[6px] mb-8">
        <div className="w-2 h-5 bg-[#e4002b]"></div>
        <div className="w-2 h-5 bg-[#e4002b]"></div>
        <div className="w-2 h-5 bg-[#e4002b]"></div>
      </div>

      <h2 className="text-sm md:text-[25px] h-6 font-bebas font-extrabold uppercase text-black mb-8 text-center tracking-wide">
        Select your order type to start
      </h2>

      <div className="bg-[#e6e6e6] rounded-full p-1.5 flex items-center justify-between w-full max-w-md h-12">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`cursor-pointer flex-1 flex justify-center items-center px-2 h-10 rounded-full md:text-lg font-bebas transition-colors duration-200 ${
              activeTab === tab
                ? "bg-[#e4002b] text-white shadow-sm"
                : "bg-transparent text-gray-800 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderSelector;
