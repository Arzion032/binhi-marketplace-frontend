import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/*Check-out Success with Delivery Fee and Weight Display*/

export default function CheckOutSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { product } = state || {};

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-center mt-10 text-lg text-gray-600">No order data available.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isMultiple = Array.isArray(product.items);
  const displayTotal = isMultiple ? product.total : product.total || (product.quantity * product.price);
  
  // Calculate total weight
  const calculateTotalWeight = () => {
    if (isMultiple) {
      return product.items.reduce((total, item) => {
        const itemWeight = item.weight || 1;
        return total + (itemWeight * item.quantity);
      }, 0);
    } else {
      const itemWeight = product.weight || 1;
      return itemWeight * product.quantity;
    }
  };

  const totalWeight = calculateTotalWeight();

  return (
    <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center border justify-center px-6 text-center">
      <img 
        src="/Done.png" 
        alt="Success" 
        className="w-18 h-18 mb-2"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <h1 className="text-3xl font-bold text-gray-800">Order Successful!</h1>
      <p className="text-lg text-black mb-4">Thank you for purchasing!</p>

      <div className="bg-white rounded-xl shadow-lg p-6 w-[1500px] max-w-4xl border border-gray-400 text-left mb-8">
        <h2 className="font-bold text-2xl mb-4 text-center">Order Summary</h2>

        {/* Delivery Method and Payment Method Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Delivery Method:</p>
              <p className="text-gray-600">
                {product.deliveryMethod === 'Pick-up' 
                  ? `Pick-up at ${product.pickupLocation || 'Selected Location'}` 
                  : 'Delivery'
                }
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Payment Method:</p>
              <p className="text-gray-600">{product.paymentMethod || 'Cash on Delivery'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isMultiple ? (
            product.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 border-b pb-4">
                <img 
                  src={item.image} 
                  alt="Product" 
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-500">Variation: {item.variation}</p>
                  <p className="text-gray-700">Quantity: ×{item.quantity}</p>
                  <p className="text-gray-700">Unit Weight: {item.weight || 1}kg</p>
                  <p className="text-gray-700">Total Weight: {((item.weight || 1) * item.quantity).toFixed(2)}kg</p>
                  <p className="text-gray-700">Price: ₱{item.price.toFixed(2)} each</p>
                  <p className="font-semibold text-green-600">Subtotal: ₱{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex gap-4 mb-4">
              <img 
                src={product.image} 
                alt="Product" 
                className="w-20 h-20 rounded-lg object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png';
                }}
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-base">{product.name}</p>
                <p className="text-gray-500">Variation: {product.variation}</p>
                <p className="text-gray-700">Quantity: ×{product.quantity}</p>
                <p className="text-gray-700">Unit Weight: {product.weight || 1}kg</p>
                <p className="text-gray-700">Total Weight: {totalWeight.toFixed(2)}kg</p>
                <p className="text-gray-700">Price: ₱{product.price.toFixed(2)} each</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Calculations */}
        <div className="space-y-2 text-lg border-t pt-4">
          <div className="flex justify-between">
            <span>Total Weight:</span>
            <span className="font-semibold">{totalWeight.toFixed(2)}kg</span>
          </div>
          
          {product.subtotal && (
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₱{product.subtotal.toFixed(2)}</span>
            </div>
          )}
          
          {product.deliveryFee !== undefined && product.deliveryFee > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Delivery Fee:</span>
              <span>₱{product.deliveryFee.toFixed(2)}</span>
            </div>
          )}
          
          {product.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₱{product.discount.toFixed(2)}</span>
            </div>
          )}
          
          {product.tax > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Tax:</span>
              <span>₱{product.tax.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="border-t mt-2 pt-4 flex justify-between text-2xl font-bold text-green-600">
          <span>Total</span>
          <span>₱{displayTotal.toFixed(2)}</span>
        </div>

        {/* Delivery Fee Breakdown (if applicable) */}
        {product.deliveryMethod === 'Delivery' && product.deliveryFee > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Delivery Fee Breakdown</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• Base delivery fee: ₱30</p>
              <p>• Additional ₱10 for every 5kg above the first 5kg</p>
              <p>• Your total weight: {totalWeight.toFixed(2)}kg</p>
              <p className="font-semibold">• Total delivery fee: ₱{product.deliveryFee.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-12 py-3 rounded-full border-2 border-[#4CAE4F] text-[#4CAE4F] hover:bg-[#E6F4EA] transition-colors font-medium mb-2"
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/orderhistory')}
          className="px-12 py-3 rounded-full bg-[#4CAE4F] text-white hover:bg-green-700 transition-colors font-medium mb-2"
        >
          Check my Orders
        </button>
      </div>
    </div>
  );
}