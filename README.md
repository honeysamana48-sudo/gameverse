# GameVerse — Buy PC Games Instantly

A premium, dark-themed gaming e-commerce storefront built with Next.js 15 (App
Router), TypeScript, and Tailwind CSS v4. Inspired by the polish of Steam,
Epic Games Store, and Instant Gaming — but running on a simple QR + WhatsApp
checkout flow with no payment gateway required.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Before you go live

1. **WhatsApp number** — open `lib/whatsapp.ts` and replace
   `WHATSAPP_BUSINESS_NUMBER` with your real WhatsApp Business number
   (country code + number, digits only, no `+` or spaces).
2. **UPI ID / QR code** — open `app/checkout/page.tsx` and replace the
   `UPI_ID` constant with your real UPI ID. The QR code is generated live from
   this value plus the order total, so it always requests the exact amount.
3. **Game catalog** — edit `data/games.ts` to add, remove, or update games,
   prices, images, and categories.
4. **Coupons** — edit `data/coupons.ts` to manage active discount codes.

## Project Structure

```
app/
  layout.tsx          Root layout (Navbar, Footer, CartProvider)
  page.tsx             Home page
  globals.css          Design tokens + global styles (Tailwind v4)
  not-found.tsx        Custom 404 page
  cart/page.tsx        Cart page
  checkout/page.tsx    Checkout page (QR payment + WhatsApp order)
components/            Reusable UI components
context/CartContext.tsx  Cart state (Context + localStorage persistence)
data/                   Game catalog + coupon codes (mock data layer)
lib/                    Formatting + WhatsApp message helpers
types/                  Shared TypeScript types
```

## Features

- Sticky navbar with live cart item count
- Hero, Featured Games (with category filters), Deals, Why Choose Us sections
- Add to Cart / Buy Now on every game card
- Full cart management: increase/decrease quantity, remove item, clear cart
- Checkout with QR payment, customer form validation, coupon codes, and
  Terms & Conditions gate
- Places the order by opening WhatsApp with a pre-filled order summary
- Cart persists across page reloads via `localStorage`
- Fully responsive from mobile to desktop, with reduced-motion support

## Tech Stack

- **Next.js 15** (App Router, Server + Client Components)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first `@theme` configuration)
- **React Context** for cart state — no external state library needed
