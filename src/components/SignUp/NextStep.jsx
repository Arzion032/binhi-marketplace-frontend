import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api"; // Assuming your api.js is in the parent directory

const NextStep = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const email = location.state?.email

  const [codes, setCodes] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) {
      setError("Invalid verification code. Please try again");
      return;
    }
    setError(""); // Reset error if valid input
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

  const handleSubmit = async () => {
    const code = codes.join("");
    
    if (code.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post('/users/verify-email/', {
        email: email,
        code: code
      });

      // Success - navigate to next step
      navigate("/set-password", { state: { email: email } ,
      });
    } catch (error) {
      console.error('Error verifying code:', error);
      
      // Handle different types of errors
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.status >= 400) {
        setError("Invalid verification code. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
      
      // Clear the code inputs on error
      setCodes(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setError("");

    try {
      await api.post('/users/resend-verification-code/', {
        email: email
      });

      // Success - clear inputs and focus first input
      setCodes(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
      
      // Optional: You could show a success message here
      // setSuccessMessage("New verification code sent!");
      
    } catch (error) {
      console.error('Error resending code:', error);
      
      // Handle different types of errors
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.status >= 400) {
        setError("Failed to resend verification code. Please try again.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="bg-white rounded-3xl shadow-lg w-[1412px] h-[731px] p-10 relative flex flex-col" style={{ marginTop: '5 px' }}>
        
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/signup")}
          disabled={loading || resendLoading}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-4">
            {/* Step 1 - Active */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">
            1
              </div>
              <span className="font-bold text-green-600 mt-2">Verification</span>
            </div>

            {/* Dot moved up */}
            <img src="/dotgreen.png" alt="Step Flow" className="relative -top-3" />

            {/* Step 2 - Inactive */}
            <div className="flex flex-col items-center">
            <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
            2
              </div>
              <span className="text-[#D9D9D9] mt-2">Password</span>
            </div>

            {/* Dot moved up */}
            <img src="/dotwhite.png" alt="Step Flow" className="relative -top-3" />

            {/* Step 3 - Inactive */}
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl text-[#D9D9D9] border-[2px] border-[#D9D9D9] w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                3
              </div>
              <span className="text-[#D9D9D9] mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center flex-grow flex flex-col">
          <div className="text-green-600 text-4xl mb-3">
            <img src="/lock-password-fill.png" alt="Lock Icon" className="inline w-[65px] h-[66px] " />
          </div>

          <h2 className="text-3xl font-bold">Enter Verification Code</h2>
          <p className="text-base text-gray-600 mb-5">
            We have sent the code to  <br />
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
              className={`w-[55px] h-[56px] text-center border-2 ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-xl text-xl focus:outline-none focus:ring-0`}
              value={code}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={loading || resendLoading}
            />
          ))}
        </div>

        {/* Fixed height container for error message */}
        <div className="h-6 mb-4">
          {error && <p className="text-center italic text-red-500 text-sm">{error}</p>}
        </div>

        {/* Resend Text */}
        <p className="text-center text-md text-gray-400">
          Didn't receive a code?{" "}
          <button 
            className="text-green-600 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleResendCode}
            disabled={resendLoading || loading}
          >
            {resendLoading ? "Sending..." : "Resend code"}
          </button>
        </p>

          {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

         <button
          onClick={handleSubmit}
          disabled={loading || resendLoading || codes.some(code => !code)}
          className="w-[488px] h-[54px] bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Next"}
        </button>

        </div>
    </div>
    </div>
  );
};

export default NextStep;