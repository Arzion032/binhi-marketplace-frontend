import React from "react";

const CheckoutSidebar = ({
  subtotal,
  deliveryFee,
  newTotal,
  items,
  deliveryMethod,
  setDeliveryMethod,
  pickupLocation,
  setPickupLocation,
  paymentMethod,
  setPaymentMethod,
  handleBuyNow
}) => {
  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-5">
      {/* Order Summary */}
      <div className="bg-white p-4 border border-gray-400 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">Order Summary</h2>
        <div className="w-full h-[1px] bg-gray-300 mb-4" />

        <div className="space-y-3 text-base">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="text-black font-medium">
              ₱{subtotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </p>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p className="text-orange-600">₱{deliveryFee}</p>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold pt-3 border-t mt-5">
            <p>Total</p>
            <p className="text-[#4CAE4F]">
              ₱{newTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm font-semibold text-gray-700">Selected Options:</p>
          <p className="text-sm text-gray-600">
            {deliveryMethod === "Pick-up"
              ? `Pick-up at ${pickupLocation}`
              : `Delivery`}
          </p>
          <p className="text-sm text-gray-600">Payment: {paymentMethod}</p>
        </div>

        <button
          onClick={handleBuyNow}
          className="mt-5 w-full py-3 px-4 text-xl rounded-full text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors"
        >
          Buy Now ({items.length})
        </button>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-4 border border-gray-300 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">Payment Method</h2>
        <p className="text-base text-black mb-4">Please select how you want to pay.</p>
        <div className="w-full text-base flex gap-3 mb-4">
          {["Cash on Delivery", "GCash"].map((option) => (
            <label
              key={option}
              className={`flex-1 cursor-pointer border rounded-xl p-3 flex flex-col items-center transition-all ${
                paymentMethod === option
                  ? "border-[#4CAE4F] bg-[#E6F4EA]"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={option}
                checked={paymentMethod === option}
                onChange={() => setPaymentMethod(option)}
                className="sr-only"
              />
              <img
                src={option === "GCash" ? "/GCASHH.png" : "/CODD.png"}
                alt={option}
                className="w-12 h-10"
              />
              <p
                className={`text-base font-semibold ${
                  option === "GCash" ? "text-blue-600" : "text-[#4CAE4F]"
                }`}
              >
                {option}
              </p>
            </label>
          ))}
        </div>
      </div>

      {/* Delivery Method */}
      <div className="bg-white p-4 border border-gray-300 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">Delivery Method</h2>
        <p className="text-base text-black mb-4">Please select how you want to receive your order.</p>

        <div className="space-y-3 mb-5">
          {/* Delivery */}
          <label
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
              deliveryMethod === "Delivery"
                ? "border-[#4CAE4F] bg-[#E6F4EA]"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="deliveryMethod"
              value="Delivery"
              checked={deliveryMethod === "Delivery"}
              onChange={() => setDeliveryMethod("Delivery")}
              className="w-5 h-5 text-[#4CAE4F]"
            />
            <div className="flex items-center gap-2">
              <img src="/delivery.png" alt="Delivery" className="w-7 h-7" />
              <span className="text-base font-semibold">Delivery</span>
            </div>
          </label>

            {/* Pick-up */}
          <label
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
              deliveryMethod === "Pick-up"
                ? "border-[#4CAE4F] bg-[#E6F4EA]"
                : "border-gray-300 bg-white hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name="deliveryMethod"
              value="Pick-up"
              checked={deliveryMethod === "Pick-up"}
              onChange={() => setDeliveryMethod("Pick-up")}
              className="w-5 h-5 text-[#4CAE4F]"
            />
            <div className="flex items-center gap-2">
              <img src="/map-pin-house.png" alt="Pick-up" className="w-7 h-7" />
              <span className="text-base font-semibold">Pick-up</span>
            </div>
          </label>

          {deliveryMethod === "Pick-up" && (
            <div className="ml-4 mb-3">
              <label className="block text-base font-semibold text-gray-700 mb-2">Pick-up Location:</label>
              <select
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg bg-white hover:border-[#4CAE4F] focus:border-[#4CAE4F] focus:outline-none focus:ring-2 focus:ring-[#4CAE4F] focus:ring-opacity-20 text-base"
              >
                <option value="President's Location">President's Location</option>
                <option value="Farmer's Location">Farmer's Location</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
