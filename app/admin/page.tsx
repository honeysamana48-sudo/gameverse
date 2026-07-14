"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Gamepad2, Lock, User, DollarSign, ShoppingCart, Clock, CheckCircle, Package, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/lib/adminAnalytics";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ok = typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true";
    if (ok) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "gameverse0333" && password === "Arshpreet@1") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080f]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08080f] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 mb-4 shadow-lg shadow-cyan-500/25"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-2">GameVerse Management Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 rounded-2xl border border-white/10 bg-[#0d0d1a] p-8 shadow-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                  placeholder="Enter admin username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                  placeholder="Enter admin password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</motion.p>
            )}
            <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-[0.98]">
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Welcome back, Admin. Here's your overview.</p>
        </div>
        <DashboardOverview />
      </div>
    </AdminLayout>
  );
}

function DashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
      ))}
    </div>
  );

  if (!stats) return <p className="text-gray-400">Failed to load dashboard data.</p>;

  const statCards = [
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "from-emerald-500 to-green-600" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "from-cyan-500 to-blue-600" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "from-amber-500 to-orange-600" },
    { label: "Delivered", value: stats.deliveredOrders, icon: CheckCircle, color: "from-emerald-500 to-teal-600" },
    { label: "Products", value: stats.totalProducts, icon: Package, color: "from-purple-500 to-violet-600" },
    { label: "Low Stock", value: stats.lowStockProducts, icon: AlertTriangle, color: "from-red-500 to-rose-600" },
    { label: "Customers", value: stats.totalCustomers, icon: Users, color: "from-pink-500 to-fuchsia-600" },
    { label: "Avg Order Value", value: `₹${stats.avgOrderValue}`, icon: TrendingUp, color: "from-blue-500 to-indigo-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0d1a] to-[#12122a] p-6"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.color} opacity-10 rounded-full blur-2xl -translate-y-6 translate-x-6`} />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-gray-400 text-sm mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-white">{s.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${s.color}`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order status breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-4">Order Status</h3>
          <div className="space-y-3">
            {[
              { label: "Pending", value: stats.pendingOrders, color: "bg-amber-400" },
              { label: "Processing", value: stats.processingOrders, color: "bg-blue-400" },
              { label: "Delivered", value: stats.deliveredOrders, color: "bg-emerald-400" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.color}`} />
                <span className="text-sm text-gray-400 flex-1">{s.label}</span>
                <span className="text-sm font-bold text-white">{s.value}</span>
                <div className="w-24 h-1.5 rounded-full bg-white/5">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${stats.totalOrders > 0 ? (s.value / stats.totalOrders) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Games</h3>
          <div className="space-y-3">
            {Object.entries(stats.topGames)
              .sort(([,a]: any, [,b]: any) => b.count - a.count)
              .slice(0, 5)
              .map(([name, data]: any) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-xs text-cyan-400 font-bold">
                    {data.count}
                  </div>
                  <span className="text-sm text-gray-300 flex-1 truncate">{name}</span>
                  <span className="text-sm text-gray-400">₹{data.revenue.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
