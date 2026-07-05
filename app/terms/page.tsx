import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="mb-8 text-4xl font-bold">Terms & Conditions</h1>

        <div className="space-y-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">1. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on GameVerse for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mt-3 ml-6 space-y-2 list-disc">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on GameVerse</li>
              <li>Remove or obscure any proprietary notice or labels on the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">2. Disclaimer</h2>
            <p>
              The materials on GameVerse are provided on an "as is" basis. GameVerse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">3. Limitations</h2>
            <p>
              In no event shall GameVerse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GameVerse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">4. Game Keys & Delivery</h2>
            <p>
              All game keys provided are authentic and legitimate. We deliver keys via WhatsApp within 24 hours of payment confirmation. Keys are provided as-is and are valid for activation on their respective platforms (Steam, Epic Games, etc.).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">5. Payment Terms</h2>
            <p>
              All prices are in Indian Rupees (₹). Payment must be completed via UPI. We accept payments from any UPI-enabled app (Google Pay, PhonePe, BHIM, PayTM, etc.).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">6. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your information and are responsible for all activity that occurs under your account. You agree to notify GameVerse immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">7. Modifications</h2>
            <p>
              GameVerse may revise these Terms & Conditions at any time without notice. By using this site, you are agreeing to be bound by the then current version of these Terms & Conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-bold text-[var(--color-cyan)]">8. Contact</h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us through our{" "}
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
