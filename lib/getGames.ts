import { supabase } from "./supabase";

export async function getGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((game) => ({
    id: String(game.id),
    slug: game.slug,
    name: game.name,
    category: game.category,
    platform: game.platform,
    image: game.image,
    price: game.price,
    originalPrice: game.original_price,
    discountPercent: game.discount_percent,
    rating: game.rating,
    isDeal: game.is_deal,
    isFeatured: game.is_featured,
    description: game.description,
    tags: game.tags ?? [],
  }));
}