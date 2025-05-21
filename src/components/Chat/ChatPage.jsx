import React from 'react';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F9F5] p-4 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <button className="text-sm text-gray-700">&lt; Back</button>
        <h1 className="text-xl font-semibold">Chats</h1>
        <div></div>
      </div>

      <div className="flex h-[80vh] bg-white rounded-2xl shadow border overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-full"
            />
          </div>
          <div className="space-y-2 overflow-y-auto h-[calc(100%-3rem)]">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-100 rounded-lg p-2 cursor-pointer">
                <div className="flex items-center gap-2">
                  <img src="avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
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
        <div className="w-2/3 p-4 flex flex-col">
          <div className="flex items-center border-b pb-2 mb-4">
            <img src="avatar.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
            <h2 className="font-bold text-lg">Jinky Valdez</h2>
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            <div className="flex justify-end mb-2">
              <div className="bg-gray-200 px-4 py-2 rounded-full max-w-[60%] text-sm">
                Is this available?
              </div>
              <img src="avatar2.png" alt="User" className="w-8 h-8 rounded-full ml-2" />
            </div>
          </div>

          <div className="flex items-center border-t pt-2">
            <button className="mr-2">
              <img src="camera.png" alt="Camera" className="w-5 h-5" />
            </button>
            <button className="mr-2">
              <img src="mic.png" alt="Mic" className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-grow px-4 py-2 text-sm border rounded-full"
            />
            <button className="ml-2">
              <img src="send.png" alt="Send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;