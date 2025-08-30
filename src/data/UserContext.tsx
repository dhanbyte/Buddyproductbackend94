import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { UserAPI } from '../lib/api';

interface WishlistContextType {
  wishlist: string[]; // Array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const UserContext = createContext<WishlistContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getToken, isSignedIn } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);

  const fetchWishlist = useCallback(async () => {
    if (!isSignedIn) return;
    try {
      const token = await getToken();
      const data = await UserAPI.getWishlist(token);
      setWishlist(data.map((item: any) => item._id)); // Assuming API returns array of product objects
    } catch (error) {
      console.error(error);
    }
  }, [getToken, isSignedIn]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: string) => {
    const token = await getToken();
    try {
      await UserAPI.addToWishlist(productId, token);
      setWishlist([...wishlist, productId]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const token = await getToken();
    try {
      await UserAPI.removeFromWishlist(productId, token);
      setWishlist(wishlist.filter(id => id !== productId));
    } catch (error) {
      console.error(error);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <UserContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
