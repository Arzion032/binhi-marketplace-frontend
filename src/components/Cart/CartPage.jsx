import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

/*Cart Page poo */

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      seller: "Vinas Family",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
    },
    {
      id: 2,
      name: "Freshly Home Made Butter with Chocolate Inside",
      seller: "Vinas Family",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
    },
    {
      id: 3,
      name: "Freshly Home Made Butter with Chocolate Inside",
      seller: "Vinas Family",
      image: "Butter.png",
      quantity: 1,
      price: 53.0,
    },
    {
      id: 4,
      name: "Freshly Home Made Butter with Chocolate Inside",
      seller: "Vinas Family",
      image: "Butter.png",
      quantity: 1,
      price: 32.0,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

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

  const allSelected = selectedItems.length === cartItems.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = selectedCartItems.length > 0 ? 53 : 0;
  const tax = selectedCartItems.length > 0 ? 999 : 0;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5] px-6 py-4">
      {/* Header */}
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">

      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Your Cart ({cartItems.length})</h1>
        <p className="text-gray-600">You have {cartItems.length} items in your cart, check out now!</p>
      </div>
      </div>

      <div className="flex items-center px-4">
  <div className="flex items-center bg-white border-2 border-black rounded-full px-3 py-1 w-[600px] h-14">
      <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
      <input
        type="text"
        placeholder="Search by Seller Name, Order ID, or Product Name"
        className="flex-grow text-sm bg-white"
      />
      <button>
        <img src="/mic.png" alt="Mic" className="w-5 h-5 hover:scale-110" />
      </button>
      <button>
        <img src="/camera.png" alt="Camera" className="w-5 h-5 mx-4 hover:scale-110" />
      </button>
    </div>
  </div>
      </div>
      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />
      <thead>
                <tr className="text-left border-b-2">
                  <th className="px-2">Select</th>
                  <th>Items</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
      {/* Cart Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Cart Items */}
          <div className="bg-white border rounded-lg shadow-md p-6 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
              />
              <img
                src={"/avatar.png"}
                alt="Seller"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm font-medium text-gray-700">Vinas Family</p>
              <button className="text-gray-500 text-base font-medium px-3 py-2 rounded-full transition">
                Click here to chat
              </button>
              <button className="flex items-center gap-2 bg-[#4CAE4F] hover:bg-green-700 text-white text-lg font-medium px-3 py-2 rounded-full transition">
                <img src="/shopp.png" className="w-5 h-5" /> View Shop
              </button>
            </div>

            <table className="w-full table-auto">
      
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => {
                          if (selectedItems.includes(item.id)) {
                            setSelectedItems(prev => prev.filter(id => id !== item.id));
                          } else {
                            setSelectedItems(prev => [...prev, item.id]);
                          }
                        }}
                      />
                    </td>
                    <td className="py-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
                    </td>
                    <td>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.seller}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 py-1 border rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 py-1 border rounded">+</button>
                      </div>
                    </td>
                    <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-6">
              <button onClick={() => setCartItems([])} className="text-red-500 hover:underline">Delete All</button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Add Promo Code"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₱{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p>₱{discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>₱{tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <p>Total</p>
              <p>₱{total.toFixed(2)}</p>
            </div>
          </div>

          <button className="mt-6 w-full bg-[#4CAE4F] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full">
            Buy Now ({selectedCartItems.length})
          </button>
        </div>
      </div>
    </div>

  );
};

export default CartPage;
