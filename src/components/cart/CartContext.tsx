"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getProduct, type Size } from "@/lib/catalog";

export type CartLine = {
  key: string;
  productId: string;
  size: Size;
  colorId: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, size: Size, colorId: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = (productId: string, size: Size, colorId: string) => {
    const key = `${productId}:${colorId}:${size}`;
    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) => (line.key === key ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...current, { key, productId, size, colorId, qty: 1 }];
    });
    setIsOpen(true);
  };

  const setQty = (key: string, qty: number) => {
    setLines((current) =>
      qty <= 0 ? current.filter((line) => line.key !== key) : current.map((line) => (line.key === key ? { ...line, qty } : line)),
    );
  };

  const remove = (key: string) => setLines((current) => current.filter((line) => line.key !== key));

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + (getProduct(line.productId)?.price ?? 0) * line.qty, 0);

  return (
    <CartContext
      value={{
        lines,
        count,
        subtotal,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        add,
        setQty,
        remove,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
