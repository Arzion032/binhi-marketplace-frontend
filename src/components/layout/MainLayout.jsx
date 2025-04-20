import React from "react";
<<<<<<< HEAD
import InitialHeader from "../UI/InitialHeader";
=======
import Header from "../UI/InitialHeader";
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a

const InitialLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <div className="relative z-30">
        <InitialHeader />
      </div>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-20"
        style={{ backgroundImage: "url('background.jpg')" }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default InitialLayout;
