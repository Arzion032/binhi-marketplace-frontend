import React, { useState } from 'react'
import { Expand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
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

  const handleEditToggle = () => {
    if (isEditing) {
      // Validate required fields before saving
      const requiredFields = ['fullName', 'contactNo', 'address', 'email'];
      const emptyFields = requiredFields.filter(field => !editData[field].trim());
      
      if (emptyFields.length > 0) {
        alert('Please fill in all required fields marked with *');
        return;
      }
      
      // Save changes
      setProfileData({...editData});
    } else {
      // Start editing - copy current data to edit state
      setEditData({...profileData});
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    // Reset edit data to original profile data
    setEditData({...profileData});
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
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

  return (
    <div className="min-h-screen bg-[#F5F9F5]">
      <div className="mx-10 p-4 flex flex-col md:flex-row gap-6">

        {/* Left Side */}
        <div className="w-full md:w-1/2 space-y-4">

          {/* Back Button and Title - Moved above profile card */}
          <div className="flex items-center gap-4 mb-2">
            <button
              className="flex items-center text-gray-600 hover:text-black"
              onClick={() => navigate("/Marketplace")}
            >
              <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
            </button>
            <p className="text-4xl font-bold font-inter">User Profile</p>

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
              <h2 className="text-3xl font-bold mt-4">
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`text-3xl font-bold text-center border-2 rounded-lg px-2 py-1 ${
                        !editData.fullName.trim() ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {!editData.fullName.trim() && (
                      <p className="text-red-500 text-sm mt-1">Full name is required</p>
                    )}
                  </div>
                ) : (
                  profileData.fullName
                )}
              </h2>
              <p className="text-xl mt-4 text-500">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="text-xl text-center border-2 border-gray-300 rounded-lg px-2 py-1"
                  />
                ) : (
                  profileData.occupation
                )}
              </p>
              
              {/* Edit/Save/Cancel buttons */}
              <div className="flex gap-2 mt-4 mb-8">
                <button 
                  onClick={handleEditToggle}
                  className={`text-xl px-6 py-2 rounded-full ${
                    isEditing 
                      ? 'bg-[#4CAE4F] text-white hover:bg-green-600' 
                      : 'bg-[#4CAE4F] text-white hover:bg-green-600'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                {isEditing && (
                  <button 
                    onClick={handleCancel}
                    className="text-xl px-6 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
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
                    value={isEditing ? editData[field] : profileData[field]}
                    onChange={isEditing ? (e) => handleInputChange(field, e.target.value) : undefined}
                    readOnly={!isEditing}
                    required={required}
                    className={`text-lg w-full border-2 rounded-full p-4 ${
                      isEditing 
                        ? `${!editData[field].trim() && required ? 'border-red-500' : 'border-[#4CAE4F]'} bg-white focus:outline-none focus:ring-2 focus:ring-[#4CAE4F]` 
                        : 'border-gray-300 bg-gray-50 cursor-default'
                    }`}
                  />
                  {isEditing && required && !editData[field].trim() && (
                    <p className="text-red-500 text-sm mt-1">{label} is required</p>
                  )}
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
                    {/* Step content */}
                    <div className="flex flex-col items-center text-center">
                      <img src={imgSrc} alt={step} className="w-[80px] h-[80px] mb-2" />
                      <p className="text-md text-gray-500">Step {index + 1}</p>
                      <p className="text-xl font-bold text-black">{step}</p>
                      <p className={`text-md ${statusColor}`}>{status}</p>
                    </div>

                    {/* Line between steps */}
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

              {/* Expand button */}
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
                          <img src="/shoppp.png" className="w-5 h-5" alt="shop" /> View Shop
                        </button>
                      </div>

                      {/* Status */}
                      <div className="flex items-left gap-2">
                        <span className={`inline-block text-white text-sm text-center w-28 px-2 py-2 rounded-full ${
                          order.status === "Delivered" ? "bg-[#4CAE4F]" : "bg-[#D1A157]"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Single divider line */}
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

                      {/* Right section: Price */}
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
    </div>
  )
}

export default UserProfilePage;