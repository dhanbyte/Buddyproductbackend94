/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import { FiMenu, FiX, FiUser, FiSearch, FiShoppingCart, FiHome, FiGrid } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../data/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/FirebaseSdk";

const Navbar = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        {/* Outer full-width container */}
        <div className="w-full">
          {/* Centered content container */}
          <div className="w-full px-0 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img
                    src="/Images/Bazarbuddy.png"
                    alt="BazaarBuddy"
                    className="h-16 cursor-pointer w-16"
                  />
                </Link>
                <Link to="/" className="text-xl font-bold text-teal-600 cursor-pointer">
                  BazaarBuddy
                </Link>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 mx-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="text-gray-700 hover:text-teal-600 mx-8 font-medium"
                >
                  Home
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-teal-600 font-medium">
                    Categories
                  </button>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40">
                    <ul className="py-2">
                      <li
                        onClick={handleLinkClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Kitchen
                      </li>
                      <li
                        onClick={handleLinkClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Electronics
                      </li>
                      <li
                        onClick={handleLinkClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Toys
                      </li>
                    </ul>
                  </div>
                </div>

                <span
                  onClick={handleLinkClick}
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  Flash Deals
                </span>

                {/* Cart Icon with Badge - Desktop */}
                <Link
                  to="/cart"
                  onClick={handleLinkClick}
                  className="relative flex items-center text-gray-700 hover:text-teal-600"
                >
                  <FiShoppingCart className="text-xl lg:text-2xl" />
                  <span className="ml-1 text-xs lg:text-[15px]">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User Profile - Desktop */}
                {loading ? (
                  <span className="text-gray-400 text-sm">Checking...</span>
                ) : user ? (
                  <div onClick={handleLinkClick} className="relative group">
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600">
                      <FiUser className="text-xl lg:text-2xl" />
                      <span className="text-xs lg:text-[15px]">
                        {user.email?.split("@")[0]}
                      </span>
                    </button>
                    <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-40 right-0 z-50">
                      <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <Link to="/profile" onClick={handleLinkClick}>
                            My Profile
                          </Link>
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            signOut(auth);
                            handleLinkClick();
                          }}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 text-gray-700 hover:text-teal-600"
                  >
                    <FiUser className="text-xl lg:text-2xl" />
                    <span className="text-xs lg:text-[15px]">Login</span>
                  </Link>
                )}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <Link
                  to="/cart"
                  onClick={handleLinkClick}
                  className="relative mr-4 text-gray-700"
                >
                  <FiShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-2 ${location.pathname === '/' ? 'text-teal-600 font-semibold' : 'text-gray-700'}`}
                >
                  <FiHome size={18} />
                  <span>Home</span>
                </Link>
              </li>
              
              {/* Category Toggle */}
              <li className="flex flex-col">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="flex justify-between items-center text-gray-700 hover:text-teal-600 font-medium w-full"
                >
                  <div className="flex items-center space-x-2">
                    <FiGrid size={18} />
                    <span>Categories</span>
                  </div>
                  <span
                    className={`transform transition-transform duration-200 ${
                      categoryOpen ? "rotate-90" : ""
                    }`}
                  >
                    &gt;
                  </span>
                </button>

                {categoryOpen && (
                  <ul className="mt-2 ml-6 space-y-2">
                    <li
                      onClick={handleLinkClick}
                      className="hover:text-teal-600 cursor-pointer"
                    >
                      Kitchen
                    </li>
                    <li
                      onClick={handleLinkClick}
                      className="hover:text-teal-600 cursor-pointer"
                    >
                      Electronics
                    </li>
                    <li
                      onClick={handleLinkClick}
                      className="hover:text-teal-600 cursor-pointer"
                    >
                      Toys
                    </li>
                  </ul>
                )}
              </li>

              {/* Flash Deals */}
              <li
                onClick={handleLinkClick}
                className="text-orange-600 font-semibold"
              >
                Flash Deals
              </li>

              {/* Search in mobile menu */}
              <li className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 py-2 px-6">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center ${location.pathname === '/' ? 'text-teal-600' : 'text-gray-600'}`}
          >
            <FiHome size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to="/categories"
            className={`flex flex-col items-center ${location.pathname === '/categories' ? 'text-teal-600' : 'text-gray-600'}`}
          >
            <FiGrid size={20} />
            <span className="text-xs mt-1">Categories</span>
          </Link>
          
          <Link
            to="/cart"
            className={`flex flex-col items-center relative ${location.pathname === '/cart' ? 'text-teal-600' : 'text-gray-600'}`}
          >
            <FiShoppingCart size={20} />
            <span className="text-xs mt-1">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-3 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {loading ? (
            <div className="flex flex-col items-center text-gray-400">
              <FiUser size={20} />
              <span className="text-xs mt-1">Loading...</span>
            </div>
          ) : user ? (
            <Link
              to="/profile"
              className={`flex flex-col items-center ${location.pathname === '/profile' ? 'text-teal-600' : 'text-gray-600'}`}
            >
              <FiUser size={20} />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className={`flex flex-col items-center ${location.pathname === '/login' ? 'text-teal-600' : 'text-gray-600'}`}
            >
              <FiUser size={20} />
              <span className="text-xs mt-1">Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;