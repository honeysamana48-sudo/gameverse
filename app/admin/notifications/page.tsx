"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Info, CheckCircle, AlertTriangle, XCircle, Mail } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import { fetchNotifications, markNotificationRead, type NotificationRow } from "@/lib/adminNotifications";

const typeIcons: Record<string, any> = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle };
const typeColors: Record<string, string> = {
  info: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  error: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function NotificationsPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <NotificationsContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function NotificationsContent() {
  const toast = useToast();
  const [notifications, setNotifications] = useState<NotificationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().then(setNotifications).catch(() => {
      setNotifications([]);
    }).finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Bell className="w-8 h-8 text-amber-400" /> Notifications</h1>
        <p className="text-gray-400 mt-1">{notifications.length} notifications</p>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-[#0d0d1a]">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-2">No notifications yet</p>
          <p className="text-gray-600 text-sm">Notifications will appear here when customers place orders or when system events occur.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n, i) => {
            const Icon = typeIcons[n.type] || Info;
            return (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className={`flex items-start gap-4 p-5 rounded-2xl border ${n.is_read ? "border-white/5 bg-[#0d0d1a]/50" : "border-white/10 bg-[#0d0d1a]"}`}>
                <div className={`p-2 rounded-xl flex-shrink-0 ${typeColors[n.type] || typeColors.info}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium text-sm">{n.title}</h4>
                    {!n.is_read && (
                      <button onClick={() => handleMarkRead(n.id)} className="w-2 h-2 rounded-full bg-cyan-400 hover:bg-cyan-300 transition-colors" aria-label="Mark as read" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {n.customer_email}</span>
                    <span>{new Date(n.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
