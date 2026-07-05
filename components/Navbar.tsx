"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-void)]/85 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Image
  src="/logo/gameverse-logo.png"
  alt="GameVerse"
  width={700}
  height={250}
  priority
  className="h-20 md:h-24 w-auto transition-all duration-300 hover:scale-105"
/>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname === "/" && link.href === "/");

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`font-medium transition ${
                    isActive
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 hover:border-cyan-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-white"
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
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-700 bg-[#111827] md:hidden">
          <div className="flex flex-col p-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-gray-300 hover:text-cyan-400 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}