import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[var(--color-cyan)] transition-colors hover:text-[var(--color-violet)]">
            ← Back to Store
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-[var(--color-violet)]/5 blur-[100px]" />

        <ScrollReveal>
          <h1 className="mb-8 font-display text-4xl font-bold">About GameVerse</h1>
        </ScrollReveal>

        <div className="space-y-8">
          {[
            {
              title: "Our Mission",
              content: "GameVerse is dedicated to providing instant digital game delivery with unbeatable prices. We believe every gamer should have instant access to their favorite games without delays or complications.",
            },
            {
              title: "Why Choose Us?",
              items: [
                "Instant game delivery via WhatsApp",
                "Unbeatable prices and frequent deals",
                "Secure UPI payments with QR code",
                "Trusted by thousands of players",
                "24/7 customer support",
              ],
            },
            {
              title: "How It Works",
              steps: [
                "Browse our collection of games",
                "Add games to your cart",
                "Complete payment via UPI QR code",
                "Receive game keys instantly on WhatsApp",
              ],
            },
          ].map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.1}>
              <section>
                <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)] font-heading">{section.title}</h2>
                {section.content && (
                  <p className="text-lg leading-relaxed text-[var(--color-muted)]">{section.content}</p>
                )}
                {section.items && (
                  <ul className="space-y-3 text-[var(--color-muted)]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-[var(--color-cyan)]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.steps && (
                  <ol className="space-y-3 text-[var(--color-muted)]">
                    {section.steps.map((step, idx) => (
                      <li key={step} className="flex gap-3">
                        <span className="font-bold text-[var(--color-cyan)]">{idx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.3}>
            <section>
              <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)] font-heading">Contact Us</h2>
              <p className="text-[var(--color-muted)]">Have questions? Reach out to us anytime. We&apos;re here to help!</p>
              <div className="mt-4">
                <Link href="/contact" className="clip-panel-sm inline-flex items-center justify-center bg-[var(--color-violet)] px-6 py-2.5 font-heading text-sm font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all hover:scale-105">
                  Contact Form
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
