import React, { useState } from 'react';

const MainHeader = () => {
  const [selectedLang, setSelectedLang] = useState("Tagalog");

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  const flagSrc = selectedLang === "Tagalog" ? "/Flags.png" : "/us_flag.png";

  return (
    <header className="w-full bg-white shadow font-inter">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-2 text-sm bg-gray-100 text-gray-700">
        <div className="flex gap-4">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Seller Center</a>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={flagSrc} alt="Flag" className="w-5 h-4" />
            <select
              value={selectedLang}
              onChange={handleLanguageChange}
              className="text-sm text-gray-700 border rounded px-1 py-0.5"
            >
              <option value="Tagalog">Tagalog</option>
              <option value="English">English</option>
            </select>
          </div>
          <a href="#" className="hover:underline">Need Help?</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src="/Primary Logo w_ BG.png"
            alt="Binhi Logo"
            className="h-10 w-auto"
          />
        </div>

        {/* Center: Search */}
        <div className="flex items-center flex-1 justify-center px-4">
          <div className="flex items-center border border-black rounded-full px-3 py-1 w-full max-w-md">
            <img src="/search.png" alt="Search" className="w-4 h-4 mx-2" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow outline-none px-2 text-sm"
            />
            <button>
              <img src="/mic.png" alt="Mic" className="w-4 h-4 mx-2" />
            </button>
            <button>
              <img src="/camera.png" alt="Camera" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <img src="/cart.png" alt="Cart" className="w-5 h-5 cursor-pointer" />
          <img src="/bell.png" alt="Notifications" className="w-5 h-5 cursor-pointer" />
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/account.png" alt="Account" className="w-5 h-5" />
            <span className="text-sm">My Account</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
