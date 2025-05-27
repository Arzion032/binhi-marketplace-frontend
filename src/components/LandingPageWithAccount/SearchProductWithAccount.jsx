import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';

const SearchProductWithAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [showPriceDropdown, setPriceDropdown] = useState(false);
  const [products, setProducts] = useState(
    new Array(50).fill({
      name: "Automatic-Cook Rice from the Field of Antartica",
      price: "₱53.00",
      sold: 227,
      image: "/Search-rice.png",
    })
  );

  const itemsPerPage = 15;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, products]);

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
      name: "John Doe Pasig",
      location: "Macamot, Binangonan",
      rating: 5.0,
      sold: "12k",
      rank: 1,
      categories: ["fruits", "rice", "vegetables", "root crops"],
      img: "/444.png",
    },
    {
      name: "Anton Benidas",
      location: "Macamot, Binangonan",
      rating: 5.0,
      sold: "10k",
      rank: 2,
      categories: ["milks & dairy", "rice", "grains"],
      img: "/222.jpg",
    },
  ];

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
      <MainHeader />
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        <div className="mx-[85px] max-w-[1700px]">
          {/* Farmer Section */}
          <div className="mx-[200px] flex items-center gap-2 mb-6">
            <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Farmer results for ‘<span className="text-green-600">{query}</span>’
            </h2>
          </div>

          <div className="mx-[190px] pb-10 overflow-x-auto">
            <div className="flex gap-4 w-max">
              {[...farmerTemplates, ...farmerTemplates, ...farmerTemplates].map((farmer, index) => (
                <div key={index} className="min-w-[350px]">
                  {/* farmer card here */}
                  <div className="bg-white rounded-2xl border-[3px] border-black-200 shadow-md text-center flex flex-col items-center justify-between h-full">
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
                            <span
                              key={idx}
                              className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryClass(cat)}`}
                            >
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
                </div>
              ))}
            </div>
          </div>

          <div className="mx-[190px] text-md text-gray-400 text-left mt-2 mb-5">
            Scroll to see more farmers →
          </div>

          {/* Product Header */}
          <div className="mx-[200px] flex items-center gap-2 mb-6">
            <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Product results for ‘<span className="text-green-600">{query}</span>’
            </h2>
          </div>

          {/* Sort Filter Bar */}
          <div className="mx-[200px] flex gap-4 mb-8">
            <div className="flex items-center gap-4 bg-[#EAEAEA] px-6 py-2 rounded-full w-full">
              <p className="text-lg font-semibold text-gray-800">Sort by</p>
              {["Relevance", "Latest", "Top Sales"].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFilter(label)}
                  className={`px-4 py-1 rounded-full font-semibold text-sm border transition ${
                    selectedFilter === label
                      ? 'bg-[#4CAE4F] text-white'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Price Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPriceDropdown(prev => !prev)}
                  className={`px-4 py-1 pl-4 pr-3 rounded-full font-semibold text-sm border flex items-center gap-2 transition ${
                    selectedFilter === "Price"
                      ? 'bg-[#4CAE4F] text-white'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <span>Price</span>
                  <img
                    src="/drop-down.png"
                    alt="dropdown arrow"
                    className={`w-4 h-4 transition-transform duration-200 ${showPriceDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {showPriceDropdown && (
                  <div className="absolute top-[110%] left-0 bg-white border rounded-lg shadow-md z-[999] w-max min-w-[160px]">
                    {["Low to High", "High to Low"].map((cat) => (
                      <button
                        key={cat}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0]"
                        onClick={() => {
                          const sorted = [...products].sort((a, b) => {
                            const priceA = parseFloat(a.price.replace("₱", ""));
                            const priceB = parseFloat(b.price.replace("₱", ""));
                            return cat === "Low to High" ? priceA - priceB : priceB - priceA;
                          });
                          setProducts(sorted);
                          setSelectedFilter("Price");
                          setPriceDropdown(false);
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
              >
                <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  VEGETABLE
                </span>
                <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
                <p className="text-left font-semibold text-[20px]">{product.name}</p>
                <p className="text-[#4CAE4F] text-[20px] font-bold">
                  {product.price}
                  <span className="text-[15px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2 ml-1">
                    per pc.
                  </span>
                </p>
                <div className="text-[20px] text-gray-600 mt-4 flex items-center gap-1">
                  <img src="/Star.png" alt="star" className="w-4 h-4" />
                  5.0 • {product.sold} Sold
                </div>
                <div className="flex items-center justify-between gap-4 mt-2">
                  <img src="/shopping-cart.png" alt="cart" className="w-6 h-6 transition-transform duration-100 hover:scale-125" />
                  <button
                    onClick={() => navigate(`/product/${index}`)}
                    className="text-[20px] bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
                  >
                    Buy Now
                  </button>
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${
                  currentPage === num
                    ? 'bg-[#4CAE4F] text-white border-[#4CAE4F]'
                    : 'bg-[#D9D9D9] text-[#858585] border-[#858585]'
                }`}
              >
                {num}
              </button>
            ))}

            <button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
              ...
            </button>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="w-[45px] h-[50px] rounded-xl bg-[#D9D9D9] border border-[#858585] text-[#858585] hover:bg-[#c2c2c2]"
            >
              &gt;
            </button>
          </div>

        </div>

        {/* Footer Section */}
        <footer className="bg-[#D9D9D9] mt-2 pt-10 pb-4">
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
      </div>
    </>
  );
};

export default SearchProductWithAccount;
