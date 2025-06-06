import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import CheckOutDetails from './CheckOutDetails';
import CheckOutSidebar from './CheckOutSideBar';
import api from '../../api';

/*Check-out Page with Delivery Method*/

export default function CheckoutPage({}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const checkoutData = state?.checkoutData;
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [deliveryMethod, setDeliveryMethod] = useState('Pick-up');
  const [pickupLocation, setPickupLocation] = useState("President's Location");
  const [deliveryFee, setDeliveryFee] = useState(0);

    const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.get(`${BASE_URL}/users/me/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  if (!checkoutData) {
    return <p className="text-center mt-10">No checkout data available.</p>;
  }

  const { items, subtotal, total } = checkoutData;
  const newTotal = total + deliveryFee;

  const handleBuyNow = () => {
    navigate('/checkout-success', {
      state: {
        product: {
          items,
          subtotal,
          total: newTotal,
          paymentMethod,
          deliveryMethod,
          pickupLocation: deliveryMethod === 'Pick-up' ? pickupLocation : null,
          deliveryFee,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F9F5] px-6 py-4">
      <div className="flex mx-10 items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center text-gray-600 hover:text-black"
            onClick={() => navigate("/cartpage")}
          >
            <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
          </button>
          <p className="text-3xl font-bold">Checkout</p>
        </div>
      </div>

      <div className="w-[1750px] mx-10 items-center h-[3px] bg-gray-300 mb-6 mt-6" />

      <div className="flex flex-col lg:flex-row gap-6 mx-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Delivery Address */}
      <section>
        <h2 className="text-xl font-bold mb-2">Delivery Address</h2>

        {userData ? (
          <div className="p-3 flex gap-3 items-start text-[15px]">
            <img src="/map-pin-house.png" alt="Address" className="w-10 h-10" />
            <div>
              <p className="font-semibold text-[16px]">{userData?.username || "No name"}</p>
              <p className="text-gray-700">(+63) {userData.contact_no}</p>
              <p className="text-gray-700">
                {userData.addresses?.[0]
                  ? `${userData.addresses[0].street_address}, ${userData.addresses[0].barangay}, ${userData.addresses[0].city}, ${userData.addresses[0].province}, ${userData.addresses[0].postal_code}`
                  : "No address available"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">Loading address...</p>
        )}
      </section>

           <CheckOutDetails items={items} BASE_URL={BASE_URL}/>
           
        </div>

       

        <CheckOutSidebar
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          newTotal={newTotal}
          items={items}
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          pickupLocation={pickupLocation}
          setPickupLocation={setPickupLocation}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handleBuyNow={handleBuyNow}
        />


        {/* Chat Button */}
        <div className="group fixed bottom-10 right-10 z-50">
          <button
            onClick={() => navigate('/ChatPage')}
            className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative transition-colors"
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
}