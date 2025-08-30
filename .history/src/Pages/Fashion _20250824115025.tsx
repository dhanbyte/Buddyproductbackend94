/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiHeart,
  FiStar,
  FiFilter,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";
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
  color?: string;
  rating?: number;
}

// Category info map
const categoryInfo: Record<
  string,
  { title: string; description: string; image: string }
> = {
  "Men-Fashion": {
    title: "Men's Fashion",
    description: "Trendy outfits and styles for men.",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=60",
  },
  "Women-Fashion": {
    title: "Women's Fashion",
    description: "Discover elegance and comfort with women's fashion.",
    image:
      "https://images.unsplash.com/photo-1529903384028-929ae5dccdf1?auto=format&fit=crop&w=600&q=60",
  },
  Footwear: {
    title: "Footwear",
    description: "Step into the latest footwear trends.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=60",
  },
  Accessories: {
    title: "Accessories",
    description: "Stunning add-ons for every occasion.",
    image:
      "https://images.unsplash.com/photo-1590649880760-2d4b0f523de7?auto=format&fit=crop&w=600&q=60",
  },
  "Traditional-Wear": {
    title: "Traditional Wear",
    description: "Classic fashion rooted in tradition.",
    image:
      "https://images.unsplash.com/photo-1532453288350-4a8ab59a4b21?auto=format&fit=crop&w=600&q=60",
  },
  "Sports-Wear": {
    title: "Sports Wear",
    description: "Activewear for performance and style.",
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=600&q=60",
  },
};

const FashionProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // Filter products based on selected category and search
  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(
        (product) =>
          product.category === selectedCategory &&
          (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, []);

  // Featured products logic (top 3 high rating)
  const featuredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products
      .filter((p) => p.category === selectedCategory)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 3);
  }, [selectedCategory]);

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
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex mt-4 gap-2">
              {selectedProduct.extraImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProduct.name} view ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer border border-gray-200"
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600 mb-4">
              Brand: <span className="font-semibold text-indigo-600">{selectedProduct.brand}</span>
            </p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(selectedProduct.rating)}</div>
              <span className="text-gray-600">({selectedProduct.rating})</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600 mb-6">₹{selectedProduct.price}</p>
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-1">Material: {selectedProduct.material}</li>
                <li className="mb-1">Size: {selectedProduct.size}</li>
                <li className="mb-1">Color: {selectedProduct.color || "Various"}</li>
                <li className="mb-1">Category: {selectedProduct.category}</li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <button
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md flex items-center justify-center"
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
                <FiShoppingBag className="mr-2" /> Add to Cart
              </button>
              <button className="flex items-center justify-center w-12 h-12 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
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
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16 rounded-2xl mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">Fashion Collection</h1>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6 text-lg">
              Discover the latest trends in fashion. From casual wear to formal attire, we have everything you need to style up.
            </p>
            <div className="relative w-full md:w-1/2 mx-auto">
              <input
                type="text"
                placeholder="Search fashion items..."
                className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
        {/* Categories Grid */}
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Men's Fashion */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Men-Fashion")}
            >
              <img
                src={categoryInfo["Men-Fashion"].image}
                alt="Men's Fashion"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Men's Fashion</h3>
                <p className="text-sm">From ₹499</p>
                <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Women's Fashion */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Women-Fashion")}
            >
              <img
                src={categoryInfo["Women-Fashion"].image}
                alt="Women's Fashion"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Women's Fashion</h3>
                <p className="text-sm">From ₹599</p>
                <button className="mt-2 bg-pink-500 hover:bg-pink-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Footwear */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Footwear")}
            >
              <img
                src={categoryInfo["Footwear"].image}
                alt="Footwear"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Footwear</h3>
                <p className="text-sm">From ₹799</p>
                <button className="mt-2 bg-amber-500 hover:bg-amber-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Accessories */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Accessories")}
            >
              <img
                src={categoryInfo["Accessories"].image}
                alt="Accessories"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Accessories</h3>
                <p className="text-sm">From ₹199</p>
                <button className="mt-2 bg-teal-500 hover:bg-teal-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Traditional Wear */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Traditional-Wear")}
            >
              <img
                src={categoryInfo["Traditional-Wear"].image}
                alt="Traditional Wear"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Traditional Wear</h3>
                <p className="text-sm">From ₹1299</p>
                <button className="mt-2 bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
            {/* Sports Wear */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedCategory("Sports-Wear")}
            >
              <img
                src={categoryInfo["Sports-Wear"].image}
                alt="Sports Wear"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">Sports Wear</h3>
                <p className="text-sm">From ₹899</p>
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded text-white font-medium">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <DealsNearby />
      </div>
    );
  }

  // Category Banner and Featured Products Display (TOP)
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Category Banner */}
      {selectedCategory && (
        <div className="mb-8">
          <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 rounded-2xl shadow-md">
            <img
              src={categoryInfo[selectedCategory]?.image}
              alt={categoryInfo[selectedCategory]?.title}
              className="w-32 h-32 object-cover rounded-xl ring-2 ring-indigo-400"
            />
            <div>
              <h1 className="text-3xl font-bold text-indigo-800">
                {categoryInfo[selectedCategory]?.title}
              </h1>
              <p className="text-gray-600 text-lg my-2">
                {categoryInfo[selectedCategory]?.description}
              </p>
              <span className="inline-block bg-indigo-200 text-indigo-900 px-4 py-1 rounded-full text-sm font-semibold">
                {filteredProducts.length} Styles Available
              </span>
            </div>
          </div>
          {/* Featured products slider/cards */}
          {featuredProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-indigo-700 mb-3">
                Featured Picks
              </h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {featuredProducts.map((fp) => (
                  <div
                    key={fp.id}
                    className="min-w-[220px] bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition cursor-pointer"
                    onClick={() => setSelectedProduct(fp)}
                  >
                    <img
                      src={fp.image}
                      alt={fp.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <div className="mt-2">
                      <h4 className="text-base font-semibold">{fp.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{fp.brand}</p>
                      <div>{renderStars(fp.rating)}</div>
                      <span className="block text-indigo-600 font-bold">₹{fp.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Categories
        </button>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button
            className="ml-2 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="mr-2" /> Filters
          </button>
        </div>
      </div>
      {/* Category Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        {selectedCategory?.replace(/-/g, " ")} in Ahmedabad
      </h2>
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow"
            >
              <div
                className="cursor-pointer block"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
                    <FiHeart className="text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <h3 className="text-base font-semibold mt-2 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">by {product.brand}</p>
                <div className="flex items-center mt-1">
                  {/* {renderStars(product.rating)} */}
                  {/* <span className="text-xs text-gray-500 ml-1">({product.rating})</span> */}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-indigo-600 font-bold text-sm">
                  ₹{product.price}
                </span>
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
                  className="bg-indigo-500 text-white px-3 py-1 text-sm rounded-md hover:bg-indigo-600 flex items-center"
                >
                  <FiShoppingBag className="mr-1" /> Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">
              No products found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FashionProducts;
