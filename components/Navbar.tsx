"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Games", href: "/#games" },
  { label: "Deals", href: "/#deals" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-violet)]/30 to-transparent" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 relative z-10"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo/gameverse-logo.png"
            alt="GameVerse"
            width={700}
            height={250}
            priority
            className="h-16 md:h-20 w-auto transition-all duration-300 hover:scale-105 drop-shadow-[0_0_20px_rgba(124,92,252,0.3)]"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href === "/");

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 font-heading text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-cyan)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Cart */}
          <Link
            href="/cart"
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-violet)]/50 hover:shadow-[var(--shadow-glow-violet)]"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-cyan)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.5l1.5 9h11.25l2.25-6H6"
              />
              <circle cx="9" cy="19" r="1" />
              <circle cx="18" cy="19" r="1" />
            </svg>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-violet)] px-1 text-[10px] font-bold text-white shadow-[var(--shadow-glow-violet)]"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm md:hidden transition-all duration-300 hover:border-[var(--color-violet)]/50"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className="relative h-5 w-5">
              <motion.span
                className="absolute left-0 h-0.5 w-5 bg-[var(--color-ink)]"
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-2 h-0.5 w-5 bg-[var(--color-ink)]"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="absolute left-0 top-4 h-0.5 w-5 bg-[var(--color-ink)]"
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-border)] md:hidden"
          >
            <div className="glass-strong flex flex-col p-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-heading text-sm font-semibold transition-all duration-300 ${
                      pathname === link.href
                        ? "text-[var(--color-cyan)] bg-[var(--color-cyan)]/10"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-2)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
