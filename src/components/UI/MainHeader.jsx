import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Notification Dropdown Component
const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Your Jasmin Rice",
      message: "is on the way!",
      time: "Just Now",
      avatar: "/jasmin-rice.jpg",
      isNew: true
    },
    {
      id: 2,
      title: "Your Jasmin Rice",
      message: "is on the way!",
      time: "Just Now",
      avatar: "/jasmin-rice.jpg",
      isNew: true
    },
    {
      id: 3,
      title: "Your Jasmin Rice",
      message: "is on the way!",
      time: "Just Now",
      avatar: "/jasmin-rice.jpg",
      isNew: true
    },
    {
      id: 4,
      title: "Your Jasmin Rice",
      message: "is on the way!",
      time: "Just Now",
      avatar: "/jasmin-rice.jpg",
      isNew: true
    },
    {
      id: 5,
      title: "Your Jasmin Rice",
      message: "is on the way!",
      time: "Just Now",
      avatar: "/jasmin-rice.jpg",
      isNew: true
    }
  ]);

  const dropdownRef = useRef(null);
  const newCount = notifications.filter(notif => notif.isNew).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleExpand = () => {
    console.log('Expand notifications');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative group inline-block"
      >
        <img 
          src="/bell.png" 
          alt="Notifications" 
          className="w-8 h-8 cursor-pointer hover:scale-110" 
        />
        
        {newCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {newCount > 9 ? '9+' : newCount}
          </span>
        )}
        
        <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Notifications
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800">Recent Notifications</h3>
              <span className="text-sm text-gray-500">{newCount} New</span>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <img
                    src={notification.avatar}
                    alt="Product"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-product.png";
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                </div>
                
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  {notification.isNew && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-gray-200">
            <button
              onClick={handleExpand}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="text-sm font-medium">Expand</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MainHeader = ({ profileImage = "/account.png", onSearch }) => {
  const [selectedLang, setSelectedLang] = useState("Tagalog");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    setIsDropdownOpen(false);
    navigate('/login');
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

          {/* Search Bar */}
        <div className="flex items-center flex-1 justify-center px-4">
          <div className="flex items-center relative group inline-block border-2 border-black rounded-full px-3 py-1 w-full max-w-md h-10">
            <img src="/search.png" alt="Search" className="w-7 h-7 mx-1" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Search
            </div>
            <input
              type="text"
              placeholder="Click here to products or farmer"
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
        
        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link to ="/"  className="relative group inline-block">
            <img src="/house.png" alt="Home" className="w-8 h-8 cursor-pointer hover:scale-110"/>
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Home
            </div>
          </Link>

          <Link to="/CartPage"  className="relative group inline-block">
            <img src="/cart.png" alt="Cart" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Cart
            </div>
          </Link>

          <Link to="/OrderHistory"  className="relative group inline-block">
            <img src="/history.png" alt="Order History" className="w-8 h-8 cursor-pointer hover:scale-110" />
            <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 bg-[#4CAF50] text-white text-lg font-bold px-4 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Order History
            </div>
          </Link>

          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img src={profileImage} alt="Account" className="w-12 h-12 rounded-full object-cover" />
              <span className="text-lg font-bold">My Account</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <Link
                    to="/UserProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
