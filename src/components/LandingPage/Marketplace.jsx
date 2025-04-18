import React from 'react'
import MainHeader from './MainHeader' // Import the header component

const Marketplace = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Main Header */}
      <MainHeader />

      {/* Hero Section */}
      <section className="w-full bg-[#4CAE4F] text-white px-6 py-12 md:py-20 mx-[30px] mt-[30px] rounded-xl">      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Growth Begins <br /> with a Single Seed
            </h1>
            <p className="text-base md:text-lg">
              Take the first step toward a greener future.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-white text-green-600 font-medium px-6 py-2 rounded-full">
                Shop Now
              </button>
              <button className="border border-white font-medium px-6 py-2 rounded-full">
                Explore →
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/LandingPageFarmers.png"
              alt="Farmers"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Grains', 'Vegetables', 'Roots', 'Dairy', 'Meat', 'Fruits'].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 hover:bg-green-100 p-4 rounded-lg text-center text-sm font-medium text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Marketplace
