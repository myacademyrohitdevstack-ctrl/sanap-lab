import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";
import { ShieldCheck, HeartPulse, Microscope, CheckCircle2, TestTube2, ArrowRight } from "lucide-react";

export const metadata = {
  title: `About Our Laboratory | ${site.name}`,
  description: `Learn about ${site.name}, our commitment to precise clinical pathology, sterile phlebotomy, and transparent patient care in ${site.city}.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {/* Page Title */}
      <Reveal>
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Microscope className="w-3.5 h-3.5" />
            <span>Diagnostic Pathology Practice</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Careful Pathology & Genuine Patient Service
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
            {site.name} was established to offer residents of {site.city} dependable diagnostic testing, honest pricing, and accessible sample collection without unnecessary hassle.
          </p>
        </div>
      </Reveal>

      {/* Visual & Mission Section */}
      <Reveal delay={0.1}>
        <div className="bg-white rounded-3xl border border-soft p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <h2 className="text-xl sm:text-2xl font-bold text-sage mb-3">
              Our Clinical Philosophy
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-ink/80 leading-relaxed">
              <p>
                In diagnostic pathology, there is no margin for ambiguity. We believe that behind every blood vial or test tube is a patient seeking clear answers about their wellbeing.
              </p>
              <p>
                Our workflow centers on meticulous sample handling from the exact moment of collection through automated analyzer processing and technician verification.
              </p>
              <p>
                We never engage in inflated health package claims or arbitrary price variations. What we promise is straightforward: verified procedures, clean equipment, and honest turnarounds.
              </p>
            </div>
          </div>

          {/* High-res Laboratory Facility Image */}
          <div className="md:col-span-5">
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-md border-4 border-white bg-soft">
              <Image
                src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80"
                alt="Sanap Health Services Clinical Laboratory"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold text-emerald-300">Sanap Health Services</p>
                <p className="text-[11px] opacity-90">Laboratory Testing Facility</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Core Principles Grid */}
      <Reveal delay={0.2} className="mt-10">
        <h2 className="text-lg font-bold text-sage mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-care" />
          <span>Clinical Standards We Uphold</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-soft shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-care flex items-center justify-center mb-4">
              <TestTube2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-sage">
              Hygiene First
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
              Sterile vacutainer needles opened only in your sight. Strict phlebotomy antisepsis for patient safety.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-soft shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-sage">
              No Medical Exaggeration
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
              We provide raw, calibrated biomarker readings and leave clinical medical diagnosis to your qualified physician.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-soft shadow-2xs hover:shadow-sm transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-sage">
              Patient Accessibility
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
              Serving both clinic walk-ins and doorstep home collection across {site.city}&apos;s key residential areas.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Action Strip */}
      <Reveal delay={0.3} className="mt-10 p-6 sm:p-8 rounded-3xl bg-sage text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold">
            Have questions about a specific test or doctor prescription?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-0.5">
            Our lab desk is available by phone or WhatsApp to help guide your booking.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="min-h-[42px] px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center hover:bg-care/90 transition-colors shadow-xs"
          >
            Contact Lab
          </Link>
          <Link
            href="/tests"
            className="min-h-[42px] px-5 rounded-xl bg-white text-sage text-xs sm:text-sm font-semibold inline-flex items-center justify-center hover:bg-mist transition-colors shadow-xs"
          >
            Find a Test
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
