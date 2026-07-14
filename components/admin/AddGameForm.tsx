"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AddGameForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const [game, setGame] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    platform: "",
    image: "",
    price: "",
    original_price: "",
    discount_percent: "",
    rating: "",
    is_deal: false,
    is_featured: false,
  });

  const createSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const finalSlug = game.slug?.trim()
      ? createSlug(game.slug)
      : createSlug(game.name);

    const { error } = await supabase.from("games").insert([
      {
        name: game.name,
        slug: finalSlug,
        description: game.description,
        category: game.category,
        platform: game.platform,
        image: game.image,
        price: Number(game.price),
        original_price: Number(game.original_price),
        discount_percent: Number(game.discount_percent),
        rating: Number(game.rating),
        is_deal: game.is_deal,
        is_featured: game.is_featured,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Game Added Successfully!");
    onSuccess();

    setGame({
      name: "", slug: "", description: "", category: "", platform: "",
      image: "", price: "", original_price: "", discount_percent: "",
      rating: "", is_deal: false, is_featured: false,
    });
  }

  const inputClass = "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] p-3 text-[var(--color-ink)] outline-none transition-all focus:border-[var(--color-violet)]/50 focus:shadow-[0_0_15px_rgba(124,92,252,0.1)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h2 className="text-xl font-bold font-heading mb-4">Add New Game</h2>
      <input placeholder="Game Name" value={game.name} onChange={(e) => setGame({ ...game, name: e.target.value })} className={inputClass} />
      <input placeholder="Slug (optional)" value={game.slug} onChange={(e) => setGame({ ...game, slug: e.target.value })} className={inputClass} />
      <textarea placeholder="Description" value={game.description} onChange={(e) => setGame({ ...game, description: e.target.value })} className={`${inputClass} min-h-[100px]`} />
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Category" value={game.category} onChange={(e) => setGame({ ...game, category: e.target.value })} className={inputClass} />
        <input placeholder="Platform" value={game.platform} onChange={(e) => setGame({ ...game, platform: e.target.value })} className={inputClass} />
      </div>
      <input placeholder="Image URL" value={game.image} onChange={(e) => setGame({ ...game, image: e.target.value })} className={inputClass} />
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Price" value={game.price} onChange={(e) => setGame({ ...game, price: e.target.value })} className={inputClass} />
        <input type="number" placeholder="Original Price" value={game.original_price} onChange={(e) => setGame({ ...game, original_price: e.target.value })} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Discount %" value={game.discount_percent} onChange={(e) => setGame({ ...game, discount_percent: e.target.value })} className={inputClass} />
        <input type="number" step="0.1" placeholder="Rating" value={game.rating} onChange={(e) => setGame({ ...game, rating: e.target.value })} className={inputClass} />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer">
          <input type="checkbox" checked={game.is_featured} onChange={(e) => setGame({ ...game, is_featured: e.target.checked })} className="accent-[var(--color-violet)]" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer">
          <input type="checkbox" checked={game.is_deal} onChange={(e) => setGame({ ...game, is_deal: e.target.checked })} className="accent-[var(--color-violet)]" />
          Deal
        </label>
      </div>
      <button
        disabled={loading}
        className="w-full clip-panel-sm bg-[var(--color-violet)] py-3 font-heading font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all hover:shadow-[var(--shadow-glow-violet-lg)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding..." : "Add Game"}
      </button>
    </form>
  );
}
