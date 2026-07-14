import { supabase } from "./supabase";

export type OrderRow = {
  id: string;
  game_name: string;
  price: number;
  customer_name: string;
  customer_email: string;
  status: string;
  is_fulfilled: boolean;
  created_at: string;
  phone?: string;
  utr?: string;
  coupon_code?: string;
  discount_amount?: number;
  total_amount?: number;
  payment_method?: string;
  notes?: string;
  shipping_address?: string;
  tracking_number?: string;
  updated_at?: string;
};

export async function fetchOrders(): Promise<OrderRow[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchOrderById(id: string): Promise<OrderRow | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function updateOrderStatus(id: string, status: string) {
  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export async function updateOrderFulfilled(id: string, is_fulfilled: boolean) {
  const { error } = await supabase
    .from("orders")
    .update({ is_fulfilled, updated_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export async function updateOrderNotes(id: string, notes: string) {
  const { error } = await supabase
    .from("orders")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export async function updateOrderTracking(id: string, tracking_number: string) {
  const { error } = await supabase
    .from("orders")
    .update({ tracking_number, updated_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  return !error;
}

export async function fetchOrdersByEmail(email: string): Promise<OrderRow[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", email)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
