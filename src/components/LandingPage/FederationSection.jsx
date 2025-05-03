import { useState } from "react";

function FederationSection() {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-center text-2xl font-bold mb-6">
        KNOW MORE ABOUT <span className="text-green-500">OUR FEDERATION</span>!
      </h2>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center bg-green-500 text-white mt-10 p-6 rounded-xl max-w-6xl mx-auto">
        <div>
          <h4 className="text-3xl font-bold">546+</h4>
          <p>Registered Farmers</p>
        </div>
        <div>
          <h4 className="text-3xl font-bold">789,900+</h4>
          <p>Orders Delivered</p>
        </div>
        <div>
          <h4 className="text-3xl font-bold">690+</h4>
          <p>Food Items</p>
        </div>
      </div>
    </section>
  );
}

export default FederationSection;
