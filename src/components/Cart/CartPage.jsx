import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { BASE_URL } from '../../api';
import LoadingScreen from '../UI/LoadingScreen';

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    api.get("/cart/my_cart/")
      .then(res => setCartItems(res.data))
      .catch(err => setError(err.message || "Error fetching cart items"))
      .finally(() => setLoading(false));
  }, []);


  const filteredCartItems = cartItems
  .map(vendorGroup => {
    const matchingItems = vendorGroup.items.filter(item => {
      const variationName = item.variation.name.toLowerCase();
      const productName = item.variation.product.name.toLowerCase();
      const vendorName = vendorGroup.vendor_name.toLowerCase();

      const query = searchQuery.toLowerCase();

      return (
        variationName.includes(query) ||
        productName.includes(query) ||
        vendorName.includes(query)
      );
    });

    if (matchingItems.length > 0) {
      return {
        vendor_id: vendorGroup.vendor_id,
        vendor_name: vendorGroup.vendor_name,
        items: matchingItems,
      };
    }

    return null;
  })
  .filter(group => group !== null);

  const allCartItems = filteredCartItems.flatMap(vendor => vendor.items);
  const selectedCartItems = allCartItems.filter(item =>
    selectedItems.includes(item.variation.id)
  );
  const subtotal = selectedCartItems.reduce((sum, item) => {
    const price = Number(item.variation.unit_price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + price * qty;
  }, 0);
  const total = subtotal

  const handleItemSelect = (itemId) => {
  setSelectedItems(prev => {
    const updated = prev.includes(itemId)
      ? prev.filter(id => id !== itemId)
      : [...prev, itemId];

    return updated; // ✅ Must return the new array!
  });
};

useEffect(() => {
  console.log('subtotal', subtotal);
  console.log('selectedItems', selectedItems);
  console.log('selectedCartItems', selectedCartItems);
  console.log('all cart', allCartItems)
}, [selectedCartItems, selectedItems]); // ✅ correct array syntax



  const handleQuantityChange = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const handleVariationChange = (id, newVariation) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, variation: newVariation } : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const handleDeleteAll = () => {
    const selectedItemsToDelete = cartItems.filter(item => selectedItems.includes(item.id));
    if (selectedItemsToDelete.length > 0) {
      const remainingItems = cartItems.filter(item => !selectedItems.includes(item.id));
      setCartItems(remainingItems);
      setSelectedItems([]);
    }
  };


  const toggleVendorSelectAll = (vendorGroup) => {
    const vendorItemIds = vendorGroup.items.map(item => item.variation.id);
    const allSelected = vendorItemIds.every(id => selectedItems.includes(id));

    if (allSelected) {
      // Deselect all this vendor's items
      setSelectedItems(prev => prev.filter(id => !vendorItemIds.includes(id)));
    } else {
      // Add all this vendor's items
      setSelectedItems(prev => [...new Set([...prev, ...vendorItemIds])]);
    }
  };



// Fix the loading fallback return
if (loading) {
  return <LoadingScreen />;
}

