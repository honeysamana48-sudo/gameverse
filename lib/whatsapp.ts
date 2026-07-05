import { CartItem } from "@/types";
import { formatPrice } from "@/lib/format";

export const WHATSAPP_BUSINESS_NUMBER = "918725841263"; // Your WhatsApp business number

interface OrderDetails {
  customerName: string;
  phone: string;
  email: string;
  utr: string;
  items: CartItem[];
  couponCode: string;
  discountAmount: number;
  grandTotal: number;
}

export const buildWhatsAppMessage = (order: OrderDetails): string => {
  const lines: string[] = [];

  lines.push("*NEW ORDER — GameVerse*");
  lines.push("");
  lines.push(`*Customer Name:* ${order.customerName}`);
  lines.push(`*Phone Number:* ${order.phone}`);
  if (order.email) {
    lines.push(`*Email:* ${order.email}`);
  }
  lines.push("");
  lines.push("*Games Ordered:*");

  order.items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.game.name} (x${item.quantity}) — ${formatPrice(
        item.game.price * item.quantity
      )}`
    );
  });

  lines.push("");
  if (order.couponCode) {
    lines.push(`*Coupon Applied:* ${order.couponCode}`);
    lines.push(`*Discount:* -${formatPrice(order.discountAmount)}`);
  }
  lines.push(`*Grand Total:* ${formatPrice(order.grandTotal)}`);
  lines.push("");
  lines.push(`*Transaction ID (UTR):* ${order.utr}`);
  lines.push("");
  lines.push("Please confirm my order and share the game keys/access. Thank you!");

  return lines.join("\n");
};

export const getWhatsAppOrderUrl = (order: OrderDetails): string => {
  const message = buildWhatsAppMessage(order);
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
};
