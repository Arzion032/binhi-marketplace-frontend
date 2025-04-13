import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import LogInPage from "./components/Login/LogInPage";
import ResetPassword from "./components/Login/ResetPassword";
import CreateNewPassword from "./components/Login/CreateNewPassword";
import VerifyCode from "./components/Login/VerifyCode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><LogInPage /></MainLayout>} />
        <Route path="/reset-password" element={<MainLayout><ResetPassword /></MainLayout>} />
        <Route path="/create-new-password" element={<MainLayout><CreateNewPassword /></MainLayout>} />
        <Route path="/verify-code" element={<MainLayout><VerifyCode /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
