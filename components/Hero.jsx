import Link from "next/link";
import Image from "next/image";
import TestSearch from "./TestSearch";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { ShieldCheck, Clock, MapPin, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-white via-mist to-mist border-b border-soft overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-care/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-soft rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 text-left">
            <Reveal>
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft text-sage text-xs font-semibold mb-4 border border-care/20 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-care animate-pulse"></span>
                <span>Accurate Diagnostics & Doorstep Phlebotomy in {site.city}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-sage tracking-tight leading-[1.15]">
                Your health deserves clear answers.
              </h1>

              {/* Subtitle */}
              <p className="mt-3.5 text-sm sm:text-base text-ink/80 leading-relaxed max-w-xl">
                Dependable pathology tests, preventive wellness packages, and gentle home sample collection from <span className="font-semibold text-sage">{site.name}</span>.
              </p>
            </Reveal>

            {/* Test Search field */}
            <Reveal delay={0.1} className="mt-6 sm:mt-8">
              <TestSearch placeholder="Search CBC, thyroid, vitamin D…" />
            </Reveal>

            {/* Primary CTAs */}
            <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/tests"
                className="min-h-[46px] px-6 rounded-xl bg-care text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-sage active:scale-[0.98] transition-all shadow-sm"
              >
                <span>Find a Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/home-collection#book"
                className="min-h-[46px] px-6 rounded-xl bg-white border border-soft text-sage font-semibold text-sm sm:text-base inline-flex items-center justify-center hover:bg-soft transition-all shadow-xs"
              >
                Book Home Collection
              </Link>
            </Reveal>

            {/* Verifiable Quick Highlights */}
            <Reveal delay={0.25} className="mt-8 pt-6 border-t border-soft/80 flex flex-wrap gap-4 text-xs font-medium text-ink/80">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-care flex-shrink-0" />
                <span>Single-use sterile vacuum tubes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-care flex-shrink-0" />
                <span>Verified digital reports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-care flex-shrink-0" />
                <span>Covering {site.serviceAreas.length}+ Pune localities</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual Laboratory Showcase */}
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="relative">
                {/* Main Hero Laboratory Image */}
                <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-soft">
                  <Image
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
                    alt={`${site.name} Diagnostic Laboratory Facility`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage/80 via-transparent to-black/10" />

                  {/* Laboratory Branding Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                        Active Pathology Facility
                      </p>
                    </div>
                    <p className="text-sm font-bold mt-0.5">
                      {site.name} • Clinical Diagnostics
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1: Turnaround */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-soft hidden sm:flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-soft text-care flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-ink/60">Digital Reports</p>
                    <p className="text-xs font-bold text-sage">Direct on WhatsApp</p>
                  </div>
                </div>

                {/* Floating Badge 2: Certified Phlebotomy */}
                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-soft flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-care text-white flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-ink/60">Hygiene Standard</p>
                    <p className="text-xs font-bold text-sage">Sterile Disposable Kit</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
