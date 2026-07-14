"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Game } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

interface GameCardProps {
  game: Game;
  priority?: boolean;
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const { addItem, isInCart } = useCart();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = isInCart(game.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const goToGamePage = useCallback(() => {
    router.push(`/games/${game.slug}`);
  }, [router, game.slug]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(game);
    setJustAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1400);
  }, [addItem, game]);

  const handleBuyNow = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(game);
    router.push("/cart");
  }, [addItem, game, router]);

  return (
    <motion.div
      ref={cardRef}
      onClick={goToGamePage}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" as const }}
      whileHover={{ y: -6 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-500 hover:border-[var(--color-violet)]/50 hover:shadow-[0_0_20px_rgba(124,92,252,0.12),0_8px_30px_rgba(0,0,0,0.4)]"
      role="article"
      aria-label={`${game.name} - ${formatPrice(game.price)}`}
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={game.image}
          alt={game.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/20 to-transparent opacity-80" />

        {/* Hover scan line */}
        <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="animate-scan absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-violet)]/10 to-transparent" />
        </div>

        {game.discountPercent > 0 && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-3 top-3 rounded-md bg-[var(--color-flame)] px-2.5 py-1 font-heading text-xs font-bold text-white shadow-lg"
          >
            -{game.discountPercent}%
          </motion.span>
        )}

        <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 font-heading text-xs font-medium text-[var(--color-ink)] backdrop-blur-md">
          {game.platform}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-heading text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-cyan)]">
          {game.category}
        </p>

        <h3 className="mt-1.5 line-clamp-1 font-heading text-lg font-bold text-[var(--color-ink)]">
          {game.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex" role="img" aria-label={`Rating: ${game.rating.toFixed(1)} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={i < Math.round(game.rating) ? "currentColor" : "none"}
                stroke={i < Math.round(game.rating) ? "none" : "currentColor"}
                className={`h-3.5 w-3.5 ${i < Math.round(game.rating) ? "text-[var(--color-amber)]" : "text-[var(--color-surface-3)]"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.83 4.401 4.753.381c1.163.093 1.634 1.542.749 2.305l-3.618 3.109 1.106 4.637c.271 1.136-.964 2.033-1.96 1.425L10 17.028l-4.072 2.44c-.996.608-2.231-.29-1.96-1.425l1.106-4.637-3.618-3.109c-.885-.763-.414-2.212.749-2.305l4.753-.381 1.83-4.401Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium text-[var(--color-muted)]">
            {game.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="font-display text-xl font-bold text-[var(--color-ink)]">
            {formatPrice(game.price)}
          </span>
          {game.discountPercent > 0 && (
            <span className="text-sm text-[var(--color-muted-2)] line-through">
              {formatPrice(game.originalPrice)}
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">
          <motion.button
            type="button"
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className={`clip-panel-sm flex-1 border px-3 py-2.5 font-heading text-sm font-semibold transition-all duration-300 ${
              inCart
                ? "border-[var(--color-mint)] bg-[var(--color-mint)]/10 text-[var(--color-mint)]"
                : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:border-[var(--color-violet)]/50 hover:text-[var(--color-cyan)] hover:shadow-[0_0_15px_rgba(124,92,252,0.1)]"
            }`}
          >
            {justAdded ? "Added ✓" : inCart ? "In Cart ✓" : "Add to Cart"}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleBuyNow}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="clip-panel-sm flex-1 bg-[var(--color-violet)] px-3 py-2.5 font-heading text-sm font-semibold text-white transition-all duration-300 hover:shadow-[var(--shadow-glow-violet)]"
          >
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
