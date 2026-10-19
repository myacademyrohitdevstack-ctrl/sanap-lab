import Image from "next/image";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { MapPin, Clock, Phone, Navigation, CheckCircle2 } from "lucide-react";

export default function LabLocation() {
  const waUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I need directions or details about visiting your centre.`,
  });

  return (
    <section className="py-14 sm:py-20 bg-mist border-t border-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us In Person</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
                Laboratory Location & Hours
              </h2>
              <p className="text-sm text-ink/75 mt-2">
                Our main pathology and sample reception facility is conveniently located for walk-in patients and sample drops.
              </p>

              <div className="mt-6 space-y-4">
                {/* Address block */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-soft shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-soft text-care flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-sage">Physical Address</h3>
                    <p className="text-sm text-ink mt-0.5 font-semibold leading-relaxed">
                      {site.address}
                    </p>
                    <p className="text-xs text-ink/70">
                      {site.city}, {site.state} - {site.pincode}
                    </p>
                  </div>
                </div>

                {/* Hours block */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-soft shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-soft text-care flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-sage">Operating Hours</h3>
                    <p className="text-sm text-ink mt-0.5 font-semibold">
                      {site.hours}
                    </p>
                    <p className="text-xs text-ink/65 mt-0.5">
                      Fasting sample collections start early morning at 7:00 AM daily.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-sage transition-colors shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get directions</span>
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="min-h-[44px] px-4 rounded-xl bg-white border border-soft text-sage text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-soft transition-colors"
                >
                  <Phone className="w-4 h-4 text-care" />
                  <span>Call Lab Desk</span>
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 rounded-xl bg-[#25D366]/15 text-[#128C7E] text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#25D366]/25 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Laboratory Photo & Map Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-soft p-4 shadow-sm space-y-4">
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-soft">
                  <Image
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                    alt={`${site.name} Diagnostic Clinic`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold text-emerald-300">Sanap Health Services</p>
                    <p className="text-xs opacity-90">{site.address}, {site.city}</p>
                  </div>
                </div>

                <div className="px-1 flex items-center justify-between text-xs text-ink/80">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-care" />
                    <span>Walk-ins Welcome</span>
                  </span>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-care font-semibold hover:underline"
                  >
                    Open Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
