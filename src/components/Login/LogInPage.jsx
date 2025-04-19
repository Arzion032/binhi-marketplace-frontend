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
    <div className="flex items-center justify-center px-5 py-10">
     <div className="flex flex-col md:flex-row md:space-x-12 rounded-2xl overflow-hidden w-full max-w-6xl">
        {/* Left Side */}
        <div className="md:w-1/2 text-white flex flex-col items-center justify-center pt-20">
          <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-[220px] h-[220px] mb-4" />
          <img src="/Binhi.png" alt="Binhi" className="w-[480px] h-[200px] mb-2" />
          <p className="text-3xl mt-2">Ang Ugat sa Masaganang Bukas!</p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <Card className="w-full max-w-xl p-10 rounded-2xl shadow-2xl bg-white">
            <h2 className="text-4xl font-bold text-center mb-4">Welcome Back to BINHI!</h2>
            <p className="text-xl text-center mb-8">
              Log In and don’t miss the opportunity to easily connect with BINHI!
            </p>

            <form className="space-y-4">
              <div>
                <label className="label font-semibold text-lg">Phone Number/Email</label>
                <Input type="text" placeholder="Enter your Phone Number or Email" className="h-12 text-lg" />
              </div>

              <div className="relative">
                <label className="label font-semibold text-lg">Password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="pr-12 h-12 text-lg"
                />
                <div
                  className="absolute bottom-[3.5rem] right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src="/eye-open.png" alt="Hide password" className="w-6 h-6" />
                  ) : (
                    <img src="/eye-closed.png" alt="Show password" className="w-6 h-6" />
                  )}
                </div>

                <Link
                  to="/reset-password"
                  className="text-lg text-left block mt-1 text-gray-600"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button className="w-full rounded-full bg-green-600 text-white shadow-lg text-lg h-12">
                Log In
              </Button>
            </form>

            <div className="divider text-gray-500 my-6 text-sm">OR</div>

            <div className="flex justify-center gap-2">
              <Button className="btn-outline rounded-full flex items-center justify-center gap-3 text-lg h-12">
                <img src="/google.png" alt="Google Icon" className="w-6 h-6" />
                Log In with Google
              </Button>
              <Button className="btn-outline rounded-full flex items-center justify-center gap-3 text-lg h-12">
                <img src="/Facebook.png" alt="Facebook Icon" className="w-6 h-6" />
                Log In with Facebook
              </Button>
            </div>

            <p className="text-center text-base mt-8">
              New to BINHI?{" "}
              <Link to="/signup" className="text-green-600 font-semibold">
                Create Account
              </Link>
            </p>
            <p className="text-center text-xs mt-4 text-gray-500">
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
