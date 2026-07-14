"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Package, ShoppingCart, Tag, Star, User, Settings, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import { fetchActivityLog, type ActivityRow } from "@/lib/adminActivity";

const entityIcons: Record<string, any> = {
  product: Package,
  order: ShoppingCart,
  coupon: Tag,
  review: Star,
  customer: User,
  system: Settings,
};

const actionColors: Record<string, string> = {
  create: "text-emerald-400 bg-emerald-500/10",
  update: "text-cyan-400 bg-cyan-500/10",
  delete: "text-red-400 bg-red-500/10",
  approve: "text-emerald-400 bg-emerald-500/10",
  hide: "text-amber-400 bg-amber-500/10",
  status_change: "text-blue-400 bg-blue-500/10",
  reply: "text-purple-400 bg-purple-500/10",
};

export default function ActivityPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <ActivityContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function ActivityContent() {
  const toast = useToast();
  const [activities, setActivities] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivityLog(100).then(setActivities).catch(() => {
      // Table might not exist yet, show empty state
      setActivities([]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Activity className="w-8 h-8 text-emerald-400" /> Activity Log</h1>
        <p className="text-gray-400 mt-1">Track all admin actions</p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-[#0d0d1a]">
          <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-2">No activity recorded yet</p>
          <p className="text-gray-600 text-sm">Run the SQL migration to create the activity_log table, then start managing products and orders.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] overflow-hidden">
          <div className="divide-y divide-white/5">
            {activities.map((a, i) => {
              const Icon = entityIcons[a.entity_type] || Settings;
              const colorClass = Object.entries(actionColors).find(([key]) => a.action.toLowerCase().includes(key))?.[1] || "text-gray-400 bg-white/5";
              return (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
                  <div className={`p-2 rounded-xl flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-medium">{a.action}</span>
                      {a.entity_name && <span className="text-gray-400"> — {a.entity_name}</span>}
                    </p>
                    {a.details && <p className="text-xs text-gray-500 mt-0.5 truncate">{a.details}</p>}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{new Date(a.created_at).toLocaleString()}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
