import React from 'react';
import OrderSelector from './OrderSelector';
import FixedLocationBar from './FixedLocationBar';

const OrderType = () => {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in">
      <FixedLocationBar />
      <OrderSelector />
    </div>
  );
};

export default OrderType;