"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Thermometer, FileCheck2, Home, Phone, MessageCircle } from "lucide-react";

function HomeCollectionContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "test";
  const item = searchParams.get("item") || "";

  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to schedule a home sample collection.`,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Header */}
      <Reveal>
        <div className="max-w-2xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Home className="w-3.5 h-3.5" />
            <span>Doorstep Pathology Services</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage tracking-tight">
            Home Sample Collection
          </h1>
          <p className="text-xs sm:text-sm text-ink/80 mt-2 leading-relaxed">
            Have your diagnostic blood or urine tests collected comfortably at your residence by certified phlebotomists from {site.name}.
          </p>
        </div>
      </Reveal>

      {/* Safety & Protocol Highlights with Lucide Icons */}
      <Reveal delay={0.1} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-white border border-soft shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-care flex items-center justify-center font-bold text-xs mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-sage">Sterile Draw</h2>
          <p className="text-xs text-ink/70 mt-1 leading-relaxed">
            Sealed, single-use vacuum collection tubes and fresh disposable needles opened in front of you.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-soft shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">
            <Thermometer className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-sage">Cool Chain Transport</h2>
          <p className="text-xs text-ink/70 mt-1 leading-relaxed">
            Samples stored in temperature-controlled cooler carriers to protect biochemical stability.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-soft shadow-2xs hover:shadow-xs transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs mb-3">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold text-sage">Digital Verification</h2>
          <p className="text-xs text-ink/70 mt-1 leading-relaxed">
            Verified electronic test reports dispatched securely to your WhatsApp and email.
          </p>
        </div>
      </Reveal>

      {/* Booking Form Anchor Container */}
      <div id="book" className="scroll-mt-20">
        <Reveal delay={0.15}>
          <BookingForm initialService={service} initialItem={item} />
        </Reveal>
      </div>

      {/* Service Areas and Urgent Calls */}
      <Reveal delay={0.2} className="mt-12 pt-8 border-t border-soft grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-soft shadow-xs">
          <h3 className="text-sm font-bold text-sage uppercase tracking-wider mb-2 flex items-center gap-2">
            <Home className="w-4 h-4 text-care" />
            <span>Covered Localities in {site.city}</span>
          </h3>
          <p className="text-xs text-ink/75 mb-3">
            Phlebotomist routes currently serve the following residential sectors:
          </p>
          <div className="flex flex-wrap gap-2">
            {site.serviceAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 rounded-xl bg-mist text-ink text-xs font-semibold border border-soft"
              >
                {area}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-ink/60 mt-4">
            If your locality is not listed, call us to check if special scheduling is available.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-soft shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-sage uppercase tracking-wider mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-care" />
              <span>Need Same-Day Inquiries?</span>
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed">
              For early morning fasting blood draws or same-day appointment inquiries, contacting our coordination desk directly is fastest.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              href={`tel:${site.phone}`}
              className="min-h-[42px] px-4 rounded-xl border border-soft text-sage text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-mist transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-care" />
              <span>Call: +{site.phone}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function HomeCollectionPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-12 text-sm text-ink/60">Loading collection booking...</div>}>
      <HomeCollectionContent />
    </Suspense>
  );
}
