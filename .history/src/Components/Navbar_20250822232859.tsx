/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import { FiMenu, FiX, FiUser, FiSearch, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../data/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Auth/FirebaseSdk";

const Navbar = () => {
  const { user, loading } = useAuth();
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  // const toggleCategory = () => {
  //   setCategoryOpen(!categoryOpen);
  // };
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  //const navigate = useNavigate();
  // const HandleLoginPage = () => {
  //   console.log("clicked");
  //   navigate("/login");
  // };
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      {/* Outer full-width container */}
      <div className="w-full">
        {/* Centered content container */}
        <div className="w-full px-0 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center  space-x-2">
              <Link to="/">
              <img
                src="/Images/Bazarbuddy.png"
                alt="BazaarBuddy"
                className="h-16  cursor-pointer w-16"
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
            <nav className="hidden md:space-x-2 md:flex items-center  space-x-10 lg:space-x-12">
              <Link
                to="/"
                onClick={handleLinkClick}
                className="text-gray-700 hover:text-teal-600 mx-8 font-medium"
              >
                Home
              </Link>
              <div className="relative  group">
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

              {/* Cart Icon with Badge */}
              <Link
                to="/cart"
                onClick={handleLinkClick}
                className="relative text-xs  items-center text-gray-700 hover:text-teal-600"
              >
                <FiShoppingCart className=" text-xl lg:text-2xl" />
                <span className="ml-1  lg:text-[15px]">Cart</span>
                <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </Link>

              {/* Login Button */}
              {loading ? (<span className="text-grey-400 text-sm"> checking login...</span>) : user ? (
                <div onClick={handleLinkClick} className="relative group">
                  <button className=" items-center space-x-1 text-gray-700 hover:text-teal-600">
                    <FiUser className="text-xl lg:text-2xl" />
                    {/* Email ka first part dikhado */}
                    <span className="text-xs lg:text-[15px]">
                      {user.email?.split("@")[0]}
                    </span>
                  </button>
                  {/* Dropdown */}
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
                          {
                            handleLinkClick;
                          }
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
                  className="flex items-center space-x-1 ml-2 text-gray-700 hover:text-teal-600"
                >
                  <FiUser className="text-xl lg:text-2xl" />
                  <span className="text-xs lg:text-[15px]">Login</span>
                </Link>
              )}
            </nav>
            {/* Cart Icon with Badge */}
            <Link
              to="/cart"
              onClick={handleLinkClick}
              className="text-gray-700 flex md:hidden  items-center space-x-1 relative"
            >
              <FiShoppingCart />
              <span>Cart</span>
              <span className="absolute -top-2 left-5 bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
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
      {/* Category Toggle */}
      <li className="flex flex-col">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex justify-between items-center text-gray-700 hover:text-teal-600 font-medium w-full"
        >
          <span>Categories</span>
          <span
            className={`transform transition-transform duration-200 ${
              categoryOpen ? "rotate-90" : ""
            }`}
          >
            &gt;
          </span>
        </button>

        {categoryOpen && (
          <ul className="mt-2 ml-4 space-y-2">
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

      {/* Login / Profile */}
      {loading ? (<span className="text-grey-400 text-sm"> checking loading...</span>) : user ? (
        <>
          <li className="flex items-center space-x-2 text-gray-700">
            <FiUser className="text-xl" />
            <span>{user.email?.split("@")[0]}</span>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-teal-600"
            >
              My Profile
            </Link>
          </li>
          <li
            className="text-gray-700 hover:text-teal-600 cursor-pointer"
            onClick={() => {
              signOut(auth);
              handleLinkClick();
            }}
          >
            Logout
          </li>
        </>
      ) : (
        <li>
          <Link
            to="/login"
            onClick={handleLinkClick}
            className="flex items-center space-x-2 text-gray-700 hover:text-teal-600"
          >
            <FiUser className="text-xl" />
            <span>Login</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)}
    </header>
  );
};

export default Navbar;
