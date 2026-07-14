import { supabase } from "./supabase";

export type CouponRow = {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_purchase: number;
  max_discount: number;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
};

export async function fetchCoupons(): Promise<CouponRow[]> {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCoupon(coupon: Omit<CouponRow, "id" | "created_at" | "used_count">) {
  const { error } = await supabase.from("coupons").insert([coupon]);
  return !error;
}

export async function updateCoupon(id: string, updates: Partial<CouponRow>) {
  const { error } = await supabase.from("coupons").update(updates).eq("id", id);
  return !error;
}

export async function deleteCoupon(id: string) {
  const { error } = await supabase.from("coupons").delete().eq("id", id);
  return !error;
}

export async function toggleCoupon(id: string, is_active: boolean) {
  const { error } = await supabase.from("coupons").update({ is_active }).eq("id", id);
  return !error;
}

export async function findCouponByCode(code: string): Promise<CouponRow | null> {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .ilike("code", code.trim())
    .eq("is_active", true)
    .single();
  if (error) return null;
  if (data.expires_at && new Date(data.expires_at) < new Date()) return null;
  if (data.usage_limit > 0 && data.used_count >= data.usage_limit) return null;
  return data;
}

export async function incrementCouponUsage(id: string) {
  const { data } = await supabase.from("coupons").select("used_count").eq("id", id).single();
  if (!data) return;
  await supabase.from("coupons").update({ used_count: data.used_count + 1 }).eq("id", id);
}
