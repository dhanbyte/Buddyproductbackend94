import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

interface User {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:5000/api/user', { // Note: API endpoint is /api/user
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getToken]);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{user.clerkId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;