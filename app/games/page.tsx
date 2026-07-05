export const dynamic = "force-dynamic";
import { getGames } from "@/lib/getGames";
import GameCard from "@/components/GameCard";

export default async function GamesPage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-extrabold mb-3">
          Browse Games
        </h1>

        <p className="text-gray-400 mb-10">
          Search your favorite PC games instantly.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {games.length === 0 && (
          <div className="text-center text-gray-400 mt-16 text-xl">
            No games found.
          </div>
        )}

      </div>
    </main>
  );
}