import React from 'react';

const AddressModal = ({
  showAddressModal,
  selectedTab,
  setSelectedTab,
  regions,
  provinces,
  cities,
  barangays,
  selectedRegion,
  selectedProvince,
  selectedCity,
  selectedBarangay,
  handleRegionSelect,
  handleProvinceSelect,
  handleCitySelect,
  handleBarangaySelect
}) => {
  if (!showAddressModal) return null;

  return (
    <div className="absolute top-full left-0 mt-2 overflow-hidden rounded-3xl border-2 border-green-500 bg-white shadow-xl z-50 w-full pointer-events-auto">
      {/* Tabs with Green Background */}
      <div className="flex bg-gray-100">
        {["Region", "Province", "City", "Barangay"].map((tab) => (
          <button
            key={tab}
            className={`relative flex-1 py-2 px-2 text-sm font-medium ${
              selectedTab === tab ? "text-green-600" : "text-gray-700"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
            {/* Green underline for active tab */}
            {selectedTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content with Custom Scrollbar */}
      <div
        className="max-h-48 overflow-y-auto bg-white custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#4CAE4F transparent",
        }}
      >
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4CAE4F;
            border-radius: 20px;
          }
        `}</style>

        {selectedTab === "Region" && (
          <div>
            {regions.map((region) => (
              <div
                key={region}
                className={`py-2 px-4 cursor-pointer text-left ${
                  selectedRegion === region
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleRegionSelect(region)}
              >
                {region}
              </div>
            ))}
          </div>
        )}

        {selectedTab === "Province" && (
          <div>
            {provinces[selectedRegion]?.map((province) => (
              <div
                key={province}
                className={`py-2 px-4 cursor-pointer text-left ${
                  selectedProvince === province
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleProvinceSelect(province)}
              >
                {province}
              </div>
            ))}
          </div>
        )}

        {selectedTab === "City" && (
          <div>
            {cities[selectedProvince]?.map((city) => (
              <div
                key={city}
                className={`py-2 px-4 cursor-pointer text-left ${
                  selectedCity === city
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}

        {selectedTab === "Barangay" && (
          <div>
            {barangays[selectedCity]?.map((barangay) => (
              <div
                key={barangay}
                className={`py-2 px-4 cursor-pointer text-left ${
                  selectedBarangay === barangay
                    ? "bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleBarangaySelect(barangay)}
              >
                {barangay}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressModal;