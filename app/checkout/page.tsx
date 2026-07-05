"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import EmptyState from "@/components/EmptyState";
import { useCart } from "@/context/CartContext";
import { findCoupon } from "@/data/coupons";
import { formatPrice } from "@/lib/format";
import { getWhatsAppOrderUrl } from "@/lib/whatsapp";

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

  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    utr: "",
  });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [errors, setErrors] = useState<Errors>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const discountAmount = useMemo(() => {
    return Math.round((totalPrice * discountPercent) / 100);
  }, [discountPercent, totalPrice]);

  const grandTotal = useMemo(() => {
    return Math.max(totalPrice - discountAmount, 0);
  }, [totalPrice, discountAmount]);

  const qrCode = useMemo(() => {
    const upi = `upi://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`;

    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      upi
    )}`;
  }, [grandTotal]);

  const paymentApps = [
    {
      name: "UPI",
      icon: "/icons/upi.png",
      url: `tez://upi/pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`,
    },
    {
      name: "PhonePe",
      icon: "/icons/phonepe.png",
      url: `phonepe://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`,
    },
    {
      name: "Paytm",
      icon: "/icons/paytm.png",
      url: `paytmmp://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`,
    },
    {
      name: "BHIM",
      icon: "/icons/bhim.png",
      url: `upi://pay?pa=${UPI_ID}&pn=GameVerse&am=${grandTotal}&cu=INR`,
    },
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
      setCouponMessage({
        type: "error",
        text: "Invalid coupon code",
      });
      return;
    }

    setAppliedCoupon(coupon.code);
    setDiscountPercent(coupon.discountPercent);

    setCouponMessage({
      type: "success",
      text: `${coupon.discountPercent}% discount applied`,
    });
  }
    function validate() {
    const newErrors: Errors = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Enter a valid name";
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!form.utr.trim()) {
      newErrors.utr = "Enter payment UTR";
    }

    if (!agreedToTerms) {
      newErrors.terms = "Please accept the terms";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const whatsappUrl = getWhatsAppOrderUrl({
      customerName: form.name,
      phone: form.phone,
      email: form.email,
      utr: form.utr,
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
    <div className="min-h-screen bg-[#0b0f19] text-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-2 text-gray-400">
          Complete your payment to place your order.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-8 lg:grid-cols-3"
        >

          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">

            {/* PAYMENT */}

            <div className="rounded-2xl border border-gray-700 bg-[#111827] p-6">

              <h2 className="text-xl font-semibold">
                Pay using UPI
              </h2>

              <div className="mt-6 flex flex-col items-center text-center gap-6">

                <Image
                  src={qrCode}
                  alt="UPI QR"
                  width={220}
                  height={220}
                  unoptimized
                  className="rounded-xl bg-white p-2"
                />

                <div className="flex flex-col items-center text-center">

                  <p className="text-sm text-gray-400">
                    UPI ID
                  </p>

                  <div className="mt-1 font-mono text-lg">
                    {UPI_ID}
                  </div>

                  <button
                    type="button"
                    onClick={copyUpi}
                    className="mt-4 rounded-lg bg-cyan-600 px-6 py-2 hover:bg-cyan-700"
                  >
                    Copy UPI ID
                  </button>

                  {copySuccess && (
                    <p className="mt-2 text-sm text-green-400">
                      UPI ID copied!
                    </p>
                  )}

                  <div className="mt-6 text-center">

                    <p className="text-sm text-gray-400">
                      Total Amount
                    </p>

                    <div className="text-3xl font-bold text-cyan-400">
                      {formatPrice(grandTotal)}
                    </div>

                  </div>

                </div>

              </div>
                            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

                {paymentApps.map((app) => (

                  <a
                    key={app.name}
                    href={app.url}
                    className="rounded-xl border border-gray-700 bg-[#1f2937] p-4 transition hover:scale-105 hover:border-violet-500"
                  >

                    <Image
                      src={app.icon}
                      alt={app.name}
                      width={48}
                      height={48}
                      className="mx-auto"
                    />

                    <p className="mt-3 text-center text-sm font-medium">
                      {app.name}
                    </p>

                  </a>

                ))}

              </div>

            </div>

            {/* CUSTOMER DETAILS */}

            <div className="rounded-2xl border border-gray-700 bg-[#111827] p-6">

              <h2 className="text-xl font-semibold">
                Customer Details
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm">
                    Full Name
                  </label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-700 bg-black p-3 outline-none focus:border-violet-500"
                  />

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}

                </div>

                <div>

                  <label className="mb-2 block text-sm">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-700 bg-black p-3 outline-none focus:border-violet-500"
                  />

                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}

                </div>

                <div>

                  <label className="mb-2 block text-sm">
                    Phone Number
                  </label>

                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-700 bg-black p-3 outline-none focus:border-violet-500"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}

                </div>

                <div>

                  <label className="mb-2 block text-sm">
                    Payment UTR
                  </label>

                  <input
                    value={form.utr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        utr: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-700 bg-black p-3 outline-none focus:border-violet-500"
                  />

                  {errors.utr && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.utr}
                    </p>
                  )}

                </div>

              </div>

              {/* Coupon */}

              <div className="mt-8">

                <label className="text-sm">
                  Coupon Code
                </label>

                <div className="mt-2 flex gap-3">

                  <input
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value)
                    }
                    placeholder="Enter coupon"
                    className="flex-1 rounded-lg border border-gray-700 bg-black p-3 outline-none"
                  />

                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="rounded-lg bg-violet-600 px-6 hover:bg-violet-700"
                  >
                    Apply
                  </button>

                </div>

                {couponMessage && (
                  <p
                    className={`mt-3 text-sm ${
                      couponMessage.type === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

              </div>

            </div>

          </div>
                    {/* RIGHT */}

          <div className="h-fit rounded-2xl border border-gray-700 bg-[#111827] p-6">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {items.map((item) => (

                <div
                  key={item.game.id}
                  className="flex items-center justify-between border-b border-gray-700 pb-3"
                >

                  <div>
                    <p className="font-medium">
                      {item.game.name}
                    </p>
                  </div>

                  <p className="font-semibold">
                    {formatPrice(item.game.price)}
                  </p>

                </div>

              ))}

            </div>

            <div className="mt-6 border-t border-gray-700 pt-5 space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Subtotal
                </span>
                <span>
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex justify-between text-green-400">
                <span>Discount</span>
                <span>
                  -{formatPrice(discountAmount)}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-cyan-400">
                  {formatPrice(grandTotal)}
                </span>
              </div>

            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-gray-300">

              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) =>
                  setAgreedToTerms(e.target.checked)
                }
                className="mt-1"
              />

              <span>
                I confirm that I have completed the payment
                and the UTR entered above is correct.
              </span>

            </label>

            {errors.terms && (

              <p className="mt-2 text-sm text-red-400">
                {errors.terms}
              </p>

            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading
                ? "Placing Order..."
                : "Place Order via WhatsApp"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}