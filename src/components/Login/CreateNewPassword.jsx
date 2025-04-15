import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "../Input";
import { Button } from "../Button";

export default function CreateNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid =
  /[A-Z]/.test(password) &&           // at least 1 uppercase letter
  /[a-z]/.test(password) &&           // at least 1 lowercase letter
  /\d/.test(password) &&              // at least 1 number
  /[^A-Za-z0-9]/.test(password) &&   // at least 1 special character
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
      <div className="bg-white rounded-xl shadow-md p-10 w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-black mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Password
        </h2>

        {/* New Password Field */}
        <div className="relative mb-4">
          <label className="label font-semibold">New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
             className="input input-bordered w-full"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute top-[3.9rem] right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img
                src="/eye-open.png"
                alt="Hide password"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/eye-closed.png"
                alt="Show password"
                className="w-5 h-5"
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
            className="absolute top-[4rem] right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <img
                src="/eye-open.png"
                alt="Hide password"
                className="w-5 h-5"
              />
            ) : (
              <img
                src="/eye-closed.png"
                alt="Show password"
                className="w-5 h-5"
              />
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside">
            <li
              className={
                /[A-Z]/.test(password) ? "text-green-600" : "text-red-500"
              }
            >
              1 uppercase letter
            </li>
            <li
              className={
                /[a-z]/.test(password) ? "text-green-600" : "text-red-500"
              }
            >
              1 lowercase letter
            </li>
            <li
              className={/\d/.test(password) ? "text-green-600" : "text-red-500"}
            >
              1 number
            </li>
            <li
              className={
                /[^A-Za-z0-9]/.test(password)
                  ? "text-green-600"
                  : "text-red-500"
              }
            >
              1 special character
            </li>
            <li
              className={
                password.length >= 8 ? "text-green-600" : "text-red-500"
              }
            >
              at least 8 characters
            </li>
          </ul>
        </div>

        <Button className="btn-success w-full" onClick={handleNext}>
          Next
        </Button>
      </div>

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
            <p className="text-gray-600 mb-2">
              You have successfully reset your password.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Redirecting to Login Page in 3 seconds...
            </p>
            <Button className="btn-success w-full" onClick={() => navigate("/login")}>
              Okay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
