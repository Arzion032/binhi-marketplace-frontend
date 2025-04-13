import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUp/SignUpPage";
import NextStep from "./components/SignUp/NextStep";
import Header from "./components/UI/Header";

function App() {
  return (
    <>
      <Header />
      {/* other routes/components here */}
  
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/next-step" element={<NextStep />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
