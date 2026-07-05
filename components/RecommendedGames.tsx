import Link from "next/link";

export default function RecommendedGames({ games }: { games: any[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h2 className="text-2xl font-bold mb-6">
        🔥 Recommended Games
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {games.map((g) => (
          <Link
            key={g.id}
            href={`/games/${g.slug}`}
            className="bg-[#111827] rounded-xl overflow-hidden hover:scale-105 transition"
          >

            <img
              src={g.image}
              alt={g.name}
              className="h-40 w-full object-cover"
            />

            <div className="p-3">
              <p className="font-bold truncate">{g.name}</p>
              <p className="text-sm text-gray-400">₹{g.price}</p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}