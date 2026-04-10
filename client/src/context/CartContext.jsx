import React, { createContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const updateQuantity = (items, id, quantity) =>
  items.map((item) => (item._id === id ? { ...item, quantity } : item));

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load from localStorage on initial mount
    try {
      const saved = localStorage.getItem("matchaCafeCart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("matchaCafeCart", JSON.stringify(items));
  }, [items]);

  const addItem = (menuItem) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === menuItem._id);
      if (existing) {
        return updateQuantity(current, menuItem._id, existing.quantity + 1);
      }

      return [...current, { ...menuItem, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item._id !== id));
  };

  const setQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((current) => updateQuantity(current, id, quantity));
  };

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      total,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      setQuantity,
      clear
    }),
    [items, total, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
