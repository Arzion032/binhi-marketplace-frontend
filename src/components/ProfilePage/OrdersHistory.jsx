import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderDetailsModal from './OrderDetailsModal';
import ReturnRefundModal from './ReturnRefundModal';
import CancelOrderModal from './CancelOrderModal';
import api from '../../api';
import OrderItem from './OrderItem';

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [showReturnRefundModal, setShowReturnRefundModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get('/orders/order-history/');
        setOrders(response.data);
        setLoading(false);
        console.log('Orders: ', orders)
      } catch (err) {
        setError('Failed to load order history');
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  // Mock navigation function for demo
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

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
              <OrderItem
                  key={order.id}
                  order={order}
                  setSelectedOrder={setSelectedOrder}
                  setShowViewOrderModal={setShowViewOrderModal}
                  setShowCancelModal={setShowCancelModal}
                  setShowReturnRefundModal={setShowReturnRefundModal}
                  canCancelOrder={canCancelOrder}
                  getStatusColor={getStatusColor}
                />
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