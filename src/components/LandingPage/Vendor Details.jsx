import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDetails = ({ product, tags }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 border border-gray-300 rounded-3xl px-6 py-4 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6 w-full max-w-screen-xl">
      {/* LEFT SIDE: Image, Name, Active Now, Buttons */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src="/111.png"
            alt={product.vendor_name}
            className="w-18 h-18 border-green-600"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold">{product.vendor_name}</h3>
          <div className="text-sm text-green-600 font-medium">• Active Now</div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                navigate("/chatpage", {
                  state: { sellerName: product.vendor_name },
                })
              }
              className="text-sm bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-1 rounded-full h-[36px] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <img src="/Chat-now.png" alt="chatnow" className="w-5 h-5" />
              Chat Now
            </button>
            <button className="text-sm border border-green-700 font-medium text-green-600 px-4 py-1 rounded-full h-[36px] flex items-center justify-center gap-2 whitespace-nowrap">
              <img src="/shop-green.png" alt="View Shop" className="w-5 h-5" />
              View Shop
            </button>
          </div>
        </div>
      </div>

      {/* MIDDLE: Seller Stats */}
      <div className="flex gap-[150px] text-sm text-gray-700">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <img src="/map-pin.png" className="w-5 h-5" alt="Location" />
            <span>
              {product.vendor_address &&
                `${product.vendor_address.city}, ${product.vendor_address.barangay}`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img src="/group-seller.png" className="w-5 h-5" alt="Products Sold" />
            <span>9k Products Sold</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Tags */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <img src="/Artichoke.png" alt="What I sell?" className="w-5 h-5" />
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

        <div className="flex flex-wrap gap-2">
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
