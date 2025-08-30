import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiArrowLeft, FiFilter, FiShoppingBag, FiStar } from "react-icons/fi";
// Sample products array (replace this import with your actual data import)
import { products } from "../data/data"; 
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";

// Product type
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
  color?: string;
  rating?: number;
}

// Category images
const categoryCards = [
  {
    key: "Healthy-Juice",
    name: "Healthy Juice",
    price: 30,
    img: "https://ashramestore.com/wp-content/uploads/2023/02/product-category-banners-700x385-1-600x330.jpg",
    btn: "Shop Now"
  },
  {
    key: "Ayurvedic-Medicine",
    name: "Ayurvedic Medicine",
    price: 20,
    img: "https://ashramestore.com/wp-content/uploads/2023/04/ayurvedic-medicine-600x330.jpg",
    btn: "Shop Now"
  },
  {
    key: "Homeopathic-Medicines",
    name: "Homeopathic Medicines",
    price: 40,
    img: "https://ashramestore.com/wp-content/uploads/2023/09/Homeopathy-Medicine-1-600x330.jpg",
    btn: "Shop Now"
  },
  {
    key: "Churna",
    name: "Churna",
    price: 15,
    img: "https://ashramestore.com/wp-content/uploads/2023/09/Churna-600x330.png",
    btn: "Shop Now"
  },
  {
    key: "Pooja-Items",
    name: "Pooja Items",
    price: 10,
    img: "https://ashramestore.com/wp-content/uploads/2023/04/pooja-items-600x330.jpg",
    btn: "Shop Now"
  },
  {
    key: "Daily-Needs",
    name: "Daily Needs",
    price: 25,
    img: "https://ashramestore.com/wp-content/uploads/2023/04/FMCG-1-600x330.jpg",
    btn: "Shop Now"
  }
];

const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Filter products based on category/search
  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(
        product =>
          product.category === selectedCategory &&
          (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return products.filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  // Responsive rating stars
  const renderStars = (rating: number = 4.5) => {
    return Array.from({ length: 5 }, (_, idx) => (
      <FiStar
        key={idx}
        className={idx < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={14}
      />
    ));
  };

  // Product Detail Overlay
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-teal-600 mb-4 hover:text-teal-800"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <div className="md:grid grid-cols-2 gap-4 space-y-4 md:space-y-0">
          <div className="bg-white rounded-xl shadow-md p-2 flex flex-col items-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-xs h-60 object-contain rounded-lg"
            />
            <div className="flex gap-2 mt-2">
              {selectedProduct.extraImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${selectedProduct.name} view ${i + 1}`}
                  className="w-12 h-12 object-cover rounded border"
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
            <h1 className="text-xl md:text-2xl font-bold">{selectedProduct.name}</h1>
            <div className="text-xs text-gray-600 mb-1">{selectedProduct.brand}</div>
            <div className="flex items-center mt-1">
              {renderStars(selectedProduct.rating)}
              <span className="ml-1 text-gray-500">({selectedProduct.rating || 4.5})</span>
            </div>
            <div className="text-green-600 font-bold text-lg mb-1">₹{selectedProduct.price}</div>
            <div className="text-gray-700 mb-2 text-sm">{selectedProduct.description}</div>
            <ul className="text-xs text-gray-700 mb-2">
              <li>Material: {selectedProduct.material}</li>
              <li>Size: {selectedProduct.size}</li>
              <li>Color: {selectedProduct.color || "Various"}</li>
              <li>Category: {selectedProduct.category}</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <button
                className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-teal-700"
                onClick={() => {
                  addToCart(selectedProduct);
                  toast.success(`${selectedProduct.name} added to cart!`, {
                    position: "top-right",
                    autoClose: 2000
                  });
                }}
              >
                <FiShoppingBag className="inline mr-1" /> Add to Cart
              </button>
              <button className="w-10 h-10 border border-teal-600 text-teal-600 rounded-lg flex items-center justify-center hover:bg-teal-50">
                <FiHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main View: Categories (top) and Products grid (below)
  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      {/* Hero Section */}
      {!selectedCategory && (
        <>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 mb-4">
            <h1 className="text-xl md:text-3xl font-bold text-teal-800 text-center mb-1">Ayurvedic Products</h1>
            <p className="text-xs md:text-base text-gray-700 text-center mb-2">
              Discover authentic Ayurvedic and herbal products. Handpicked for your wellness.
            </p>
            <div className="relative w-full md:w-1/2 mx-auto mb-2">
              <input
                type="text"
                placeholder="Search Ayurvedic products..."
                className="w-full py-2 pl-8 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs md:text-base"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {categoryCards.map(category => (
              <div
                key={category.key}
                className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
                onClick={() => setSelectedCategory(category.key)}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-24 md:h-32 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <div className="text-base md:text-lg font-medium">{category.name}</div>
                  <div className="text-xs">From ₹{category.price}</div>
                  <button className="mt-1 bg-teal-500 hover:bg-teal-600 px-2 py-1 rounded text-xs md:text-sm">{category.btn}</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Category Title and Search/Back Bar */}
      {selectedCategory && (
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center text-teal-600 hover:text-teal-800 text-xs md:text-base"
          >
            <FiArrowLeft className="mr-1" /> Back to Categories
          </button>
          <div className="flex items-center w-2/3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-8 pr-3 rounded-full border text-xs border-gray-300 focus:ring-2 focus:ring-teal-400"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              className="ml-1 flex items-center px-2 py-2 bg-teal-600 text-white rounded-full shadow-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div
        className={
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 " +
          (filteredProducts.length === 0
            ? "place-items-center"
            : "")
        }
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-2 flex flex-col hover:shadow-lg transition relative"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden rounded-lg h-32 md:h-36 mb-1 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                />
                <button
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                  style={{ zIndex: 2 }}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <FiHeart className="text-gray-500 hover:text-pink-500" />
                </button>
              </div>
              <div className="flex flex-col flex-grow">
                <span className="truncate font-semibold text-xs md:text-sm">{product.name}</span>
                <span className="text-[10px] text-gray-500">{product.brand}</span>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-1 text-[10px] text-gray-400">{product.rating || 4.5}</span>
                </div>
                <span className="text-teal-600 font-bold text-xs md:text-base mt-1">
                  ₹{product.price}
                </span>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart(product);
                  toast.success(`${product.name} added to cart!`, {
                    position: "top-right",
                    autoClose: 1500
                  });
                }}
                className="bg-teal-500 text-white px-2 py-1 text-xs rounded-md hover:bg-teal-600 mt-1 flex items-center justify-center"
              >
                <FiShoppingBag className="mr-1" /> Add
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600 text-lg">No products found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AyurvedicProducts;
