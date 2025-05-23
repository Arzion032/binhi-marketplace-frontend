import React, { useState } from 'react';

/*Styling pu*/


const ChatPage = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Jinky Valdez',
      avatar: 'avatar.png',
      active: true,
      messages: ['Is this available?']
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      avatar: 'avatar.png',
      active: false,
      messages: ['Do you still have stock?']
    }
  ]);

  const [selectedConvId, setSelectedConvId] = useState(1);
  const [newMessage, setNewMessage] = useState("");

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

  return (
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 mb-2">
          <p className="text-4xl font-bold">Chats</p>
        </div>
        <div></div>
      </div>

      <div className="flex gap-6 h-[80vh]">
        {/* Sidebar */}
        <div className="w-1/3 bg-white rounded-2xl shadow border-2 border-gray-300 p-6 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center bg-white border-2 border-gray-700 rounded-full px-3 py-1 h-12">
              <img src="/search.png" alt="Search" className="w-5 h-5 mx-4" />
              <input
                type="text"
                placeholder="Search"
                className="flex-grow text-sm bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`flex items-center justify-between transition rounded-lg p-2 cursor-pointer ${conv.id === selectedConvId ? 'bg-green-100' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <div className="flex items-center gap-2">
                  <img src={conv.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{conv.name}</p>
                    <p className="text-xs text-gray-600">{conv.messages[conv.messages.length - 1]}</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">
                  Just Now •
                  <span className={`inline-block w-2 h-2 ml-1 rounded-full ${conv.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="w-2/3 bg-white rounded-2xl shadow border-2 border-gray-300 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center border-b pb-2 mb-4">
            <img src={selectedConversation.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <h2 className="font-bold text-lg">{selectedConversation.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 px-2 flex flex-col-reverse gap-2">
            {[...selectedConversation.messages].reverse().map((msg, index) => (
              <div key={index} className="flex justify-end">
                <div className="bg-gray-200 px-4 py-2 rounded-full max-w-[60%] text-sm">
                  {msg}
                </div>
                <img src="avatar2.png" alt="User" className="w-8 h-8 rounded-full ml-2 object-cover" />
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t pt-2 px-2">
            <button className="mr-2">
              <img src="Cameraa.png" alt="Camera" className="w-7 h-7" />
            </button>
            <button className="mr-2">
              <img src="Add Image.png" alt="Add Image" className="w-7 h-7" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow px-4 py-2 text-sm border-2 border-gray-300 rounded-full mt-2"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
            onClick={handleSend}
            className="ml-2 bg-[#4CAE4F] hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Send
          </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;    