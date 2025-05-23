import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: productId,
    name: "Automatic-Cook Rice from the Field of Antartica",
    price: "₱136",
    originalPrice: "₱963",
    numberrate: 26,
    rating: 5.0,
    sold: 326,
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convalis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
    category: "Grains",
    variations: [
      { name: "Jasmine", image: "/jasmine rice.png" },
      { name: "Sinandomeng", image: "/sinandomeng rice.png" },
    ],
    stock: 26,
    images: ["/rice-grain.png", "/rice-grain2.png", "/rice-grain3.png"],
    seller: {
      name: "Jonathan De Vera",
      location: "Macamot, Binangonan",
      followers: 245,
      products: "9k",
      numberrate: 26,
      rating: 5.0,
      responseRate: "95%",
      tags: ["vegetables", "root crops", "grains", "meat"],
      isActive: true,
    },
  };

  const [selectedVariation, setSelectedVariation] = useState(product.variations[0]);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleGoBack = () => navigate(-1);
  const handleImageChange = (image) => setMainImage(image);

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy 2 sacks', completed: true },
    { id: 2, text: 'Follow Jonathan’s Shop', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
     <div className="px-6 py-2">
     <div className="pl-10 flex items-center">
      <button onClick={handleGoBack} className="flex items-center text-gray-600">
        <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" /> </button>

        <div className="flex items-center ml-16 text-md">
        <ul className="flex items-center gap-2 text-md">
            <li><a className="underline text-gold">Home</a></li>
            <li className="text-xl text-gray-400">›</li>
            <li><a className="underline text-gold">Grains</a></li>
            <li className="text-xl text-gray-400">›</li>
            <li><a className="underline text-gold">Automatic-Cook Rice</a></li>
            <li className="text-xl text-gray-400">›</li>
            <li className="text-gray-800 font-medium">{product.name}</li>
            </ul>
            </div>
        </div>
        </div>

     {/* Product Image */}
       <div className="pl-10 pr-6 py-8">
    <div className="pl-10 grid grid-cols-1 md:grid-cols-[minmax(0,400px)_1fr] gap-x-10">
      <div>
      <div className="rounded-lg overflow-hidden mb-4">
      <img src={mainImage} alt={product.name} className="h-[400px] object-contain" />
      </div>

        <div className="w-full max-w-[400px]"> 
         <div className="flex gap-4 mb-2 justify-center items-center">
            {product.images.map((image, index) => (
        <div
            key={index}
            onClick={() => handleImageChange(image)}
            className={`w-16 h-16 border-2 rounded-md cursor-pointer overflow-hidden ${
            mainImage === image ? 'border-green-500' : 'border-gray-200'
            }`}
        >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
        </div>
        ))}
    </div>

    <div className="text-center text-xs text-gray-500 mb-6">HOVER TO THE IMAGE TO ZOOM IN</div>
    </div>


        {/* Bundle offers section */}
        <div className="bg-[#F1F1F1] rounded-3xl p-4 w-full md:w-[400px]">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <img src="/Discount.png" alt="Discount" className="w-10 h-10" />
            <h2 className="font-semibold text-lg">Bundle Offers</h2>
            </div>
            <img src="/claim.png" alt="Claim" className="w-18 h-5" />
        </div>
        <p className="pl-[49px] text-md text-gray-600 mb-2">Complete these tasks to get a voucher!</p>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              <img
                src={task.completed ? '/check.png' : '/uncheck.png'}
                alt={task.completed ? 'Checked' : 'Unchecked'}
                className="w-5 h-5"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
  </div>
</div>

        {/* Product Info Section */}

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="rating rating-sm">
                <input type="radio" readOnly className="mask mask-star-2 bg-yellow-400" checked />
              </div>
              
              <span className="ml-2">{product.rating}</span>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-gray-600">{product.numberrate} Ratings</span>
              <span className="mx-3 text-gray-300">|</span>
              <span className="text-gray-600">{product.sold} Sold</span>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <span className="text-4xl font-bold text-green-600">{product.price}</span>
                <span className="ml-2 px-2 py-1 border border-green-600 text-sm text-green-600 rounded">per sack</span>
                <img src="/voucher.png" alt="voucher" className="pl-2 w-8 h-6" />
                <span className="ml-1 text-lg text-gray-500 line-through">{product.originalPrice}</span>
              </div>
            </div>

            <div className="mt-6 text-gray-700">{product.description}</div>
            <div className="mt-6"><span className="font-semibold">Category:</span> <span className="font-medium">{product.category}</span></div>

            <div className="mt-6">
        <div className="flex mt-2 gap-4 flex-wrap">
            <span className="font-semibold">Variation:</span>
       
            {product.variations.map((variation, index) => (
            <div
                key={index}
                onClick={() => setSelectedVariation(variation)}
                className={`border-2 bg-white rounded-lg px-4 py-1 flex items-center cursor-pointer transition ${
                selectedVariation.name === variation.name ? 'border-green-500' : 'border-gray-400'
                }`}
            >
                <img src={variation.image} alt={variation.name} className="w-11 h-11 mr-2 object-contain" />
                <span className="whitespace-nowrap">{variation.name}</span>
            </div>
            ))}
        </div>
        </div>


        <div className="mt-6 flex items-center">
        <span className="text-gray-600 w-24">Quantity:</span>
        
        <div className="flex items-center overflow-hidden">
            {/* Minus Button */}
            <button
            onClick={decrementQuantity}
            >
            <img src="/minus button.png" alt="Minus" className="w-7 h-7" />
            </button>

            {/* Quantity Display */}
            <div className="px-4 py-1 text-sm font-medium select-none">
            {quantity}
            </div>

            {/* Plus Button */}
            <button
            onClick={incrementQuantity}

            >
            <img src="/add button.png" alt="Add" className="w-7 h-7" />
            </button>
        </div>

        <span className="ml-4 text-gray-500">{product.stock} stocks available</span>
        </div>


            <div className="mt-10 flex gap-4">
              <button className="btn btn-outline btn-success flex-1">Add to Cart</button>
              <Link to="/CheckoutPage">
              <button className="btn btn-success flex-1">Buy Now</button></Link>
            </div>

            <div className="mt-10 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="relative">
                  <img src="/333.png" alt={product.seller.name} className="w-16 h-16 rounded-full" />
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">{product.seller.name}</h3>
                    <div className="ml-2 badge badge-success">• Active Now</div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">📍 {product.seller.location}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-center border-t border-gray-200 pt-4">
                <div><div className="text-sm text-gray-500">Response Rate</div><div className="font-semibold">{product.seller.responseRate}</div></div>
                <div><div className="text-sm text-gray-500">Followers</div><div className="font-semibold">{product.seller.followers}</div></div>
                <div><div className="text-sm text-gray-500">Products Sold</div><div className="font-semibold">{product.seller.products}</div></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {product.seller.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-success">{tag}</span>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn btn-success btn-sm flex-1">Chat Now</button>
                <button className="btn btn-outline btn-success btn-sm flex-1">View Shop</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">⭐ Product Reviews</h3>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>j*****x</span><span>2025-04-12</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm text-gray-500">Variation: Sinandomeng</span>
              </div>
              <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur...</p>
              <div className="flex gap-2 mt-2">
                <img src="/sinandomeng-rice.png" alt="review img" className="w-16 h-16 rounded" />
                <img src="/sinandomeng-rice.png" alt="review img" className="w-16 h-16 rounded" />
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map(num => (
              <button key={num} className="btn btn-sm btn-outline btn-success">{num}</button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">🛒 From the same shop</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <img src="/corn.png" className="h-32 w-full object-cover rounded" />
                <p className="mt-2 font-medium text-sm">Premium Farm Fresh Sweet Corn</p>
                <p className="text-green-600 font-semibold">₱96</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-8 mb-4">🧠 You may also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <img src="/avocado.png" className="h-32 w-full object-cover rounded" />
                <p className="mt-2 font-medium text-sm">Premium Avocado</p>
                <p className="text-green-600 font-semibold">₱72</p>
              </div>
            ))}
          </div>
          <div className="group fixed bottom-10 right-10 z-50">
            <button
                onClick={() => navigate('/ChatPage')}
                className="bg-[#4CAE4F] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative"
            >
                <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
            </button>
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-lg font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                Chats
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
