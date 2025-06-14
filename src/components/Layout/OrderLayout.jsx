// src/components/Layout/OrderLayout.jsx
import React from "react";
import OrderHeader from "../UI/OrderHeader";

const OrderLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="relative z-30">
        <OrderHeader/>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center z-20"></div>

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default OrderLayout;


