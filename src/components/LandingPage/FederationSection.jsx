import { useState } from "react";

function FederationSection() {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <section className="bg-gray-50">
      <h1 className="bg-white border-2 border-gray text-3xl md:text-[36px] font-inter text-center font-black shadow-sm p-4">
        KNOW MORE ABOUT <span className="text-[#4CAE4F]">OUR FEDERATION</span>!
      </h1>

      {/* Tabs */}
      <div className="bg-white border-2 border-gray flex justify-center gap-4 mb-8 shadow-sm p-4">
        <button
          onClick={() => setActiveTab("who")}
          className={`px-6 py-2 rounded-full border font-medium ${
            activeTab === "who"
              ? "bg-[#4CAE4F] text-white border-[#4CAE4F]"
              : "bg-gray-200 text-gray-700 border-gray-300"
          }`}
        >
          Who are we?
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-6 py-2 rounded-full border font-medium ${
            activeTab === "faq"
              ? "bg-[#4CAE4F] text-white border-[#4CAE4F]"
              : "bg-gray-200 text-gray-700 border-gray-300"
          }`}
        >
          Frequent Questions
        </button>
        <button
          onClick={() => setActiveTab("support")}
          className={`px-6 py-2 rounded-full border font-medium ${
            activeTab === "support"
              ? "bg-[#4CAE4F] text-white border-[#4CAE4F]"
              : "bg-gray-200 text-gray-700 border-gray-300"
          }`}
        >
          Help & Support
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "who" && (
        <div className="flex flex-col md:flex-row items-center gap-6 mx-[80px] mt-[10px] bg-white p-6 border rounded-xl shadow-lg">
          <img
            src="Farmers.png"
            alt="Farmers"
            className="rounded-lg object-cover w-[500px] h-[350px]"
          />
          <div className="flex-1 p-4">
            <h3 className="text-3xl font-black mb-4">
              BINANGONAN MUNICIPAL FARMERS FEDERATION INC.
            </h3>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas.
            </p>
            <p className="text-gray-600 mb-6">
              Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
              hendrerit semper vel class aptent taciti sociosqu ad litora
              torquent per conubia nostra inceptos himenaeos.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#4CAE4F] hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full shadow">
                Join Us
              </button>
              <button className="border border-green-500 text-green-500 font-bold hover:bg-green-50 px-8 py-3 rounded-full shadow">
                Explore →
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="mx-[80px] mt-[20px] py-10 px-4 bg-white p-6 border rounded-xl shadow-lg text-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array(5).fill().map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-300 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center text-lg font-semibold mb-2">
                    <img
                      src="/qm.png"
                      alt="question mark"
                      className="w-5 h-5 mr-2 inline-block object-contain"
                    />
                    How to apply?
                  </div>
                  <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    Quisque faucibus ex sapien vitae.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "support" && (
        <div className="mx-[80px] mt-[20px] bg-white p-6 border rounded-xl shadow-lg text-gray-700">
          <h3 className="text-2xl font-bold text-center mb-4">
            Help and our farmers to produce more quality products!
          </h3>
          <p className="text-center font-bold mb-2">
            Contact us with:
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-4">
            <img src="/Messenger.png" alt="Messenger" className="w-6 h-6" />
            <img src="/fb.png" alt="Facebook" className="w-6 h-6" />
            <div className="flex items-center gap-1">
              <img src="/WhatsApp.png" alt="WhatsApp" className="w-6 h-6" />
              <span className="text-sm font-medium">Jcell Castro</span>
            </div>
          </div>

          <p className="flex justify-center font-bold mt-10 mb-2">
            Donate us with:
          </p>
          <div className="flex justify-center items-center gap-2">
            <img src="/qr code.png" alt="QR" className="w-20 h-20" />
            <span className="text-sm font-bold">
              GCASH <br /> 0928-7272-370
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default FederationSection;
