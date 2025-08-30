import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

interface Order {
  _id: string;
  user: { name: string; email: string; };
  total: number;
  status: string;
  createdAt: string;
}

const ORDER_STATUSES = ['placed', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [getToken]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      const updatedOrder = await response.json();
      setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));
      toast.success(`Order ${orderId} status updated to ${newStatus}.`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order status.');
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div>{order.user?.name || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                    >
                      {ORDER_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
