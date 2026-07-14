import { supabase } from "./supabase";

export type ActivityRow = {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  entity_name: string;
  details: string;
  admin_user: string;
  created_at: string;
};

export async function logActivity(action: string, entityType: string, entityId: string, entityName: string, details: string = "") {
  await supabase.from("activity_log").insert([{
    action,
    entity_type: entityType,
    entity_id: entityId,
    entity_name: entityName,
    details,
    admin_user: "admin",
  }]);
}

export async function fetchActivityLog(limit: number = 50): Promise<ActivityRow[]> {
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
