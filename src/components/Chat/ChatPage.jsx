import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Jonathan De Vera',
      avatar: '/111.png',
      active: true,
      messages: [
        { text: 'Hello! How can I help you today?', sender: 'seller' },
        { text: 'I have fresh products available.', sender: 'seller' }
      ],
      isAssociation: false
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      avatar: '333.png',
      active: false,
      messages: [
        { text: 'Hi there!', sender: 'seller' },
        { text: 'Thanks for your order.', sender: 'seller' }
      ],
      isAssociation: false
    },
    {
      id: 3,
      name: 'Maria Santos',
      avatar: '/avatar.png',
      active: true,
      messages: [
        { text: 'Good morning!', sender: 'seller' },
        { text: 'Your vegetables are ready for pickup.', sender: 'seller' }
      ],
      isAssociation: false
    },
    {
      id: 4,
      name: 'Pedro Gonzales',
      avatar: '/seller.png',
      active: false,
      messages: [
        { text: 'Welcome to our farm!', sender: 'seller' },
        { text: 'We have organic fruits available.', sender: 'seller' }
      ],
      isAssociation: false
    }
  ]);

  const [selectedConvId, setSelectedConvId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
          messages: [{ text: welcomeMessage, sender: 'seller' }],
          isAssociation: true,
          location: state.associationLocation,
          categories: state.associationCategories,
          sold: state.associationSold,
          rank: state.associationRank,
          place: state.associationPlace
        };
setConversations(prev => prev.filter(conv => 
  !(conv.name === state.associationName && conv.isAssociation)
));
        setConversations(prev => [newConv, ...prev]);
        setSelectedConvId(newId);
      } else {
        setSelectedConvId(existingConv.id);
      }
    } else if (state?.sellerName && state?.productName) {
      const match = conversations.find(conv => conv.name === state.sellerName);
      const productMessage = `Hi! I'm interested in "${state.productName}" — ${state.variation} at ₱${state.price.toFixed(2)}.`;

      if (match) {
        // Check if this exact message already exists to prevent duplicates
        const messageExists = match.messages.some(msg => msg.text === productMessage);
        if (!messageExists) {
          setConversations(prev =>
            prev.map(conv =>
              conv.name === state.sellerName
                ? { ...conv, messages: [...conv.messages, { text: productMessage, sender: 'buyer' }] }
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
          messages: [{ text: productMessage, sender: 'buyer' }],
          isAssociation: false
        };
        setConversations(prev => [newConv, ...prev]);
        setSelectedConvId(newId);
      }
    }
  }, [state, conversations]);

  const filteredConversations = conversations.filter(conv => {
    const nameMatch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const messageMatch = conv.messages.some(msg =>
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return nameMatch || messageMatch;
  });

  const selectedConversation = conversations.find(c => c.id === selectedConvId);

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setConversations(prev => prev.map(conv =>
        conv.id === selectedConvId
          ? { ...conv, messages: [...conv.messages, { text: newMessage, sender: 'buyer' }] }
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

            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                {filteredConversations.length === 0
                  ? `No conversations found for "${searchQuery}"`
                  : `${filteredConversations.length} conversation${filteredConversations.length !== 1 ? 's' : ''} found`
                }
              </div>
            )}
          </div>

          <div className="space-y-2">
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
                          conv.messages[conv.messages.length - 1].text,
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
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xs font-bold">
                    {selectedConversation.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{selectedConversation.name}</h2>
                    <span className={`text-xs ${selectedConversation.active ? 'text-green-500' : 'text-gray-400'}`}>
                      {selectedConversation.active ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 mb-4 px-2 flex flex-col gap-3">
                {selectedConversation.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'seller' && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xs font-bold">
                        {selectedConversation.name.charAt(0)}
                      </div>
                    )}
                    <div className={`px-4 py-2 rounded-2xl max-w-[60%] text-sm ${
                      msg.sender === 'buyer' 
                        ? 'bg-green-600 text-white rounded-br-sm' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                    }`}>
                      {searchQuery ? highlightText(msg.text, searchQuery) : msg.text}
                    </div>
                    {msg.sender === 'buyer' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 ml-2 flex items-center justify-center text-xs font-bold text-white">
                        You
                      </div>
                    )}
                  </div>
                ))}

                {selectedConversation.messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-8">
                    No messages yet. Start the conversation!
                  </div>
                )}
              </div>

              <div className="flex items-center border-t pt-4 px-2">
                <button className="mr-2 hover:scale-110 transition-transform p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button className="mr-2 hover:scale-110 transition-transform p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-grow px-4 py-2 text-sm border-2 border-gray-300 rounded-full focus:border-green-600 focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    newMessage.trim()
                      ? 'bg-green-600 hover:bg-green-700 text-white'
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