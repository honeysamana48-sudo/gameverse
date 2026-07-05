import { supabase } from "@/lib/supabase";
import Image from "next/image";
import GameActions from "@/components/GameActions";
import RecommendedGames from "@/components/RecommendedGames";

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!game) {
    return (
      <div className="text-white p-10 text-center">
        Game not found
      </div>
    );
  }

  // fetch similar games HERE (correct place)
  const { data: similarGames } = await supabase
    .from("games")
    .select("*")
    .eq("category", game.category)
    .neq("id", game.id)
    .limit(4);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">

      {/* HERO */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold">{game.name}</h1>

          <p className="text-gray-400 mt-4">{game.description}</p>

          <div className="mt-6">
            <GameActions game={game} />
          </div>
        </div>

        {/* BUY PANEL */}
        <div className="bg-[#111827] p-6 rounded-xl h-fit sticky top-6">
          <p className="text-3xl font-bold">₹{game.price}</p>

          {game.discountPercent > 0 && (
            <p className="text-red-400 mt-2">
              {game.discountPercent}% OFF
            </p>
          )}

          <p className="text-sm text-gray-400 mt-4">
            Instant download after purchase
          </p>
        </div>

      </div>

      {/* 🔥 RECOMMENDED GAMES */}
      <RecommendedGames games={similarGames || []} />

    </div>
  );
}