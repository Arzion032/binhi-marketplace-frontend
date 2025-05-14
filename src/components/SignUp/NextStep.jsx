// src/components/SignUp/NextStep.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NextStep = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white rounded-3xl shadow-lg w-[1412px] h-[731px] p-10 relative " style={{ marginTop: '5 px' }}>
        
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

              {/* Step Indicator */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-4">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">
            1
              </div>
              <span className="font-bold text-green-600 mt-2">Verification</span>
            </div>

            {/* Dot moved up */}
            <img src="/dotgreen.png" alt="Step Flow" className="relative -top-3" />

            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
            2
              </div>
              <span className="text-[#D9D9D9] mt-2">Password</span>
            </div>

            {/* Dot moved up */}
            <img src="/dotwhite.png" alt="Step Flow" className="relative -top-3" />

            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                3
              </div>
              <span className="text-[#D9D9D9] mt-2">Set Up</span>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="text-center">
          <div className="text-green-600 text-4xl mb-3">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-[65px] h-[66px] " />
          </div>

          <h2 className="text-3xl font-bold">Enter Verification Code</h2>
          <p className="text-base text-gray-600 mb-5">
            We have sent the code to <strong>juandelacruz@gmail.com</strong>
          </p>

          <p className="text-base text-black font-semibold mb-2">Enter the code</p>
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-[55px] h-[56px] text-center border-2 border-gray-300 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <p className="text-md text-gray-500 mb-20">
            Didn’t receive a code?{" "}
            <button className="text-[#4CAE4F] font-medium hover:underline">Resend code</button>
          </p>

          {/* Next Button */}
          <button
            onClick={() => navigate("/set-password")}
            className="w-[488px] h-[54px] mt-[110px] bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextStep;
