"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Product, CartItem } from "@/lib/types/types";

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQty = (id: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (id: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
