import React, { useState, useRef, useEffect } from "react";

// Notification demo data
const initialNotifications = [
  {
    id: 1,
    name: "Jin Cristopher",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 2,
    name: "Nisi Viloria",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 3,
    name: "Emmanuel Sol",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 4,
    name: "Kaye Arroyo",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 5,
    name: "Nisi Viloria",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 6,
    name: "Kaye Arroyo",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 7,
    name: "Emmanuel Sol",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 8,
    name: "Arwin Lee Segundo",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
  {
    id: 9,
    name: "Ma. Bernadette Fortunado",
    avatar: "/Screenshot_195.png",
    message: "placed an order! Click here to check it!",
    time: "1h ago",
  },
];

const NotifModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showMenu, setShowMenu] = useState(false);
  const [newCount, setNewCount] = useState(4);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) setShowMenu(false);
  }, [isOpen]);

  useEffect(() => {
    if (!showMenu) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  const handleMarkAllAsRead = () => {
    setNewCount(0);
    setShowMenu(false);
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    setShowMenu(false);
    setNewCount(0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-[998] pointer-events-auto"
        onClick={onClose}
        style={{ background: "transparent" }}
      ></div>
      {/* Modal Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[400px] bg-white
          border border-gray-300
          rounded-tl-3xl rounded-bl-3xl
          flex flex-col z-[999]
          animate-slide-in
        `}
        style={{ minWidth: 340, maxWidth: 420 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-1 relative">
          <div>
            <div className="text-[29px] font-bold text-gray-900">Notifications</div>
            <div className="flex items-center text-[16px] mt-1 gap-2">
              <span className="w-2 h-2 rounded-full bg-green-600 inline-block"></span>
              <span className="font-medium text-gray-700">
                {newCount > 0 ? `${newCount} New` : "No New"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {/* 3 dots */}
            <div className="relative" ref={menuRef}>
              <button
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => setShowMenu((v) => !v)}
              >
                <svg width="23" height="23" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="4" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                  <circle cx="10" cy="16" r="1.5" />
                </svg>
              </button>
              {showMenu && (
                <div
                  className="absolute top-8 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-44 flex flex-col"
                  style={{ minWidth: 160 }}
                >
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-left px-4 py-2 hover:bg-gray-50 font-medium text-gray-700 rounded-t-xl"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={handleDeleteAll}
                    className="text-left px-4 py-2 hover:bg-gray-50 font-medium text-red-600 rounded-b-xl"
                  >
                    Delete all
                  </button>
                </div>
              )}
            </div>
            {/* X Close */}
            <button className="p-1 text-gray-400 hover:text-gray-600" onClick={onClose}>
              <svg width="27" height="27" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Notification list - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto pt-1 pb-4 px-3 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xl font-medium py-10">
              No notifications.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="flex gap-3 items-start bg-white rounded-xl border border-gray-200 px-4 py-3 mb-3"
              >
                <img
                  src={notif.avatar}
                  alt={notif.name}
                  className="rounded-full w-12 h-12 object-cover border-2 border-green-100"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-gray-900">{notif.name}</span>{" "}
                  <span className="text-gray-700">{notif.message}</span>
                  <div className="flex items-center mt-1 text-sm text-gray-400 gap-2">
                    <span>{notif.time}</span>
                    <span className="inline-flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <rect x="4" y="4" width="16" height="16" rx="8" stroke="currentColor" fill="#E7FAE7"/>
                        <path
                          d="M9.5 12.5l2 2 3-3"
                          stroke="#16A34A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Slide in keyframes */}
      <style>
        {`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.22s cubic-bezier(.27,.46,.49,1) both; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 6px;
        }
        `}
      </style>
    </>
  );
};

export default NotifModal;
