"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, Mail, Phone, MapPin, CreditCard, FileText, Truck, Clock, CheckCircle, Save } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import StatusBadge from "@/components/admin/StatusBadge";
import { fetchOrderById, updateOrderStatus, updateOrderNotes, updateOrderTracking, type OrderRow } from "@/lib/adminOrders";
import { fetchOrderItems, type OrderItemRow } from "@/lib/orderItems";
import Link from "next/link";

export default function OrderDetailPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <OrderDetailContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function OrderDetailContent() {
  const params = useParams();
  const router = useRouter();
  const toast = useToast();
  const id = params?.id as string;
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [tracking, setTracking] = useState("");
  const [saving, setSaving] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItemRow[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchOrderById(id).then(o => {
      if (o) { setOrder(o); setNotes(o.notes || ""); setTracking(o.tracking_number || ""); }
    }).finally(() => setLoading(false));
    fetchOrderItems(id).then(setOrderItems).catch(() => {});
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return;
    await updateOrderStatus(order.id, newStatus);
    setOrder({ ...order, status: newStatus });
    toast("Status updated", "success");
  };

  const handleSaveDetails = async () => {
    if (!order) return;
    setSaving(true);
    await Promise.all([updateOrderNotes(order.id, notes), updateOrderTracking(order.id, tracking)]);
    setOrder({ ...order, notes, tracking_number: tracking });
    toast("Order details saved", "success");
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!order) return <div className="text-center py-20"><p className="text-gray-400">Order not found</p><Link href="/admin/orders" className="text-cyan-400 text-sm mt-2 inline-block">Back to orders</Link></div>;

  const timeline = [
    { label: "Order Placed", icon: Clock, time: order.created_at, active: true },
    { label: "Processing", icon: Package, time: ["processing", "shipped", "delivered"].includes(order.status) ? order.updated_at : null, active: ["processing", "shipped", "delivered"].includes(order.status) },
    { label: "Shipped", icon: Truck, time: ["shipped", "delivered"].includes(order.status) ? order.updated_at : null, active: ["shipped", "delivered"].includes(order.status) },
    { label: "Delivered", icon: CheckCircle, time: order.status === "delivered" ? order.updated_at : null, active: order.status === "delivered" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-2xl font-bold text-white">Order Details</h1>
          <p className="text-gray-400 text-sm font-mono">{order.id}</p>
        </div>
        <div className="ml-auto"><StatusBadge status={order.status} /></div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Order Timeline</h3>
        <div className="flex items-center justify-between">
          {timeline.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? "bg-cyan-500/20 border-2 border-cyan-500" : "bg-white/5 border border-white/10"}`}>
                  <step.icon className={`w-4 h-4 ${step.active ? "text-cyan-400" : "text-gray-500"}`} />
                </div>
                <span className={`text-xs ${step.active ? "text-cyan-400" : "text-gray-500"}`}>{step.label}</span>
              </div>
              {i < timeline.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${step.active && timeline[i + 1].active ? "bg-cyan-500" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Order Items */}
      {orderItems.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
          <h3 className="text-lg font-bold text-white mb-4">Order Items</h3>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-white font-medium text-sm">{item.product_name}</p>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity} x ₹{item.unit_price}</p>
                </div>
                <span className="text-white font-medium">₹{item.subtotal.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer info */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Customer Information</h3>
          <InfoRow icon={User} label="Name" value={order.customer_name} />
          <InfoRow icon={Mail} label="Email" value={order.customer_email} />
          {order.phone && <InfoRow icon={Phone} label="Phone" value={order.phone} />}
          {order.shipping_address && <InfoRow icon={MapPin} label="Address" value={order.shipping_address} />}
        </div>

        {/* Order info */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Order Information</h3>
          <InfoRow icon={Package} label="Game" value={order.game_name} />
          <InfoRow icon={CreditCard} label="Amount" value={`₹${(order.total_amount || order.price).toLocaleString()}`} />
          <InfoRow icon={FileText} label="Payment" value={order.payment_method || "UPI"} />
          {order.coupon_code && <InfoRow icon={FileText} label="Coupon" value={`${order.coupon_code} (-₹${order.discount_amount || 0})`} />}
          {order.utr && <InfoRow icon={FileText} label="UTR" value={order.utr} />}
          <InfoRow icon={Clock} label="Placed" value={new Date(order.created_at).toLocaleString()} />
        </div>
      </div>

      {/* Status update */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6">
        <h3 className="text-lg font-bold text-white mb-4">Update Status</h3>
        <div className="flex gap-2 flex-wrap">
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(s => (
            <button key={s} onClick={() => handleStatusChange(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${order.status === s ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-400" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notes & Tracking */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Notes & Tracking</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Admin Notes</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none" placeholder="Add internal notes..." />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tracking Number</label>
          <input value={tracking} onChange={e => setTracking(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50" placeholder="Enter tracking number" />
        </div>
        <button onClick={handleSaveDetails} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Details"}
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </div>
  );
}
