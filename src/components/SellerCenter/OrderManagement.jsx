// src/components/SellerCenter/OrderManagement.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, RefreshCw, ArrowLeft, Store, User, Package, Trash2, Eye } from "lucide-react";
import ViewOrderModal from "./ViewOrderModal";
import NotifModal from './NotifModal';

const ORDER_CATEGORIES = [
  { name: 'Pending', count: 35, color: '#6B7280', bg: '#F3F4F6' },
  { name: 'Confirmed', count: 41, color: '#4CAE4F', bg: '#DCFCE7' },
  { name: 'Processing', count: 51, color: '#0038A8', bg: '#DBEAFE' },
  { name: 'Shipped', count: 60, color: '#5E35B1', bg: '#EDE9FE' },
  { name: 'Delivered', count: 75, color: '#26A69A', bg: '#DCFCE7' },
  { name: 'Cancelled', count: 35, color: '#FF3B4E', bg: '#FEE2E2' },
  { name: 'Returned', count: 35, color: '#FB8C00', bg: '#FEF3C7' },
];

const initialOrders = Array.from({ length: 5 }, (_, i) => ({
  id: `#01234${i + 1}`,
  customer: {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    image: null,
  },
  product: {
    name: "Premium Farm Fresh Sweet Corn",
    variation: "Yellow, White",
    unit: "kg", // Added unit measurement
    image: null,
  },
  dateOrdered: "20 Aug 1999",
  timeOrdered: "01:23:42 PM",
  orderStatus: ORDER_CATEGORIES[i % ORDER_CATEGORIES.length].name,
  transactionStatus: i === 3 ? "Paid" : i === 4 ? "Refunded" : "Pending",
  quantity: Math.floor(Math.random() * 5) + 1, // Added quantity
  total: (Math.random() * 200 + 50).toFixed(2), // Added total price
}));

const getStatusStyle = (status) => {
  const cat = ORDER_CATEGORIES.find(c => c.name === status);
  return cat ? {
    color: cat.color,
    backgroundColor: cat.bg,
    border: `1px solid ${cat.color}`
  } : {
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB'
  };
};

const getTransactionStatusStyle = (status) => {
  switch (status) {
    case 'Paid':
      return {
        color: '#065F46',
        backgroundColor: '#DCFCE7',
        border: '1px solid #16A34A'
      };
    case 'Refunded':
      return {
        color: '#FB8C00',
        backgroundColor: '#FEF3C7',
        border: '1px solid #FB8C00'
      };  
    default:
      return {
        color: '#6B7280',
        backgroundColor: '#F3F4F6',
        border: '1px solid #9CA3AF'
      };
  }
};

// Helper function to update category counts based on order status
const updateCategoryCount = (orders, categoryName) => {
  return orders.filter(order => order.orderStatus === categoryName).length;
};

