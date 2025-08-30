import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '@clerk/clerk-react';
import { OrderAPI } from '../lib/api';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const { getToken } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      const fetchOrderDetails = async () => {
        try {
          const token = await getToken();
          const data = await OrderAPI.getOrderById(orderId, token);
          setOrderDetails(data);
        } catch (err) {
          console.error('Error fetching order details:', err);
          setError('Could not load order details. Please check your order history.');
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [orderId, getToken]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Thank You For Your Order!</h1>
      <p className="text-lg text-gray-600 mb-8">Your order has been placed successfully.</p>
      
      {loading && <p className="text-gray-600">Loading order details...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          {orderId && (
            <p className="text-md text-gray-700 mb-4">
              Order ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{orderId}</span>
            </p>
          )}
          
          {orderDetails && (
            <div className="text-left">
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Payment Method:</span> {orderDetails.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
              </p>
              <p className="text-md text-gray-700 mb-2">
                <span className="font-semibold">Order Status:</span> {orderDetails.status}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Total Amount:</span> ₹{orderDetails.totalAmount?.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      )}
      
      <Link to="/" className="bg-teal-600 text-white px-8 py-3 rounded-md hover:bg-teal-700 mt-4 inline-block">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
