"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Instant Delivery",
    description:
      "Get your game key or account access within minutes of order confirmation.",
    icon: "bolt",
    color: "var(--color-cyan)",
  },
  {
    title: "Secure QR Payments",
    description:
      "Pay safely through UPI QR code — no card details ever leave your hands.",
    icon: "shield",
    color: "var(--color-violet)",
  },
  {
    title: "Unbeatable Prices",
    description:
      "We cut the middleman so you get the deepest discounts on every title.",
    icon: "tag",
    color: "var(--color-flame)",
  },
  {
    title: "24/7 WhatsApp Support",
    description:
      "Real humans respond to your order and support queries directly on WhatsApp.",
    icon: "chat",
    color: "var(--color-mint)",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--color-violet)]/5 blur-[100px]" />

      <ScrollReveal>
        <div className="relative text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Why Players Trust Us
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Why Choose GameVerse
          </h2>
        </div>
      </ScrollReveal>

      <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 0.1}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="clip-panel group relative border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-6 transition-all duration-500 hover:border-[var(--color-violet)]/40 hover:shadow-[0_0_20px_rgba(124,92,252,0.1)]"
            >
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at 50% 0%, ${feature.color}08, transparent)`,
                }}
              />

              <div className="relative">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                  }}
                >
                  <FeatureIcon name={feature.icon} color={feature.color} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-[var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ name, color }: { name: string; color: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    className: "h-6 w-6",
    "aria-hidden": "true" as const,
  };

  switch (name) {
    case "bolt":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5 3l-1.5 7.5h6.75L9 21l1.5-7.5H3.75Z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 4.5 6v6c0 4.5 3.2 7.4 7.5 9 4.3-1.6 7.5-4.5 7.5-9V6L12 3Z" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.568 3 8.932 8.932a2.25 2.25 0 0 1 0 3.182l-5.386 5.386a2.25 2.25 0 0 1-3.182 0L.632 11.834V3h8.936Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      );
  }
}
