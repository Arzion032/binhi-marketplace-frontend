import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import useLocation

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ to receive email/phone from ResetPassword
  const email = location.state?.email || "your email"; // ✅ fallback

  const [codes, setCodes] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ Navigate and pass email/phone to CreateNewPassword
  const handleSubmit = () => {
    const code = codes.join("");
    console.log("Submitted code:", code);
    navigate("/create-new-password", {
      state: { email }, // ✅ pass the email or phone to next page
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
<div className="bg-white rounded-3xl shadow-2xl p-10" style={{ width: "576px", height: "731px" }}>
{/* Back Button */}
        <button onClick={() => navigate("/reset-password")} className="flex items-center text-sm text-black mb-4">
        <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
        </button>

        {/* Title and Info */}
        <h2 className="text-2xl font-bold text-center">Enter Verification Code</h2>
        <p className="text-md text-center text-gray-600 mt-1 mb-6">
          We have sent the code to <br />
          <span className="text-black font-medium">{email}</span>.
        </p>
        <p className="text-sm font-bold text-black mt-1 mb-2">
          Enter the code <br />
        </p>

        {/* Code Inputs */}
        <div className="flex justify-center gap-5 mb-4">
          {codes.map((code, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="w-[55px] h-[56px] text-center border-2 border-gray-300 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              value={code}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Resend Text */}
        <p className="text-center text-sm text-gray-400 mb-[325px]">
          Didn’t receive a code?{" "}
          <button className="text-green-600 font-medium hover:underline">
            Resend code
          </button>
        </p>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-full bg-green-500 text-white shadow-lg text-lg h-14
          hover:bg-green-600 focus:outline-none focus:ring-0 transition duration-300 ease-in-out" 
          >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
