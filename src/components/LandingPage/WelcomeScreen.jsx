import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({ name }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) return null; // Optional: loading state

  return (
    <>
      {isLoggedIn ? (
        // ✅ Logged-in view
        <section className="bg-[#4CAE4F] mx-[80px] mt-6 rounded-xl px-24 py-0 flex justify-between items-stretch text-white shadow-lg h-[300px]">
          {/* Left Basket Image */}
          <div className="flex items-end">
            <img
              src="/basket.png"
              alt="Left Basket"
              className="w-[280px] h-auto object-contain"
            />
          </div>

          {/* Center Greeting Text */}
          <div className="text-center flex flex-col justify-center flex-1">
            <h2 className="sm:text-7xl font-bold mb-3">
              Hi, {name || "User"}!
            </h2>
            <p className="text-2xl flex flex-col items-center gap-2">
              <span>What product you want to find?</span>
              <span className="flex items-center gap-1">
                Click the
                <img
                  src="/search-white.png"
                  alt="search"
                  className="w-6 h-6 inline-block"
                />
                <span className="font-bold">search bar</span> above!
              </span>
            </p>
          </div>

          {/* Right Basket Image */}
          <div className="flex items-end py-[98px]">
            <img
              src="/basket2.png"
              alt="Right Basket"
              className="w-[280px] h-auto object-contain"
            />
          </div>
        </section>
      ) : (
        // ✅ Logged-out view
        <section className="bg-[#4CAE4F] text-white px-6 py-2 md:py-2 mx-[80px] mt-[30px] rounded-xl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
              <h1 className="text-4xl sm:text-3xl md:text-5xl font-black leading-tight">
                Growth Begins <br /> with a Single Seed
              </h1>
              <p className="text-xl md:text-lg">
                Take the first step toward a greener future.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="text-xl bg-white text-green-600 font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105">
                  Shop Now
                </button>
                <button
                  onClick={() => navigate("/featured-products")}
                  className="text-lg border border-white font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105"
                >
                  Explore →
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/LandingPageFarmers.png"
                alt="Farmers"
                className="w-full h-auto max-w-[520px] rounded-none"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default WelcomeScreen;
