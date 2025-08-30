import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const hideNavarbar = Location.pathname === "/login" || Location.pathname === "/signup";
    const hideFooter = Location.pathname === "/login" || Location.pathname === "/signup";
    return (_jsxs("div", { children: [!hideNavarbar && _jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "login-success", element: _jsx(RoleRedirect, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { allowedRoles: "admin", children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/seller", element: _jsx(ProtectedRoute, { allowedRoles: "seller", children: _jsx(SellerDashboard, {}) }) }), _jsx(Route, { path: "/buyer", element: _jsx(ProtectedRoute, { allowedRoles: "buyer", children: _jsx(BuyerDashboard, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/ayurvedic", element: _jsx(AyurvedicProducts, {}) }), _jsx(Route, { path: "/fashion", element: _jsx(FashionProducts, {}) }), _jsx(Route, { path: "/tech", element: _jsx(TechGadgets, {}) }), _jsx(Route, { path: "/cart", element: _jsx(CartPage, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductsDetailsPage, {}) })] }), _jsx(ToastContainer, {}), !hideFooter && _jsx(Footer, {})] }));
}
export default App;
