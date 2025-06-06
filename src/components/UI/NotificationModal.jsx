import React, { useState, useEffect, useRef } from 'react';

const NotificationModal = () => {
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

export default NotificationModal;