"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Store",
    links: [
      { label: "All Games", href: "/#games" },
      { label: "Deals", href: "/#deals" },
      { label: "New Releases", href: "/#games" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/cart" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About GameVerse", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-violet)]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-display text-base font-bold text-white">
                G
              </span>
              <span className="font-display text-lg font-bold tracking-wide">
                GAME<span className="text-gradient-static">VERSE</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              Instant digital game delivery with unbeatable prices. Trusted by
              thousands of players who want to jump straight into the action.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {["twitter", "discord", "youtube"].map((platform) => (
                <span
                  key={platform}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-violet)]/50 hover:text-[var(--color-cyan)] hover:shadow-[0_0_12px_rgba(124,92,252,0.15)]"
                  aria-hidden="true"
                >
                  <SocialIcon name={platform} />
                </span>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => {
                  const isHashLink = link.href.includes("#");
                  const className =
                    "text-sm text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-cyan)]";
                  return (
                    <li key={link.label}>
                      {isHashLink ? (
                        <a href={link.href} className={className}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-violet)]/20 to-transparent mb-6" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[var(--color-muted-2)]">
              &copy; {new Date().getFullYear()} GameVerse. All rights reserved.
            </p>
            <p className="text-xs text-[var(--color-muted-2)]">
              Secure payments via QR &bull; Instant delivery via WhatsApp
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: "h-4 w-4",
  };

  if (name === "twitter") {
    return (
      <svg {...common}>
        <path d="M22 5.9c-.68.3-1.4.5-2.16.6a3.7 3.7 0 0 0 1.63-2.05 7.4 7.4 0 0 1-2.34.9 3.68 3.68 0 0 0-6.28 3.36A10.45 10.45 0 0 1 3.16 4.6a3.68 3.68 0 0 0 1.14 4.92 3.6 3.6 0 0 1-1.67-.46v.05a3.68 3.68 0 0 0 2.95 3.61 3.7 3.7 0 0 1-1.66.06 3.68 3.68 0 0 0 3.44 2.56A7.4 7.4 0 0 1 2 16.57a10.44 10.44 0 0 0 5.66 1.66c6.79 0 10.5-5.63 10.5-10.51 0-.16 0-.32-.01-.48A7.5 7.5 0 0 0 22 5.9Z" />
      </svg>
    );
  }
  if (name === "discord") {
    return (
      <svg {...common}>
        <path d="M20.32 5.37A18.6 18.6 0 0 0 15.7 4a.07.07 0 0 0-.08.04c-.2.36-.43.83-.58 1.2a17.2 17.2 0 0 0-5.08 0 8.3 8.3 0 0 0-.6-1.2.08.08 0 0 0-.08-.04 18.5 18.5 0 0 0-4.6 1.37.07.07 0 0 0-.04.03C2.28 9.2 1.55 12.9 1.9 16.55a.08.08 0 0 0 .03.05 18.7 18.7 0 0 0 5.5 2.7.08.08 0 0 0 .09-.03c.42-.56.8-1.16 1.12-1.78a.07.07 0 0 0-.04-.1 12.3 12.3 0 0 1-1.76-.82.07.07 0 0 1 0-.12c.12-.08.24-.17.35-.26a.08.08 0 0 1 .08-.01c3.7 1.65 7.7 1.65 11.35 0a.08.08 0 0 1 .08.01c.12.09.23.18.35.27a.07.07 0 0 1 0 .12c-.56.32-1.15.6-1.76.82a.07.07 0 0 0-.04.1c.33.62.71 1.22 1.12 1.78a.07.07 0 0 0 .09.03 18.6 18.6 0 0 0 5.51-2.7.07.07 0 0 0 .03-.05c.42-4.2-.7-7.86-2.96-11.15a.06.06 0 0 0-.03-.03ZM8.68 14.3c-1 0-1.83-.93-1.83-2.07 0-1.13.8-2.06 1.83-2.06s1.85.94 1.83 2.06c0 1.14-.8 2.07-1.83 2.07Zm6.65 0c-1 0-1.83-.93-1.83-2.07 0-1.13.81-2.06 1.83-2.06 1.03 0 1.85.94 1.83 2.06 0 1.14-.8 2.07-1.83 2.07Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M21.58 7.2a2.7 2.7 0 0 0-1.9-1.92C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.68.48A2.7 2.7 0 0 0 2.42 7.2 28.2 28.2 0 0 0 1.94 12a28.2 28.2 0 0 0 .48 4.8 2.7 2.7 0 0 0 1.9 1.92C6.1 19.2 12 19.2 12 19.2s5.9 0 7.68-.48a2.7 2.7 0 0 0 1.9-1.92A28.2 28.2 0 0 0 22.06 12a28.2 28.2 0 0 0-.48-4.8ZM9.84 15.02V8.98L15.4 12l-5.56 3.02Z" />
    </svg>
  );
}
