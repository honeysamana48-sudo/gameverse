"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Check, Eye, EyeOff, Pin, MessageSquare, Trash2, Reply } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ToastProvider, useToast } from "@/components/admin/Toast";
import AdminModal from "@/components/admin/AdminModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { AdminTable, TableRow, TableCell } from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import { fetchReviews, approveReview, hideReview, pinReview, replyToReview, deleteReview, type ReviewRow } from "@/lib/adminReviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <AdminLayout>
      <ToastProvider>
        <ReviewsContent />
      </ToastProvider>
    </AdminLayout>
  );
}

function ReviewsContent() {
  const toast = useToast();
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTarget, setReplyTarget] = useState<ReviewRow | null>(null);
  const [replyText, setReplyText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ReviewRow | null>(null);

  useEffect(() => {
    fetchReviews().then(setReviews).catch(() => toast("Failed to load reviews", "error")).finally(() => setLoading(false));
  }, []);

  const handleApprove = async (r: ReviewRow) => {
    await approveReview(r.id);
    setReviews(prev => prev.map(p => p.id === r.id ? { ...p, is_approved: true } : p));
    toast("Review approved", "success");
  };

  const handleHide = async (r: ReviewRow) => {
    await hideReview(r.id, !r.is_hidden);
    setReviews(prev => prev.map(p => p.id === r.id ? { ...p, is_hidden: !r.is_hidden } : p));
    toast(r.is_hidden ? "Review visible" : "Review hidden", "success");
  };

  const handlePin = async (r: ReviewRow) => {
    await pinReview(r.id, !r.is_pinned);
    setReviews(prev => prev.map(p => p.id === r.id ? { ...p, is_pinned: !r.is_pinned } : p));
    toast(r.is_pinned ? "Review unpinned" : "Review pinned", "success");
  };

  const handleReply = async () => {
    if (!replyTarget || !replyText.trim()) return;
    await replyToReview(replyTarget.id, replyText);
    setReviews(prev => prev.map(p => p.id === replyTarget.id ? { ...p, admin_reply: replyText } : p));
    toast("Reply saved", "success");
    setReplyTarget(null);
    setReplyText("");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteReview(deleteTarget.id);
    setReviews(prev => prev.filter(p => p.id !== deleteTarget.id));
    toast("Review deleted", "success");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3"><Star className="w-8 h-8 text-amber-400" /> Reviews</h1>
        <p className="text-gray-400 mt-1">{reviews.length} total reviews</p>
      </div>

      {loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-[#0d0d1a]">
          <Star className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-5 ${r.is_pinned ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 bg-[#0d0d1a]"} ${r.is_hidden ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={r.rating} />
                    {r.is_pinned && <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Pinned</span>}
                    {r.is_hidden && <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Hidden</span>}
                    {!r.is_approved && <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Pending</span>}
                  </div>
                  {r.title && <h4 className="text-white font-medium text-sm">{r.title}</h4>}
                  <p className="text-gray-300 text-sm mt-1">{r.comment}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span>{r.customer_name}</span>
                    <span>{r.game_name}</span>
                    <span>{new Date(r.created_at).toLocaleDateString()}</span>
                  </div>
                  {r.admin_reply && (
                    <div className="mt-3 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                      <p className="text-xs text-cyan-400 font-medium mb-1">Admin Reply</p>
                      <p className="text-sm text-gray-300">{r.admin_reply}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!r.is_approved && (
                    <button onClick={() => handleApprove(r)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-emerald-400" title="Approve">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => handleHide(r)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-amber-400" title={r.is_hidden ? "Show" : "Hide"}>
                    {r.is_hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handlePin(r)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-purple-400" title={r.is_pinned ? "Unpin" : "Pin"}>
                    <Pin className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setReplyTarget(r); setReplyText(r.admin_reply || ""); }} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400" title="Reply">
                    <Reply className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteTarget(r)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AdminModal isOpen={!!replyTarget} onClose={() => setReplyTarget(null)} title="Reply to Review" maxWidth="max-w-lg">
        <div className="space-y-4">
          {replyTarget && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <StarRating rating={replyTarget.rating} />
              <p className="text-sm text-gray-300 mt-2">{replyTarget.comment}</p>
            </div>
          )}
          <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none" placeholder="Write your reply..." />
          <div className="flex justify-end gap-3">
            <button onClick={() => setReplyTarget(null)} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-sm">Cancel</button>
            <button onClick={handleReply} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all">Send Reply</button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Review" message="This review will be permanently deleted." />
    </div>
  );
}
