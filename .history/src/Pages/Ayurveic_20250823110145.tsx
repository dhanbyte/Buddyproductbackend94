import { useState, useMemo } from "react";
import { FiSearch,  FiHeart, FiStar, FiArrowLeft, FiFilter} from "react-icons/fi";
import { products } from "../data/data";
import { useCart } from "../data/CartContext";
import { toast } from "react-toastify";

const AyurvedicProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart,  } = useCart();

  // Filter only Ayurvedic products from ayurvedic-shop seller
  const ayurvedicProducts = products.filter(product => 
    product.brand.toLowerCase().includes("ayurvedic-shop")
  );

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return ayurvedicProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeFilter === "All";
      
      return matchesSearch && matchesCategory;
    });
  }, [ayurvedicProducts, searchQuery, activeFilter]);

  // Testimonials
 

  // Rating stars utility
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        size={16}
      />
    ));
  };

  // Get cart items count

  // Product Detail View
  if (selectedProduct !== null) {
    const product = ayurvedicProducts.find(p => p.id === selectedProduct);
    if (!product) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}


        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Ayurvedic Products
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">Sold by: <span className="font-semibold text-teal-600">{product.seller}</span></p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(4.5)}
                </div>
                <span className="text-gray-600">(4.5)</span>
              </div>
              
              <p className="text-2xl font-bold text-teal-600 mb-6">₹{product.price}</p>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li className="mb-1">Material: {product.material}</li>
                  <li className="mb-1">Size: {product.size}</li>
                  {/* <li className="mb-1">Height: {product.height} cm</li> */}
                  {/* <li className="mb-1">Width: {product.width} cm</li> */}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
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
              <button 
                className={`px-4 py-2 rounded-full font-medium ${activeFilter === "All" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border border-gray-300"} shadow-sm`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
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
                onClick={() => setSelectedProduct(product.id)}
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
                  <p className="text-gray-600 text-sm mb-2">By {product.seller}</p>
                  
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
                        toast.success(`${product.name} added to cart!`);
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
      
    </div>
  );
};

export default AyurvedicProducts;