import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import api from '../../api';
import { BASE_URL } from '../../constants';
import MainLayout from '../Layout/MainLayout';
import VendorDetails from './Vendor Details';

const ProductDetails = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const tags = ["vegetables", "root crops", "grains", "meat"];
  const [price, setPrice] = useState(null)
  const [unit, setUnit] = useState('')
  const [showVariationError, setShowVariationError] = useState(false);
  const showModalToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 700);
  };

useEffect(() => {
  api.get(`/products/detail/${productSlug}/`)
    .then(res => setProduct(res.data.product))
    .catch(err => console.error(err));
}, [productSlug]);

useEffect(() => {
  if (product && product.images && product.images.length > 0) {
    const main = product.images.find(img => img.is_main) || product.images[0];
    setMainImage(main);
    setPrice(product.min_price)
    setUnit(product.variations[0].unit_measurement)
    console.log("Main image set:", main);
  }
}, [product]);

const handleAddToCart = async () => {

    // Check if variation is required and selected
  if (product.variations && product.variations.length > 0 && !selectedVariation) {
    setShowVariationError(true);
    setTimeout(() => setShowVariationError(false), 3000);
    return;
  }

  try {
    const response = await api.post("/cart/add_to_cart/", {
      variation_id: selectedVariation.id,
      quantity: quantity.toString(), // make sure it's a string if backend expects it
    });
    console.log("Item added:", response.data);
    showModalToast(); // show success toast/modal
  } catch (error) {
    console.error("Failed to add to cart:", error.response?.data || error.message);
  }
};

const incrementQuantity = () => {
  setQuantity(prev => {
    console.log("prev quantity:", prev);
    return prev + 1;
  });
};

const decrementQuantity = () => {
  setQuantity(prev => {
    console.log("prev quantity:", prev);
    return Math.max(1, prev - 1);
  });
};

  const handleGoBack = () => navigate(-1);
  const handleImageChange = (image) => setMainImage(image);


if (!product || !mainImage) {
  return (
    <div className="flex justify-center mt-20">
    <span className="loading loading-spinner text-success w-[350px] h-[350px]"></span>
    </div>
  );
}

const combinedImages = [
  ...(product.images || []),
  ...(product.variations?.flatMap(v => v.images) || []),
];

