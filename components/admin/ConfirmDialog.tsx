"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import GlowButton from "../GlowButton";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  variant?: "danger" | "warning";
}

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", variant = "danger" }: ConfirmDialogProps) {
  const colors = variant === "danger" ? "from-red-500 to-red-600" : "from-amber-500 to-orange-600";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${colors}`}>
                <AlertTriangle className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <h3 id="confirm-title" className="text-lg font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm">Cancel</button>
              <GlowButton onClick={onConfirm} className={`px-4 py-2 text-sm bg-gradient-to-r ${colors} text-white rounded-lg`}>
                {confirmText}
              </GlowButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
