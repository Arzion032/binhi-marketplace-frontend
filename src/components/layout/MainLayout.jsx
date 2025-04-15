import React from "react";
import Header from "../UI/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="relative z-30">
        <Header />
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('background.jpg')" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;