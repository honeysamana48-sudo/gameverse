"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Search, Eye, CheckCircle, XCircle, Clock, Truck, Trash2, Filter } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import { AdminTable, TableRow, TableCell } from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { SkeletonTable } from "@/components/admin/Skeleton";
import { fetchOrders, updateOrderStatus, deleteOrder, type OrderRow } from "@/lib/adminOrders";
import { supabase } from "@/lib/supabase";

const ITEMS_PER_PAGE = 15;

export default function OrdersPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <OrdersContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function OrdersContent() {
  const toast = useToast();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<OrderRow | null>(null);

  useEffect(() => {
    fetchOrders().then(setOrders).catch(() => toast("Failed to load orders", "error")).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = !search || o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.customer_email.toLowerCase().includes(search.toLowerCase()) || o.game_name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || o.status.toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const success = await updateOrderStatus(id, newStatus);
    if (success) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      toast("Order status updated", "success");
    } else {
      toast("Failed to update status", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from("order_items").delete().eq("order_id", deleteTarget.id);
    const success = await deleteOrder(deleteTarget.id);
    if (success) {
      setOrders(prev => prev.filter(o => o.id !== deleteTarget.id));
      toast("Order deleted", "success");
    } else {
      toast("Failed to delete order", "error");
    }
    setDeleteTarget(null);
  };

  const quickStatusButtons = [
    { label: "All", value: "", icon: Filter, color: "text-gray-400" },
    { label: "Pending", value: "pending", icon: Clock, color: "text-amber-400" },
    { label: "Processing", value: "processing", icon: Truck, color: "text-blue-400" },
    { label: "Delivered", value: "delivered", icon: CheckCircle, color: "text-emerald-400" },
    { label: "Cancelled", value: "cancelled", icon: XCircle, color: "text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><ShoppingCart className="w-8 h-8 text-cyan-400" /> Orders</h1>
          <p className="text-gray-400 mt-1">{filtered.length} orders found</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {quickStatusButtons.map(s => (
          <button key={s.value} onClick={() => { setStatusFilter(s.value); setCurrentPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === s.value ? "bg-white/10 border border-white/20" : "bg-white/5 border border-transparent hover:bg-white/10"} ${s.color}`}>
            <s.icon className="w-4 h-4" /> {s.label}
            {s.value && <span className="text-xs opacity-60">({orders.filter(o => o.status.toLowerCase() === s.value).length})</span>}
            {!s.value && <span className="text-xs opacity-60">({orders.length})</span>}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Search by customer, email, game, or order ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm" />
      </div>

      {loading ? <SkeletonTable rows={8} cols={7} /> : (
        <>
          <AdminTable headers={["Order ID", "Customer", "Game", "Amount", "Status", "Date", "Actions"]}>
            {paginated.map(o => (
              <TableRow key={o.id}>
                <TableCell>
                  <span className="font-mono text-cyan-400 text-xs">{o.id.slice(0, 8)}...</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-white text-sm font-medium">{o.customer_name}</p>
                    <p className="text-gray-500 text-xs">{o.customer_email}</p>
                  </div>
                </TableCell>
                <TableCell><span className="text-gray-300 text-sm">{o.game_name}</span></TableCell>
                <TableCell><span className="text-white font-medium">₹{(o.total_amount || o.price).toLocaleString()}</span></TableCell>
                <TableCell>
                  <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                    onClick={e => e.stopPropagation()}
                    aria-label={`Status for order ${o.id.slice(0, 8)}`}
                    className="text-xs px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer">
                    {["pending", "processing", "shipped", "delivered", "cancelled"].map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/orders/${o.id}`} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400" onClick={e => e.stopPropagation()}>
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => setDeleteTarget(o)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow><TableCell><span className="text-gray-500 block text-center py-8">No orders found</span></TableCell></TableRow>
            )}
          </AdminTable>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Order" message={`Delete order for "${deleteTarget?.customer_name}"? This cannot be undone.`} />
    </div>
  );
}
