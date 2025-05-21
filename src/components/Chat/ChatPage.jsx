import React from 'react';

const ChatPage = () => {
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
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-lg p-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <img src="avatar.png" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">Jinky Valdez</p>
                    <p className="text-xs text-gray-600">Is this available?</p>
                  </div>
                </div>
                <span className="text-xs text-green-500">Just Now • <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="w-2/3 bg-white rounded-2xl shadow border-2 border-gray-300 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center border-b pb-2 mb-4">
            <img src="avatar.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2 object-cover" />
            <h2 className="font-bold text-lg">Jinky Valdez</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 px-2">
            <div className="flex justify-end mb-2">
              <div className="bg-gray-200 px-4 py-2 rounded-full max-w-[60%] text-sm">
                Is this available?
              </div>
              <img src="avatar2.png" alt="User" className="w-8 h-8 rounded-full ml-2 object-cover" />
            </div>
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
              placeholder="Type your message here..."
              className="flex-grow px-4 py-2 text-sm border-2 border-gray-300 rounded-full mt-2"
            />
            <button className="ml-2">
              <img src="Happy.png" alt="Happy" className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;