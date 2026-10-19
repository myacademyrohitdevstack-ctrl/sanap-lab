import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";
import { MapPin, Clock, Phone, Navigation, Home, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: `Contact & Location | ${site.name}`,
  description: `Contact ${site.name} in ${site.city}. Lab address, phone numbers, WhatsApp, opening hours, and home collection service regions.`,
};

export default function ContactPage() {
  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to get in touch regarding laboratory tests.`,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Title */}
      <Reveal>
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Contact & Laboratory Location
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
            Visit our physical centre for in-person sample collection, or contact our coordination team for home phlebotomist booking.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Physical Centre Details */}
        <Reveal delay={0.1} className="space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-soft shadow-xs space-y-5">
            <h2 className="text-base font-bold text-sage border-b border-soft pb-3 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-care" />
              <span>Physical Laboratory Centre</span>
            </h2>

            {/* Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-soft text-care flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Lab Address</p>
                <p className="text-sm font-semibold text-sage mt-0.5 leading-relaxed">
                  {site.address}
                </p>
                <p className="text-xs text-ink/70">
                  {site.city}, {site.state} - {site.pincode}
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-soft text-care flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/60">Operating Hours</p>
                <p className="text-sm font-semibold text-sage mt-0.5">
                  {site.hours}
                </p>
                <p className="text-xs text-ink/65 mt-0.5">
                  Fasting tests are accepted starting 7:00 AM daily.
                </p>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-sage transition-all shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Get directions</span>
              </a>

              <a
                href={`tel:${site.phone}`}
                className="min-h-[44px] px-4 rounded-xl border border-soft text-sage text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-mist transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-care" />
                <span>Call: +{site.phone}</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Home Collection Service Areas */}
        <Reveal delay={0.2} className="space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-soft shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-soft pb-3">
              <h2 className="text-base font-bold text-sage uppercase tracking-wider flex items-center gap-2">
                <Home className="w-4 h-4 text-care" />
                <span>Home Collection Areas</span>
              </h2>
              <span className="text-[11px] font-bold text-care bg-soft px-2.5 py-0.5 rounded-full">
                Doorstep Service
              </span>
            </div>

            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
              Our doorstep phlebotomy routes are organized separately from the physical lab premises. Phlebotomists visit residences across the following localities in {site.city}:
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {site.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 rounded-xl bg-mist border border-soft text-ink font-semibold text-xs"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-soft">
              <Link
                href="/home-collection#book"
                className="w-full min-h-[46px] rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-sage transition-all shadow-xs"
              >
                <span>Request Home Collection Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
