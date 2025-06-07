import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDetails = ({ product, tags }) => {
  const navigate = useNavigate();

  return (
    <div className="mx-10 mt-10 border-2 border-[#4CAE4F] rounded-3xl px-6 py-6 flex flex-col md:flex-row justify-between">
      {/* LEFT SIDE: Image, Name, Active Now, Buttons */}
      <div className="flex items-start gap-8 ">
        <div className="relative">
          <img
            src="/111.png"
            alt={product.vendor_name}
            className="w-24 h-24 border-[#4CAE4F]"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold mt-2">{product.vendor_name}</h3>
          {/* <div className="text-sm text-green-600 font-medium">• Active Now</div> */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                navigate("/chatpage", {
                  state: { sellerName: product.vendor_name },
                })
              }
              className="text-base bg-[#4CAE4F] text-white hover:bg-green-600 font-medium px-4 py-2 rounded-full hover:bg-green-600 transition-transform duration-400 hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap"
            >
              <img src="/Chat-now.png" alt="chatnow" className="w-5 h-5" />
              Chat Now
            </button>
            <button className="text-base border border-[#4CAE4F] font-medium text-green-600 px-4 py-2 rounded-full hover:bg-green-100 transition-transform duration-400 hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap">
              <img src="/shop-green.png" alt="View Shop" className="w-5 h-5" />
              View Shop
            </button>
          </div>
        </div>
      </div>

      {/* MIDDLE: Seller Stats */}
      <div className="flex text-base text-gray-900 mt-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-base">
            <img src="/map-pin.png" className="w-8 h-8" alt="Location" />
            <span>
              {product.vendor_address &&
                `${product.vendor_address.street_address}, ${product.vendor_address.barangay}, ${product.vendor_address.city}`}
            </span>
          </div>
            <div className="flex items-center gap-1 mt-2">
            <img src="/group-seller.png" className="w-8 h-8" alt="Products Sold" />
            <span>9k Products Sold</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Tags */}
      <div className="flex flex-col mr-10">
        <div className="flex items-center gap-2 text-base font-medium mb-2">
          <img src="/Artichoke.png" alt="What I sell?" className="w-8 h-8" />
          What I sell?
        </div>

        <div className="flex flex-wrap gap-2 mb-1">
          {tags
            .filter((tag) => tag === "vegetables" || tag === "root crops")
            .map((tag, index) => (
              <span
                key={`row1-${index}`}
                className="px-5 py-1 text-sm font-medium rounded-full bg-[#8BC34A] text-white"
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags
            .filter((tag) => tag === "grains" || tag === "meat")
            .map((tag, index) => (
              <span
                key={`row2-${index}`}
                className={`px-5 py-1 text-sm font-medium rounded-full ${
                  tag === "grains"
                    ? "bg-[#D1A157] text-white"
                    : "bg-[#4CAE4F] text-white"
                }`}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
