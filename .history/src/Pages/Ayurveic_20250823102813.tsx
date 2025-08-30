import { useState, useMemo } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiStar, FiArrowLeft, FiFilter, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";

const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { addToCart,  } = useCart();

  // Filter only Ayurvedic products from ayurvedic-shop seller
  const ayurvedicProducts = products.filter(product => 
    product.seller.toLowerCase().includes("ayurvedic-shop")
  );

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return ayurvedicProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeFilter === "All";
      
      return matchesSearch && matchesCategory;
    });
  }, [ayurvedicProducts, searchQuery, activeFilter]);

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "The Triphala powder has done wonders for my digestion. I feel lighter and more energetic!"
    },
    {
      name: "Rahul Mehta",
      rating: 4,
      comment: "Ashwagandha capsules have really helped with my stress levels. I sleep better now."
    },
    {
      name: "Sunita Patel",
      rating: 5,
      comment: "The Neem soap cleared my acne in just two weeks. My skin has never been better!"
    }
  ];

  // Rating stars utility
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));
  };

  // Get cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Product Detail View
  if (selectedProduct !== null) {
    const product = ayurvedicProducts.find(p => p.id === selectedProduct);
    if (!product) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">BB</div>
              <span className="text-xl font-bold text-teal-600">BazaarBuddy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative text-gray-700">
                <FiShoppingCart size={24} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="text-gray-700">
                <FiUser size={24} />
              </Link>
            </div>
          </div>
        </header>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Ayurvedic Products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">Sold by: <span className="font-semibold text-teal-600">{product.seller}</span></p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(4.5)}
                </div>
                <span className="text-gray-600">(4.5)</span>
              </div>
              
              <p className="text-2xl font-bold text-teal-600 mb-6">₹{product.price}</p>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li className="mb-1">Material: {product.material}</li>
                  <li className="mb-1">Size: {product.size}</li>
                  <li className="mb-1">Height: {product.height} cm</li>
                  <li className="mb-1">Width: {product.width} cm</li>
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    addToCart(product);
                    toast.success(`${product.name} added to cart!`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-md"
                >
                  Add to Cart
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
                  <FiHeart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product List View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-3 text-gray-700"
              onClick={() => setShowMobileMenu(true)}
            >
              <FiMenu size={24} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">BB</div>
              <span className="text-xl font-bold text-teal-600">BazaarBuddy</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700">
              <FiShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-gray-700">
              <FiUser size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Menu</span>
                  <button onClick={() => setShowMobileMenu(false)}>
                    <FiX size={24} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
                  <ul className="space-y-2">
                    <li className="text-teal-600 font-medium">Ayurvedic Medicines</li>
                    <li className="text-gray-600">Homeopathy Medicines</li>
                    <li className="text-gray-600">Food & Drinks</li>
                    <li className="text-gray-600">Pooja Items</li>
                    <li className="text-gray-600">Daily Needs</li>
                    <li className="text-gray-600">Apparel</li>
                    <li className="text-gray-600">Dairy Products</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Navigation Bar */}
      <div className="bg-white shadow-sm border-t">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto whitespace-nowrap py-3 hide-scrollbar">
            <div className="inline-flex space-x-6 text-sm font-medium">
              <span className="text-teal-600 border-b-2 border-teal-600 pb-2">Ayurvedic Medicines</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Homeopathy Medicines</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Food & Drinks</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Pooja Items</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Daily Needs</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Apparel</span>
              <span className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">Dairy Products</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">Ayurvedic Products</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover natural wellness with our authentic Ayurvedic products. Handcrafted with care using traditional methods.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search Ayurvedic products..."
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="flex items-center">
            <button 
              className="md:hidden flex items-center px-4 py-2 bg-teal-600 text-white rounded-full mr-2 shadow-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="mr-2" /> Filters
            </button>
            
            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex space-x-2 flex-wrap`}>
              <button 
                className={`px-4 py-2 rounded-full font-medium ${activeFilter === "All" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border border-gray-300"} shadow-sm`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden product-card cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedProduct(product.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">By {product.seller}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(4.5)}
                    </div>
                    <span className="text-gray-600 text-sm">(4.5)</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-teal-600 font-bold text-lg">₹{product.price}</span>
                    <button 
                      className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No products found. Try a different search.</p>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-800">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose Ayurvedic Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-2xl">🌿</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Natural</h3>
              <p className="text-gray-700">Made from natural ingredients without harmful chemicals</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Traditional Wisdom</h3>
              <p className="text-gray-700">Based on ancient Ayurvedic principles and formulations</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-teal-600 text-2xl">🌎</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Eco-Friendly</h3>
              <p className="text-gray-700">Sustainable sourcing and environmentally conscious packaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BazaarBuddy</h3>
              <p className="text-gray-400">
                Your one-stop shop for authentic Ayurvedic products and natural wellness solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
                <li><Link to="/ayurvedic" className="text-gray-400 hover:text-white transition-colors">Ayurvedic Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: support@bazaarbuddy.com</li>
                <li className="text-gray-400">Phone: +91 98765 43210</li>
                <li className="text-gray-400">Ahmedabad, India</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 BazaarBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AyurvedicProducts;