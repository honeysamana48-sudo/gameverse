"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useCallback } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  tilt = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [tilt, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    if (tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [tilt, mouseX, mouseY]);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm ${glow ? "glow-border" : ""} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: "rgba(124, 92, 252, 0.4)",
              boxShadow: "0 0 20px rgba(124, 92, 252, 0.15), 0 8px 30px rgba(0,0,0,0.3)",
            }
          : undefined
      }
      style={tilt ? { rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" as const } : undefined}
    >
      {children}
    </motion.div>
  );
}
