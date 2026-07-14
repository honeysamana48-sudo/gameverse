import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function TermsPage() {
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
          <h1 className="mb-8 font-display text-4xl font-bold">Terms & Conditions</h1>
        </ScrollReveal>

        <div className="space-y-8 text-[var(--color-muted)]">
          {[
            { title: "1. Use License", content: "Permission is granted to temporarily download one copy of the materials (information or software) on GameVerse for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.", list: ["Modify or copy the materials", "Use the materials for any commercial purpose or for any public display", "Attempt to decompile or reverse engineer any software contained on GameVerse", "Remove or obscure any proprietary notice or labels on the materials", "Transfer the materials to another person or mirror the materials on any other server"] },
            { title: "2. Disclaimer", content: 'The materials on GameVerse are provided on an "as is" basis. GameVerse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.' },
            { title: "3. Limitations", content: "In no event shall GameVerse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GameVerse." },
            { title: "4. Game Keys & Delivery", content: "All game keys provided are authentic and legitimate. We deliver keys via WhatsApp within 24 hours of payment confirmation. Keys are provided as-is and are valid for activation on their respective platforms (Steam, Epic Games, etc.)." },
            { title: "5. Payment Terms", content: "All prices are in Indian Rupees (₹). Payment must be completed via UPI. We accept payments from any UPI-enabled app (Google Pay, PhonePe, BHIM, PayTM, etc.)." },
            { title: "6. User Responsibilities", content: "You are responsible for maintaining the confidentiality of your information and are responsible for all activity that occurs under your account. You agree to notify GameVerse immediately of any unauthorized use of your account." },
            { title: "7. Modifications", content: "GameVerse may revise these Terms & Conditions at any time without notice. By using this site, you are agreeing to be bound by the then current version of these Terms & Conditions." },
            { title: "8. Contact", content: "If you have any questions about these Terms & Conditions, please contact us through our contact form." },
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
