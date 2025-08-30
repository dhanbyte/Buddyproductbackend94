import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiHome, FiGrid, FiUser, FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../data/CartContext";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="w-full">
          <div className="w-full px-0 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <img src="/Images/Bazarbuddy.png" alt="BazaarBuddy" className="h-16 cursor-pointer w-16" />
                </Link>
                <Link to="/" className="text-xl font-bold text-teal-600 cursor-pointer">BazaarBuddy</Link>
              </div>

              {/* Desktop Search Bar */}
              <div className="hidden md:flex flex-1 mx-6">
                <SearchBar />
              </div>

              <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
                <Link 
                  to="/" 
                  onClick={handleLinkClick} 
                  className="text-gray-700 hover:text-teal-600 mx-8 font-medium flex items-center group"
                >
                  <FiHome className="mr-2 group-hover:scale-110 transition-transform" />
                  <span>Home</span>
                </Link>
                <div className="relative group">
                  <button className="text-gray-700 hover:text-teal-600 font-medium flex items-center">
                    <FiGrid className="mr-2 group-hover:rotate-90 transition-transform" />
                    <span>Categories</span>
                  </button>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 transform transition-all duration-200 scale-95 group-hover:scale-100">
                    <ul className="py-2">
                      <li onClick={handleLinkClick} className="px-4 py-2 hover:bg-teal-50 cursor-pointer flex items-center space-x-2">
                        <img src="/Images/kitchen-icon.png" alt="" className="w-5 h-5" />
                        <span>Kitchen</span>
                      </li>
                      <li onClick={handleLinkClick} className="px-4 py-2 hover:bg-teal-50 cursor-pointer flex items-center space-x-2">
                        <img src="/Images/electronics-icon.png" alt="" className="w-5 h-5" />
                        <span>Electronics</span>
                      </li>
                      <li onClick={handleLinkClick} className="px-4 py-2 hover:bg-teal-50 cursor-pointer flex items-center space-x-2">
                        <img src="/Images/toys-icon.png" alt="" className="w-5 h-5" />
                        <span>Toys</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="relative">
                  <span onClick={handleLinkClick} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                    <span className="animate-pulse">🔥</span>
                    <span>Flash Deals</span>
                  </span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">New</span>
                </div>
                <Link 
                  to="/search" 
                  onClick={handleLinkClick} 
                  className="flex items-center text-gray-700 hover:text-teal-600 group"
                >
                  <FiSearch className="text-xl lg:text-2xl group-hover:scale-110 transition-transform" />
                  <span className="ml-2 text-sm lg:text-base font-medium">Search</span>
                </Link>
                <Link 
                  to="/cart" 
                  onClick={handleLinkClick} 
                  className="relative flex items-center text-gray-700 hover:text-teal-600 group"
                >
                  <div className="relative">
                    <FiShoppingCart className="text-xl lg:text-2xl group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg group-hover:shadow-sky-200 transition-all">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="ml-2 text-sm lg:text-base font-medium">Cart</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <SignedIn>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Welcome back!</span>
                      <div className="relative group">
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "hover:ring-2 hover:ring-teal-500 transition-all"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                        <FiUser className="text-xl" />
                        <span className="text-sm font-medium">Login</span>
                      </button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </nav>

              <div className="md:hidden flex items-center">
                <Link to="/search" onClick={handleLinkClick} className="relative mr-3 text-gray-700 group">
                  <FiSearch size={22} className="group-hover:scale-110 transition-transform" />
                </Link>
                <Link to="/cart" onClick={handleLinkClick} className="relative mr-4 text-gray-700 group">
                  <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && 
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg animate-pulse">
                      {cartCount}
                    </span>
                  }
                </Link>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {menuOpen ? 
                    <FiX size={24} className="text-red-500" /> : 
                    <FiMenu size={24} className="text-gray-700" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-4 py-4">
                <ul className="flex flex-col space-y-4">
                  {/* Mobile Search */}
                  <li className="pt-2">
                    <SearchBar />
                  </li>
                  <li>
                    <Link 
                      to="/" 
                      onClick={handleLinkClick} 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        location.pathname === '/' 
                          ? 'bg-teal-50 text-teal-600 font-semibold' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <FiHome size={20} />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="flex flex-col">
                    <button 
                      onClick={() => setCategoryOpen(!categoryOpen)} 
                      className="flex justify-between items-center w-full p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FiGrid size={20} />
                        <span className="font-medium">Categories</span>
                      </div>
                      <span className={`transform transition-transform duration-200 ${categoryOpen ? "rotate-90" : ""}`}>
                        →
                      </span>
                    </button>
                    {categoryOpen && (
                      <ul className="mt-2 ml-6 space-y-2 bg-gray-50 rounded-lg p-3">
                        <li onClick={handleLinkClick} className="flex items-center space-x-2 p-2 hover:bg-white rounded-md cursor-pointer">
                          <img src="/Images/kitchen-icon.png" alt="" className="w-5 h-5" />
                          <span>Kitchen</span>
                        </li>
                        <li onClick={handleLinkClick} className="flex items-center space-x-2 p-2 hover:bg-white rounded-md cursor-pointer">
                          <img src="/Images/electronics-icon.png" alt="" className="w-5 h-5" />
                          <span>Electronics</span>
                        </li>
                        <li onClick={handleLinkClick} className="flex items-center space-x-2 p-2 hover:bg-white rounded-md cursor-pointer">
                          <img src="/Images/toys-icon.png" alt="" className="w-5 h-5" />
                          <span>Toys</span>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <div className="relative">
                      <button 
                        onClick={handleLinkClick} 
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                      >
                        <span className="animate-pulse">🔥</span>
                        <span>Flash Deals</span>
                      </button>
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
                        New
                      </span>
                    </div>
                  </li>
                  <li className="pt-4 border-t border-gray-200">
                    <SignedIn>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <UserButton afterSignOutUrl="/" />
                        <div>
                          <span className="font-semibold block">My Account</span>
                          <span className="text-sm text-gray-500">View profile & orders</span>
                        </div>
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="w-full flex items-center justify-center space-x-2 bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition-colors">
                          <FiUser size={20} />
                          <span>Login / Register</span>
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 py-2 px-6 shadow-lg">
        <div className="flex justify-around items-center">
          <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-teal-600' : 'text-gray-600'}`} onClick={handleLinkClick}><FiHome size={20} /><span className="text-xs mt-1">Home</span></Link>
          <button onClick={() => setCategoryOpen(!categoryOpen)} className={`flex flex-col items-center ${categoryOpen ? 'text-teal-600' : 'text-gray-600'}`}><FiGrid size={20} /><span className="text-xs mt-1">Categories</span></button>
          <Link to="/cart" className={`flex flex-col items-center relative ${location.pathname === '/cart' ? 'text-teal-600' : 'text-gray-600'}`} onClick={handleLinkClick}><div className="relative"><FiShoppingCart size={20} />{cartCount > 0 && <span className="absolute -top-2 -right-3 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">{cartCount}</span>}</div><span className="text-xs mt-1">Cart</span></Link>
          <div className="flex flex-col items-center text-gray-600">
            <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
            <SignedOut><SignInButton mode="modal"><button className="flex flex-col items-center"><FiUser size={20} /><span className="text-xs mt-1">Login</span></button></SignInButton></SignedOut>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;