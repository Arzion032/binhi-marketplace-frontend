import { useState } from "react";

function FederationSection() {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <section className="py-10 bg-gray-50">
      <h1 className="bg-white border-2 border-gray text-[36px] text-center font-bold shadow-lg p-2 mb-10"> KNOW MORE ABOUT <span className="text-[#4CAE4F]"> OUR FEDERATION</span>!</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("who")}
          className={`px-4 py-2 rounded-full ${activeTab === "who" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Who are we?
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-2 rounded-full ${activeTab === "faq" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Frequent Questions
        </button>
        <button
          onClick={() => setActiveTab("support")}
          className={`px-4 py-2 rounded-full ${activeTab === "support" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Help & Support
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <img
          src="/path-to-your-image.jpg"
          alt="Farmers"
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4">
            BINANGONAN MUNICIPAL FARMERS FEDERATION INC.
          </h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit...
          </p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit...
          </p>
          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full">
              Join Us
            </button>
            <button className="border border-green-500 text-green-500 hover:bg-green-50 px-6 py-2 rounded-full">
              Explore →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
  <section className="bg-[#4CAE4F] rounded-lg text-white py-4 mx-[80px] mt-[20px]">     
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x divide-white text-center">
        {/* 1st Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px] font-semibold">546+</h2>
          <p className="text-[20px] font-normal">Registered Farmers</p>
        </div>  

        {/* 2nd Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px] font-semibold">789,900+</h2>
          <p className="text-[20px]">Orders Delivered</p>
        </div>

        {/* 3rd Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px] font-semibold">690+</h2>
          <p className="text-[20px]">Food Items</p>
        </div>
      </div>
     </section> 
    </section>
  );
}

export default FederationSection;
