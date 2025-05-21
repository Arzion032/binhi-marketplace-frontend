import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


/*Hi mimaaa, oreder details clickable */

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [showDetails, setShowDetails] = useState(false);
  
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
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
  <div className="flex items-center gap-4">
    <button
      className="text-gray-600 hover:text-black"
      onClick={() => navigate("/userprofile")}
    >
      <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
    </button>

    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Order History</h1>
      <p className="text-sm text-gray-600">View your recent and past orders here.</p>
    </div>
  </div>

  <div className="flex items-center px-4">
  <div className="flex items-center bg-white border-2 border-black rounded-full px-3 py-1 w-[600px] h-14">
      <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
      <input
        type="text"
        placeholder="Search by Seller Name, Order ID, or Product Name"
        className="flex-grow text-sm bg-white"
      />
      <button>
        <img src="/mic.png" alt="Mic" className="w-5 h-5 hover:scale-110" />
      </button>
      <button>
        <img src="/camera.png" alt="Camera" className="w-5 h-5 mx-4 hover:scale-110" />
      </button>
    </div>
  </div>
</div>
      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

    {/* Orders Section */}
              <div className="bg-white mx-10 border-2 border-gray-300 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start border-b pb-4 gap-2">
                  <div className="flex flex-wrap gap-[130px] mx-24 flex-1">
                    {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`text-2xl px-3 py-1 rounded-full transition-all duration-200 ${
                          selectedTab === tab 
                            ? "bg-[#4CAE4F] text-white font-semibold" 
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
    
                  {/* Expand button */}
                </div>
                    
                {/* Order Items */}
                <div className="mt-6 space-y-6">
                  
                  {filteredOrders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
                  ) : (
                    filteredOrders.map(order => (
                  <div key={order.id} className="flex flex-col border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm relative">
    
                  {/* Seller Info: Profile and Name */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.sellerProfile || "/default-profile.png"} // fallback if no image
                        alt="Seller"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium text-gray-700">{order.sellerName}</p>
                      <button className="text-gray-500 text-base font-medium px-3 py-2 rounded-full transition">
                        Click here to chat
                      </button>
                      <button className="flex items-center gap-2 bg-[#4CAE4F] hover:bg-green-700 text-white text-lg font-medium px-3 py-2 rounded-full transition">
                        <img src="/shopp.png" className="w-5 h-5" /> View Shop
                      </button>
                    </div>
    
                    {/* Buttons: Chat and View Shop */}
                    <div className="flex items-left gap-2">
                      <span className={`inline-block text-white text-base text-center w-28 px-2 py-2 rounded-full ${
                      order.status === "Completed" ? "bg-[#4CAE4F]" :
                      order.status === "To Ship" ? "bg-[#D1A157]" :
                      "bg-gray-400" 
                    }`}>
                      {order.status}
                    </span>
                    </div>
                    </div>
    
                    <div className="w-full h-[2px] bg-gray-300 mb-4 mt-2" />
    
                  <div className="flex gap-4 items-start w-full">
                    {/* Product image */}
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
    
                    <div className="flex flex-col gap-2">
                      {/* Product name and quantity */}
                      <div>
                        <p className="text-2xl font-semibold">{order.name}</p>
                        <p className="text-lg text-gray-500 mt-12">Quantity: {order.quantity}</p>
                      </div>
                    </div>
                  </div>
  
                  {/* Right section: Status and price */}
                  <div className="text-right space-y-2">
                  
                    {order.price > 0 && (
                      <p className="text-xl font-bold">₱{order.price.toFixed(2)}</p>
                    )}
                    
                  </div>
                  <div className="flex justify-end mt-10">
                  <button
                  onClick={() => setShowDetails(true)}
                  className="w-[200px] hover:underline text-lg text-[#4CAE4F] font-bold py-2 px-6 rounded-full transition-all"
                >
                  Order Details
                </button>
                </div>
                {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center z-[9999]">
                  <div className="bg-white rounded-xl w-[1000px] p-6 shadow-lg relative border-t-4 border-[#4CAE4F]">
                    <button
                      className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
                      onClick={() => setShowDetails(false)}
                    >
                      &times;
                    </button>

                    <h2 className="text-3xl font-bold mb-1">Order Details</h2>
                    <p className="text-lg text-gray-500 mb-4">Order ID: 23149MF260</p>

                    <div className="border-t border-gray-300 mb-4" />

                    {/* Status Tracking with Images */}
                    <div className="space-y-4 mb-6">
                      {[
                        { label: "Pending", icon: "/pending.png", time: "03/31/2025 9:23 AM", active: true },
                        { label: "Confirmed", icon: "/confirmed.png", time: "03/31/2025 9:23 AM", active: true },
                        { label: "Processing", icon: "/processing.png", active: false },
                        { label: "Shipped", icon: "/shipped.png", active: false },
                        { label: "Delivered", icon: "/delivered.png", active: false },
                      ].map((step, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img
                              src={step.icon}
                              alt={step.label}
                              className={`w-12 h-12 ${step.active ? "opacity-100" : "opacity-40"}`}
                            />
                            <p className={`${step.active ? "text-[#4CAE4F] text-lg font-semibold" : "text-gray-400 text-lg"}`}>{step.label}</p>
                          </div>
                          {step.time && <p className="text-lg text-gray-600">{step.time}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-gray-100 p-4 text-lg rounded-xl mb-6">
                    <div className="flex items-center gap-2 mb-2">
                    <img src="/pin.png" alt="Pin" className="w-8 h-8" />
                    <p className="text-[#4CAE4F] font-semibold">Delivery Address</p>
                    </div>
                      <p>Juan Dela Cruz</p>
                      <p>(+63) 948 122 9142</p>
                      <p>Brgy. Mambog Binangonan, Rizal, 1940</p>
                    </div>

                    {/* Price Summary */}
                    <div className="text-lg space-y-1">
                      <div className="flex justify-between">
                        <p className="text-gray-500">Subtotal</p>
                        <p className="font-medium">₱53.00</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-500">Discount</p>
                        <p className="font-medium">₱0.00</p>
                      </div>
                      <div className="flex justify-between text-lg font-bold mt-2">
                        <p>Total</p>
                        <p>₱53.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                </div>
            ))
          )}
          <button
  onClick={() => navigate('/ChatPage')}
  className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
>
  <img src="/chat.png" alt="Chat Icon" className="w-6 h-6" />
</button>

        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