export default function OrderManagement() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navigate = useNavigate();

  // Update category counts dynamically based on current orders
  const updatedCategories = ORDER_CATEGORIES.map(category => ({
    ...category,
    count: updateCategoryCount(orders, category.name)
  }));

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.product.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesOrderStatus = !selectedOrderStatus || order.orderStatus === selectedOrderStatus;
    const matchesTransactionStatus = !selectedTransactionStatus || order.transactionStatus === selectedTransactionStatus;
    
    return matchesSearch && matchesOrderStatus && matchesTransactionStatus;
  });

  const updateOrderStatus = (orderId, newOrderStatus, newTransactionStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              orderStatus: newOrderStatus, 
              transactionStatus: newTransactionStatus 
            }
          : order
      )
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredOrders.map(order => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (orderId) => {
    setSelectedRows(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleImageError = (e, type = 'user') => {
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    if (parent && !parent.querySelector('.fallback-icon')) {
      const fallbackIcon = document.createElement('div');
      fallbackIcon.className = `fallback-icon flex items-center justify-center w-8 h-8 ${type === 'user' ? 'bg-gray-200 rounded-full' : 'bg-gray-100 rounded'} text-gray-500`;
      if (type === 'user') {
        fallbackIcon.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
      } else {
        fallbackIcon.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16V4H3v12h18zm0-14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h18zM13 9l-4 5h12l-3-4-2.03 2.71L13 9z"/></svg>';
      }
      parent.appendChild(fallbackIcon);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 bg-[#f9fbf8] min-h-screen px-6 py-6">
        {/* Back Button */}
         <div className="flex justify-center mb-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-black text-lg font-semibold border border-black rounded-full py-2 px-8 hover:text-green-700 transition"
          >
            <img src="/arrow-left.png" alt="Back" className="w-6 h-6" />
            Back to Marketplace
            <img src="/shop_black.png" alt="shop" className="w-6 h-6" />
          </button>
        </div>

        {/* Sticky header and tabs + bell + 3 dots */}
        <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div></div>
            <div className="flex items-center gap-6">
              {/* Bell notification */}
              <button 
                className="relative"
                onClick={() => setNotifOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-1.5 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center text-white font-bold">12</span>
              </button>
            </div>
          </div>
          <div className=" h-5 flex items-center">
            <h1 className="text-4xl font-bold text-gray-800">Order Management</h1>
          </div>
          <div className="mb-4 border-b border-gray-200 relative">
            <ul className="flex text-sm font-medium text-center" role="tablist">
              {["Orders"].map((t, i) => (
                <li key={t} className="mr-10 text-lg" role="presentation">
                  <button
                    className={`inline-block p-4 ${
                      t === "Active"
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-600"
                    }`}
                    role="tab"
                    aria-selected={t === "Active"}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300 w-[70px]" />
          </div>
        </div>

        {/* Order Categories with Dynamic Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-8 mx-4">
          {updatedCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col justify-center px-4 py-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[80px] relative overflow-hidden cursor-pointer"
              style={{ borderColor: '#e5e7eb' }}
              onClick={() => setSelectedOrderStatus(selectedOrderStatus === cat.name ? "" : cat.name)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-4"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-lg px-3 text-gray-500 font-bold">{cat.name}</span>
              <span className="text-3xl px-3 font-bold text-gray-900">{cat.count}</span>
            </div>
          ))}
        </div>
          
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 mx-4">
          {selectedRows.length > 0 && ( 
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (window.confirm("Delete selected orders?")) {
                    alert(`Deleted: ${selectedRows.join(", ")}`);
                    setSelectedRows([]);
                  }
                }}
                className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 text-red-600 font-medium text-base"
              >
                <Trash2 size={18} stroke="#dc2626" />
                Delete
                <span className="text-gray-500 ml-1">{selectedRows.length} Selected</span>
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
              >
                ✕ Clear
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-700 font-medium min-w-[200px]">
            {selectedRows.length === 0 && !showFilters && (
              <>
                <RefreshCw size={18} className="text-green-600" />
                <span className="text-xl font-bold">All Orders</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {filteredOrders.length}
                </span>
              </>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bold" size={18} />
            <input
              type="text"
              placeholder="Search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-12 px-2 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-label="Search orders"
            />
            <SlidersHorizontal 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black cursor-pointer hover:text-gray-600" 
              size={18}
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 mb-6 px-1">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
              <SlidersHorizontal size={18} className="text-blue-800" />
              <span className="text-blue-600 font-bold text-lg">Active Filters</span>
            </div>

            <div className="relative">
              <select
                value={selectedOrderStatus}
                onChange={(e) => setSelectedOrderStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 text-lg font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Order Status</option>
                {ORDER_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="relative">
              <select
                value={selectedTransactionStatus}
                onChange={(e) => setSelectedTransactionStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 text-lg font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Transaction</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <button
              onClick={() => {
                setSelectedOrderStatus("");
                setSelectedTransactionStatus("");
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 text-lg font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              ✕ Clear
            </button>
          </div>
        )}

        {/* Orders Table with Grid Lines */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mx-4 border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100 text-black text-left">
                <tr className="border-b border-gray-300">
                  <th className="p-4 w-12 border-r border-gray-200">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-700 text-green-600 focus:ring-green-500"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedRows.length === filteredOrders.length && filteredOrders.length > 0}
                      aria-label="Select all orders"
                    />
                  </th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Order ID</th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Customer</th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Product</th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Date Ordered</th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Order Status</th>
                  <th className="p-4 text-lg font-bold border-r border-gray-200">Transaction</th>
                  <th className="p-4 text-lg font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Package size={70} className="text-gray-300" />
                        <span>No orders found</span>
                        {(search || selectedOrderStatus || selectedTransactionStatus) && (
                          <button
                            onClick={() => {
                              setSearch("");
                              setSelectedOrderStatus("");
                              setSelectedTransactionStatus("");
                            }}
                            className="text-green-600 hover:underline text-bases"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100">
                      <td className="p-4 border-r border-gray-100">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={selectedRows.includes(order.id)}
                          onChange={() => handleRowSelect(order.id)}
                          aria-label={`Select order ${order.id}`}
                        />
                      </td>
                      <td className="p-4 font-semibold text-base text-gray-900 border-r border-gray-100">{order.id}</td>
                      <td className="p-4 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {order.customer.image ? (
                              <img
                                src={order.customer.image}
                                alt={order.customer.name}
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => handleImageError(e, 'user')}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-500">
                                <User size={16} />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-base text-gray-900 truncate">{order.customer.name}</p>
                            <p className="text-sm text-gray-500 truncate">{order.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {order.product.image ? (
                              <img
                                src={order.product.image}
                                alt={order.product.name}
                                className="w-8 h-8 object-cover rounded"
                                onError={(e) => handleImageError(e, 'product')}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded text-gray-500">
                                <Package size={16} />
                              </div>
                            )}
                          </div>
                          <div className="max-w-[250px]">
                            <p className="font-semibold text-lg">{order.product.name}</p>
                            <p className="text-sm text-gray-500">Variation: {order.product.variation}</p>
                            <p className="text-sm text-gray-500">Unit: {order.product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-r border-gray-100">
                        <div>
                          <p className="font-medium text-base text-gray-900">{order.dateOrdered}</p>
                          <p className="text-sm text-gray-500">{order.timeOrdered}</p>
                        </div>
                      </td>
                      <td className="p-4 border-r border-gray-100">
                        <span
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
                          style={getStatusStyle(order.orderStatus)}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-4 border-r border-gray-100">
                        <span
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
                          style={getTransactionStatusStyle(order.transactionStatus)}
                        >
                          {order.transactionStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-base hover:underline transition-colors duration-150"
                          aria-label={`View order ${order.id}`}
                        >
                         <img src ="searchh.png" alt="search"/>
                          View Order
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* NotifModal */}
        <NotifModal isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

        {/* ViewOrderModal */}
        {isModalOpen && selectedOrder && (
          <ViewOrderModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
            order={selectedOrder}
            onConfirm={(status, transaction) => {
              console.log("Order confirmed:", { status, transaction, orderId: selectedOrder.id });
              updateOrderStatus(selectedOrder.id, status, transaction);
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
            onDisregard={() => {
              console.log("Order disregarded:", selectedOrder.id);
              setIsModalOpen(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
}