import Reveal from "./Reveal";
import { site } from "@/data/site";
import { Star, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Reviews() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-soft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Verified Patient Feedback</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
            Genuine Diagnostic Experiences
          </h2>
          <p className="text-xs sm:text-sm text-ink/75 mt-2 max-w-lg mx-auto">
            We value honest patient experiences and continuous clinical improvement in our diagnostic and phlebotomy services.
          </p>

          {/* Authentic empty state / Google review connection */}
          <div className="mt-8 p-8 rounded-3xl border border-dashed border-care/30 bg-mist/50 text-center max-w-xl mx-auto shadow-2xs">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm font-bold text-sage">
              Have you recently visited {site.name} or used our doorstep phlebotomy?
            </p>
            <p className="text-xs text-ink/70 mt-1.5 leading-relaxed max-w-md mx-auto">
              We publish only verified patient reviews. Your comments help other families find dependable diagnostic care in {site.city}.
            </p>

            <div className="mt-5">
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-soft text-xs font-bold text-care hover:bg-mist transition-colors shadow-2xs"
              >
                <span>Leave a review or view on Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
