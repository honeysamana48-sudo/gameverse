"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Game } from "@/types";
import GameCard from "@/components/GameCard";
import ScrollReveal from "@/components/ScrollReveal";

interface FeaturedGamesProps {
  games: Game[];
}

const FILTERS = [
  "All",
  "Action",
  "RPG",
  "Shooter",
  "Racing",
  "Strategy",
  "Adventure",
] as const;

export default function FeaturedGames({ games }: FeaturedGamesProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory =
        activeFilter === "All" || game.category === activeFilter;
      const matchesSearch =
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [games, activeFilter, search]);

  return (
    <section id="games" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Subtle background accent */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-violet)]/5 blur-[120px]" />

      <div className="relative">
        {/* Heading */}
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                The Library
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Featured Games
              </h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal delay={0.1}>
          <div className="mt-8">
            <div className="relative max-w-xl group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)] transition-colors group-focus-within:text-[var(--color-cyan)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your favorite game..."
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-4 pl-12 pr-4 text-white placeholder:text-[var(--color-muted)] outline-none transition-all duration-300 focus:border-[var(--color-cyan)]/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                aria-label="Search games"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2 font-heading text-sm font-semibold transition-all duration-300 active:scale-95 ${
                  activeFilter === filter
                    ? "border-[var(--color-violet)]/50 bg-[var(--color-violet)]/15 text-[var(--color-cyan)] shadow-[0_0_12px_rgba(124,92,252,0.15)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]/50 text-[var(--color-muted)] hover:border-[var(--color-violet)]/30 hover:text-[var(--color-ink)]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Games Grid */}
        <AnimatePresence mode="wait">
          {filteredGames.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-20 text-center"
            >
              <h3 className="text-3xl font-bold text-white">
                No Games Found
              </h3>
              <p className="mt-4 text-[var(--color-muted)]">
                Try another game name or choose a different category.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredGames.map((game, index) => (
                <ScrollReveal key={game.id} delay={Math.min(index, 6) * 0.06}>
                  <GameCard game={game} priority={index < 4} />
                </ScrollReveal>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
