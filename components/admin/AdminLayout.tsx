"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Tag, Star, BarChart3,
  Activity, Users, Bell, Settings, ChevronLeft, ChevronRight,
  LogOut, Shield, Menu, X, Gamepad2
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Coupons", href: "/admin/coupons", icon: Tag },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Activity Log", href: "/admin/activity", icon: Activity },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ok = typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true";
    if (!ok) { window.location.href = "/admin"; }
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 p-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-white">GameVerse</span>}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              isActive(item.href)
                ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            } ${collapsed ? "justify-center" : ""}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#08080f]">
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-white/10 bg-[#0a0a18] transition-all duration-300 ${collapsed ? "w-[72px]" : "w-64"}`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 -right-3 z-50 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
          style={{ left: collapsed ? "60px" : "252px" }}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-64 z-50 bg-[#0a0a18] border-r border-white/10 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080f]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-gray-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Admin Online</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-white font-medium">GameVerse Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
