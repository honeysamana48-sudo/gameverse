"use client";

import Image from "next/image";
import { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const { game, quantity } = item;
  const lineTotal = game.price * quantity;

  return (
    <div className="flex flex-col gap-4 border-b border-[var(--color-border)] py-6 sm:flex-row sm:items-center">
      {/* Image + info */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-2)] sm:h-24 sm:w-36">
          <Image
            src={game.image}
            alt={game.name}
            fill
            sizes="150px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-heading text-xs font-semibold uppercase tracking-wide text-[var(--color-cyan)]">
            {game.category} • {game.platform}
          </p>
          <h3 className="mt-1 truncate font-heading text-base font-bold text-[var(--color-ink)] sm:text-lg">
            {game.name}
          </h3>
          <p className="mt-1 font-display text-base font-bold text-[var(--color-ink)]">
            {formatPrice(game.price)}
          </p>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        <div className="flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => decreaseQuantity(game.id)}
            className="flex h-9 w-9 items-center justify-center font-heading text-lg font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-cyan)] active:scale-95"
          >
            −
          </button>
          <span className="w-9 text-center font-heading text-sm font-semibold text-[var(--color-ink)]">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => increaseQuantity(game.id)}
            className="flex h-9 w-9 items-center justify-center font-heading text-lg font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-cyan)] active:scale-95"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="font-display text-lg font-bold text-[var(--color-ink)]">
            {formatPrice(lineTotal)}
          </p>
          <button
            type="button"
            onClick={() => removeItem(game.id)}
            className="mt-1 font-heading text-xs font-medium text-[var(--color-flame)] transition-opacity hover:opacity-80 active:scale-95"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
