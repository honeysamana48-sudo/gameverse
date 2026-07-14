"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: { value: number; isUp: boolean };
}

export default function StatCard({ label, value, icon: Icon, color = "from-cyan-500 to-blue-600", trend }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0d1a] to-[#12122a] p-6 group hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full blur-3xl -translate-y-8 translate-x-8`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.isUp ? "text-emerald-400" : "text-red-400"}`}>
              {trend.isUp ? <TrendingUp className="w-3 h-3" aria-hidden="true" /> : <TrendingDown className="w-3 h-3" aria-hidden="true" />}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}
