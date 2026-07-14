"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";
interface Toast { id: string; message: string; type: ToastType; }

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const icons = { success: CheckCircle, error: XCircle, warning: AlertTriangle, info: Info };
  const colors = { success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", error: "text-red-400 bg-red-500/10 border-red-500/30", warning: "text-amber-400 bg-amber-500/10 border-amber-500/30", info: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 max-w-sm" role="status" aria-live="polite">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${colors[t.type]}`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm text-white flex-1">{t.message}</span>
                <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-white" aria-label="Dismiss notification">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
