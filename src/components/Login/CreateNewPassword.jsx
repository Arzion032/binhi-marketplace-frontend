import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { Button } from "../Button";


export default function CreateNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const email = location.state?.email || "your email"; // fallback


  const isPasswordValid =
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length >= 8;


  const handleNext = () => {
    if (!isPasswordValid) {
      alert("❌ Password does not meet all the requirements.");
    } else if (password !== confirmPassword) {
      alert("❌ Passwords do not match.");
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/your-background.jpg')" }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-10"
        style={{ width: "576px", height: "731px" }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-black mb-4"
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
        </button>


        <h2 className="text-2xl font-bold mb-2 text-center">
          Create New Password
        </h2>
        <p className="text-md text-center text-gray-600 mt-1 mb-3">
          Create your new password for <br />
          <span className="text-black font-medium">{email}</span>.
        </p>


        {/* New Password Field */}
        <div className="relative mb-3">
          <label className="label font-semibold">New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-[4.1rem] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img
                src="/eye-open.png"
                alt="Hide password"
                className="w-[28px] h-[22px]"
              />
            ) : (
              <img
                src="/eye-closed.png"
                alt="Show password"
                className="w-[28px] h-[22px]"
              />
            )}
          </div>
        </div>


        {/* Confirm Password Field */}
        <div className="relative mb-6">
          <label className="label font-semibold">Confirm Password</label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full"
          />
          <div
            className="absolute right-3 top-[4.1rem] -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <img
                src="/eye-open.png"
                alt="Hide password"
                className="w-[28px] h-[22px]"
              />
            ) : (
              <img
                src="/eye-closed.png"
                alt="Show password"
                className="w-[28px] h-[22px]"
              />
            )}
          </div>
        </div>


        {/* Password Requirements */}
        <div className="text-md text-gray-600 mb-[25px]">
          <p className="font-medium mb-2">Your Password must contain..</p>


          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              password.length >= 8 ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={password.length >= 8 ? "/check.png" : "/wrong.png"}
              alt="check"
              className="h-3 w-3"
            />
            <span>Minimum of 8 characters</span>
          </div>


          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              /[A-Z]/.test(password) && /[a-z]/.test(password)
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            <img
              src={
                /[A-Z]/.test(password) && /[a-z]/.test(password)
                  ? "/check.png"
                  : "/wrong.png"
              }
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 lower and upper case letters (AaBb)</span>
          </div>


          <div
            className={`flex items-center gap-2 text-sm font-medium mb-1 ${
              /[^A-Za-z0-9]/.test(password)
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            <img
              src={
                /[^A-Za-z0-9]/.test(password) ? "/check.png" : "/wrong.png"
              }
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 symbol (@#$)</span>
          </div>


          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              /\d/.test(password) ? "text-green-600" : "text-red-500"
            }`}
          >
            <img
              src={/\d/.test(password) ? "/check.png" : "/wrong.png"}
              alt="check"
              className="h-3 w-3"
            />
            <span>At least 1 number (123)</span>
          </div>
        </div>


        {/* Next Button */}
        <div className="mt-[100px]">
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>


      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg mb-4">
              Password Reset Successfully!
            </h3>
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


