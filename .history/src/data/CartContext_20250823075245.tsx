/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  quantity? :number;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bazaarCart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("bazaarCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};