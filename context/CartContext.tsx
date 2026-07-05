"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartContextType, CartItem, Game } from "@/types";
import { clampQuantity } from "@/lib/format";

const CART_STORAGE_KEY = "gameverse_cart_v1";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount (client only)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        setItems(parsed);
      }
    } catch {
      // Ignore corrupted storage data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors (e.g. private browsing quota)
    }
  }, [items, isHydrated]);

  const addItem = useCallback((game: Game) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.game.id === game.id);
      if (existing) {
        return prev.map((item) =>
          item.game.id === game.id
            ? { ...item, quantity: clampQuantity(item.quantity + 1) }
            : item
        );
      }
      return [...prev, { game, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((gameId: string) => {
    setItems((prev) => prev.filter((item) => item.game.id !== gameId));
  }, []);

  const increaseQuantity = useCallback((gameId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.game.id === gameId
          ? { ...item, quantity: clampQuantity(item.quantity + 1) }
          : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((gameId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.game.id === gameId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (gameId: string) => items.some((item) => item.game.id === gameId),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.game.price * item.quantity, 0),
    [items]
  );

  const value: CartContextType = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isInCart,
    }),
    [
      items,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isInCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
