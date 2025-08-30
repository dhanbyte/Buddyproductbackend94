import { useState } from 'react';
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";

// Helper for category color
const getCategoryColor = (category) => {
  switch(category) {
    case 'tech': return 'bg-blue-100 text-blue-900 border-blue-400';
    case 'fashion': return 'bg-pink-100 text-pink-900 border-pink-400';
    case 'ayurvedic': return 'bg-green-100 text-green-900 border-green-400';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

// Categories
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

  // Card click handler—adds to cart and shows toast:
  const handleCardClick = (bundle) => {
    addToCart(bundle);
    toast.success(`${bundle.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <section className="py-8 px-3 bg-gradient-to-br from-indigo-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-2 text-gray-800 tracking-tight">
          Featured Bundles
        </h2>
        <p className="text-gray-600 text-center mb-7 max-w-2xl mx-auto text-base">
          Discover our exclusive bundles curated just for you. Save more when you buy together!
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-3 sm:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-base rounded-full shadow transition-all duration-300 border-2 ${
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

        {/* Main Bundles Grid: 2 cards/row phone, 4/row laptop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {filteredBundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`bg-white rounded-xl overflow-hidden shadow-lg border-l-4 transition-transform duration-300 hover:scale-105 flex flex-col h-full cursor-pointer ${getCategoryColor(bundle.category)}`}
              style={{ borderLeftWidth: "7px" }}
              tabIndex={0}
              onClick={() => handleCardClick(bundle)}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(bundle);
              }}
              aria-label={`Add ${bundle.name} to cart`}
              role="button"
            >
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {bundle.discount && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
                    {bundle.discount}% OFF
                  </div>
                )}
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[0.7rem] font-bold shadow ${getCategoryColor(bundle.category)}`}>
                  {bundle.category.charAt(0).toUpperCase() + bundle.category.slice(1)}
                </div>
              </div>
              <div className="flex flex-col p-3 flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 line-clamp-2">{bundle.name}</h3>
                <div className="flex items-center mb-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(bundle.rating ?? 0) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  {bundle.rating && (
                    <span className="text-gray-600 text-xs ml-1">{bundle.rating}</span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-base sm:text-lg font-bold text-gray-900">₹{bundle.price.toFixed(2)}</span>
                    {bundle.discount && (
                      <span className="text-gray-500 text-xs line-through ml-1">
                        ₹{(bundle.price / (1 - bundle.discount/100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm font-semibold py-2 px-4 transition-colors"
                  tabIndex={-1}
                  aria-hidden="true"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Catalog, horizontal scroll, click-to-add */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-2xl font-extrabold text-blue-800 mb-4 flex items-center gap-2"><span>💻</span> Tech Gadgets Catalog</h3>
          <div className="flex space-x-4 overflow-x-auto pb-3">
            {techBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="min-w-[180px] max-w-[210px] bg-gradient-to-br from-blue-100 to-indigo-50 border-2 border-blue-200 rounded-lg shadow-md flex-shrink-0 p-3 hover:scale-105 transition-transform flex flex-col cursor-pointer"
                tabIndex={0}
                onClick={() => handleCardClick(bundle)}
                onKeyPress={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick(bundle);
                }}
                aria-label={`Add ${bundle.name} to cart`}
                role="button"
              >
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="rounded h-24 w-full object-cover mb-2 border-b"
                />
                <div className="font-bold text-blue-900 text-sm mb-1 line-clamp-2">{bundle.name}</div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-900 font-bold">₹{bundle.price.toFixed(2)}</span>
                  {bundle.discount && (
                    <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">{bundle.discount}% OFF</span>
                  )}
                </div>
                <div className="flex items-center mb-1">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-xs font-semibold text-gray-800">{bundle.rating}</span>
                </div>
                <button
                  className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded text-xs font-semibold py-1.5 transition-colors"
                  tabIndex={-1}
                  aria-hidden="true"
                  type="button"
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
