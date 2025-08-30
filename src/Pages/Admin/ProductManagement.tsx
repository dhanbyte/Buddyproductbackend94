import React, { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate fetching products
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // In a real application, this would be an API call
    console.log('Fetching products...');
    setProducts([
      { _id: '1', name: 'Sample Product 1', description: 'Description 1', price: 100, category: 'Category A', imageUrl: 'http://example.com/image1.jpg' },
      { _id: '2', name: 'Sample Product 2', description: 'Description 2', price: 200, category: 'Category B', imageUrl: 'http://example.com/image2.jpg' },
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Simulate update API call
      console.log('Updating product:', { ...formData, price: parseFloat(formData.price), _id: editingProduct._id });
      setProducts(products.map(p => p._id === editingProduct._id ? { ...editingProduct, ...formData, price: parseFloat(formData.price) } : p));
      setEditingProduct(null);
    } else {
      // Simulate create API call
      console.log('Creating product:', { ...formData, price: parseFloat(formData.price) });
      setProducts([...products, { ...formData, price: parseFloat(formData.price), _id: Date.now().toString() }]);
    }
    setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
    });
  };

  const handleDelete = async (id: string) => {
    // Simulate delete API call
    console.log('Deleting product:', id);
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>

      <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </div>
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
        {editingProduct && <button type="button" onClick={() => { setEditingProduct(null); setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' }); }}>Cancel Edit</button>}
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td><img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
