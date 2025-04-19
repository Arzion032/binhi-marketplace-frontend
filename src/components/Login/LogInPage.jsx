// LogInPage.jsx
import React, { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Card } from "../Card";
import { Link } from "react-router-dom";

function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Side */}
        <div className="md:w-1/2 text-white flex flex-col items-center pt-20">
          <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-[130px] h-[130px] mb-2" />
          <img src="/Binhi.png" alt="Binhi" className="w-[250px] h-[100px] mb-4" />
          <p className="text-1xl mt-0 text-center">Ang Ugat sa Masaganang Bukas!</p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex items-center justify-center p-8 pt-1">
          <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Welcome Back to BINHI!</h2>
            <p className="text-sm text-center mb-6">
              Log In and don’t miss the opportunity to easily connect with BINHI!
            </p>

            <form className="space-y-1">
              <div>
                <label className="label font-semibold">Phone Number/Email</label>
                <Input type="text" placeholder="Enter your Phone Number or Email" />
              </div>

              <div className="relative">
                <label className="label font-semibold">Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="pr-10"
                />
                <div
                  className="absolute bottom-[2.9rem] right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src="/eye-open.png" alt="Hide password" className="w-5 h-5" />
                  ) : (
                    <img src="/eye-closed.png" alt="Show password" className="w-5 h-5" />
                  )}
                </div>

                <Link
                  to="/reset-password"
                  className="text-sm text-left block mt-1 text-gray-500 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button className="w-full rounded-full bg-green-600 text-white shadow-md">
                Log In
              </Button>
            </form>

            <div className="divider text-gray-500">OR</div>

            <div className="flex justify-center gap-3">
              <Button className="btn-outline rounded-full flex items-center gap-2">
                <img src="/google.png" alt="Google Icon" className="w-5 h-5" />
                Log In with Google
              </Button>
              <Button className="btn-outline rounded-full flex items-center gap-2">
                <img src="/Facebook.png" alt="Facebook Icon" className="w-6 h-6" />
                Log In with Facebook
              </Button>
            </div>

            <p className="text-center text-sm mt-6">
              New to BINHI?{" "}
              <Link to="/signup" className="text-green-600 font-semibold">
                Create Account
              </Link>
            </p>
            <p className="text-center text-xs mt-2 text-gray-500">
              By continuing, you agree to BINHI{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
