"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918725841263";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello GameVerse, I'm interested in a game. Please help.")}`;

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 font-heading text-sm font-bold text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] md:bottom-8 md:right-8 md:px-6 md:py-4"
    >
      {/* WhatsApp Icon */}
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-6 w-6 shrink-0"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.112-1.97C9.726 30.982 12.768 32 16.004 32 24.83 32 32 24.822 32 16S24.83 0 16.004 0Zm9.326 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.84.18-1.936.322-5.626-1.21-4.726-1.966-7.764-6.764-7.998-7.076-.226-.312-1.864-2.484-1.864-4.738s1.182-3.354 1.602-3.814c.39-.43.92-.56 1.226-.56.312 0 .614.004.882.018.284.014.658-.108 1.022.78.39.966 1.262 3.372 1.37 3.614.108.242.18.524.036.836-.144.336-.27.544-.522.836-.252.292-.514.652-.732.874-.252.252-.494.522-.212.982.312.46 1.384 2.28 2.97 3.696 2.04 1.82 3.754 2.382 4.29 2.644.43.21.932.14 1.274-.252.336-.39.736-1.024 1.15-1.652.294-.442.668-.498 1.13-.336.464.162 2.942 1.386 3.446 1.634.504.248.84.372.966.58.126.21.126 1.206-.264 2.306Z" />
      </svg>

      <span className="hidden sm:inline">Chat with Us</span>

      {/* Pulse ring */}
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]" />
      </span>
    </motion.a>
  );
}
