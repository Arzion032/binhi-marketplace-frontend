import React, { useEffect, useState } from 'react'
import { X, Check } from 'lucide-react';
import api from '../../api';
import { regions, provinces, cities, barangays } from '../../constants';
import AddressModal from './AdressModal';

const UserProfilePage = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addressError, setAddressError] = useState("");
  
  // Modal states - moved to top level
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPasswordSuccessModal, setShowPasswordSuccessModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Region");

  // Temporary state for editing - initialized with null
  const [editData, setEditData] = useState(null);

  // Password states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

    const navigate = (path) => {
    if (path === '/OrderHistory') {
      window.location.href = '/OrderHistory';
    } else {
      alert(`Would navigate to: ${path}`);
    }
  };

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Selected address details
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [defaultCompleteAddress, setDefaultCompleteAddress] = useState("")


  useEffect(() => {
    let address = [];
    if (selectedBarangay) address.push(selectedBarangay);
    if (selectedCity) address.push(selectedCity);
    if (selectedProvince) address.push(selectedProvince);
    if (selectedRegion) address.push(selectedRegion);

    setCompleteAddress(address.join(", "));
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay]);

  // Countdown effect for success modal redirect
  useEffect(() => {
    if (showSuccess) {
      setCountdown(3); // reset countdown when modal opens
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // cleanup on modal close/unmount
    }
  }, [showSuccess, navigate]);

  // Tab progression logic
  const progressToNextTab = (currentTab) => {
    switch (currentTab) {
      case "Region":
        setSelectedTab("Province");
        break;
      case "Province":
        setSelectedTab("City");
        break;
      case "City":
        setSelectedTab("Barangay");
        break;
      case "Barangay":
        setShowAddressModal(false);
        break;
      default:
        break;
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedBarangay("");
    progressToNextTab("Region");
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setSelectedBarangay("");
    progressToNextTab("Province");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedBarangay("");
    progressToNextTab("City");
  };

  const handleBarangaySelect = (barangay) => {
    setSelectedBarangay(barangay);
    if (addressError) setAddressError("");
    progressToNextTab("Barangay");
  };
  

 useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await api.get('/users/me');
      setProfileData(response.data);
      setEditData(response.data); // Initialize editData here

      // Initialize the address components (region, province, city, barangay)
      const address = response.data.addresses[0] || {}; // Assuming the address is in the first entry of addresses array
      
      // Set initial address values
      setSelectedRegion(address.region || "");
      setSelectedProvince(address.province || "");
      setSelectedCity(address.city || "");
      setSelectedBarangay(address.barangay || "");
      const formattedAddress = `${address.barangay || ""}, ${address.city || ""}, ${address.province || ""}, ${address.region || ""}`;
      setDefaultCompleteAddress(formattedAddress); 

      console.log(response.data); // For debugging purposes
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserData();
}, []);

  // Early return after all hooks are called
  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setEditData({...profileData});
    setIsEditing(true);
  };

  const handleDiscard = () => setShowConfirmDiscard(true);

  const confirmDiscard = () => {
    setEditData({...profileData});
    setSelectedRegion(profileData.region || "");
    setSelectedProvince(profileData.province || "");
    setSelectedCity(profileData.city || "");
    setSelectedBarangay(profileData.barangay || "");
    setIsEditing(false);
    setShowConfirmDiscard(false);
    setShowAddressModal(false)
  };

