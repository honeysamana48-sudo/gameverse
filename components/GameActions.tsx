"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Game } from "@/types";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function GameActions({ game }: { game: Game }) {
  const { addItem, isInCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inCart = isInCart(game.id);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAdd = useCallback(() => {
    addItem(game);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1200);
  }, [addItem, game]);

  const handleBuyNow = useCallback(() => {
    addItem(game);
    router.push("/cart");
  }, [addItem, game, router]);

  return (
    <div className="mt-6 flex gap-4">
      <motion.button
        onClick={handleAdd}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`clip-panel-sm px-6 py-3 font-heading text-sm font-bold transition-all duration-300 ${
          inCart
            ? "bg-[var(--color-mint)] text-[var(--color-void)]"
            : "border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:border-[var(--color-violet)]/50 hover:shadow-[0_0_12px_rgba(124,92,252,0.15)]"
        }`}
      >
        {added ? "Added ✓" : inCart ? "In Cart ✓" : "Add to Cart"}
      </motion.button>

      <motion.button
        onClick={handleBuyNow}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="clip-panel-sm bg-[var(--color-violet)] px-6 py-3 font-heading text-sm font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all duration-300 hover:shadow-[var(--shadow-glow-violet-lg)]"
      >
        Buy Now
      </motion.button>
    </div>
  );
}
