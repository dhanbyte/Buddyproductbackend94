import React, { useState, useMemo } from "react";
import { FiSearch, FiHeart, FiStar, FiArrowLeft, FiFilter, FiShoppingCart, FiUser } from "react-icons/fi";

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

// Sample product data
const products: Product[] = [
  {
    id: "1",
    name: "Buy Giloy Churna – Ayurvedic Churna",
    brand: "ayurvedic-shop",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 399,
    image: "https://ashramestore.com/wp-content/uploads/2025/07/1751815597giloy_churna_rs20-600x741.jpg",
    extraImages: [
      "https://via.placeholder.com/300x300/22c55e/ffffff?text=Giloy+1",
      "https://via.placeholder.com/300x300/22c55e/ffffff?text=Giloy+2",
      "https://via.placeholder.com/300x300/22c55e/ffffff?text=Giloy+3"
    ],
    material: "Pure Herb Extract",
    size: "60 tablets",
    description: "Pure Ashwagandha tablets for stress relief and energy boost"
  },
  {
    id: "2",
    name: "Triphala Churna",
    brand: "ayurvedic-shop",
    category: "Churna",
    quantity: 1,
    price: 299,
    image: "https://via.placeholder.com/300x300/16a34a/ffffff?text=Triphala",
    extraImages: [
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Triphala+1",
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Triphala+2",
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Triphala+3"
    ],
    material: "Amalaki, Bibhitaki, Haritaki",
    size: "200g",
    description: "Triphala powder for digestive health and detoxification"
  },
  {
    id: "3",
    name: "Giloy Tablets",
    brand: "ayurvedic-shop",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 349,
    image: "https://via.placeholder.com/300x300/65a30d/ffffff?text=Giloy+Tablets",
    extraImages: [
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Giloy+1",
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Giloy+2",
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Giloy+3"
    ],
    material: "Giloy Extract",
    size: "60 tablets",
    description: "Giloy tablets for immunity boosting and fever management"
  },
  {
    id: "4",
    name: "Turmeric Capsules",
    brand: "ayurvedic-shop",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 449,
    image: "https://via.placeholder.com/300x300/d97706/ffffff?text=Turmeric",
    extraImages: [
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Turmeric+1",
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Turmeric+2",
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Turmeric+3"
    ],
    material: "Curcumin Extract",
    size: "60 capsules",
    description: "Turmeric capsules with 95% curcumin for inflammation"
  },
  {
    id: "5",
    name: "Amla Juice",
    brand: "ayurvedic-shop",
    category: "Healthy-Juice",
    quantity: 1,
    price: 399,
    image: "https://via.placeholder.com/300x300/ea580c/ffffff?text=Amla+Juice",
    extraImages: [
      "https://via.placeholder.com/300x300/ea580c/ffffff?text=Amla+1",
      "https://via.placeholder.com/300x300/ea580c/ffffff?text=Amla+2",
      "https://via.placeholder.com/300x300/ea580c/ffffff?text=Amla+3"
    ],
    material: "Pure Amla Extract",
    size: "500ml",
    description: "100% natural Amla juice rich in Vitamin C"
  },
  {
    id: "6",
    name: "Aloe Vera Juice",
    brand: "ayurvedic-shop",
    category: "Healthy-Juice",
    quantity: 1,
    price: 349,
    image: "https://via.placeholder.com/300x300/65a30d/ffffff?text=Aloe+Vera",
    extraImages: [
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Aloe+1",
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Aloe+2",
      "https://via.placeholder.com/300x300/65a30d/ffffff?text=Aloe+3"
    ],
    material: "Pure Aloe Vera",
    size: "1L",
    description: "Aloe Vera juice for digestive health and detoxification"
  },
  {
    id: "7",
    name: "Neem Tablets",
    brand: "ayurvedic-shop",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 279,
    image: "https://via.placeholder.com/300x300/15803d/ffffff?text=Neem+Tablets",
    extraImages: [
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Neem+1",
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Neem+2",
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Neem+3"
    ],
    material: "Neem Extract",
    size: "60 tablets",
    description: "Neem tablets for blood purification and skin health"
  },
  {
    id: "8",
    name: "Brahmi Powder",
    brand: "ayurvedic-shop",
    category: "Churna",
    quantity: 1,
    price: 379,
    image: "https://via.placeholder.com/300x300/0d9488/ffffff?text=Brahmi+Powder",
    extraImages: [
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Brahmi+1",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Brahmi+2",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Brahmi+3"
    ],
    material: "Brahmi Herb",
    size: "150g",
    description: "Brahmi powder for brain health and memory enhancement"
  },
  {
    id: "9",
    name: "Shilajit Capsules",
    brand: "ayurvedic-shop",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 599,
    image: "https://via.placeholder.com/300x300/713f12/ffffff?text=Shilajit",
    extraImages: [
      "https://via.placeholder.com/300x300/713f12/ffffff?text=Shilajit+1",
      "https://via.placeholder.com/300x300/713f12/ffffff?text=Shilajit+2",
      "https://via.placeholder.com/300x300/713f12/ffffff?text=Shilajit+3"
    ],
    material: "Purified Shilajit",
    size: "60 capsules",
    description: "Pure Himalayan Shilajit capsules for energy and vitality"
  },
  {
    id: "10",
    name: "Moringa Powder",
    brand: "ayurvedic-shop",
    category: "Churna",
    quantity: 1,
    price: 249,
    image: "https://via.placeholder.com/300x300/3f6212/ffffff?text=Moringa+Powder",
    extraImages: [
      "https://via.placeholder.com/300x300/3f6212/ffffff?text=Moringa+1",
      "https://via.placeholder.com/300x300/3f6212/ffffff?text=Moringa+2",
      "https://via.placeholder.com/300x300/3f6212/ffffff?text=Moringa+3"
    ],
    material: "Moringa Leaves",
    size: "200g",
    description: "Nutrient-rich moringa powder for energy and vitamins"
  },
  {
    id: "11",
    name: "Wheatgrass Juice",
    brand: "ayurvedic-shop",
    category: "Healthy-Juice",
    quantity: 1,
    price: 299,
    image: "https://via.placeholder.com/300x300/166534/ffffff?text=Wheatgrass",
    extraImages: [
      "https://via.placeholder.com/300x300/166534/ffffff?text=Wheatgrass+1",
      "https://via.placeholder.com/300x300/166534/ffffff?text=Wheatgrass+2",
      "https://via.placeholder.com/300x300/166534/ffffff?text=Wheatgrass+3"
    ],
    material: "Organic Wheatgrass",
    size: "500ml",
    description: "Wheatgrass juice for detoxification and energy"
  },
  {
    id: "12",
    name: "Arnica Montana",
    brand: "ayurvedic-shop",
    category: "Homeopathic-Medicines",
    quantity: 1,
    price: 199,
    image: "https://via.placeholder.com/300x300/4d7c0f/ffffff?text=Arnica",
    extraImages: [
      "https://via.placeholder.com/300x300/4d7c0f/ffffff?text=Arnica+1",
      "https://via.placeholder.com/300x300/4d7c0f/ffffff?text=Arnica+2",
      "https://via.placeholder.com/300x300/4d7c0f/ffffff?text=Arnica+3"
    ],
    material: "Homeopathic Preparation",
    size: "30ml",
    description: "Arnica Montana for pain relief and bruise healing"
  },
  {
    id: "13",
    name: "Brass Pooja Lamp",
    brand: "ayurvedic-shop",
    category: "Pooja-Items",
    quantity: 1,
    price: 449,
    image: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Pooja+Lamp",
    extraImages: [
      "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Lamp+1",
      "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Lamp+2",
      "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Lamp+3"
    ],
    material: "Pure Brass",
    size: "Medium",
    description: "Handcrafted brass pooja lamp for daily worship"
  },
  {
    id: "14",
    name: "Neem Toothpaste",
    brand: "Oral Care Ayurveda",
    category: "Daily-Needs",
    quantity: 1,
    price: 149,
    image: "https://via.placeholder.com/300x300/15803d/ffffff?text=Neem+Toothpaste",
    extraImages: [
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Toothpaste+1",
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Toothpaste+2",
      "https://via.placeholder.com/300x300/15803d/ffffff?text=Toothpaste+3"
    ],
    material: "Neem Extract",
    size: "100g",
    description: "Ayurvedic toothpaste with neem for dental health"
  },
  {
    id: "15",
    name: "Herbal Shampoo",
    brand: "Hair Care Ayurveda",
    category: "Daily-Needs",
    quantity: 1,
    price: 299,
    image: "https://via.placeholder.com/300x300/0d9488/ffffff?text=Herbal+Shampoo",
    extraImages: [
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Shampoo+1",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Shampoo+2",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Shampoo+3"
    ],
    material: "Natural Herbs",
    size: "200ml",
    description: "Herbal shampoo for hair growth and dandruff control"
  },
  {
    id: "16",
    name: "Sandalwood Powder",
    brand: "Pure Ayurveda",
    category: "Churna",
    quantity: 1,
    price: 349,
    image: "https://via.placeholder.com/300x300/d97706/ffffff?text=Sandalwood",
    extraImages: [
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Sandalwood+1",
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Sandalwood+2",
      "https://via.placeholder.com/300x300/d97706/ffffff?text=Sandalwood+3"
    ],
    material: "Pure Sandalwood",
    size: "100g",
    description: "Sandalwood powder for skin care and religious rituals"
  },
  {
    id: "17",
    name: "Tulsi Capsules",
    brand: "Respiratory Care",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 329,
    image: "https://via.placeholder.com/300x300/16a34a/ffffff?text=Tulsi+Capsules",
    extraImages: [
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Tulsi+1",
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Tulsi+2",
      "https://via.placeholder.com/300x300/16a34a/ffffff?text=Tulsi+3"
    ],
    material: "Tulsi Extract",
    size: "60 capsules",
    description: "Tulsi capsules for respiratory health and immunity"
  },
  {
    id: "18",
    name: "Guggul Capsules",
    brand: "Cholesterol Care",
    category: "Ayurvedic-Medicine",
    quantity: 1,
    price: 549,
    image: "https://via.placeholder.com/300x300/ca8a04/ffffff?text=Guggul+Capsules",
    extraImages: [
      "https://via.placeholder.com/300x300/ca8a04/ffffff?text=Guggul+1",
      "https://via.placeholder.com/300x300/ca8a04/ffffff?text=Guggul+2",
      "https://via.placeholder.com/300x300/ca8a04/ffffff?text=Guggul+3"
    ],
    material: "Guggul Extract",
    size: "60 capsules",
    description: "Guggul capsules for cholesterol management"
  },
  {
    id: "19",
    name: "Shatavari Powder",
    brand: "Women Wellness",
    category: "Churna",
    quantity: 1,
    price: 429,
    image: "https://via.placeholder.com/300x300/db2777/ffffff?text=Shatavari+Powder",
    extraImages: [
      "https://via.placeholder.com/300x300/db2777/ffffff?text=Shatavari+1",
      "https://via.placeholder.com/300x300/db2777/ffffff?text=Shatavari+2",
      "https://via.placeholder.com/300x300/db2777/ffffff?text=Shatavari+3"
    ],
    material: "Shatavari Root",
    size: "150g",
    description: "Shatavari powder for women's health and hormonal balance"
  },
  {
    id: "20",
    name: "Herbal Face Wash",
    brand: "Skin Care Ayurveda",
    category: "Daily-Needs",
    quantity: 1,
    price: 249,
    image: "https://via.placeholder.com/300x300/0d9488/ffffff?text=Herbal+Face+Wash",
    extraImages: [
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Face+Wash+1",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Face+Wash+2",
      "https://via.placeholder.com/300x300/0d9488/ffffff?text=Face+Wash+3"
    ],
    material: "Natural Herbs",
    size: "100ml",
    description: "Herbal face wash for clean and acne-free skin"
  }
];

const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeFilter === "All" || product.category === activeFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(products.map(p => p.category))];
    return cats;
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

  // Add to cart function
  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  // Product Detail View
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center text-teal-600 hover:text-teal-800 transition-colors mr-4"
              >
                <FiArrowLeft className="mr-2" /> Back to Products
              </button>
              <h1 className="text-2xl font-bold text-teal-800">Ayurvedic Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiShoppingCart className="text-2xl text-teal-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <FiUser className="text-2xl text-teal-600" />
            </div>
          </div>
        </header>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
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
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                  }}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-md"
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
      </div>
    );
  }

  // Product List View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-800">Ayurvedic Store</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiShoppingCart className="text-2xl text-teal-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </div>
            <FiUser className="text-2xl text-teal-600" />
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
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="flex items-center">
            <button 
              className="md:hidden flex items-center px-4 py-2 bg-teal-600 text-white rounded-full mr-2 shadow-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="mr-2" /> Filters
            </button>
            
            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex space-x-2 flex-wrap`}>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`px-4 py-2 rounded-full font-medium ${activeFilter === category ? "bg-teal-600 text-white" : "bg-white text-gray-700 border border-gray-300"} shadow-sm`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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
                        addToCart(product);
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

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 Ayurvedic Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AyurvedicProducts;