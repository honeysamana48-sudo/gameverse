"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { formatPrice } from "@/lib/format";

interface RecommendedGame {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function RecommendedGames({ games }: { games: RecommendedGame[] }) {
  if (!games || games.length === 0) return null;

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--color-violet)]/5 blur-[80px]" />

      <ScrollReveal>
        <h2 className="relative text-2xl font-bold mb-8 font-display">
          🔥 Recommended Games
        </h2>
      </ScrollReveal>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
        {games.map((g, index) => (
          <ScrollReveal key={g.id} delay={index * 0.08}>
            <Link
              href={`/games/${g.slug}`}
              className="group block overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-violet)]/40 hover:shadow-[0_0_20px_rgba(124,92,252,0.1)]"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={g.image}
                  alt={g.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />
              </div>

              <div className="p-3.5">
                <p className="font-heading font-bold truncate text-[var(--color-ink)]">
                  {g.name}
                </p>
                <p className="text-sm text-[var(--color-muted)] mt-1 font-display">
                  {formatPrice(g.price)}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
