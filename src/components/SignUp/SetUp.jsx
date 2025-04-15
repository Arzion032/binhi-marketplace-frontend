import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center font-inter px-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-7xl h-[800px] p-20 relative">

        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/set-password")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl">1</div>
              <span className="text-green-500 mt-2">Verification</span>
            </div>
            <img src="/dotfullgreen.png" alt="Step Flow" />
            <div className="flex flex-col items-center">
              <div className="ffont-bold text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl">2</div>
              <span className="text-green-500 mt-2">Password</span>
            </div>
            <img src="/dotfullgreen.png" alt="Step Flow" />
            <div className="flex flex-col items-center">
              <div className="font-bold text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl shadow-lg">3</div>
              <span className="text-green-600 mt-2 font-medium">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full">
          <div className="text-green-600 text-4xl mb-6">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Set Up Your Profile</h2>
          <p className="text-gray-600 mb-4">Finish creating your account by setting up your profile!</p>

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
