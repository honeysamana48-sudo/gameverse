import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-[var(--color-cyan)]">
            ← Back to Store
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="mb-8 text-4xl font-bold">About GameVerse</h1>

        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)]">Our Mission</h2>
            <p className="text-lg leading-relaxed text-[var(--color-muted)]">
              GameVerse is dedicated to providing instant digital game delivery with unbeatable prices. We believe every gamer should have instant access to their favorite games without delays or complications.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)]">Why Choose Us?</h2>
            <ul className="space-y-3 text-[var(--color-muted)]">
              <li className="flex gap-3">
                <span className="text-[var(--color-cyan)]">✓</span>
                <span>Instant game delivery via WhatsApp</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-cyan)]">✓</span>
                <span>Unbeatable prices and frequent deals</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-cyan)]">✓</span>
                <span>Secure UPI payments with QR code</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-cyan)]">✓</span>
                <span>Trusted by thousands of players</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--color-cyan)]">✓</span>
                <span>24/7 customer support</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)]">How It Works</h2>
            <ol className="space-y-3 text-[var(--color-muted)]">
              <li className="flex gap-3">
                <span className="font-bold text-[var(--color-cyan)]">1.</span>
                <span>Browse our collection of games</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[var(--color-cyan)]">2.</span>
                <span>Add games to your cart</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[var(--color-cyan)]">3.</span>
                <span>Complete payment via UPI QR code</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[var(--color-cyan)]">4.</span>
                <span>Receive game keys instantly on WhatsApp</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-cyan)]">Contact Us</h2>
            <p className="text-[var(--color-muted)]">
              Have questions? Reach out to us anytime. We're here to help!
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="/#contact" className="rounded bg-[var(--color-cyan)] px-4 py-2 font-medium text-[var(--color-void)] transition-opacity hover:opacity-90">
                Contact Form
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
