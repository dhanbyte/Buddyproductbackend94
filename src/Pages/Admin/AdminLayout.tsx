import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2"><Link to="/admin/dashboard">Dashboard</Link></li>
            <li className="mb-2"><Link to="/admin/products">Products</Link></li>
            <li className="mb-2"><Link to="/admin/orders">Orders</Link></li>
            <li className="mb-2"><Link to="/admin/users">Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
