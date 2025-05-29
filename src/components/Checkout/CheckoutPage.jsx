import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/*Check-out Page pu*/

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const checkoutData = state?.checkoutData;

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  if (!checkoutData) {
    return <p className="text-center mt-10">No checkout data available.</p>;
  }

  const { items, subtotal, discount, tax, total } = checkoutData;

 const handleBuyNow = () => {
  navigate('/checkout-success', {
    state: {
      product: {
        items,
        subtotal,
        discount,
        tax,
        total,
        paymentMethod,
      },
    },
  });
};

  return (
    <div className="min-h-screen bg-[#F5F9F5] px-6 py-4">
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center text-gray-600 hover:text-black"
            onClick={() => navigate("/landingpage")}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>
          <p className="text-4xl font-bold">Checkout</p>
        </div>
      </div>

      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

      <div className="flex flex-col lg:flex-row gap-6 mx-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Delivery Address */}
          <section>
            <h2 className="text-2xl font-bold">Delivery Address</h2>
            <div className="p-4 flex gap-4 items-start text-lg">
              <img src="/map-pin-house.png" alt="Address" className="w-16 h-16" />
              <div>
                <p className="font-semibold">Juan Dela Cruz</p>
                <p>(+63) 948 122 9142</p>
                <p>Brgy. Mambog Binangonan, Rizal, 1940</p>
              </div>
            </div>
          </section>

          {/* Product Details */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Product Details</h2>
            {items.map((product, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-gray-600 mb-4">
                <div className="flex justify-between text-sm text-black mb-2">
                  <p className="font-medium text-base">{product.seller}</p>
                  <p>Order ID: {product.orderId}</p>
                </div>
                <div className="border mt-4 mb-3" />
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    className="w-28 h-28 rounded-lg object-cover"
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <p className="font-bold text-xl">{product.name}</p>
                      <p className="text-lg text-gray-500">Variation: {product.variation}</p>
                    </div>
                    <div className="text-lg text-right w-full">
                      <p>Price: ₱{product.price.toFixed(2)}</p>
                      <p>Quantity: ×{product.quantity}</p>
                      <p className="text-green-600 font-semibold text-xl">Subtotal: ₱{(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Payment Method */}
          <div className="w-full max-w-lg">
            <section>
              <h2 className="text-2xl font-bold mb-1">Payment Method</h2>
              <p className="text-lg text-black mb-4">
                Please select an option on how you want to pay your order.
              </p>
              <div className="w-full text-lg flex max-w-md gap-4">
                {/* Cash-on-Delivery */}
                <label
                  className={`flex-1 cursor-pointer border rounded-xl p-4 flex flex-col items-center transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-[#4CAE4F] bg-[#E6F4EA]'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="sr-only"
                  />
                  <img src="/CODD.png" alt="COD" className="w-14 h-12" />
                  <p className="text-[#4CAE4F] text-lg font-semibold">Cash-on-Delivery</p>
                </label>

                {/* GCash */}
                <label
                  className={`flex-1 cursor-pointer border rounded-xl p-4 flex flex-col items-center transition-all ${
                    paymentMethod === 'GCash'
                      ? 'border-[#4CAE4F] bg-[#E6F4EA]'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="GCash"
                    checked={paymentMethod === 'GCash'}
                    onChange={() => setPaymentMethod('GCash')}
                    className="sr-only"
                  />
                  <img src="/GCASHH.png" alt="GCash" className="w-14 h-12" />
                  <p className="text-blue-600 text-lg font-semibold">GCash</p>
                </label>
              </div>

              <div className="flex gap-14 mt-2 pl-2 text-lg">
                <label className="flex items-center gap-4 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center gap-4 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="payment"
                    value="GCash"
                    checked={paymentMethod === 'GCash'}
                    onChange={() => setPaymentMethod('GCash')}
                  />
                  GCash
                </label>
              </div>
            </section>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 border border-gray-600 rounded-2xl flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
          <div className="w-full h-[1px] bg-gray-300 mb-4" />
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-black font-medium">₱{subtotal.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p className="text-green-600">-₱{discount}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p className="text-red-600">₱{tax}</p>
            </div>
            <div className="flex justify-between text-2xl font-bold pt-4 border-t mt-6">
              <p>Total</p>
              <p className="text-[#4CAE4F]">₱{total}</p>
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-6 w-full py-3 px-4 text-2xl rounded-full text-white text-lg font-semibold bg-green-600 hover:bg-green-700 transition-colors"
          >
            Buy Now ({items.length})
          </button>
        </div>

        {/* Chat Button */}
        <div className="group fixed bottom-10 right-10 z-50">
          <button
            onClick={() => navigate('/ChatPage')}
            className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative transition-colors"
          >
            <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Chats
          </div>
        </div>
      </div>
    </div>
  );
}
