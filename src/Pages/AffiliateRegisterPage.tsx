import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AffiliateRegisterPage = () => {
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!isSignedIn) {
      toast.error('Please log in to register as an affiliate.');
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/affiliates/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register as affiliate');
      }

      toast.success('Successfully registered as an affiliate!');
      navigate('/affiliate/dashboard'); // Redirect to affiliate dashboard
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Error registering as affiliate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Become an Affiliate</h1>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
        <p className="text-lg text-gray-700 mb-6">
          Earn commission by promoting our products! Register now to get your unique referral link and start earning.
        </p>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default AffiliateRegisterPage;
