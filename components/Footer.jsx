import Link from "next/link";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Activity, Phone, MapPin, Clock, ShieldCheck, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;
  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to inquire about tests and collection services.`,
  });

  return (
    <footer className="bg-sage text-white/90 border-t border-sage/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Lab Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-care flex items-center justify-center text-white shadow-xs">
                <Activity className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {site.tagline}
            </p>
            <div className="text-xs text-white/70 space-y-1.5 pt-1">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white/90">Laboratory Hours</p>
                  <p>{site.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80">
              <li>
                <Link href="/tests" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Diagnostic Tests</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Health Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/home-collection" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Home Collection</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>About Our Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Contact & Location</span>
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-300">
              Lab Address
            </h3>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
              <MapPin className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {site.address}
                {site.city ? `, ${site.city}` : ""}
                {site.pincode ? ` - ${site.pincode}` : ""}
              </p>
            </div>
            <div className="pt-2 space-y-2 text-xs sm:text-sm">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 hover:text-white text-white/90 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Call: +{site.phone}</span>
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white text-emerald-300 transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                <span>WhatsApp: +{site.whatsapp}</span>
              </a>
              <p className="text-[11px] text-white/60 pt-1">
                Home collection serving: {site.serviceAreas.slice(0, 3).join(", ")}, & more.
              </p>
            </div>
          </div>

          {/* Column 4: Notice & Privacy */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-300">
              Medical Notice
            </h3>
            <div className="text-xs text-white/70 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300 mb-1.5" />
              Test information provided on this website is for general educational awareness only and does not constitute medical advice or self-diagnosis. Consult a registered medical practitioner.
            </div>
            <div className="pt-1">
              <Link
                href="/privacy"
                className="text-xs text-white/70 hover:text-white underline underline-offset-2 transition-colors"
              >
                Privacy & Data Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} {site.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Quality clinical laboratory care.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
