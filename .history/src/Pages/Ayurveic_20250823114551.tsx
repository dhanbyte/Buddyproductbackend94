import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiStar, FiFilter } from "react-icons/fi";
import { products } from "./data";

// Define product type
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  extraImages: string[];
  material: string;
  size: string;
  description: string;
}

const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on selected category and search
  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(product => 
        product.category === selectedCategory &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, []);

  // Rating stars utility
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));
  };

  // Product Detail View
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600 mb-4">Brand: <span className="font-semibold text-teal-600">{selectedProduct.brand}</span></p>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(4.5)}
              </div>
              <span className="text-gray-600">(4.5)</span>
            </div>
            
            <p className="text-2xl font-bold text-teal-600 mb-6">₹{selectedProduct.price}</p>
            
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-1">Material: {selectedProduct.material}</li>
                <li className="mb-1">Size: {selectedProduct.size}</li>
                <li className="mb-1">Category: {selectedProduct.category}</li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-md">
                Add to Cart
              </button>
              <button className="flex items-center justify-center w-12 h-12 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
                <FiHeart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category View
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 py-12 rounded-2xl mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-teal-800 mb-4">Ayurvedic Products</h1>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6">
              Discover natural wellness with our authentic Ayurvedic products. Handcrafted with care using traditional methods.
            </p>
            <div className="relative w-full md:w-1/2 mx-auto">
              <input
                type="text"
                placeholder="Search Ayurvedic products..."
                className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Ayurvedic-Medicine")}
            >
              <div className="h-40 bg-teal-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Ayurvedic Medicine</h3>
              <p className="text-gray-600 mb-4">From $20</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>

            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Healthy-Juice")}
            >
              <div className="h-40 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🥤</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Healthy Juice</h3>
              <p className="text-gray-600 mb-4">From $30</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>

            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Churna")}
            >
              <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🍚</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Churna</h3>
              <p className="text-gray-600 mb-4">From $15</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>

            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Pooja-Items")}
            >
              <div className="h-40 bg-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🪔</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Pooja Items</h3>
              <p className="text-gray-600 mb-4">From $10</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>

            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Homeopathic-Medicines")}
            >
              <div className="h-40 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">💊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Homeopathic Medicines</h3>
              <p className="text-gray-600 mb-4">From $40</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>

            <div 
              className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedCategory("Daily-Needs")}
            >
              <div className="h-40 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🧴</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Daily Needs</h3>
              <p className="text-gray-600 mb-4">From $25</p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Products View
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Categories
        </button>
        
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <button 
            className="ml-2 flex items-center px-4 py-2 bg-teal-600 text-white rounded-full shadow-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Category Title */}
      <h2 className="text-2xl font-bold text-teal-800 mb-6">
        {selectedCategory.replace(/-/g, " ")}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden product-card cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => setSelectedProduct(product)}
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
                <p className="text-gray-600 text-sm mb-2">By {product.brand}</p>
                
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
                      // Add to cart functionality
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
    </div>
  );
};

export default AyurvedicProducts;