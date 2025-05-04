// OrdersPage.jsx
import React, { useState } from 'react'
import { Expand, Minimize } from 'lucide-react'

const OrdersPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

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
      price: 0,
      status: "To Ship"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] p-6">
      <div className="max-w-5xl mx-auto bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start border-b pb-4 gap-2">
          <div className={`transition-all duration-300 flex-1 ${isExpanded ? 'flex flex-wrap gap-3' : 'flex gap-3 overflow-x-auto whitespace-nowrap'}`}>
            {["All", "To Pay", "To Ship", "To Receive", "Completed", "Cancelled", "Return/Refund"].map(tab => (
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

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-black transition-colors shrink-0"
          >
            {isExpanded ? <Minimize size={20} /> : <Expand size={20} />}
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-lg">
                <div className="flex gap-4 items-center">
                  <img src={order.image} alt={order.name} className="w-16 h-16 rounded-lg" />
                  <div>
                    <p className="font-semibold">{order.name}</p>
                    {order.quantity && (
                      <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-white rounded-full px-4 ${
                    order.status === "Completed" ? "bg-[#4CAE4F]" : 
                    order.status === "To Ship" ? "bg-[#D1A157]" : "bg-gray-400"
                  }`}>{order.status}</p>
                  {order.price > 0 && (
                    <p className="font-bold mt-2">₱{order.price.toFixed(2)}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage;
