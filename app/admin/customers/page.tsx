"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Mail, ShoppingCart, Search, DollarSign } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import { AdminTable, TableRow, TableCell } from "@/components/admin/AdminTable";
import Pagination from "@/components/admin/Pagination";
import { SkeletonTable } from "@/components/admin/Skeleton";
import { fetchOrders, type OrderRow } from "@/lib/adminOrders";

const ITEMS_PER_PAGE = 15;

export default function CustomersPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <CustomersContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function CustomersContent() {
  const toast = useToast();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders().then(setOrders).catch(() => toast("Failed to load data", "error")).finally(() => setLoading(false));
  }, []);

  const customers = useMemo(() => {
    const map = new Map<string, { email: string; name: string; orders: number; totalSpent: number; lastOrder: string }>();
    orders.forEach(o => {
      const existing = map.get(o.customer_email);
      if (existing) {
        existing.orders++;
        existing.totalSpent += (o.total_amount || o.price || 0);
        if (o.created_at > existing.lastOrder) existing.lastOrder = o.created_at;
      } else {
        map.set(o.customer_email, {
          email: o.customer_email,
          name: o.customer_name,
          orders: 1,
          totalSpent: (o.total_amount || o.price || 0),
          lastOrder: o.created_at,
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const filtered = useMemo(() => {
    return customers.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
  }, [customers, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalSpentAll = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Users className="w-8 h-8 text-pink-400" /> Customers</h1>
        <p className="text-gray-400 mt-1">{customers.length} unique customers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600"><Users className="w-4 h-4 text-white" /></div>
            <span className="text-sm text-gray-400">Total Customers</span>
          </div>
          <p className="text-2xl font-bold text-white">{customers.length}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600"><DollarSign className="w-4 h-4 text-white" /></div>
            <span className="text-sm text-gray-400">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">₹{totalSpentAll.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600"><ShoppingCart className="w-4 h-4 text-white" /></div>
            <span className="text-sm text-gray-400">Avg. Lifetime Value</span>
          </div>
          <p className="text-2xl font-bold text-white">₹{customers.length > 0 ? Math.round(totalSpentAll / customers.length).toLocaleString() : 0}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Search customers by name or email..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 text-sm" />
      </div>

      {loading ? <SkeletonTable rows={5} cols={4} /> : (
        <>
          <AdminTable headers={["Customer", "Email", "Orders", "Total Spent", "Last Order"]}>
            {paginated.map(c => (
              <TableRow key={c.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-fuchsia-500/20 flex items-center justify-center text-xs text-pink-400 font-bold">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium text-sm">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell><span className="text-gray-400 text-sm">{c.email}</span></TableCell>
                <TableCell><span className="text-white font-medium">{c.orders}</span></TableCell>
                <TableCell><span className="text-emerald-400 font-medium">₹{c.totalSpent.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-gray-400 text-xs">{new Date(c.lastOrder).toLocaleDateString()}</span></TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow><TableCell><span className="text-gray-500 block text-center py-8">No customers found</span></TableCell></TableRow>
            )}
          </AdminTable>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
