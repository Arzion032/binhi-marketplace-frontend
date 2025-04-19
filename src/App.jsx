  // src/App.jsx
  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

  import Header from "./components/UI/InitialHeader";
  import SignUpPage from "./components/SignUp/SignUpPage";
  import NextStep from "./components/SignUp/NextStep";
  import SetPassword from "./components/SignUp/SetPassword";
  import SetUp from "./components/SignUp/SetUp";
  import Marketplace from "./components/LandingPage/Marketplace"

    

  function App() {
    return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/next-step" element={<NextStep />} />  
          <Route path="/set-up" element={<SetUp />} />  
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </Router>
    );
  }

  export default App;
