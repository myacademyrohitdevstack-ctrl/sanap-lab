import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import { Home, ShieldCheck, Thermometer, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export default function HomeCollection() {
  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to schedule a home sample collection.`,
  });

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-soft/60 to-mist border-t border-b border-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Phlebotomy Showcase Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-soft">
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                    alt="Doorstep phlebotomist home collection"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                      Trained Phlebotomists
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      Painless & Hygienic Sample Draw
                    </p>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute -top-3 -right-3 bg-white p-2.5 rounded-xl shadow-md border border-soft flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-care" />
                  <span className="text-[11px] font-bold text-sage">Cool-Chain Transport</span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Booking Flow */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-care text-xs font-semibold mb-3 border border-care/20 shadow-2xs">
                <Home className="w-3.5 h-3.5" />
                <span>Doorstep Diagnostic Service</span>
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage tracking-tight">
                Get tested from the comfort of home.
              </h2>

              <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed">
                Skip stressful early morning commutes and clinic waiting rooms. Our certified laboratory phlebotomists collect blood, urine, and pathology samples right at your doorstep.
              </p>

              {/* Requirement Alert as per guidelines */}
              <div className="mt-4 p-3.5 rounded-xl bg-white border border-care/20 flex items-start gap-2.5 text-xs text-sage shadow-2xs">
                <AlertCircle className="w-4 h-4 text-care flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Please note:</strong> Home collection requests are subject to phlebotomist slot availability and lab confirmation call.
                </span>
              </div>

              {/* Steps/Features */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/80 border border-soft text-xs text-ink/80">
                  <ShieldCheck className="w-4 h-4 text-care flex-shrink-0" />
                  <span>Single-use sterile vacuum tubes</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/80 border border-soft text-xs text-ink/80">
                  <Clock className="w-4 h-4 text-care flex-shrink-0" />
                  <span>Early morning fasting slots (from 7 AM)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/home-collection#book"
                  className="min-h-[46px] px-6 rounded-xl bg-care text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-sage active:scale-[0.98] transition-all shadow-sm"
                >
                  <span>Request Home Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-5 rounded-xl bg-white border border-soft text-ink font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-mist transition-colors shadow-xs"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </div>

              {/* Service Areas */}
              <div className="mt-8 pt-5 border-t border-soft/80">
                <p className="text-xs font-bold uppercase tracking-wider text-sage mb-2">
                  Key Service Areas in {site.city}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {site.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2.5 py-1 rounded-md bg-white text-ink/80 text-xs font-medium border border-soft shadow-2xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
