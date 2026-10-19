"use client";

import { useEffect, useRef } from "react";
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
  X,
  Activity,
} from "lucide-react";

export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);

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
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex justify-end md:hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div
        ref={menuRef}
        className="w-full max-w-xs bg-white h-full flex flex-col justify-between shadow-2xl p-5 overflow-y-auto"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-soft">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-white">
                <Activity className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-base font-extrabold text-sage tracking-tight">
                {site.name}
              </span>
            </Link>
            <button
              onClick={onClose}
              type="button"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-ink hover:bg-soft focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-4 flex flex-col space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="min-h-[46px] flex items-center gap-3 px-3.5 rounded-xl text-sm font-semibold text-ink/80 hover:bg-mist hover:text-care transition-colors"
                >
                  <Icon className="w-4 h-4 text-care flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-soft space-y-3">
          <Link
            href="/home-collection#book"
            onClick={onClose}
            className="w-full min-h-[46px] flex items-center justify-center gap-2 rounded-xl bg-care text-white font-semibold text-sm hover:bg-sage transition-all shadow-xs"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Test</span>
          </Link>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <a
              href={`tel:${site.phone}`}
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-2 rounded-xl bg-soft text-sage font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-care" />
              <span>Call Lab</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-center gap-1.5 px-2 rounded-xl bg-[#25D366]/15 text-[#128C7E] font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
