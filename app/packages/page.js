import { packages } from "@/data/packages";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { Sparkles, ShieldCheck, Clock, Home } from "lucide-react";

export const metadata = {
  title: `Health Checkup Packages in ${site.city}`,
  description: `Explore full body and preventive health checkup packages from ${site.name}. Clear pricing, calculated test inclusions, and home collection.`,
};

export default function PackagesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Reveal>
        <div className="max-w-3xl mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preventive Wellness Panels</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Health Checkup Packages
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-2 leading-relaxed">
            Choose from comprehensive screening panels designed for regular health assessments. All package inclusions are calculated from verified individual diagnostic tests.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-soft flex items-center gap-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-care flex-shrink-0" />
            <span className="font-medium text-sage">Quality Analyzed Equipment</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-soft flex items-center gap-2.5 shadow-2xs">
            <Clock className="w-4 h-4 text-care flex-shrink-0" />
            <span className="font-medium text-sage">Early Morning Fasting Slots</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-soft flex items-center gap-2.5 shadow-2xs">
            <Home className="w-4 h-4 text-care flex-shrink-0" />
            <span className="font-medium text-sage">Home Collection Eligible</span>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, idx) => (
          <Reveal key={pkg.slug} delay={idx * 0.05}>
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
