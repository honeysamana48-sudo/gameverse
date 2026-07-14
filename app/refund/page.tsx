import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 font-heading text-sm font-bold text-[var(--color-cyan)] transition-colors hover:text-[var(--color-violet)]">
            ← Back to Store
          </Link>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-[var(--color-violet)]/5 blur-[100px]" />

        <ScrollReveal>
          <h1 className="mb-8 font-display text-4xl font-bold">Refund Policy</h1>
        </ScrollReveal>

        <div className="space-y-8 text-[var(--color-muted)]">
          {[
            { title: "1. Refund Eligibility", content: "Due to the nature of digital products, refunds are only available in the following situations:", list: ["We delivered the wrong game key", "The game key is invalid or non-functional", "Payment was processed twice by mistake", "Technical error on our part prevented delivery"] },
            { title: "2. Non-Refundable Situations", content: "Refunds will NOT be provided in the following cases:", list: ["You changed your mind about the game", "You already received and activated the game key", "You purchased the wrong game by mistake", "The game does not meet your expectations or system requirements", "Your account was suspended due to violation of terms"] },
            { title: "3. How to Request a Refund", content: "To request a refund, please contact us with your order details (Transaction ID/UTR), the game name and price, a detailed explanation of the issue, and any relevant evidence (screenshots, error messages, etc.)." },
            { title: "4. Refund Processing Time", content: "Once your refund request is approved, we will process it within 5-7 business days. The refund will be sent back to the original UPI account used for payment." },
            { title: "5. Partial Refunds", content: "If you purchased multiple games in one order and only one is problematic, we can offer a partial refund for that specific game only." },
            { title: "6. Coupon/Discount Refunds", content: "If a refund is issued for an order with an applied coupon, the refund will be for the discounted price (including the discount applied)." },
            { title: "7. Key Replacement", content: "If your game key is invalid or non-functional, we will provide a replacement key free of charge instead of a refund. Replacements are typically provided within 24 hours." },
            { title: "8. Disputes", content: "We stand behind our products and service. If you believe your refund was unfairly denied, you may escalate your case for review by contacting us." },
          ].map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.05}>
              <section>
                <h2 className="mb-3 text-xl font-bold text-[var(--color-cyan)] font-heading">{section.title}</h2>
                <p>{section.content}</p>
                {section.list && (
                  <ul className="mt-3 ml-6 space-y-2 list-disc">
                    {section.list.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.4}>
            <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-sm">
                <strong className="text-[var(--color-ink)]">Note:</strong> All refund decisions are made at our discretion based on our refund policy. We appreciate your understanding and will always work with you to resolve any issues.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
