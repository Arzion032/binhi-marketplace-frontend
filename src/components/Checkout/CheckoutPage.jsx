import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../constants';

/*Check-out Page with Delivery Method*/

export default function CheckoutPage({}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const checkoutData = state?.checkoutData;

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [deliveryMethod, setDeliveryMethod] = useState('Pick-up');
  const [pickupLocation, setPickupLocation] = useState("President's Location");
  const [deliveryFee, setDeliveryFee] = useState(0);

  if (!checkoutData) {
    return <p className="text-center mt-10">No checkout data available.</p>;
  }

  const { items, subtotal, total } = checkoutData;
  const newTotal = total + deliveryFee;

  const handleBuyNow = () => {
    navigate('/checkout-success', {
      state: {
        product: {
          items,
          subtotal,
          total: newTotal,
          paymentMethod,
          deliveryMethod,
          pickupLocation: deliveryMethod === 'Pick-up' ? pickupLocation : null,
          deliveryFee,
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
            onClick={() => navigate("/cartpage")}
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
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-400 mb-4">
                  <div className="flex justify-between text-sm text-black mb-2">
                    <p className="font-medium text-base">{product.vendor_name}</p>
                    <p>Order ID: 123</p>
                  </div>
                  <div className="border mt-4 mb-3" />
                  <div className="flex gap-4">
                    <img
                      src={BASE_URL + product.variation.main_image}
                      className="w-28 h-28 rounded-lg object-cover"
                      alt={product.variation.product.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <p className="font-bold text-xl">{product.name}</p>
                        <p className="text-lg text-gray-500">Variation: {product.variation.name}</p>
                        <p className="text-sm text-gray-400">
                          Unit: per kg
                        </p>
                      </div>
                      <div className="text-lg text-right w-full">
                        <p>Price: ₱{parseFloat(product.variation.unit_price).toFixed(2)} per pc</p>
                        <p>Quantity: ×{product.quantity}</p>
                        <p className="text-green-600 font-semibold text-xl">Subtotal: ₱{(product.variation.unit_price * product.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

          {/* Delivery Method and Payment Method Side by Side */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Delivery Method */}
            <section className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Delivery Method</h2>
              <p className="text-lg text-black mb-4">
                Please select an option on how you want to claim your order.
              </p>
              
              {/* Main Delivery Method Selection */}
              <div className="space-y-4 mb-6">
                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  deliveryMethod === 'Pick-up' 
                    ? 'border-[#4CAE4F] bg-[#E6F4EA]' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="Pick-up"
                    checked={deliveryMethod === 'Pick-up'}
                    onChange={() => setDeliveryMethod('Pick-up')}
                    className="w-5 h-5 text-[#4CAE4F]"
                  />
                  <div className="flex items-center gap-3">
                    <img src="/map-pin-house.png" alt="Pick-up" className="w-8 h-8" />
                    <span className="text-lg font-semibold">Pick-up</span>
                  </div>
                </label>

                 {/* Pick-up Location Dropdown */}
              {deliveryMethod === 'Pick-up' && (
                <div className="ml-6 mb-4">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">Pick-up Location:</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white hover:border-[#4CAE4F] focus:border-[#4CAE4F] focus:outline-none focus:ring-2 focus:ring-[#4CAE4F] focus:ring-opacity-20 text-lg"
                  >
                    <option value="President's Location">President's Location</option>
                    <option value="Farmer's Location">Farmer's Location</option>
                  </select>
                </div>
              )}

                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                  deliveryMethod === 'Delivery' 
                    ? 'border-[#4CAE4F] bg-[#E6F4EA]' 
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="Delivery"
                    checked={deliveryMethod === 'Delivery'}
                    onChange={() => setDeliveryMethod('Delivery')}
                    className="w-5 h-5 text-[#4CAE4F]"
                  />
                  <div className="flex items-center gap-3">
                    <img src="/delivery.png" alt="Delivery" className="w-8 h-8" />
                    <span className="text-lg font-semibold">Delivery</span>
                    {deliveryMethod === 'Delivery' && (
                      <span className="text-sm text-gray-600 ml-2">
                        (Fee: ₱500, Total Weight: 500kg)
                      </span>
                    )}
                  </div>
                </label>
              </div>

             

              {/* Delivery Fee Information */}
              {deliveryMethod === 'Delivery' && (
                <div className="ml-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Delivery Information</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Base delivery fee: ₱30</p>
                    <p>• Additional ₱10 for every 5kg above the first 5kg</p>
                    <p>• Total weight: 150kg</p>
                    <p className="font-semibold text-base">• Your delivery fee: ₱{deliveryFee}</p>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Payment Method</h2>
              <p className="text-lg text-black mb-4">
                Please select an option on how you want to pay your order.
              </p>
              <div className="w-full text-lg flex gap-4 mb-4">
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

              <div className="flex gap-14 pl-2 text-lg">
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
        <div className="w-full lg:w-1/3 bg-white p-6 border border-gray-400 rounded-2xl flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
          <div className="w-full h-[1px] bg-gray-300 mb-4" />
          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-black font-medium">₱{subtotal.toFixed(0)}</p>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p className="text-orange-600">₱{deliveryFee}</p>
              </div>
            )}
            <div className="flex justify-between text-2xl font-bold pt-4 border-t mt-6">
              <p>Total</p>
              <p className="text-[#4CAE4F]">₱{newTotal}</p>
            </div>
          </div>

          {/* Delivery Method Summary */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm font-semibold text-gray-700">Selected Options:</p>
            <p className="text-sm text-gray-600">
              {deliveryMethod === 'Pick-up' 
                ? `Pick-up at ${pickupLocation}` 
                : `Delivery (₱${deliveryFee} fee)`
              }
            </p>
            <p className="text-sm text-gray-600">Payment: {paymentMethod}</p>
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