const handleConfirm = async () => {
  const requiredFields = ['full_name', 'contact_no', 'email'];
  const emptyFields = requiredFields.filter(field => !editData[field] || !editData[field].trim());
  if (emptyFields.length > 0) {
    alert('Please fill in all required fields');
    console.log(emptyFields)
    return;
  }

  // Check if address fields are selected
  if (!selectedRegion || !selectedProvince || !selectedCity || !selectedBarangay) {
    alert('Please select all address fields');
    return;
  }

  try {
    const updateData = {
      email: editData.email,
      contact_no: editData.contactNo,
      profile: {
        full_name: editData.full_name
      },
      address: {
        region: selectedRegion,
        province: selectedProvince,
        city: selectedCity,
        barangay: selectedBarangay
      }
    };

    const response = await api.patch('/users/me/update/', updateData);
    
    if (response.status === 200) {
      // Update local state with the response data
      setProfileData({...editData});
      setIsEditing(false);
      setShowSuccessModal(true);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    
    if (error.response?.data?.details) {
      // Handle validation errors
      const errorMessage = Object.values(error.response.data.details).flat().join('\n');
      alert(`Update failed:\n${errorMessage}`);
    } else {
      alert('Failed to update profile. Please try again.');
    }
  }
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

  const handleChangePassword = () => setShowPasswordModal(true);

const handlePasswordDiscard = () => setShowPasswordConfirm(true);

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

const handlePasswordConfirm = async () => {
  // Client-side validation
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

  // Clear any previous errors
  setPasswordError('');
  
  try {
    // Make API call to update password
    const response = await api.patch('users/me/update-password/', {
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
      confirm_password: passwordData.confirmPassword
    });

    // Success - show success modal and reset form
    setShowPasswordModal(false);
    setShowPasswordSuccessModal(true);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 400) {
        // Validation errors from backend
        if (data.details && typeof data.details === 'object') {
          // Handle field-specific errors
          const errorMessages = Object.values(data.details).flat();
          setPasswordError(errorMessages.join('. '));
        } else {
          setPasswordError(data.error || 'Validation failed. Please check your input.');
        }
      } else if (status === 401) {
        setPasswordError('Current password is incorrect.');
      } else if (status === 500) {
        setPasswordError('Server error occurred. Please try again later.');
      } else {
        setPasswordError('An unexpected error occurred. Please try again.');
      }
    } else if (error.request) {
      // Network error
      setPasswordError('Network error. Please check your connection and try again.');
    } else {
      // Other error
      setPasswordError('An unexpected error occurred. Please try again.');
    }
  }
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
            onClick={() => {
              window.location.href = '/';  // This will redirect to the home page
            }}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>

          <p className="text-4xl font-bold font-inter">User Profile</p>
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
              <h2 className="text-3xl font-bold text-center mb-2">{isEditing ? editData.username : profileData.username}</h2>
              <p className="text-xl text-gray-600 text-center mb-6">{profileData.occupation}</p>
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="text-lg px-8 py-3 rounded-full bg-[#4CAE4F] text-white hover:bg-[#4CAE4F] transition-colors font-semibold"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex flex-col gap-3 w-80">
                  <button
                    onClick={handleDiscard}
                    className="flex-1 bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors text-lg font-semibold"
                  >
                    Disregard
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-[#4CAE4F]  text-white px-8 py-3 rounded-full hover:bg-[#4CAE4F] transition-colors text-lg font-semibold"
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
  { label: "Full Name", field: "full_name", type: "text", required: true, accessor: (data) => data.profile?.full_name || '' },
  { label: "Email Address", field: "email", type: "email", required: true, accessor: (data) => data.email || '' },
  { label: "Contact Number", field: "contact_no", type: "text", required: true, accessor: (data) => data.contact_no || '' },
].map(({ label, field, type, required, accessor }) => (
  <div key={label} className="space-y-2">
    <label className="block text-gray-700 text-lg font-semibold">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        type={type}
        value={isEditing ? editData[field] : accessor(profileData)}
        onChange={isEditing ? (e) => handleInputChange(field, e.target.value) : undefined}
        readOnly={!isEditing}
        className={`w-full text-lg border-2 rounded-full p-4 focus:outline-none ${
          isEditing
            ? 'border-gray-300 bg-white focus:border-[#4CAE4F]'
            : 'border-gray-300 bg-gray-50 cursor-default'
        }`}
      />
    </div>
  </div>
))}
                {/* Address - Full Width */}
                <div className="text-left mb-1 relative">
            <label className="block mb-1 font-bold text-gray-700">Address</label>
            <div className="relative">
            <input
              type="text"
              className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg pr-10 placeholder-black ${
                addressError ? "border-red-500" : ""
              }`}
              placeholder={defaultCompleteAddress}
              readOnly={!isEditing}
              value={completeAddress}
            />

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                disabled={!isEditing}
                onClick={() => setShowAddressModal(prevState => !prevState)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {addressError && (
              <p className="text-red-500 text-xs italic mt-1">{addressError}</p>
            )}

          <AddressModal
              showAddressModal={showAddressModal}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              regions={regions}
              provinces={provinces}
              cities={cities}
              barangays={barangays}
              selectedRegion={selectedRegion}
              selectedProvince={selectedProvince}
              selectedCity={selectedCity}
              selectedBarangay={selectedBarangay}
              handleRegionSelect={handleRegionSelect}
              handleProvinceSelect={handleProvinceSelect}
              handleCitySelect={handleCitySelect}
              handleBarangaySelect={handleBarangaySelect}
          />


          </div>

          {/* Address Modal with Green Border and Custom Scrollbar */}
         
         



              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-xl font-bold mb-4 text-gray-800">Account Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-800">Password</p>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
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
            className="bg-[#4CAE4F] hover:bg-[#4CAE4F] text-white p-4 rounded-full shadow-lg relative transition-colors"
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
            <img src="Disregard.png" alt="Disregard" />
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

      {/* Change Password Modal - AddCategoryModal STYLE */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl mx-4 p-8 shadow-lg relative flex flex-col items-center" style={{ minWidth: 380 }}>
            {/* Close Button */}
            <button
              onClick={() => setShowPasswordConfirm(true)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header */}
            <div className="w-full text-center mb-2">
              <h2 className="text-2xl font-bold mb-1">Change Password</h2>
              <p className="text-gray-600 mb-5">Enter your current password and choose a new one</p>
            </div>

            {/* Inputs, styled like AddCategoryModal */}
            <div className="w-full space-y-4 mb-3">
              {/* Current Password */}
              <div>
                <label className="block text-lg font-medium mb-1">Current Password <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                    className="w-full border border-gray-400 rounded-full px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4CAE4F] transition"
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0"
                    onClick={() => setShowCurrentPassword(s => !s)}
                    aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                  >
                    {showCurrentPassword ? (
                      <img src="/eye-open.png" alt="Hide password" className="w-7 h-5" />
                    ) : (
                      <img src="/eye-closed.png" alt="Show password" className="w-7 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-lg font-medium mb-1">New Password <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={e => handlePasswordChange('newPassword', e.target.value)}
                    className="w-full border border-gray-400 rounded-full px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4CAE4F] transition"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0"
                    onClick={() => setShowNewPassword(s => !s)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? (
                      <img src="/eye-open.png" alt="Hide password" className="w-7 h-5" />
                    ) : (
                      <img src="/eye-closed.png" alt="Show password" className="w-7 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-lg font-medium mb-1">Re-enter Password <span className="text-red-500">*</span></label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                    className="w-full border border-gray-400 rounded-full px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4CAE4F] transition"
                    placeholder="Re-enter your new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer bg-transparent border-none p-0"
                    onClick={() => setShowConfirmNewPassword(s => !s)}
                    aria-label={showConfirmNewPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmNewPassword ? (
                      <img src="/eye-open.png" alt="Hide password" className="w-7 h-5" />
                    ) : (
                      <img src="/eye-closed.png" alt="Show password" className="w-7 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <div className="h-6 mb-2 w-full">{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}</div>

            {/* Password Requirements */}
            <div className="w-full text-left text-sm text-gray-600 mb-4">
              <p className="font-medium mb-2">Your new password must contain:</p>
              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${passwordData.newPassword.length >= 8 ? "text-[#4CAE4F]" : "text-red-500"}`}>
                <img src={passwordData.newPassword.length >= 8 ? "/check.png" : "/wrong.png"} alt="check" className="h-3 w-3" />
                <span>Minimum of 8 characters</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${/[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? "text-green-600" : "text-red-500"}`}>
                <img src={/[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"} alt="check" className="h-3 w-3" />
                <span>At least 1 lower and upper case letters (AaBb)</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${/[^A-Za-z0-9]/.test(passwordData.newPassword) ? "text-[#4CAE4F]" : "text-red-500"}`}>
                <img src={/[^A-Za-z0-9]/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"} alt="check" className="h-3 w-3" />
                <span>At least 1 symbol (@#$)</span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium ${/\d/.test(passwordData.newPassword) ? "text-[#4CAE4F]" : "text-red-500"}`}>
                <img src={/\d/.test(passwordData.newPassword) ? "/check.png" : "/wrong.png"} alt="check" className="h-3 w-3" />
                <span>At least 1 number (123)</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between gap-4 mt-auto pt-2 w-full">
              <button
                onClick={handlePasswordDiscard}
                style={{
                  backgroundColor: '#FF3B3F',
                  color: '#FFFFFF',
                  borderRadius: '2rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  width: '47%',
                }}
                className="py-3 transition"
              >
                Disregard
              </button>
              <button
                onClick={handlePasswordConfirm}
                style={{
                  backgroundColor: '#4CAE4F',
                  color: '#FFFFFF',
                  borderRadius: '2rem',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  width: '47%',
                }}
                className="py-3 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Confirm Discard Modal */}
      <Modal isOpen={showPasswordConfirm} onClose={() => setShowPasswordConfirm(false)} showCloseButton={false}>
        <div className="text-center">
          <div className="mx-auto w-18 h-18 rounded-full flex items-center justify-center mb-4">
            <img src="Disregard.png" alt="Disregard" />
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
              className="flex-1 bg-[#4CAE4F] text-white py-3 rounded-full hover:[#4CAE4F]"
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
            <Check className="text-[#4CAE4F] " size={32} />
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
              className="flex-1 bg-[#4CAE4F]  text-white py-3 rounded-full hover:bg-green-600"
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