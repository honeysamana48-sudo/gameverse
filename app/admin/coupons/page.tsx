"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Tag, Plus, Trash2, Edit, ToggleLeft, ToggleRight, Copy, Check } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import AdminModal from "@/components/admin/AdminModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { AdminTable, TableRow, TableCell } from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { fetchCoupons, createCoupon, updateCoupon, deleteCoupon, toggleCoupon, type CouponRow } from "@/lib/adminCoupons";

export default function CouponsPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <CouponsContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function CouponsContent() {
  const toast = useToast();
  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editCoupon, setEditCoupon] = useState<CouponRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CouponRow | null>(null);
  const [copiedCode, setCopiedCode] = useState("");
  const [form, setForm] = useState({ code: "", discount_type: "percentage" as "percentage" | "fixed", discount_value: 10, min_purchase: 0, max_discount: 0, usage_limit: 0, is_active: true, expires_at: "" });

  useEffect(() => {
    fetchCoupons().then(setCoupons).catch(() => toast("Failed to load coupons", "error")).finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.code.trim()) { toast("Code is required", "error"); return; }
    await createCoupon({ ...form, expires_at: form.expires_at || null });
    const updated = await fetchCoupons();
    setCoupons(updated);
    toast("Coupon created", "success");
    setShowCreate(false);
    resetForm();
  };

  const handleEdit = async () => {
    if (!editCoupon) return;
    await updateCoupon(editCoupon.id, form);
    setCoupons(prev => prev.map(c => c.id === editCoupon.id ? { ...c, ...form } : c));
    toast("Coupon updated", "success");
    setEditCoupon(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteCoupon(deleteTarget.id);
    setCoupons(prev => prev.filter(c => c.id !== deleteTarget.id));
    toast("Coupon deleted", "success");
    setDeleteTarget(null);
  };

  const handleToggle = async (c: CouponRow) => {
    await toggleCoupon(c.id, !c.is_active);
    setCoupons(prev => prev.map(p => p.id === c.id ? { ...p, is_active: !p.is_active } : p));
    toast(c.is_active ? "Coupon deactivated" : "Coupon activated", "success");
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const resetForm = () => setForm({ code: "", discount_type: "percentage", discount_value: 10, min_purchase: 0, max_discount: 0, usage_limit: 0, is_active: true, expires_at: "" });

  const openEdit = (c: CouponRow) => {
    setForm({ code: c.code, discount_type: c.discount_type, discount_value: c.discount_value, min_purchase: c.min_purchase, max_discount: c.max_discount, usage_limit: c.usage_limit, is_active: c.is_active, expires_at: c.expires_at || "" });
    setEditCoupon(c);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Tag className="w-8 h-8 text-amber-400" /> Coupons</h1>
          <p className="text-gray-400 mt-1">{coupons.length} total coupons</p>
        </div>
        <button onClick={() => { resetForm(); setShowCreate(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : (
        <AdminTable headers={["Code", "Discount", "Min Purchase", "Usage", "Status", "Actions"]}>
          {coupons.map(c => (
            <TableRow key={c.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 font-bold text-sm">{c.code}</span>
                  <button onClick={() => copyCode(c.code)} className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white">
                    {copiedCode === c.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-white font-medium">{c.discount_type === "percentage" ? `${c.discount_value}%` : `₹${c.discount_value}`}</span>
              </TableCell>
              <TableCell><span className="text-gray-400">{c.min_purchase > 0 ? `₹${c.min_purchase}` : "—"}</span></TableCell>
              <TableCell>
                <span className="text-gray-300">{c.used_count}{c.usage_limit > 0 ? ` / ${c.usage_limit}` : ""}</span>
              </TableCell>
              <TableCell>
                <StatusBadge status={c.is_active ? "active" : "inactive"} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleToggle(c)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-amber-400">
                    {c.is_active ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteTarget(c)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {coupons.length === 0 && <TableRow><TableCell><span className="text-gray-500 block text-center py-8">No coupons yet. Create one to get started.</span></TableCell></TableRow>}
        </AdminTable>
      )}

      {/* Create/Edit Modal */}
      <AdminModal isOpen={showCreate || !!editCoupon} onClose={() => { setShowCreate(false); setEditCoupon(null); }} title={editCoupon ? "Edit Coupon" : "Create Coupon"} maxWidth="max-w-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Coupon Code</label>
            <input value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50" placeholder="e.g. SAVE20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <select value={form.discount_type} onChange={e => setForm(p => ({ ...p, discount_type: e.target.value as any }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50">
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Value</label>
              <input type="number" value={form.discount_value} onChange={e => setForm(p => ({ ...p, discount_value: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Min Purchase (₹)</label>
              <input type="number" value={form.min_purchase} onChange={e => setForm(p => ({ ...p, min_purchase: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max Discount (₹)</label>
              <input type="number" value={form.max_discount} onChange={e => setForm(p => ({ ...p, max_discount: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Usage Limit (0 = unlimited)</label>
              <input type="number" value={form.usage_limit} onChange={e => setForm(p => ({ ...p, usage_limit: Number(e.target.value) }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Expires At</label>
              <input type="datetime-local" value={form.expires_at} onChange={e => setForm(p => ({ ...p, expires_at: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button onClick={() => { setShowCreate(false); setEditCoupon(null); }} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-sm">Cancel</button>
            <button onClick={editCoupon ? handleEdit : handleCreate}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium hover:shadow-lg transition-all">
              {editCoupon ? "Save Changes" : "Create Coupon"}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Coupon" message={`Delete coupon "${deleteTarget?.code}"? This cannot be undone.`} />
    </div>
  );
}
