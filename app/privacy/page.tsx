import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function PrivacyPage() {
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
          <h1 className="mb-8 font-display text-4xl font-bold">Privacy Policy</h1>
        </ScrollReveal>

        <div className="space-y-8 text-[var(--color-muted)]">
          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you place an order. This information includes: Full name, Email address, Phone number, and Transaction details (UTR).", list: ["Full name", "Email address", "Phone number", "Transaction details (UTR)"] },
            { title: "2. How We Use Your Information", content: "We use the information we collect to:", list: ["Process and complete your orders", "Deliver game keys via WhatsApp", "Verify payment through your Transaction ID (UTR)", "Provide customer support", "Prevent fraud and enhance security"] },
            { title: "3. Data Security", content: "We take data security seriously and implement reasonable safeguards to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure." },
            { title: "4. Payment Information", content: "All UPI payments are processed securely. We do not store payment details on our servers. Your payment information is handled directly by your UPI app provider." },
            { title: "5. Third-Party Services", content: "We use WhatsApp and UPI services to deliver your orders and process payments. These services have their own privacy policies, and we encourage you to review them." },
            { title: "6. Cookies & Analytics", content: "We use localStorage for storing your cart data locally on your device. This data is not transmitted to our servers." },
            { title: "7. Your Rights", content: "You have the right to request deletion of your personal information. Please contact us through our contact form to submit data deletion requests." },
            { title: "8. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top of this policy." },
            { title: "9. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us through our contact form." },
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
        </div>
      </div>
    </div>
  );
}
