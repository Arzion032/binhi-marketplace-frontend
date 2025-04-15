import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center font-inter px-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-7xl h-[800px] p-20 relative">

        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/next-step")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="font-bold text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl">1</div>
              <span className="text-green-500 mt-2">Verification</span>
            </div>
            <img src="/dotgreen.png" alt="Step Flow" />
            <div className="flex flex-col items-center">
              <div className="font-bold text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl shadow-lg">2</div>
              <span className="text-green-600 mt-2 font-medium">Password</span>
            </div>
            <img src="/dotgreen.png" alt="Step Flow" />
            <div className="flex flex-col items-center opacity-50">
              <div className="font-bold text-1xl bg-gray-200 text-gray-500 w-10 h-10 flex items-center justify-center rounded-2xl">3</div>
              <span className="mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full">
          <div className="text-green-600 text-4xl mb-6">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Set Your Password</h2>
          <p className="text-gray-600 mb-2">Set your password to complete the sign up!</p>

          {/* Password Field */}
          <div className="text-left mb-4">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <img
                  src={isPasswordVisible ? "/Visible.png" : "/NotVisible.png"}
                  alt="Toggle Password Visibility"
                  className="w-5 h-4"
                />
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="text-left mb-6">
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                <img
                  src={isConfirmPasswordVisible ? "/Visible.png" : "/NotVisible.png"}
                  alt="Toggle Confirm Password Visibility"
                  className="w-5 h-4"
                />
              </button>
            </div>
          </div>

          {/* No Validation Notice */}
          <p className="text-sm text-gray-500 italic mb-6">* Password validation is temporarily disabled.</p>

          {/* Next Button */}
          <button
            className="w-full mt-1 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
            onClick={() => navigate("/set-up")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
