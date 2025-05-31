import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FederationSection from './FederationSection';
import ProductCard from './ProductCard';
import FarmerCard from './FarmerCard';
import { BASE_URL } from "../../constants";
import api from '../../api';

const PRODUCTS_API = `${BASE_URL}/products/landing-page/`;


const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    api.get("/products/landing-page/")
      .then(res => setProducts(res.data))
      .catch(err => setError(err.message || "Error fetching products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };


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
                 <section className="bg-[#4CAE4F] text-white px-6 py-2 md:py-2 mx-[80px] mt-[30px] rounded-xl">
                   <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
                     <div className="md:w-1/2 space-y-4 text-center md:text-left">
                       <h1 className="text-4xl sm:text-3xl md:text-5xl font-bold leading-tight">
                         Growth Begins <br /> with a Single Seed
                       </h1>
                       <p className="text-xl md:text-lg">Take the first step toward a greener future.</p>
                       <div className="flex flex-wrap justify-center md:justify-start gap-4">
                         <button className="text-xl bg-white text-green-600 font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105">
                           Shop Now
                         </button>
                         <button 
                          onClick={() => navigate('/featured-products')}
                         className="text-lg border border-white font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105"
                          >
                            Explore →
                         </button>
                       </div>
                     </div>
                     <div className="md:w-1/2 flex justify-center">
                       <img src="/LandingPageFarmers.png" alt="Farmers" className="w-full h-auto max-w-[520px] rounded-none" />
                     </div>
                   </div>
                 </section>

                 {/* Categories Section */}
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
                         <div key={index} className="group p-4 text-center text-xl font-medium text-gray-700 flex flex-col items-center transition-transform duration-300">
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
          <h1 className="bg-white text-4xl font-bold text-center shadow-lg p-6">
            YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
          </h1>
          <div className="px-6 py-6 bg-[#F5F9F5]">
            <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
  
             </div><div className="flex justify-center mt-10">
                 <button
                   onClick={() => navigate('/daily-needs')}
                   className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-[500px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110"
                 >
                   See More
                 </button>
               </div>

      {/*Featured Products Section, miii*/}
      <section className="px-6 py-6 bg-[#F5F9F5] ">
        <div className="flex items-center justify-between mx-[70px] mt-[5px] mb-[10px]">
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold text-shadow-lg">Featured Products</p>
            <span className="text-base font-normal text-gray-400">
              Do not miss the current offers until the end of April
            </span>
          </div>
        <button
              onClick={() => navigate('/featured-products')}
              className="text-[20px] font-bold hover:underline mx-100"
            >
              See more
            </button>        
            </div>
        <div className="mx-[80px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-24 lg:grid-cols-6 gap-2">
          {products.slice(0, 6).map((product, index) => (
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
      </section>

      {/*Top Farners Section, miii*/}
      <section className="relative px-6 py-10 bg-[#F5F9F5] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/confetti.png" alt="confetti" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-center text-3xl font-black font-inter mb-5 relative z-10 mb-16">Top Farmers of the Month</h2>

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
          <FarmerCard
              key={index}
              farmer={farmer}
              className={index === 1 ? 'mt-[-40px]' : 'mt-0'}
          />
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-10 relative z-10">
          <button
          className="bg-white border border-[#4CAE4F] text-[#4CAE4F] font-semibold w-[500px] px-8 py-2 rounded-full hover:bg-green-50 transition"
          onClick={() => navigate('/searched-farmers')}
          >
          See More
          </button>
        </div>
      </section>

      {/*Federation Section, miii*/}
      <section>
        <container className="bg-white h-[20px]"></container>
      </section>
      <FederationSection/>

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
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Chats
            </div>
            </div>
 </div>
            </div> 
  );
};

export default Marketplace;