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

  // AUTO SLUG FUNCTION
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

    alert("✅ Game Added Successfully!");
    onSuccess();

    setGame({
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
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-[#111827] p-6">

      <input
        placeholder="Game Name"
        value={game.name}
        onChange={(e) => setGame({ ...game, name: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        placeholder="Slug (optional)"
        value={game.slug}
        onChange={(e) => setGame({ ...game, slug: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <textarea
        placeholder="Description"
        value={game.description}
        onChange={(e) => setGame({ ...game, description: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        placeholder="Category"
        value={game.category}
        onChange={(e) => setGame({ ...game, category: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        placeholder="Platform"
        value={game.platform}
        onChange={(e) => setGame({ ...game, platform: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        placeholder="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/12/gta-5-cover.jpg"
        value={game.image}
        onChange={(e) => setGame({ ...game, image: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        type="number"
        placeholder="Price"
        value={game.price}
        onChange={(e) => setGame({ ...game, price: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        type="number"
        placeholder="Original Price"
        value={game.original_price}
        onChange={(e) => setGame({ ...game, original_price: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        type="number"
        placeholder="Discount %"
        value={game.discount_percent}
        onChange={(e) => setGame({ ...game, discount_percent: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <input
        type="number"
        step="0.1"
        placeholder="Rating"
        value={game.rating}
        onChange={(e) => setGame({ ...game, rating: e.target.value })}
        className="w-full rounded-lg bg-black p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={game.is_featured}
          onChange={(e) => setGame({ ...game, is_featured: e.target.checked })}
        />
        Featured
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={game.is_deal}
          onChange={(e) => setGame({ ...game, is_deal: e.target.checked })}
        />
        Deal
      </label>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold"
      >
        {loading ? "Adding..." : "Add Game"}
      </button>
    </form>
  );
}