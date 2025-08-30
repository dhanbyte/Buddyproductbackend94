import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { OrderAPI } from '../lib/api';

interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{ product: { name: string }, quantity: number }>;
}

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = await getToken();
        const data = await OrderAPI.getOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [getToken]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">You haven't placed any orders yet.</p>
          <Link to="/" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.items.map((item, idx) => (
                      <div key={idx}>{item.product?.name || 'Product'} (x{item.quantity})</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
