  // src/App.jsx
  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import SignUpPage from "./components/SignUp/SignUpPage";
import NextStep from "./components/SignUp/NextStep";
import SetPassword from "./components/SignUp/SetPassword";
import SetUp from "./components/SignUp/SetUp";
import InitialLayout from "./components/Layout/InitialLayout";
import LogInPage from "./components/Login/LogInPage";
import ResetPassword from "./components/Login/ResetPassword";
import CreateNewPassword from "./components/Login/CreateNewPassword";
import VerifyCode from "./components/Login/VerifyCode";
import Marketplace from "./components/LandingPage/Marketplace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<InitialLayout><SignUpPage /></InitialLayout>} />
        <Route path="/set-password" element={<InitialLayout><SetPassword /></InitialLayout>} />
        <Route path="/next-step" element={<InitialLayout><NextStep /></InitialLayout>} />
        <Route path="/set-up" element={<InitialLayout><SetUp /></InitialLayout>} />  
        <Route path="/login" element={<InitialLayout><LogInPage /></InitialLayout>} />
        <Route path="/reset-password" element={<InitialLayout><ResetPassword /></InitialLayout>} />
        <Route path="/create-new-password" element={<InitialLayout><CreateNewPassword /></InitialLayout>} />
        <Route path="/verify-code" element={<InitialLayout><VerifyCode /></InitialLayout>} />
        <Route path="/" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}
=======
  import Header from "./components/UI/InitialHeader";
  import SignUpPage from "./components/SignUp/SignUpPage";
  import NextStep from "./components/SignUp/NextStep";
  import SetPassword from "./components/SignUp/SetPassword";
  import SetUp from "./components/SignUp/SetUp";
  import Marketplace from "./components/LandingPage/Marketplace"

    
>>>>>>> 0d09aade4112dce86a4ec164fc3d23880a0af08a

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
