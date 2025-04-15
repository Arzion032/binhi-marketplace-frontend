// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/UI/Header";
import SignUpPage from "./components/SignUp/SignUpPage";
import NextStep from "./components/SignUp/NextStep";
import SetPassword from "./components/SignUp/SetPassword";
import SetUp from "./components/SignUp/SetUp";
import MainLayout from "./components/layout/MainLayout";
import LogInPage from "./components/Login/LogInPage";
import ResetPassword from "./components/Login/ResetPassword";
import CreateNewPassword from "./components/Login/CreateNewPassword";
import VerifyCode from "./components/Login/VerifyCode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<MainLayout><SignUpPage /></MainLayout>} />
        <Route path="/set-password" element={<MainLayout><SetPassword /></MainLayout>} />
        <Route path="/next-step" element={<MainLayout><NextStep /></MainLayout>} />
        <Route path="/set-up" element={<MainLayout><SetUp /></MainLayout>} />  
        <Route path="/" element={<MainLayout><LogInPage /></MainLayout>} />
        <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
        <Route path="/create-new-password" element={<MainLayout><CreateNewPassword /></MainLayout>} />
        <Route path="/verify-code" element={<MainLayout><VerifyCode /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
