export function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) {
    return "Confirm price with lab";
  }

  const num = Number(price);
  return `₹ ${num.toLocaleString("en-IN")}`;
}
