"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import { getDashboardStats } from "@/lib/adminAnalytics";

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <AnalyticsContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function AnalyticsContent() {
  const toast = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => toast("Failed to load analytics", "error")).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white flex items-center gap-3"><BarChart3 className="w-8 h-8 text-cyan-400" /> Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />)}
      </div>
    </div>
  );

  if (!stats) return <p className="text-gray-400">Failed to load analytics.</p>;

  const maxMonthlyRevenue = Math.max(...Object.values(stats.ordersByMonth).map((m: any) => m.revenue), 1);
  const maxTopGameCount = Math.max(...Object.values(stats.topGames).map((g: any) => g.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3"><BarChart3 className="w-8 h-8 text-cyan-400" /> Analytics</h1>
        <p className="text-gray-400 mt-1">Business insights and performance metrics</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Monthly Revenue", value: `₹${stats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, color: "from-emerald-500 to-green-600" },
          { label: "Monthly Orders", value: stats.recentOrders, icon: ShoppingCart, color: "from-cyan-500 to-blue-600" },
          { label: "Avg Order Value", value: `₹${stats.avgOrderValue}`, icon: TrendingUp, color: "from-purple-500 to-violet-600" },
          { label: "Total Customers", value: stats.totalCustomers, icon: Users, color: "from-pink-500 to-fuchsia-600" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${s.color}`}><s.icon className="w-4 h-4 text-white" /></div>
              <span className="text-sm text-gray-400">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by month - bar chart */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue by Month</h3>
          <div className="space-y-3">
            {Object.entries(stats.ordersByMonth).map(([month, data]: any) => (
              <div key={month} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20 text-right">{month}</span>
                <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.revenue / maxMonthlyRevenue) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-end pr-3"
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">₹{data.revenue.toLocaleString()}</span>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-500 w-8">{data.count}</span>
              </div>
            ))}
            {Object.keys(stats.ordersByMonth).length === 0 && <p className="text-gray-500 text-center py-8">No data yet</p>}
          </div>
        </div>

        {/* Top games - horizontal bar */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Selling Games</h3>
          <div className="space-y-3">
            {Object.entries(stats.topGames)
              .sort(([,a]: any, [,b]: any) => b.count - a.count)
              .slice(0, 8)
              .map(([name, data]: any) => (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-32 truncate text-right">{name}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.count / maxTopGameCount) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-end pr-3"
                    >
                      <span className="text-xs text-white font-medium">{data.count} sales</span>
                    </motion.div>
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-right">₹{data.revenue.toLocaleString()}</span>
                </div>
              ))}
            {Object.keys(stats.topGames).length === 0 && <p className="text-gray-500 text-center py-8">No data yet</p>}
          </div>
        </div>

        {/* Category distribution */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Products by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.categoryStats)
              .sort(([,a]: any, [,b]: any) => b - a)
              .map(([cat, count]: any) => {
                const colors = ["from-cyan-500 to-blue-600", "from-purple-500 to-violet-600", "from-amber-500 to-orange-600", "from-emerald-500 to-green-600", "from-pink-500 to-rose-600", "from-indigo-500 to-blue-700"];
                const idx = Object.keys(stats.categoryStats).indexOf(cat);
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-24 text-right">{cat}</span>
                    <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / stats.totalProducts) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-gradient-to-r ${colors[idx % colors.length]} rounded-lg flex items-center justify-end pr-3`}
                      >
                        <span className="text-xs text-white font-medium">{count}</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-6">Order Status Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: "Pending", value: stats.pendingOrders, color: "bg-amber-400", gradient: "from-amber-500 to-orange-600" },
              { label: "Processing", value: stats.processingOrders, color: "bg-blue-400", gradient: "from-blue-500 to-indigo-600" },
              { label: "Delivered", value: stats.deliveredOrders, color: "bg-emerald-400", gradient: "from-emerald-500 to-green-600" },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{s.label}</span>
                  <span className="text-sm font-bold text-white">{s.value} ({stats.totalOrders > 0 ? Math.round((s.value / stats.totalOrders) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.totalOrders > 0 ? (s.value / stats.totalOrders) * 100 : 0}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${s.gradient} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
