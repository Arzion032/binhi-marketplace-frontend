import React from "react";
import MainHeader from "../UI/MainHeader";
import MainFooter from "../UI/MainFooter";


const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <div className="relative z-30">
        <MainHeader />
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center z-20"></div>

      {/* Main Content */}
      <main className="relative z-20 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-30">
        <MainFooter />
      </footer>
    </div>
  );
};


export default MainLayout;


