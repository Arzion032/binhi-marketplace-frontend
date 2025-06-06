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
import CheckOutPage from "./components/CheckOut/CheckOutPage";
import CheckOutSuccess from "./components/Checkout/CheckOutSuccess";
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
import ViewAssociation from "./components/LandingPage/ViewAssociation"; 
import NotFoundPage from "./components/UI/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Associations from "./components/LandingPage/Associations";

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
        <Route path="/user-profile" element={<MainLayout><UserProfilePage/></MainLayout>} />
        <Route path="/orderhistory" element={<ProtectedRoute><OrderLayout><OrderHistory/></OrderLayout></ProtectedRoute>} />
        <Route path="/cartpage" element={<ProtectedRoute><OrderLayout><CartPage /></OrderLayout></ProtectedRoute>} />
        <Route path="/chatpage" element={<OrderLayout><ChatPage/></OrderLayout>} />
        <Route path="/checkoutpage" element={<MainLayout><CheckOutPage/></MainLayout>} />
        <Route path="/checkout-success" element={<MainLayout><CheckOutSuccess /></MainLayout>} />
        <Route path="/search-product" element={<MainLayout><SearchProduct /></MainLayout>} />
        <Route path="/searched-farmers" element={<MainLayout><SearchedFarmers /></MainLayout>} />
        <Route path="/no-results" element={<MainLayout><NoResults /></MainLayout>} />
        <Route path="/marketplace" element={<MarketplaceWithAccount />} />
        <Route path="/featured-products" element={<FeaturedProducts />} />
        <Route path="/seller-center" element={<SellerCenter />} />
        <Route path="/view-association" element={<ViewAssociation />} />
        <Route path="/daily-needs" element={<YourDailyBinhiNeeds />} />
        <Route path="/search-product-account" element={<SearchProductWithAccount />} />
        <Route path="/order-management" element={<OrderManagement/>} />
        <Route path="/about-us" element={<MainLayout><AboutUsPage/></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>}/>
        <Route path="/withAccount" element={<MarketplaceWithAccount />}/>
        <Route path="/associations" element={<Associations />}/>

      </Routes>
    </Router>
  );
}

  export default App;