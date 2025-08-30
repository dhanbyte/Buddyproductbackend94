import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiArrowLeft, FiFilter, FiShoppingBag, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";

// Define tech product structure
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  extraImages?: string[];
  description: string;
  rating?: number;
}

// Categories for Tech
const techCategories = [
  {
    key: "Gadgets",
    name: "Gadgets",
    img: "https://img.icons8.com/color/96/000000/1f4f1-mobile-phone.png",
  },
  {
    key: "Wearables",
    name: "Wearables",
    img: "https://img.icons8.com/color/96/000000/apple-watch-apps.png",
  },
  {
    key: "Accessories",
    name: "Accessories",
    img: "https://img.icons8.com/color/96/000000/usb-cable.png",
  },
  {
    key: "Smart Home",
    name: "Smart Home",
    img: "https://img.icons8.com/color/96/000000/smart-home-connection.png",
  },
  {
    key: "Best-Sellers",
    name: "Best Sellers",
    img: "https://img.icons8.com/color/96/000000/best-seller.png",
  },
  {
    key: "New-Arrivals",
    name: "New Arrivals",
    img: "https://img.icons8.com/color/96/000000/new.png",
  },
];

// Example tech products list (replace with actual data!)
const techProducts: Product[] = [
  {
    id: "1",
    name: "Smart Bluetooth Speaker",
    brand: "EchoSound",
    category: "Gadgets",
    price: 2299,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=60",
    description: "Portable speaker with Alexa built-in.",
    rating: 4.6,
    extraImages: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=60"
    ]
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    brand: "Beats",
    category: "Accessories",
    price: 3999,
    image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?auto=format&fit=crop&w=600&q=60",
    description: "Crisp sound. Sleek design. All day battery.",
    rating: 4.8
  },
  {
    id: "3",
    name: "Smart Fitness Band",
    brand: "FitLife",
    category: "Wearables",
    price: 1299,
    image: "https://images.unsplash.com/photo-1519864606094-6c18b7cca8e0?auto=format&fit=crop&w=600&q=60",
    description: "Track your steps, heart rate and sleep.",
    rating: 4.3
  },
  {
    id: "4",
    name: "WiFi Smart Plug",
    brand: "PlugIt",
    category: "Smart Home",
    price: 799,
    image: "https://images.unsplash.com/photo-1526171111119-97b5ad71e569?auto=format&fit=crop&w=600&q=60",
    description: "Control appliances remotely via app/voice.",
    rating: 4.7
  },
  {
    id: "5",
    name: "Magnetic Phone Stand",
    brand: "HoldX",
    category: "Accessories",
    price: 299,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=60",
    description: "360° rotation, strong magnetic grip.",
    rating: 4.4
  },
];

const TechProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return techProducts.filter(product => {
      const matchCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Stars
  const renderStars = (rating: number = 4.5) => (
    Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} size={14} />
    ))
  );

  // Product Detail View
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <div className="md:grid grid-cols-2 gap-4 space-y-4 md:space-y-0">
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full max-w-xs h-56 object-contain rounded-lg" />
            {selectedProduct.extraImages && (
              <div className="flex gap-2 mt-2">
                {selectedProduct.extraImages.map((img, i) => (
                  <img key={i} src={img} alt={`${selectedProduct.name} extra`} className="w-12 h-12 object-cover rounded border" />
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
            <h1 className="text-xl font-bold">{selectedProduct.name}</h1>
            <div className="text-xs text-gray-600 mb-1">{selectedProduct.brand}</div>
            <div className="flex items-center mt-1">
              {renderStars(selectedProduct.rating)}
              <span className="ml-1 text-gray-500">({selectedProduct.rating ?? 4.5})</span>
            </div>
            <div className="text-blue-600 font-bold text-lg mb-1">₹{selectedProduct.price}</div>
            <div className="text-gray-700 mb-2 text-sm">{selectedProduct.description}</div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                onClick={() => {
                  toast.success(`${selectedProduct.name} added to cart!`, {autoClose: 1700});
                }}
              >
                <FiShoppingBag className="inline mr-1" /> Add to Cart
              </button>
              <button className="w-10 h-10 border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-50">
                <FiHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Categories and Cards UI
  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      {/* Top Categories */}
      <div className="text-center my-3">
        <h2 className="font-bold text-xl mb-2">Top Categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-4 justify-items-center">
          {techCategories.map(cat => (
            <div
              key={cat.key}
              className="flex flex-col items-center cursor-pointer p-2 group"
              onClick={() => setSelectedCategory(cat.key)}
            >
              <img src={cat.img} alt={cat.name} className="w-14 h-14 mb-2 object-cover group-hover:scale-105 transition-transform" />
              <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-blue-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search, filters, and back to categories */}
      <div className="flex items-center justify-between mb-3">
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 text-xs md:text-sm"
          >
            <FiArrowLeft className="mr-1" /> All Categories
          </button>
        )}
        <div className="relative flex-1 ml-2">
          <input
            type="text"
            placeholder="Search tech products..."
            className="w-full py-2 pl-8 pr-3 rounded-full border text-xs border-gray-200 focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="ml-1 flex items-center px-2 py-2 bg-blue-600 text-white rounded-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter />
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-2 flex flex-col hover:shadow-lg transition relative"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative overflow-hidden rounded-lg h-24 md:h-36 mb-1 cursor-pointer">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform" />
                <button
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                  style={{ zIndex: 2 }}
                  onClick={e => e.stopPropagation()}
                >
                  <FiHeart className="text-gray-500 hover:text-pink-500" />
                </button>
              </div>
              <span className="truncate font-semibold text-xs md:text-sm">{product.name}</span>
              <span className="text-[10px] text-gray-500">{product.brand}</span>
              <div className="flex items-center">{renderStars(product.rating)}<span className="ml-1 text-[10px] text-gray-400">{product.rating ?? 4.5}</span></div>
              <span className="text-blue-600 font-bold text-xs md:text-base mt-1">₹{product.price}</span>
              <button
                onClick={e => {
                  e.stopPropagation();
                  toast.success(`${product.name} added to cart!`, {autoClose: 1300});
                }}
                className="bg-blue-500 text-white px-2 py-1 mt-1 rounded-md hover:bg-blue-600 flex items-center justify-center text-xs"
              >
                <FiShoppingBag className="mr-1" /> Add
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600 text-base">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechProducts;
