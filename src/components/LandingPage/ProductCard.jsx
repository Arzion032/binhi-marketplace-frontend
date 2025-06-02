// ProductCard.jsx
import React from "react";
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  onCardClick,
  onAddToCart,
  onBuyNow,
}) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md p-4 text-left cursor-pointer transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
    >
      {/* Category Badge */}
      <span className="w-[120px] text-center bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full mb-2 uppercase">
        {product.category_name}
      </span>
      {/* Product Image */}
      <img
        src={product.images?.image ? BASE_URL + product.images.image : "/placeholder.png"}
        alt={product.name}
        className="w-full h-40 object-cover rounded-xl"
      />
      {/* Product Name */}
      <p className="text-left font-semibold text-lg mt-2">
        {product.name}
      </p>
      {/* Price */}
        <p className="text-[#4CAE4F] text-xl font-bold mt-2">
          ₱{product.min_price}
          <span className="text-[15px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2 ml-1">
            {product.unit_measurement}
          </span>
        </p>
      {/* Rating & Sold */}
      <div className="text-[20px] text-gray-600 mt-4 flex items-center gap-1">
        <img src="/Star.png" alt="star" className="w-4 h-4" />
        5.0 • {product.sold} Sold
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <img
          src="/shopping-cart.png"
          alt="cart"
          className="w-6 h-6 transition-transform duration-100 hover:scale-125"
          onClick={e => {
            e.stopPropagation();
            onAddToCart && onAddToCart(e, product);
          }}
        />
        <button
          onClick={e => {
            e.stopPropagation();
            onBuyNow && onBuyNow(e, product);
          }}
          className="text-xl bg-[#4CAE4F] text-white w-80 max-w-[140px] px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
