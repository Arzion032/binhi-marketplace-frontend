import React, { useState } from "react";
import { Package } from "lucide-react";

const ORDER_STATUSES = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];
const TRANSACTIONS = ["Pending", "Paid", "Refunded"];

const ViewOrderModal = ({ isOpen, onClose, order, onConfirm, onDisregard }) => {
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || "Processing");
  const [transaction, setTransaction] = useState(order?.transactionStatus || "Pending");

  const [showDisregardModal, setShowDisregardModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successType, setSuccessType] = useState(""); // "confirm" | "disregard"

  if (!isOpen || !order) return null;

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    setSuccessType("confirm");
    setShowSuccessModal(true);
    if (onConfirm) onConfirm(orderStatus, transaction);
  };

  const handleDisregardSubmit = () => {
    setShowDisregardModal(false);
    setSuccessType("disregard");
    setShowSuccessModal(true);
    if (onDisregard) onDisregard();
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      {/* MODAL */}
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-[2.2rem] shadow-xl p-9 pt-8 border" style={{ minWidth: 400, maxWidth: 700, borderColor: "#b5b5b5" }}>
        <button type="button" onClick={onClose} className="absolute right-7 top-7 text-gray-500 hover:text-gray-900 text-2xl" aria-label="Close">
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold leading-tight mb-0">Order Details</h2>
        <p className="text-base text-gray-600 mb-4">Shown below is the order details.</p>
        <hr className="mb-6 mt-1" />

        {/* DISREGARD Confirmation Modal */}
{showDisregardModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-3xl shadow-xl relative p-10 w-full max-w-xl text-center border" style={{ borderColor: "#b5b5b5" }}>
      <button
        onClick={() => setShowDisregardModal(false)}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="flex justify-center mb-6">
        <div className="bg-[#FF4B4B] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#FF4B4B" />
            <path d="M12 7v5m0 4h.01" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Disregard changes?</h2>
      <p className="text-gray-700 mb-8">This action cannot be undone. The changes will be lost.</p>
      <div className="flex justify-center gap-5 mt-2">
        <button
          onClick={() => setShowDisregardModal(false)}
          className="bg-[#FF3B3F] text-white font-semibold rounded-full px-12 py-4 hover:bg-[#ff5c5c]"
        >
          Cancel
        </button>
        <button
          onClick={handleDisregardSubmit}
          className="border-2 border-[#FF3B3F] font-semibold rounded-full px-12 py-4 text-[#FF3B3F] bg-white hover:bg-[#FF3B3F] hover:text-white"
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
            <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close"
            >
                &times;
            </button>
            <div className="flex justify-center mb-6">
                <div className="bg-[#43B864] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#43B864" />
                    <polyline points="17 9.5 12 15 9 12.2" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Confirm changes?</h2>
            <p className="text-gray-700 mb-8">Are you sure you want to save these changes to the order?</p>
            <div className="flex justify-center gap-5 mt-2">
                <button
                onClick={() => setShowConfirmModal(false)}
                className="border-2 border-[#43B864] font-semibold rounded-full px-12 py-4 bg-white text-[#43B864]"
                >
                Cancel
                </button>
                <button
                onClick={handleConfirmSubmit}
                className="bg-[#43B864] text-white font-semibold rounded-full px-12 py-4 hover:bg-[#369C52]"
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
            <button
                onClick={() => {
                setShowSuccessModal(false);
                onClose && onClose();
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
                aria-label="Close"
            >
                &times;
            </button>
            <div className="flex justify-center mb-6">
                <div className="bg-[#43B864] rounded-full flex items-center justify-center mb-2" style={{ width: 110, height: 110 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#43B864" />
                    <polyline points="17 9.5 12 15 9 12.2" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
                {successType === "confirm" ? "Order updated successfully!" : "Order disregarded successfully!"}
            </h2>
            <p className="text-gray-700 mb-8">
                {successType === "confirm" ? "Everything's set. Feel free to check it!" : "The order changes have been disregarded."}
            </p>
            <div className="flex justify-center gap-5 mt-2">
                <button
                onClick={() => setShowSuccessModal(false)}
                className="border-2 border-[#43B864] font-semibold rounded-full px-12 py-4 bg-white text-[#43B864]"
                >
                Back
                </button>
                <button
                onClick={() => {
                    setShowSuccessModal(false);
                    onClose && onClose();
                }}
                className="bg-[#43B864] text-white font-semibold rounded-full px-12 py-4 hover:bg-[#369C52]"
                >
                Done
                </button>
            </div>
            </div>
        </div>
        )}

        {/* PRODUCT */}
        <div className="flex items-center gap-4 mb-7">
          <div className="relative">
            {order.product.image ? (
              <img src={order.product.image} alt={order.product.name} className="rounded-full" style={{ width: 65, height: 65, objectFit: "cover" }} />
            ) : (
              <div className="rounded-full bg-gray-100 flex items-center justify-center text-gray-500" style={{ width: 65, height: 65 }}>
                <Package size={24} />
              </div>
            )}
          </div>
          <div>
            <div className="text-[1.3rem] font-bold text-[#222A35]">{order.product.name}</div>
            <div className="text-[1rem] text-gray-600">Variation: {order.product.variation}</div>
          </div>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3 text-lg">
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

        <div className="text-gray-900 font-semibold mt-1 mb-2 text-lg">Date Ordered</div>
        <div className="text-gray-400 mb-5 text-lg">{order.dateOrdered} {order.timeOrdered}</div>

        {/* DROPDOWNS */}
        <div className="mb-2">
          <label className="font-semibold text-black text-lg mb-1 block ">Order Status</label>
          <select
            className="w-full rounded-full border px-4 py-2 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            {ORDER_STATUSES.map(os => (
              <option key={os} value={os}>{os}</option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="font-semibold text-black text-lg mb-1 block">Transaction</label>
          <select
            className="w-full rounded-full border px-4 py-2 text-lg bg-white focus:outline-none focus:ring-1 focus:ring-green-200"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
          >
            {TRANSACTIONS.map(tr => (
              <option key={tr} value={tr}>{tr}</option>
            ))}
          </select>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between gap-4 mt-10">
          <button onClick={() => setShowDisregardModal(true)} className="flex-1 bg-[#EF4444] text-white font-semibold rounded-full py-4 text-lg hover:bg-[#DC2626]">
            Disregard
          </button>
          <button onClick={() => setShowConfirmModal(true)} className="flex-1 bg-[#16A34A] text-white font-semibold rounded-full py-4 text-lg hover:bg-[#15803D]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
