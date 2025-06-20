import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query'); 

  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [showPriceDropdown, setPriceDropdown] = useState(false);

  const [products, setProducts] = useState([
    { name: "Automatic-Cook Rice from the Field of Antartica", price: "₱136", sold: 227, image: "/Search-rice.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱100.00", sold: 227, image: "/brocco.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱105.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱100.00", sold: 227, image: "/brocco.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱105.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱105.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
  ]);

  return (
    <>
      <MainHeader />
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        <div className="mx-[85px] max-w-[1700px]">
          <div className="mx-[206px] flex items-center gap-2 mb-6">
            <img src="/star-outline.png" alt="star icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Featured Products{' '}
              <span className="text-lg font-normal text-gray-400">
                From Binangonan Municipal Farmers Federation Inc.
              </span>
              <span className="text-green-600">
                {query ? `‘${query}’` : ''}
              </span>
            </h2>
          </div>

          {/* Sort By Filter Bar */}
          <div className="mx-[206px] flex gap-4 mb-8">
            <div className="relative flex items-center gap-4 bg-[#EAEAEA] px-6 py-2 rounded-full w-full z-10">
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
              {/* Price dropdown */}
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
                          setShowPriceDropdown(false);
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
            {products.map((product, index) => (
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

          {/* Login to See More */}
          <div className="flex justify-center mt-10">
            <button
              className="text-lg font-bold bg-white border-2 border-gray-700 text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110 hover:border-[#4CAE4F] mb-5"
              onClick={() => navigate('/login')}
            >
              Login to see more
            </button>
          </div>
        </div>

        {/* Footer */}
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

export default FeaturedProducts;
