import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Expand } from 'lucide-react'

const OrderPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.00,
      status: "Completed"
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 1,
      price: 53.00,
      status: "To Ship"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="min-h-screen bg-[#F5F9F5]">
      <div className="max-w-9xl mx-auto p-4 flex flex-col md:flex-row gap-6">

      <div className="w-full md:w-1/3 space-y-4">
           {/* Back Button and Title - Moved above profile card */}
           <div className="flex items-center gap-4 mb-2">
            <button
              className="flex items-center text-gray-600 hover:text-black"
              onClick={() => navigate("/")}
            >
              <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
            </button>
            <p className="text-3xl font-bold">Order History</p>
          </div>    

          {/* Orders Section */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start border-b pb-4 gap-4">
              <div className="flex flex-wrap gap-8 flex-1">
                {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`text-sm px-4 py-1 rounded-full transition-all duration-200 ${
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
              <button
                onClick={() => navigate('/orders')}
                className="text-gray-500 hover:text-black transition-colors shrink-0"
              >
                <Expand size={20} />
              </button>
            </div>
                
            {/* Order Items */}
            <div className="mt-6 space-y-6">
              
              {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm">
              {/* Left section: Product and seller info */}
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
                    <p className="text-lg font-semibold">{order.name}</p>
                    <p className="text-sm text-gray-500 mt-12">Quantity: {order.quantity}</p>
                  </div>
                </div>
              </div>

              {/* Right section: Status and price */}
              <div className="text-right space-y-2">
                <span className={`inline-block text-white text-sm text-center w-28 py-1 rounded-full ${
                  order.status === "Completed" ? "bg-[#4CAE4F]" :
                  order.status === "To Ship" ? "bg-[#D1A157]" :
                  "bg-gray-400" 
                }`}>
                  {order.status}
                </span>
                {order.price > 0 && (
                  <p className="text-base font-bold">₱{order.price.toFixed(2)}</p>
                )}
              </div>
            </div>

                ))
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default OrderPage;
