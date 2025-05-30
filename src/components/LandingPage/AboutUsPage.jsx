import React from 'react'

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F9F5] px-6 py-4 mx-16">
        <h1 className="text-5xl font-black text-center mt-8"> About Us</h1>      
            <section className="text-white px-6 py-2 md:py-2 mt-[30px] rounded-xl">
                <div className="relative rounded-xl overflow-hidden shadow-lg mx-auto">
                <img src ="Federation.png" alt="Federation" className="w-full" />
                 <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white p-4">
                    <p className="text-4xl font-semibold mb-1">Let’s meet</p>
                    <h1 className="text-5xl font-extrabold text-center leading-tight">
                    Binangonan Municipal Farmers Federation
                    </h1>
                </div>
                </div>
                <p className="text-black text-3xl font-bold text-center mt-8">MISSION</p>
                <p className="text-2xl text-black text-center mt-2" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                 <p className="text-black text-3xl font-bold text-center mt-8">VISION</p>
                  <p className="text-2xl text-black text-center mt-2 mb-4" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>

      <div className="group fixed bottom-10 right-10 z-50">
        <button
          onClick={() => navigate('/ChatPage')}
          className="bg-[#4CAF50] hover:bg-green-700 text-white p-4 rounded-full shadow-lg relative transition-colors"
        >
          <img src="/chaticon.png" alt="Chat Icon" className="w-8 h-8" />
        </button>
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#4CAF50] text-white text-xl font-bold px-4 py-1 mx-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chats
        </div>
      </div>
    </div>
    
  )
}

export default AboutUsPage
