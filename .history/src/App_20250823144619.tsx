import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/signUp";
import CartPage from "./Pages/CartPage";
import ProductsDetailsPage from "./Pages/ProductsDetailsPage";
import { useLocation } from "react-router-dom";
import Footer from "../src/Components/Footer";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./Pages/AdminDashboard";
import SellerDashboard from "./Pages/SellerDashboard";
import BuyerDashboard from "./Pages/BuyerDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import RoleRedirect from "./Auth/RoleRedirect";
import Profile from "./Pages/Profile";
import AyurvedicProducts from "./Pages/Ayurveic";
import FashionProducts from "./Pages/Fashion ";
import TechGadgets from "./Pages/TechGadgets";
function App() {
  const Location = useLocation();
  const hideNavarbar =
    Location.pathname === "/login" || Location.pathname === "/signup";
  const hideFooter =
    Location.pathname === "/login" || Location.pathname === "/signup";
  return (
    <div>
      {!hideNavarbar && <Navbar />}
      <Routes>
        <Route path="login-success" element={<RoleRedirect />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
        <Route path="/ayurvedic" element={<AyurvedicProducts />} />
          <Route path="/fashion" element={<FashionProducts />} />
          <Route path="/tech" element={<TechGadgets />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductsDetailsPage />} />
      </Routes>

      <ToastContainer />
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
