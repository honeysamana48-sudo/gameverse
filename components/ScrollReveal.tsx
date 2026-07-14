"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  scale?: boolean;
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const prefersReduced = useReducedMotion();
  const offset = directionMap[direction];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: scale ? 0.95 : 1 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : { opacity: 0, x: offset.x, y: offset.y, scale: scale ? 0.95 : 1 }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
