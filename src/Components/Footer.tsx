import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/Images/Bazarbuddy.png" alt="BazaarBuddy" className="h-16 w-16" />
              <span className="text-xl font-bold text-teal-600">BazaarBuddy</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for flash deals, unique bundles, and top sellers. Shop smart, shop BazaarBuddy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-teal-600 cursor-pointer"><Link to="/">Home</Link></li>
              <li className="hover:text-teal-600 cursor-pointer"><Link to="/ayurvedic">Categories</Link></li>
              <li className="hover:text-teal-600 cursor-pointer"><Link to="/">Flash Deals</Link></li>
              <li className="hover:text-teal-600 cursor-pointer"><Link to="/support">Customer Support</Link></li>
              <li className="hover:text-teal-600 cursor-pointer">
                <Link to="/admin/login" className="flex items-center">
                  <span>Admin Login</span>
                  <span className="ml-1 text-xs bg-gray-200 px-1 rounded">Staff</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@bazaarbuddy.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Ahmedabad, India</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-md font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4 text-xl text-gray-600">
              <a href="#" className="hover:text-teal-600">🌐</a>
              <a href="#" className="hover:text-teal-600">📘</a>
              <a href="#" className="hover:text-teal-600">📸</a>
              <a href="#" className="hover:text-teal-600">🐦</a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BazaarBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
