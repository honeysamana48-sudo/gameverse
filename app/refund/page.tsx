import Link from "next/link";

export default function RefundPage() {
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
        <h1 className="mb-8 text-4xl font-bold">Refund Policy</h1>

        <div className="space-y-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">1. Refund Eligibility</h2>
            <p>
              Due to the nature of digital products, refunds are only available in the following situations:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>We delivered the wrong game key</li>
              <li>The game key is invalid or non-functional</li>
              <li>Payment was processed twice by mistake</li>
              <li>Technical error on our part prevented delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">2. Non-Refundable Situations</h2>
            <p>
              Refunds will NOT be provided in the following cases:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>You changed your mind about the game</li>
              <li>You already received and activated the game key</li>
              <li>You purchased the wrong game by mistake</li>
              <li>The game does not meet your expectations or system requirements</li>
              <li>Your account was suspended due to violation of terms</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">3. How to Request a Refund</h2>
            <p>
              To request a refund, please contact us with:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>Your order details (Transaction ID/UTR)</li>
              <li>The game name and price</li>
              <li>A detailed explanation of the issue</li>
              <li>Any relevant evidence (screenshots, error messages, etc.)</li>
            </ul>
            <p className="mt-4">
              Contact us through our{" "}
              <Link href="/#contact" className="text-[var(--color-cyan)] hover:underline">
                contact form
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">4. Refund Processing Time</h2>
            <p>
              Once your refund request is approved, we will process it within 5-7 business days. The refund will be sent back to the original UPI account used for payment.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">5. Partial Refunds</h2>
            <p>
              If you purchased multiple games in one order and only one is problematic, we can offer a partial refund for that specific game only.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">6. Coupon/Discount Refunds</h2>
            <p>
              If a refund is issued for an order with an applied coupon, the refund will be for the discounted price (including the discount applied).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">7. Key Replacement</h2>
            <p>
              If your game key is invalid or non-functional, we will provide a replacement key free of charge instead of a refund. Replacements are typically provided within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">8. Disputes</h2>
            <p>
              We stand behind our products and service. If you believe your refund was unfairly denied, you may escalate your case for review by contacting us through our{" "}
              <Link href="/#contact" className="text-[var(--color-cyan)] hover:underline">
                contact form
              </Link>
              .
            </p>
          </section>

          <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
            <p className="text-sm">
              <strong>Note:</strong> All refund decisions are made at our discretion based on our refund policy. We appreciate your understanding and will always work with you to resolve any issues.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
