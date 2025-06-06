const handleCancelOrder = (cancelData) => {
    console.log("Submitting cancel request:", cancelData);
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === selectedOrder?.id 
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
    
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: "Cancelled" });
    }
    
    setShowCancelModal(false);
    alert("Order cancelled successfully!");
  };import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderDetailsModal from './OrderDetailsModal';
import ReturnRefundModal from './ReturnRefundModal';
import CancelOrderModal from './CancelOrderModal';

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showReturnRefundModal, setShowReturnRefundModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock navigation function for demo
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // Enhanced state with delivery fee, weight, and variations
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "23149MF260",
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
      weight: 0.5, // in kg
      variation: "Dark Chocolate",
      status: "Delivered",
      sellerName: "Carla Pasig",
      sellerProfile: "/avatar.png",
      deliveryFee: 15.0,
      orderDate: "2025-03-31",
      deliveryAddress: {
        name: "Juan Dela Cruz",
        phone: "(+63) 948 122 9142",
        address: "Brgy. Mambog Binangonan, Rizal, 1940"
      }
    },
    {
      id: 2,
      orderId: "23149MF261",
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 2,
      price: 35.0,
      weight: 1.2, // in kg
      variation: "Yellow Corn",
      status: "Pending",
      sellerName: "John Farmer",
      sellerProfile: "/avatar.png",
      deliveryFee: 20.0,
      orderDate: "2025-04-01",
      deliveryAddress: {
        name: "Juan Dela Cruz",
        phone: "(+63) 948 122 9142",
        address: "Brgy. Mambog Binangonan, Rizal, 1940"
      }
    },
    {
      id: 3,
      orderId: "23149MF262",
      name: "Organic Free-Range Eggs",
      image: "Butter.png", // Using butter as placeholder
      quantity: 1,
      price: 120.0,
      weight: 0.8, // in kg
      variation: "Large Size (12 pieces)",
      status: "Delivered",
      sellerName: "Maria Santos",
      sellerProfile: "/avatar.png",
      deliveryFee: 25.0,
      orderDate: "2025-03-28",
      deliveryAddress: {
        name: "Juan Dela Cruz",
        phone: "(+63) 948 122 9142",
        address: "Brgy. Mambog Binangonan, Rizal, 1940"
      }
    }
  ]);

  const handleCancelOrder = (cancelData) => {
    console.log("Submitting cancel request:", cancelData);
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === selectedOrder?.id 
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
    
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: "Cancelled" });
    }
    
    setShowCancelModal(false);
    alert("Order cancelled successfully!");
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = selectedTab === "All" || order.status === selectedTab;
    
    const matchesSearch = searchQuery === "" || 
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.variation.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "bg-[#4CAE4F]";
      case "Cancelled": return "bg-red-500";
      case "Returned": return "bg-gray-500";
      default: return "bg-[#D1A157]";
    }
  };

  const canCancelOrder = (status) => {
    return ["Pending", "Confirmed"].includes(status);
  };

  // Calculate total for each order
  const calculateTotal = (order) => {
    const subtotal = order.price * order.quantity;
    return subtotal + order.deliveryFee;
  };

  // Handler for successful refund submission
  const handleRefundSuccess = (refundData) => {
    console.log("Refund request submitted:", refundData);
    setShowReturnRefundModal(false);
    alert("Refund request submitted successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] px-6 py-4">
      
      {/* Header */}
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/UserProfile')}
            className="text-gray-600 hover:text-black"
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">Order History</h1>
            <p className="text-sm text-gray-600">View your recent and past orders here.</p>
          </div>
        </div>

        <div className="flex items-center px-4">
          <div className="flex items-center bg-white border-2 border-black rounded-full px-3 py-1 w-[700px] h-14 relative">
            <img src="/search.png" alt="Search" className="w-8 h-8 mx-4" />
            <input
              type="text"
              placeholder="Click here to search Association, Products, or Variation"
              className="flex-grow text-lg bg-white outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 mx-2"
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button>
              <img src="/mic.png" alt="Mic" className="w-8 h-8 hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

      {/* Orders Section */}
      <div className="bg-white mx-10 border-2 border-gray-300 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start border-b pb-4 gap-2">
          <div className="flex flex-wrap gap-[100px] mx-10 flex-1">
            {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`text-xl py-2 px-2 rounded-full transition-all duration-200 ${
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
            
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mt-4 mb-2 text-sm text-gray-600">
            {filteredOrders.length > 0 
              ? `Found ${filteredOrders.length} result(s) for "${searchQuery}"`
              : `No results found for "${searchQuery}"`
            }
          </div>
        )}

        {/* Order Items */}
        <div className="mt-6 space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {searchQuery 
                ? `No orders found matching "${searchQuery}" under "${selectedTab}"`
                : `No orders under "${selectedTab}"`
              }
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="flex flex-col border-2 border-gray-300 transition p-4 rounded-xl bg-white shadow-sm relative">
                {/* Seller Info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.sellerProfile || "/default-profile.png"} 
                      alt="Seller"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium text-gray-700">{order.sellerName}</p>
                    <button className="text-gray-500 text-base font-medium px-3 py-2 rounded-full transition">
                      Click here to chat
                    </button>
                    <button className="flex items-center gap-2 hover:bg-green-700 hover:text-white text-[#4CAE4F] text-sm font-medium px-3 py-2 border border-[#4CAE4F] rounded-full transition">
                      <img src="/shoppp.png" alt="Shop" className="w-5 h-5" /> View Shop
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`inline-block text-white text-sm text-center w-28 px-2 py-2 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="w-full h-[2px] bg-gray-300 mb-4 mt-2" />
                
                <div className="flex justify-between items-start w-full">
                  <div className="flex gap-4">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-2xl font-semibold">{order.name}</p>
                        <p className="text-sm text-gray-600">Variation: {order.variation}</p>
                        <p className="text-sm text-gray-600">Weight: {order.weight} kg</p>
                        <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full">
                    <div className="text-right">
                      <p className="text-xl font-black text-[#4CAE4F] mt-2">Total: ₱{calculateTotal(order).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 gap-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowViewOrderModal(true);
                    }}
                    className="w-[130px] hover:bg-green-600 hover:text-white text-sm text-[#4CAE4F] font-bold py-2 px-2 border border-[#4CAE4F] rounded-full transition-all"
                  >
                    Order Details
                  </button>

                  {canCancelOrder(order.status) && (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowCancelModal(true);
                      }}
                      className="w-[130px] hover:bg-orange-600 hover:text-white text-sm text-orange-500 font-bold py-2 px-2 border border-orange-500 rounded-full transition-all"
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowReturnRefundModal(true);
                      }}
                      className="w-[150px] hover:bg-red-600 hover:text-white text-sm text-red-500 font-bold py-2 px-2 border border-red-500 rounded-full transition-all"
                    >
                      Request Refund
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <CancelOrderModal
          order={selectedOrder}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelOrder}
          calculateTotal={calculateTotal}
        />
      )}

      {/* View Order Modal */}
      {showViewOrderModal && selectedOrder && (
        <OrderDetailsModal
          showDetails={showViewOrderModal}  // <- Changed from order to showDetails
          setShowDetails={setShowViewOrderModal}  // <- Changed from onClose to setShowDetails
          selectedOrder={selectedOrder}
          setShowCancelModal={() => {
            setShowViewOrderModal(false);
            setShowCancelModal(true);
          }}
          setShowRefundModal={() => {  // <- Changed from onRequestRefund to setShowRefundModal
            setShowViewOrderModal(false);
            setShowReturnRefundModal(true);
          }}
          canCancelOrder={canCancelOrder}
        />
      )}

      {/* Return Refund Modal */}
      {showReturnRefundModal && selectedOrder && (
        <ReturnRefundModal  // <- Changed from ReturnRefund to ReturnRefundModal
          showRefundModal={showReturnRefundModal}
          setShowRefundModal={setShowReturnRefundModal}
          selectedOrder={selectedOrder}
          calculateTotal={calculateTotal}
          showCancelModal={false}
          setShowCancelModal={() => {}}
        />  
      )}

      <div className="group fixed bottom-10 right-10 z-50">
        <button
          onClick={() => navigate('/ChatPage')}
          className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative"
        >
          <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
        </button>
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Chats
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;