"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const goToGamePage = () => {
    router.push(`/games/${game.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(game);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(game);
    router.push("/cart");
  };

  return (
    <article
      onClick={goToGamePage}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-violet)]/60 hover:shadow-[var(--shadow-glow-violet)] cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={game.image}
          alt={game.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />

        {game.discountPercent > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-[var(--color-flame)] px-2 py-1 font-heading text-xs font-bold text-white shadow-lg">
            -{game.discountPercent}%
          </span>
        )}

        <span className="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-1 font-heading text-xs font-medium text-[var(--color-ink)] backdrop-blur">
          {game.platform}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-heading text-xs font-semibold uppercase tracking-wider text-[var(--color-cyan)]">
          {game.category}
        </p>

        <h3 className="mt-1.5 line-clamp-1 font-heading text-lg font-bold text-[var(--color-ink)]">
          {game.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1">
          <StarIcon />
          <span className="text-sm font-medium text-[var(--color-muted)]">
            {game.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
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
          <button
            type="button"
            onClick={handleAddToCart}
            className={`clip-panel-sm flex-1 border px-3 py-2.5 font-heading text-sm font-semibold transition-all duration-200 active:scale-95 ${
              inCart
                ? "border-[var(--color-mint)] bg-[var(--color-mint)]/10 text-[var(--color-mint)]"
                : "border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:border-[var(--color-violet)] hover:text-[var(--color-cyan)]"
            }`}
          >
            {justAdded ? "Added ✓" : inCart ? "In Cart ✓" : "Add to Cart"}
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="clip-panel-sm flex-1 bg-[var(--color-violet)] px-3 py-2.5 font-heading text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.83 4.401 4.753.381c1.163.093 1.634 1.542.749 2.305l-3.618 3.109 1.106 4.637c.271 1.136-.964 2.033-1.96 1.425L10 17.028l-4.072 2.44c-.996.608-2.231-.29-1.96-1.425l1.106-4.637-3.618-3.109c-.885-.763-.414-2.212.749-2.305l4.753-.381 1.83-4.401Z"
        clipRule="evenodd"
      />
    </svg>
  );
}