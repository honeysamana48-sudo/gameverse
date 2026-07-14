"use client";

export default function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const colors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    processing: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    shipped: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
    refunded: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    inactive: "bg-gray-500/10 text-gray-400 border-gray-500/30",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    hidden: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${colors[s] || "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
