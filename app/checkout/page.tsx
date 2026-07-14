"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";
import { findCoupon } from "@/data/coupons";
import { formatPrice } from "@/lib/format";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";

const UPI_ID = "8725841263@ptsbi";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  utr?: string;
  terms?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart, isHydrated } = useCart();

  const [form, setForm] = useState({ name: "", email: "", phone: "", utr: "" });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const discountAmount = useMemo(() => Math.round((totalPrice * discountPercent) / 100), [discountPercent, totalPrice]);
  const grandTotal = useMemo(() => Math.max(totalPrice - discountAmount, 0), [totalPrice, discountAmount]);
  const qrCode = useMemo(() => {
    const upi = `upi://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upi)}`;
  }, [grandTotal]);

  const paymentApps = [
    { name: "UPI", icon: "/icons/upi.png", url: `tez://upi/pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR` },
    { name: "PhonePe", icon: "/icons/phonepe.png", url: `phonepe://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR` },
    { name: "Paytm", icon: "/icons/paytm.png", url: `paytmmp://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR` },
    { name: "BHIM", icon: "/icons/bhim.png", url: `upi://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR` },
  ];

  async function copyUpi() {
    await navigator.clipboard.writeText(UPI_ID);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }

  function applyCoupon() {
    const coupon = findCoupon(couponInput);
    if (!coupon) {
      setDiscountPercent(0);
      setAppliedCoupon("");
      setCouponMessage({ type: "error", text: "Invalid coupon code" });
      return;
    }
    setAppliedCoupon(coupon.code);
    setDiscountPercent(coupon.discountPercent);
    setCouponMessage({ type: "success", text: `${coupon.discountPercent}% discount applied` });
  }

  function validate() {
    const newErrors: Errors = {};
    if (form.name.trim().length < 2) newErrors.name = "Enter a valid name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) newErrors.phone = "Enter a valid phone number";
    if (!form.utr.trim()) newErrors.utr = "Enter payment UTR";
    if (!agreedToTerms) newErrors.terms = "Please accept the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    if (items.length === 0) {
      setSubmitError("Your cart is empty. Add some games before placing an order.");
      return;
    }

    setLoading(true);

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phone.trim();
    const trimmedUtr = form.utr.trim();

    const orderData = {
      game_name: items.map((i) => i.game.name).join(", "),
      price: totalPrice,
      customer_name: trimmedName,
      customer_email: trimmedEmail,
      status: "pending",
      is_fulfilled: false,
      phone: trimmedPhone,
      utr: trimmedUtr,
      coupon_code: appliedCoupon,
      discount_amount: discountAmount,
      total_amount: grandTotal,
      subtotal: totalPrice,
      tax: 0,
      payment_method: "UPI",
      payment_status: "pending",
      currency: "INR",
      shipping_address: "",
      billing_address: "",
      tracking_number: "",
      notes: "",
      created_at: new Date().toISOString(),
    };

    console.log("Order being saved:", orderData);

    let savedOrderId: string | null = null;

    const insertOrder = async (data: Record<string, unknown>) => {
      return supabase.from("orders").insert([data]).select("id").single();
    };

    let orderResult = null;
    let orderError = null;

    const { data, error } = await insertOrder(orderData);
    orderResult = data;
    orderError = error;

    if (orderError) {
      console.warn("Full insert failed, retrying with core columns only:", orderError.message);
      const { game_name, price, customer_name, customer_email, status, is_fulfilled, created_at } = orderData;
      const coreData = { game_name, price, customer_name, customer_email, status, is_fulfilled, created_at };
      const retry = await insertOrder(coreData);
      orderResult = retry.data;
      orderError = retry.error;
    }

    if (orderError) {
      console.error("Supabase insert error:", orderError.message, orderError.details, orderError.hint);
      setSubmitError(`Failed to save order: ${orderError.message}. Run the migration in Supabase SQL Editor or check your table schema.`);
      setLoading(false);
      return;
    }

    if (!orderResult) {
      console.error("Supabase insert returned no data and no error");
      setSubmitError("Failed to save order. Please try again.");
      setLoading(false);
      return;
    }

    savedOrderId = orderResult.id;
    console.log("Order created with ID:", savedOrderId);

    const orderItems = items.map((item) => ({
      order_id: savedOrderId!,
      product_id: item.game.id,
      product_name: item.game.name,
      quantity: item.quantity,
      unit_price: item.game.price,
      subtotal: item.game.price * item.quantity,
    }));

    console.log("Order items being saved:", orderItems);
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      console.warn("Order items insert skipped (table may not exist):", itemsError.message);
    } else {
      console.log("Order items saved successfully");
    }

    const whatsappUrl = getWhatsAppOrderUrl({
      customerName: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      utr: trimmedUtr,
      items,
      couponCode: appliedCoupon,
      discountAmount,
      grandTotal,
    });
    window.open(whatsappUrl, "_blank");
    clearCart();
    router.push("/");
    setLoading(false);
  }

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-void)]">
        <p className="text-[var(--color-muted)]">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add some games before checking out."
        actionLabel="Browse Games"
        actionHref="/"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-ink)]">
      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <div className="absolute left-1/4 top-0 h-48 w-48 rounded-full bg-[var(--color-violet)]/5 blur-[80px]" />

        <ScrollReveal>
          <h1 className="font-display text-4xl font-bold">Checkout</h1>
          <p className="mt-2 text-[var(--color-muted)]">
            Complete your payment to place your order.
          </p>
        </ScrollReveal>

        <form onSubmit={handleSubmit} className="relative mt-10 grid gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-8 lg:col-span-2">
            {/* PAYMENT */}
            <ScrollReveal delay={0.05}>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg shadow-black/20">
                <h2 className="font-heading text-xl font-bold">Pay using UPI</h2>

                <div className="mt-6 flex flex-col items-center text-center gap-6">
                  <div className="relative rounded-xl bg-white p-3 shadow-lg">
                    <Image
                      src={qrCode}
                      alt="UPI QR"
                      width={220}
                      height={220}
                      unoptimized
                      className="rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <p className="text-sm text-[var(--color-muted)]">UPI ID</p>
                    <div className="mt-1 font-mono text-lg text-[var(--color-ink)]">{UPI_ID}</div>

                    <motion.button
                      type="button"
                      onClick={copyUpi}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="clip-panel-sm mt-4 bg-[var(--color-cyan)] px-6 py-2 font-heading text-sm font-bold text-[var(--color-void)] transition-all hover:shadow-[var(--shadow-glow-cyan)]"
                    >
                      Copy UPI ID
                    </motion.button>

                    {copySuccess && (
                      <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-[var(--color-mint)]">
                        UPI ID copied!
                      </motion.p>
                    )}

                    <div className="mt-6 text-center">
                      <p className="text-sm text-[var(--color-muted)]">Total Amount</p>
                      <div className="font-display text-3xl font-bold text-gradient-static">{formatPrice(grandTotal)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {paymentApps.map((app) => (
                    <motion.a
                      key={app.name}
                      href={app.url}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 transition-all hover:border-[var(--color-violet)]/50 hover:shadow-[0_0_12px_rgba(124,92,252,0.15)]"
                    >
                      <Image src={app.icon} alt={app.name} width={48} height={48} className="mx-auto" />
                      <p className="mt-3 text-center text-sm font-medium text-[var(--color-ink)]">{app.name}</p>
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* CUSTOMER DETAILS */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg shadow-black/20">
                <h2 className="font-heading text-xl font-bold">Customer Details</h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {[
                    { label: "Full Name", key: "name" as const, type: "text" },
                    { label: "Email", key: "email" as const, type: "email" },
                    { label: "Phone Number", key: "phone" as const, type: "text" },
                    { label: "Payment UTR", key: "utr" as const, type: "text" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label htmlFor={`checkout-${field.key}`} className="mb-2 block text-sm font-medium text-[var(--color-muted)]">{field.label}</label>
                      <input
                        id={`checkout-${field.key}`}
                        type={field.type}
                        value={form[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        aria-invalid={!!errors[field.key]}
                        aria-describedby={errors[field.key] ? `checkout-error-${field.key}` : undefined}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] p-3 text-[var(--color-ink)] outline-none transition-all focus:border-[var(--color-violet)]/50 focus:shadow-[0_0_15px_rgba(124,92,252,0.1)]"
                      />
                      {errors[field.key] && (
                        <p id={`checkout-error-${field.key}`} className="mt-1 text-xs text-[var(--color-flame)]">{errors[field.key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="mt-8">
                  <label className="text-sm font-medium text-[var(--color-muted)]">Coupon Code</label>
                  <div className="mt-2 flex gap-3">
                    <input
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter coupon"
                      className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-void)] p-3 text-[var(--color-ink)] outline-none transition-all focus:border-[var(--color-violet)]/50"
                    />
                    <motion.button
                      type="button"
                      onClick={applyCoupon}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="clip-panel-sm bg-[var(--color-violet)] px-6 py-3 font-heading text-sm font-bold text-white"
                    >
                      Apply
                    </motion.button>
                  </div>
                  {couponMessage && (
                    <p className={`mt-3 text-sm ${couponMessage.type === "success" ? "text-[var(--color-mint)]" : "text-[var(--color-flame)]"}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT */}
          <ScrollReveal delay={0.15}>
            <div className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg shadow-black/20 sticky top-24">
              <h2 className="font-heading text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.game.id} className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <p className="font-medium text-[var(--color-ink)]">{item.game.name}</p>
                    <p className="font-semibold text-[var(--color-ink)]">{formatPrice(item.game.price)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[var(--color-border)] pt-5 space-y-3">
                <div className="flex justify-between text-[var(--color-muted)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-mint)]">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-gradient-static">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <label className="mt-6 flex items-start gap-3 text-sm text-[var(--color-muted)]">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <span>I confirm that I have completed the payment and the UTR entered above is correct.</span>
              </label>

              {errors.terms && <p className="mt-2 text-sm text-[var(--color-flame)]">{errors.terms}</p>}

              {submitError && (
                <p className="mt-4 rounded-lg border border-[var(--color-flame)]/30 bg-[var(--color-flame)]/10 p-3 text-sm text-[var(--color-flame)]">
                  {submitError}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : undefined}
                whileTap={!loading ? { scale: 0.98 } : undefined}
                className="clip-panel-sm mt-8 w-full bg-[var(--color-violet)] py-3.5 font-heading text-lg font-bold text-white shadow-[var(--shadow-glow-violet)] transition-all duration-300 hover:shadow-[var(--shadow-glow-violet-lg)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order via WhatsApp"}
              </motion.button>
            </div>
          </ScrollReveal>
        </form>
      </div>
    </div>
  );
}
