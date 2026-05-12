import React, { useState, useContext, useEffect } from 'react';
import { LocationContext } from '../Content/LocationContext'; 

const LocationModal = () => {
  const { 
    userLocation, setUserLocation, 
    isModalOpen, setIsModalOpen,
    orderDetails, setOrderDetails,
    activeTab, setActiveTab,
    setIsOrderStarted // Added this from Context
  } = useContext(LocationContext);
  
  const [activeView, setActiveView] = useState('main');
  const [orderType, setOrderType] = useState(activeTab || 'DINE IN');
  const [localRestaurant, setLocalRestaurant] = useState(userLocation || ''); 
  const [orderDate, setOrderDate] = useState('today');
  const [orderTime, setOrderTime] = useState('ASAP');
  const [searchInput, setSearchInput] = useState('');

  const generateDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formatOpts = { weekday: 'short', month: 'short', day: 'numeric' };
    return [
      { id: 'today', label: `Today (${today.toLocaleDateString('en-US', formatOpts)})`, short: 'Today' },
      { id: 'tomorrow', label: `Tomorrow (${tomorrow.toLocaleDateString('en-US', formatOpts)})`, short: 'Tomorrow' }
    ];
  };
  
  const availableDates = generateDates();

  const generateTimeSlots = () => {
    const slots = ['ASAP'];
    for (let i = 11; i <= 22; i++) {
      const ampm = i >= 12 ? 'PM' : 'AM';
      const hour = i > 12 ? i - 12 : i;
      slots.push(`${hour}:00 ${ampm}`);
      slots.push(`${hour}:30 ${ampm}`);
    }
    return slots;
  };
  const availableTimes = generateTimeSlots();

  useEffect(() => {
    if (isModalOpen) {
      setLocalRestaurant(userLocation || ''); 
      setOrderType(activeTab || 'DINE IN'); 
      setActiveView('main');
    }
  }, [isModalOpen, userLocation, activeTab]);

  const cities = [
    "Chennai, Tamil Nadu", "Mumbai, Maharashtra", "Bangalore, Karnataka",
    "Delhi, NCR", "Hyderabad, Telangana", "Pune, Maharashtra"
  ];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleConfirmFinalOrder = () => {
    if (!localRestaurant) {
      alert("Please select a city first!");
      return;
    }

    setUserLocation(localRestaurant);
    
    const selectedDateObj = availableDates.find(d => d.id === orderDate);
    const displayDate = selectedDateObj ? selectedDateObj.short : orderDate;
    const normalizedType = orderType.toUpperCase();

    setOrderDetails({
      type: normalizedType,
      location: localRestaurant,
      date: displayDate,
      time: orderTime
    });

    setActiveTab(normalizedType);
    
    // NEW: Mark order as started so the banner stays hidden
    setIsOrderStarted(true); 
    
    setIsModalOpen(false);
  };

  const handleSelectLocation = (city) => {
    setLocalRestaurant(city);
    setActiveView('main');
    setSearchInput('');
  };

  const handleSelectOrderType = (type) => {
    setOrderType(type);
    setActiveView('main');
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center animate-fadeIn">
      <div className="bg-[#faf9f6] rounded-lg w-[90%] max-w-2xl shadow-2xl relative min-h-[400px] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white rounded-t-lg">
          {activeView !== 'main' ? (
            <button onClick={() => setActiveView('main')} className="text-gray-500 hover:text-black font-bold text-xl px-2">
              &#8249;
            </button>
          ) : (
            <div className="w-8"></div>
          )}
          <h2 className="text-xl font-black uppercase text-black tracking-wide m-0">
            {activeView === 'main' ? 'Schedule Order' : activeView === 'type' ? 'Select Order Type' : 'Select Your Location'}
          </h2>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black font-bold text-xl px-2">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 bg-[#faf9f6]">
          
          {/* VIEW 1: MAIN */}
          {activeView === 'main' && (
            <div className="space-y-8 max-w-lg mx-auto">
              <div>
                <h3 className="text-sm font-bold uppercase mb-2">Order Type</h3>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span className="text-gray-800">{orderType}</span>
                  <button onClick={() => setActiveView('type')} className="text-sm font-semibold underline cursor-pointer hover:text-red-600">
                    Edit
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase mb-2">Your KFC Restaurant</h3>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span className={`text-gray-800 ${!localRestaurant ? 'italic text-gray-500' : ''}`}>
                    {localRestaurant || "Select your city"}
                  </span>
                  <button onClick={() => setActiveView('location')} className="text-sm font-semibold underline cursor-pointer hover:text-red-600">
                    Edit
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase mb-2">Schedule For Your Order</h3>
                <div className="flex gap-4">
                  <div className="flex-1 border-b border-gray-300 pb-2">
                    <label className="text-xs text-gray-500 block mb-1">Date</label>
                    <select 
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      className="w-full bg-transparent focus:outline-none cursor-pointer text-gray-800 font-medium"
                    >
                      {availableDates.map(date => (
                        <option key={date.id} value={date.id}>{date.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 border-b border-gray-300 pb-2">
                    <label className="text-xs text-gray-500 block mb-1">Time</label>
                    <select 
                      value={orderTime}
                      onChange={(e) => setOrderTime(e.target.value)}
                      className="w-full bg-transparent focus:outline-none cursor-pointer text-gray-800 font-medium"
                    >
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleConfirmFinalOrder}
                  className="bg-black text-white font-bold py-3 px-12 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: TYPE */}
          {activeView === 'type' && (
            <div className="flex flex-col gap-4 max-w-sm mx-auto mt-4">
              {['DINE IN', 'PICK UP', 'DELIVERY'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelectOrderType(type)}
                  className={`py-3 px-6 rounded-md border-2 font-bold cursor-pointer transition-all ${
                    orderType.toUpperCase() === type 
                      ? 'border-[#e4002b] bg-red-50 text-[#e4002b]' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {/* VIEW 3: LOCATION */}
          {activeView === 'location' && (
            <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <p className="text-center text-gray-500 text-sm mb-6">
                Find the nearest KFC by entering your city or area.
              </p>
              <input 
                type="text"
                placeholder="e.g. Chennai"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full border border-red-500 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-red-200"
              />
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <div 
                      key={city}
                      onClick={() => handleSelectLocation(city)}
                      className="p-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                    >
                      {city}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-400">No cities found</div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LocationModal;