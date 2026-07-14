import { supabase } from "./supabase";

export type NotificationRow = {
  id: string;
  customer_email: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  order_id: string;
  created_at: string;
};

export async function createNotification(email: string, title: string, message: string, type: string = "info", orderId: string = "") {
  await supabase.from("notifications").insert([{
    customer_email: email,
    title,
    message,
    type,
    order_id: orderId,
  }]);
}

export async function fetchNotifications(email?: string): Promise<NotificationRow[]> {
  let query = supabase.from("notifications").select("*").order("created_at", { ascending: false });
  if (email) query = query.eq("customer_email", email);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function markNotificationRead(id: string) {
  await supabase.from("notifications").update({ is_read: true }).eq("id", id);
}
