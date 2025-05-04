import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Expand } from 'lucide-react'

const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "Freshly Home Made Butter with Chocolate Inside",
      image: "Butter.png",
      quantity: 1,
      price: 53.00,
      status: "Completed"
    },
    {
      id: 2,
      name: "Premium Farm Fresh Sweet Corn",
      image: "Mais.png",
      quantity: 1,
      price: 0,
      status: "To Ship"
    }
  ];

  const filteredOrders = selectedTab === "All"
    ? orders
    : orders.filter(order => order.status === selectedTab);

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">

        {/* Left - Profile Info */}
        <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6 w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src="333.png" 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover" 
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                <img src="Edit.png" alt="edit" className="h-3 w-3" />
              </button>
            </div>
            <h2 className="text-xl font-bold mt-4">Juan Dela Cruz</h2>
            <p className="text-gray-500">Farmer</p>
            <button className="mt-4 bg-[#4CAE4F] text-white px-4 py-2 rounded-full">Edit Profile</button>
          </div>

          {/* Info Fields */}
          <div className="mt-6 space-y-4">
            {["Full Name", "Contact No.", "Address", "Email"].map((label, idx) => {
              const placeholders = [
                "Juan Dela Cruz",
                "091234567891",
                "Manila City",
                "juandelacruz@gmail.com"
              ];
              return (
                <div key={label}>
                  <p className="text-[#858585] text-[15px] font-bold">{label}</p>
                  <input
                    type={label === "Email" ? "email" : "text"}
                    placeholder={placeholders[idx]}
                    className="text-[15px] w-full border-2 border-gray-300 rounded-full p-2"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Steps and Orders */}
        <div className="w-full md:w-2/3 space-y-6">

          {/* Steps Section */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
            <div className="flex items-center overflow-x-auto">
              {["Basic Information", "Add Profile Picture", "Upload Document", "Final Set Up"].map((step, index, array) => {
                let imgSrc = "";
                let status = "";

                if (index < 2) {
                  imgSrc = "Done.png";
                  status = "Completed";
                } else if (index === 2) {
                  imgSrc = "Circle_In progress.png";
                  status = "In Progress";
                } else {
                  imgSrc = "Circle_NC.png";
                  status = "Not Completed";
                }

                let lineSrc = null;
                if (index < array.length - 1) {
                  lineSrc = index < 2 ? "GreenLine.png" : "GrayLine.png";
                }

                return (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <img src={imgSrc} alt={step} className="w-10 h-10" />
                      <p className="mt-2 text-center text-[15px] font-bold">{step}</p>
                      <p className={`text-[12px] ${
                        status === "Completed"
                          ? "text-green-600"
                          : status === "In Progress"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}>{status}</p>
                    </div>
                    {lineSrc && (
                      <img src={lineSrc} alt="Step Line" className="mx-1 mb-8 w-[110px] h-[4px]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start border-b pb-4 gap-2">
              <div className="flex flex-wrap gap-3 flex-1">
                {["All", "To Pay", "To Ship", "To Receive", "Completed", "Cancelled", "Return/Refund"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`text-sm px-4 py-1 rounded-full transition-all duration-200 ${
                      selectedTab === tab 
                        ? "bg-[#4CAE4F] text-white font-semibold" 
                        : "text-gray-600 hover:text-green-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Expand button */}
              <button
                onClick={() => navigate('/orders')}
                className="text-gray-500 hover:text-black transition-colors shrink-0"
              >
                <Expand size={20} />
              </button>
            </div>

           {/* Order Items */}
          <div className="mt-6 space-y-6">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500">No orders under "{selectedTab}"</p>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm">
                  <div className="flex gap-4 items-center">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-[15px] font-semibold">{order.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {order.quantity}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <span className={`text-white text-sm px-3 py-1 rounded-full ${
                      order.status === "Completed" ? "bg-[#4CAE4F]" :
                      order.status === "To Ship" ? "bg-[#D1A157]" :
                      "bg-gray-400"
                    }`}>
                      {order.status}
                    </span>
                    {order.price > 0 && (
                      <p className="text-md font-bold">₱{order.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage;
