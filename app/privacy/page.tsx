import Link from "next/link";

export default function PrivacyPage() {
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
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="space-y-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you place an order. This information includes:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Transaction details (UTR)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>Process and complete your orders</li>
              <li>Deliver game keys via WhatsApp</li>
              <li>Verify payment through your Transaction ID (UTR)</li>
              <li>Provide customer support</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">3. Data Security</h2>
            <p>
              We take data security seriously and implement reasonable safeguards to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">4. Payment Information</h2>
            <p>
              All UPI payments are processed securely. We do not store payment details on our servers. Your payment information is handled directly by your UPI app provider.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">5. Third-Party Services</h2>
            <p>
              We use WhatsApp and UPI services to deliver your orders and process payments. These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">6. Cookies & Analytics</h2>
            <p>
              We use localStorage for storing your cart data locally on your device. This data is not transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">7. Your Rights</h2>
            <p>
              You have the right to request deletion of your personal information. Please contact us through our{" "}
              <Link href="/#contact" className="text-[var(--color-cyan)] hover:underline">
                contact form
              </Link>
              {" "}to submit data deletion requests.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our{" "}
              <Link href="/#contact" className="text-[var(--color-cyan)] hover:underline">
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
