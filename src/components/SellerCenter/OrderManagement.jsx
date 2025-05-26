// src/components/SellerCenter/OrderManagement.jsx
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, RefreshCw, ArrowLeft, Store, Eye, User, Package } from "lucide-react";

const ORDER_CATEGORIES = [
  { name: 'Pending', count: 35, color: '#A16207', bg: '#FEF9C3' },
  { name: 'Confirmed', count: 41, color: '#065F46', bg: '#DCFCE7' },
  { name: 'Processing', count: 51, color: '#1D4ED8', bg: '#DBEAFE' },
  { name: 'Shipped', count: 60, color: '#7C3AED', bg: '#EDE9FE' },
  { name: 'Delivered', count: 75, color: '#166534', bg: '#DCFCE7' },
  { name: 'Cancelled', count: 35, color: '#DC2626', bg: '#FEE2E2' },
  { name: 'Returned', count: 35, color: '#B45309', bg: '#FEF3C7' },
];

const dummyOrders = Array.from({ length: 5 }, (_, i) => ({
  id: `#01234${i + 1}`,
  customer: {
    name: "Juan Dela Cruz",
    email: "juandcruz@gmail.com",
    image: null, // Will use fallback
  },
  product: {
    name: "Premium Farm Fresh Sweet Corn",
    variation: "Yellow, White",
    image: null, // Will use fallback
  },
  dateOrdered: "20 Aug 1999",
  timeOrdered: "01:23:42 PM",
  orderStatus: ORDER_CATEGORIES[i % ORDER_CATEGORIES.length].name,
  transactionStatus: i === 3 ? "Paid" : i === 4 ? "Refunded" : "Pending",
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
        color: '#DC2626',
        backgroundColor: '#FEE2E2',
        border: '1px solid #DC2626'
      };
    default:
      return {
        color: '#6B7280',
        backgroundColor: '#F3F4F6',
        border: '1px solid #9CA3AF'
      };
  }
};

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const TRANSACTIONS = ["Pending", "Paid", "Refunded"];

