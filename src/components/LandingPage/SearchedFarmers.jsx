import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchedFarmers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);
  const itemsPerPage = 15;

  const farmerTemplates = [
    {
      name: "Anton Benidas",
      location: "Macamot, Binangonan",
      rating: 5.0,
      sold: "10k",
      rank: 2,
      categories: ["milks & dairy", "rice", "grains"],
      img: "/222.jpg",
    },
    {
      name: "John Doe Pasig",
      location: "Macamot, Binangonan",
      rating: 5.0,
      sold: "12k",
      rank: 1,
      categories: ["fruits", "rice", "vegetables", "root crops"],
      img: "/444.png",
    },
    {
      name: "Jonathan De Vera",
      location: "Macamot, Binangonan",
      rating: 5.0,
      sold: "9k",
      rank: 3,
      categories: ["fruits", "root crops", "meat"],
      img: "/555.png",
    },
  ];

  const farmers = Array.from({ length: 20 }, (_, i) => {
    return { ...farmerTemplates[i % farmerTemplates.length] };
  });

  const paginatedFarmers = farmers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryClass = (cat) => {
    switch (cat.toLowerCase()) {
      case 'vegetables':
      case 'root crops':
      case 'milks & dairy':
        return 'bg-[#8BC34A] text-white';
      case 'grains':
      case 'fruits':
        return 'bg-[#D1A157] text-white';
      case 'meat':
      case 'rice':
        return 'bg-[#4CAE4F] text-white';
      default:
        return 'bg-green-100 text-green-800';
    }
  };
  
  return (
    <>
      <section className="relative px-6 py-10 bg-[#F5F9F5] overflow-hidden">
        <div className="w-full bg-[#F5F9F5] px-[80px] pt-1 pb-20">
          <div className="flex items-center gap-2 mb-6">
        <img src="/medal.png" alt="medal icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Top Farmers of the Month ‘<span className="text-green-600">{query}</span>’
            </h2>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <img src="/confetti.png" alt="confetti" className="pt-[60px] w-full h-full object-cover" />
          </div>
          <div className="pt-[75px] flex flex-wrap justify-center gap-6 relative z-10">
            {farmers.slice(0, 3).map((farmer, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border-[3px] border-black-200 shadow-md w-[350px] text-center flex flex-col items-center justify-between relative ${index === 1 ? 'mt-[-40px]' : 'mt-0'}`}
              >
                <div className="flex flex-col items-center justify-between h-full w-full">
                  <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
                    <div className="relative w-24 h-24">
                      <img src={farmer.img} alt={farmer.name} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.location}</p>
                    <div className="flex items-center gap-2 font-medium mt-1">
                      <img src="/Star.png" alt="star" className="h-5 w-5" />
                      <span className="text-black">{Number(farmer.rating).toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">|</span>
                      <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {farmer.categories.map((cat, idx) => (
                        <span key={idx} className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryClass(cat)}`}>{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-black">
                    <button className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-1/2 border-r border-black">
                      <img src="/shopp.png" alt="shop" className="w-5 h-5" />
                      View Shop
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white text-[#4CAE4F] text-[16px] font-semibold py-3 w-1/2">
                      <img src="/chat.png" alt="chat" className="w-5 h-5" />
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Results Section */}
      <div className="w-full bg-[#F5F9F5] px-[100px] pt-10 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
          <h2 className="text-3xl font-semibold">
            Product results for ‘<span className="text-green-600">{query}</span>’
          </h2>
        </div>
 {/* Sort Filter */}
      <div className="flex gap-4 mb-8 relative">
        <div className="flex items-center gap-4 bg-[#EAEAEA] px-6 py-2 rounded-full w-full">
          <p className="text-lg font-semibold text-gray-800">Sort by</p>

          {["Relevance", "Latest", "Top Sales"].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(label)}
              className={`px-4 py-1 rounded-full font-semibold text-sm border transition ${
                selectedFilter === label ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}

          {/* Category dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(prev => !prev)}
              className={`px-4 py-1 pl-4 pr-3 rounded-full font-semibold text-sm border flex items-center gap-2 transition ${
                selectedFilter === "Category" ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <span>Category</span>
              <img src="/drop-down.png" alt="dropdown arrow" className={`w-4 h-4 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-[110%] left-0 bg-white border rounded-lg shadow-md mt-1 z-20">
                {["Grains", "Vegetables", "Root Crops", "Milks & Dairy", "Meats", "Fruits"].map((cat) => (
                  <button
                    key={cat}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0]"
                    onClick={() => {
                      console.log("Category filter:", cat);
                      setSelectedFilter("Category");
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Place dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPlaceDropdown(prev => !prev)}
              className={`px-4 py-1 pl-4 pr-3 rounded-full font-semibold text-sm border flex items-center gap-2 transition ${
                selectedFilter === "Place" ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <span>Place</span>
              <img src="/drop-down.png" alt="dropdown arrow" className={`w-4 h-4 ${showPlaceDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showPlaceDropdown && (
              <div className="absolute top-[110%] left-0 bg-white border rounded-lg shadow-md mt-1 z-20">
                {["Bilibiran", "Darangan", "Hulo", "Pugao", "T.Dagat", "Pantok", "Kaykansa", "Kaysapon", "Kaymaputi", "Pila-pila", "Calumpang", "Macamot", "Halang", "Tatala", "Mambog"].map((place) => (
                  <button
                    key={place}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0]"
                    onClick={() => {
                      console.log("Place filter:", place);
                      setSelectedFilter("Place");
                      setShowPlaceDropdown(false);
                    }}
                  >
                    {place}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

        {/* Farmer Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
        {paginatedFarmers.map((farmer, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border-[3px] border-black-200 shadow-md text-center flex flex-col items-center justify-between relative"
          >
            <div className="flex flex-col items-center justify-between h-full w-full">
              <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <img
                    src={farmer.img}
                    alt={farmer.name}
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                <p className="text-sm text-gray-500">{farmer.location}</p>
                <div className="flex items-center gap-2 font-medium mt-1">
                  <img src="/Star.png" alt="star" className="h-5 w-5" />
                  <span className="text-black">{Number(farmer.rating).toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">|</span>
                  <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {farmer.categories.map((cat, idx) => (
                    <span key={idx} className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryClass(cat)}`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-black">
                <button className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-1/2 border-r border-black">
                  <img src="/shopp.png" alt="shop" className="w-5 h-5" />
                  View Shop
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-[#4CAE4F] text-[16px] font-semibold py-3 w-1/2">
                  <img src="/chat.png" alt="chat" className="w-5 h-5" />
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-[45px] h-[50px] bg-[#D9D9D9] border border-[#858585] rounded-xl text-gray-500 hover:bg-[#c2c2c2]"
        >
          &lt;
        </button>

        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${
              currentPage === num
                ? 'bg-[#4CAE4F] text-white border-[#4CAE4F] hover:bg-[#3c9d3f]'
                : 'bg-[#D9D9D9] text-[#858585] border-[#858585] hover:bg-[#bfbfbf]'
            }`}
          >
            {num}
          </button>
        ))}

        <button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
          ...
        </button>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-[45px] h-[50px] rounded-xl bg-[#D9D9D9] border border-[#858585] text-[#858585] hover:bg-[#c2c2c2]"
        >
          &gt;
        </button>
      </div>
            </div>
            
        {/* Footer Section */}
        <footer className="bg-[#D9D9D9] pt-10 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 gap-y-1 text-sm text-gray-700 mx-1 mb-2 text-center md:text-left mx-[100px]">
            <div className="flex flex-col items-center">
              <div className="flex flex-col">
                <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" />
                <p className="text-[15px] text-green-600 text-center">Ang Ugat sa Masaganang Bukas!</p>
              </div>
            </div>
            <div className="mx-4">
              <p className="text-[15px] font-bold mb-3">CUSTOMER SERVICE</p>
              <ul className="space-y-1">
                <li>Help Center</li>
                <li>Payment Methods</li>
                <li>Return & Refund</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="mx-4">
              <p className="text-[15px] font-bold mb-3">ABOUT BINHI</p>
              <ul className="space-y-1">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Binhi Seller Center</li>
              </ul>
            </div>
            <div className="mx-4">
              <p className="text-[15px] font-bold mb-3">PAYMENT METHODS</p>
              <div className="grid grid-cols-2 gap-2">
                <img src="/cod.png" alt="COD" />
                <img src="/gcash.png" alt="GCash" />
                <img src="/paypal.png" alt="PayPal" />
                <img src="/maya.png" alt="Maya" />
              </div>
            </div>
            <div className="mx-4">
              <p className="text-[15px] font-bold mb-3">FOLLOW US</p>
              <ul className="space-y-1">
                <li className="flex items-center space-x-1">
                  <img src="/Facebook.png" alt="Facebook" />
                  <span>BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/Messenger.png" alt="Messenger" />
                  <span>@BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/WhatsApp.png" alt="WhatsApp" />
                  <span>BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/Instagram.png" alt="Instagram" />
                  <span>BINHI Corp.</span>
                </li>
              </ul>
            </div>
          </div>
                </footer>
        <div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px]">
          Binhi 2024, All Rights Reserved.
        </div>

    </>
  );
};

export default SearchedFarmers;
