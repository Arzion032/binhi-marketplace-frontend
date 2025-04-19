// src/components/SignUp/SignUpPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Card } from "../Card";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/next-step");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('background.jpg')" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl gap-40">
          {/* Left Side */}
          <div className="text-white flex flex-col items-center pt-16">
            <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-[130px] h-[130px] mb-1" />
            <img src="/Binhi.png" alt="Binhi" className="w-[250px] h-[100px] mb-4" />
            <p className="text-[14px] text-center">Ang Ugat sa Masaganang Bukas!</p>
          </div>

          {/* Right Side */}
          <div className="w-[550px] p-10 rounded-2xl">
            <Card>
              <h2 className="text-3xl font-bold text-center mb-2">Welcome to BINHI!</h2>
              <p className="text-lg text-center mb-6">
                Sign Up and don’t miss the opportunity to easily connect with BINHI!
              </p>

              <form className="space-y-2" onSubmit={handleNext}>
                <div>
                  <label className="text-lg label font-semibold">Phone Number/Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Phone Number or Email"
                    className="mb-5 text-black w-full rounded-full px-4 py-3 border border-black placeholder:text-sm"
                  />
                </div>
                <Button className="w-full rounded-full bg-[#4CAE4F] text-white transition-all hover:bg-green-600 hover:scale-100 hover:shadow-lg">
                  Next
                </Button>
              </form>

              <div className="divider text-gray-500">OR</div>

              <div className="flex justify-center gap-3">
                <Button className="rounded-full btn-outline flex items-center gap-2 transition-all hover:bg-green-600 hover:scale-100 hover:shadow-lg">
                  <img src="/google.png" alt="Google" className="w-8 h-8" />
                  Sign Up with Google
                </Button>
                <Button className="rounded-full btn-outline flex items-center gap-2 transition-all hover:bg-green-600 hover:scale-100 hover:shadow-lg">
                  <img src="/fb.png" alt="Facebook" className="w-8 h-8" />
                  Sign Up with Facebook
                </Button>
              </div>

              <p className="text-center text-lg mt-6">
                Already have an account?{" "}
                <a href="#" className="text-green-600 font-semibold hover:underline">
                  <Link to="/">Log In</Link>
                </a>
              </p>

              <br /><br /><br />

              <p className="text-center text-md mt-2 text-black">
                By continuing, you agree to BINHI{" "}
                <a href="#" className="underline font-bold">Terms of Service</a> and{" "}
                <a href="#" className="underline font-bold">Privacy Policy</a>.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
