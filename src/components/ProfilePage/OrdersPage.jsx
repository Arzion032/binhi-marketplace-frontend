import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Expand } from 'lucide-react';

const OrderPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
      status: "Completed"
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 1,
      price: 53.0,
      status: "To Ship"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] px-6 py-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className="text-gray-600 hover:text-black"
          onClick={() => navigate("/")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>
        <h1 className="text-3xl font-bold">Order History</h1>
        
      </div>
      <div className="w-full h-[2px] bg-gray-300 mb-4" />

      {/* Order Section */}
      <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6 w-full">
        <div className="flex flex-wrap justify-center items-start border-b pb-4 gap-10">
          <div className="flex flex-wrap gap-[150px]">
            {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`text-lg px-4 py-1 rounded-full transition-all duration-200 ${
                  selectedTab === tab
                    ? "bg-[#4CAE4F] text-white font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="mt-6 space-y-6">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="flex flex-col border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.sellerProfile || "/default-profile.png"}
                      alt="Seller"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium text-gray-700">{order.sellerName || "Seller Name"}</p>
                    <button className="text-gray-500 text-sm font-medium px-3 py-2 rounded-full">
                      Click here to chat
                    </button>
                    <button className="flex items-center gap-2 bg-[#4CAE4F] hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded-full">
                      <img src="/shopp.png" className="w-5 h-5" alt="Shop" /> View Shop
                    </button>
                  </div>
                  <span className={`inline-block text-white text-sm text-center w-28 py-1 rounded-full ${
                    order.status === "Completed"
                      ? "bg-[#4CAE4F]"
                      : order.status === "To Ship"
                      ? "bg-[#D1A157]"
                      : "bg-gray-400"
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="w-full h-[2px] bg-gray-300 mb-4" />

                <div className="flex gap-4 items-start w-full">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2 flex-grow">
                    <p className="text-lg font-semibold">{order.name}</p>
                    <p className="text-sm text-gray-500 mt-12">Quantity: {order.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold">₱{order.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
