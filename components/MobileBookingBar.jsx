"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Phone, CalendarCheck, MessageCircle } from "lucide-react";

export default function MobileBookingBar() {
  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to inquire about booking a test.`,
  });

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-soft shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-3 py-2">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call CTA */}
        <a
          href={`tel:${site.phone}`}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-xl border border-soft bg-mist text-sage font-semibold text-xs active:bg-soft transition-colors"
          aria-label="Call lab"
        >
          <Phone className="w-3.5 h-3.5 text-care flex-shrink-0" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#128C7E] font-semibold text-xs active:bg-[#25D366]/20 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Book CTA */}
        <Link
          href="/home-collection#book"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1 px-3 rounded-xl bg-care text-white font-semibold text-xs hover:bg-sage active:opacity-95 transition-all shadow-xs"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Book Test</span>
        </Link>
      </div>
    </div>
  );
}
