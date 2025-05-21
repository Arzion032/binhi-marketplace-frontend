import React, { useState } from 'react';
/*pahguuuuhd*/
const CartPage = () => {
  const initialItems = [
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
      price: 85.0,
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
  const discount = 53;
  const tax = 999;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-10">
      <h1 className="text-4xl font-bold mb-2">Your Cart ({cartItems.length})</h1>
      <p className="text-gray-600 mb-6">You have {cartItems.length} items in your cart, check out now!</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">

          <div className="flex px-6 py-4 bg-white rounded-full font-semibold border-2 text-xl">
            <div className="w-2/12">ITEMS</div>
            <div className="w-4/12">NAME</div>
            <div className="w-2/12 text-center">QUANTITY</div>
            <div className="w-2/12 text-center">PRICE</div>
            <div className="w-2/12 text-center">ACTION</div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow border space-y-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
              <img src="avatar.png" alt="Seller" className="w-8 h-8 rounded-full" />
              <p className="text-lg font-medium">Vinas Family</p>
              <Link to="/ChatPage">
              <button className="text-xs text-gray-500 underline">Click here to chat</button></Link>
              <button className="flex items-center gap-2 bg-[#4CAE4F] hover:bg-green-700 text-white text-lg font-medium px-3 py-2 rounded-full transition">
                        <img src="/shopp.png" className="w-5 h-5" /> View Shop
                      </button>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-t pt-4 gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => {
                    setSelectedItems(prev =>
                      prev.includes(item.id)
                        ? prev.filter(id => id !== item.id)
                        : [...prev, item.id]
                    );
                  }}
                />
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
                <div className="flex-1">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-lg text-gray-500">{item.seller}</p>
                </div>
                <div className="flex items-center gap-2 mx-8">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 text-lg bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 text-lg text-white bg-[#4CAE4F] rounded">+</button>
                </div>
                <div className="w-24 text-lg text-center font-bold mx-8">₱{(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 mx-8">
                <img src="trash.png" alt="Delete" className="w-6 h-6 mx-10" />
              </button>
              </div>
            ))}

            <div className="flex items-center justify-between border-t pt-4 text-sm">
              <p className="font-bold">SELECT ALL ITEMS</p>
              <button onClick={() => { setCartItems([]); setSelectedItems([]); }}>
              <img src="trash.png" alt="Delete" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow border-2">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="w-[550px] items-center h-[1px] bg-black mb-4" />
          <div className="flex mb-4 rounded overflow-hidden">
            <input className="flex-grow px-3 py-2" placeholder="Add Promo Code" />
            <button className="px-2 border-2 border-black rounded-full text-sm font-medium">Apply</button>
          </div>
          <div className="w-[550px] items-center h-[1px] bg-black mb-4" />


          <div className="space-y-2 text-xl">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-[#4CAE4F]">₱{subtotal.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount</p>
              <p className="text-[#4CAE4F]">₱{discount.toFixed(0)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p className="text-[#4CAE4F]">₱{tax.toFixed(0)}</p>
            </div>
            <div className="flex justify-between font-bold text-2xl pt-2 border-t mt-10 ">
              <p>Total</p>
              <p className="text-[#4CAE4F] rounded-full p-2">₱{total.toFixed(0)}</p>
            </div>
          </div>

          <button
            disabled={selectedCartItems.length === 0}
            className={`mt-6 w-full py-2 px-4 rounded-full text-white font-semibold ${selectedCartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            Buy Now ({selectedCartItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
