import { useNavigate, useLocation } from 'react-router-dom';
import FederationSection from '../LandingPage/FederationSection'; 
import MainHeader from '../UI/MainHeader'; 
import React, { useState, useEffect } from 'react';

const MarketplaceWithAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [userName, setUserName] = useState('User');
  
  useEffect(() => {
    // Prefer user name from localStorage if available
    const storedUserName = localStorage.getItem('userFirstName');
    if (storedUserName) {
      setUserName(storedUserName);
    } else if (location.state?.firstName) {
      setUserName(location.state.firstName);
      // Store to localStorage for persistence
      localStorage.setItem('userFirstName', location.state.firstName);
    } else {
      setUserName('User');
    }
  }, [location.state]);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search-product-account?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

  const products = [
    { name: "Automatic-Cook Rice from the Field of Antartica", price: "₱136", sold: 227, image: "/Search-rice.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
  ];

  return (
     <div className="min-h-screen w-full bg-white">
      <MainHeader profileImage="/333.png" onSearch={handleSearch} />

      <div className="bg-[#F5F9F5] shadow-lg">
        {showToast && (
          <div className="fixed pt-10 inset-0 flex items-center justify-center z-50">
            <div className="border-2 border-[#858585] bg-white rounded-3xl p-10 w-[400px] shadow-xl text-center">
              <img src="/Checkpass.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{selectedProductName}</h3>
              <p className="text-lg font-semibold">has been added to your shopping cart</p>
            </div>
          </div>
        )} 
        
        <section className="bg-[#4CAE4F] mx-[80px] mt-6 rounded-xl px-24 py-0 flex justify-between items-stretch text-white shadow-lg h-[300px]">
          {/* Left Basket Image */}
          <div className="flex items-end">
            <img
              src="/basket.png"
              alt="Left Basket"
              className="w-[280px] h-auto object-contain"
            />
          </div>

          {/* Center Greeting Text - Updated to use dynamic name */}
          <div className="text-center flex flex-col justify-center flex-1">
            <h2 className="sm:text-7xl font-bold mb-3">Hi, {userName}!</h2>
            <p className="text-2xl flex flex-col items-center gap-2">
              <span>What product you want to find?</span>
              <span className="flex items-center gap-1">
                Click the
                <img src="/search-white.png" alt="search" className="w-6 h-6 inline-block" />
                <span className="font-bold">search bar</span> above!
              </span>
            </p>
          </div>

          {/* Right Basket Image */}
          <div className="flex items-end py-[98px]">
            <img
              src="/basket2.png"
              alt="Right Basket"
              className="w-[280px] h-auto object-contain"
            />
          </div>
        </section>

        {/*Categories, miii*/}
        <section className="px-2 sm:px-4 py-4 mx-[60px]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-cols-6 gap-0">
              {[ 
                { label: 'Grains', background: '/grains.png', overlay: '/rice.png' },
                { label: 'Vegetables', background: '/vegetable.png', overlay: '/broccoli.png' },
                { label: 'Roots', background: '/root-crops.png', overlay: '/ginger.png' },
                { label: 'Dairy', background: '/milks.png', overlay: '/milk-bottle.png' },
                { label: 'Meat', background: '/meatss.png', overlay: '/meat.png' },
                { label: 'Fruits', background: '/fruits.png', overlay: '/grapes.png' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-4 text-center text-sm font-medium text-gray-700 flex flex-col items-center transition-transform duration-300"
                >
                  {item.overlay ? (
                    <div className="relative w-18 h-18 mb-2">
                      <img
                        src={item.background}
                        alt="background"
                        className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-50"
                      />
                      <img
                        src={item.overlay}
                        alt="overlay"
                        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/6 w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125"
                      />
                    </div>
                  ) : (
                    <img
                      src={item.background}
                      alt={item.label}
                      className="w-16 h-16 object-contain mb-2 transition-transform duration-100 group-hover:scale-200"
                    />
                  )}
                  <span className="text-[20px] transition-transform duration-300 group-hover:scale-110 group-hover:font-bold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Products Section */}
      <h1 className="bg-white text-4xl font-bold text-center shadow-lg p-6">
        YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
      </h1>
      <div className="px-6 py-6 bg-[#F5F9F5]">
        <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              onClick={() => navigate(`/product/${index}`)}
              className="bg-white rounded-xl shadow-md p-4 text-left cursor-pointer transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
              key={index}
            >
              <span className="w-[120px] text-center bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full mb-2">
                VEGETABLE
              </span>
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
              <p className="text-left font-semibold text-lg">{product.name}</p>
              <p className="text-[#4CAE4F] text-xl font-bold mt-2">
                {product.price}{' '}
                <span className="text-[15px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2">
                  per pc.
                </span>
              </p>
              <div className="text-[20px] text-gray-600 mt-4 flex items-center gap-1">
                <img src="/Star.png" alt="star" className="w-4 h-4" />
                5.0 • {product.sold} Sold
              </div>
              <div className="flex items-center justify-between gap-4 mt-2">
                <img
                  src="/shopping-cart.png"
                  alt="cart"
                  className="w-6 h-6 transition-transform duration-100 hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductName(product.name);
                    showModalToast();
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${index}`);
                  }}
                  className="text-xl bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/daily-needs')}
            className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110"
          >
            See More
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
     {/* <section className="px-6 py-6 bg-[#F5F9F5] ">
        <div className="flex items-center justify-between mx-[70px] mt-[5px] mb-[10px]">
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold text-shadow-lg">Featured Products</p>
            <span className="text-base font-normal text-gray-400">
              Do not miss the current offers until the end of April
            </span>
          </div>
          <button
            onClick={() => navigate('/featured-products')}
            className="text-[20px] font-bold hover:underline"
          >
            See more
          </button>
        </div>
        <div className="mx-[70px] max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6">
          {[
            { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
            { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
            { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
            { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
            { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
            { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
            { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" }
          ].map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(`/product/${index}`)}
              className="bg-white rounded-xl shadow-md p-4 text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
            >
              <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                VEGETABLE
              </span>
              <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
              <p className="text-left font-semibold text-[16px]">{product.name}</p>
              <p className="text-[#4CAE4F] text-lg font-bold">
                {product.price}{' '}
                <span className="text-[10px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2">
                  per pc.
                </span>
              </p>
              <div className="text-sm text-gray-600 mt-4 flex items-center gap-1">
                <img src="/Star.png" alt="star" className="w-4 h-4" />
                5.0 • {product.sold} Sold
              </div>
              <div className="flex items-center justify-between gap-4 mt-2">
                <img 
                  src="shopping-cart.png" 
                  alt="cart" 
                  className="w-6 h-6 transition-transform duration-100 hover:scale-125" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductName(product.name); 
                    showModalToast();
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${index}`);
                  }}
                  className="text-sm bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>  
      </section> */}

      {/* Top Farmers Section */}
      <section className="relative px-6 py-10 bg-[#F5F9F5] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/confetti.png" alt="confetti" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-center text-[30px] font-bold mb-5 relative z-10 mb-10">Top Farmers of the Month</h2>

        <div className="flex flex-wrap justify-center gap-6 relative z-10 mt-10">
          {[
            {
              name: "Anton Benidas",
              location: "Macamot, Binangonan",
              rating: 5.0,
              sold: "10k",
              rank: 2,
              categories: ["milks & dairy", "rice", "grains"],
              img: "/222.jpg",
            },
            {
              name: "John Doe Pasig",
              location: "Macamot, Binangonan",
              rating: 5.0,
              sold: "12k",
              rank: 1,
              categories: ["fruits", "rice", "vegetables", "root crops"],
              img: "/111.png",
            },
            {
              name: "Jonathan De Vera",
              location: "Macamot, Binangonan",
              rating: 5.0,
              sold: "9k",
              rank: 3,
              categories: ["fruits", "root crops", "meat"],
              img: "/333.png",
            },
          ].map((farmer, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border-[3px] border-black-200 shadow-md w-[350px] text-center flex flex-col items-center justify-between relative ${
                index === 1 ? 'mt-[-40px]' : 'mt-0'
              }`}
            >
              <div className="flex flex-col items-center justify-between h-full w-full">
                <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <img
                      src={farmer.img}
                      alt={farmer.name}
                      className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                    <img
                      src={`/medal-${farmer.rank}.png`}
                      alt="medal"
                      className="absolute -top-0 -right-1 w-8 h-8 z-10"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                  <p className="text-sm text-gray-500">{farmer.location}</p>
                  <div className="flex items-center gap-2 font-medium mt-1">
                    <img src="/Star.png" alt="star" className="h-5 w-5" />
                    <span className="text-black">{Number(farmer.rating).toFixed(1)}</span>
                    <span className="text-gray-500 ml-1">|</span>
                    <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {farmer.categories.map((cat, idx) => {
                      let baseClass = 'px-3 py-1 text-sm font-medium rounded-full';
                      let tagClass = '';

                      switch (cat.toLowerCase()) {
                        case 'vegetables':
                        case 'root crops':
                        case 'milks & dairy':
                          tagClass = 'bg-[#8BC34A] text-white';
                          break;
                        case 'grains':
                        case 'fruits':
                          tagClass = 'bg-[#D1A157] text-white';
                          break;
                        case 'meat':
                        case 'rice':
                          tagClass = 'bg-[#4CAE4F] text-white';
                          break;
                        default:
                          tagClass = 'bg-green-100 text-green-800';
                          break;
                      }

                      return (
                        <span key={idx} className={`${baseClass} ${tagClass}`}>
                          {cat}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-black">
                  <button 
                  onClick={() => navigate('/view-farmer')}
                  className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-1/2 border-r border-black">
                    <img src="/shopp.png" alt="shop" className="w-5 h-5" />
                    View Shop
                  </button>
                  <button 
                    onClick={() => navigate('/chatpage')}
                    className="flex items-center justify-center gap-2 bg-white text-[#4CAE4F] text-[16px] font-semibold py-3 w-1/2"
                  >
                    <img src="/chat.png" alt="chat" className="w-5 h-5" />
                    Chat Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-10 relative z-10">
          <button
            className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110"
            onClick={() => navigate('/searched-farmers')}
          >
            See More
          </button>
        </div>
      </section>

      {/* Federation Section */}
      <section>
        <container className="bg-white h-[20px]"></container>
      </section>
      <FederationSection/>

      {/* Counts */}
      <section className="bg-[#4CAE4F] rounded-lg text-white py-4 mx-[80px] mt-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x divide-white text-center">
          <div className="px-4 py-4">
            <h2 className="text-[70px] font-semibold">546+</h2>
            <p className="text-[20px] font-normal">Registered Farmers</p>
          </div>
          <div className="px-4 py-4">
            <h2 className="text-[70px] font-semibold">789,900+</h2>
            <p className="text-[20px]">Orders Delivered</p>
          </div>
          <div className="px-4 py-4">
            <h2 className="text-[70px] font-semibold">690+</h2>
            <p className="text-[20px]">Food Items</p>
          </div>
        </div>
      </section>
     
      <footer className="bg-[#D9D9D9] mt-6 pt-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 gap-y-1 text-sm text-gray-700 mx-1 mb-2 text-center md:text-left mx-[100px]">
          <div className="flex flex-col items-center">
            <div className="flex flex-col">
              <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" />
              <p className="text-[15px] text-green-600 text-center">Ang Ugat sa Masaganang Bukas!</p>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">CUSTOMER SERVICE</p>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Payment Methods</li>
              <li>Return & Refund</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">ABOUT BINHI</p>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Binhi Seller Center</li>
            </ul>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">PAYMENT METHODS</p>
            <div className="grid grid-cols-2 gap-2">
              <img src="cod.png" alt="COD" />
              <img src="gcash.png" alt="GCash" />
              <img src="paypal.png" alt="PayPal" />
              <img src="maya.png" alt="Maya" />
            </div>
          </div>
          <div className="mx-4">
            <p className="text-[15px] font-bold mb-3">FOLLOW US</p>
            <ul className="space-y-1">
              <li className="flex items-center space-x-1">
                <img src="Facebook.png" alt="Facebook" />
                <span>BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="Messenger.png" alt="Messenger" />
                <span>@BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="WhatsApp.png" alt="WhatsApp" />
                <span>BINHI Corp.</span>
              </li>
              <li className="flex items-center space-x-1">
                <img src="Instagram.png" alt="Instagram" />
                <span>BINHI Corp.</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px]">
        Binhi 2024, All Rights Reserved.
      </div>

      <div className="group fixed bottom-10 right-10 z-50">
        <button
          onClick={() => navigate('/ChatPage')}
          className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative"
        >
          <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
        </button>
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Chats
        </div>
      </div>
    </div>
  );
};

export default MarketplaceWithAccount;
