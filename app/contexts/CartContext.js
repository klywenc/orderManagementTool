'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to access the cart context
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

  // Add an item to the cart or update its quantity if it already exists
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

  // Remove an item from the cart by its ID
  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Update the quantity of a specific item in the cart
  const updateItemQuantity = (itemId, newQuantity) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity = newQuantity;
      setCartItems(updatedCart);
    }
  };

  // Clear the entire cart and remove it from localStorage
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Finalize the order by sending cart items to the server
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