import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white rounded-3xl shadow-lg w-[1412px] h-[900px] p-10 relative mt-10" style={{ marginTop: '5px' }}>

        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/next-step")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="font-bold text-[28px] bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                1
              </div>
              <span className="font-bold text-green-600 mt-2 font-medium">Verification</span>
            </div>

            <img src="/dotfullgreen.png" alt="Step Flow" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-[28px] bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                2
              </div>
              <span className="font-bold text-green-600 mt-2 font-medium">Password</span>
            </div>

            <img src="/dotfullgreen.png" alt="Step Flow" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-[28px] bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg">
                3
              </div>
              <span className="font-bold text-green-600 mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full">
          <h2 className="text-[32px] font-bold mb-2 mt-10">Finish your Set Up!</h2>
          <p className="text-gray-600 mb-4">Finish your set-up to start exploring Binhi!</p>

          {/* Full Name Field */}
          <div className="text-left mb-4">
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Username Field */}
          <div className="text-left mb-6">
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Address Field */}
<div className="text-left mb-4">
  <label className="block mb-1 font-medium text-gray-700">Address</label>
  <input
    type="text"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="Barangay, Purok, Street"
  />
</div>

{/* Map + Add Location */}
<div className="relative mb-4 w-full">
  <img
    src="/map.png" // Replace with actual image path
    alt="Map"
    className="w-full h-20 object-cover rounded-full"
  />
  <button
    className="absolute inset-0 flex items-center justify-center"
    onClick={() => alert("Add Location Clicked!")}
  >
    <div className="bg-white border rounded-full px-4 py-1 text-sm font-medium shadow-md hover:bg-gray-100 transition">
      + Add Location
    </div>
  </button>
</div>

{/* Default Address & Location Display */}
<div className="flex flex-col items-center gap-1 mb-6">
    <img src="/default.png" alt="Default Address" className="w-10 h-10" />
</div>


          {/* No Validation Notice */}
          <p className="text-sm text-gray-500 italic mb-6">* Profile setup validation is temporarily disabled.</p>

          {/* Finish Button */}
          <button
            className="w-full mt-1 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
            onClick={() => navigate("/home")} // Update the route as needed
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetUp;
