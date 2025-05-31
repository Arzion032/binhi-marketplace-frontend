// CancelOrderModal.jsx
import React from 'react';

const CancelOrderModal = ({ selectedOrder, cancelReasons, cancelNote, toggleCancelReason, setCancelNote, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[850px] p-8 relative">
        <button className="absolute top-4 right-6 text-2xl" onClick={onClose}>&times;</button>

        <h2 className="text-3xl font-bold">Cancel Order</h2>
        <p className="text-sm text-gray-600 mt-1 mb-6">Please fill the form to cancel your order.</p>
        <hr />  
        <p className="text-lg font-bold mt-4">Item(s) you want to cancel.</p>
        <div className="border border-black rounded-xl mt-2 p-4">
          <div className="flex items-center mb-3 gap-2">
            <img src="/avatar.png" className="w-6 h-6 rounded-full" />
            <span className="text-sm font-medium">{selectedOrder?.sellerName}</span>
            <span className="ml-auto text-sm text-gray-500">Order ID: {selectedOrder?.orderId}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={selectedOrder?.image} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-grow">
              <div className="text-lg font-semibold">{selectedOrder?.name}</div>
              <div className="text-sm text-gray-500 mt-1">Quantity: {selectedOrder?.quantity}</div>
            </div>
            <div className="border-l pl-4">
              <div className="font-semibold">Order Details</div>
              <div className="text-orange-500 mt-6">Order Amount</div>
              <div className="text-orange-600 font-bold text-lg">₱{selectedOrder?.price?.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="border border-black mt-4 rounded-xl p-4">
          <p className="text-sm font-semibold mb-2">Why do you want to cancel?</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-4">
            {['Changed my mind', 'Found a better deal', 'Ordered by mistake', 'Payment issues', 'Others'].map((reason) => (
              <label key={reason} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cancelReasons.includes(reason)}
                  onChange={() => toggleCancelReason(reason)}
                  className="w-4 h-4"
                />
                {reason}
              </label>
            ))}
          </div>
          <div> 
            <p className="text-sm font-semibold mb-2">Additional Notes (Optional)</p>
            <textarea
              placeholder="Tell us more about why you're cancelling this order..."
              className="w-full h-28 border border-black rounded-xl p-3 text-sm"
              value={cancelNote}
              onChange={(e) => setCancelNote(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold">Keep Order</button>
          <button onClick={onSubmit} className="bg-orange-500 text-white px-6 py-4 rounded-full font-bold">Cancel Order</button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
