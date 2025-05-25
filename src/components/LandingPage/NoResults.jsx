import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NoResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || "your search";

  const suggestions = ["Carlos Yulo Rice", "Carlos Yolo Rice"];

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
  };

  return (
    <>
<div className="py-12 flex flex-col justify-center items-center bg-[#F5F9F5] text-center pt-[230px] pb-[130px]">
        <img src="/frown.png" alt="frown" className="h-[300px] w-[300px]" />

        <h2 className="text-xl sm:text-2xl font-bold mt-4">
          No results for ‘<span className="font-semibold">{query}</span>’
        </h2>

        <div className="mt-4 text-xl text-black flex justify-center items-center flex-wrap gap-2">
          <span className="font-bold">Did you mean:</span>
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-1 border border-gray-400 rounded-full hover:bg-gray-100 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#D9D9D9] pt-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 gap-y-1 text-sm text-gray-700 mx-1 mb-2 text-center md:text-left mx-[100px]">
          <div className="flex flex-col items-center">
            <div className="flex flex-col">
              <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" />
              <p className="text-[15px] text-green-600 text-center">Ang Ugat sa Masaganang Bukas!</p>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">CUSTOMER SERVICE</p>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Payment Methods</li>
              <li>Return & Refund</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">ABOUT BINHI</p>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Binhi Seller Center</li>
            </ul>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">PAYMENT METHODS</p>
            <div className="grid grid-cols-2 gap-2">
              <img src="/cod.png" alt="COD" />
              <img src="/gcash.png" alt="GCash" />
              <img src="/paypal.png" alt="PayPal" />
              <img src="/maya.png" alt="Maya" />
            </div>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">FOLLOW US</p>
            <ul className="space-y-1">
              <li className="flex items-center space-x-1">
                <img src="/Facebook.png" alt="Facebook" />
                <span>BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="/Messenger.png" alt="Messenger" />
                <span>@BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="/WhatsApp.png" alt="WhatsApp" />
                <span>BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="/Instagram.png" alt="Instagram" />
                <span>BINHI Corp.</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px]">
        Binhi 2024, All Rights Reserved.
      </div>
    </>
  );
};

export default NoResults;
