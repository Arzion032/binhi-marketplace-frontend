import React from 'react'

const OrderSummary = ({subtotal, total, handleCheckout, selectedItems}) => {
  return (
    <div className="w-[400px] bg-white p-4 rounded-lg shadow border border-gray-400 flex flex-col h-fit">

          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="w-full h-[1px] bg-gray-300 mb-4" />
          
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <p>Selected Items:</p>
              <p className="text-black font-bold">{selectedItems.length}</p>

            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-black font-bold">₱{isNaN(subtotal) ? '0.00' : subtotal.toFixed(2)}</p>

            </div>
            <div className="flex justify-between text-[#4CAF50] text-2xl font-bold pt-4 pb-6 border-t border-gray-600">
              <p>Total</p>
              <p className="text-[#4CAF50] font-bold">₱{isNaN(total) ? '0.00' : total.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`mt-full w-full py-3 px-4 rounded-full text-white text-2xl font-semibold transition-colors ${
              selectedItems.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Buy Now ({selectedItems.length})
          </button>
        </div>
  )
}

export default OrderSummary