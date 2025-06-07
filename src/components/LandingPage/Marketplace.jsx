import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FederationSection from './FederationSection';
import ProductCard from './ProductCard';
import FarmerCard from './FarmerCard';
import { BASE_URL } from "../../constants";
import api from '../../api';
import WelcomeScreen from './WelcomeScreen';
import LoadingScreen from '../UI/LoadingScreen';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products/landing-page/")
      .then(res => setProducts(res.data))
      .catch(err => setError(err.message || "Error fetching products"))
      .finally(() => setLoading(false));
  }, []);



  // Show error if there's an error
  if (error) return <div>Error: {error}</div>;

  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

 const getCategoryClass = (cat) => {
    switch (cat.toLowerCase()) {
      case 'vegetables':
      case 'root crops':
      case 'milks & dairy':
        return 'bg-[#8BC34A] text-white';
      case 'grains':
      case 'fruits':
        return 'bg-[#D1A157] text-white';
      case 'meat':
      case 'rice':
        return 'bg-[#4CAE4F] text-white';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const farmerTemplates = [
    {
      name: "Pantok Farmers Association",
      location: "Pantok, Binangonan",
      sold: "10k",
      rank: 2,
      categories: ["milks & dairy", "rice", "grains"],
      img: "/555.png",
    },
    {
      name: "Macamot Farmers Association",
      location: "Macamot, Binangonan",
      sold: "12k",
      rank: 1,
      categories: ["fruits", "rice", "vegetables", "root crops"],
      img: "/444.png",
    },
    {
      name: "Tagpos Farmers Association",
      location: "Tagpos, Binangonan",
      sold: "9k",
      rank: 3,
      categories: ["fruits", "root crops", "meat"],
      img: "/222.png",
    },
  ];

  const farmers = Array.from({ length: 20 }, (_, i) => {
    return { ...farmerTemplates[i % farmerTemplates.length] };
  });

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="bg-[#F5F9F5] shadow-lg">
        {showToast && (
          <div className="fixed pt-10 inset-0 flex items-center justify-center z-50">
            <div className="border-2 border-[#858585] bg-white rounded-3xl p-10 w-[420px] shadow-xl text-center">
              <img src="/Checkpass.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{selectedProductName}</h3>
              <p className="text-lg">has been added to your shopping cart</p>
            </div>
          </div>
        )}

        <WelcomeScreen />

        {/* Categories Section */}
        <section className="px-2 sm:px-4 py-4 mx-[60px]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-0">
              {[
                { label: 'Grains', background: '/grains.png', overlay: '/rice.png' },
                { label: 'Vegetables', background: '/vegetable.png', overlay: '/broccoli.png' },
                { label: 'Roots', background: '/root-crops.png', overlay: '/ginger.png' },
                { label: 'Dairy', background: '/milks.png', overlay: '/milk-bottle.png' },
                { label: 'Meat', background: '/meatss.png', overlay: '/meat.png' },
                { label: 'Fruits', background: '/fruits.png', overlay: '/grapes.png' },
                { label: 'Fish', background: '/fish.png', overlay: '/fishy.png' },
              ].map((item, index) => (
                <div key={index} className="group p-4 text-center text-2xl font-medium text-gray-700 flex flex-col items-center transition-transform duration-300">
                  <div className="relative w-18 h-18 mb-2">
                    <img src={item.background} alt="background" className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-50" />
                    <img src={item.overlay} alt="overlay" className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/6 w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-125" />
                  </div>
                  <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Products Section */}
      <h1 className="bg-white border-2 border-gray text-4xl font-black text-center shadow-lg p-6">
        YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
      </h1>
      <div className="bg-[#F5F9F5]">
        <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onCardClick={() => navigate(`/product/${index}`)}
              onAddToCart={() => {
                setSelectedProductName(product.name);
                showModalToast();
              }}
              onBuyNow={() => navigate(`/product/${index}`)}
            />
          ))}
        </div>
        <div className="mb-10 flex justify-center mt-10">
          <button
            onClick={() => navigate('/daily-needs')}
            className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110"
          >
            See More
          </button>
        </div>

        {/*Top Farmers Section*/}
        <section className="pt-[40px] relative px-6 py-10 bg-[#F5F9F5] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <img src="/confetti.png" alt="confetti" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-center text-3xl font-black font-inter relative z-10 mb-16">Top Associations of the Month</h2>

          <div className="pt-[20px] flex flex-wrap justify-center gap-6 relative z-10">
            {farmers.slice(0, 3).map((farmer, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border-[3px] border-black-200 shadow-md w-[350px] text-center flex flex-col items-center justify-between relative ${index === 1 ? 'mt-[-40px]' : 'mt-0'}`}
              >
                <div className="flex flex-col items-center justify-between h-full w-full">
                  <div className="px-6 pt-6 pb-4 w-full flex-1 flex flex-col items-center">
                    <div className="relative w-24 h-24">
                      <img src={farmer.img} alt={farmer.name} className="w-24 h-24 object-cover" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.location}</p>
                    <div className="flex items-center gap-2 font-medium mt-1">
                      <span className="text-gray-500 ml-2">{farmer.sold} Sold</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      {farmer.categories.map((cat, idx) => (
                        <span key={idx} className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryClass(cat)}`}>{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex rounded-b-2xl overflow-hidden border-t border-black">
                    <button className="flex items-center justify-center gap-2 bg-[#4CAE4F] text-white text-[16px] font-semibold py-3 w-1/2 border-r border-black">
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
              onClick={() => navigate('/associations')}
            >
              See More
            </button>
          </div>
        </section>



        {/*Counts*/}
        <section className="bg-[#4CAE4F] rounded-lg text-white py-4 mx-[80px] mt-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-3 md:divide-y-0 md:divide-x divide-white text-center">
            <div className="px-4 py-4">
              <h2 className="text-[70px] font-bold">546+</h2>
              <p className="text-[20px] font-normal">Registered Farmers</p>
            </div>
            <div className="px-4 py-4">
              <h2 className="text-[70px] font-bold">789,900+</h2>
              <p className="text-[20px]">Orders Delivered</p>
            </div>
            <div className="px-4 py-4">
              <h2 className="text-[70px] font-bold">690+</h2>
              <p className="text-[20px]">Food Items</p>
            </div>
          </div>
        </section> 

        <div className="group fixed bottom-10 right-10 z-50">
          <button
            onClick={() => navigate('/ChatPage')}
            className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative"
          >
            <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
          </button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#4CAE4F] text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            Chats
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;