// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/UI/Header";
import SignUpPage from "./components/SignUp/SignUpPage";
import NextStep from "./components/SignUp/NextStep";
import SetPassword from "./components/SignUp/SetPassword";
import SetUp from "./components/SignUp/SetUp";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/next-step" element={<NextStep />} />  
        <Route path="/set-up" element={<SetUp />} />  
      </Routes>
    </Router>
  );
}

export default App;
