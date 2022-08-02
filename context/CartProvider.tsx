import React, { useState, useEffect, useContext, createContext } from "react";
import { cartItem } from "../models";

const CartContext = createContext<any>({});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: any) {
  const [cart, setCart] = useState<Array<cartItem>>([]);
  console.log(cart);

  const addToCart = (item: cartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (item: cartItem) => {
    setCart((prev) => prev.filter((x) => x._id !== item._id));
  };

  const setQuantity = (item: cartItem, quantity: number) => {
    setCart((prev) => [...prev, { ...item, quantity }]);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    setQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children && children}
    </CartContext.Provider>
  );
}
