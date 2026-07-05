import { Coupon } from "@/types";

export const COUPONS: Coupon[] = [
  { code: "WELCOME10", discountPercent: 10 },
  { code: "GAMER20", discountPercent: 20 },
  { code: "VERSE50", discountPercent: 50 },
];

export const findCoupon = (code: string): Coupon | undefined =>
  COUPONS.find((coupon) => coupon.code.toLowerCase() === code.trim().toLowerCase());
