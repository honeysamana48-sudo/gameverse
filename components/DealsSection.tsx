"use client";

import { Game } from "@/types";
import GameCard from "@/components/GameCard";
import ScrollReveal from "@/components/ScrollReveal";

interface DealsSectionProps {
  games: Game[];
}

export default function DealsSection({ games }: DealsSectionProps) {
  return (
    <section
      id="deals"
      className="relative border-y border-[var(--color-border)] bg-[var(--color-surface)]/40"
    >
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--color-flame)]/8 blur-[100px]" />
      <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-[var(--color-violet)]/8 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-flame)]/30 bg-[var(--color-flame)]/10 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider text-[var(--color-flame)]">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-flame)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-flame)]" />
                </span>
                Limited Time
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                Hot Deals
              </h2>
              <p className="mt-2 max-w-md text-sm text-[var(--color-muted)]">
                Grab these titles before the discount window closes. Prices this
                low won&apos;t last.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => (
            <ScrollReveal key={game.id} delay={index * 0.08}>
              <GameCard game={game} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
