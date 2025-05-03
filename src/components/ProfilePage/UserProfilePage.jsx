import React from 'react'
import MainHeader from "../UI/MainHeader";

const UserProfilePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
      {/* Main Header */}
      <div className="shadow-lg">
        <MainHeader />
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        
        {/* Left Side - Profile Info */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img 
                src="333.png" 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover" 
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-lg">
                <img src = "Edit.png" alt ="edit" className="h-3 w-3"/>
              </button>
            </div>
            <h2 className="text-xl font-bold mt-4">Juan Dela Cruz</h2>
            <p className="text-gray-500">Farmer</p>
            <button className="mt-4 bg-[#4CAE4F] text-white px-4 py-2 rounded-full">Edit Profile</button>
          </div>

                {/* Info fields */}
            <div className="mt-6 space-y-4">
            <div>
                <p className="text-gray-500 text-[15px] font-bold">Full Name</p>
                <input 
                type="text" 
                placeholder="Juan Dela Cruz" 
                className="text-[15px] w-full border-2 border-gray-300 rounded-full p-2" 
                />
            </div>
            <div>
                <p className="text-gray-500 text-[15px] font-bold">Contact No.</p>
                <input 
                type="text" 
                placeholder="091234567891" 
                className="text-[15px] w-full border-2 border-gray-300 rounded-full p-2" 
                />
            </div>
            <div>
                <p className="text-gray-500 text-[15px] font-bold">Address</p>
                <input 
                type="text" 
                placeholder="Manila City" 
                className="text-[15px] w-full border-2 border-gray-300 rounded-full p-2" 
                />
            </div>
            <div>
                <p className="text-gray-500 text-[15px] font-bold">Email</p>
                <input  
                type="email" 
                placeholder="juandelacruz@gmail.com" 
                className="text-[15px] w-full border-2 border-gray-300 rounded-full p-2" 
                />
            </div>
            </div>
            </div>
        {/* Right Side - Steps and Orders */}
        <div className="w-full md:w-2/3 space-y-6">
          
          {/* Steps */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center">
                {["Basic Information", "Add Profile Picture", "Upload Document", "Final Set Up"].map((step, index) => {
                let imgSrc = "";

                if (index < 2) {
                    imgSrc = "Done.png"; // Completed
                } else if (index === 2) {
                    imgSrc = "Circle_In progress.png"; // In Progress
                } else {
                    imgSrc = "Circle_NC.png"; // Not Completed
                }

                return (
                    <div key={index} className="flex flex-col items-left">
                    <img src={imgSrc} alt={step} className="w-10 h-10" />
                    <p className="mt-2 text-center text-[15px] font-bold">{step}</p>
                    <p className=" text-gray-500 text-[12px]">
                        {index < 2 ? "Completed" : index === 2 ? "In Progress" : "Not Completed"}
                    </p>
                    </div>
                )
                })}
            </div>
            </div>


          {/* Orders */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex space-x-4 border-b pb-4 gap-5">
              {["All", "To Pay", "To Ship", "To Receive", "Completed", "Cancelled", "Return/Refund"].map(tab => (
                <button key={tab} className="text-gray-600 hover:text-green-600 text-sm">{tab}</button>
              ))}
            </div>

            {/* Order Items */}
            <div className="mt-6 space-y-6">

              {/* Order 1 */}
              <div className="flex justify-between items-center border p-4 rounded-lg">
                <div className="flex gap-4 items-center">
                  <img src="Butter.png" alt="Butter" className="w-16 h-16 rounded-lg" />
                  <div>
                    <p className="font-semibold">Freshly Home Made Butter with Chocolate Inside</p>
                    < br/> < br/> 
                    <p className="text-sm text-gray-500">Quantity: 1</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white bg-[#4CAE4F] rounded-full px-4">Completed</p>
                  < br/> < br/>  
                  <p className="font-bold mt-2">₱53.00</p>
                </div>
              </div>  

              {/* Order 2 */}
              <div className="flex justify-between items-center border p-4 rounded-lg">
                <div className="flex gap-4 items-center">
                  <img src="Mais.png" alt="Corn" className="w-16 h-16 rounded-lg" />
                  <div>
                    <p className="font-semibold">Premium Farm Fresh Sweet Corn</p>
                    < br/> < br/> 
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white bg-[#D1A157] rounded-full px-4">To Ship</p>
                  < br/> < br/>  
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default UserProfilePage;
