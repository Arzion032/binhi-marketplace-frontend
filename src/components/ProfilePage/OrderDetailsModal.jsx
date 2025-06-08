import React from 'react';

const OrderDetailsModal = ({ 
  showDetails, 
  setShowDetails, 
  selectedOrder, 
  setShowCancelModal, 
  setShowRefundModal, 
  canCancelOrder 
}) => {
  const [showProductDetails, setShowProductDetails] = React.useState(false);
  const [showDeliveryAddress, setShowDeliveryAddress] = React.useState(false);

  if (!showDetails || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[850px] p-8 relative">
        <button
          className="absolute top-4 right-6 text-2xl"
          onClick={() => setShowDetails(false)}
        >
          &times;
        </button>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <img src="/receipt.png" alt="Receipt" className="w-8 h-8" />
            <div>
              <h2 className="text-3xl font-black">Order Details</h2>
              <p className="text-sm text-gray-600 mt-1">Order ID: {selectedOrder?.orderId}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {canCancelOrder(selectedOrder.status) && (
              <button 
                onClick={() => {
                  setShowDetails(false);
                  setShowCancelModal(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full"
              >
                Cancel Order
              </button>
            )}

            {selectedOrder.status === "delivered" && (
              <button 
                onClick={() => {
                  setShowDetails(false);
                  setShowRefundModal(true);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full"
              >
                Request Refund
              </button>
            )}
          </div>
        </div>

        <hr />

        {/* Product Details Button */}
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="flex items-center gap-4">
            <img src={selectedOrder.image} alt={selectedOrder.name} className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <h3 className="text-lg font-semibold">{selectedOrder.name}</h3>
              <p className="text-sm text-gray-500">Qty: {selectedOrder.quantity} • ₱{selectedOrder.total_price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <button
            onClick={() => setShowProductDetails(true)}
            className="bg-[#4CAE4F] hover:bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full"
          >
            View Details
          </button>
        </div>

        {/* Status Tracking with Images */}
        <div className="border border-gray-400 rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold mb-4">Order Status</p>
          <div className="space-y-4">
            {selectedOrder.status === "cancelled" ? (
              // Show cancelled status
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src="/cancelled.png" alt="Cancelled" className="w-12 h-12" />
                  <p className="text-red-500 text-lg font-semibold">Order Cancelled</p>
                </div>
                <p className="text-sm text-gray-500">03/31/2025 9:23 AM</p>
              </div>
            ) : (
              // Show normal status progression
["Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map((label, index, array) => {
  // Find the index of the current order status (case-insensitive comparison)
  const currentStatus = selectedOrder?.status || "Pending";
  const statusIndex = array.findIndex(status => 
    status.toLowerCase() === currentStatus.toLowerCase()
  );
  
  // Status is active if current index is less than or equal to the order's status index
  const isActive = index <= statusIndex;

  const getStatusImage = (status, active) => {
    const statusLower = status.toLowerCase();
    if (active) {
      return `/${statusLower}.png`; // Active status - no "not" prefix
    } else {
      // Inactive status - add "not" prefix for statuses that have it
      switch (statusLower) {
        case 'confirmed':
          return '/notconfirmed.png';
        case 'processing':
          return '/notprocessing.png';
        case 'shipped':
          return '/notshipped.png';
        case 'delivered':
          return '/notdelivered.png';
        case 'pending':
          return '/notpending.png'; // Added this case
        default:
          return `/${statusLower}.png`;
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
                      <p className={`${isActive ? "text-[#4CAE4F] font-semibold" : "text-gray-400"}`}>
                        {label}
                      </p>
                    </div>
                    {isActive && (
                      <p className="text-sm text-gray-500">03/31/2025 9:23 AM</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Delivery Address Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src="/pin.png" alt="Pin" className="w-8 h-8" />
            <div>
              <p className="text-[#4CAE4F] font-semibold">Delivery Address</p>
              <p className="text-sm text-gray-500">Juan Dela Cruz • Binangonan, Rizal</p>
            </div>
          </div>
          <button
            onClick={() => setShowDeliveryAddress(true)}
            className="bg-[#4CAE4F] hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-full"
          >
            View Address
          </button>
        </div>

        {/* Price Summary */}
        <div className="border border-gray-400 rounded-xl p-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <p className="text-black">Subtotal</p>
              <p>₱53.00</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-black">Delivery Fee</p>
              <p>₱53.00</p>
            </div>
            <div className="flex justify-between text-[#4CAE4F] text-2xl font-black mt-2">
              <p>TOTAL</p>
              <p>₱53.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {showProductDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl w-[600px] p-8 relative">
            <button
              className="absolute top-4 right-6 text-2xl"
              onClick={() => setShowProductDetails(false)}
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <hr className="mb-4" />
            
            <div className="flex items-center gap-4 mb-4">
              <img src={selectedOrder.image} alt={selectedOrder.name} className="w-32 h-32 rounded-lg object-cover" />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-2">{selectedOrder.name}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Variation:</span> {selectedOrder.variation}</p>
                  <p><span className="font-medium">Weight:</span> {selectedOrder.weight} kg</p>
                  <p><span className="font-medium">Quantity:</span> {selectedOrder.quantity}</p>
                  <p><span className="font-medium">Unit Price:</span> ₱{selectedOrder.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p><span className="font-medium">Total:</span> ₱{(selectedOrder.price * selectedOrder.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Address Modal */}
      {showDeliveryAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl w-[500px] p-8 relative">
            <button
              className="absolute top-4 right-6 text-2xl"
              onClick={() => setShowDeliveryAddress(false)}
            >
              &times;
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <img src="/pin.png" alt="Pin" className="w-8 h-8" />
              <h2 className="text-2xl font-bold text-[#4CAE4F]">Delivery Address</h2>
            </div>
            <hr className="mb-4" />
            
            <div className="space-y-2">
              <p className="text-lg font-semibold">Juan Dela Cruz</p>
              <p className="text-gray-600">(+63) 948 122 9142</p>
              <p className="text-gray-600">Brgy. Mambog Binangonan, Rizal, 1940</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;
