"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/CartItemRow";
import EmptyState from "@/components/EmptyState";
import { formatPrice } from "@/lib/format";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

export default function CartPage() {
  const { items, clearCart, totalItems, totalPrice, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[var(--color-muted)]">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you haven't added any games yet. Browse the store and grab a deal."
        actionLabel="Browse Games"
        actionHref="/#games"
      />
    );
  }

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--color-violet)]/5 blur-[80px]" />

      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Your Cart</h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {totalItems} {totalItems === 1 ? "item" : "items"} in cart
            </p>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="font-heading text-sm font-semibold text-[var(--color-flame)] transition-opacity hover:opacity-80 active:scale-95"
          >
            Clear Cart
          </button>
        </div>
      </ScrollReveal>

      <div className="relative mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items list */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItemRow key={item.game.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <ScrollReveal delay={0.1}>
          <div className="h-fit lg:sticky lg:top-24">
            <div className="clip-panel border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg shadow-black/20">
              <h2 className="font-heading text-lg font-bold text-[var(--color-ink)]">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 border-b border-[var(--color-border)] pb-4">
                {items.map((item) => (
                  <div
                    key={item.game.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate pr-2 text-[var(--color-muted)]">
                      {item.game.name} x {item.quantity}
                    </span>
                    <span className="shrink-0 font-medium text-[var(--color-ink)]">
                      {formatPrice(item.game.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-heading text-base font-semibold text-[var(--color-ink)]">
                  Total
                </span>
                <span className="font-display text-2xl font-bold text-gradient-static">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/checkout"
                  className="clip-panel-sm mt-6 flex w-full items-center justify-center bg-[var(--color-violet)] py-3.5 font-heading text-base font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all duration-300 hover:shadow-[var(--shadow-glow-violet-lg)]"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
              <Link
                href="/#games"
                className="mt-3 flex w-full items-center justify-center py-2 font-heading text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-cyan)]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
