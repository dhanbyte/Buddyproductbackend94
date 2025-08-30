import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiStar, FiFilter, FiArrowLeft } from "react-icons/fi";
import { products } from "../data/data"; // Use your single products JSON (with tech products included!)
import { useCart } from "../data/CartContext";

// Product type from your main JSON
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

// If want to restrict to only tech categories, list them here (must match .category in your products data):
const techCategoryNames = [
  "Smartphones", "Wearables", "Accessories", "Audio", "Smart Home"
];

const TechProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  // All UNIQUE categories from products that are for tech (comes from the JSON)
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .filter((p) => techCategoryNames.includes(p.category))
            .map((p) => p.category)
        )
      ),
    []
  );

  // Filter products: only show products in the tech categories
  const techProducts = useMemo(
    () =>
      products.filter((p) =>
        techCategoryNames.includes(p.category)
      ),
    [products]
  );

  // Filter products for display based on category and search
  const filteredProducts = useMemo(() => {
    let result = techProducts;
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, searchQuery, techProducts]);

  // Star rating
  const renderStars = (rating: number = 4.5) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));

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
            <div className="flex gap-2 mt-2 flex-wrap">
              {selectedProduct.extraImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-600 mb-4">
              Brand: <span className="font-semibold text-teal-600">{selectedProduct.brand}</span>
            </p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(4.5)}</div>
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
              <button
                className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-md"
                onClick={() => addToCart(selectedProduct)}
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
    );
  }

  // Top: Search/filter bar + category title
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        {selectedCategory
          ? (
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-teal-600 hover:text-teal-800 transition-colors">
              <FiArrowLeft className="mr-2" /> Back to Categories
            </button>
          ) : <div />
        }
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
      {selectedCategory && (
        <h2 className="text-xl md:text-2xl font-bold mb-6">{selectedCategory.replace(/-/g, " ")} in Ahmedabad</h2>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded shadow p-3">
              <div
                className="cursor-pointer block"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-54 object-cover rounded"
                />
                <h3 className="text-base font-semibold mt-2">{product.name}</h3>
                <p className="text-xs text-gray-500">by {product.brand}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-600 font-bold text-sm">
                  ₹{product.price}
                </span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-teal-500 text-white px-2 py-1 text-sm rounded hover:bg-teal-600"
                >
                  Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">No products found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Bottom: Category Grid, like Ayurveda page */}
      {!selectedCategory && (
        <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              // Get first image from a product of that category to display
              const sampleProduct = techProducts.find(p => p.category === cat);
              return (
                <div
                  key={cat}
                  className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer group"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {sampleProduct && (
                    <img
                      src={sampleProduct.image}
                      alt={cat}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{cat.replace(/-/g, " ")}</h3>
                    <button className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-1 rounded text-white font-medium">
                      Shop Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechProducts;
