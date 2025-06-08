import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';

const Associations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPlaceDropdown, setShowPlaceDropdown] = useState(false);
  const itemsPerPage = 10;

  const allFarmers = [
    {
      name: "Pantok Farmers Association",
      location: "Pantok, Binangonan",
      sold: "10k",
      rank: 2,
      categories: ["milks & dairy", "rice", "grains"],
      img: "/555.png",
      gridImg: "/Pantok.png",
      place: "Pantok",
      followers: 245,
      rating: 5.0,
      responseRate: "95%",
      productsSold: "10k"
    },
    {
      name: "Macamot Farmers Association",
      location: "Macamot, Binangonan",
      sold: "12k",
      rank: 1,
      categories: ["fruits", "rice", "vegetables", "root crops"],
      img: "/444.png",
      gridImg: "/Macamot.png",
      place: "Macamot",
      followers: 312,
      rating: 4.9,
      responseRate: "98%",
      productsSold: "12k"
    },
    {
      name: "Tagpos Farmers Association",
      location: "Tagpos, Binangonan",
      sold: "9k",
      rank: 3,
      categories: ["fruits", "root crops", "meat"],
      img: "/222.png",
      gridImg: "/Tagpos.png",
      place: "Tagpos",
      followers: 198,
      rating: 4.8,
      responseRate: "92%",
      productsSold: "9k"
    },
    {
      name: "Bilibiran Farmers Association",
      location: "Bilibiran, Binangonan",
      sold: "8k",
      rank: 4,
      categories: ["vegetables", "grains"],
      img: "/Bilibiran.png",
      place: "Bilibiran",
      followers: 167,
      rating: 4.7,
      responseRate: "90%",
      productsSold: "8k"
    },
    {
      name: "Samahang Magsasaka ng Darangan",
      location: "Darangan, Binangonan",
      sold: "7k",
      rank: 5,
      categories: ["fruits", "vegetables"],
      img: "/Darangan.png",
      place: "Darangan",
      followers: 134,
      rating: 4.6,
      responseRate: "88%",
      productsSold: "7k"
    },
    {
      name: "Hulo Farmers Association",
      location: "Hulo, Binangonan",
      sold: "6k",
      rank: 6,
      categories: ["rice", "root crops"],
      img: "/Hulo.png",
      place: "Hulo",
      followers: 123,
      rating: 4.5,
      responseRate: "85%",
      productsSold: "6k"
    },
    {
      name: "Pugad St. Monique Farmers Association",
      location: "Pugad, Binangonan",
      sold: "5k",
      rank: 7,
      categories: ["vegetables", "fruits"],
      img: "/Pugad.png",
      place: "Pugad",
      followers: 98,
      rating: 4.4,
      responseRate: "82%",
      productsSold: "5k"
    },
    {
      name: "Tabing Dagat Farmers Association",
      location: "T.Dagat, Binangonan",
      sold: "4k",
      rank: 8,
      categories: ["meat", "milks & dairy"],
      img: "/Tabingdagat.png",
      place: "T.Dagat",
      followers: 87,
      rating: 4.3,
      responseRate: "80%",
      productsSold: "4k"
    },
    {
      name: "Kaykansa Farmers Collective",
      location: "Kaykansa, Binangonan",
      sold: "3k",
      rank: 9,
      categories: ["grains", "vegetables"],
      img: "/Kaykansa.png",
      place: "Kaykansa",
      followers: 76,
      rating: 4.2,
      responseRate: "78%",
      productsSold: "3k"
    },
    {
      name: "Kaysapon Agricultural Society",
      location: "Kaysapon, Binangonan",
      sold: "2k",
      rank: 10,
      categories: ["fruits", "root crops"],
      img: "/Kaysapon.png",
      place: "Kaysapon",
      followers: 65,
      rating: 4.1,
      responseRate: "75%",
      productsSold: "2k"
    },
    {
      name: "Kaymaputi Farmers Guild",
      location: "Kaymaputi, Binangonan",
      sold: "1.5k",
      rank: 11,
      categories: ["rice", "grains"],
      img: "/Kaymaputi.png",
      place: "Kaymaputi",
      followers: 54,
      rating: 4.0,
      responseRate: "72%",
      productsSold: "1.5k"
    },
    {
      name: "Pila-pila Farmers Association",
      location: "Pila-pila, Binangonan",
      sold: "1k",
      rank: 12,
      categories: ["vegetables", "milks & dairy"],
      img: "/pila-pila.png",
      place: "Pila-pila",
      followers: 43,
      rating: 3.9,
      responseRate: "70%",
      productsSold: "1k"
    },
    {
      name: "Calumpang Farmers Association",
      location: "Calumpang, Binangonan",
      sold: "900",
      rank: 13,
      categories: ["fruits", "meat"],
      img: "/calumpang.png",
      place: "Calumpang",
      followers: 32,
      rating: 3.8,
      responseRate: "68%",
      productsSold: "900"
    },
    {
      name: "Halang Integrated Farmers Association",
      location: "Halang, Binangonan",
      sold: "800",
      rank: 14,
      categories: ["root crops", "vegetables"],
      img: "/Halang.png",
      place: "Halang",
      followers: 21,
      rating: 3.7,
      responseRate: "65%",
      productsSold: "800"
    },
    {
      name: "Tatala Farmers Association",
      location: "Tatala, Binangonan",
      sold: "700",
      rank: 15,
      categories: ["grains", "rice"],
      img: "/tatala.png",
      place: "Tatala",
      followers: 18,
      rating: 3.6,
      responseRate: "62%",
      productsSold: "700"
    },
    {
      name: "Mambog Farmers Association",
      location: "Mambog, Binangonan",
      sold: "600",
      rank: 16,
      categories: ["fruits", "vegetables"],
      img: "/mambog.png",
      place: "Mambog",
      followers: 15,
      rating: 3.5,
      responseRate: "60%",
      productsSold: "600"
    }
  ];

  // Filter farmers based on selected filters
  const getFilteredFarmers = () => {
    let filtered = [...allFarmers];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(farmer => 
        farmer.categories.some(cat => 
          cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    // Filter by place
    if (selectedPlace) {
      filtered = filtered.filter(farmer => 
        farmer.place && farmer.place.toLowerCase() === selectedPlace.toLowerCase()
      );
    }

    // Sort by selected filter
    switch (selectedFilter) {
      case "Latest":
        // For demo purposes, reverse the array to simulate latest
        filtered = filtered.reverse();
        break;
      case "Top Sales":
        filtered = filtered.sort((a, b) => {
          const aSales = parseFloat(a.sold.replace('k', '')) * (a.sold.includes('k') ? 1000 : 1);
          const bSales = parseFloat(b.sold.replace('k', '')) * (b.sold.includes('k') ? 1000 : 1);
          return bSales - aSales;
        });
        break;
      case "Relevance":
      default:
        filtered = filtered.sort((a, b) => a.rank - b.rank);
        break;
    }

    return filtered;
  };

  const filteredFarmers = getFilteredFarmers();
  const paginatedFarmers = filteredFarmers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);

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

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePlaceFilter = (place) => {
    setSelectedPlace(place);
    setShowPlaceDropdown(false);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSortFilter = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPlace("");
    setSelectedFilter("Relevance");
    setCurrentPage(1);
  };

  // Individual filter removal functions
  const removeCategoryFilter = () => {
    setSelectedCategory("");
    setSelectedFilter("Relevance");
    setCurrentPage(1);
  };

  const removePlaceFilter = () => {
    setSelectedPlace("");
    setSelectedFilter("Relevance");
    setCurrentPage(1);
  };

  // NEW: Function to handle View Shop navigation with association data
  const handleViewShop = (farmer) => {
    navigate('/view-shop', {
      state: {
        associationData: {
          id: farmer.rank,
          img: farmer.img,
          name: farmer.name,
          tags: farmer.categories,
          location: farmer.location,
          followers: farmer.followers,
          rating: farmer.rating,
          responseRate: farmer.responseRate,
          productsSold: farmer.productsSold,
        }
      }
    });
  };

  return (
    <>
      {/* Fixed MainHeader with proper z-index */}
      <div className="relative z-50">
        <MainHeader />
      </div>
      
      {currentPage === 1 && (
        <section className="relative px-6 py-10 bg-[#F5F9F5] overflow-hidden">
          <div className="w-full bg-[#F5F9F5] px-[80px] pt-1 pb-20">
            <div className="flex items-center gap-2 mb-6">
              <img src="/medal.png" alt="medal icon" className="w-8 h-8" />
              <h2 className="text-3xl font-semibold">
                Top Associations of the Month
              </h2>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <img src="/confetti.png" alt="confetti" className="pt-[75px] w-full h-full object-cover" />
            </div>
            <div className="pt-[75px] flex flex-wrap justify-center gap-6 relative z-10">
              {allFarmers.slice(0, 3).map((farmer, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border-[3px] border-black-200 shadow-md w-[350px] text-center flex flex-col items-center justify-between relative ${index === 1 ? 'mt-[-40px]' : 'mt-0'}`}
                >
                  <div className="flex flex-col items-center justify-between h-full w-full">
                    <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
                      <div className="relative w-24 h-24">
                        <img src={farmer.img} alt={farmer.name} className="w-24 h-24 object-cover" />
                      </div>
                      <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                      <p className="text-sm text-gray-500">{farmer.location}</p>
                      <div className="flex items-center gap-2 font-medium mt-1">
                        <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {farmer.categories.map((cat, idx) => (
                          <span key={idx} className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryClass(cat)}`}>{cat}</span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-gray-600">
                      <button 
                        onClick={() => handleViewShop(farmer)}
                        className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-full border-r hover:bg-[#3c9d3f] transition-colors"
                      >
                        <img src="/shopp.png" alt="shop" className="w-5 h-5" />
                        View Shop
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Results Section */}
      <div className="w-full bg-[#F5F9F5] px-[100px] pt-10 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <img src="/sprout.png" alt="sprout icon" className="w-8 h-8" />
          <h2 className="text-3xl font-semibold">
            Meet More Associations
          </h2>
        </div>

        {/* Sort Filter */}
        <div className="flex gap-4 mb-8 relative">
          <div className="flex items-center gap-4 bg-[#EAEAEA] px-6 py-2 rounded-full w-full">
            <p className="text-lg font-semibold text-gray-800">Sort by</p>

            {["Relevance", "Latest", "Top Sales"].map((label, idx) => (
              <button
                key={idx}
                onClick={() => handleSortFilter(label)}
                className={`px-4 py-1 rounded-full font-semibold text-sm border transition ${
                  selectedFilter === label ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}

            {/* Category dropdown - ENHANCED */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(prev => !prev)}
                className={`px-4 py-1 pl-4 pr-3 rounded-full font-semibold text-sm border flex items-center gap-2 transition ${
                  selectedCategory ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <span>{selectedCategory || "Category"}</span>
                <img src="/drop-down.png" alt="dropdown arrow" className={`w-4 h-4 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-[110%] left-0 bg-white border rounded-lg shadow-md mt-1 z-30">
                  {/* NEW: All Categories option */}
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0] font-medium text-gray-700 border-b"
                    onClick={() => {
                      setSelectedCategory("");
                      setSelectedFilter("Relevance");
                      setShowCategoryDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    All Categories
                  </button>
                  {["Grains", "Vegetables", "Root Crops", "Milks & Dairy", "Meat", "Fruits", "Rice"].map((cat) => (
                    <button
                      key={cat}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0]"
                      onClick={() => handleCategoryFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Place dropdown - ENHANCED */}
            <div className="relative">
              <button
                onClick={() => setShowPlaceDropdown(prev => !prev)}
                className={`px-4 py-1 pl-4 pr-3 rounded-full font-semibold text-sm border flex items-center gap-2 transition ${
                  selectedPlace ? 'bg-[#4CAE4F] text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <span>{selectedPlace || "Place"}</span>
                <img src="/drop-down.png" alt="dropdown arrow" className={`w-4 h-4 ${showPlaceDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showPlaceDropdown && (
                <div className="absolute top-[110%] left-0 bg-white border rounded-lg shadow-md mt-1 z-30">
                  {/* NEW: All Places option */}
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0] font-medium text-gray-700 border-b"
                    onClick={() => {
                      setSelectedPlace("");
                      setSelectedFilter("Relevance");
                      setShowPlaceDropdown(false);
                      setCurrentPage(1);
                    }}
                  >
                    All Places
                  </button>
                  {["Bilibiran", "Darangan", "Hulo", "Pugad", "T.Dagat", "Pantok", "Kaykansa", "Kaysapon", "Kaymaputi", "Pila-pila", "Calumpang", "Macamot", "Halang", "Tatala", "Mambog", "Tagpos"].map((place) => (
                    <button
                      key={place}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[#F0F0F0]"
                      onClick={() => handlePlaceFilter(place)}
                    >
                      {place}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {paginatedFarmers.length} of {filteredFarmers.length} associations
          </p>
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
                      src={farmer.gridImg || farmer.img}
                      alt={farmer.name}
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                  <p className="text-sm text-gray-500">{farmer.location}</p>
                  <div className="flex items-center gap-2 font-medium mt-1">
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
                <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-gray-600">
                  <button 
                    onClick={() => handleViewShop(farmer)}
                    className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-full border-r hover:bg-[#3c9d3f] transition-colors"
                  >
                    <img src="/shopp.png" alt="shop" className="w-5 h-5" />
                    View Shop
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No associations found matching your filters.</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-[#4CAE4F] text-white rounded-lg hover:bg-[#3c9d3f]">
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredFarmers.length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`w-[45px] h-[50px] border rounded-xl ${
                currentPage === 1
                  ? 'bg-[#D9D9D9] border-[#858585] text-gray-400 cursor-not-allowed'
                  : 'bg-[#D9D9D9] border-[#858585] text-gray-500 hover:bg-[#c2c2c2]'
              }`}
            >
              &lt;
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((num) => (
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

            {totalPages > 5 && (
              <button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
                ...
              </button>
            )}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-[45px] h-[50px] rounded-xl border ${
                currentPage === totalPages
                  ? 'bg-[#D9D9D9] border-[#858585] text-gray-400 cursor-not-allowed'
                  : 'bg-[#D9D9D9] border-[#858585] text-[#858585] hover:bg-[#c2c2c2]'
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Associations;