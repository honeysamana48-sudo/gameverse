"use client";

import { useMemo, useState } from "react";
import { Game } from "@/types";
import GameCard from "@/components/GameCard";

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
    <section
      id="games"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      {/* Heading */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-[var(--color-cyan)]">
            The Library
          </p>

          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Featured Games
          </h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-8">
        <div className="relative max-w-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400"
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
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-4 pl-12 pr-4 text-white placeholder:text-[var(--color-muted)] outline-none transition focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-md border px-3.5 py-1.5 font-heading text-sm font-medium transition duration-200 active:scale-95 ${
              activeFilter === filter
                ? "border-[var(--color-violet)] bg-[var(--color-violet)]/15 text-[var(--color-cyan)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-violet)]/50 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white">
            😕 No Games Found
          </h3>

          <p className="mt-4 text-[var(--color-muted)]">
            Try another game name or choose a different category.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGames.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${Math.min(index, 8) * 60}ms`,
              }}
            >
              <GameCard game={game} priority={index < 4} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}