console.log(product)

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
      {showToast && (
        <div className="fixed pt-10 inset-0 flex items-center justify-center z-50">
          <div className="border-2 border-[#858585] bg-white rounded-3xl p-10 w-[400px] shadow-xl text-center">
            <img src="/Checkpass.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Items has been added to your shopping cart</h3>
          </div>
        </div>
      )}
      <div className="px-6 py-2">
        <div className="pl-10 flex items-center">
          <button onClick={handleGoBack} className="flex items-center text-gray-600">
            <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
          </button>
        </div>
      </div>

      <div className="pl-10 pr-6 py-8">
        <div className="pl-10 grid grid-cols-1 md:grid-cols-[minmax(0,400px)_1fr] gap-x-10">
          {/* Left column */}
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              {mainImage ? (
                <img
                  src={mainImage.image}
                  alt={product.name}
                  className="h-[400px] object-contain"
                />
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
                  No image available
                </div>
              )}
            </div>

           <div className="w-full max-w-[400px]">
          <div className="flex gap-4 mb-2 justify-center items-center">
            {product && (
              [
                ...(product.images || []),
                ...(product.variations?.flatMap(v => v.images) || [])
              ].map((image, index) => (
                <div
                  key={image.id || index}
                  onClick={() => handleImageChange(image)}
                  className={`w-16 h-16 border-2 rounded-md cursor-pointer overflow-hidden ${
                    mainImage === image ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image.image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )}
          </div>
          <div className="text-center text-xs text-gray-500 mb-6">
            HOVER TO THE IMAGE TO ZOOM IN
          </div>
        </div>

          </div>

          {/* Right column: Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="rating rating-sm">
                <input type="radio" readOnly className="mask mask-star-2 bg-yellow-400" checked />
              </div>
              <span className="ml-2">4.5</span>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-gray-600">1k Ratings</span>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-gray-600">9k Sold</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-green-600">₱ {price}</span>
                <span className="ml-2 px-2 py-1 border border-green-600 text-sm text-green-600 rounded">{unit}</span>
                <img src="/voucher.png" alt="voucher" className="pl-2 w-8 h-6" />
                <span className="ml-1 text-lg text-gray-500 line-through">{product.originalPrice}</span>
              </div>
            </div>

            <div className="mt-6 text-gray-700">{product.description}</div>
            <div className="mt-6"><span className="font-semibold">Category:</span> <span className="font-medium pl-5">{product.category_name}</span></div>

            <div className="mt-6">
          <div className="flex mt-2 gap-4 flex-wrap">
            <span className="font-semibold pr-3">Variation:</span>
            {product.variations && product.variations.length > 0 && product.variations.map((variation, index) => {
  // Find main image or first image
  const mainImageObj = variation.images && variation.images.length > 0
    ? variation.images.find(img => img.is_main) || variation.images[0]
    : null;

  // Build the image source
  const imageSrc = mainImageObj?.image?.startsWith("https")
    ? mainImageObj.image
    : `${BASE_URL}/media/${mainImageObj?.image}`;

  return (
    <div
      key={variation.id || index}
     onClick={() => {
  setSelectedVariation(variation);
  const newMainImage =
    variation.images?.find(img => img.is_main) || variation.images?.[0] || null;
  handleImageChange(newMainImage);
}}
      className={`border-2 bg-white rounded-xl px-4 py-1 flex items-center cursor-pointer transition ${
        selectedVariation && selectedVariation.name === variation.name ? 'border-green-500' : 'border-gray-400'
      }`}
    >
      {mainImageObj ? (
        <img
          src={imageSrc}
          alt={variation.name}
          className="w-11 h-11 mr-2 object-contain"
          onClick={() => handleImageChange(selectedVariation.images)}
        />
      ) : (
        <div className="w-11 h-11 mr-2 bg-gray-100 flex items-center justify-center rounded">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )}
      <span className="whitespace-nowrap">{variation.name}</span>
    </div>
  );
})}
          </div>
        </div>

        {showVariationError && (
            <div className="mt-2 text-red-500 text-base font-medium">
              Please select a variation before adding to cart.
            </div>
          )}
    

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center">
              <span className="font-semibold w-24">Quantity:</span>
                <div className="flex items-center overflow-hidden pl-2">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    className="disabled:opacity-50"
                  >
                    <img src="/minus button.png" alt="Minus" className="w-8 h-8" />
                  </button>
                  <div className="px-4 py-1 text-xl font-bold select-none">{quantity}</div>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    className="disabled:opacity-50"
                  >
                  <img src="/add button.png" alt="Add" className="w-8 h-8" />
                </button>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="mt-10 flex gap-4">
          <button
            onClick={handleAddToCart}
            className="border border-green-700 font-medium text-green-600 px-6 py-2 rounded-full w-[320px] h-[53px] flex items-center justify-center gap-2"
          >
            <img src="/shopping-cart.png" alt="shopping cart" className="w-5 h-5" />
            Add to Cart
          </button>

          <button
            onClick={() => {
              const checkoutData = {
                items: [
                  {
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price.replace("\u20b1", "")),
                    quantity: quantity,
                    image: mainImage,
                    variation: selectedVariation.name,
                    seller: product.seller.name,
                    orderId: `PD-${Date.now()}`,
                  },
                ],
                subtotal: quantity * parseFloat(product.price.replace("\u20b1", "")),
                discount: 0,
                tax: 0,
                total: quantity * parseFloat(product.price.replace("\u20b1", "")),
                paymentMethod: "Cash on Delivery",
                source: "product",
              };
              navigate('/checkoutpage', { state: { checkoutData } });
            }}
            className="bg-green-500 text-white hover:bg-green-600 font-bold px-6 py-2 rounded-full w-[982px] h-[53px] flex items-center justify-center gap-2"
          >
            Buy Now
            <img src="/arrow-right.png" alt="arrow right" className="w-7 h-7" />
          </button>
            </div>

        {/* Seller Info */}

      <VendorDetails product={product} tags={tags} />     

{/* Recommendations */}
<div className="mt-10 w-full">
  <div className="flex items-center gap-2 mb-4">
    <img src="/shop-black.png" className="w-8 h-8" alt="Shop Icon" />
    <h3 className="text-xl font-bold">From the same shop</h3>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[
      { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
      { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
      { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
      { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
      { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    ].map((product, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 text-left transition hover:scale-105 hover:outline hover:outline-green-500 hover:outline-2 hover:shadow-[0_0_10px_2px_rgba(76,174,79,0.5)] flex flex-col justify-between h-full"
      >
        <span className="w-[100px] bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
          VEGETABLE
        </span>
        <img src={product.image} alt={product.name} className="w-full h-40 object-contain rounded-xl" />
        <p className="text-left font-semibold text-[20px]">{product.name}</p>
        <p className="text-[#4CAE4F] text-[20px] font-bold">
          {product.price}{' '}
          <span className="text-[15px] font-normal text-[#4CAE4F] border-[1px] border-[#4CAE4F] p-0.5 rounded-sm mb-2">
            per pc.
          </span>
        </p>
        <div className="text-[20px] text-gray-600 mt-4 flex items-center gap-1">
          <img src="/Star.png" alt="star" className="w-4 h-4" />
          5.0 • {product.sold} Sold
        </div>
        <div className="flex items-center justify-between gap-4 mt-2">
      <img src="/shopping-cart.png" alt="cart" className="w-6 h-6 transition-transform duration-100 hover:scale-125" />
<button
  onClick={() => {
    // Calculate weight based on unit measurement and quantity
    const calculateItemWeight = () => {
      const currentVariation = selectedVariation || (product.variations && product.variations[0]);
      const unitMeasurement = currentVariation?.unit_measurement || unit;
      
      // Weight calculation logic based on unit measurement
      let baseWeight = 1; // default 1kg
      
      if (unitMeasurement) {
        const lowerUnit = unitMeasurement.toLowerCase();
        
        if (lowerUnit.includes('kg')) {
          // Extract number from unit like "5kg", "2.5kg"
          const match = lowerUnit.match(/(\d+\.?\d*)/);
          baseWeight = match ? parseFloat(match[1]) : 1;
        } else if (lowerUnit.includes('g') && !lowerUnit.includes('kg')) {
          // Convert grams to kg, e.g., "500g" = 0.5kg
          const match = lowerUnit.match(/(\d+\.?\d*)/);
          baseWeight = match ? parseFloat(match[1]) / 1000 : 0.1;
        } else if (lowerUnit.includes('lb') || lowerUnit.includes('pound')) {
          // Convert pounds to kg (1 lb = 0.453592 kg)
          const match = lowerUnit.match(/(\d+\.?\d*)/);
          baseWeight = match ? parseFloat(match[1]) * 0.453592 : 1;
        } else if (lowerUnit.includes('pc') || lowerUnit.includes('piece')) {
          // For pieces, estimate weight based on product category
          if (product.category_name?.toLowerCase().includes('vegetable')) {
            baseWeight = 0.2; // 200g per piece for vegetables
          } else if (product.category_name?.toLowerCase().includes('fruit')) {
            baseWeight = 0.3; // 300g per piece for fruits
          } else {
            baseWeight = 0.5; // 500g default per piece
          }
        } else if (lowerUnit.includes('sack') || lowerUnit.includes('bag')) {
          baseWeight = 25; // 25kg per sack/bag
        } else {
          // Default weight for unknown units
          baseWeight = 1;
        }
      }
      
      return baseWeight;
    };

    const itemWeight = calculateItemWeight();
    const currentVariation = selectedVariation || (product.variations && product.variations[0]);
    const currentPrice = price || product.min_price;
    
    const checkoutData = {
      items: [
        {
          id: product.id,
          name: product.name,
          price: parseFloat(currentPrice.toString().replace(/[₱,]/g, "")),
          quantity: quantity,
          image: (mainImage?.image || ''),
          variation: currentVariation?.name || 'Default',
          seller: product.seller?.name || 'Unknown Seller',
          orderId: `PD-${Date.now()}`,
          weight: itemWeight, // Add weight property
          unit: currentVariation?.unit_measurement || unit || 'pc'
        },
      ],
      subtotal: quantity * parseFloat(currentPrice.toString().replace(/[₱,]/g, "")),
      discount: 0,
      tax: 0,
      total: quantity * parseFloat(currentPrice.toString().replace(/[₱,]/g, "")),
      paymentMethod: "Cash on Delivery",
      source: "product",
    };
    
    console.log('Checkout data with weight:', checkoutData); // For debugging
    navigate('/checkoutpage', { state: { checkoutData } });
  }}
  className="bg-green-500 text-white hover:bg-green-600 font-bold px-6 py-2 rounded-full w-[982px] h-[53px] flex items-center justify-between gap-2"
>
  Buy Now
  <img src="/arrow-right.png" alt="arrow right" className="w-7 h-7" />
</button>
        </div>
      </div>
    ))}
  </div>
  </div>


<div className="flex justify-center mt-10">
          <button className="text-lg font-bold bg-white border-2 hover:border-[#4CAE4F] border-gray-600 text-[#4CAE4F] [#4CAE4F] w-[500px] h-[50px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110">
            See More
          </button>
        </div> 
        </div>
        </div>
      </div> 
      </div>
  );
};

export default ProductDetails;