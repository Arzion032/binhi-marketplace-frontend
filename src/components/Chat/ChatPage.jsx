import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Global conversation storage to persist across component mounts
let globalConversations = [];

const ChatPage = () => {
  const location = useLocation();
  const { state } = location; // Get the state passed via navigation

  const [conversations, setConversations] = useState(globalConversations);
  const [selectedConvId, setSelectedConvId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // state to store selected image

  // Update global storage whenever conversations change
  useEffect(() => {
    globalConversations = conversations;
  }, [conversations]);

  useEffect(() => {
    if (state?.isAssociation && state?.associationName) {
      const existingConv = conversations.find(
        conv => conv.name === state.associationName && conv.isAssociation
      );

      if (!existingConv) {
        const welcomeMessage = `Hello! Welcome to ${state.associationName}. We're located in ${state.associationLocation} and specialize in ${state.associationCategories.join(', ')}. How can we help you today?`;

        const newId = Math.max(...conversations.map(c => c.id), 0) + 1;
        const newConv = {
          id: newId,
          name: state.associationName,
          avatar: state.associationAvatar,
          active: true,
          messages: [{ text: welcomeMessage, sender: 'seller', timestamp: Date.now(), time: getFormattedTime() }],
          isAssociation: true,
          location: state.associationLocation,
          categories: state.associationCategories,
          sold: state.associationSold,
          rank: state.associationRank,
          place: state.associationPlace,
          lastMessageTime: 'Just now'
        };

        setConversations(prev => {
          const filtered = prev.filter(conv => 
            !(conv.name === state.associationName && conv.isAssociation)
          );
          return [newConv, ...filtered];
        });
        setSelectedConvId(newId);
      } else {
        setSelectedConvId(existingConv.id);
      }
    } else if (state?.sellerName && state?.productName) {
      const match = conversations.find(conv => conv.name === state.sellerName);
      const productMessage = `Hi! I'm interested in "${state.productName}" — ${state.variation} at ₱${state.price.toFixed(2)}.`;

      if (match) {
        const messageExists = match.messages.some(msg => msg.text === productMessage);
        if (!messageExists) {
          setConversations(prev =>
            prev.map(conv =>
              conv.name === state.sellerName
                ? { 
                    ...conv, 
                    messages: [...conv.messages, { text: productMessage, sender: 'buyer', timestamp: Date.now(), time: getFormattedTime() }], 
                    lastMessageTime: 'Just now' 
                  }
                : conv
            )
          );
        }
        setSelectedConvId(match.id);
      } else {
        const newId = Math.max(...conversations.map(c => c.id), 0) + 1;
        const newConv = {
          id: newId,
          name: state.sellerName,
          avatar: '/111.png',
          active: true,
          messages: [{ text: productMessage, sender: 'buyer', timestamp: Date.now(), time: getFormattedTime() }],
          isAssociation: false,
          lastMessageTime: 'Just now'
        };
        setConversations(prev => [newConv, ...prev]);
        setSelectedConvId(newId);
      }
    } else if (conversations.length > 0 && !selectedConvId) {
      // Select first conversation if none is selected
      setSelectedConvId(conversations[0].id);
    }
  }, [state]);

  // Real-time timestamp updates
  useEffect(() => {
    const updateTimestamps = () => {
      setConversations((prev) => prev.map((conv) => ({
        ...conv,
        lastMessageTime: getRelativeTime(conv.messages[conv.messages.length - 1]?.timestamp || Date.now())
      })));
    };

    const interval = setInterval(updateTimestamps, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getFormattedTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;  // Convert 24-hour format to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Compare the time difference and return the appropriate time
  const displayTimestamp = (messageTime, prevMessageTime) => {
    const diff = messageTime - prevMessageTime;
    if (diff > 60000) {  // If the time difference is greater than 1 minute
      return getRelativeTime(messageTime);
    }
    return null; // Return null if no need for a new timestamp
  };

  const filteredConversations = conversations.filter(conv => {
    const nameMatch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const messageMatch = conv.messages.some(msg =>
      (msg.text && msg.text.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (msg.image && 'image'.includes(searchQuery.toLowerCase())) // Check if it's an image message
    );
    return nameMatch || messageMatch;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConvId);

  const handleSend = () => {
    if (newMessage.trim() !== "" || selectedImage) {
      const messageContent = selectedImage
        ? { image: selectedImage, sender: 'buyer', timestamp: Date.now(), time: getFormattedTime() }
        : { text: newMessage, sender: 'buyer', timestamp: Date.now(), time: getFormattedTime() };

      setConversations(prev => {
        const updatedConversations = prev.map(conv =>
          conv.id === selectedConvId
            ? { 
                ...conv, 
                messages: [...conv.messages, { ...messageContent }], 
                lastMessageTime: 'Just now' 
              }
            : conv
        );

        // Sort the conversations so the most recent one comes to the top
        updatedConversations.sort((a, b) => {
          const aLastMessageTimestamp = a.messages[a.messages.length - 1]?.timestamp || 0;
          const bLastMessageTimestamp = b.messages[b.messages.length - 1]?.timestamp || 0;
          return bLastMessageTimestamp - aLastMessageTimestamp; // Sort in descending order
        });

        return updatedConversations;
      });

      setNewMessage("");
      setSelectedImage(null); // Reset selected image after sending
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
        : part
    );
  };

  // Handle image file selection
  const handleImageSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // create a URL for the selected image
      setNewMessage("Image attached"); // Set the input field text when image is selected
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-7">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold mx-4">Chats</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
          </div>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-120px)]">
        {/* Enhanced Sidebar */}
        <div className="w-1/3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden flex flex-col">
          {/* Search Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative flex items-center bg-white border-2 border-gray-700 rounded-full px-4 py-2">
              <img src="/search.png" alt="Search" className="w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={handleSearch}
                className="flex-grow text-sm bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <div className="p-2">
                {filteredConversations.map((conv, index) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`group relative flex items-center p-4 mx-2 mb-2 rounded-2xl cursor-pointer transition-all duration-200 ${
                      conv.id === selectedConvId 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]' 
                        : 'hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                        <img 
                          src={conv.avatar} 
                          alt={conv.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="24" fill="%236b7280">${conv.name.charAt(0)}</text></svg>`;
                          }}
                        />
                      </div>
                      {conv.active && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-sm truncate ${
                          conv.id === selectedConvId ? 'text-white' : 'text-gray-900'
                        }`}>
                          {highlightText(conv.name, searchQuery)}
                        </h3>
                        <span className={`text-xs flex-shrink-0 ml-2 ${
                          conv.id === selectedConvId ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {conv.lastMessageTime}
                        </span>
                      </div>

                      <p className={`text-xs truncate ${
                        conv.id === selectedConvId ? 'text-green-100' : 'text-gray-600'
                      }`}>
                        {conv.messages.length > 0 && conv.messages[conv.messages.length - 1].text && highlightText(
                          conv.messages[conv.messages.length - 1].text,
                          searchQuery
                        )}
                        {conv.messages.length > 0 && conv.messages[conv.messages.length - 1].image && (
                          <span className="text-sm text-gray-500">Image</span>
                        )}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {conv.id !== selectedConvId && Math.random() > 0.5 && (
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 ml-2"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">No conversations found</h3>
                  <p className="text-xs text-gray-500 mb-4">Try adjusting your search terms</p>
                  <button
                    onClick={clearSearch}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-full hover:bg-green-700 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Chat Area */}
        <div className="w-2/3 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                        <img 
                          src={selectedConversation.avatar} 
                          alt={selectedConversation.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="24" fill="%236b7280">${selectedConversation.name.charAt(0)}</text></svg>`;
                          }}
                        />
                      </div>
                      {selectedConversation.active && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900">{selectedConversation.name}</h2>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${selectedConversation.active ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedConversation.active ? 'Active now' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConversation.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'seller' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 ring-2 ring-white shadow-sm">
                        <img 
                          src={selectedConversation.avatar} 
                          alt={selectedConversation.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="24" fill="%236b7280">${selectedConversation.name.charAt(0)}</text></svg>`;
                          }}
                        />
                      </div>
                    )}
                    <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'buyer' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-md shadow-lg' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-md shadow-sm'
                    }`}>
                      {msg.text && msg.text}
                      {msg.image && <img src={msg.image} alt="sent-img" className="w-full h-auto max-h-96 mt-2 rounded-lg" />}
                    </div>
                    {msg.sender === 'buyer' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 ml-3 flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0">
                        You
                      </div>
                    )}
                  </div>
                ))}

                {selectedConversation.messages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-center py-12">
                    <div>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the conversation</h3>
                      <p className="text-sm text-gray-500">Send a message to begin chatting with {selectedConversation.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                    <img
                      src="/Cameraa.png"  
                      alt="Camera Icon"
                      className="w-6 h-6 group-hover:text-gray-700"
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
                    <label className="cursor-pointer">
                      <img
                        src="/Add Image.png" 
                        alt="Add Image"
                        className="w-6 h-6 group-hover:text-gray-700"
                      />
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={handleImageSelection} 
                      />
                    </label>
                  </button>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() && !selectedImage}
                    className={`p-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      (newMessage.trim() || selectedImage)
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-sm text-gray-500">Choose a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>t
      </div>
    </div>
  );
};

export default ChatPage;
