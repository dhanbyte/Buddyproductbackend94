import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  price: { original: number };
  quantity: number;
  status: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchProducts = async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [getToken]);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter(p => p._id !== productId));

      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Link to="/admin/products/new" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
          + Add New Product
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price.original}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/products/edit/${product._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
