// src/components/SignUp/NextStep.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NextStep = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center font-inter px-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-7xl h-[675px] p-20 relative m-2">
        
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/sign-up")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-1xl bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-2xl shadow-lg">
                1
              </div>
              <span className="text-green-600 mt-2 font-medium">Verification</span>
            </div>

            <img src="/dotgreen.png" alt="Step Flow" />

            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center opacity-50">
              <div className="font-bold text-1xl bg-gray-200 text-gray-500 w-10 h-10 flex items-center justify-center rounded-2xl">
                2
              </div>
              <span className="mt-2">Password</span>
            </div>

            <img src="/dotwhite.png" alt="Step Flow" />

            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center opacity-50">
              <div className="font-bold text-1xl bg-gray-200 text-gray-500 w-10 h-10 flex items-center justify-center rounded-2xl">
                3
              </div>
              <span className="mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-3">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-10 h-10" />
          </div>

          <h2 className="text-3xl font-bold mb-2">Enter Verification Code</h2>
          <p className="text-gray-600 mb-5">
            We have sent the code to <strong>juandelacruz@gmail.com</strong>
          </p>

          <p className="text-black font-bold mb-2">Enter the code</p>
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <p className="text-md text-gray-500 m-8">
            Didn’t receive a code?{" "}
            <button className="text-green-600 font-medium hover:underline">Resend code</button>
          </p>

          {/* Next Button */}
          <button
            onClick={() => navigate("/set-password")}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextStep;
