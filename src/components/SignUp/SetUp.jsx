import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div
      className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div className="bg-white rounded-3xl shadow-lg w-[1412px] h-[900px] p-10 relative mt-10" style={{ marginTop: "5px" }}>
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
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className="font-bold text-[28px] bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                    {step}
                  </div>
                  <span className="font-bold text-green-600 mt-2 font-medium">
                    {step === 1 ? "Verification" : step === 2 ? "Password" : "Set Up"}
                  </span>
                </div>
                {step !== 3 && <img src="/dotfullgreen.png" alt="Step Flow" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full">
          <img src="/lock.png" alt="Setup Icon" className="mx-auto mt-7 mb-2 w-14 h-14" />

        

          <h2 className="text-[32px] font-bold mb-2 mt-2">Finish your Set Up!</h2>
          <p className="text-gray-600 mb-4">Finish your set-up to start exploring Binhi!</p>

          {/* First Name */}
          <div className="text-left mb-4">
            <label className="block mb-1 font-medium text-gray-700">First Name</label>
            <input
              type="text"
              className="input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg"
              placeholder="Ex. Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="text-left mb-6">
            <label className="block mb-1 font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              className="input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg"
              placeholder="Ex. Dela Cruz"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <img src="/map.png" alt="Map" className="w-full h-20 object-cover rounded-full" />
            <button
              className="absolute inset-0 flex items-center justify-center"
              onClick={() => alert("Add Location Clicked!")}
            >
              <div className="bg-white border rounded-full px-4 py-1 text-sm font-medium shadow-md hover:bg-gray-100 transition">
                + Add Location
              </div>
            </button>
          </div>

          {/* Default Address Display */}
          <div className="flex flex-col items-center gap-1 mb-6">
            <img src="/default.png" alt="Default Address" className="w-10 h-10" />
          </div>
          {/* Checkbox for Default Address */}
                  <div className="flex items-center justify-center gap-2 mb-4 mt-4">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                    />
                    <label className="text-sm text-gray-700">Set the first address to permanent address</label>
                  </div>
          <button
            className="w-full mt-1 bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
            onClick={() => navigate("/home")}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetUp;
