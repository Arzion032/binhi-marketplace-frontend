import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';
import ProductCard from '../LandingPage/ProductCard';
import api from '../../api';
import MainFooter from '../UI/MainFooter';
import { allFarmers } from '../LandingPage/AllAssociationCard';

const SearchProductWithAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Relevance");
  const [showPriceDropdown, setPriceDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Category mapping for products to farmer categories
  const productCategoryToFarmerCategory = {
    'potato': 'vegetables',
    'tomato': 'vegetables',
    'carrot': 'vegetables',
    'cabbage': 'vegetables',
    'lettuce': 'vegetables',
    'onion': 'vegetables',
    'garlic': 'vegetables',
    'corn': 'grains',
    'wheat': 'grains',
    'barley': 'grains',
    'rice': 'rice',
    'apple': 'fruits',
    'banana': 'fruits',
    'orange': 'fruits',
    'mango': 'fruits',
    'grapes': 'fruits',
    'beef': 'meat',
    'pork': 'meat',
    'chicken': 'meat',
    'fish': 'meat',
    'milk': 'milks & dairy',
    'cheese': 'milks & dairy',
    'yogurt': 'milks & dairy',
    'butter': 'milks & dairy',
    'cassava': 'root crops',
    'sweet potato': 'root crops',
    'yam': 'root crops',
    'taro': 'root crops'
  };

  // Get category from search query or product data
  const getCategoryFromQuery = (searchQuery) => {
    if (!searchQuery) return null;
    
    const queryLower = searchQuery.toLowerCase();
    
    // Direct mapping from product name to category
    for (const [product, category] of Object.entries(productCategoryToFarmerCategory)) {
      if (queryLower.includes(product)) {
        return category;
      }
    }
    
    // Check if query directly matches a category
    const categories = ['vegetables', 'fruits', 'grains', 'rice', 'meat', 'milks & dairy', 'root crops'];
    for (const category of categories) {
      if (queryLower.includes(category.toLowerCase())) {
        return category;
      }
    }
    
    return null;
  };

  // Get category from products for more intelligent filtering
  const getCategoryFromProducts = (products, searchQuery) => {
    if (!products.length || !searchQuery) return null;
    
    // Look at the categories of matching products
    const matchingProducts = products.filter(product => {
      const searchTermLower = searchQuery.toLowerCase();
      return product.name?.toLowerCase().includes(searchTermLower) ||
             product.description?.toLowerCase().includes(searchTermLower) ||
             product.category?.toLowerCase().includes(searchTermLower);
    });
    
    if (matchingProducts.length > 0) {
      // Get the most common category from matching products
      const categoryCount = {};
      matchingProducts.forEach(product => {
        if (product.category) {
          const category = product.category.toLowerCase();
          // Map product categories to farmer categories
          let farmerCategory = category;
          if (category.includes('vegetable')) farmerCategory = 'vegetables';
          else if (category.includes('fruit')) farmerCategory = 'fruits';
          else if (category.includes('grain')) farmerCategory = 'grains';
          else if (category.includes('meat')) farmerCategory = 'meat';
          else if (category.includes('dairy') || category.includes('milk')) farmerCategory = 'milks & dairy';
          else if (category.includes('root')) farmerCategory = 'root crops';
          else if (category.includes('rice')) farmerCategory = 'rice';
          
          categoryCount[farmerCategory] = (categoryCount[farmerCategory] || 0) + 1;
        }
      });
      
      // Return the most common category
      const mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => 
        categoryCount[a] > categoryCount[b] ? a : b, null);
      
      return mostCommonCategory;
    }
    
    return null;
  };

  // Filter farmers based on search query
  const filteredFarmers = useMemo(() => {
    if (!query || !query.trim()) {
      // Show top 4 farmers by rank when no search query
      return allFarmers.slice(0, 4);
    }

    const searchTerm = query.trim().toLowerCase();
    
    // Get category from query or products
    let targetCategory = getCategoryFromQuery(searchTerm);
    if (!targetCategory && products.length > 0) {
      targetCategory = getCategoryFromProducts(products, searchTerm);
    }

    let filtered = allFarmers.filter(farmer => {
      // Search by farmer name
      const nameMatch = farmer.name.toLowerCase().includes(searchTerm);
      
      // Search by location/place
      const locationMatch = farmer.location.toLowerCase().includes(searchTerm) ||
                           farmer.place.toLowerCase().includes(searchTerm);
      
      // Search by categories
      const categoryMatch = farmer.categories.some(cat => 
        cat.toLowerCase().includes(searchTerm)
      );
      
      // If we found a target category, prioritize farmers with that category
      const targetCategoryMatch = targetCategory ? 
        farmer.categories.some(cat => cat.toLowerCase() === targetCategory.toLowerCase()) : false;
      
      return nameMatch || locationMatch || categoryMatch || targetCategoryMatch;
    });

    // Sort by relevance - prioritize farmers with target category
    if (targetCategory) {
      filtered.sort((a, b) => {
        const aHasTarget = a.categories.some(cat => cat.toLowerCase() === targetCategory.toLowerCase());
        const bHasTarget = b.categories.some(cat => cat.toLowerCase() === targetCategory.toLowerCase());
        
        if (aHasTarget && !bHasTarget) return -1;
        if (!aHasTarget && bHasTarget) return 1;
        
        // If both have target category or neither has it, sort by rank
        return a.rank - b.rank;
      });
    } else {
      // Sort by rank if no specific category
      filtered.sort((a, b) => a.rank - b.rank);
    }

    // Limit to 8 results to avoid overwhelming the UI
    return filtered.slice(0, 8);
  }, [query, products, allFarmers]);

  // Fetch all products on component mount
  useEffect(() => {
    setLoading(true);
    api.get("/products/landing-page/")
      .then(res => {
        console.log('Fetched all products:', res.data);
        setAllProducts(res.data);
        // Initially show all products if no search query
        if (!query || !query.trim()) {
          setProducts(res.data);
        }
      })
      .catch(err => {
        setError(err.message || "Error fetching products");
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Search functionality that works in real-time
  useEffect(() => {
    if (!allProducts.length) return; // Don't search until products are loaded

    console.log('Search query changed:', query);
    console.log('All products count:', allProducts.length);
    
    if (query && query.trim()) {
      setLoading(true);
      setCurrentPage(1); // Reset to first page on new search
      
      // First try to search via API
      api.get(`/products/search/?query=${encodeURIComponent(query.trim())}`)
        .then((res) => {
          console.log('API search results:', res.data);
          if (res.data && res.data.length > 0) {
            setProducts(res.data);
          } else {
            // If no results from API, filter locally
            performLocalSearch(query.trim());
          }
        })
        .catch((err) => {
          console.error("Search API error:", err);
          // Fallback to local filtering if API fails
          performLocalSearch(query.trim());
        })
        .finally(() => setLoading(false));
    } else {
      // If no query, show all products
      console.log('No query, showing all products');
      setProducts(allProducts);
    }
  }, [query, allProducts]);

  const performLocalSearch = (searchTerm) => {
    const filteredProducts = allProducts.filter(product => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchName = product.name?.toLowerCase().includes(searchTermLower);
      const matchDesc = product.description?.toLowerCase().includes(searchTermLower);
      const matchCategory = product.category?.toLowerCase().includes(searchTermLower);
      
      console.log(`Checking product: ${product.name}, matches: name=${matchName}, desc=${matchDesc}, cat=${matchCategory}`);
      return matchName || matchDesc || matchCategory;
    });
    console.log(`Local search for "${searchTerm}" found ${filteredProducts.length} results`);
    setProducts(filteredProducts);
  };
  
  const itemsPerPage = 15;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, products]);

  // Show toast notification
  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

  // Handle sorting
  const handleSort = (sortType) => {
    let sorted = [...products];
    
    switch (sortType) {
      case 'Latest':
        sorted = sorted.sort((a, b) => new Date(b.created_at || b.date_created) - new Date(a.created_at || a.date_created));
        break;
      case 'Top Sales':
        sorted = sorted.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
        break;
      case 'Low to High':
        sorted = sorted.sort((a, b) => parseFloat(a.unit_price || 0) - parseFloat(b.unit_price || 0));
        break;
      case 'High to Low':
        sorted = sorted.sort((a, b) => parseFloat(b.unit_price || 0) - parseFloat(a.unit_price || 0));
        break;
      default: // Relevance
        // Keep original order or sort by relevance score if available
        break;
    }
    
    setProducts(sorted);
    setSelectedFilter(sortType === 'Low to High' || sortType === 'High to Low' ? 'Price' : sortType);
    setCurrentPage(1);
  };

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

  if (loading && !allProducts.length) {
    return (
      <>
        <MainHeader />
        <div className="min-h-screen w-full bg-[#F5F9F5] pt-8 flex items-center justify-center">
          <div className="text-2xl font-semibold text-gray-600">Loading...</div>
        </div>
      </>
    );
  }
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
      <MainHeader />
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        {/* Toast Modal */}
        {showToast && (
          <div className="fixed pt-10 inset-0 flex items-center justify-center z-50">
            <div className="border-2 border-[#858585] bg-white rounded-3xl p-10 w-[420px] shadow-xl text-center">
              <img src="/Checkpass.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{selectedProductName}</h3>
              <p className="text-lg">has been added to your shopping cart</p>
            </div>
          </div>
        )}

        <div className="mx-[85px] max-w-[1700px]">
          {/* Farmer Section */}
          <div className="mx-[200px] flex items-center gap-2 mb-6">
            <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Associations results for '<span className="text-green-600">{query || 'all'}</span>'
              <span className="text-gray-500 text-xl ml-2">({filteredFarmers.length} associations)</span>
            </h2>
          </div>

          {filteredFarmers.length === 0 ? (
            <div className="mx-[200px] text-center py-10">
              <div className="text-gray-500 text-lg mb-2">
                No associations found for "{query}"
              </div>
              <div className="text-gray-400 text-sm">
                Try searching with different keywords or browse all associations
              </div>
            </div>
          ) : (
            <>
              <div className="mx-[190px] pb-10 overflow-x-auto">
                <div className="flex gap-4 w-max">
                  {filteredFarmers.map((farmer, index) => (
                    <div key={index} className="min-w-[350px]">
                      <div className="bg-white rounded-2xl border-[3px] border-black-200 shadow-md text-center flex flex-col items-center justify-between h-full">
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
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-[190px] text-md text-gray-400 text-left mt-2 mb-5">
                {filteredFarmers.length > 4 ? 'Scroll to see more farmers →' : ''}
              </div>
            </>
          )}

          {/* Product Section */}
          <div className="mx-[200px] flex items-center gap-2 mb-6">
            <img src="/text-search.png" alt="search icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">
              Product results for '<span className="text-green-600">{query || 'all'}</span>' 
              <span className="text-gray-500 text-xl ml-2">({products.length} results)</span>
            </h2>
          </div>

          {/* Sort Filter Bar */}
          <div className="mx-[200px] flex gap-4 mb-8">
            <div className="flex items-center gap-4 bg-[#EAEAEA] px-6 py-2 rounded-full w-full">
              <p className="text-lg font-semibold text-gray-800">Sort by</p>
              {["Relevance", "Latest", "Top Sales"].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSort(label)}
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
                          handleSort(cat);
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
          {products.length === 0 ? (
            <div className="mx-[200px] text-center py-20">
              <div className="text-gray-500 text-xl mb-4">
                {query ? `No products found for "${query}"` : "No products available"}
              </div>
              <div className="text-gray-400">
                Try searching with different keywords or browse all products
              </div>
            </div>
          ) : (
            <>
              <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6">
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    onCardClick={() => navigate(`/product/${product.id || index}`)}
                    onAddToCart={() => {
                      setSelectedProductName(product.name);
                      showModalToast();
                    }}
                    onBuyNow={() => navigate(`/product/${product.id || index}`)}
                  />
                ))}
              </div>
              
              <div className="mb-10 flex justify-center mt-10">
                <button
                  onClick={() => navigate('/daily-needs')}
                  className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110"
                >
                  See More
                </button>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-[45px] h-[50px] bg-[#D9D9D9] border border-[#858585] rounded-xl text-gray-500 hover:bg-[#c2c2c2] disabled:opacity-50"
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

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-[45px] h-[50px] rounded-xl bg-[#D9D9D9] border border-[#858585] text-[#858585] hover:bg-[#c2c2c2] disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
            <MainFooter />
    </>
  );
};

export default SearchProductWithAccount;