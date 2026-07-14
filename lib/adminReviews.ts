import { supabase } from "./supabase";

export type ReviewRow = {
  id: string;
  game_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  title: string;
  comment: string;
  is_approved: boolean;
  is_hidden: boolean;
  is_pinned: boolean;
  admin_reply: string;
  created_at: string;
  game_name?: string;
};

export async function fetchReviews(): Promise<ReviewRow[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, games(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({ ...r, game_name: r.games?.name }));
}

export async function approveReview(id: string) {
  const { error } = await supabase.from("reviews").update({ is_approved: true }).eq("id", id);
  return !error;
}

export async function hideReview(id: string, hidden: boolean) {
  const { error } = await supabase.from("reviews").update({ is_hidden: hidden }).eq("id", id);
  return !error;
}

export async function pinReview(id: string, pinned: boolean) {
  const { error } = await supabase.from("reviews").update({ is_pinned: pinned }).eq("id", id);
  return !error;
}

export async function replyToReview(id: string, reply: string) {
  const { error } = await supabase.from("reviews").update({ admin_reply: reply }).eq("id", id);
  return !error;
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  return !error;
}
