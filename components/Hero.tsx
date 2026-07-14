"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* 3D Background */}
      <HeroScene />

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] via-transparent to-[var(--color-void)]" />
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[var(--color-violet)]/15 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--color-cyan)]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--color-violet)]/10 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-[2] mx-auto flex max-w-7xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-violet)]/30 bg-[var(--color-violet)]/10 px-5 py-2 font-heading text-xs font-semibold uppercase tracking-widest text-[var(--color-cyan)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-cyan)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-cyan)]" />
              </span>
              Up to 50% OFF this week
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={item}
            className="mt-8 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
          >
            Buy PC Games{" "}
            <span className="text-gradient">Instantly</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            Instant digital delivery, unbeatable prices, secure payments,
            and 24/7 customer support. Get your favorite PC games in minutes.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={item} className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/games"
              className="clip-panel-sm group relative inline-flex items-center justify-center bg-[var(--color-violet)] px-8 py-4 font-heading text-base font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow-violet-lg)]"
            >
              <span className="relative z-10">🎮 Browse Games</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-violet-dim)] opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>

            <Link
              href="#games"
              className="clip-panel-sm inline-flex items-center justify-center border border-[var(--color-cyan)]/50 bg-[var(--color-cyan)]/5 px-8 py-4 font-heading text-base font-bold text-[var(--color-cyan)] transition-all duration-300 hover:bg-[var(--color-cyan)]/15 hover:shadow-[var(--shadow-glow-cyan)] hover:scale-105"
            >
              ⭐ Featured Games
            </Link>

            <Link
              href="#deals"
              className="clip-panel-sm inline-flex items-center justify-center border border-[var(--color-flame)]/50 bg-[var(--color-flame)]/5 px-8 py-4 font-heading text-base font-bold text-[var(--color-flame)] transition-all duration-300 hover:bg-[var(--color-flame)]/15 hover:scale-105"
            >
              🔥 Hot Deals
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 grid w-full max-w-lg grid-cols-3 gap-8 border-t border-[var(--color-border)]/50 pt-8"
          >
            {[
              { value: "12K+", label: "Games Sold" },
              { value: "4.8/5", label: "Player Rating" },
              { value: "<5 min", label: "Avg. Delivery" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-wider text-[var(--color-muted-2)] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-void)] to-transparent z-[2]" />
    </section>
  );
}
