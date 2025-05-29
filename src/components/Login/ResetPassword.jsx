import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState(""); // State to hold error message

  const handleNext = () => {
    // Regular expression for validating email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regular expression for validating phone number (basic format)
    const phoneRegex = /^[0-9]{10}$/;

    // Check if input is either a valid email or phone number
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Please enter correct Phone Number or Email format.");
    } else {
      setError(""); 
      navigate("/verify-code", { state: { email: emailOrPhone } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10" style={{ width: "576px", height: "731px" }}>
        <button onClick={() => navigate("/login")} className="flex items-center gap-1 text-sm text-black mb-4">
          <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-1">Reset Password</h2>
        <p className="text-md text-gray-600 mb-4 text-center">
          Don’t worry! Resetting your password is easy.
          <br />
          Just type your email or phone number registered to BINHI.
        </p>

        <div>
          <label className="label font-semibold text-md mb-1">Phone Number/Email</label>
          <Input
            type="text"
            placeholder="Enter your Phone Number or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className={`input input-bordered w-full ${error ? "border-2 border-red-500" : ""}`}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2 ml-3">{error}</p>
        )}

        {/* Button Container with fixed margin */}
        <div className={`mt-[352px] ${error ? "mt-[320px]" : ""}`}>
          <button
            className="w-full py-2 rounded-full bg-green-500 text-white shadow-lg text-lg h-14 hover:bg-green-600 focus:outline-none focus:ring-0 transition duration-300 ease-in-out"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
