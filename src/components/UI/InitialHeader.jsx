import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const MainHeader = ({ profileImage = "/account.png", onSearch }) => {
  const [selectedLang, setSelectedLang] = useState("Tagalog");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  const flagSrc = selectedLang === "Tagalog" ? "/Flags.png" : "/us_flag.png";


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };


  return (
    <header className="w-full bg-white shadow font-inter">
      {/* Top Header */}
      <div className="flex items-center justify-between px-8 py-4 text-sm bg-gray-100 text-gray-700">
        <div className="flex gap-4">
          <Link to="/about-us">
          <a href="#" className="text-base font-semibold hover:underline">About Us</a></Link>
         <Link to="/seller-center" className="text-base font-semibold hover:underline">Seller Center</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={flagSrc} alt="Flag" className="w-5 h-4" />
            <select
              value={selectedLang}
              onChange={handleLanguageChange}
              className="text-base text-gray-700 font-semibold border border-gray-300 rounded px-1 py-0.5"
            >
              <option value="Tagalog">Tagalog</option>
              <option value="English">English</option>
            </select>
          </div>
          <a href="#" className="text-base hover:underline font-semibold">Need Help?</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center hover:scale-110">
            <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" className="h-10 w-auto" />
          </div>
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to ="/">
          <img src="/house.png" alt="Home" className="w-7 h-7 cursor-pointer hover:scale-110"/></Link>
           <Link to="/CartPage">
          <img src="/cart.png" alt="Cart" className="w-7 h-7 cursor-pointer hover:scale-110" /></Link>
          <img src="/bell.png" alt="Notifications" className="w-7 h-7 cursor-pointer hover:scale-110" />
          <div className="flex items-center gap-2 cursor-pointer">
          <img src={profileImage} alt="Account" className="w-12 h-12 rounded-full object-cover" />

            <Link to="/UserProfile">
              <span className="text-base font-bold">My Account</span>
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
