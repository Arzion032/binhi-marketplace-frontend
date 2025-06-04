import React, { useState } from 'react'
import { X, Check } from 'lucide-react';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Updated navigate function - you can replace this with your actual routing logic
  const navigate = (path) => {
    // For React Router, you would use: navigate(path);
    // For Next.js, you would use: router.push(path);
    // For now, this is a placeholder
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
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: "Hulo Daranagan Farmers Association",
    contactNo: "091234567891",
    address: "Darangan, Binangonan City",
    email: "juandelacruz@gmail.com",
    occupation: "Association"
  });

  // Temporary state for editing
  const [editData, setEditData] = useState({...profileData});
  
  // Password states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleEditClick = () => {
    setEditData({...profileData});
    setIsEditing(true);
  };

  const handleDiscard = () => {
    setShowConfirmDiscard(true);
  };

  const confirmDiscard = () => {
    setEditData({...profileData});
    setIsEditing(false);
    setShowConfirmDiscard(false);
  };

  const handleConfirm = () => {
    // Validate required fields
    const requiredFields = ['fullName', 'contactNo', 'address', 'email'];
    const emptyFields = requiredFields.filter(field => !editData[field].trim());
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save changes
    setProfileData({...editData});
    setIsEditing(false);
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
    setPasswordError('');
    setShowPasswordModal(false);
    setShowPasswordConfirm(false);
  };

  const isNewPasswordValid =
    /[A-Z]/.test(passwordData.newPassword) &&
    /[a-z]/.test(passwordData.newPassword) &&
    /\d/.test(passwordData.newPassword) &&
    /[^A-Za-z0-9]/.test(passwordData.newPassword) &&
    passwordData.newPassword.length >= 8;

  const handlePasswordConfirm = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }
    
    if (!isNewPasswordValid) {
      setPasswordError('New password does not meet all the requirements. Please try again.');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('The password confirmation does not match. Please try again.');
      return;
    }
    
    setPasswordError('');
    setShowPasswordModal(false);
    setShowPasswordSuccessModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

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
      <div className="mx-auto p-6">

        {/* Back Button and Title */}
        <div className="flex items-center gap-4 mb-8">
          <button
            className="flex items-center text-gray-600 hover:text-black"
            onClick={() => navigate("/cartpage")}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>
          <p className="text-4xl font-black font-inter">User Profile</p>
        </div>

        {/* Expanded Profile Section */}
        <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Side - Profile Picture and Basic Info */}
            <div className="lg:w-1/3 flex flex-col items-center">
              <div className="relative mb-6">
                <img 
                  src="111.png" 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-200" 
                />
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg border-2 border-gray-200 hover:bg-gray-50">
                  <img src="Edit.png" alt="edit" className="h-6 w-6" />
                </button>
              </div>
              
              <h2 className="text-3xl font-bold text-center mb-2">{isEditing ? editData.fullName : profileData.fullName}</h2>
              <p className="text-xl text-gray-600 text-center mb-6">{profileData.occupation}</p>
              
              {/* Edit Profile Button or Action Buttons */}
              {!isEditing ? (
                <button 
                  onClick={handleEditClick}
                  className="text-lg px-8 py-3 rounded-full bg-[#4CAE4F] text-white hover:bg-green-600 transition-colors font-semibold"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3 w-full">
                  <button
                    onClick={handleDiscard}
                    className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition-colors font-semibold"
                  >
                    Disregard
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition-colors font-semibold"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Profile Information */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", field: "fullName", type: "text", required: true },
                  { label: "Email Address", field: "email", type: "email", required: true },
                  { label: "Contact Number", field: "contactNo", type: "text", required: true },
                ].map(({ label, field, type, required }) => (
                  <div key={label} className="space-y-2">
                    <label className="block text-gray-700 text-lg font-semibold">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type={type}
                        value={isEditing ? editData[field] : profileData[field]}
                        onChange={isEditing ? (e) => handleInputChange(field, e.target.value) : undefined}
                        readOnly={!isEditing}
                        className={`w-full text-lg border-2 rounded-lg p-4 focus:outline-none ${
                          isEditing 
                            ? 'border-gray-300 bg-white focus:border-green-500' 
                            : 'border-gray-300 bg-gray-50 cursor-default'
                        }`}
                      />
                    </div>
                  </div>
                ))}
                
                {/* Address - Full Width */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-700 text-lg font-semibold">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={isEditing ? editData.address : profileData.address}
                      onChange={isEditing ? (e) => handleInputChange('address', e.target.value) : undefined}
                      readOnly={!isEditing}
                      className={`w-full text-lg border-2 rounded-lg p-4 focus:outline-none ${
                        isEditing 
                          ? 'border-gray-300 bg-white focus:border-green-500' 
                          : 'border-gray-300 bg-gray-50 cursor-default'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xl font-bold mb-4 text-gray-800">Account Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Password</p>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
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

      {/* Confirm Discard Modal */}
      <Modal isOpen={showConfirmDiscard} onClose={() => setShowConfirmDiscard(false)} showCloseButton={false}>
        <div className="text-center">
            <div className="mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4">
                  <img src ="Disregard.png" alt="Disregard" />
          </div>
          <h2 className="text-xl font-bold mb-2">Disregard editing profile?</h2>
          <p className="text-gray-600 mb-2">This action cannot be undone.</p>
          <p className="text-gray-600 mb-6">The profile changes will be lost.</p>
          
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
            {/* Current Password */}
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                  placeholder="Enter your current password"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
                  ) : (
                    <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
                  )}
                </div>
              </div>
            </div>
            
            {/* New Password */}
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">New Password *</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                  placeholder="Enter your new password"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
                  ) : (
                    <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Confirm New Password */}
            <div className="text-left">
              <label className="block text-lg font-medium mb-1">Re-enter Password *</label>
              <div className="relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                  placeholder="Re-enter your new password"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? (
                    <img src="/eye-open.png" alt="Hide password" className="w-[28px] h-[22px]" />
                  ) : (
                    <img src="/eye-closed.png" alt="Show password" className="w-[28px] h-[22px]" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Fixed height container for error message */}
            <div className="h-6 mb-2">{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}</div>
            
            {/* Password Requirements */}
            <div className="text-left text-sm text-gray-600">
              <p className="font-medium mb-2">Your new password must contain:</p>
              
              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${
                passwordData.newPassword.length >= 8 ? "text-green-600" : "text-red-500"
              }`}>
                <img
                  src={passwordData.newPassword.length >= 8 ? "/check.png" : "/wrong.png"}
                  alt="check"
                  className="h-3 w-3"
                />
                <span>Minimum of 8 characters</span>
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${
                /[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? "text-green-600" : "text-red-500"
              }`}>
                <img
                  src={/[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"}
                  alt="check"
                  className="h-3 w-3"
                />
                <span>At least 1 lower and upper case letters (AaBb)</span>
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${
                /[^A-Za-z0-9]/.test(passwordData.newPassword) ? "text-green-600" : "text-red-500"
              }`}>
                <img
                  src={/[^A-Za-z0-9]/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"}
                  alt="check"
                  className="h-3 w-3"
                />
                <span>At least 1 symbol (@#$)</span>
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium ${
                /\d/.test(passwordData.newPassword) ? "text-green-600" : "text-red-500"
              }`}>
                <img
                  src={/\d/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"}
                  alt="check"
                  className="h-3 w-3"
                />
                <span>At least 1 number (123)</span>
              </div>
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