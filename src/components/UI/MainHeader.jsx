import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../../utils/auth';

const MainHeader = ({ profileImage = "/account.png", notProfileImage = "/default-avatar.png", onSearch }) => {
  const [selectedLang, setSelectedLang] = useState("Tagalog");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
const location = useLocation();
const hideSearchBarOnPaths = ["/cart-page", "/checkoutpage", "/user-profile"]; // add more as needed


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const username = localStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(username || "User");
    }
  }, []);

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
          <Link to="/about-us" className="text-base font-bold hover:underline">About Us</Link>
          <Link to="/seller-center" className="text-base font-bold hover:underline">Seller Center</Link>
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
          <a href="#" className="text-base hover:underline font-bold">Need Help?</a>
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

        
        {/* Search Bar - hidden on listed pages */}
        {!hideSearchBarOnPaths.includes(location.pathname) && (
          <div className="flex items-center flex-1 justify-center px-4">
            <div className="flex items-center relative group inline-block border-2 border-black rounded-full px-3 py-1 w-full max-w-md h-10">
              <img src="/search.png" alt="Search" className="w-7 h-7 mx-1" />
              <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Search
              </div>
              <input
                type="text"
                placeholder="Click here to search products or association"
                className="flex-grow outline-none font-bold text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearchClick}>
                <img src="/mic.png" alt="Mic" className="w-7 h-7 mx-2 hover:scale-110" />
              </button>
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link to="/" className="relative group inline-block">
            <img src="/house.png" alt="Home" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Home
            </div>
          </Link>

          <Link to="/CartPage" className="relative group inline-block">
            <img src="/cart.png" alt="Cart" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cart
            </div>
          </Link>

           <Link to="/OrderHistory" className="relative group inline-block">
            <img src="/history.png" alt="Order History" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Order History
            </div>
          </Link>

          <Link to="#" className="relative group inline-block">
            <img src="/bell.png" alt="Notifications" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Notifications
            </div>
          </Link>

          {/* Profile Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <img src={profileImage} alt="Account" className="w-12 h-12 rounded-full object-cover" />
              <Link to="/user-profile">
                <span className="text-lg font-bold">{userName}</span>
              </Link>
              <button onClick={logout} className="btn btn-error btn-sm ml-2">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <span className="text-lg font-bold">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
