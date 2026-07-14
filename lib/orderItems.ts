import { supabase } from "./supabase";

export type OrderItemRow = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
};

export async function insertOrderItems(items: Omit<OrderItemRow, "id" | "created_at">[]) {
  if (items.length === 0) return true;
  const { error } = await supabase.from("order_items").insert(items);
  if (error) {
    console.error("Failed to insert order items:", error);
    return false;
  }
  return true;
}

export async function fetchOrderItems(orderId: string): Promise<OrderItemRow[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
