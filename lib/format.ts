export const formatPrice = (value: number): string => {
  return `₹${value.toLocaleString("en-IN")}`;
};

export const clampQuantity = (quantity: number, min = 1, max = 10): number => {
  return Math.min(Math.max(quantity, min), max);
};
