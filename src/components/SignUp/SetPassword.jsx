// src/components/SignUp/SetPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      navigate("/setup");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white rounded-3xl shadow-lg w-[1412px] h-[760px] p-10 relative mt-10" style={{ marginTop: '90px' }}>

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
              <span className="text-green-600 mt-2">Verification</span>
            </div>

            <img src="/dotgreen.png" alt="Step Flow" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-[28px] bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg">
                2
              </div>
              <span className="font-bold text-green-600 mt-2">Password</span>
            </div>

            <img src="/dotwhite.png" alt="Step Flow" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-[28px] text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                3
              </div>
              <span className="text-[#D9D9D9] mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mt-5">
          <div className="text-green-600 text-4xl mb-2">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-[65px] h-[66px]" />
          </div>

          <h2 className="text-[32px] font-bold mb-1">Set Your Password</h2>
          <p className="text-[16px] text-gray-600 mb-3">
          Set your password to complete the sign up!
          </p>

          {/* Password Input */}
          <div className="flex flex-col items-center gap-5 relative">
            <div className="relative w-[378px]">
            <label className="block text-left text-black text-base font-bold">
              Password
            </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-[378px] h-[55px] border border-gray-300 rounded-full px-4 pr-12 text-[#D9D9D9] text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword ? "/Visible.png" : "/NotVisible.png"}
                alt="Toggle"
                className="w-[28px] h-[22px] absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-[378px]">
            <label className="block text-left text-black text-base font-bold">
              Confirm Password
            </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-[378px] h-[55px] border border-gray-300 rounded-full px-4 pr-12 text-[#D9D9D9] text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={showConfirmPassword ? "/Visible.png" : "/NotVisible.png"}
                alt="Toggle"
                className="w-[28px] h-[22px] absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer mt-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>

          {/* Password Requirements Checklist (Static UI only) */}
          <div className="mt-2 mb-2 text-left w-[378px] mx-auto">
          <p className="mb-2 font-medium text-gray-800">Your password must contain...</p>

          <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-1">
            <img src="/check.png" alt="check" className="h-3 w-3" />
            <span>Minimum of 8 characters</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <img src="/wrong.png" alt="wrong" className="h-3 w-3" />
            <span>At least 1 lower and upper case letters (AaBb)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <img src="/wrong.png" alt="wrong" className="h-3 w-3" />
            <span>At least 1 symbol (@#$)</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <img src="/wrong.png" alt="wrong" className="h-3 w-3" />
            <span>At least 1 number (123)</span>
          </div>
        </div>

          {/* Submit Button */}
          <button
            onClick={() => navigate("/set-up")}
            className="w-[488px] h-[54px] mt-3 bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
