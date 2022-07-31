import React, { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext<any>({});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: any) {
  const [cart, setCart] = useState<Array<any>>([]);

  const value = {
    cart,
    setCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children && children}
    </CartContext.Provider>
  );
}
