import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api';
import LoadingScreen from '../UI/LoadingScreen';
import OrderSummary from './OrderSummary';
import CartItemsList from './CartItemsList';

const CartPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [productVariations, setProductVariations] = useState({});
  const debounceTimers = useRef({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const quantityMap = useRef({});


useEffect(() => {
  api.get("/cart/my_cart/")
    .then(res => {
      setCartItems(res.data);

      // Fix: Map productId -> variations
      const variationMap = {};
      res.data.forEach(vendor => {
        vendor.items.forEach(item => {
          const productId = item.variation.product.id;
          const variations = item.variation.product.variations || [];
          variationMap[productId] = variations;
        });
      });
      setProductVariations(variationMap); // productId -> [{id, name}]
    })
    .catch(err => setError(err.message || "Error fetching cart items"))
    .finally(() => setLoading(false));
}, []);
  

  const getItemByVariationId = (variationId) => {
  for (const vendor of cartItems) {
    const found = vendor.items.find(item => item.variation.id === variationId);
    if (found) return found;
  }
  return null;
};

const handleQuantityChange = (variationId, amount) => {
  // 1. Track the latest quantity manually
  let newQuantity = 1;

  setCartItems(prev =>
    prev.map(vendor => ({
      ...vendor,
      items: vendor.items.map(item => {
        if (item.variation.id === variationId) {
          newQuantity = Math.max(1, item.quantity + amount);
          quantityMap.current[variationId] = newQuantity;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    }))
  );

  // 2. Debounce the backend PATCH
  if (debounceTimers.current[variationId]) {
    clearTimeout(debounceTimers.current[variationId]);
  }

  debounceTimers.current[variationId] = setTimeout(async () => {
    try {
      const response = await api.patch(`/cart/update_cartitem/${variationId}/`, {
        quantity: quantityMap.current[variationId]
      });

      const updated = response.data;

      // 3. Sync total price and confirmed quantity
      setCartItems(prev =>
        prev.map(vendor => ({
          ...vendor,
          items: vendor.items.map(item =>
            item.variation.id === variationId
              ? {
                  ...item,
                  quantity: updated.quantity,
                  total_price: updated.total_price,
                  warning_message: updated.warning_message
                }
              : item
          )
        }))
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  }, 500);
};



const handleVariationChange = async (oldVarId, newVariationId) => {
  try {
    const response = await api.patch(`/cart/update_cartitem/${oldVarId}/`, {
      variation_id: newVariationId
    });
    
    // The response contains the updated cart item with new variation data
    const updatedItem = response.data;
    
    // Update the local state
    setCartItems(prev =>
      prev.map(vendor => ({
        ...vendor,
        items: vendor.items.map(item => {
          if (item.variation.id === oldVarId) {
            return {
              ...item,
              variation: updatedItem.variation,
              quantity: updatedItem.quantity,
              total_price: updatedItem.total_price,
              warning_message: updatedItem.warning_message
            };
          }
          return item;
        })
      }))
    );
    
  } catch (error) {
    console.error('Error updating variation:', error);
    // Handle error (show toast, etc.)
  }
};

  const handleDelete = async (id) => {
    try {
      // Delete from backend
      await api.delete(`cart/remove_cartitem/${id}/`);
      
      // Remove from local state
      setCartItems(prev => 
        prev.map(vendor => ({
          ...vendor,
          items: vendor.items.filter(item => item.variation.id !== id)
        })).filter(vendor => vendor.items.length > 0)  // Remove vendor if no items left
      );
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));  // Remove item from selected
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error deleting item:', err);
    }
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

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Search functionality
const filteredCartItems = useMemo(() => {
  return cartItems
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
}, [cartItems, searchQuery]);



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
 const allCartItemsCopy = filteredCartItems.flatMap(vendor =>
  vendor.items.map(item => ({
    ...item,
    vendor_id: vendor.vendor_id,
    vendor_name: vendor.vendor_name,
  }))
);
  const allCartItems = filteredCartItems.flatMap(vendor => vendor.items);
  const selectedCartItems = allCartItemsCopy.filter(item => selectedItems.includes(item.variation.id));

  const calculateSubtotal = () => {
    let subtotal = 0;
    
    filteredCartItems.forEach(vendorGroup => {
      vendorGroup.items.forEach(item => {
        // Check if this item is selected
        if (selectedItems.includes(item.variation.id)) {
          const unitPrice = parseFloat(item.variation.unit_price);
          const quantity = item.quantity;
          subtotal += unitPrice * quantity;
        }
      });
    });
    
    return subtotal;
  };

  const subtotal = calculateSubtotal();
  const total = subtotal;

 const handleCheckout = () => {
  if (selectedCartItems.length === 0) return;
  console.log
  // Check if any selected item has a warning message
  const itemWithWarning = selectedCartItems.find(item => item.warning_message !== null);

  if (itemWithWarning) {
    // Show alert if there's a warning message in any item
    alert('Some items in your cart exceed the available quantity. Please update your cart before proceeding to checkout.');


    // Optional: You can also return or handle navigation to cart page for further updates
    return; // Prevent checkout from continuing
  }

  // Prepare checkout data with proper field mapping
  const checkoutData = {
    items: selectedCartItems.map(item => ({
      ...item,
    })),
    subtotal: subtotal,
    discount: 0,
    tax: 0,
    total: subtotal,
    paymentMethod: 'Cash on Delivery',
    source: 'cart'
  };

  console.log('Checkout data being passed:', checkoutData); // For debugging
  navigate('/checkoutpage', { state: { checkoutData } });
};

  if (cartItems && cartItems.length === 0) {
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
          <p className="text-gray-600 text-lg">You have {allCartItems.length} items in your cart, check out now!</p>

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
             {loading ? (
                <LoadingScreen />
              ) : (
                <CartItemsList
                  filteredCartItems={filteredCartItems}
                  selectedItems={selectedItems}
                  productVariations={productVariations}
                  selectedCartItems={selectedCartItems}
                  allCartItems={allCartItems}
                  toggleVendorSelectAll={toggleVendorSelectAll}
                  handleItemSelect={handleItemSelect}
                  handleVariationChange={handleVariationChange}
                  handleQuantityChange={handleQuantityChange}
                  handleDelete={handleDelete}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </div>
            

          

          {/* RIGHT SECTION - Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            total={total}
            handleCheckout={handleCheckout}
            selectedItems={selectedItems}
          />
        </div>

  
      {/* (Your existing summary panel can stay as is) */}
    </div>

);
};

export default CartPage;