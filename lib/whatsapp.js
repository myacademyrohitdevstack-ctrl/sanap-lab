export function whatsappLink({ phone, text }) {
  const cleanPhone = phone ? String(phone).replace(/[^\d]/g, "") : "";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text || "")}`;
}
