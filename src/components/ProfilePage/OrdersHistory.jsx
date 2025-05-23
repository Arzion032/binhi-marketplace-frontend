import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*Fixed-styling pu*/

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [showDetails, setShowDetails] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundReasons, setRefundReasons] = useState([]);
  const [refundNote, setRefundNote] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  // Add the missing toggleReason function
  const toggleReason = (reason) => {
    if (refundReasons.includes(reason)) {
      setRefundReasons(refundReasons.filter(item => item !== reason));
    } else {
      setRefundReasons([...refundReasons, reason]);
    }
  };

  // Add the missing handleSubmitRefund function
  const handleSubmitRefund = () => {
    // Validate form
    if (refundReasons.length === 0) {
      alert("Please select at least one reason for refund");
      return;
    }
    
    // Here you would typically send the refund data to your backend
    console.log("Submitting refund request:", {
      orderId: selectedOrder?.id,
      reasons: refundReasons,
      note: refundNote,
      file: uploadedFile
    });
    
    // Close modal and show success message
    setShowRefundModal(false);
    alert("Refund request submitted successfully!");
    
    // Reset form
    setRefundReasons([]);
    setRefundNote("");
    setUploadedFile(null);
  };

  const orders = [
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
      status: "Delivered",
      sellerName: "Carla Pasig",
      sellerProfile: "/avatar.png"
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 1,
      price: 53.0,
      status: "Pending",
      sellerName: "John Farmer",
      sellerProfile: "/avatar.png"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] px-6 py-4">
      {/* Header */}
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
  <div className="flex items-center gap-4">
    <button
      onClick={() => navigate('/userprofile')}
      className="text-gray-600 hover:text-black"
    >
      <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
    </button>

    <div className="flex flex-col">
      <h1 className="text-4xl font-bold">Order History</h1>
      <p className="text-sm text-gray-600">View your recent and past orders here.</p>
    </div>
  </div>

  <div className="flex items-center px-4">
  <div className="flex items-center bg-white border-2 border-black rounded-full px-3 py-1 w-[600px] h-14">
      <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
      <input
        type="text"
        placeholder="Search by Seller Name, Order ID, or Product Name"
        className="flex-grow text-sm bg-white"
      />
      <button>
        <img src="/mic.png" alt="Mic" className="w-5 h-5 hover:scale-110" />
      </button>
      <button>
        <img src="/camera.png" alt="Camera" className="w-5 h-5 mx-4 hover:scale-110" />
      </button>
    </div>
  </div>
