"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/admin/Toast";
import { Plus } from "lucide-react";

export default function AddGameForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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

    if (!game.name.trim()) {
      toast("Game name is required", "error");
      return;
    }

    setLoading(true);

    const finalSlug = game.slug?.trim()
      ? createSlug(game.slug)
      : createSlug(game.name);

    const { error } = await supabase.from("games").insert([
      {
        name: game.name.trim(),
        slug: finalSlug,
        description: game.description,
        category: game.category,
        platform: game.platform,
        image: game.image,
        price: Number(game.price) || 0,
        original_price: Number(game.original_price) || 0,
        discount_percent: Number(game.discount_percent) || 0,
        rating: Number(game.rating) || 0,
        is_deal: game.is_deal,
        is_featured: game.is_featured,
      },
    ]);

    setLoading(false);

    if (error) {
      toast(error.message, "error");
      return;
    }

    toast("Game added successfully!", "success");
    onSuccess();

    setGame({
      name: "", slug: "", description: "", category: "", platform: "",
      image: "", price: "", original_price: "", discount_percent: "",
      rating: "", is_deal: false, is_featured: false,
    });
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Add New Game</h2>
          <p className="text-gray-500 text-xs">Fill in the details to add a new game to the store</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Game Name *</label>
          <input placeholder="e.g. GTA V" value={game.name} onChange={(e) => setGame({ ...game, name: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Slug (auto-generated if empty)</label>
          <input placeholder="e.g. gta-v" value={game.slug} onChange={(e) => setGame({ ...game, slug: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea placeholder="Game description..." value={game.description} onChange={(e) => setGame({ ...game, description: e.target.value })} className={`${inputClass} min-h-[80px] resize-y`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <input placeholder="e.g. Action, RPG" value={game.category} onChange={(e) => setGame({ ...game, category: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Platform</label>
          <input placeholder="e.g. PC, PlayStation" value={game.platform} onChange={(e) => setGame({ ...game, platform: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Image URL</label>
        <input placeholder="https://..." value={game.image} onChange={(e) => setGame({ ...game, image: e.target.value })} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Price</label>
          <input type="number" placeholder="0" value={game.price} onChange={(e) => setGame({ ...game, price: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Original Price</label>
          <input type="number" placeholder="0" value={game.original_price} onChange={(e) => setGame({ ...game, original_price: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Discount %</label>
          <input type="number" placeholder="0" value={game.discount_percent} onChange={(e) => setGame({ ...game, discount_percent: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Rating (0-5)</label>
          <input type="number" step="0.1" min="0" max="5" placeholder="0" value={game.rating} onChange={(e) => setGame({ ...game, rating: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={game.is_featured} onChange={(e) => setGame({ ...game, is_featured: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/25" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input type="checkbox" checked={game.is_deal} onChange={(e) => setGame({ ...game, is_deal: e.target.checked })} className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/25" />
          Deal
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Adding Game..." : "Add Game"}
      </button>
    </form>
  );
}
