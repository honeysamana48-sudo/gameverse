import { supabase } from "./supabase";

// GET all games
export async function fetchGames() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// DELETE game
export async function deleteGame(id: string) {
  const { error } = await supabase
    .from("games")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
export async function updateGame(id: string, updates: any) {
  const { error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}