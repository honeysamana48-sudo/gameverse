"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] animate-energy-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-10 w-10 text-[var(--color-muted)]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.981-4.684 2.517-7.138a1.125 1.125 0 0 0-1.11-1.362H5.25M7.5 14.25 5.106 5.272M7.5 14.25 5.25 5.25M9.75 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <div className="absolute -inset-4 rounded-full bg-[var(--color-violet)]/10 blur-xl" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-8 font-display text-2xl font-bold text-[var(--color-ink)]"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <Link
          href={actionHref}
          className="clip-panel-sm mt-8 inline-flex items-center justify-center bg-[var(--color-violet)] px-8 py-3 font-heading text-sm font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow-violet-lg)] active:scale-95"
        >
          {actionLabel}
        </Link>
      </motion.div>
    </div>
  );
}
