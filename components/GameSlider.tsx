"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Game } from "@/types";
import { formatPrice } from "@/lib/format";
import ScrollReveal from "@/components/ScrollReveal";

interface GameSliderProps {
  games: Game[];
}

export default function GameSlider({ games }: GameSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!games || games.length === 0) return null;

  return (
    <ScrollReveal>
      <section className="relative py-8">
        {/* Background accent */}
        <div className="absolute left-1/2 top-1/2 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-violet)]/5 blur-[120px]" />

        <div className="relative">
          {/* Header + Arrows */}
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-6">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                Featured Collection
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Trending Games
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all hover:border-[var(--color-violet)]/50 hover:text-[var(--color-ink)] hover:shadow-[0_0_12px_rgba(124,92,252,0.15)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] transition-all hover:border-[var(--color-violet)]/50 hover:text-[var(--color-ink)] hover:shadow-[0_0_12px_rgba(124,92,252,0.15)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8 pb-4"
          >
            {/* Left spacer for centering */}
            <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />

            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index, 6) * 0.07, duration: 0.5 }}
                className="group relative shrink-0 w-[220px] sm:w-[260px]"
              >
                <Link
                  href={`/games/${game.slug}`}
                  className="block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-500 hover:-translate-y-2 hover:border-[var(--color-violet)]/40 hover:shadow-[0_0_24px_rgba(124,92,252,0.12),0_8px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      sizes="260px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/30 to-transparent" />

                    {/* Hover scan line */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="animate-scan absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-violet)]/10 to-transparent" />
                    </div>

                    {/* Discount badge */}
                    {game.discountPercent > 0 && (
                      <span className="absolute left-3 top-3 rounded-md bg-[var(--color-flame)] px-2 py-1 font-heading text-xs font-bold text-white shadow-lg">
                        -{game.discountPercent}%
                      </span>
                    )}

                    {/* Platform badge */}
                    <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-black/40 px-2 py-1 font-heading text-[10px] font-medium text-white backdrop-blur-md">
                      {game.platform}
                    </span>

                    {/* Bottom gradient overlay with info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-[var(--color-cyan)]">
                        {game.category}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="line-clamp-1 font-heading text-base font-bold text-[var(--color-ink)]">
                      {game.name}
                    </h3>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-lg font-bold text-[var(--color-ink)]">
                        {formatPrice(game.price)}
                      </span>
                      {game.discountPercent > 0 && (
                        <span className="text-xs text-[var(--color-muted-2)] line-through">
                          {formatPrice(game.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Right spacer */}
            <div className="shrink-0 w-4" />
          </div>

          {/* Gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--color-void)] to-transparent lg:w-16" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--color-void)] to-transparent lg:w-16" />
        </div>
      </section>
    </ScrollReveal>
  );
}
