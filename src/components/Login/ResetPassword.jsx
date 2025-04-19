import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "../Input";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleNext = () => {
    // You can validate email/phone format here if needed
    navigate("/verify-code", { state: { email: emailOrPhone } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-black mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-xl font-bold text-center mb-1">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Don’t worry! Resetting your password is easy.
          <br />
          Just type your email you registered to BINHI.
        </p>

        <div>
          <label className="label font-semibold text-sm mb-1">Phone Number/Email</label>
          <Input
            type="text"
            placeholder="Enter your Phone Number or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>

        <br /><br /><br />
        <button className="btn bg-green-600 rounded-full w-full text-white shadow-md" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
