import { useState } from "react";

function FederationSection() {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <section className="py-10 bg-gray-50">
      <h1 className="bg-white border-2 border-gray text-[36px] text-center font-bold shadow-sm p-4"> KNOW MORE ABOUT <span className="text-[#4CAE4F]"> OUR FEDERATION</span>!</h1>

      {/* Tabs */}
      <div className="bg-white border-2 border-gray flex justify-center gap-4 mb-8 shadow-sm p-4 ">
        <button
          onClick={() => setActiveTab("who")}
          className={`px-6 py-2 rounded-full ${activeTab === "who" ? "bg-[#4CAE4F] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Who are we?
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-6 py-2 rounded-full ${activeTab === "faq" ? "bg-[#4CAE4F] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Frequent Questions
        </button>
        <button
          onClick={() => setActiveTab("support")}
          className={`px-6 py-2 rounded-full ${activeTab === "support" ? "bg-[#4CAE4F] text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Help & Support
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-6 mx-[80px] mt-[20px] bg-white p-6 border rounded-xl shadow-lg">
        <img
          src="Farmers.png"
          alt="Farmers"
          className="rounded-lg object-cover"
        />
        <div className="flex-1 p-4">
          <h3 className="text-3xl font-black mb-4">
            BINANGONAN MUNICIPAL FARMERS FEDERATION INC.
          </h3>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. 
          </p>
          <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. 
          </p>
          <div className="flex gap-4">
            <button className="bg-[#4CAE4F] hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full">
              Join Us
            </button>
            <button className="border border-green-500 text-green-500 font-bold hover:bg-green-50 px-8 py-3 rounded-full">
              Explore →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
  <section className="bg-[#4CAE4F] rounded-lg text-white py-4 mx-[80px] mt-[40px]">     
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x divide-white text-center">
        {/* 1st Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px]">546+</h2>
          <p className="text-[20px] font-bold">Registered Farmers</p>
        </div>  

        {/* 2nd Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px]">789,900+</h2>
          <p className="text-[20px] font-bold">Orders Delivered</p>
        </div>

        {/* 3rd Stat */}
        <div className="px-4 py-4">
          <h2 className="text-[70px]">690+</h2>
          <p className="text-[20px] font-bold">Food Items</p>
        </div>
      </div>
     </section> 
    </section>
  );
}

export default FederationSection;
