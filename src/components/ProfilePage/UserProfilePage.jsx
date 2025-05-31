import React, { useState } from 'react'
import { Expand, X, Check } from 'lucide-react';


const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  
  // Updated navigate function - you can replace this with your actual routing logic
  const navigate = (path) => {
    // For React Router, you would use: navigate(path);
    // For Next.js, you would use: router.push(path);
    // For now, this is a placeholder that actually navigates to order history
    if (path === '/OrderHistory') {
      // Replace this with your actual navigation logic
      window.location.href = '/OrderHistory';
    } else {
      console.log(`Navigating to: ${path}`);
      // For demo purposes, showing alert for other paths
      alert(`Would navigate to: ${path}`);
    }
  };
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "Juan Dela Cruz",
    contactNo: "091234567891",
    address: "Manila City",
    email: "juandelacruz@gmail.com",
    occupation: "Farmer"
  });

  // Temporary state for editing
  const [editData, setEditData] = useState({...profileData});
  
  // Password states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEditClick = () => {
    setEditData({...profileData});
    setShowEditModal(true);
  };

  const handleModalDiscard = () => {
    setShowConfirmDiscard(true);
  };

  const confirmDiscard = () => {
    setEditData({...profileData});
    setShowEditModal(false);
    setShowConfirmDiscard(false);
  };

  const handleModalConfirm = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'contactNo', 'address', 'email'];
    const emptyFields = requiredFields.filter(field => !editData[field].trim());
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save changes
    setProfileData({...editData});
    setShowEditModal(false);
    setShowSuccessModal(true);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordDiscard = () => {
    setShowPasswordConfirm(true);
  };

  const confirmPasswordDiscard = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordModal(false);
    setShowPasswordConfirm(false);
  };

  const handlePasswordConfirm = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setShowPasswordModal(false);
    setShowPasswordSuccessModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const orders = [
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.00,
      status: "Delivered",
      sellerName: "Farm Fresh Co.",
      sellerProfile: "/seller1.png"
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 1,
      price: 53.00,
      status: "Pending",
      sellerName: "Corn Valley Farm",
      sellerProfile: "/seller2.png"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  // Modal Component
  const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
          {showCloseButton && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F9F5]">
      <div className="mx-10 p-4 flex flex-col md:flex-row gap-6">

        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-4">

          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-2 mx-2">
            <button
            className="flex items-center text-gray-600 hover:text-black"
            onClick={() => navigate("/cartpage")}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>
            <p className="text-4xl font-bold font-inter mx-2">User Profile</p>
          </div>

          {/* Left - Profile Info */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6 w-full md:w-full min-h-[950px]">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img 
                  src="333.png" 
                  alt="Profile" 
                  className="w-28 h-28 mt-5 rounded-full object-cover" 
                />
                <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                  <img src="Edit.png" alt="edit" className="h-8 w-8" />
                </button>
              </div>
              <h2 className="text-3xl font-bold mt-4">{profileData.fullName}</h2>
              <p className="text-xl mt-4 text-500">{profileData.occupation}</p>
              
              {/* Edit Profile Button */}
              <div className="flex gap-2 mt-4 mb-8">
                <button 
                  onClick={handleEditClick}
                  className="text-xl px-6 py-2 rounded-full bg-[#4CAE4F] text-white hover:bg-green-600"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Info Fields */}
            <div className="mt-6 space-y-4">
              {[
                { label: "Full Name", field: "fullName", type: "text", required: true },
                { label: "Contact No.", field: "contactNo", type: "text", required: true },
                { label: "Address", field: "address", type: "text", required: true },
                { label: "Email", field: "email", type: "email", required: true }
              ].map(({ label, field, type, required }) => (
                <div key={label}>
                  <p className="text-[#858585] text-xl mb-2 font-bold">
                    {label} {required && <span className="text-red-500">*</span>}
                  </p>
                  <input
                    type={type}
                    value={profileData[field]}
                    readOnly
                    className="text-lg w-full border-2 border-gray-300 bg-gray-50 cursor-default rounded-full p-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Steps and Orders */}
        <div className="w-full md:w-3/2">

          {/* Steps Section */}
          <div className="p-6">
            <div className="flex items-center overflow-x-auto space-x-4">
              {["Basic Information", "Add Profile Picture", "Upload Document", "Final Set Up"].map((step, index, array) => {
                let imgSrc = "";
                let status = "";
                let statusColor = "";

                if (index < 2) {
                  imgSrc = "Done.png";
                  status = "Completed";
                  statusColor = "text-green-600";
                } else if (index === 2) {
                  imgSrc = "Circle_In progress.png";
                  status = "In Progress";
                  statusColor = "text-orange-500";
                } else {
                  imgSrc = "Circle_NC.png";
                  status = "Not Completed";
                  statusColor = "text-gray-500";
                }

                let lineSrc = null;
                if (index < array.length - 1) {
                  lineSrc = index < 2 ? "GreenLine.png" : "GrayLine.png";
                }

                return (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center text-center">
                      <img src={imgSrc} alt={step} className="w-[80px] h-[80px] mb-2" />
                      <p className="text-md text-gray-500">Step {index + 1}</p>
                      <p className="text-xl font-bold text-black">{step}</p>
                      <p className={`text-md ${statusColor}`}>{status}</p>
                    </div>

                    {lineSrc && (
                      <img
                        src={lineSrc}
                        alt="Step Line"
                        className="w-[200px] h-[8px] mb-[110px]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start border-b pb-4 gap-3">
              <div className="flex flex-wrap gap-16 flex-1">
                {["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`text-lg px-3 py-1 rounded-full transition-all duration-200 ${
                      selectedTab === tab 
                        ? "bg-[#4CAE4F] text-white font-semibold" 
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/OrderHistory')}
                className="text-green hover:text-black transition-colors shrink-0 mt-2"
              >
                <Expand size={20} />
              </button>
            </div>
                
            {/* Order Items */}
            <div className="mt-6 space-y-6">
              {filteredOrders.length === 0 ? (
                <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.id} className="flex flex-col border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm relative">
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
                          <img src="/shoppp.png" className="w-5 h-5" alt="shop" /> View Shop
                        </button>
                      </div>

                      <div className="flex items-left gap-2">
                        <span className={`inline-block text-white text-sm text-center w-28 px-2 py-2 rounded-full ${
                          order.status === "Delivered" ? "bg-[#4CAE4F]" : "bg-[#D1A157]"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-[2px] bg-gray-300 mb-4 mt-2" />

                    <div className="flex justify-between items-start w-full">
                      <div className="flex gap-4">
                        <img
                          src={order.image}
                          alt={order.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />

                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-2xl font-semibold">{order.name}</p>
                            <p className="text-sm text-gray-600">Variation: Yellow Corn</p>
                            <p className="text-lg text-gray-500 mt-4">Quantity: {order.quantity}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between h-full">
                        {order.price > 0 && (
                          <p className="text-xl font-bold">₱{order.price.toFixed(2)}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-5">
                      <button
                        onClick={() => navigate('/OrderHistory')}
                        className="w-[130px] hover:bg-green-600 hover:text-white text-sm text-[#4CAE4F] font-bold py-2 px-2 border border-[#4CAE4F] rounded-full transition-all"
                      >
                        View More
                      </button>
                    </div>
                  </div>  
                ))
              )}
            </div>

            {/* Floating Chat Button */}
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
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowConfirmDiscard(true)}>
        <div className="text-center mx-4">
          <h2 className="text-3xl font-bold">Edit Profile Information</h2>
          <p className="text-gray-600 mb-6">Need to change some information, go for it!</p>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-left text-lg font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  value={editData.fullName.split(' ')[0] || ''}
                  onChange={(e) => {
                    const lastName = editData.fullName.split(' ').slice(1).join(' ');
                    handleInputChange('fullName', `${e.target.value} ${lastName}`.trim());
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Juan"
                />
              </div>
              <div className="flex-1">
                <label className="block text-left text-lg font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  value={editData.fullName.split(' ').slice(1).join(' ') || ''}
                  onChange={(e) => {
                    const firstName = editData.fullName.split(' ')[0] || '';
                    handleInputChange('fullName', `${firstName} ${e.target.value}`.trim());
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Dela Cruz"
                />
              </div>
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Password *</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="************"
                  readOnly
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
                />
                <button
                  onClick={handleChangePassword}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Email *</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Contact Number *</label>
              <input
                type="text"
                value={editData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                className="w-full border border-gray-300 rounded-full px-3 py-2"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Address *</label>
              <input
                type="text"
                value={editData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleModalDiscard}
              className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600"
            >
              Disregard
            </button>
            <button
              onClick={handleModalConfirm}
              className="flex-1 bg-green-500 text-white py-3 rounded-full hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirm Discard Modal */}
      <Modal isOpen={showConfirmDiscard} onClose={() => setShowConfirmDiscard(false)} showCloseButton={false}>
        <div className="text-center">
            <div className="mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4">
                  <img src ="Disregard.png" alt="Disregard" />
          </div>
          <h2 className="text-xl font-bold mb-2">Disregard editing profile?</h2>
          <p className="text-gray-600 mb-2">This action cannot be undone.</p>
          <p className="text-gray-600 mb-6">The equipment details will be lost.</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmDiscard(false)}
              className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={confirmDiscard}
              className="flex-1 text-red-500 py-3 border border-red-600 rounded-full hover:bg-red-100"
            >
              Disregard
            </button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordConfirm(true)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-gray-600 mb-6">Enter your current password and choose a new one</p>
          
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Current Password *</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">New Password *</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter your new password"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Re-enter Password *</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Re-enter your new password"
              />
            </div>
            
            <div className="text-left text-sm text-gray-600">
              <p>Your password must contain:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Minimum of 8 characters</li>
                <li>At least one uppercase and lowercase</li>
                <li>At least one number and special character</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handlePasswordDiscard}
              className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600"
            >
              Disregard
            </button>
            <button
              onClick={handlePasswordConfirm}
              className="flex-1 bg-green-500 text-white py-3 rounded-full hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {/* Password Confirm Discard Modal */}
      <Modal isOpen={showPasswordConfirm} onClose={() => setShowPasswordConfirm(false)} showCloseButton={false}>
        <div className="text-center">
          <div className="mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4">
                  <img src ="Disregard.png" alt="Disregard" />
          </div>
          <h2 className="text-xl font-bold mb-2">Disregard changing password?</h2>
          <p className="text-black">This action cannot be undone.</p>
          <p className="text-black mb-6">The password changes will be lost.</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowPasswordConfirm(false)}
              className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={confirmPasswordDiscard}
              className="flex-1 text-red-500 py-3 border border-red-600 rounded-full hover:bg-red-100"
            >
              Disregard
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} showCloseButton={false}>
        <div className="text-center">
          <div className="mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4">
            <img src="Confirm.png" alt="Confirm"/>
            </div>
          <h2 className="text-xl font-bold mb-2">Profile edited successfully!</h2>
          <p className="text-gray-600 mb-6">Everything's set. Feel free to check it!</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="flex-1 bg-green-500 text-white py-3 rounded-full hover:bg-green-600"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* Password Success Modal */}
      <Modal isOpen={showPasswordSuccessModal} onClose={() => setShowPasswordSuccessModal(false)} showCloseButton={false}>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="text-green-500" size={32} />
          </div>
          <h2 className="text-xl font-bold mb-2">Password changed successfully!</h2>
          <p className="text-gray-600 mb-6">Your password has been updated securely!</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowPasswordSuccessModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setShowPasswordSuccessModal(false)}
              className="flex-1 bg-green-500 text-white py-3 rounded-full hover:bg-green-600"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserProfilePage;