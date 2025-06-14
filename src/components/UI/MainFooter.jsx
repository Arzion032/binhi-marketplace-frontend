import React from 'react';

const MainFooter = () => {
  return (
    <>
      <footer className="bg-[#D9D9D9] pt-10 pb-4">
        <div className="mx-auto max-w-[1500px] grid grid-cols-1 md:grid-cols-5 gap-y-6 px-6 text-sm text-gray-700 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" className="mb-2" />
            <p className="text-[15px] text-green-600">Ang Ugat sa Masaganang Bukas!</p>
          </div>

          {/* Customer Service */}
          <div>
            <p className="text-[15px] font-bold mb-3">CUSTOMER SERVICE</p>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Payment Methods</li>
              <li>Return & Refund</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* About Binhi */}
          <div>
            <p className="text-[15px] font-bold mb-3">ABOUT BINHI</p>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Privacy Policy</li>
              <li>Binhi Seller Center</li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-[15px] flex-col font-bold mb-3">PAYMENT METHODS</p>
            <div className="grid grid-cols-2 gap-2">
              <img src="/cod.png" alt="COD" />
              <img src="/gcash.png" alt="GCash" />
            </div>
          </div>

          {/* Follow Us */}
          <div>
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
    </>
  );
};

export default MainFooter;
