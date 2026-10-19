"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import MobileMenu from "./MobileMenu";
import { Phone, CalendarCheck, Menu, X, Activity } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-soft shadow-xs transition-shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Logo / Lab Name */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 focus:outline-none group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-care transition-colors">
            <Activity className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-sage leading-tight tracking-tight group-hover:text-care transition-colors">
              {site.name}
            </span>
            <span className="text-[10px] text-care font-semibold tracking-wide uppercase hidden sm:block">
              Diagnostic & Pathology Services
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/tests"
            className="text-sm font-semibold text-ink/80 hover:text-care transition-colors"
          >
            Tests
          </Link>
          <Link
            href="/packages"
            className="text-sm font-semibold text-ink/80 hover:text-care transition-colors"
          >
            Health Packages
          </Link>
          <Link
            href="/home-collection"
            className="text-sm font-semibold text-ink/80 hover:text-care transition-colors"
          >
            Home Collection
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold text-ink/80 hover:text-care transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-ink/80 hover:text-care transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${site.phone}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-sage hover:text-care px-3.5 py-2 rounded-xl border border-soft hover:bg-mist transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-care" />
            <span>Call Lab</span>
          </a>

          <Link
            href="/home-collection#book"
            onClick={() => setMobileMenuOpen(false)}
            className="min-h-[42px] px-3.5 sm:px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-sage active:scale-[0.98] transition-all shadow-xs"
          >
            <CalendarCheck className="w-4 h-4 hidden sm:block" />
            <span>Book Test</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-sage hover:bg-mist active:bg-soft focus:outline-none transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-care" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