</div>
      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

    {/* Orders Section */}
              <div className="bg-white mx-10 border-2 border-gray-300 rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start border-b pb-4 gap-2">
                  <div className="flex flex-wrap gap-[100px] mx-10 flex-1">
                    {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`text-xl py-2 px-2 rounded-full transition-all duration-200 ${
                          selectedTab === tab 
                            ? "bg-[#4CAE4F] text-white font-semibold" 
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
    
                  {/* Expand button */}
                </div>
                    
                {/* Order Items */}
                <div className="mt-6 space-y-6">
                  
                  {filteredOrders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
                  ) : (
                    filteredOrders.map(order => (
                  <div key={order.id} className="flex flex-col border-2 border-gray-300 transition p-4 rounded-xl bg-white shadow-sm relative">
    
                  {/* Seller Info: Profile and Name */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.sellerProfile || "/default-profile.png"} 
                        alt="Seller"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <p className="text-sm font-medium text-gray-700">{order.sellerName}</p>
                      <button className="text-gray-500 text-base font-medium px-3 py-2 rounded-full transition">
                        Click here to chat
                      </button>
                      <button className="flex items-center gap-2 hover:bg-green-700 hover:text-white text-[#4CAE4F] text-sm font-medium px-3 py-2 border border-[#4CAE4F] rounded-full transition">
                        <img src="/shoppp.png" alt="Shop" className="w-5 h-5" /> View Shop
                      </button>
                    </div>
    
                    {/* Buttons: Chat and View Shop */}
                    <div className="flex items-left gap-2">
                      <span className={`inline-block text-white text-sm text-center w-28 px-2 py-2 rounded-full ${
                      order.status === "Delivered" ? "bg-[#4CAE4F]" :
                       "bg-[#D1A157]" 
                    }`}>
                      {order.status}
                    </span>
                    </div>
                    </div>
    
                    <div className="w-full h-[2px] bg-gray-300 mb-4 mt-2" />
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-4">
                      {/* Product image */}
                      <img
                        src={order.image}
                        alt={order.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />

                      <div className="flex flex-col justify-between">
                        {/* Product name and quantity */}
                        <div>
                          <p className="text-2xl font-semibold">{order.name}</p>
                          <p className="text-sm text-gray-600">Variation: Yellow Corn</p>
                          <p className="text-lg text-gray-500 mt-4">Quantity: {order.quantity}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right section: Status and price */}
                    <div className="flex flex-col items-end justify-between h-full">
                      {order.price > 0 && (
                        <p className="text-xl font-bold">₱{order.price.toFixed(2)}</p>
                      )}
                    </div>
                    </div>
                  <div className="flex justify-end mt-6 gap-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="w-[130px] hover:bg-green-600 hover:text-white text-sm text-[#4CAE4F] font-bold py-2 px-2 border border-[#4CAE4F] rounded-full transition-all"
                  >
                    Order Details
                  </button>

                  {order.status === "Delivered" && (
                    <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowRefundModal(true);
                    }}
                      className="w-[150px] hover:bg-red-600 hover:text-white text-sm text-red-500 font-bold py-2 px-2 border border-red-500 rounded-full transition-all"
                    >
                      Request Refund
                    </button>
                  )}
                </div>
                </div>
            ))
          )}
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
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
                <span className="ml-auto text-sm text-gray-500">Order ID: 23149MF260</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={selectedOrder?.image} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-grow">
                  <div className="text-lg font-semibold">{selectedOrder?.name}</div>
                  <div className="text-sm text-gray-500 mt-1">Quantity: {selectedOrder?.quantity}</div>
                </div>
                <div className="border-l pl-4">
                  <div className="font-semibold">Refund Details</div>
                  <div className="text-green-500 mt-6">Refund Amount</div>
                  <div className="text-green-600 font-bold text-lg">₱{selectedOrder?.price?.toFixed(2)}</div>
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
                <div> 
              <p className="text-sm font-semibold mb-2">Remarks or Notes</p>
                <textarea
                  placeholder="Remarks or Notes"
                  className="flex-1 h-28 border border-black rounded-xl p-3 text-sm"
                  value={refundNote}
                  onChange={(e) => setRefundNote(e.target.value)}
                /></div>
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
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
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
              <p className="text-sm text-gray-500">Order ID: 23149MF260</p>
            </div>
          </div>
          
          <button 
          onClick={() => {
            setShowDetails(false);         // Close the Order Details modal
            setShowRefundModal(true);      // Open the Refund modal
            setSelectedOrder(selectedOrder); // (Optional) Ensure refund gets same order
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full mx-4"
        >
          Return Refund
        </button>

        </div>

        <hr className="border-green-500 mt-2" />

            <div className="border-t border-gray-300 mb-4" />

            {/* Status Tracking with Images */}
            <div className="space-y-4 mb-6">
            {["Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map((label, index, array) => {
              const statusIndex = array.indexOf(selectedOrder?.status || "Pending");
              const isActive = index <= statusIndex;

              // Determine which image to use
              const getStatusImage = (status, active) => {
                if (active) {
                  return `/${status.toLowerCase()}.png`;
                } else {
                  // Use the "not" versions for inactive statuses
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
                  {/* Icon + Label */}
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

                  {/* Timestamp (optional) */}
                  {isActive && (
                    <p className="text-lg text-gray-600">03/31/2025 9:23 AM</p>
                  )}
                </div>
              );
            })}
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
              <div className="flex justify-between">
                <p className="text-gray-500">Discount</p>
                <p className="font-medium">₱0.00</p>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2">
                <p>TOTAL</p>
                <p>₱53.00</p>
              </div>
            </div>
          </div>
        </div>
      )}

    <div className="group fixed bottom-10 right-10 z-50">
      <button
        onClick={() => navigate('/ChatPage')}
        className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative"
      >
        <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
      </button>
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        Chats
      </div>
    </div>

    </div>
  );
};

export default OrderHistory;