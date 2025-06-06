import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import CheckoutSuccessSummary from './CheckOutSuccessSummary';

/*Check-out Success with Delivery Fee and Weight Display*/

export default function CheckOutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { product } = state || {};

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-center mt-10 text-lg text-gray-600">No order data available.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isMultiple = Array.isArray(product.items);
  const displayTotal = isMultiple ? product.total : product.total || (product.quantity * product.price);
  
  // Calculate total weight




  return (
    <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center border justify-center px-6 text-center">
      <img 
        src="/Done.png" 
        alt="Success" 
        className="w-18 h-18 mb-2"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <h1 className="text-3xl font-bold text-gray-800">Order Successful!</h1>
      <p className="text-lg text-black mb-4">Thank you for purchasing!</p>

      

        <CheckoutSuccessSummary
          product={product}
          isMultiple={isMultiple}
          displayTotal={product.total}
        />


      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-12 py-3 rounded-full border-2 border-[#4CAE4F] text-[#4CAE4F] hover:bg-[#E6F4EA] transition-colors font-medium mb-2"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/orderhistory')}
          className="px-12 py-3 rounded-full bg-[#4CAE4F] text-white hover:bg-green-700 transition-colors font-medium mb-2"
        >
          Check my Orders
        </button>
      </div>
    </div>
  );
}