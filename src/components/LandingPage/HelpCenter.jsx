import React, { useState } from 'react';

// Import your icons
import ProfileIcon from '../../assets/Profile.png';
import MarketplaceIcon from '../../assets/Sprouts.png';
import StoreIcon from '../../assets/Store.png';
import LongDocumentIcon from '../../assets/LongDocument.png';
import UserIcon from '../../assets/HUser.png';
import ErrorIcon from '../../assets/Error.png';
import MicrophoneIcon from '../../assets/Microphone.png';
import SearchIcon from '../../assets/HSearch.png';


const HelpCenter = () => {
  const [activeTopic, setActiveTopic] = useState('Suggestions');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const topics = [
    'Getting Started',
    'Marketplace for Buyers',
    'Seller Center for Farmers',
    'Orders and Transactions',
    'Account Management',
    'Issues Resolution'
  ];

  const topicLineSplit = {
    'Getting Started': ['Getting', 'Started'],
    'Marketplace for Buyers': ['Marketplace', 'for Buyers'],
    'Seller Center for Farmers': ['Seller Center', 'for Farmers'],
    'Orders and Transactions': ['Orders and', 'Transactions'],
    'Account Management': ['Account', 'Management'],
    'Issues Resolution': ['Issues', 'Resolution'],
  };

  const icons = {
    'Getting Started': ProfileIcon,
    'Marketplace for Buyers': MarketplaceIcon,
    'Seller Center for Farmers': StoreIcon,
    'Orders and Transactions': LongDocumentIcon,
    'Account Management': UserIcon,
    'Issues Resolution': ErrorIcon,
  };

    const topicContent = {
Suggestions: [
      { q: 'Question : What is BINHI?', a: 'Answer    : BINHI is an online marketplace and federation management system that connects farmers directly to consumers and helps federations manage their operations efficiently.' },
      { q: 'Question : How do I find products to buy?', a: 'Answer    : Use the search bar or browse product categories to find the crops or equipment you need.' },
      { q: 'Question : How do I track my order?', a: 'Answer    : Visit your Order History page to see the current status of your orders and delivery updates.' },
      { q: 'Question : How do I list a new product?', a: 'Answer    : In the Seller Center, click “Add Product,” fill in the details, and save. You can save it as a draft or publish it immediately.' },
      { q: 'Question : How can I update my profile information?', a: 'Answer    : Go to your profile page and click “Edit Profile” to change your name, contact details, or password.' },
      { q: 'Question : I didn’t receive my confirmation email. What now?', a: 'Answer    : Check your spam folder. If it’s not there, request a new confirmation email from the login page.' }
    ],
    'Getting Started': [
      { q: 'Question : What is BINHI?', a: 'Answer    : BINHI is an online platform that connects farmers directly to buyers through a marketplace and provides tools for managing federation operations, helping improve sales and collaboration.' },
      { q: 'Question : How to sign up and create an account?', a: 'Answer    : Go to the BINHI homepage and click “Sign Up.” Fill in your information, verify your email, and complete your profile to start using BINHI.' },
      { q: 'Question : Supported devices and browsers?', a: 'Answer    : BINHI works best on desktop browsers like Chrome, Firefox, and Edge, and is also accessible on smartphones and tablets with modern browsers.' },
      { q: 'Question : Language support (Tagalog & English)?', a: 'Answer    : BINHI supports both Tagalog and English languages. You can switch languages anytime in the settings or at the login screen.' },
      { q: 'Question : How to navigate the BINHI dashboard?', a: 'Answer    : The dashboard is divided into sections for Marketplace, Orders, and Federation Management. Use the sidebar menu to switch between sections and the top bar for notifications and account settings.' }
    ],
    'Marketplace for Buyers': [
      { q: 'Question : How to search and browse products?', a: 'Answer    : Use the search bar at the top to enter keywords or browse categories listed on the homepage to find products.' },
      { q: 'Question : How to view product details?', a: 'Answer    : Click on any product from the list to open its details page, where you can see descriptions, prices, and seller information.' },
      { q: 'Question : How to add to cart and checkout?', a: 'Answer    : On the product details page, click “Add to Cart.” When ready, go to your cart, review your items, enter your delivery info, select payment, and click “Checkout.”' },
      { q: 'Question : How to track your order?', a: 'Answer    : Visit “Order History” in your profile to view current status and updates for your orders.' },
      { q: 'Question : Payment options available?', a: 'Answer    : BINHI supports cash on delivery and online payment methods, depending on your location and seller preferences.' },
      { q: 'Question : Understanding your order status?', a: 'Answer    : Order statuses include Pending, Confirmed, Shipped, Delivered, and Cancelled. You can track this in your Order History.' }
    ],
    'Seller Center for Farmers': [
      { q: 'Question : How to list a product?', a: 'Answer    : Access the Seller Center, click “Add Product,” fill in the details like name, price, description, and upload images, then publish or save as draft.' },
      { q: 'Question : How to edit or delete a product?', a: 'Answer    : In Seller Center under “Active” or “Drafts,” select the product you want to modify or delete and use the provided options.' },
      { q: 'Question : How to manage product variants (e.g. weight, packaging)?', a: 'Answer    : While adding or editing a product, you can add multiple variants with different weights, packaging types, or prices.' },
      { q: 'Question : Saving products as drafts?', a: 'Answer    : If you’re not ready to publish, save your product as a draft to edit and publish later from the “Drafts” tab.' },
      { q: 'Question : Understanding product statuses (published, pending, hidden, etc.)?', a: 'Answer    : Products can be Published (visible to buyers), Pending (awaiting approval), Hidden (not visible), or Deleted.' }
    ],
    'Orders and Transactions': [
      { q: 'Question : Viewing your order history?', a: 'Answer    : Go to your profile and select “Order History” to see all your past and current orders.' },
      { q: 'Question : How to cancel an order?', a: 'Answer    : If your order is still Pending, open the order details and click “Cancel Order.”' },
      { q: 'Question : How to request a refund?', a: 'Answer    : Contact BINHI Support with your order details within 7 days after delivery to start the refund process.' },
      { q: 'Question : Understanding checkout success and confirmation?', a: 'Answer    : After a successful checkout, you will see a confirmation page and receive an email summarizing your order.' },
      { q: 'Question : Order management for sellers?', a: 'Answer    : Sellers can view incoming orders, update statuses, and manage order fulfillment from the Seller Center’s “Orders” tab.' }
    ],
    'Account Management': [
      { q: 'Question : How to update your profile?', a: 'Answer    : Click your profile icon, select “Edit Profile,” and update your information.' },
      { q: 'Question : How to change your password?', a: 'Answer    : From Account Settings, choose “Change Password” and follow the steps to set a new password.' },
      { q: 'Question : How to manage your address book?', a: 'Answer    : Add or edit delivery addresses in your account under “Address Book.”' },
      { q: 'Question : Verifying your email and contact number?', a: 'Answer    : After signing up, check your email for a verification link. You can resend the link from your profile.' },
      { q: 'Question : Logging out securely?', a: 'Answer    : Click your profile icon and select “Log Out” to securely end your session.' }
    ],
    'Issues Resolution': [
      { q: 'Question : I can\'t log in to my account?', a: 'Answer    : Make sure your email and password are correct. Use “Forgot Password” if needed or contact support.' },
      { q: 'Question : I didn’t receive my confirmation email?', a: 'Answer    : Check your spam folder and request a new confirmation email from the login page.' },
      { q: 'Question : I\'m seeing incorrect product data?', a: 'Answer    : Try refreshing the page or clearing your browser cache. Contact support if the problem persists.' },
      { q: 'Question : Checkout is not going through?', a: 'Answer    : Verify your payment method and internet connection. If issues continue, contact BINHI Support.' }
    ]
  };

  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const getSearchResults = (query) => {
    if (!query) return [];
    const keywords = query.trim().toLowerCase().split(/\s+/).map(escapeRegExp);
    return Object.values(topicContent)
      .flat()
      .filter(({ q, a }) =>
        keywords.every((kw) =>
          q.toLowerCase().match(new RegExp(kw, 'i')) || a.toLowerCase().match(new RegExp(kw, 'i'))
        )
      );
  };

  const searchResults = searchQuery ? getSearchResults(searchQuery) : [];
  const contentToShow = searchQuery ? searchResults : topicContent[activeTopic] || [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue.trim());
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === '') {
      setSearchQuery('');
      setActiveTopic('Suggestions');
    }
  };

  const handleTopicClick = (topic) => {
    if (activeTopic === topic) {
      setActiveTopic('Suggestions');
    } else {
      setActiveTopic(topic);
    }
    setSearchQuery('');
    setInputValue('');
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-12 lg:px-36 py-12 bg-[#f9f9f7] text-gray-800">
      {/* Section 1: Back + Help Center */}
      <div className="mb-10 flex items-center space-x-4">
        <button className="text-xl text-600 font-semibold hover:underline">&lt; Back</button>
        <h1 className="text-4xl font-semibold">Help Center</h1>
      </div>

      {/* Section 2: Header + Search */}
      <div className="mb-14 text-center">
        <h2 className="text-5xl font-bold mb-6">Hi. How can we help?</h2>
        <div className="relative max-w-2xl mx-auto flex items-center">
          {/* Search icon inside input on the left */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <img src={SearchIcon} alt="Search" className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Search keywords, questions, topics"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow border border-[#858585] rounded-full py-3 pl-12 pr-12 text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4CAE4F]"
            style={{ borderWidth: '1px' }}
          />

          {/* Microphone icon inside input on the right */}
          <div className="absolute right-[132px] top-1/2 -translate-y-1/2 pointer-events-none">
            <img src={MicrophoneIcon} alt="Microphone" className="w-[20px] h-[24px]" />
          </div>

          {/* Search button */}
          <button
            onClick={() => setSearchQuery(inputValue.trim())}
            className="ml-3 bg-[#4CAE4F] text-white font-semibold rounded-full py-3 px-6 shadow hover:bg-green-600 transition flex items-center justify-center"
            style={{ height: '48px' }} // match input height (py-3 + text size)
          >
            Search
          </button>
        </div>
      </div>




      {/* Section 3: Recommended Topics */}
      {!searchQuery && (
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-1">Recommended Topics</h3>
          <p className="text-xl text-gray-600 mb-6">Not sure what to ask? Click a topic you are interested!</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-[1500px] mx-auto">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`flex flex-col items-center justify-center gap-2 border text-center rounded-[15px] py-5 px-2 transition-all duration-150 ${
                  activeTopic === topic
                    ? 'bg-[#4CAE4F]/5 border-[#4CAE4F] border-[2px] text-[#4CAE4F]'
                    : 'bg-white border-[1.5px] border-[#858585] hover:border-[#4CAE4F] hover:shadow-sm'
                }`}
              >
                <img
                  src={icons[topic]}
                  alt={topic}
                  className="w-6 h-6"
                  style={
                    activeTopic === topic
                      ? { filter: 'brightness(0) saturate(100%) invert(39%) sepia(86%) saturate(426%) hue-rotate(70deg) brightness(91%) contrast(87%)' }
                      : {}
                  }
                />
                <span className="text-xl font-medium leading-tight whitespace-pre-line text-balance text-center">
                  {topicLineSplit[topic].join('\n')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Suggestions or Search Results */}
      <div className="bg-white border-[1px] border-[#858585] rounded-[15px] px-8 py-8 shadow-sm max-w-[1500px] mx-auto mt-[-20px]">
        <h3 className="text-3xl font-bold mb-2">
          {searchQuery ? `Topics related to ‘${searchQuery}’` : activeTopic}
        </h3>
        <p className="text-xl text-gray-600 mb-6">
          {searchQuery
            ? 'Here are the results questions with answers!'
            : 'Here are some suggested questions with answers!'}
        </p>
        <div className="space-y-6">
          {contentToShow.length > 0 ? (
            contentToShow.map(({ q, a }, index) => {
              const keywords = searchQuery.trim().split(/\s+/).map(escapeRegExp);
              const highlightRegex = new RegExp(keywords.join('|'), 'gi');

              return (
                <div key={index}>
                  <p
                    className="text-xl font-semibold text-gray-900 mb-1"
                    dangerouslySetInnerHTML={{
                      __html: searchQuery
                        ? q.replace(highlightRegex, (match) => `<mark class='bg-yellow-200'>${match}</mark>`)
                        : q
                    }}
                  />
                  <p
                    className="text-xl text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: searchQuery
                        ? a.replace(highlightRegex, (match) => `<mark class='bg-yellow-100'>${match}</mark>`)
                        : a
                    }}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-lg text-gray-600">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
