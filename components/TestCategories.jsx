import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import HealthIcon from "./HealthIcon";
import Reveal from "./Reveal";
import { ArrowRight } from "lucide-react";

export default function TestCategories() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold text-care uppercase tracking-wider">
                Comprehensive Diagnostic Profiles
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
                Browse by Health Speciality
              </h2>
              <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-xl">
                Choose a clinical category to view specialized blood markers, organ panels, and preventive profiles.
              </p>
            </div>
            <Link
              href="/tests"
              className="text-xs sm:text-sm font-semibold text-care hover:text-sage transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Explore all tests</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* 2 columns on mobile, 3-4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {categories.map((cat, idx) => (
            <Reveal key={cat.slug} delay={idx * 0.04}>
              <Link
                href={`/tests?category=${cat.slug}`}
                className="group relative rounded-2xl border border-soft bg-mist/40 hover:bg-white hover:border-care/40 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden h-full"
              >
                {/* Visual Image Header */}
                {cat.image && (
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-soft">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-white/95 text-care flex items-center justify-center shadow-xs backdrop-blur-md">
                      <HealthIcon name={cat.icon} className="w-4 h-4" />
                    </div>

                    {/* Tag badge */}
                    {cat.badge && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-care text-white tracking-wide shadow-2xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {!cat.image && (
                      <div className="w-9 h-9 rounded-lg bg-soft text-care flex items-center justify-center mb-2.5">
                        <HealthIcon name={cat.icon} className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-sage group-hover:text-care transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-ink/70 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-soft/80 flex items-center justify-between text-[11px] font-semibold text-care">
                    <span>View tests</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
