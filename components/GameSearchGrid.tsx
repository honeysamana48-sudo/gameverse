"use client";

import { useState, useMemo } from "react";
import GameCard from "@/components/GameCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Game } from "@/types";

export default function GameSearchGrid({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return games;
    const q = query.toLowerCase();
    return games.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [games, query]);

  return (
    <>
      <div className="relative mb-8">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games by name or genre..."
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-ink)] placeholder-[var(--color-muted)] outline-none transition-colors focus:border-[var(--color-violet)] focus:ring-1 focus:ring-[var(--color-violet)]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-[var(--color-muted)] mt-16 text-xl font-heading">
          No games match &ldquo;{query}&rdquo;
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((game, index) => (
            <ScrollReveal key={game.id} delay={Math.min(index, 8) * 0.05}>
              <GameCard game={game} priority={index < 4} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
