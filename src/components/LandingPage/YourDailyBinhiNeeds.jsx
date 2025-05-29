import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../UI/MainHeader';

const itemsPerPage = 15;

const YourDailyBinhiNeeds = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);


  const products = [
    { name: "Automatic-Cook Rice from the Field of Antartica", price: "₱136", sold: 227, image: "/Search-rice.png" },
    { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
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
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
];

    
 const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <MainHeader />
      <div className="min-h-screen w-full bg-[#F5F9F5] pt-8">
        <h1 className="bg-white text-[38px] font-bold text-center shadow-xl">
          YOUR DAILY<span className="text-[#4CAE4F]"> BINHI </span> NEEDS
        </h1>

        {/* Products Grid */}
        <section className="px-6 py-6 bg-[#F5F9F5]">
          <div className="mx-[50px] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
              >
                <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  VEGETABLE
                </span>
                <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
                <p className="text-left font-semibold text-[20px]">{product.name}</p>
                <p className="text-[#4CAE4F] text-[20px] font-bold">
                  {product.price}
                  <span className="text-[15px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2 ml-1">
                    per pc.
                  </span>
                </p>
                <div className="text-[20px] text-gray-600 mt-4 flex items-center gap-1">
                  <img src="/Star.png" alt="star" className="w-4 h-4" />
                  5.0 • {product.sold} Sold
                </div>
                <div className="flex items-center justify-between gap-4 mt-2">
                  <img src="/shopping-cart.png" alt="cart" className="w-6 h-6 transition-transform duration-100 hover:scale-125" />
                  <button
                    onClick={() => navigate(`/product/${index}`)}
                    className="text-[20px] bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="w-[45px] h-[50px] bg-[#D9D9D9] border border-[#858585] rounded-xl text-gray-500 hover:bg-[#c2c2c2]"
        >
          &lt;
        </button>

        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${
              currentPage === num
                ? 'bg-[#4CAE4F] text-white border-[#4CAE4F] hover:bg-[#3c9d3f]'
                : 'bg-[#D9D9D9] text-[#858585] border-[#858585] hover:bg-[#bfbfbf]'
            }`}
          >
            {num}
          </button>
        ))}

        <button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
          ...
        </button>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="w-[45px] h-[50px] rounded-xl bg-[#D9D9D9] border border-[#858585] text-[#858585] hover:bg-[#c2c2c2]"
        >
          &gt;
        </button>
      </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#D9D9D9] mt-2 pt-10 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 gap-y-1 text-sm text-gray-700 mx-[100px] mb-2 text-center md:text-left">
            <div className="flex flex-col items-center">
              <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" />
              <p className="text-[15px] text-green-600 text-center">Ang Ugat sa Masaganang Bukas!</p>
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
                <img src="/cod.png" alt="COD" />
                <img src="/gcash.png" alt="GCash" />
                <img src="/paypal.png" alt="PayPal" />
                <img src="/maya.png" alt="Maya" />
              </div>
            </div>
            <div className="mx-4">
              <p className="text-[15px] font-bold mb-3">FOLLOW US</p>
              <ul className="space-y-1">
                <li className="flex items-center space-x-1">
                  <img src="/Facebook.png" alt="Facebook" />
                  <span>BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/Messenger.png" alt="Messenger" />
                  <span>@BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/WhatsApp.png" alt="WhatsApp" />
                  <span>BINHI Corp.</span>
                </li>
                <li className="flex items-center space-x-1">
                  <img src="/Instagram.png" alt="Instagram" />
                  <span>BINHI Corp.</span>
                </li>
              </ul>
            </div>
          </div>
        </footer>

        <div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px]">
          Binhi 2024, All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default YourDailyBinhiNeeds;
