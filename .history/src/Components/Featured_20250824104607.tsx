import { useState } from 'react';
import { products } from "../data/data";
import { useCart } from "../data/CartContext";

const getCategoryColor = (category) => {
  switch(category) {
    case 'tech': return 'bg-blue-100 text-blue-900 border-blue-400';
    case 'fashion': return 'bg-pink-100 text-pink-900 border-pink-400';
    case 'ayurvedic': return 'bg-green-100 text-green-900 border-green-400';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const categories = [
  { id: 'all', name: 'All', icon: '⭐' },
  { id: 'tech', name: 'Tech Gadgets', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'ayurvedic', name: 'Ayurvedic', icon: '🌿' },
];

const FeaturedBundles = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const filteredBundles =
    selectedCategory === 'all'
      ? products
      : products.filter(bundle => bundle.category === selectedCategory);

  const techBundles = products.filter(bundle => bundle.category === 'tech');

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-indigo-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 tracking-tight">
          Featured Bundles
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Discover our exclusive bundles curated just for you. Save more when you buy together!
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-5 py-3 font-semibold rounded-full shadow transition-all duration-300 text-lg border-2 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-100'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredBundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border-l-4 transition-transform duration-300 hover:scale-105 ${getCategoryColor(bundle.category)}`}
              style={{ borderLeftWidth: "7px" }}
            >
              {/* Bundle Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {bundle.discount && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    {bundle.discount}% OFF
                  </div>
                )}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow ${getCategoryColor(bundle.category)}`}>
                  {bundle.category.charAt(0).toUpperCase() + bundle.category.slice(1)}
                </div>
              </div>
              {/* Bundle Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{bundle.name}</h3>
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(bundle.rating ?? 0) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  {bundle.rating && (
                    <span className="text-gray-600 text-sm ml-2">{bundle.rating}</span>
                  )}
                </div>
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">₹{bundle.price.toFixed(2)}</span>
                    {bundle.discount && (
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ₹{(bundle.price / (1 - bundle.discount/100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
                    onClick={() => addToCart(bundle)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Catalog Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-extrabold text-blue-800 mb-6 flex items-center gap-2"><span>💻</span> Tech Gadgets Catalog</h3>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {techBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="min-w-[280px] max-w-[300px] bg-gradient-to-br from-blue-100 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-md flex-shrink-0 p-4 hover:scale-105 transition-transform"
              >
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="rounded-xl h-40 w-full object-cover mb-3 border-b"
                />
                <div className="font-bold text-blue-900 text-lg mb-2">{bundle.name}</div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg text-gray-900 font-bold">₹{bundle.price.toFixed(2)}</span>
                  {bundle.discount && (
                    <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">{bundle.discount}% OFF</span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm font-semibold text-gray-800">{bundle.rating}</span>
                </div>
                <button
                  className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-semibold shadow text-sm"
                  onClick={() => addToCart(bundle)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles;
