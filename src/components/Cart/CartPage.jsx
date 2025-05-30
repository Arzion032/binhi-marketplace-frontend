import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/*Styling pu*/

const CartPage = () => {
  const navigate = useNavigate();
  
  const initialItems = [
    {
      id: 1,
      name: "Premium Milk With No Exercise One Week",
      seller: "Vinas Family",
      image: "/milk.png",
      quantity: 1,
      price: 53.0,
      variation: "Original Flavor",
      unitMeasurement: "1 Liter",
      orderId: "23149BF001",
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      seller: "Vinas Family",
      image: "/corn.png",
      quantity: 1,
      price: 53.0,
      variation: "Chocolate Flavor",
      unitMeasurement: "500g",
      orderId: "23149BF002",
    },
    {
      id: 3,
      name: "Freshly Home Made Butter with Chocolate Inside",
      seller: "Vinas Family",
      image: "/Butter.png",
      quantity: 1,
      price: 85.0,
      variation: "Premium Flavor",
      unitMeasurement: "250g",
      orderId: "23149BF003",
    },
  ];

  const [cartItems, setCartItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState(initialItems.map(item => item.id));
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
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

  const allSelected = selectedItems.length === cartItems.length && cartItems.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Search functionality
  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.variation.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const selectedCartItems = filteredCartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) return;
    
    // Pass all selected items to checkout
    const checkoutData = {
      items: selectedCartItems,
      subtotal: subtotal,
      discount: 0,
      tax: 0,
      total: subtotal,
      paymentMethod: 'Cash on Delivery',
      source: 'cart'
    };

    navigate('/checkoutpage', { state: { checkoutData } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F9F5] flex flex-col items-center justify-center p-4">
        <div className="text-center">
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

  return (
    <div className="min-h-screen bg-[#F5F9F5] px-6 py-4">
      {/* Header with Search Bar */}
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">Your Cart ({filteredCartItems.length})</h1>
            <p className="text-gray-600 text-lg">You have {cartItems.length} items in your cart, check out now!</p>
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
              : `Showing ${filteredCartItems.length} of ${cartItems.length} items for "${searchQuery}"`
            }
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 mx-10">
        {/* LEFT SECTION */}
        <div className="w-[1200px] xl:w-3/4 space-y-6">

          {/* Header */}
          <div className="flex items-center px-6 py-4 bg-white text-center rounded-lg font-bold border text-base text-black">
            <div className="w-[35%] text-center border-r border-gray-300 pr-4">PRODUCT NAME</div>
            <div className="w-[12%] text-center border-r border-gray-300 px-2">VARIATION</div>
            <div className="w-[12%] text-center border-r border-gray-300 px-2">QUANTITY</div>
            
            <div className="w-[12%] text-center border-r border-gray-300 px-2">UNIT PRICE</div>
            <div className="w-[12%] text-center border-r border-gray-300 px-2">TOTAL PRICE</div>
            <div className="w-[10%] text-center border-r border-gray-300 px-2">UNIT MEAS.</div>
            <div className="w-[7%] text-center">ACTION</div>
          </div>

          {filteredCartItems.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="bg-white p-4 rounded-lg shadow border space-y-4">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={allSelected} 
                    onChange={toggleSelectAll} 
                    className="w-5 h-5 mx-2"
                  />
                  <img 
                    src="/111.png" 
                    alt="Seller" 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.src = '/placeholder-avatar.png';
                    }}
                  />
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">Vinas Family</p>
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

                {filteredCartItems.map(item => (
                  <div key={item.id} className="flex items-center border-t pt-2 px-6 text-sm text-gray-700">
                    <div className="w-[35%] flex items-center gap-2 border-r border-gray-300 pr-8">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemSelect(item.id)}
                        className="w-4 h-4"
                      />
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholder-product.png';
                        }}
                      />
                      <p className="font-bold text-lg ml-2">{item.name}</p>
                    </div>
                    <div className="w-[12%] text-center border-r border-gray-300 px-2">
                      <p className="text-base font-medium text-gray-600">{item.variation}</p>
                    </div>
                    <div className="w-[12%] flex justify-center items-center gap-2 border-r border-gray-300 px-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)} 
                        className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-1 font-bold text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)} 
                        className="px-2 py-1 bg-[#4CAF50] text-white rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-[12%] text-center text-lg font-bold border-r border-gray-300 px-2">₱{item.price.toFixed(2)}</div>
                    <div className="w-[12%] text-center font-semibold text-[#4CAF50] text-lg font-bold border-r border-gray-300 px-2">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="w-[10%] text-center border-r border-gray-300 px-2">
                      <p className="text-lg font-medium text-gray-600">{item.unitMeasurement}</p>
                    </div>
                    <div className="w-[7%] text-center">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        <img src="/trash.png" alt="Delete" className="w-5 h-5 inline-block" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Select All Footer */}
              <div className="flex items-center justify-between w-full max-w-xs px-4 py-4 bg-white border rounded-2xl shadow">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-5 h-5"
                  />
                  <span className="font-bold text-sm">SELECT ALL ITEMS</span>
                </div>
                <button 
                  onClick={handleDeleteAll}
                  disabled={selectedItems.length === 0}
                  className={`hover:scale-110 transition-transform ${
                    selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <img src="/trash.png" alt="Delete Selected" className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </>
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
        <div className="w-[400px] bg-white p-4 rounded-lg shadow border flex flex-col h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="w-full h-[1px] bg-gray-300 mb-4" />
            
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <p>Selected Items:</p>
                <p className="text-black font-bold">{selectedItems.length}</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-black font-bold">₱{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-[#4CAF50] text-2xl font-bold pt-4 pb-6 border-t mt-6">
                <p>Total</p>
                <p className="text-[#4CAF50] font-bold">₱{total.toFixed(2)}</p>
              </div>
            </div>

          <button
            onClick={handleCheckout}
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
      </div>

      {/* Chat Button */}
      <div className="group fixed bottom-10 right-10 z-50">
        <button
          onClick={() => navigate('/ChatPage')}
          className="bg-[#4CAF50] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative transition-colors"
        >
          <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
        </button>
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chats
        </div>
      </div>
    </div>
  );
};

export default CartPage;