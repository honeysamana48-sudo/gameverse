import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import GameActions from "@/components/GameActions";
import RecommendedGames from "@/components/RecommendedGames";
import ScrollReveal from "@/components/ScrollReveal";

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
    notFound();
  }

  const { data: similarGames } = await supabase
    .from("games")
    .select("*")
    .eq("category", game.category)
    .neq("id", game.id)
    .limit(4);

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      {/* Cinematic Banner */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-void)]/60 via-transparent to-transparent" />

        {/* Glow accents */}
        <div className="absolute bottom-0 left-1/4 h-32 w-64 rounded-full bg-[var(--color-violet)]/15 blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 h-24 w-48 rounded-full bg-[var(--color-cyan)]/10 blur-[50px]" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10 -mt-16">

        <div className="md:col-span-2">
          <ScrollReveal>
            {/* Category + Platform badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center rounded-md border border-[var(--color-violet)]/30 bg-[var(--color-violet)]/10 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-[var(--color-cyan)]">
                {game.category}
              </span>
              <span className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 font-heading text-xs font-medium text-[var(--color-muted)]">
                {game.platform}
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {game.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i < Math.round(game.rating || 0) ? "currentColor" : "none"}
                    stroke={i < Math.round(game.rating || 0) ? "none" : "currentColor"}
                    className={`h-4 w-4 ${i < Math.round(game.rating || 0) ? "text-[var(--color-amber)]" : "text-[var(--color-surface-3)]"}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l1.83 4.401 4.753.381c1.163.093 1.634 1.542.749 2.305l-3.618 3.109 1.106 4.637c.271 1.136-.964 2.033-1.96 1.425L10 17.028l-4.072 2.44c-.996.608-2.231-.29-1.96-1.425l1.106-4.637-3.618-3.109c-.885-.763-.414-2.212.749-2.305l4.753-.381 1.83-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[var(--color-muted)]">{game.rating?.toFixed(1) || "N/A"}</span>
            </div>

            <p className="mt-6 text-[var(--color-muted)] leading-relaxed">
              {game.description}
            </p>

            <div className="mt-6">
              <GameActions game={game} />
            </div>
          </ScrollReveal>
        </div>

        {/* BUY PANEL */}
        <ScrollReveal delay={0.1}>
          <div className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg shadow-black/20 sticky top-24 backdrop-blur-sm">
            <p className="font-display text-3xl font-bold">
              ₹{game.price}
            </p>

            {game.discountPercent > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[var(--color-muted-2)] line-through text-lg">
                  ₹{game.originalPrice}
                </span>
                <span className="rounded-md bg-[var(--color-flame)]/15 px-2 py-0.5 font-heading text-sm font-bold text-[var(--color-flame)]">
                  {game.discountPercent}% OFF
                </span>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <svg className="h-5 w-5 text-[var(--color-mint)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant download after purchase
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <svg className="h-5 w-5 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                Secure payment via UPI
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <svg className="h-5 w-5 text-[var(--color-violet)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                24/7 WhatsApp support
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Recommended Games */}
      <div className="border-t border-[var(--color-border)] mt-8">
        <RecommendedGames games={similarGames || []} />
      </div>
    </div>
  );
}
