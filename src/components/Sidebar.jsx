import React from "react";
import Logo from '../assets/Logo.png';
import Dashboard from '../assets/Dashboard.png';
import Products from '../assets/Products.png';
import Orders from '../assets/Orders.png';
import Settings from '../assets/Settings.png';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg fixed flex flex-col items-center p-4 rounded-r-3xl border border-gray-700">
      {/* Logo ONLY */}
      <img src={Logo} alt="Logo" className="w-150 h-50 mb-4" />
      
      {/* Menu */}
      <ul className="space-y-2 w-full">
        {/* Dashboard Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
                <img src={Dashboard} alt="Dashboard" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Dashboard</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
          </details>
        </li>
        {/* Products Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
                <img src={Products} alt="Products" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Products</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
          </details>
        </li>
        {/* Orders Menu */}
        <li>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <span className="flex items-center space-x-2">
                <img src={Orders} alt="Orders" className="w-5 h-5" />
                <span className="text-sm font-Inter font-bold">Orders</span>
              </span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
          </details>
        </li>
      </ul>

      {/* Grow to push the following content to the bottom */}
      <div className="flex-grow"></div>

      {/* Settings and profile card at the bottom */}
      <div className="w-full text-left px-3 py-2 flex items-center gap-2">
        <img src={Settings} alt="Settings" className="w-5 h-5" />
        <span className="text-sm font-Inter">Settings</span>
      </div>
      <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full w-5 h-5"
          alt="user"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Layla Imnida</span>
          <span className="text-xs text-gray-500 leading-tight">laylaimnida@gmail.com</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
