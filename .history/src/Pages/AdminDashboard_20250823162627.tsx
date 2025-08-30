// src/Pages/AdminDashboard.tsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {["Total Users", "Active Sellers", "Orders Today"].map((title, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-4xl mt-2 text-blue-600 font-bold">+{(i + 1) * 100}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {["Ravi", "Neha", "Amit"].map((name, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{name}</td>
                <td>{name.toLowerCase()}@bazaarbuddy.com</td>
                <td>{i === 0 ? "Seller" : "Buyer"}</td>
                <td>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;