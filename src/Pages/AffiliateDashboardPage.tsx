import React, { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface AffiliateData {
  affiliate: {
    _id: string;
    referralCode: string;
    commissionRate: number;
    totalEarnings: number;
    pendingEarnings: number;
    status: string;
  };
  totalClicks: number;
  totalSales: number;
  recentSales: Array<{
    _id: string;
    order: { _id: string; total: number };
    commissionEarned: number;
    timestamp: string;
  }>;
}

const AffiliateDashboardPage = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [productLinkProductId, setProductLinkProductId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  useEffect(() => {
    const fetchAffiliateData = async () => {
      if (!isSignedIn) return;
      setLoading(true);
      try {
        const token = await getToken();
        const response = await fetch('http://localhost:5000/api/affiliates/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          if (response.status === 404) {
            setAffiliateData(null); // User is not an affiliate
          } else {
            throw new Error('Failed to fetch affiliate data');
          }
        }
        const data = await response.json();
        setAffiliateData(data);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching affiliate data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliateData();
  }, [getToken, isSignedIn]);

  const handleGenerateLink = () => {
    if (!affiliateData) return;
    const baseUrl = window.location.origin; // e.g., http://localhost:5174
    let link = `${baseUrl}/?ref=${affiliateData.affiliate.referralCode}`;
    if (productLinkProductId) {
      link = `${baseUrl}/product/${productLinkProductId}?ref=${affiliateData.affiliate.referralCode}`;
    }
    setGeneratedLink(link);
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  if (loading) {
    return <div className="text-center py-20">Loading affiliate dashboard...</div>;
  }

  if (!affiliateData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Become an Affiliate</h1>
        <p className="text-lg text-gray-700 mb-4">You are not yet registered as an affiliate.</p>
        <Link to="/affiliate/register" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700">
          Register Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Affiliate Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Earnings</h2>
          <p className="text-4xl font-bold text-teal-600">₹{affiliateData.affiliate.totalEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending Earnings</h2>
          <p className="text-4xl font-bold text-orange-500">₹{affiliateData.affiliate.pendingEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Clicks</h2>
          <p className="text-4xl font-bold text-blue-500">{affiliateData.totalClicks}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Generate Referral Link</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Optional: Product ID for specific link"
            value={productLinkProductId}
            onChange={(e) => setProductLinkProductId(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button onClick={handleGenerateLink} className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black">
            Generate Link
          </button>
        </div>
        {generatedLink && (
          <p className="mt-4 text-gray-700 break-all">
            Your link: <span className="font-mono bg-gray-100 p-2 rounded-md text-sm">{generatedLink}</span>
          </p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Sales</h2>
        {affiliateData.recentSales.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {affiliateData.recentSales.map((sale) => (
                <tr key={sale._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{sale.order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{sale.order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">₹{sale.commissionEarned.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sale.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent sales to display.</p>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboardPage;