// ViewOrderModal component with exact styling from provided code
const ViewOrderModal = ({ isOpen, onClose, order, onConfirm, onDisregard }) => {
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || "Processing");
  const [transaction, setTransaction] = useState(order?.transactionStatus || "Pending");

  // Modal flows
  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState(""); // "confirm" | "disregard"

  if (!isOpen || !order) return null;

  // --- Handlers ---
  function handleConfirmSubmit() {
    setShowConfirmModal(false);
    setSuccessType("confirm");
    setShowSuccessModal(true);
    if (onConfirm) onConfirm(orderStatus, transaction);
  }

  function handleDisregardSubmit() {
    setShowDisregardModal(false);
    setSuccessType("disregard");
    setShowSuccessModal(true);
    if (onDisregard) onDisregard();
  }

  // --- Modal Content ---
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {/* Main Modal */}
      <div
        className="relative bg-white w-full max-w-md mx-auto rounded-[2.2rem] shadow-xl p-9 pt-8 border"
        style={{ minWidth: 370, maxWidth: 490, borderColor: "#b5b5b5" }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-7 top-7 text-gray-500 hover:text-gray-900 rounded-full focus:outline-none text-2xl"
          aria-label="Close"
        >
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        {/* Title and subtitle */}
        <h2 className="text-2xl font-bold leading-tight mb-0">Order Details</h2>
        <p className="text-base text-gray-600 mb-4">
          Shown below is the order details.
        </p>
        <hr className="mb-6 mt-1" />

        {/* Product */}
        <div className="flex items-center gap-4 mb-7">
          <div className="relative">
            {order.product.image ? (
              <img
                src={order.product.image}
                alt={order.product.name}
                className="rounded-full"
                style={{ width: 65, height: 65, objectFit: "cover" }}
              />
            ) : (
              <div 
                className="rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
                style={{ width: 65, height: 65 }}
              >
                <Package size={24} />
              </div>
            )}
          </div>
          <div>
            <div className="text-[1.3rem] font-bold text-[#222A35] leading-tight">{order.product.name}</div>
            <div className="text-[1rem] text-gray-600" style={{ marginTop: 2 }}>
              Variation: {order.product.variation}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3 text-sm">
          <div>
            <span className="font-semibold text-black">Name</span>
            <div>{order.customer.name}</div>
          </div>
          <div>
            <span className="font-semibold text-black">Order ID</span>
            <div>{order.id}</div>
          </div>
          <div>
            <span className="font-semibold text-black">Address</span>
            <div>Purok 3 Zone 6 Penafrancia<br />Cupang Antipolo City</div>
          </div>
          <div>
            <span className="font-semibold text-black">Contact Number</span>
            <div>(+63) 948 122 9142</div>
          </div>
        </div>
        <div className="text-gray-900 font-semibold mt-1 mb-2 text-sm">
          Date Ordered
        </div>
        <div className="text-gray-400 mb-2 text-sm">
          {order.dateOrdered} {order.timeOrdered}
        </div>

        {/* Dropdowns */}
        <div className="mb-2">
          <label className="font-semibold text-black text-sm mb-1 block">
            Order Status
          </label>
          <select
            className="w-full rounded-full border px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
            value={orderStatus}
            onChange={e => setOrderStatus(e.target.value)}
          >
            {ORDER_STATUSES.map(os => (
              <option key={os} value={os}>{os}</option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="font-semibold text-black text-sm mb-1 block">
            Transaction
          </label>
          <select
            className="w-full rounded-full border px-4 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
            value={transaction}
            onChange={e => setTransaction(e.target.value)}
          >
            {TRANSACTIONS.map(tr => (
              <option key={tr} value={tr}>{tr}</option>
            ))}
          </select>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-4 mt-10">
          <button
            type="button"
            onClick={() => setShowDisregardModal(true)}
            className="flex-1 bg-[#EF4444] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
            style={{ fontSize: "1.15rem" }}
          >
            Disregard
          </button>
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="flex-1 bg-[#16A34A] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            style={{ fontSize: "1.15rem" }}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* DISREGARD Confirmation Modal */}
      {showDisregardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
            {/* Close */}
            <button
              onClick={() => setShowDisregardModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
            {/* Red Exclamation Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#FF4B4B] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
                  <path d="M12 7v5m0 4h.01" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-1" style={{ color: "#222" }}>Disregard changes?</h2>
            <p className="text-gray-700 mb-8">
              This action cannot be undone.<br />
              The changes will be lost.
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <button
                onClick={() => setShowDisregardModal(false)}
                className="bg-[#FF3B3F] text-white font-semibold rounded-full px-12 py-4 text-base hover:bg-[#ff5c5c] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDisregardSubmit}
                className="border-2 border-[#FF3B3F] font-semibold rounded-full px-12 py-4 text-base bg-white transition"
                style={{
                  minWidth: 140,
                  color: '#FF3B3F',
                  fontSize: "1.12rem"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FF3B3F';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#FF3B3F';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#FF3B3F';
                  e.currentTarget.style.borderColor = '#FF3B3F';
                }}
              >
                Disregard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
            {/* Close */}
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
            {/* Green Check Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#43B864] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#43B864" />
                  <polyline points="17 9.5 12 15 9 12.2" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-1" style={{ color: "#111" }}>Confirm changes?</h2>
            <p className="text-gray-700 mb-8" style={{ fontSize: "1.1rem" }}>
              Are you sure you want to save these changes to the order?
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="border-2 border-[#43B864] font-semibold rounded-full px-12 py-4 text-base bg-white text-[#43B864] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="bg-[#43B864] text-white font-semibold rounded-full px-12 py-4 text-base hover:bg-[#369C52] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                onClose && onClose();
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
              style={{ background: "none", border: "none" }}
            >
              &times;
            </button>
            {/* Green Check Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#43B864] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#43B864" />
                  <polyline points="17 9.5 12 15 9 12.2" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 mt-1" style={{ color: "#111", fontSize: "2rem" }}>
              {successType === "confirm" ? "Order updated successfully!" : "Order disregarded successfully!"}
            </h2>
            <p className="text-gray-700 mb-8" style={{ fontSize: "1.15rem" }}>
              {successType === "confirm"
                ? "Everything's set. Feel free to check it!"
                : "The order changes have been disregarded."}
            </p>
            <div className="flex justify-center gap-5 mt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="border-2 border-[#43B864] font-semibold rounded-full px-12 py-4 text-base bg-white text-[#43B864] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose && onClose();
                }}
                className="bg-[#43B864] text-white font-semibold rounded-full px-12 py-4 text-base hover:bg-[#369C52] transition"
                style={{ minWidth: 140, fontSize: "1.12rem" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function OrderManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = dummyOrders.filter(order =>
    order.product.name.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-black text-lg font-semibold border border-black rounded-full py-2 px-6 hover:text-green-700 hover:border-green-700 transition duration-200"
            aria-label="Back to Marketplace"
          >
            <ArrowLeft size={20} />
            Back to Marketplace
            <Store size={20} />
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <RefreshCw size={18} className="text-green-600" />
            <span className="text-xl font-bold">All Orders</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
              {filteredOrders.length}
            </span>
          </div>
          
          {/* Search */}
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
            <input
              type="text"
              placeholder="Search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-label="Search orders"
            />
            <SlidersHorizontal className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black cursor-pointer hover:text-gray-600" size={18} />
          </div>
        </div>

        {/* Order Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
          {ORDER_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col justify-center px-4 py-3 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[80px] relative overflow-hidden"
              style={{ borderColor: '#e5e7eb' }}
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

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-black text-left border-b">
                <tr>
                  <th className="p-4 w-12">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={selectedRows.length === filteredOrders.length && filteredOrders.length > 0}
                      aria-label="Select all orders"
                    />
                  </th>
                  <th className="p-4 text-lg font-semibold">Order ID</th>
                  <th className="p-4 text-lg font-semibold">Customer</th>
                  <th className="p-4 text-lg font-semibold">Product</th>
                  <th className="p-4 text-lg font-semibold">Date Ordered</th>
                  <th className="p-4 text-lg font-semibold">Order Status</th>
                  <th className="p-4 text-lg font-semibold">Transaction</th>
                  <th className="p-4 text-lg font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Package size={48} className="text-gray-300" />
                        <span>No orders found</span>
                        {search && (
                          <button
                            onClick={() => setSearch("")}
                            className="text-green-600 hover:underline text-sm"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          checked={selectedRows.includes(order.id)}
                          onChange={() => handleRowSelect(order.id)}
                          aria-label={`Select order ${order.id}`}
                        />
                      </td>
                      <td className="p-4 font-semibold text-lg text-gray-900">{order.id}</td>
                      <td className="p-4">
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
                            <p className="font-medium text-lg text-gray-900 truncate">{order.customer.name}</p>
                            <p className="text-sm text-gray-500 truncate">{order.customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
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
                          <div className="min-w-0">
                            <p className="font-medium text-lg text-gray-900 truncate">{order.product.name}</p>
                            <p className="text-sm text-gray-500 truncate">Variation: {order.product.variation}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-lg text-gray-900">{order.dateOrdered}</p>
                          <p className="text-sm text-gray-500">{order.timeOrdered}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
                          style={getStatusStyle(order.orderStatus)}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-4">
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
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-lg hover:underline transition-colors duration-150"
                          aria-label={`View order ${order.id}`}
                        >
                          <Eye size={14} />
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

        {/* Selected Items Info */}
        {selectedRows.length > 0 && (
          <div className="fixed bottom-4 left-64 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
            <span className="font-medium">
              {selectedRows.length} order{selectedRows.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
                Bulk Action
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="bg-green-700 px-4 py-2 rounded font-medium hover:bg-green-800 transition"
              >
                Clear Selection
              </button> 
            </div>
          </div>
        )}

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