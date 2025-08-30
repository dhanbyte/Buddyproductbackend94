import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="products">Product Management</Link>
          </li>
          {/* Add more admin links here */}
        </ul>
      </nav>
      <hr />
      <Outlet /> {/* This will render nested routes */}
    </div>
  );
};

export default AdminDashboard;