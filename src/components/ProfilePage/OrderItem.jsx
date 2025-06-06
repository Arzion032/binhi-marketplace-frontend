import React from 'react';
import { BASE_URL } from '../../constants';
import Juan from '../../assets/Juan.png'
const OrderItem = ({
  order,
  setSelectedOrder,
  setShowViewOrderModal,
  setShowCancelModal,
  setShowReturnRefundModal,
  canCancelOrder,
  getStatusColor,
}) => {
  return (
    <div key={order.id} className="flex flex-col border-2 border-gray-300 transition p-4 rounded-xl bg-white shadow-sm relative">
      {/* Seller Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img
            src={order.sellerProfile ? `${BASE_URL}${order.sellerProfile}` : Juan}
            alt="Seller"
            className="w-10 h-10 rounded-full object-cover"
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
          <span className="text-sm text-gray-600">Order ID: {order.orderId || order.id.slice(0, 8)}</span>
          <span className={`inline-block text-white text-sm text-center w-28 px-2 py-2 rounded-full ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="w-full h-[2px] bg-gray-300 mb-4 mt-2" />
      
      {/* Order Items Table */}
      <div className="mb-4">
        <div className="grid grid-cols-5 gap-4 pb-2 border-b border-gray-200 text-sm font-medium text-gray-700">
          <div>Product</div>
          <div>Variation</div>
          <div>Unit Price</div>
          <div>Quantity</div>
          <div className="text-right">Subtotal</div>
        </div>
        
        {order.items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <img
                src={`${BASE_URL}${item.image?.image || item.image}`}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
                />
              <span className="font-medium">{item.name}</span>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-sm">Variation: {item.variation}</span>
              <span className="text-sm text-gray-500">Unit: per kg</span>
            </div>
            
            <div className="flex items-center">
              <span>₱{parseFloat(item.price).toFixed(2)}</span>
            </div>
            
            <div className="flex items-center">
              <span>×{item.quantity}</span>
            </div>
            
            <div className="flex items-center justify-end">
              <span className="font-semibold text-[#4CAE4F]">
                ₱{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Total */}
      <div className="flex justify-end mb-4">
        <div className="text-right">
          <p className="text-lg font-bold text-[#4CAE4F]">
            Order Total ({order.items.length} item{order.items.length > 1 ? 's' : ''}): ₱{parseFloat(order.total_price).toFixed(2)}
          </p>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
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
  );
};

export default OrderItem;
