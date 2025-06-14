import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';
import MainFooter from '../UI/MainFooter';

const ViewShop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const associationData = location.state?.associationData;  // Access the passed data

  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [showPriceDropdown, setPriceDropdown] = useState(false);
  const [products, setProducts] = useState(
    new Array(20).fill({
      name: "Automatic-Cook Rice from the Field of Antarctica",
      price: "₱53.00",
      sold: 227,
      image: "/Search-rice.png",
    })
  );

  if (!associationData) {
    return <div>Loading...</div>;  // Handle case if no data is passed
  }


  return (
    <>
      <MainHeader />
      
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-5">
        {/* Association Profile Card */}
        <div className="mx-[85px] max-w-[1700px] mb-10 mt-10">
          <div className="mx-[206px] border-2 border-[#4CAE4F] rounded-3xl px-8 py-6 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-8">
              
              {/* LEFT SIDE: Image and Name */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                        src={associationData.img}  // Fallback to default image if img is missing
                        alt={associationData.name}
                        className="w-24 h-22 object-cover"
                      />
              </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{associationData.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                  </div>
                </div>
              </div>

              {/* MIDDLE: Seller Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src="/map-pin.png" className="w-5 h-5" alt="Location" />
                  <span className="text-base text-gray-700">{associationData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/group-seller.png" className="w-5 h-5" alt="Products Sold" />
                  <span className="text-base text-gray-700">{associationData.productsSold} Products Sold</span>
                </div>
              </div>

              {/* RIGHT: Tags */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-base font-medium mb-3">
                  <img src="/Artichoke.png" alt="What I sell?" className="w-6 h-6" />
                  <span className="text-gray-800">What I sell?</span>
                </div>

                <div className="flex flex-wrap gap-2 max-w-[280px]">
                  {associationData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                        tag === "vegetables" 
                          ? "bg-[#8BC34A] text-white"
                          : tag === "root crops"
                          ? "bg-[#8BC34A] text-white" 
                          : tag === "grains"
                          ? "bg-[#D1A157] text-white"
                          : "bg-[#4CAE4F] text-white"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="mx-[85px] max-w-[1700px]">
          <div className="mx-[206px] flex items-center gap-2 mb-6">
            <img src="/star-outline.png" alt="star icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Recommended for you
            </h2>
          </div>

          {/* Sort By */}
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

          {/* Products */}
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
        </div>

      </div>
      <MainFooter />
    </>
  );
};

export default ViewShop;
