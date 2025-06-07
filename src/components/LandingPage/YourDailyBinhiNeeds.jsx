import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';
import MainFooter from '../UI/MainFooter';
import ProductCard from './ProductCard';
import LoadingScreen from '../UI/LoadingScreen';
import api from '../../api';

const itemsPerPage = 15;

const YourDailyBinhiNeeds = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');

  // Fetch products from API
  useEffect(() => {
    api.get("/products/")
      .then(res => {
        setProducts(res.data.results || res.data || []);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError(err.message || "Error fetching products");
      })
      .finally(() => setLoading(false));
  }, []);

  // Show loading screen
  if (loading) return <LoadingScreen />;

  // Show error if there's an error
  if (error) {
    return (
      <>
        <MainHeader />
        <div className="min-h-screen w-full bg-[#F5F9F5] pt-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#4CAE4F] text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Try Again
            </button>
          </div>
        </div>
        <MainFooter />
      </>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  // Get paginated products
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page and 2 pages on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setSelectedProductName(product.name);
    showModalToast();
    // Add your cart logic here
    console.log('Added to cart:', product);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    navigate(`/product/${product.slug}`);
  };

  return (
    <>
      <MainHeader />
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed pt-10 inset-0 flex items-center justify-center z-50">
            <div className="border-2 border-[#858585] bg-white rounded-3xl p-10 w-[420px] shadow-xl text-center">
              <img src="/Checkpass.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{selectedProductName}</h3>
              <p className="text-lg">has been added to your shopping cart</p>
            </div>
          </div>
        )}

        <h1 className="bg-white border-2 border-gray text-4xl font-black text-center shadow-lg p-6">
        YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
      </h1>

        {/* Products Grid */}
        <section className="px-6 py-6 bg-[#F5F9F5] min-h-[600px]">
          {products.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
                <p className="text-gray-500">Please check back later for new products.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id || `${currentPage}-${index}`}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8 mb-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`w-[45px] h-[50px] border rounded-xl text-gray-500 transition-colors duration-150 ${
                      currentPage === 1
                        ? 'bg-[#E5E5E5] border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
                        : 'bg-[#D9D9D9] border-[#858585] hover:bg-[#c2c2c2]'
                    }`}
                  >
                    &lt;
                  </button>

                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${
                        currentPage === pageNum
                          ? 'bg-[#4CAE4F] text-white border-[#4CAE4F] hover:bg-[#3c9d3f]'
                          : 'bg-[#D9D9D9] text-[#858585] border-[#858585] hover:bg-[#bfbfbf]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
                      ...
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`w-[45px] h-[50px] rounded-xl border transition-colors duration-150 ${
                      currentPage === totalPages
                        ? 'bg-[#E5E5E5] border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
                        : 'bg-[#D9D9D9] border-[#858585] text-[#858585] hover:bg-[#c2c2c2]'
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              )}

              {/* Page Info */}
              <div className="text-center text-gray-600 text-sm mb-4">
                Page {currentPage} of {totalPages} ({products.length} total items)
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <MainFooter/>
      </div>
    </>
  );
};

export default YourDailyBinhiNeeds;