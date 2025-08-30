import { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiStar, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import {products} from "../data/data"
const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Ayurve dic products data
  const products = [
    {
      id: 1,
      name: "Triphala Powder",
      seller: "AyurVeda Essentials",
      price: 349,
      rating: 4.8,
      description: "A traditional Ayurvedic formulation made from three fruits. Supports digestion, detoxification and overall wellness.",
      benefits: ["Improves digestion", "Natural detoxifier", "Rich in antioxidants"],
      ingredients: "Haritaki, Bibhitaki, Amalaki",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80"
    },
    {
      id: 2,
      name: "Ashwagandha Capsules",
      seller: "Herbal Wellness",
      price: 499,
      rating: 4.7,
      description: "Helps reduce stress and anxiety, improves sleep quality, and boosts immunity.",
      benefits: ["Reduces stress", "Improves sleep", "Boosts immunity"],
      ingredients: "Pure Ashwagandha root extract",
      image: "https://images.unsplash.com/photo-1550754190-fc32953deecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80"
    },
    {
      id: 3,
      name: "Aloe Vera Face Cream",
      seller: "Natural Skin Care",
      price: 299,
      rating: 4.5,
      description: "100% natural face cream with aloe vera and turmeric. Nourishes and rejuvenates skin.",
      benefits: ["Moisturizes skin", "Reduces inflammation", "Natural glow"],
      ingredients: "Aloe vera, Turmeric, Almond oil",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
    },
    {
      id: 4,
      name: "Tulsi Immunity Booster",
      seller: "Organic India",
      price: 249,
      rating: 4.6,
      description: "Enhances natural immunity with the power of Tulsi and other medicinal herbs.",
      benefits: ["Boosts immunity", "Respiratory health", "Rich in antioxidants"],
      ingredients: "Tulsi, Giloy, Ginger",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 5,
      name: "Neem Soap",
      seller: "AyurClean",
      price: 199,
      rating: 4.4,
      description: "Antibacterial neem soap for clear and healthy skin. Fights acne and skin infections.",
      benefits: ["Treats acne", "Antibacterial", "Soothes skin"],
      ingredients: "Neem extract, Tea tree oil, Aloe vera",
      image: "https://images.unsplash.com/photo-1590172205848-3db961eb0cd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      name: "Sesame Oil",
      seller: "Ancient Remedies",
      price: 399,
      rating: 4.9,
      description: "100% pure sesame oil for massage and cooking. Promotes healthy skin and hair.",
      benefits: ["Ayurvedic massage", "Healthy hair", "Cooking oil"],
      ingredients: "Pure sesame seeds",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
    }
  ];

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

  // Product Detail View
  if (selectedProduct !== null) {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/Images/Bazarbuddy.png"
                alt="BazaarBuddy"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-teal-600">BazaarBuddy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative text-gray-700">
                <FiShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">3</span>
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
            className="flex items-center text-teal-600 mb-6"
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
              <p className="text-gray-600 mb-4">Sold by: <span className="font-semibold">{product.seller}</span></p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>
              
              <p className="text-2xl font-bold text-teal-600 mb-6">₹{product.price}</p>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Benefits:</h3>
                <ul className="list-disc pl-5">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700 mb-1">{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                <p className="text-gray-700">{product.ingredients}</p>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                  Add to Cart
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-teal-600 text-teal-600 rounded-lg">
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
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Images/Bazarbuddy.png"
              alt="BazaarBuddy"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-teal-600">BazaarBuddy</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700">
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">3</span>
            </Link>
            <Link to="/profile" className="text-gray-700">
              <FiUser size={24} />
            </Link>
          </div>
        </div>
      </header>

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
              className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              // Add onChange handler if you want to enable search filter.
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-teal-100 text-teal-800 rounded-lg font-medium">All</button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium">Herbs</button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium">Oils</button>
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium">Skincare</button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden product-card cursor-pointer"
              onClick={() => setSelectedProduct(product.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">By {product.seller}</p>
                
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-600 text-sm">({product.rating})</span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-teal-600 font-bold">₹{product.price}</span>
                  <button className="bg-teal-100 text-teal-800 px-3 py-1 rounded-lg text-sm font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
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
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Ayurvedic Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="benefit-icon mr-3">
                <span className="text-white text-xl">🌿</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">100% Natural</h3>
                <p className="text-gray-700">Made from natural ingredients without harmful chemicals</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="benefit-icon mr-3">
                <span className="text-white text-xl">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Traditional Wisdom</h3>
                <p className="text-gray-700">Based on ancient Ayurvedic principles and formulations</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="benefit-icon mr-3">
                <span className="text-white text-xl">🌎</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Eco-Friendly</h3>
                <p className="text-gray-700">Sustainable sourcing and environmentally conscious packaging</p>
              </div>
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
                Your one-stop shop for flash deals, unique bundles, and top sellers. Shop smart, shop BazaarBuddy.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Flash Deals</a></li>
                <li><Link to="/ayurvedic" className="text-gray-400 hover:text-white">Ayurvedic Products</Link></li>
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
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube"></i>
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
