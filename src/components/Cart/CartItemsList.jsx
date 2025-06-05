import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api"; // adjust as needed

const CartItemsList = ({
  filteredCartItems,
  selectedItems,
  productVariations,
  selectedCartItems,
  allCartItems,
  toggleVendorSelectAll,
  handleItemSelect,
  handleVariationChange,
  handleQuantityChange,
  handleDelete,
  setSearchQuery
}) => {
  return (
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

              {/* Items under vendor */}
              {vendorGroup.items.map((item) => {
                const variation = item.variation;
                const product = variation.product;

                return (
                  <div key={variation.id} className="flex items-center border-t border-gray-400 pt-2 px-6 text-sm text-gray-700">
                    <div className="w-[35%] flex items-center gap-2 border-r border-gray-400 pr-8">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(variation.id)}
                        onChange={() => {handleItemSelect(variation.id); 
                            console.log('Selected Cart Items:', selectedCartItems);
                            console.log('All Cart Items:', allCartItems);
                            console.log('Filter Items:', filteredCartItems)}}

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
                      <select
                        value={item.variation.id}
                        onChange={(e) => handleVariationChange(item.variation.id, e.target.value)}
                        className="w-full bg-[#4CAF50] px-2 py-1 border border-gray-400 rounded-md text-base font-medium text-white focus:border-[#4CAE4F] focus:outline-none focus:ring-1 focus:ring-[#4CAE4F] transition-colors"
                      >
                        {productVariations[item.variation.product.id]?.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-[12%] flex flex-col items-center justify-center gap-1 py-3 border-r border-gray-400">
                      <div className="flex items-center gap-2">
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

                      {item.warning_message && (
                        <p className="text-xs text-red-600 text-center mt-1">
                          {item.warning_message}
                        </p>
                      )}
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
  );
};

export default CartItemsList;
