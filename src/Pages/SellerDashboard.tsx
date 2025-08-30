
// src/Pages/SellerDashboard.tsx
import React from "react";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome Seller</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
          <form className="space-y-3">
            <input type="text" placeholder="Product Name" className="w-full border p-2 rounded" />
            <input type="number" placeholder="Price" className="w-full border p-2 rounded" />
            <input type="text" placeholder="Category" className="w-full border p-2 rounded" />
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Upload
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <ul className="space-y-2">
            <li>Pending Orders: 5</li>
            <li>Delivered: 42</li>
            <li>Returned: 2</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <p className="text-lg">This Month: ₹42,000</p>
        <p className="text-sm text-gray-500">Last Month: ₹38,500</p>
      </div>
    </div>
  );
};

export default SellerDashboard;