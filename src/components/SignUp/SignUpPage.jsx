// src/components/SignUp/SignUpPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Card } from "../Card";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/next-step");
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center px-4 py-10">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('background.jpg')" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center px-4 py-10">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-[1512px] gap-20">
          {/* Left Side */}
          <div className="w-[546px] h-[733px] text-white flex flex-col justify-center items-center rounded-2xl">
            <img src="/Binhi Logo.png" alt="Binhi Logo" className="w-207 h-206 ml-[300px] mb-2" />
            <img src="/Binhi.png" alt="Binhi" className="w-428 h-172 ml-[300px] mb-4" />
            <p className="text-2xl text-center w-[428px] ">Ang Ugat sa Masaganang Bukas!</p>
          </div>

          {/* Right Side */}
          <div className="p-5 bg-white rounded-2xl w-[546px] h-[733px] mt-[25px] ml-[300px]">
            <Card className="h-full p-0 shadow-none">
              <h2 className="text-3xl font-bold text-center mb-2">Welcome to BINHI!</h2>
              <p className="text-lg text-center mb-5">
                Sign Up and don’t miss the opportunity to easily connect with BINHI!
              </p>

              <form className="space-y-2" onSubmit={handleNext}>
                <div>
                  <label className="text-base label font-semibold">Phone Number/Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Phone Number or Email"
                    className="text-base mb-5 text-black w-full rounded-full px-4 py-3 border border-black placeholder:text-sm"
                  />
                </div>  
                <Button className="text-base font-semibold w-full rounded-full bg-[#4CAE4F] text-white transition-all hover:bg-green-600 hover:scale-100 hover:shadow-lg">
                  Next
                </Button>
              </form>

              <div className="divider text-gray-500">OR</div>

              <div className="flex justify-center gap-3">
                <Button className="rounded-full btn-outline flex items-center gap-2 transition-all hover:bg-[#4CAE4F] hover:scale-500 hover:shadow-lg">
                  <img src="/google.png" alt="Google" className="w-4 h-4" />
                  Sign Up with Google
                </Button>
                <Button className="rounded-full btn-outline flex items-center transition-all hover:bg-[#4CAE4F] hover:scale-500 hover:shadow-lg">
                  <img src="/fb.png" alt="Facebook" className="w-4 h-4" />
                  Sign Up with Facebook
                </Button>
              </div>

              <p className="text-center text-base mt-6">
                Already have an account?{" "}
                <a href="#" className="text-base text-[#4CAE4F] font-semibold hover:underline">
                  Log In
                </a>
              </p>

              <br /><br /><br />

              <p className="text-center text-base mt-2 text-black">
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
