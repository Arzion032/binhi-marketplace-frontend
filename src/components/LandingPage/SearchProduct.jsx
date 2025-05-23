import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [selectedFilter, setSelectedFilter] = useState("Relevance");

  const products = [
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] pt-8 pb-20">
      {/* Aligned Header + Filters */}
      <div className="mx-[220px] max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
          <h2 className="text-3xl font-semibold">
            Product results for ‘<span className="text-green-600">{query}</span>’
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {["Sort by", "Relevance", "Latest", "Top Sales", "Price"].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFilter(label)}
              className={`px-4 py-1 rounded-full font-medium text-sm border
                ${
                  selectedFilter === label
                    ? 'bg-green-100 text-green-600 border-green-500'
                    : 'bg-[#EAEAEA] text-gray-700 border-gray-300'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Product Grid */}
      <section className="px-6 py-6 bg-[#F5F9F5]">
<div className="mx-[200px] max-w-[1500px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {products.map((product, index) => (
            <div
              key={index}
  className="bg-white rounded-xl shadow-md p-6 w-full text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
            >
              <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                VEGETABLE
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain rounded-xl"
              />
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
                <img
                  src="/shopping-cart.png"
                  alt="cart"
                  className="w-6 h-6 transition-transform duration-100 hover:scale-125"
                />
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

        {/* See More Button */}
        <div className="flex justify-center mt-10">
          <button className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110">
            See More
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchProduct;
