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
      orderId: "23149BF003",
    },
  ];

  const [cartItems, setCartItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState(initialItems.map(item => item.id));

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

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
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
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
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
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-10">
      <h1 className="text-4xl font-bold mb-2">Your Cart ({cartItems.length})</h1>
      <p className="text-gray-600 mb-6">You have {cartItems.length} items in your cart, check out now!</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-2/3 space-y-6">

          {/* Header */}
          <div className="flex px-6 py-4 bg-white rounded-full font-semibold border-2 text-sm text-gray-700">
            <div className="w-[10%]">ITEMS</div>
            <div className="w-[30%]">NAME</div>
            <div className="w-[15%] text-center">QUANTITY</div>
            <div className="w-[15%] text-center">UNIT PRICE</div>
            <div className="w-[15%] text-center">TOTAL PRICE</div>
            <div className="w-[15%] text-center">ACTION</div>
          </div>

          {/* Cart Items */}
          <div className="bg-white p-4 rounded-3xl shadow border space-y-4">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={toggleSelectAll} 
                className="w-5 h-5 mx-2"
              />
              <img 
                src="/avatar.png" 
                alt="Seller" 
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.src = '/placeholder-avatar.png';
                }}
              />
              <div className="flex flex-col">
                <p className="text-base font-bold">Vinas Family</p>
                <Link to="/ChatPage">
                  <button className="text-xs text-gray-500 underline hover:text-gray-700">
                    Click here to chat
                  </button>
                </Link>
              </div>
              <button className="flex items-center gap-2 hover:bg-green-50 text-[#4CAE4F] border border-[#4CAE4F] text-sm font-medium px-3 py-2 rounded-full transition-colors">
                <img src="/shoppp.png" className="w-5 h-5" alt="Shop" /> 
                View Shop
              </button>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-t pt-4 px-6 text-sm text-gray-700">
                <div className="w-[10%] flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                    className="w-4 h-4"
                  />
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png';
                    }}
                  />
                </div>
                <div className="w-[30%]">
                  <p className="font-semibold text-base">{item.name}</p>
                  {item.variation && (
                    <p className="text-xs text-gray-500">Variation: {item.variation}</p>
                  )}
                </div>
                <div className="w-[15%] flex justify-center items-center gap-2">
                  <button 
                    onClick={() => handleQuantityChange(item.id, -1)} 
                    className="px-2 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2 font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, 1)} 
                    className="px-2 py-1 bg-[#4CAE4F] text-white rounded text-lg hover:bg-green-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="w-[15%] text-center">₱{item.price.toFixed(2)}</div>
                <div className="w-[15%] text-center font-semibold text-[#4CAE4F]">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="w-[15%] text-center">
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
          <div className="flex items-center justify-between w-full max-w-md gap-4 px-4 py-4 bg-white border rounded-2xl shadow">
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
        </div>

        {/* RIGHT SECTION - Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow border-2 flex flex-col justify-between h-fit">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="w-full h-[1px] bg-gray-300 mb-4" />
            
            <div className="space-y-4 text-base">
              <div className="flex justify-between">
                <p>Selected Items:</p>
                <p className="text-black font-medium">{selectedItems.length}</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-black font-medium">₱{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t mt-6">
                <p>Total</p>
                <p className="text-[#4CAE4F]">₱{total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={selectedCartItems.length === 0}
            className={`mt-6 w-full py-3 px-4 rounded-full text-white text-lg font-semibold transition-colors ${
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
          className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative transition-colors"
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