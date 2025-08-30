import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

interface ProductFormState {
  name: string;
  brand: string;
  category: string;
  description: string;
  price: { original: number; discounted?: number; };
  quantity: number;
  image: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { productId } = useParams();
  const isEditMode = !!productId;

  const [product, setProduct] = useState<ProductFormState>({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: { original: 0, discounted: 0 },
    quantity: 0,
    image: '',
    metaTitle: '',
    metaDescription: '',
    slug: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProductDetails = async () => {
        try {
          const token = await getToken();
          const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Failed to fetch product details');
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProductDetails();
    }
  }, [isEditMode, productId, getToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'originalPrice') {
        setProduct(prev => ({ ...prev, price: { ...prev.price, original: Number(value) } }));
    } else {
        setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditMode ? `http://localhost:5000/api/products/${productId}` : 'http://localhost:5000/api/products';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const token = await getToken();
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} product`);
      }

      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 shadow-md rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
          <input type="text" name="brand" id="brand" value={product.brand} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" id="category" value={product.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="originalPrice" id="originalPrice" value={product.price.original} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="number" name="quantity" id="quantity" value={product.quantity} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" name="image" id="image" value={product.image} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" value={product.description} onChange={handleChange} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
        </div>

        {/* SEO Information Section */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-bold mb-4">SEO Information</h2>
          <div>
            <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">Meta Title (Max 60 chars)</label>
            <input type="text" name="metaTitle" id="metaTitle" value={product.metaTitle || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" maxLength={60} />
          </div>
          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Meta Description (Max 160 chars)</label>
            <textarea name="metaDescription" id="metaDescription" value={product.metaDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" maxLength={160} />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (Unique URL path)</label>
            <input type="text" name="slug" id="slug" value={product.slug || ''} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                Cancel
            </button>
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                {isEditMode ? 'Update Product' : 'Save Product'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
