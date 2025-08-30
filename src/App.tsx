import Home from "./Home";
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/signUp";
import CartPage from "./Pages/CartPage";
import ProductsDetailsPage from "./Pages/ProductsDetailsPage";
import Footer from "../src/Components/Footer";
import { ToastContainer } from "react-toastify";
import BuyerDashboard from "./Pages/BuyerDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Profile from "./Pages/Profile";
import AuthWrapper from "./Auth/AuthWrapper";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import SearchPage from "./Pages/SearchPage";
import WishlistPage from "./Pages/WishlistPage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import CategoryPage from "./Pages/CategoryPage";
import CustomerSupportPage from "./Pages/CustomerSupportPage";
import React, { useEffect } from "react";

// Admin Components
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminProducts from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import AdminLogin from "./Pages/AdminLogin";

// Import API services
import { ProductAPI, OrderAPI, UserAPI } from "./lib/api";
import { ENDPOINTS, getApiUrl } from "./lib/api-endpoints";

function App() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup" || isAdminRoute;
  const hideFooter = location.pathname === "/login" || location.pathname === "/signup" || isAdminRoute;

  // Affiliate tracking
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      // Track the click on the backend
      fetch(`${getApiUrl('/affiliates/track-click')}?ref=${refCode}`)
        .then(res => res.json())
        .then(data => console.log("Affiliate click tracked:", data))
        .catch(err => console.error("Error tracking affiliate click:", err));

      // Store the ref code in local storage for later use (e.g., when placing an order)
      localStorage.setItem('affiliateRef', refCode);
    }
  }, [searchParams]);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/products" element={<AdminProducts />} />
                <Route path="/orders" element={<AdminOrders />} />
              </Routes>
            </AdminLayout>
          }
        />

        {/* User Routes */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <AuthWrapper>
                <BuyerDashboard />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['admin', 'buyer']}>
              <AuthWrapper>
                <Profile />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile/orders"
          element={
            <ProtectedRoute allowedRoles={['admin', 'buyer']}>
              <AuthWrapper>
                <UserOrdersPage />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={['admin', 'buyer']}>
              <AuthWrapper>
                <CheckoutPage />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/order-confirmation"
          element={
            <ProtectedRoute allowedRoles={['admin', 'buyer']}>
              <AuthWrapper>
                <OrderConfirmationPage />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/wishlist"
          element={
            <ProtectedRoute allowedRoles={['admin', 'buyer']}>
              <AuthWrapper>
                <WishlistPage />
              </AuthWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Public Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductsDetailsPage />} />
        <Route path="/support" element={<CustomerSupportPage />} />
        {/* Generic Category Route - MUST be last among public routes to avoid conflicts */}
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>

      <ToastContainer />
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;