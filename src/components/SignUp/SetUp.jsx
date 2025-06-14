import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { regions, provinces, cities, barangays } from '../../constants';
import api from "../../api";

const SetUp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Fixed: added useLocation hook
  const email = location.state?.email;
  const password = location.state?.password;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Region");

  // Selected address details
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");


const [phoneNumber, setPhoneNumber] = useState("");
const [phoneError, setPhoneError] = useState("");

const validatePhoneNumber = (phone) => {
  const regex = /^09\d{9}$/; // Checks for valid Philippine phone number starting with 09 and followed by 9 digits
  if (!regex.test(phone)) {
    setPhoneError("Please enter a valid Philippine phone number.");
  } else {
    setPhoneError("");
  }
};

// When phone number changes, validate it
const handlePhoneNumberChange = (e) => {
  const phone = e.target.value;
  setPhoneNumber(phone);
  validatePhoneNumber(phone);
};

  useEffect(() => {
    let address = [];
    if (selectedBarangay) address.push(selectedBarangay);
    if (selectedCity) address.push(selectedCity);
    if (selectedProvince) address.push(selectedProvince);
    if (selectedRegion) address.push(selectedRegion);

    setCompleteAddress(address.join(", "));
  }, [selectedRegion, selectedProvince, selectedCity, selectedBarangay]);

  // Countdown effect for success modal redirect
  useEffect(() => {
    if (showSuccess) {
      setCountdown(3); // reset countdown when modal opens
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // cleanup on modal close/unmount
    }
  }, [showSuccess, navigate]);

  // Tab progression logic
  const progressToNextTab = (currentTab) => {
    switch (currentTab) {
      case "Region":
        setSelectedTab("Province");
        break;
      case "Province":
        setSelectedTab("City");
        break;
      case "City":
        setSelectedTab("Barangay");
        break;
      case "Barangay":
        setShowAddressModal(false);
        break;
      default:
        break;
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedBarangay("");
    progressToNextTab("Region");
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setSelectedBarangay("");
    progressToNextTab("Province");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedBarangay("");
    progressToNextTab("City");
  };

  const handleBarangaySelect = (barangay) => {
    setSelectedBarangay(barangay);
    if (addressError) setAddressError("");
    progressToNextTab("Barangay");
  };

  // Validate fields and show errors on Finish click
 const handleFinish = async () => {
  let valid = true;

  // Validate the fields
  if (!firstName.trim()) {
    setFirstNameError("* This field is required.");
    valid = false;
  } else {
    setFirstNameError("");
  }

  if (!lastName.trim()) {
    setLastNameError("* This field is required.");
    valid = false;
  } else {
    setLastNameError("");
  }

  if (!completeAddress.trim()) {
    setAddressError("* This field is required.");
    valid = false;
  } else {
    setAddressError("");
  }

  if (!valid) return; // If validation fails, don't proceed

  // Prepare user data
  const userData = {
    "email": email,
    "password": password,
    "username": firstName,
    "contact_no": phoneNumber,
    "full_name": `${firstName} ${lastName}`,
    "address": {
      "region": selectedRegion,
      "province": selectedProvince,
      "city": selectedCity,
      "barangay": selectedBarangay,
    }
  };

  // Show success message or UI
 try {
    console.log('Submitting userData:', userData);

    // Call API with await instead of .then()
    const response = await api.post('/users/signup/', userData);

    // Handle the successful response here
    console.log('Signup successful:', response.data);
    setShowSuccess(true);  // Or handle any other UI update

    // You can proceed with further steps like redirecting to another page

} catch (error) {
    // Log the full error object for debugging
    console.error('Full error object:', error);
    
    // Handle different types of errors
    if (error.response) {
        // Server responded with an error status (4xx, 5xx)
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        
        // Extract the error message from the backend response
        const errorMessage = error.response.data?.error || 
                            error.response.data?.message || 
                            'An error occurred during signup';
        
        alert(errorMessage);
        
        // If there are validation details, log them
        if (error.response.data?.details) {
            console.error('Validation errors:', error.response.data.details);
            
            // You could also display detailed validation errors
            const detailMessages = Object.entries(error.response.data.details)
                .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
                .join('\n');
            
            alert(`${errorMessage}\n\nDetails:\n${detailMessages}`);
        }
        
    } else if (error.request) {
        // Request was made but no response received (network error)
        console.error('Network error:', error.request);
        alert('Network error. Please check your connection and try again.');
        
    } else {
        // Something else happened in setting up the request
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
    }
    
    // Optional: Set error state for UI display
    // setError(errorMessage);
}

// Even better: Custom error handler function
};

  return (
    <div
      className="bg-fixed min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center font-inter px-4"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <div
        className="bg-white rounded-3xl shadow-lg w-[1412px] h-[740px] p-10 relative"
        style={{ marginTop: "-150px" }}
      >
        {/* Back Button */}
        <button
          className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-black"
          onClick={() => navigate("/next-step")}
        >
          <img src="/arrow-left-s-line.png" alt="Back" className="w-20 h-10" />
        </button>

        {/* Step Indicator */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl">
                1
              </div>
              <span className="text-green-600 mt-2">Verification</span>
            </div>

            <img src="/dotgreen.png" alt="Step Flow" className="relative -top-3" />

            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg">
                2
              </div>
              <span className="text-green-600 mt-2">Password</span>
            </div>

            <img
              src="/dotfullgreen.png"
              alt="Step Flow"
              className="relative -top-3"
            />

            <div className="flex flex-col items-center">
              <div className="font-bold text-3xl bg-[#4CAE4F] text-white w-[66px] h-[66px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-700/60">
                3
              </div>
              <span className="font-bold text-green-600 mt-2">Set Up</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-md mx-auto w-full relative">
          <img
            src="/lock.png"
            alt="Setup Icon"
            className="mt-2 inline w-[55px] h-[56px]"
          />

          <h2 className="text-3xl font-bold mb-2 mt-2">Finish your Set Up!</h2>
          <p className="text-gray-600 mb-4">
            Complete the set up to start exploring Binhi!
          </p>

          {/* First Name & Last Name */}
          <div className="flex gap-4 mb-2">
            {/* First Name */}
            <div className="w-1/2 text-left">
              <label className="block mb-1 font-bold text-gray-700">First Name</label>
              <input
                type="text"
                className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg placeholder:italic ${
                  firstNameError ? "border-red-500" : ""
                }`}
                placeholder="Ex. Juan"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (firstNameError) setFirstNameError("");
                }}
              />
              {firstNameError && (
                <p className="text-red-500 text-xs italic mt-1">{firstNameError}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-1/2 text-left">
              <label className="block mb-1 font-bold text-gray-700">Last Name</label>
              <input
                type="text"
                className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg placeholder:italic ${
                  lastNameError ? "border-red-500" : ""
                }`}
                placeholder="Ex. Dela Cruz"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (lastNameError) setLastNameError("");
                }}
              />
              {lastNameError && (
                <p className="text-red-500 text-xs italic mt-1">{lastNameError}</p>
              )}
            </div>
          </div>

          {/* Phone Number (Philippines) */}
       <div className="text-left mb-1 relative">
        <label className="block mb-1 font-bold text-gray-700">Phone Number</label>
        <input
          type="text"
          className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg placeholder:italic ${
            phoneError ? "border-red-500" : ""
          }`}
          placeholder="Ex. 09171234567"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        {phoneError && (
          <p className="text-red-500 text-xs italic mt-1">{phoneError}</p>
        )}
      </div>

      {/* Address Field with Dropdown Arrow */}
<div className="text-left mb-1 relative">
  <label className="block mb-1 font-bold text-gray-700">Address</label>
  <div className="relative">
    <input
      type="text"
      className={`input input-bordered rounded-full border-gray-800 w-full h-14 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-600 text-lg pr-10 ${
        addressError ? "border-red-500" : ""
      }`}
      placeholder="Barangay, Purok, Street"
      readOnly
      value={completeAddress}
      onClick={() => {
        setShowAddressModal(prevState => !prevState);
        if (addressError) setAddressError("");
      }}
    />
    <button
      className="absolute right-4 top-1/2 transform -translate-y-1/2"
      onClick={() => {
        setShowAddressModal(prevState => !prevState);
        if (addressError) setAddressError("");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
  {addressError && (
    <p className="text-red-500 text-xs italic mt-1">{addressError}</p>
  )}
</div>

{/* Address Modal with Green Border and Custom Scrollbar - MOVED UP */}
{showAddressModal && (
  <div className="mb-6 overflow-hidden rounded-3xl border-2 border-green-500 absolute bg-white shadow-xl z-10 left-1/2 transform -translate-x-1/2 w-[450px]">
    {/* Tabs with Green Background */}
    <div className="flex bg-gray-100">
      {["Region", "Province", "City", "Barangay"].map((tab) => (
        <button
          key={tab}
          className={`relative flex-1 py-2 px-2 text-sm font-medium ${
            selectedTab === tab ? "text-green-600" : "text-gray-700"
          }`}
          onClick={() => setSelectedTab(tab)}
        >
          {tab}
          {/* Green underline for active tab */}
          {selectedTab === tab && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500"></div>
          )}
        </button>
      ))}
    </div>

    {/* Tab Content with Custom Scrollbar */}
    <div
      className="max-h-48 overflow-y-auto bg-white custom-scrollbar"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#4CAE4F transparent",
      }}
    >
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4CAE4F;
          border-radius: 20px;
        }
      `}</style>

      {/* Region Tab Content */}
      {selectedTab === "Region" && (
        <div className="p-2">
          {regions.map((region) => (
            <button
              key={region}
              className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-600 transition-colors"
              onClick={() => handleRegionSelect(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}

      {/* Province Tab Content */}
      {selectedTab === "Province" && selectedRegion && (
        <div className="p-2">
          {provinces[selectedRegion]?.map((province) => (
            <button
              key={province}
              className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-600 transition-colors"
              onClick={() => handleProvinceSelect(province)}
            >
              {province}
            </button>
          ))}
        </div>
      )}

      {/* City Tab Content */}
      {selectedTab === "City" && selectedProvince && (
        <div className="p-2">
          {cities[selectedProvince]?.map((city) => (
            <button
              key={city}
              className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-600 transition-colors"
              onClick={() => handleCitySelect(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Barangay Tab Content */}
      {selectedTab === "Barangay" && selectedCity && (
        <div className="p-2">
          {barangays[selectedCity]?.map((barangay) => (
            <button
              key={barangay}
              className="w-full text-left px-4 py-2 hover:bg-green-50 hover:text-green-600 transition-colors"
              onClick={() => handleBarangaySelect(barangay)}
            >
              {barangay}
            </button>
          ))}
        </div>
      )}

      {/* Empty state messages */}
      {selectedTab === "Province" && !selectedRegion && (
        <div className="p-4 text-center text-gray-500">
          Please select a region first
        </div>
      )}

      {selectedTab === "City" && !selectedProvince && (
        <div className="p-4 text-center text-gray-500">
          Please select a province first
        </div>
      )}

      {selectedTab === "Barangay" && !selectedCity && (
        <div className="p-4 text-center text-gray-500">
          Please select a city first
        </div>
      )}
    </div>
  </div>
)}

{/* Checkbox for Default Address */}
<div className="flex items-start justify-start gap-2 mb-2 mt-4">
  <label className="relative flex items-center cursor-pointer mt-2">
    <input
      type="checkbox"
      defaultChecked
      className="peer appearance-none w-5 h-5 rounded border border-[#4CAE4F] bg-white checked:bg-[#4CAE4F] checked:border-[#4CAE4F] transition"
    />
    <svg
      className="absolute left-[2px] top-[2px] w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </label>
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-700">Set as default address</span>
    <div className="relative group inline-block">
      <img
        src="/circle-help.png"
        alt="Help Icon"
        className="w-4 h-4 cursor-pointer"
      />
      <div className="absolute hidden group-hover:flex items-center left-full top-1/2 -translate-y-1/2 ml-4 z-50">
        <div className="w-3 h-3 bg-white border-l border-b border-black transform rotate-45"></div>
        <div className="bg-white border border-black text-black text-xs px-2 py-1 rounded-2xl shadow-lg text-center whitespace-nowrap max-w-[180px] ml-1">
          The first address is your <br />default address.
        </div>
      </div>
    </div>
  </div>
</div>

{/* Finish Button */}
<button
  className="mt-4 w-full bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
  onClick={handleFinish}
>
  Finish
</button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-11 w-[620px] h-[460px] shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold mb-4">Account Created Successfully</h3>
              <img src="/Checkpass.png" alt="Success" className="w-18 h-18 mb-4" />
              <p className="text-base text-gray-600 mb-3">
                You have successfully created your account with <br /> the email{" "}
                <span className="font-medium">{email}</span>.
              </p>
              <br />
              <br />
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to Login Page in <br />{" "}
                <span className="font-bold">{countdown}</span> second{countdown !== 1 ? "s" : ""}.
              </p>
              <button
                className="w-full mt-1 bg-[#4CAE4F] text-white py-3 rounded-full hover:bg-green-700 transition mx-auto"
                onClick={() => navigate("/login")}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetUp;