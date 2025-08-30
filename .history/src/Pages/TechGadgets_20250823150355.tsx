/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiStar, FiFilter, FiArrowLeft, FiShoppingCart, FiCpu, FiSmartphone, FiHeadphones, FiMonitor } from "react-icons/fi";
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DealsNearby from "../Components/DealsNearby";

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
  rating?: number;
  discount?: number;
}

const TechGadgets = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Tech categories
  const techCategories = [
    { id: "smartphones", name: "Smartphones", icon: <FiSmartphone /> },
    { id: "laptops", name: "Laptops", icon: <FiMonitor /> },
    { id: "audio", name: "Audio", icon: <FiHeadphones /> },
    { id: "smart-watches", name: "Smart Watches", icon: <FiCpu /> },
    { id: "tablets", name: "Tablets", icon: <FiMonitor /> },
    { id: "gaming", name: "Gaming", icon: <FiCpu /> },
    { id: "cameras", name: "Cameras", icon: <FiCpu /> },
    { id: "accessories", name: "Accessories", icon: <FiCpu /> },
  ];

  // Add default ratings and discounts to products
  const enhancedProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
    //   rating: product.rating || Math.floor(Math.random() * 2) + 3.5, // Random rating between 3.5-5.5
    //   discount: product.discount || (Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0) // 30% chance of discount
    }));
  }, []);

  // Filter products based on selected category and search
  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return enhancedProducts.filter(product => 
        product.category === selectedCategory &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return enhancedProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery, enhancedProducts]);

  // Rating stars utility
  const renderStars = (rating: number = 4.5) => {
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
    const productRating = selectedProduct.rating || 4.5;
    const productDiscount = selectedProduct.discount || 0;
    
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-72 object-contain rounded-lg"
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            {productDiscount > 0 && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {productDiscount}% OFF
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600 mb-4">Brand: <span className="font-semibold text-blue-600">{selectedProduct.brand}</span></p>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(productRating)}
              </div>
              <span className="text-gray-600">({productRating.toFixed(1)})</span>
            </div>
            
            <div className="flex items-center mb-6">
              <p className="text-2xl font-bold text-blue-600">₹{selectedProduct.price}</p>
              {productDiscount > 0 && (
                <p className="ml-3 text-lg text-gray-500 line-through">
                  ₹{Math.round(selectedProduct.price * 100 / (100 - productDiscount))}
                </p>
              )}
            </div>
            
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
              <button 
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center"
                onClick={() => {
                  addToCart(selectedProduct);
                  toast.success(`${selectedProduct.name} added to cart!`, {
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
              >
                <FiShoppingCart className="mr-2" /> Add to Cart
              </button>
              <button className="flex items-center justify-center w-12 h-12 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">TechGadgets Store</h1>
            <p className="text-gray-200 max-w-2xl mx-auto mb-6">
              Discover the latest tech gadgets and electronics with cutting-edge technology and innovation.
            </p>
            <div className="relative w-full md:w-1/2 mx-auto">
              <input
                type="text"
                placeholder="Search tech products..."
                className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techCategories.map(category => (
              <div 
                key={category.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md hover:border-blue-200"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-center font-medium text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {enhancedProducts.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                <div 
                  className="cursor-pointer block"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain rounded"
                  />
                  <h3 className="text-sm font-semibold mt-2 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500">by {product.brand}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500">({product.rating?.toFixed(1)})</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold text-sm">
                      ₹{product.price}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DealsNearby/>
      </div>
    );
  }

  // Products View
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Categories
        </button>
        
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <button 
            className="ml-2 flex items-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Category Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 capitalize">
        {selectedCategory.replace(/-/g, " ")}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 hover:shadow-md transition">
              <div 
                className="cursor-pointer block"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded"
                />
                <h3 className="text-sm font-semibold mt-2 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500">by {product.brand}</p>
                <div className="flex items-center mt-1">
                  <div className="flex mr-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating?.toFixed(1)})</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-600 font-bold text-sm">
                    ₹{product.price}
                  </span>
                  {product.discount && product.discount > 0 && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
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
                className="w-full mt-3 bg-blue-600 text-white py-2 text-sm rounded hover:bg-blue-700 flex items-center justify-center"
              >
                <FiShoppingCart className="mr-1" /> Add to Cart
              </button>
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

export default TechGadgets;