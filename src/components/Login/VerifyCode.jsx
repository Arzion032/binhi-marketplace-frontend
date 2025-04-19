import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import useLocation
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg">
        {/* Back Button */}
        <button onClick={() => navigate("/reset-password")} className="flex items-center text-sm text-black mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        {/* Title and Info */}
        <h2 className="text-2xl font-bold text-center">Enter Verification Code</h2>
        <p className="text-sm text-center text-gray-600 mt-1 mb-6">
          We have sent the code to <br />
          <span className="text-black font-medium">{email}</span>.
        </p>

        {/* Code Inputs */}
        <div className="flex justify-between gap-2 mb-4">
          {codes.map((code, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="w-10 h-12 text-center border border-gray-300 rounded-lg text-lg"
              value={code}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        {/* Resend Text */}
        <p className="text-center text-sm text-gray-400 mb-6">
          Didn’t receive a code?{" "}
          <button className="text-green-600 font-medium hover:underline">
            Resend code
          </button>
        </p>

        <br /><br /><br />
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-full bg-green-600 text-white font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
