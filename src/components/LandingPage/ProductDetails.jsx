import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


//Done product details


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
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy 2 sacks', completed: true },
    { id: 2, text: 'Follow Jonathan’s Shop', completed: false },
  ]);
  const [selectedFilter, setSelectedFilter] = useState("All");

 const [reviews, setReviews] = useState([
  {
    id: 1,
    user: "j******x",
    profileImage: "/user.png",
    date: "2025-04-12",
    rating: 5,
    variation: "Jasmine",
    comment: "Very fragrant rice, great quality!",
    images: ["/rice-review.png", "/rice-review.png", "/rice-review.png", "/rice-review.png"],
    liked: false,
    likeCount: 0,
  },
  {
    id: 2,
    user: "m******d",
    profileImage: "/user.png",
    date: "2025-04-10",
    rating: 4,
    variation: "Sinandomeng",
    comment: "Good rice but the packaging was a bit loose.",
    images: ["/rice2-review.png", "/rice2-review.png"],
    liked: false,
    likeCount: 0,
  },
  {
    id: 3,
    user: "e******a",
    profileImage: "/user.png",
    date: "2025-04-08",
    rating: 5,
    variation: "Jasmine",
    comment: "Best rice I’ve had in a while. Highly recommended!",
    images: ["/rice-review.png", "/rice-review.png", "/rice-review.png", "/rice-review.png"],
    liked: false,
    likeCount: 0,
  },
  {
    id: 4,
    user: "r******e",
    profileImage: "/user.png",
    date: "2025-04-05",
    rating: 3,
    variation: "Sinandomeng",
    comment: "Not bad, but I prefer other varieties.",
    images: ["/rice2-review.png", "/rice2-review.png"],
    liked: false,
    likeCount: 0,
  },
]);


  const filteredReviews = selectedFilter === "All"
    ? reviews
    : reviews.filter(review => review.rating === parseInt(selectedFilter));

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleGoBack = () => navigate(-1);
  const handleImageChange = (image) => setMainImage(image);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleLike = (id) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id
          ? {
              ...review,
              liked: !review.liked,
              likeCount: review.liked ? 0 : 1,
            }
          : review
      )
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F9F5]">
      <div className="px-6 py-2">
        <div className="pl-10 flex items-center">
          <button onClick={handleGoBack} className="flex items-center text-gray-600">
            <img src="/arrow-left-s-line.png" alt="Back" className="w-25 h-10" />
          </button>
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

      <div className="pl-10 pr-6 py-8">
        <div className="pl-10 grid grid-cols-1 md:grid-cols-[minmax(0,400px)_1fr] gap-x-10">
          {/* Left column */}
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

              {/* Bundle Offers */}
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
          </div>

          {/* Right column: Product Info */}
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
            <div className="mt-6"><span className="font-semibold">Category:</span> <span className="font-medium pl-5">{product.category}</span></div>

            {/* Variations */}
            <div className="mt-6">
              <div className="flex mt-2 gap-4 flex-wrap">
                <span className="font-semibold pr-3">Variation:</span>
                {product.variations.map((variation, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVariation(variation)}
                    className={`border-2 bg-white rounded-xl px-4 py-1 flex items-center cursor-pointer transition ${
                      selectedVariation.name === variation.name ? 'border-green-500' : 'border-gray-400'
                    }`}
                  >
                    <img src={variation.image} alt={variation.name} className="w-11 h-11 mr-2 object-contain" />
                    <span className="whitespace-nowrap">{variation.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center">
              <span className="font-semibold w-24">Quantity:</span>
              <div className="flex items-center overflow-hidden pl-2">
                <button onClick={decrementQuantity}>
                  <img src="/minus button.png" alt="Minus" className="w-8 h-8" />
                </button>
                <div className="px-4 py-1 text-xl font-bold select-none">{quantity}</div>
                <button onClick={incrementQuantity}>
                  <img src="/add button.png" alt="Add" className="w-8 h-8" />
                </button>
              </div>
              <span className="ml-4 text-gray-500">{product.stock} stocks available</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex gap-4">
              <button className="border border-green-700 font-medium text-green-600 px-6 py-2 rounded-full w-[320px] h-[53px] flex items-center justify-center gap-2">
                <img src="/shopping-cart.png" alt="shopping cart" className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-green-500 text-white hover:bg-green-600 font-bold px-6 py-2 rounded-full w-[982px] h-[53px] flex items-center justify-center gap-2">
                Buy Now
                <img src="/arrow-right.png" alt="arrow right" className="w-7 h-7" />
              </button>
            </div>



        {/* Seller Info */}
        <div className="mt-10 border border-gray-300 rounded-3xl px-6 py-4 shadow-sm flex flex-col md:flex-row justify-between items-start gap-6 w-[1320px]">
          {/* LEFT SIDE: Image, Name, Active Now, Buttons */}
          <div className="flex items-start gap-4">
            {/* Seller Image */}
            <div className="relative">
              <img
                src="/seller.png"
                alt={product.seller.name}
                className="w-18 h-18 border-green-600"
              />
            </div>

            {/* Seller Info & Buttons */}
            <div>
              <h3 className="text-lg font-bold">{product.seller.name}</h3>
              <div className="text-sm text-green-600 font-medium">• Active Now</div>
              <div className="flex gap-2 mt-3">
                <button className="text-sm bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-1 rounded-full h-[36px] flex items-center justify-center gap-2 whitespace-nowrap">
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

          <div className="flex gap-[150px] text-sm text-gray-700">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src="/map-pin.png" className="w-5 h-5" alt="Location" />
                <span>{product.seller.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/Account-seller.png" className="w-5 h-5" alt="Followers" />
                <span>{product.seller.followers} Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/star-gray.png" className="w-5 h-5" alt="Rating" />
                <span>{product.seller.rating} Rate</span>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <img src="/Clock.png" className="w-5 h-5" alt="Response Rate" />
                <span>{product.seller.responseRate} Response Rate</span>
              </div>
              <div className="flex items-center gap-1">
                <img src="/group-seller.png" className="w-5 h-5" alt="Products Sold" />
                <span>{product.seller.products} Products Sold</span>
              </div>
            </div>
          </div>

              {/* Right - Tags */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <img src="/Artichoke.png" alt="What I sell?" className="w-5 h-5" />
              What I sell?
            </div>

            {/* First Row: Vegetables + Root Crops */}
            <div className="flex flex-wrap gap-2 mb-1">
              {product.seller.tags
                .filter(tag => tag === 'vegetables' || tag === 'root crops')
                .map((tag, index) => (
                  <span
                    key={`row1-${index}`}
                    className="px-3 py-1 text-sm font-medium rounded-full bg-[#8BC34A] text-white"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* Second Row: Grains + Meat */}
            <div className="flex flex-wrap gap-2">
              {product.seller.tags
                .filter(tag => tag === 'grains' || tag === 'meat')
                .map((tag, index) => (
                  <span
                    key={`row2-${index}`}
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      tag === 'grains' ? 'bg-[#D1A157] text-white'
                      : 'bg-[#4CAE4F] text-white'
                    }`}
                  >
                    {tag}
                  </span>
                  ))}
                </div>
              </div>
            </div>


 {/* Product Reviews */}
      <div className="mt-16 bg-white rounded-3xl p-6 w-[1320px] border border-gray-500">
        <h3 className="text-xl font-bold mb-4">Product Reviews</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <span className="text-3xl font-bold text-gray-800">4.9</span>
            <span className="text-lg text-gray-600 ml-2">out of 5</span>
            <div className="text-yellow-500 text-4xl">★★★★★</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "5", "4", "3", "2", "1"].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFilter(label)}
                className={`px-4 py-1 rounded-lg border text-sm w-[120px] h-[40px] ${
                  selectedFilter === label
                    ? "border-green-500 text-green-600 font-semibold"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {label === "All" ? "All" : `${label} stars`} ({
                  reviews.filter(r => label === "All" || r.rating === parseInt(label)).length
                })
              </button>
            ))}
          </div>
        </div>

        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-3 mb-5">
           <div className="flex justify-between text-sm text-gray-600">
  <div className="flex items-start gap-2">
    <img src={review.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
    <div>
      <span>{review.user}</span>
      <div className="text-yellow-500 text-sm mt-0.5">{"★".repeat(review.rating)}</div>
    </div>
  </div>
  <span>{review.date}</span>
</div>

        <div className="text-sm text-gray-500 mt-1 mb-2">
          Variation: <span className="text-black">{review.variation}</span>
        </div>


            <p className="mt-2 text-gray-700 text-sm leading-relaxed">{review.comment}</p>

            {review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((img, i) => (
                  <img key={i} src={img} alt="review img" className="w-16 h-16 rounded object-cover" />
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-3 text-md text-gray-500">
              <div
                onClick={() => toggleLike(review.id)}
                className={`flex items-center gap-1 cursor-pointer ${
                  review.liked ? 'text-red-500' : 'hover:text-gray-700'
                }`}
              >
                <img
                  src={review.liked ? "/heart-filled.png" : "/heart-outline.png"}
                  className="w-5 h-5"
                  alt="heart"
                />
                {review.liked ? review.likeCount : 'Helpful?'}
              </div>
          <div className="flex items-center gap-1 cursor-pointer group hover:text-orange-500">
            <div className="relative w-5 h-5">
              <img src="/shield-alert.png" className="w-5 h-5 absolute top-0 left-0 group-hover:opacity-0" />
              <img src="/shield-alert-orange.png" className="w-5 h-5 absolute top-0 left-0 opacity-0 group-hover:opacity-100" />
            </div>
            Report
          </div>


            </div>
          </div>
        ))}

<div className="flex justify-center gap-2 mt-6">
  {/* Prev Button */}
<button className="w-[45px] h-[50px] bg-[#D9D9D9] border border-[#858585] rounded-xl text-gray-500 hover:bg-[#c2c2c2]">
  &lt;
</button>

{/* Page Numbers */}
{[1, 2, 3, 4, 5].map((num) => (
  <button
    key={num}
    className={`w-[45px] h-[50px] rounded-xl border text-sm font-semibold transition-colors duration-150 ${
      num === 1
        ? 'bg-[#4CAE4F] text-white border-[#4CAE4F] hover:bg-[#3c9d3f]'
        : 'bg-[#D9D9D9] text-[#858585] border-[#858585] hover:bg-[#bfbfbf]'
    }`}
  >
    {num}
  </button>
))}

{/* Ellipsis */}
<button className="w-[45px] h-[50px] rounded-xl border bg-[#D9D9D9] text-[#858585] border-[#858585] cursor-default" disabled>
  ...
</button>

{/* Next Button */}
<button className="w-[45px] h-[50px] rounded-xl bg-[#D9D9D9] border border-[#858585] text-[#858585] hover:bg-[#c2c2c2]">
  &gt;
</button>

</div>
      </div>

{/* Recommendations */}
<div className="mt-10 w-[1320px]">
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
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },

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
            onClick={() => navigate(`/product/${index}`)}
            className="text-[20px] bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
          >
            Buy Now
          </button>
        </div>
      </div>
    ))}
  </div>
  </div>
<div className="mt-10 w-[1320px]">
  <div className="flex items-center gap-2 mb-4">
    <img src="/heartblack.png" className="w-8 h-8" alt="Liked heart" />
    <h3 className="text-xl font-bold">You may also like</h3>
  </div>
</div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[
      { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
      { name: "Ultra-Green Superfood Broccoli Hulk Flavored", price: "₱53.00", sold: 227, image: "/brocco.png" },
      { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
      { name: "How to Train Your Dragon's Treasure Exotic Fruit", price: "₱53.00", sold: 227, image: "/dragonfruit.png" },
      { name: "Premium Milk With No Exercise One Week", price: "₱53.00", sold: 227, image: "/milk.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },
    { name: "Premium Farm Fresh Sweet Corn", price: "₱53.00", sold: 227, image: "/corn.png" },
    { name: "Ultra-Creamy Black Gold Avocado with Balut", price: "₱53.00", sold: 227, image: "/fruit-avocado.png" },

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
            onClick={() => navigate(`/product/${index}`)}
            className="text-[20px] bg-[#4CAE4F] text-white w-80 px-4 py-1 rounded-2xl transition-transform duration-100 hover:scale-110"
          >
            Buy Now
          </button>
        </div>
      </div>
    ))}
  </div>
<div className="flex justify-center mt-10">
          <button className="text-lg font-bold bg-white border-2 hover:border-[#4CAE4F] border-gray-600 text-[#4CAE4F] [#4CAE4F] w-[500px] h-[50px] px-4 py-1 rounded-full text-center transition-transform duration-100 hover:scale-110">
            See More
          </button>
        </div>
        </div>
        </div>
      </div>

<footer className="bg-[#D9D9D9] mt-2 pt-10 pb-4">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 gap-y-1 text-sm text-gray-700 mx-1 mb-2 text-center md:text-left mx-[100px]">
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <img src="/Primary Logo w_ BG.png" alt="Binhi Logo" />
        <p className="text-[15px] text-green-600 text-center">Ang Ugat sa Masaganang Bukas!</p>
      </div>
    </div>
    <div className="mx-4">
      <p className="text-[15px] font-bold mb-3">CUSTOMER SERVICE</p>
      <ul className="space-y-1">
        <li>Help Center</li>
        <li>Payment Methods</li>
        <li>Return & Refund</li>
        <li>Contact Us</li>
      </ul>
    </div>
    <div className="mx-4">
      <p className="text-[15px] font-bold mb-3">ABOUT BINHI</p>
      <ul className="space-y-1">
        <li>About Us</li>
        <li>Privacy Policy</li>
        <li>Binhi Seller Center</li>
      </ul>
    </div>
    <div className="mx-4">
      <p className="text-[15px] font-bold mb-3">PAYMENT METHODS</p>
      <div className="grid grid-cols-2 gap-2">
        <img src="/cod.png" alt="COD" />
        <img src="/gcash.png" alt="GCash" />
        <img src="/paypal.png" alt="PayPal" />
        <img src="/maya.png" alt="Maya" />
      </div>
    </div>
    <div className="mx-4">
      <p className="text-[15px] font-bold mb-3">FOLLOW US</p>
      <ul className="space-y-1">
        <li className="flex items-center space-x-1">
          <img src="/Facebook.png" alt="Facebook" />
          <span>BINHI Corp.</span>
        </li>
        <li className="flex items-center space-x-1">
          <img src="/Messenger.png" alt="Messenger" />
          <span>@BINHI Corp.</span>
        </li>
        <li className="flex items-center space-x-1">
          <img src="/WhatsApp.png" alt="WhatsApp" />
          <span>BINHI Corp.</span>
        </li>
        <li className="flex items-center space-x-1">
          <img src="/Instagram.png" alt="Instagram" />
          <span>BINHI Corp.</span>
        </li>
      </ul>
    </div>
  </div>
</footer>
<div className="flex bg-[#4CAE4F] h-[80px] justify-center items-center text-white text-center text-[20px]">
  Binhi 2024, All Rights Reserved.
</div>
      </div>
  );
};

export default ProductDetails;
