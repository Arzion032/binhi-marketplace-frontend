import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/*Styling pu*/

const ChatPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Jonathan De Vera',
      avatar: '/111.png',
      active: true,
      messages: ['Hello! How can I help you today?', 'I have fresh products available.']
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      avatar: '333.png',
      active: false,
      messages: ['Hi there!', 'Thanks for your order.']
    },
    {
      id: 3,
      name: 'Maria Santos',
      avatar: '/avatar.png',
      active: true,
      messages: ['Good morning!', 'Your vegetables are ready for pickup.']
    },
    {
      id: 4,
      name: 'Pedro Gonzales',
      avatar: '/seller.png',
      active: false,
      messages: ['Welcome to our farm!', 'We have organic fruits available.']
    }
  ]);

  const [selectedConvId, setSelectedConvId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Automatically select the seller and add product info if passed
  useEffect(() => {
    if (state?.sellerName && state?.productName) {
      const match = conversations.find(conv => conv.name === state.sellerName);
      const productMessage = `Hi! I'm interested in "${state.productName}" — ${state.variation} at ₱${state.price.toFixed(2)}.`;

      if (match) {
        setConversations(prev =>
          prev.map(conv =>
            conv.name === state.sellerName && conv.messages.length === 0
              ? { ...conv, messages: [productMessage] }
              : conv
          )
        );
        setSelectedConvId(match.id);
      } else {
        const newId = conversations.length + 1;
        const newConv = {
          id: newId,
          name: state.sellerName,
          avatar: '/111.png',
          active: true,
          messages: [productMessage]
        };
        setConversations(prev => [...prev, newConv]);
        setSelectedConvId(newId);
      }
    }
  }, [state]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv => {
    const nameMatch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const messageMatch = conv.messages.some(msg => 
      msg.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return nameMatch || messageMatch;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConvId);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setConversations(prev => prev.map(conv =>
        conv.id === selectedConvId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      ));
      setNewMessage("");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <span key={index} className="bg-yellow-200 font-semibold">{part}</span>
        : part
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4 mb-2">
          <p className="text-4xl font-bold mx-4">Chats</p>
        </div>
        <div>
        </div>
      </div>

      <div className="flex gap-6 h-[75vh]">
        {/* Sidebar */}
        <div className="w-1/3 bg-white rounded-2xl shadow border-2 border-gray-300 p-6 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center bg-white border-2 border-gray-700 rounded-full px-3 py-1 h-12 relative">
              <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
              <input
                type="text"
                placeholder="Search conversations, messages..."
                value={searchQuery}
                onChange={handleSearch}
                className="flex-grow text-sm bg-white focus:outline-none pr-8"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 text-lg font-bold"
                >
                  ×
                </button>
              )}
            </div>
            
            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                {filteredConversations.length === 0 
                  ? `No conversations found for "${searchQuery}"` 
                  : `${filteredConversations.length} conversation${filteredConversations.length !== 1 ? 's' : ''} found`
                }
              </div>
            )}
          </div>

          <div className="space-y-2 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`flex items-center justify-between transition rounded-lg p-2 cursor-pointer ${conv.id === selectedConvId ? 'bg-green-100' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <div className="flex items-center gap-2">
                    <img src={conv.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {highlightText(conv.name, searchQuery)}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {conv.messages.length > 0 && highlightText(
                          conv.messages[conv.messages.length - 1], 
                          searchQuery
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-green-500 mb-1">Just Now</span>
                    <span className={`inline-block w-2 h-2 rounded-full ${conv.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  </div>
                </div>

              ))
            ) : (
              <div className="text-center py-8">
                <img src="/search-not-found.png" alt="No Results" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm text-gray-500 mb-2">No conversations found</p>
                <p className="text-xs text-gray-400">Try adjusting your search terms</p>
                <button 
                  onClick={clearSearch}
                  className="mt-3 px-3 py-1 bg-[#4CAE4F] text-white text-xs rounded-full hover:bg-green-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="w-2/3 bg-white rounded-2xl shadow border-2 border-gray-300 p-6 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center">
                  <img src={selectedConversation.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
                  <div>
                    <h2 className="font-bold text-lg">{selectedConversation.name}</h2>
                    <span className={`text-xs ${selectedConversation.active ? 'text-green-500' : 'text-gray-400'}`}>
                      {selectedConversation.active ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4 px-2 flex flex-col-reverse gap-2">
                {[...selectedConversation.messages].reverse().map((msg, index) => (
                  <div key={index} className="flex justify-end">
                    <div className="bg-gray-200 px-4 py-2 rounded-full max-w-[60%] text-sm">
                      {searchQuery ? highlightText(msg, searchQuery) : msg}
                    </div>
                    <img src="avatar2.png" alt="User" className="w-8 h-8 rounded-full ml-2 object-cover" />
                  </div>
                ))}
                
                {selectedConversation.messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex items-center border-t pt-2 px-2">
                <button className="mr-2 hover:scale-110 transition-transform">
                  <img src="Cameraa.png" alt="Camera" className="w-7 h-7" />
                </button>
                <button className="mr-2 hover:scale-110 transition-transform">
                  <img src="Add Image.png" alt="Add Image" className="w-7 h-7" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-grow px-4 py-2 text-sm border-2 border-gray-300 rounded-full mt-2 focus:border-[#4CAE4F] focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    newMessage.trim() 
                      ? 'bg-[#4CAE4F] hover:bg-green-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Send
                </button> 
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <img src="/chat-placeholder.png" alt="Select Chat" className="w-24 h-24 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                <p className="text-sm">Choose a conversation from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;