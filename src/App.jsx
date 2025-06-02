import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import UserProfilePage from "./components/ProfilePage/UserProfilePage";
import OrderHistory from './components/ProfilePage/OrdersHistory';
import MainLayout from "./components/Layout/MainLayout";
import ProductDetails from "./components/LandingPage/ProductDetails";
import OrderLayout from "./components/Layout/OrderLayout";
import CartPage from "./components/Cart/CartPage";
import ChatPage from "./components/Chat/ChatPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess";
import SearchProduct from "./components/LandingPage/SearchProduct"; 
import SearchedFarmers from "./components/LandingPage/SearchedFarmers"; 
import NoResults from "./components/LandingPage/NoResults"; 
import MarketplaceWithAccount from "./components/LandingPageWithAccount/MarketplaceWithAccount";
import FeaturedProducts from "./components/LandingPage/FeaturedProducts";
import SellerCenter from "./components/SellerCenter/SellerCenter";
import YourDailyBinhiNeeds from './components/LandingPage/YourDailyBinhiNeeds';
import SearchProductWithAccount from "./components/LandingPageWithAccount/SearchProductWithAccount";
import OrderManagement from "./components/SellerCenter/OrderManagement";
import AboutUsPage from "./components/LandingPage/AboutUsPage";
import ViewFarmers from "./components/LandingPage/ViewFarmers"; 
import NotFoundPage from "./components/UI/NotFoundPage";

const handleSearch = (query) => {
  if (query.trim()) {
    navigate(`/search-product-account?query=${encodeURIComponent(query.trim())}`);
  }
};

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
        <Route path="/product/:productSlug" element={<MainLayout><ProductDetails /></MainLayout>} />
        <Route path="/" element={<MainLayout onSearch={handleSearch}><Marketplace /></MainLayout>} />
        <Route path="/userprofile" element={<MainLayout><UserProfilePage/></MainLayout>} />
        <Route path="/orderhistory" element={<OrderLayout><OrderHistory/></OrderLayout>} />
        <Route path="/cartpage" element={<OrderLayout><CartPage /></OrderLayout>} />
        <Route path="/chatpage" element={<OrderLayout><ChatPage/></OrderLayout>} />
        <Route path="/checkoutpage" element={<OrderLayout><CheckoutPage/></OrderLayout>} />
        <Route path="/checkout-success" element={<OrderLayout><CheckoutSuccess /></OrderLayout>} />
        <Route path="/search-product" element={<MainLayout><SearchProduct /></MainLayout>} />
        <Route path="/searched-farmers" element={<MainLayout><SearchedFarmers /></MainLayout>} />
        <Route path="/no-results" element={<MainLayout><NoResults /></MainLayout>} />
        <Route path="/marketplace" element={<MarketplaceWithAccount />} />
        <Route path="/featured-products" element={<FeaturedProducts />} />
        <Route path="/seller-center" element={<SellerCenter />} />
        <Route path="/daily-needs" element={<YourDailyBinhiNeeds />} />
        <Route path="/search-product-account" element={<SearchProductWithAccount />} />
        <Route path="/order-management" element={<OrderManagement/>} />
        <Route path="/about-us" element={<MainLayout><AboutUsPage/></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>}/>
      </Routes>
    </Router>
  );
}

  export default App;