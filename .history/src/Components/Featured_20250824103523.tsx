import { useState } from 'react';
import { Bundle, Category } from '../types';

const bundles: Bundle[] = [
  { 
    id: 1, 
    name: "Smart Home Gadgets", 
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "tech",
    price: 299.99,
    discount: 15,
    rating: 4.8
  },
  { 
    id: 2, 
    name: "Summer Fashion Collection", 
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "fashion",
    price: 149.99,
    rating: 4.5
  },
  { 
    id: 3, 
    name: "Ayurvedic Wellness Kit", 
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "ayurvedic",
    price: 89.99,
    discount: 10,
    rating: 4.7
  },
  { 
    id: 4, 
    name: "Tech Workstation Bundle", 
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "tech",
    price: 499.99,
    discount: 20,
    rating: 4.9
  },
  { 
    id: 5, 
    name: "Traditional Ayurvedic Remedies", 
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "ayurvedic",
    price: 59.99,
    rating: 4.6
  },
  { 
    id: 6, 
    name: "Designer Handbag Collection", 
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "fashion",
    price: 249.99,
    discount: 30,
    rating: 4.4
  },
  { 
    id: 7, 
    name: "Wireless Earbuds & Charger", 
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "tech",
    price: 129.99,
    rating: 4.3
  },
  { 
    id: 8, 
    name: "Ayurvedic Skin Care Routine", 
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
    category: "ayurvedic",
    price: 79.99,
    discount: 15,
    rating: 4.7
  }
];

const FeaturedBundles = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  const categories: { id: Category; name: string; icon: string }[] = [
    { id: 'all', name: 'All Bundles', icon: '⭐' },
    { id: 'tech', name: 'Tech Gadgets', icon: '💻' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'ayurvedic', name: 'Ayurvedic', icon: '🌿' }
  ];
  
  const filteredBundles = selectedCategory === 'all' 
    ? bundles 
    : bundles.filter(bundle => bundle.category === selectedCategory);
  
  const getCategoryColor = (category: Category) => {
    switch(category) {
      case 'tech': return 'bg-blue-100 text-blue-800';
      case 'fashion': return 'bg-pink-100 text-pink-800';
      case 'ayurvedic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">Featured Bundles</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Discover our exclusive bundles curated just for you. Save more when you buy together!
        </p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
        
        {/* Bundles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBundles.map((bundle) => (
            <div key={bundle.id} className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              {/* Bundle Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-full object-cover"
                />
                {bundle.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {bundle.discount}% OFF
                  </div>
                )}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(bundle.category)}`}>
                  {bundle.category.charAt(0).toUpperCase() + bundle.category.slice(1)}
                </div>
              </div>
              
              {/* Bundle Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{bundle.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(bundle.rating) ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">{bundle.rating}</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${bundle.price.toFixed(2)}</span>
                    {bundle.discount && (
                      <span className="text-gray-500 text-sm line-through ml-2">
                        ${(bundle.price / (1 - bundle.discount/100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles;