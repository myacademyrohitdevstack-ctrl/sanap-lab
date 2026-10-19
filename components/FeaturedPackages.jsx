import Link from "next/link";
import { packages } from "@/data/packages";
import PackageCard from "./PackageCard";
import Reveal from "./Reveal";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FeaturedPackages() {
  const featured = packages.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-mist border-t border-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Preventive Health Care</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sage mt-1">
                Curated Health Checkup Packages
              </h2>
              <p className="text-xs sm:text-sm text-ink/75 mt-1 max-w-xl">
                Comprehensive packages combining essential diagnostic tests for routine health monitoring and wellness reviews.
              </p>
            </div>
            <Link
              href="/packages"
              className="text-xs sm:text-sm font-semibold text-care hover:text-sage transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
            >
              <span>View all packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((pkg, idx) => (
            <Reveal key={pkg.slug} delay={idx * 0.05}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
