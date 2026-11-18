import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart and automatically slide the drawer open
  const addToCart = (product, options = {}) => {
    const size = options.size || product.defaultSize || 'Free Size';
    const color = options.color || product.defaultColor || 'Standard';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          size,
          color,
          quantity: 1,
        },
      ];
    });

    // Automatically slide drawer open
    setIsCartOpen(true);
  };

  // Remove specific item variant from cart
  const removeFromCart = (id, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (id, size, color, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Computed totals
  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    isCartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
