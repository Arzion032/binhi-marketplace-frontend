import React, { useState } from 'react';

const ReturnRefundModal = ({ 
  showRefundModal, 
  setShowRefundModal, 
  showCancelModal, 
  setShowCancelModal, 
  selectedOrder, 
  calculateTotal 
}) => {
  const [refundReasons, setRefundReasons] = useState([]);
  const [refundNote, setRefundNote] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cancelReasons, setCancelReasons] = useState([]);
  const [cancelNote, setCancelNote] = useState("");

  // Toggle functions
  const toggleReason = (reason) => {
    if (refundReasons.includes(reason)) {
      setRefundReasons(refundReasons.filter(item => item !== reason));
    } else {
      setRefundReasons([...refundReasons, reason]);
    }
  };

  const toggleCancelReason = (reason) => {
    if (cancelReasons.includes(reason)) {
      setCancelReasons(cancelReasons.filter(item => item !== reason));
    } else {
      setCancelReasons([...cancelReasons, reason]);
    }
  };

  // Handle refund submission
  const handleSubmitRefund = () => {
    if (refundReasons.length === 0) {
      alert("Please select at least one reason for refund");
      return;
    }
    
    console.log("Submitting refund request:", {
      orderId: selectedOrder?.id,
      reasons: refundReasons,
      note: refundNote,
      file: uploadedFile
    });
    
    setShowRefundModal(false);
    alert("Refund request submitted successfully!");
    
    setRefundReasons([]);
    setRefundNote("");
    setUploadedFile(null);
  };

  // Handle cancel order
  const handleCancelOrder = () => {
    if (cancelReasons.length === 0) {
      alert("Please select at least one reason for cancellation");
      return;
    }
    
    console.log("Submitting cancel request:", {
      orderId: selectedOrder?.id,
      reasons: cancelReasons,
      note: cancelNote
    });
    
    setShowCancelModal(false);
    alert("Order cancelled successfully!");
    
    setCancelReasons([]);
    setCancelNote("");
  };

  // Refund Modal
  if (showRefundModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl w-[850px] p-8 relative">
          <button
            className="absolute top-4 right-6 text-2xl"
            onClick={() => setShowRefundModal(false)}
          >
            &times;
          </button>
          
          <h2 className="text-3xl font-bold">Request a Refund</h2>
          <p className="text-sm text-gray-600 mt-1 mb-6">Please fill the form to request a refund.</p>
          <hr />  
          <p className="text-lg font-bold mt-4">Item(s) you want to refund.</p>
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
                <div className="text-sm text-gray-500 mt-1">Variation: {selectedOrder?.variation}</div>
                <div className="text-sm text-gray-500">Weight: {selectedOrder?.weight} kg</div>
                <div className="text-sm text-gray-500">Quantity: {selectedOrder?.quantity}</div>
              </div>
              <div className="border-l pl-4">
                <div className="font-semibold">Refund Details</div>
                <div className="text-sm text-gray-500 mt-2">Item Total: ₱{(selectedOrder?.price * selectedOrder?.quantity).toFixed(2)}</div>
                <div className="text-green-500 mt-2">Refund Amount</div>
                <div className="text-green-600 font-bold text-lg">₱{calculateTotal(selectedOrder).toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="border border-black mt-4 rounded-xl p-4">
            <p className="text-sm font-semibold mb-2">Why do you want to refund?</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-4">
              {['Wrong item received', 'Item is damaged/defective', 'Missing parts/accessories', 'Item did not arrive', 'Others'].map((reason) => (
                <label key={reason} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={refundReasons.includes(reason)}
                    onChange={() => toggleReason(reason)}
                    className="w-4 h-4"
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex-1"> 
                <p className="text-sm font-semibold mb-2">Remarks or Notes</p>
                <textarea
                  placeholder="Remarks or Notes"
                  className="w-full h-28 border border-black rounded-xl p-3 text-sm"
                  value={refundNote}
                  onChange={(e) => setRefundNote(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <p className="text-sm font-semibold mb-2">Upload Image or Video</p>
                <label className="h-28 border-2 border-black border-dashed rounded-xl flex items-center justify-center text-center text-sm text-gray-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                  Click here to choose a file or drag & drop it here
                </label>
                {uploadedFile && <p className="text-sm text-gray-600 mt-1">File: {uploadedFile.name}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setShowRefundModal(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-bold"
            >
              Cancel Request
            </button>
            <button
              onClick={handleSubmitRefund}
              className="bg-[#4CAE4F] text-white px-6 py-4 rounded-full font-bold"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Cancel Order Modal
  if (showCancelModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white rounded-2xl w-[850px] p-8 relative">
          <button
            className="absolute top-4 right-6 text-2xl"
            onClick={() => setShowCancelModal(false)}
          >
            &times;
          </button>
          
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
                <div className="text-sm text-gray-500 mt-1">Variation: {selectedOrder?.variation}</div>
                <div className="text-sm text-gray-500">Weight: {selectedOrder?.weight} kg</div>
                <div className="text-sm text-gray-500">Quantity: {selectedOrder?.quantity}</div>
              </div>
              <div className="border-l pl-4">
                <div className="font-semibold">Order Details</div>
                <div className="text-sm text-gray-500 mt-2">Subtotal: ₱{(selectedOrder?.price * selectedOrder?.quantity).toFixed(2)}</div>
                <div className="text-sm text-gray-500">Delivery: ₱{selectedOrder?.deliveryFee?.toFixed(2)}</div>
                <div className="text-orange-500 mt-2">Order Amount</div>
                <div className="text-orange-600 font-bold text-lg">₱{calculateTotal(selectedOrder).toFixed(2)}</div>
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
            <button
              onClick={() => setShowCancelModal(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-full font-bold"
            >
              Keep Order
            </button>
            <button
              onClick={handleCancelOrder}
              className="bg-orange-500 text-white px-6 py-4 rounded-full font-bold"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ReturnRefundModal;