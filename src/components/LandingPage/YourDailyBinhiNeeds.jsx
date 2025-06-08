import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';
import ProductCard from './ProductCard';
import MainFooter from '../UI/MainFooter';
import api from '../../api'; // Import your API client

const itemsPerPage = 15;

const YourDailyBinhiNeeds = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // State to hold products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showToast, setShowToast] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');

  // Fetch products from the API
  useEffect(() => {
    api.get("/products/landing-page/")  // Using the same endpoint as Marketplace
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError(err.response?.data?.message || err.message || "Error fetching products");
      })
      .finally(() => setLoading(false));
  }, []);

  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F5F9F5] flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#F5F9F5] flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
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
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
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
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <MainHeader />
      
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

      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        <h1 className="bg-white text-[38px] font-bold text-center shadow-xl">
          YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
        </h1>

        {/* Products Grid */}
        <section className="px-6 py-6 bg-[#F5F9F5] min-h-[600px]">
          <div className="mx-[50px] max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedProducts.map((product, index) => (
              <ProductCard
                key={`${currentPage}-${index}`}
                product={product}
                onCardClick={() => navigate(`/product/${(currentPage - 1) * itemsPerPage + index}`)}
                onBuyNow={() => navigate(`/product/${(currentPage - 1) * itemsPerPage + index}`)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8 mb-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`w-[45px] h-[50px] border rounded-xl text-gray-500 transition-colors duration-150 ${currentPage === 1 ? 'bg-[#E5E5E5] border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'bg-[#D9D9D9] border-[#858585] hover:bg-[#c2c2c2]'}`}
            >
              &lt;
            </button>

            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${currentPage === pageNum ? 'bg-[#4CAE4F] text-white border-[#4CAE4F] hover:bg-[#3c9d3f]' : 'bg-[#D9D9D9] text-[#858585] border-[#858585] hover:bg-[#bfbfbf]'}`}
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
              className={`w-[45px] h-[50px] rounded-xl border transition-colors duration-150 ${currentPage === totalPages ? 'bg-[#E5E5E5] border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'bg-[#D9D9D9] border-[#858585] text-[#858585] hover:bg-[#c2c2c2]'}`}
            >
              &gt;
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center text-gray-600 text-sm mb-4">
            Page {currentPage} of {totalPages} ({products.length} total items)
          </div>
        </section>

        {/* Footer */}
        <MainFooter />  
      </div>
    </>
  );
};

export default YourDailyBinhiNeeds;