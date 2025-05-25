import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Dashboard from "../assets/Dashboard.png";
import Products from "../assets/Products.png";
import Orders from "../assets/Orders.png";
import Settings from "../assets/Settings.png";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow fixed flex flex-col justify-between rounded-r-3xl border border-gray-200">
      <div>
        {/* Logo */}
        <div className="flex justify-center py-6">
          <img src={Logo} alt="Binhi Logo" className="h-12" />
        </div>

        {/* Section Label */}
        <div className="px-6 text-xs text-gray-500 font-medium tracking-wide mb-4">
          Marketplace
        </div>

        {/* Menu Items */}
        <ul className="space-y-1 px-2 text-sm font-medium text-gray-700">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <img src={Dashboard} alt="Dashboard" className="w-5 h-5" />
                Dashboard
              </div>
              <span className="text-gray-400">▾</span>
            </Link>
          </li>
          <li>
            <Link
              to="/seller-center"
              className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <img src={Products} alt="Products" className="w-5 h-5" />
                Products
              </div>
              <span className="text-gray-400">▾</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <img src={Orders} alt="Orders" className="w-5 h-5" />
                Orders
              </div>
              <span className="text-gray-400">▾</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Settings and User */}
      <div className="px-4 pb-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <img src={Settings} alt="Settings" className="w-4 h-4" />
          Settings
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50">
          <img
            src="https://i.pravatar.cc/40"
            alt="Layla"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">Layla Imnida</div>
            <div className="text-xs text-gray-500">laylaimnida@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
