import { supabase } from "./supabase";

export type GameRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  platform: string;
  image: string;
  price: number;
  original_price: number;
  discount_percent: number;
  rating: number;
  is_deal: boolean;
  is_featured: boolean;
  stock?: number;
  tags?: string[];
  created_at?: string;
};

export async function fetchGames(): Promise<GameRow[]> {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error(error); return []; }
  return data ?? [];
}

export async function fetchGameById(id: string): Promise<GameRow | null> {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function createGame(game: Partial<GameRow>) {
  const { error } = await supabase.from("games").insert([game]);
  return !error;
}

export async function updateGame(id: string, updates: Partial<GameRow>) {
  const { error } = await supabase.from("games").update(updates).eq("id", id);
  return !error;
}

export async function deleteGame(id: string) {
  const { error } = await supabase.from("games").delete().eq("id", id);
  return !error;
}

export async function duplicateGame(id: string) {
  const game = await fetchGameById(id);
  if (!game) return false;
  const { id: _, created_at, ...rest } = game;
  rest.name = `${rest.name} (Copy)`;
  rest.slug = `${rest.slug}-copy-${Date.now()}`;
  return createGame(rest);
}

export async function bulkDeleteGames(ids: string[]) {
  const { error } = await supabase.from("games").delete().in("id", ids);
  return !error;
}

export async function bulkUpdateGames(ids: string[], updates: Partial<GameRow>) {
  const { error } = await supabase.from("games").update(updates).in("id", ids);
  return !error;
}

export async function updateGameStock(id: string, stock: number) {
  const { error } = await supabase.from("games").update({ stock }).eq("id", id);
  return !error;
}
