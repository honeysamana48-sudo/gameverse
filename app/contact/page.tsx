"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cyan)]/5 via-transparent to-[var(--color-violet)]/5" />
        <div className="absolute left-1/4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[var(--color-cyan)]/10 blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <ScrollReveal>
            <span className="inline-block rounded-full border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-5 py-2 font-heading text-sm font-semibold text-[var(--color-cyan)]">
              🎮 GameVerse Support
            </span>
            <h1 className="mt-8 font-display text-5xl font-bold md:text-6xl">
              Contact <span className="text-gradient">GameVerse</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-[var(--color-muted)] leading-relaxed">
              Need help with your order, payment, or game activation?
              Our support team is ready to assist you quickly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              emoji: "💬",
              title: "WhatsApp Support",
              desc: "Chat directly with our support team for instant assistance.",
              value: "+91 87258 41263",
              valueColor: "text-[var(--color-cyan)]",
              cta: "Chat Now →",
              ctaBg: "bg-[var(--color-mint)] hover:bg-[var(--color-mint)]/90 text-[var(--color-void)]",
              href: "https://wa.me/918725841263",
              hoverBorder: "hover:border-[var(--color-mint)]",
            },
            {
              emoji: "📧",
              title: "Email Support",
              desc: "Send us your questions anytime. We normally reply within a few hours.",
              value: "gameverse0333@gmail.com",
              valueColor: "text-[var(--color-cyan)]",
              cta: "Send Email →",
              ctaBg: "bg-[var(--color-cyan)] hover:bg-[var(--color-cyan)]/90 text-[var(--color-void)]",
              href: "mailto:gameverse0333@gmail.com",
              hoverBorder: "hover:border-[var(--color-cyan)]",
            },
            {
              emoji: "📷",
              title: "Instagram",
              desc: "Follow GameVerse for game launches, exclusive offers, and gaming news.",
              value: "@gameverse333",
              valueColor: "text-[var(--color-flame)]",
              cta: "Follow on Instagram →",
              ctaBg: "bg-gradient-to-r from-[var(--color-flame)] via-purple-500 to-orange-500 text-white",
              href: "https://www.instagram.com/gameverse333",
              hoverBorder: "hover:border-[var(--color-flame)]",
            },
              ].map((card, index) => (
            <ScrollReveal key={card.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className={`rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-all duration-300 ${card.hoverBorder} hover:shadow-lg hover:shadow-black/20`}
              >
                <div className="text-5xl">{card.emoji}</div>
                <h2 className="text-2xl font-bold mt-6 font-heading">{card.title}</h2>
                <p className="text-[var(--color-muted)] mt-4 leading-relaxed">{card.desc}</p>
                <p className={`font-bold text-lg mt-8 ${card.valueColor}`}>{card.value}</p>
                <a
                  href={card.href}
                  target={card.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={card.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={`clip-panel-sm inline-block mt-8 px-6 py-3 font-heading font-bold transition-all duration-300 hover:scale-105 ${card.ctaBg}`}
                >
                  {card.cta}
                </a>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 shadow-lg shadow-black/20">
            <h2 className="text-4xl font-bold text-center font-display">
              Why Choose <span className="text-gradient">GameVerse?</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              {[
                { emoji: "⚡", title: "Instant Delivery", desc: "Fast game delivery after payment verification." },
                { emoji: "🔒", title: "Secure Payments", desc: "Safe UPI payments with trusted support." },
                { emoji: "🎮", title: "Premium Games", desc: "Steam, Rockstar, EA, Ubisoft and many more." },
                { emoji: "⭐", title: "Trusted Support", desc: "Friendly customer service whenever you need help." },
              ].map((f) => (
                <div key={f.title} className="text-center">
                  <div className="text-5xl">{f.emoji}</div>
                  <h3 className="font-bold text-xl mt-4 font-heading">{f.title}</h3>
                  <p className="text-[var(--color-muted)] mt-3">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
