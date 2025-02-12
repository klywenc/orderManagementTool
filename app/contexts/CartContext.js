'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addItemToCart = (item, quantity) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId, newQuantity) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity = newQuantity;
      setCartItems(updatedCart);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const finalizeOrder = async () => {
    if (!session) {
      console.error('User not logged in. Cannot finalize order.');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.jwt}`, // Include JWT for authentication
        },
        body: JSON.stringify({ items: cartItems, userId: session.user.id }),
      });

      const responseData = await response.json();

      if (response.ok) {
        clearCart();
      } else {
        console.error('Order submission error:', responseData.error || response.statusText);
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    finalizeOrder,
    totalItemsInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};