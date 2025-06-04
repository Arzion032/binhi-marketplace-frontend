import React from 'react';

const OrderDetailsModal = ({ 
  showDetails, 
  setShowDetails, 
  selectedOrder, 
  setShowCancelModal, 
  setShowRefundModal, 
  canCancelOrder 
}) => {
  if (!showDetails || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[1000px] p-6 shadow-lg relative border-t-4 border-[#4CAE4F]">
        <button
          className="absolute top-2 right-5 text-gray-500 hover:text-black text-2xl mb-2"
          onClick={() => setShowDetails(false)}
        >
          &times;
        </button>
        <div className="flex justify-between items-center mb-2 mt-2">
          <div className="flex items-center gap-2">
            <img src="/receipt.png" alt="Receipt" className="w-8 h-8" />
            <div>
              <h2 className="text-3xl font-bold">Order Details</h2>
              <p className="text-sm text-gray-500">Order ID: {selectedOrder?.orderId}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {canCancelOrder(selectedOrder.status) && (
              <button 
                onClick={() => {
                  setShowDetails(false);
                  setShowCancelModal(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2 rounded-full mx-2"
              >
                Cancel Order
              </button>
            )}

            {selectedOrder.status === "Delivered" && (
              <button 
                onClick={() => {
                  setShowDetails(false);
                  setShowRefundModal(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full mx-2"
              >
                Return Refund
              </button>
            )}
          </div>
        </div>

        <hr className="border-green-500 mt-2" />
        <div className="border-t border-gray-300 mb-4" />

        {/* Product Details Section */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-4">
            <img src={selectedOrder.image} alt={selectedOrder.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{selectedOrder.name}</h3>
              <p className="text-gray-600">Variation: {selectedOrder.variation}</p>
              <p className="text-gray-600">Weight: {selectedOrder.weight} kg</p>
              <p className="text-gray-600">Quantity: {selectedOrder.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Unit Price</p>
              <p className="text-xl font-bold">₱{selectedOrder.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <hr className="border-green-500 mt-2" />
        <div className="border-t border-gray-300 mb-4" />

        {/* Status Tracking with Images */}
        <div className="space-y-4 mb-6">
          {selectedOrder.status === "Cancelled" ? (
            // Show cancelled status
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/cancelled.png" alt="Cancelled" className="w-12 h-12" />
                <p className="text-red-500 text-lg font-semibold">Order Cancelled</p>
              </div>
              <p className="text-lg text-gray-600">03/31/2025 9:23 AM</p>
            </div>
          ) : (
            // Show normal status progression
            ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map((label, index, array) => {
              const statusIndex = array.indexOf(selectedOrder?.status || "Pending");
              const isActive = index <= statusIndex;

              const getStatusImage = (status, active) => {
                if (active) {
                  return `/${status.toLowerCase()}.png`;
                } else {
                  switch(status.toLowerCase()) {
                    case 'confirmed':
                      return '/notconfirmed.png';
                    case 'processing':
                      return '/notprocessing.png';
                    case 'shipped':
                      return '/notshipped.png';
                    case 'delivered':
                      return '/notdelivered.png';
                    default:
                      return `/${status.toLowerCase()}.png`;
                  }
                }
              };

              return (
                <div key={label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={getStatusImage(label, isActive)}
                      alt={label}
                      className="w-12 h-12"
                    />
                    <p className={`${isActive ? "text-[#4CAE4F] text-lg font-semibold" : "text-gray-400 text-lg"}`}>
                      {label}
                    </p>
                  </div>
                  {isActive && (
                    <p className="text-lg text-gray-600">03/31/2025 9:23 AM</p>
                  )}
                </div>
              );
            })
          )}
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
          <div className="flex justify-between text-xl font-bold mt-2">
            <p>TOTAL</p>
            <p>₱53.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;