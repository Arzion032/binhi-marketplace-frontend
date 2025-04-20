import React from 'react'
<<<<<<< HEAD
import MainHeader from "../UI/MainHeader";

=======
import MainHeader from './MainHeader' // Import the header component
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a

const Marketplace = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-[#F5F9F5] shadow-lg"> 
      {/* Main Header */}
<<<<<<< HEAD

=======
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a
      <MainHeader />

      {/* Hero Section */}
      
      <section className="bg-[#4CAE4F] text-white px-6 py-2 md:py-2 mx-[50px] mt-[30px] rounded-xl">      
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Growth Begins <br /> with a Single Seed
            </h1>
            <p className="text-base md:text-lg">
              Take the first step toward a greener future.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
<<<<<<< HEAD
              <button className="bg-white text-green-600 font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105">
                Shop Now
              </button>
              <button className="border border-white font-medium px-6 py-2 rounded-full hover:translate-x-2 hover:scale-105">
=======
              <button className="bg-white text-green-600 font-medium px-6 py-2 rounded-full">
                Shop Now
              </button>
              <button className="border border-white font-medium px-6 py-2 rounded-full">
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a
                Explore →
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/LandingPageFarmers.png"
              alt="Farmers"
               className="w-full bottom-[-60px] h-auto max-w-[520px] rounded-none"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-2 sm:px-4 py-4 mx-[60px]">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-cols-6 gap-0">
    {[
  {
    label: 'Grains',
    background: '/grains.png',
    overlay: '/rice.png',
  },
  { label: 'Vegetables', 
    background: '/vegetable.png',
    overlay: '/broccoli.png',
   },
  { label: 'Roots', 
    background: '/root-crops.png',
    overlay: '/ginger.png' },
  { 
    label: 'Dairy', 
    background: '/milks.png',
    overlay: '/milk-bottle.png' },
  { 
    label: 'Meat', 
    background: '/meatss.png',
    overlay: '/meat.png'
   },
  { label: 'Fruits', 
    background: '/fruits.png',
    overlay: '/grapes.png'
   },
].map((item, index) => (
  <div
    key={index}
    className=" group p-4 text-center text-sm font-medium text-gray-700 flex flex-col items-center transition-transform duration-300"
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
    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:font-bold">
      {item.label}
    </span>
  </div>
))}
    </div>
  </div>
</section>
</div>
<h1 className="bg-white text-[38px] font-bold text-center shadow-lg"> YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS </h1>
<section className="px-6 py-6 bg-[#F5F9F5] ">
  <div className="  mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[
      {
        name: "Premium Farm Fresh Sweet Corn",
        price: "₱53.00",
        sold: 227,
        image: "/corn.png"
      },
      {
        name: "Ultra-Green Superfood Broccoli Hulk Flavored",
        price: "₱53.00",
        sold: 227,
        image: "/brocco.png"
      },
      {
        name: "Ultra-Creamy Black Gold Avocado with Balut",
        price: "₱53.00",
        sold: 227,
        image: "/fruit-avocado.png"
      },
      {
        name: "How to Train Your Dragon's Treasure Exotic Fruit",
        price: "₱53.00",
        sold: 227,
        image: "/dragonfruit.png"
      },
      {
        name: "Premium Milk With No Exercise One Week",
        price: "₱53.00",
        sold: 227,
        image: "/milk.png"
      },
      {
        name: "Ultra-Creamy Black Gold Avocado with Balut",
        price: "₱53.00",
        sold: 227,
        image: "/fruit-avocado.png"
      },
      {
        name: "How to Train Your Dragon's Treasure Exotic Fruit",
        price: "₱53.00",
        sold: 227,
        image: "/dragonfruit.png"
      },
      {
        name: "Premium Milk With No Exercise One Week",
        price: "₱53.00",
        sold: 227,
        image: "/milk.png"
      },
      {
        name: "Premium Farm Fresh Sweet Corn",
        price: "₱53.00",
        sold: 227,
        image: "/corn.png"
      },
      {
        name: "Ultra-Green Superfood Broccoli Hulk Flavored",
        price: "₱53.00",
        sold: 227,
        image: "/brocco.png"
      },
      {
        name: "Premium Farm Fresh Sweet Corn",
        price: "₱53.00",
        sold: 227,
        image: "/corn.png"
      },
      {
        name: "Ultra-Green Superfood Broccoli Hulk Flavored",
        price: "₱53.00",
        sold: 227,
        image: "/brocco.png"
      },
      {
        name: "Premium Milk With No Exercise One Week",
        price: "₱53.00",
        sold: 227,
        image: "/milk.png"
      },
      {
        name: "How to Train Your Dragon's Treasure Exotic Fruit",
        price: "₱53.00",
        sold: 227,
        image: "/dragonfruit.png"
      },
      {
        name: "Ultra-Creamy Black Gold Avocado with Balut",
        price: "₱53.00",
        sold: 227,
        image: "/fruit-avocado.png"
      },
      {
        name: "Premium Farm Fresh Sweet Corn",
        price: "₱53.00",
        sold: 227,
        image: "/corn.png"
      },
      {
        name: "Ultra-Creamy Black Gold Avocado with Balut",
        price: "₱53.00",
        sold: 227,
        image: "/fruit-avocado.png"
      },
      {
        name: "Premium Milk With No Exercise One Week",
        price: "₱53.00",
        sold: 227,
        image: "/milk.png"
      },
      {
        name: "Ultra-Green Superfood Broccoli Hulk Flavored",
        price: "₱53.00",
        sold: 227,
        image: "/brocco.png"
      },
      {
        name: "Ultra-Creamy Black Gold Avocado with Balut",
        price: "₱53.00",
        sold: 227,
        image: "/fruit-avocado.png"
      },
    ].map((product, index) => (
<<<<<<< HEAD
      <div key={index}   className="bg-white rounded-xl shadow-md p-4 text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full">
=======
      <div key={index}   className="bg-white rounded-xl shadow-md p-4 text-left transition hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full">
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a
      <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">VEGETABLE</span>
      <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
      <p className="text-left font-semibold text-[16px]">{product.name}</p>
      <p className="text-[#4CAE4F] text-lg font-bold">{product.price} <span className="text-[10px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2  ">per pc.</span></p>
      <div className="text-sm text-gray-600 mt-4   flex items-center gap-1">
      <img src="/Star.png" alt="star" className="w-4 h-4" />
      5.0 • {product.sold} Sold
      </div>
      <div className= "flex items-center justify-between gap-4 mt-2"> 
<<<<<<< HEAD
      <img src = "shopping-cart.png" alt="cart" className="w-6 h-6 transition-transform duration-100 hover:scale-125"/> 
      <button className="text-sm bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110">
      Buy Now
=======
      <img src = "shopping-cart.png" alt="cart" className="w-6 h-6"/> 
      <button className="text-sm bg-[#4CAE4F] items-right text-white w-80 px-4 py-1 rounded-2xl">
        Buy Now
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a
      </button>
      </div>
      </div>
    ))}
<<<<<<< HEAD
  </div>  
</section>
<div className="flex justify-center mt-5">
  <button className="text-lg font-bold bg-white border-2 border-[#4CAE4F] text-[#4CAE4F] w-80 px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110">
    See More
  </button>
</div>
<div className="flex items-center justify-between mx-[70px]">
  <div className="flex items-center gap-2">
    <p className="text-[30px] font-bold text-shadow-lg">Featured Products</p>
    <span className="text-[14px] font-normal text-gray-400">
      Do not miss the current offers until the end of April
    </span>
  </div>
  <p className="text-[20px] font-bold text-right hover:underline">See more</p>
=======
  </div>
</section>
<div className="flex items-center justify-between mx-[40px]">
  <div className="flex items-center gap-2">
    <p className="text-[25px] font-bold">Featured Products</p>
    <span className="text-[10px] font-normal text-gray-400">
      Do not miss the current offers until the end of April
    </span>
  </div>
  <p className="text-[15px] font-bold text-right">See more</p>
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a
</div>

    </div>
  )

}

export default Marketplace
