import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  // This would typically come from an API call using the productId
  // For demonstration, we're using static data
  const product = {
    id: productId,
    name: "Automatic-Cook Rice from the Field of Antartica",
    price: "₱136",
    originalPrice: "₱963",
    rating: 5.0,
    sold: 326,
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convalis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    category: "Grains",
    variations: [
      { name: "Jasmine", image: "/jasmine-rice.png" },
      { name: "Sinandomeng", image: "/sinandomeng-rice.png" }
    ],
    stock: 26,
    images: [
      "/rice.png",
      "/rice-close.png",
      "/rice-bag.png"
    ],
    seller: {
      name: "Jonathan De Vera",
      location: "Macamot, Binangonan",
      followers: 245,
      products: "9k",
      rating: 5.0,
      responseRate: "95%",
      tags: ["vegetables", "root crops", "grains", "meat"],
      isActive: true
    }
  };

  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
      {/* Breadcrumb Navigation */}
      <div className="px-6 py-2 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center">
          <button onClick={handleGoBack} className="flex items-center text-gray-600">
            <span className="mr-2">←</span> Back
          </button>
          <div className="flex items-center ml-4">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Grains</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Automatic-Cook Rice</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium">Automatic-Cook Rice from the Field of Antartica</span>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <img src={mainImage} alt={product.name} className="w-full h-96 object-contain" />
            </div>
            <div className="flex gap-4 justify-center">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 border-2 rounded-md cursor-pointer overflow-hidden ${mainImage === image ? 'border-green-500' : 'border-gray-200'}`}
                  onClick={() => handleImageChange(image)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-center text-xs text-gray-500 mt-2">
              HOVER TO THE IMAGE TO ZOOM IN
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{product.rating}</span>
              </div>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-gray-600">{product.sold} Sold</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-green-600">{product.price}</span>
                <span className="ml-2 px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded">per sack</span>
                <span className="ml-4 text-lg text-gray-400 line-through">{product.originalPrice}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="w-24 text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
            </div>

            <div className="mt-6">
              <div>
                <span className="text-gray-600">Variation:</span>
                <div className="flex mt-2 gap-4">
                  {product.variations.map((variation, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedVariation(variation)}
                      className={`border-2 rounded-lg px-4 py-2 flex items-center cursor-pointer ${
                        selectedVariation.name === variation.name ? 'border-green-500' : 'border-gray-300'
                      }`}
                    >
                      <img src={variation.image} alt={variation.name} className="w-8 h-8 mr-2" />
                      <span>{variation.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Quantity:</span>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-l"
                  >
                    -
                  </button>
                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-r"
                  >
                    +
                  </button>
                </div>
                <span className="ml-4 text-gray-500">{product.stock} stocks available</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button className="flex-1 border-2 border-green-500 text-green-500 font-medium py-3 px-6 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 bg-green-500 text-white font-medium py-3 px-6 rounded-full flex items-center justify-center">
                Buy Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Seller Information */}
            <div className="mt-10 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="relative">
                  <img src="/333.png" alt={product.seller.name} className="w-16 h-16 rounded-full" />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                    <div className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      • Active Now
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {product.seller.location}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 text-center border-t border-gray-200 pt-4">
                <div>
                  <div className="text-sm text-gray-500">Response Rate</div>
                  <div className="font-semibold">{product.seller.responseRate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Followers</div>
                  <div className="font-semibold">{product.seller.followers}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Products Sold</div>
                  <div className="font-semibold">{product.seller.products}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {product.seller.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-green-500 text-white font-medium py-2 px-4 rounded-full flex items-center justify-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat Now
                </button>
                <button className="flex-1 border border-green-500 text-green-500 font-medium py-2 px-4 rounded-full flex items-center justify-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  View Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;