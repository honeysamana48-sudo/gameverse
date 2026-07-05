import { Game } from "@/types";
import GameCard from "@/components/GameCard";

interface DealsSectionProps {
  games: Game[];
}

export default function DealsSection({ games }: DealsSectionProps) {
  return (
    <section
      id="deals"
      className="relative border-y border-[var(--color-border)] bg-[var(--color-surface)]/60"
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-flame)]/40 bg-[var(--color-flame)]/10 px-3 py-1 font-heading text-xs font-semibold text-[var(--color-flame)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-flame)] animate-pulse-glow" />
              Limited Time
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Hot Deals
            </h2>
            <p className="mt-2 max-w-md text-sm text-[var(--color-muted)]">
              Grab these titles before the discount window closes. Prices this
              low won&apos;t last.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
