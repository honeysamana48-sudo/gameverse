"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "cyan";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-[var(--color-violet)] text-white shadow-[var(--shadow-glow-violet)] hover:shadow-[var(--shadow-glow-violet-lg)] hover:brightness-110",
  secondary:
    "border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/20 hover:shadow-[var(--shadow-glow-cyan)]",
  danger:
    "border border-[var(--color-flame)]/50 bg-[var(--color-flame)]/10 text-[var(--color-flame)] hover:bg-[var(--color-flame)]/20",
  cyan:
    "bg-[var(--color-cyan)] text-[var(--color-void)] hover:brightness-110 hover:shadow-[var(--shadow-glow-cyan)]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3.5 text-base",
};

export default function GlowButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  type = "button",
}: GlowButtonProps) {
  const baseClasses = `clip-panel-sm inline-flex items-center justify-center font-heading font-semibold transition-all duration-300 active:scale-95 ${variants[variant]} ${sizes[size]}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      whileHover={!disabled ? { scale: 1.03 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
    >
      {children}
    </motion.button>
  );
}
