import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import { ProductAPI, SearchAPI } from '../lib/api';

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: { original: number };
  image: string;
}

interface FilterOption {
  label: string;
  minPrice?: number;
  maxPrice?: number;
}

const CategoryPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/').pop() || ''; // Extract category from URL

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: '',
  });

  const priceFilters: FilterOption[] = [
    { label: 'All Prices' },
    { label: 'Under ₹99', maxPrice: 99 },
    { label: '₹100 - ₹499', minPrice: 100, maxPrice: 499 },
    { label: '₹500 - ₹999', minPrice: 500, maxPrice: 999 },
    { label: '₹1000 & Above', minPrice: 1000 },
  ];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Using SearchAPI for filtered product search
      const searchParams = {
        category: category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sortBy: filters.sortBy
      };
      
      const data = await SearchAPI.searchProducts(searchParams);
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePriceFilterChange = (filter: FilterOption) => {
    setFilters(prev => ({
      ...prev,
      minPrice: filter.minPrice ? String(filter.minPrice) : '',
      maxPrice: filter.maxPrice ? String(filter.maxPrice) : '',
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  const getCategoryBanner = () => {
    switch (category.toLowerCase()) {
      case 'ayurvedic': return { title: 'Natural Wellness', subtitle: 'Embrace the ancient wisdom of Ayurveda.', image: 'https://images.unsplash.com/photo-1589156191108-f48431970257?q=80&w=2070&auto=format&fit=crop' };
      case 'fashion': return { title: 'Style Redefined', subtitle: 'Discover the latest trends in fashion.', image: 'https://images.unsplash.com/photo-1487222477894-8943ece7aa26?q=80&w=2070&auto=format&fit=crop' };
      case 'tech': return { title: 'Future is Here', subtitle: 'Innovate with cutting-edge technology.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af036?q=80&w=2070&auto=format&fit=crop' };
      default: return { title: category.charAt(0).toUpperCase() + category.slice(1), subtitle: 'Explore our wide range of products.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06f2e0?q=80&w=2070&auto=format&fit=crop' };
    }
  };

  const banner = getCategoryBanner();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Banner */}
      <div className="relative w-full h-64 bg-cover bg-center rounded-lg shadow-lg mb-8" style={{ backgroundImage: `url(${banner.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4 rounded-lg">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{banner.title}</h1>
          <p className="text-lg md:text-xl mt-2 drop-shadow-md">{banner.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center"><FiFilter className="mr-2"/> Filters</h2>
          
          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
            {priceFilters.map((filter, index) => (
              <div key={index} className="mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priceFilter"
                    value={filter.label}
                    checked={filters.minPrice === (filter.minPrice ? String(filter.minPrice) : '') && filters.maxPrice === (filter.maxPrice ? String(filter.maxPrice) : '')}
                    onChange={() => handlePriceFilterChange(filter)}
                    className="form-radio text-teal-600"
                  />
                  <span className="ml-2 text-gray-700">{filter.label}</span>
                </label>
              </div>
            ))}
          </div>

          {/* Other filters can go here (e.g., Brand, etc.) */}
        </aside>

        {/* Products Display */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{category.charAt(0).toUpperCase() + category.slice(1)} Products</h2>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown />
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products found in this category.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
