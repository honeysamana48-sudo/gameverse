export const dynamic = "force-dynamic";

import { getGames } from "@/lib/getGames";
import GameSearchGrid from "@/components/GameSearchGrid";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      {/* Hero banner */}
      <div className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[var(--color-violet)]/10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[var(--color-cyan)]/8 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            The Collection
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Browse Games
          </h1>
          <p className="mt-3 text-[var(--color-muted)] max-w-xl">
            Search your favorite PC games instantly. Every title ready for instant delivery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <GameSearchGrid games={games} />
      </div>
    </main>
  );
}
