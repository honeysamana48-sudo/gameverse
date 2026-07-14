import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "GameVerse — Buy PC Games Instantly",
  description:
    "GameVerse is your premium marketplace for PC games — huge discounts, instant delivery via WhatsApp, and secure UPI checkout. Browse Steam, Epic, EA, Ubisoft titles.",
  keywords: ["PC games", "game store", "buy games online", "game deals", "digital games", "Steam keys", "instant delivery"],
  openGraph: {
    title: "GameVerse — Buy PC Games Instantly",
    description: "Premium marketplace for PC games — huge discounts, instant delivery, secure UPI checkout.",
    url: "https://gameverse.com",
    siteName: "GameVerse",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVerse — Buy PC Games Instantly",
    description: "Premium marketplace for PC games — huge discounts, instant delivery, secure UPI checkout.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#06080d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay min-h-screen bg-[var(--color-void)] text-[var(--color-ink)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-[var(--color-violet)] focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content" className="min-h-screen page-enter">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