// Fix null check
if (!cartItems || !Array.isArray(cartItems)) {
  return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error loading cart items.
    </div>
  );
}


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleVoiceSearch = () => {
    // Voice search functionality - placeholder for now
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  const handleCameraSearch = () => {
    // Camera search functionality - placeholder for now
    alert('Camera search feature coming soon!');
  };


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <button
            className="flex items-center text-gray-600 hover:text-black mb-4"
            onClick={() => navigate("/")}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>
          <img src="/empty-cart.png" alt="Empty Cart" className="w-32 h-32 mx-auto mb-4 opacity-50" />
          <h2 className="text-3xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#4CAE4F] text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
if (!cartItems){
  <LoadingScreen />
}

console.log(selectedItems)
return (
  <div className="min-h-screen bg-[#F5F9F5] px-6 py-4">
    {/* Header with Search Bar */}
    <div className="flex mx-10 items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/cartpage")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>
        <div>
          <h1 className="text-4xl font-bold">Your Cart</h1>
          You have {cartItems.reduce((total, vendor) => total + vendor.items.length, 0)} items in your cart, check out now!
          
        </div>
      </div>
      <div className="flex items-center px-4">
        <div className="flex items-center bg-white border-2 border-black rounded-full px-3 py-1 w-[600px] h-14">
          <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
          <input
            type="text"
            placeholder="Search in cart..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-grow text-sm bg-white outline-none"
          />
          <button onClick={handleVoiceSearch}>
            <img src="/mic.png" alt="Mic" className="w-5 h-5 hover:scale-110" />
          </button>
          <button onClick={handleCameraSearch}>
            <img src="/camera.png" alt="Camera" className="w-5 h-5 mx-4 hover:scale-110" />
          </button>
        </div>
      </div>
    </div>

    <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

    {/* Search Results Info */}
    {searchQuery && (
      <div className="mx-10 mb-4">
        <p className="text-lg text-gray-600">
          {filteredCartItems.length === 0 
            ? `No items found for "${searchQuery}"` 
            : `Showing results for "${searchQuery}"`
          }
        </p>
      </div>
    )}

    <div className="flex flex-col lg:flex-row gap-4 mx-10">
      {/* LEFT SECTION */}
      <div className="w-[1200px] xl:w-3/4 space-y-6">
        {/* Header */}
        <div className="flex items-center px-6 py-4 bg-white text-center rounded-lg font-bold border border-gray-400 text-base text-black">
          <div className="w-[35%] text-center border-r border-gray-400 pr-4">PRODUCT NAME</div>
          <div className="w-[12%] text-center border-r border-gray-400 px-2">VARIATION</div>
          <div className="w-[12%] text-center border-r border-gray-400 px-2">QUANTITY</div>
          <div className="w-[12%] text-center border-r border-gray-400 px-2">UNIT PRICE</div>
          <div className="w-[12%] text-center border-r border-gray-400 px-2">TOTAL PRICE</div>
          <div className="w-[10%] text-center border-r border-gray-400 px-2">UNIT MEAS.</div>
          <div className="w-[7%] text-center">ACTION</div>
        </div>

       {filteredCartItems.length > 0 ? (
  filteredCartItems.map((vendorGroup) => {
    const allSelectedForVendor = vendorGroup.items.every(item =>
      selectedItems.includes(item.variation.id)
    );

    return (
      <div key={vendorGroup.vendor_id} className="bg-white p-4 rounded-lg shadow border border-gray-400 space-y-4">
        {/* Vendor Header */}
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={allSelectedForVendor} 
            onChange={() => toggleVendorSelectAll(vendorGroup)} 
            className="w-5 h-5 mx-2"
          />

          <img 
            src="/111.png" 
            alt="Seller" 
            className="w-12 h-12 rounded-full"
            onError={(e) => { e.target.src = '/placeholder-avatar.png'; }}
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">{vendorGroup.vendor_name}</p>
            <Link to="/ChatPage">
              <button className="text-base text-gray-500 underline hover:text-gray-700">
                Click here to chat
              </button>
            </Link>

          </div>
          <button className="flex items-center gap-2 hover:bg-green-50 text-[#4CAE4F] border border-[#4CAE4F] text-sm font-medium px-3 py-2 rounded-full transition-colors">
            <img src="/shoppp.png" className="w-5 h-5" alt="Shop" /> 
            View Shop
          </button>
        </div>

        {/* Items under this vendor */}
        {vendorGroup.items.map((item) => {
          const variation = item.variation;
          const product = variation.product;

          return (
            <div key={variation.id} className="flex items-center border-t border-gray-400 pt-2 px-6 text-sm text-gray-700">
              <div className="w-[35%] flex items-center gap-2 border-r border-gray-400 pr-8">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(variation.id)}
                  onChange={() => handleItemSelect(variation.id)}
                  className="w-4 h-4"
                />
                <img 
                  src={BASE_URL + variation.main_image} 
                  alt={product.name} 
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => { e.target.src = '/placeholder-product.png'; }}
                />
                <p className="font-bold text-lg ml-2">{product.name}</p>

              </div>

              <div className="w-[12%] text-center border-r border-gray-600 py-3 px-2">
                <p className="text-base font-medium">{variation.name}</p>
              </div>

              <div className="w-[12%] flex justify-center items-center gap-2 py-3 border-r border-gray-400">
                <button 
                  onClick={() => handleQuantityChange(variation.id, -1)} 
                  className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors"
                  disabled={item.quantity <= 1}
                >−</button>
                <span className="mx-1 font-bold text-lg">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(variation.id, 1)} 
                  className="px-2 py-1 bg-[#4CAF50] text-white rounded text-sm hover:bg-green-600 transition-colors"
                >+</button>
              </div>

              <div className="w-[12%] text-center text-lg font-bold border-r border-gray-400 px-2 py-3">
                ₱{parseFloat(variation.unit_price).toFixed(2)}
              </div>

              <div className="w-[12%] text-center font-semibold text-[#4CAF50] text-lg font-bold border-r border-gray-600 px-2 py-3">
                ₱{(parseFloat(variation.unit_price) * item.quantity).toFixed(2)}
              </div>

              <div className="w-[10%] text-center border-r border-gray-600 py-3 px-2">
                <p className="text-lg font-medium text-gray-600">pcs</p>
              </div>

              <div className="w-[7%] text-center">
                <button 
                  onClick={() => handleDelete(variation.id)}
                  className="hover:scale-110 transition-transform"
                >
                  <img src="/trash.png" alt="Delete" className="w-5 h-5 inline-block" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  })
) : (
  <div className="bg-white p-8 rounded-3xl shadow border text-center">
    <img src="/search-not-found.png" alt="No Results" className="w-24 h-24 mx-auto mb-4 opacity-50" />
    <h3 className="text-2xl font-bold text-gray-600 mb-2">No items found</h3>
    <p className="text-gray-500 mb-4">Try adjusting your search terms</p>
    <button 
      onClick={() => setSearchQuery('')}
      className="px-4 py-2 bg-[#4CAF50] text-white rounded-full hover:bg-green-700 transition-colors"
    >
      Clear Search
    </button>
  </div>
)}

      </div>

      {/* RIGHT SECTION - Order Summary */}
        <div className="w-[400px] bg-white p-4 rounded-lg shadow border border-gray-400 flex flex-col h-fit">

          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="w-full h-[1px] bg-gray-300 mb-4" />
          
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <p>Selected Items:</p>
              <p className="text-black font-bold">{selectedItems.length}</p>

            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-black font-bold">₱{isNaN(subtotal) ? '0.00' : subtotal.toFixed(2)}</p>

            </div>
            <div className="flex justify-between text-[#4CAF50] text-2xl font-bold pt-4 pb-6 border-t border-gray-600">
              <p>Total</p>
              <p className="text-[#4CAF50] font-bold">₱{isNaN(total) ? '0.00' : total.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={selectedCartItems.length === 0}
            className={`mt-full w-full py-3 px-4 rounded-full text-white text-2xl font-semibold transition-colors ${
              selectedCartItems.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            Buy Now ({selectedCartItems.length})
          </button>
        </div>
      {/* (Your existing summary panel can stay as is) */}
    </div>
  </div>
);

};

export default CartPage;