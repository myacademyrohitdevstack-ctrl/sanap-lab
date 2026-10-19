"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import {
  TestTube2,
  Sparkles,
  Home,
  Info,
  MapPin,
  HelpCircle,
  Phone,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { href: "/tests", label: "Tests & Diagnostics", icon: TestTube2 },
    { href: "/packages", label: "Health Packages", icon: Sparkles },
    { href: "/home-collection", label: "Home Collection", icon: Home },
    { href: "/about", label: "About Our Lab", icon: Info },
    { href: "/contact", label: "Contact & Location", icon: MapPin },
    { href: "/faqs", label: "FAQs", icon: HelpCircle },
  ];

  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I need help booking a test.`,
  });

  return (
    <div
      className="md:hidden fixed inset-x-0 top-16 sm:top-18 bottom-0 z-40 bg-white flex flex-col justify-between p-5 overflow-y-auto border-t border-soft shadow-2xl"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div>
        <nav className="flex flex-col space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="min-h-[48px] flex items-center justify-between px-3.5 rounded-xl text-sm sm:text-base font-bold text-sage hover:bg-mist active:bg-soft transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-soft text-care flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{link.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink/40" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="pt-6 border-t border-soft space-y-3 pb-8">
        <Link
          href="/home-collection#book"
          onClick={onClose}
          className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-care text-white font-bold text-sm hover:bg-sage active:scale-[0.99] transition-all shadow-xs"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book a Test</span>
        </Link>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <a
            href={`tel:${site.phone}`}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-2 rounded-xl bg-soft text-sage font-bold active:bg-care/20 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-care" />
            <span>Call Lab</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-2 rounded-xl bg-[#25D366]/15 text-[#128C7E] font-bold active:bg-[#25D366]/25 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
