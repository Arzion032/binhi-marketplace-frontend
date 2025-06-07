import React from 'react';

const MainFooter = () => {
  return (
    <>
      <footer className="bg-green-100 pt-8 pb-6">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-base text-gray-700">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center md:items-start">
              <img 
                src="Primary Logo w_ BG.png" 
                alt="Binhi Logo" 
                className="w-42 h-20" 
              />
              <p className="text-base text-green-600 text-center md:text-center ml-2 leading-relaxed">
                Ang Ugat sa Masaganang Bukas!
              </p>
            </div>

            {/* Customer Service */}
            <div className="text-center md:text-left">
              <p className="text-base font-bold mb-4 text-gray-800">CUSTOMER SERVICE</p>
              <ul className="space-y-2">
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Help Center</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Payment Methods</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Return & Refund</li>
              </ul>
            </div>

            {/* About Binhi */}
            <div className="text-center md:text-left">
              <p className="text-base font-bold mb-4 text-gray-800">ABOUT BINHI</p>
              <ul className="space-y-2">
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">About Us</li>
                <li className="text-gray-700 hover:text-gray-900 cursor-pointer">Privacy Policy</li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="text-center md:text-left">
              <p className="text-base font-bold mb-4 text-gray-800">PAYMENT METHODS</p>
              <div className="flex justify-center md:justify-start gap-3">
                <img 
                  src="cod.png" 
                  alt="COD" 
                  className="h-10 w-auto object-contain" 
                />
                <img 
                  src="gcash.png" 
                  alt="GCash" 
                  className="h-10 w-auto object-contain" 
                />
              </div>
            </div>

            {/* Follow Us */}
            <div className="text-center md:text-left">
              <p className="text-base font-bold mb-4 text-gray-800">FOLLOW US</p>
              <ul className="space-y-3">
                <li className="flex items-center justify-center md:justify-start space-x-2">
                  <img 
                    src="Facebook.png" 
                    alt="Facebook" 
                    className="w-5 h-5 object-contain" 
                  />
                  <span className="text-gray-700">BINHI Corp.</span>
                </li>
                <li className="flex items-center justify-center md:justify-start space-x-2">
                  <img 
                    src="Messenger.png" 
                    alt="Messenger" 
                    className="w-5 h-5 object-contain" 
                  />
                  <span className="text-gray-700">@BINHI Corp.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px] font-medium">
        © Binhi 2025, All Rights Reserved.
      </div>
    </>
  );
};

export default MainFooter;