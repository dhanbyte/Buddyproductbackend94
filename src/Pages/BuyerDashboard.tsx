// src/Pages/BuyerDashboard.tsx
import React from "react";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {[12345, 12346].map((orderId) => (
          <div key={orderId} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Order #{orderId}</h2>
            <p>Status: <span className="text-green-600 font-medium">Shipped</span></p>
            <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Cancel Order
            </button>
          </div>
        ))}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Update Address</h2>
          <input
            type="text"
            placeholder="New Address"
            className="w-full border p-2 rounded mb-2"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;