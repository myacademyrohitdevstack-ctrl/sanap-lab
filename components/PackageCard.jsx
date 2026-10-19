"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { tests } from "@/data/tests";
import { VacutainerSvg, BarcodeSvg, LabVerifiedStamp, OrganIcon } from "./MedicalSvg";
import { CheckCircle2, ChevronDown, ChevronUp, Clock, ShieldCheck, Home, Sparkles, AlertCircle } from "lucide-react";

export default function PackageCard({ pkg }) {
  const [expanded, setExpanded] = useState(false);
  const testCount = Array.isArray(pkg.testSlugs) ? pkg.testSlugs.length : 0;

  // Resolve matching test objects
  const includedTests = (pkg.testSlugs || [])
    .map((slug) => tests.find((t) => t.slug === slug))
    .filter(Boolean);

  const totalParams = pkg.totalParametersCount || testCount * 5;

  return (
    <div className="bg-white rounded-3xl border border-soft shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-care/50 transition-all border-t-4 border-t-care relative group">
      {/* Top Clinical Header Strip */}
      <div className="px-5 pt-4 pb-3 border-b border-soft/70 bg-gradient-to-r from-soft/60 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-sage bg-white px-2 py-0.5 rounded border border-soft shadow-2xs">
            {pkg.packageCode || "PKG-PANEL"}
          </span>
          {pkg.tag && (
            <span className="text-[11px] font-bold text-care uppercase tracking-wide">
              {pkg.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {pkg.popular && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white uppercase tracking-wider shadow-2xs">
              Popular Choice
            </span>
          )}
          <LabVerifiedStamp />
        </div>
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Parameter Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-sage leading-snug group-hover:text-care transition-colors">
                <Link href={`/packages/${pkg.slug}`}>
                  {pkg.name}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-ink/75 mt-1.5 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Circular Parameter Counter */}
            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-care/15 to-emerald-50 border border-care/30 text-center flex-shrink-0 shadow-2xs">
              <span className="text-base font-black text-care leading-none">
                {totalParams}
              </span>
              <span className="text-[9px] font-bold text-sage uppercase tracking-tighter mt-0.5">
                Params
              </span>
            </div>
          </div>

          {/* Organ Systems Checked Bar */}
          {pkg.coveredOrgans && pkg.coveredOrgans.length > 0 && (
            <div className="mt-4 pt-3 border-t border-soft/70">
              <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block mb-1.5">
                Organ Systems Assessed:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {pkg.coveredOrgans.map((organ) => (
                  <span
                    key={organ}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-soft/70 border border-care/20 text-xs font-semibold text-sage"
                  >
                    <OrganIcon type={organ} className="w-3.5 h-3.5 text-care" />
                    <span className="capitalize">{organ}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Protocol Spec Box */}
          <div className="mt-4 p-3.5 rounded-2xl bg-mist/60 border border-soft space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium">Sample Tubes:</span>
              <span className="font-semibold text-sage text-right">
                {pkg.sampleTubesRequired || `${testCount} Vacutainer Collection Tubes`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-care" />
                <span>Turnaround:</span>
              </span>
              <span className="font-bold text-sage">
                {pkg.turnaround || "Within 12 to 24 Hours"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium">Fasting:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                {pkg.fastingRequired ? "8-10 Hours Fasting Required" : "Non-Fasting"}
              </span>
            </div>
          </div>

          {/* Inclusions Highlights */}
          {pkg.highlights && (
            <div className="mt-4 space-y-1.5">
              {pkg.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-ink/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-care flex-shrink-0" />
                  <span className="font-medium">{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expandable test inclusions */}
          <div className="mt-4 pt-3 border-t border-soft">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-bold text-care hover:text-sage flex items-center justify-between w-full py-1 text-left focus:outline-none"
              aria-expanded={expanded}
            >
              <span>{expanded ? "Hide included tests" : `View all ${testCount} included test profiles`}</span>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
              <ul className="mt-2.5 space-y-2 text-xs text-ink/85 bg-mist/80 p-3.5 rounded-2xl border border-soft divide-y divide-soft/60">
                {includedTests.map((t) => (
                  <li key={t.slug} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <VacutainerSvg capColor={t.capColor || "#8B5CF6"} className="w-3 h-5 flex-shrink-0" />
                      <Link href={`/tests/${t.slug}`} className="hover:text-care transition-colors font-semibold truncate">
                        {t.name}
                      </Link>
                    </div>
                    <span className="text-[10px] font-mono text-ink/50 bg-white px-1.5 py-0.5 rounded border border-soft flex-shrink-0">
                      {t.parametersCount} params
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Pricing, Barcode & Action Buttons */}
        <div className="mt-6 pt-4 border-t border-soft">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-ink/50 block tracking-wider">
                All-Inclusive Package Rate
              </span>
              <span className="text-xl sm:text-2xl font-black text-sage">
                {formatPrice(pkg.price)}
              </span>
            </div>

            {/* Clinical Barcode Graphic */}
            <div className="hidden sm:flex flex-col items-end">
              <BarcodeSvg className="w-24 h-5 opacity-35" />
              <span className="font-mono text-[8px] text-ink/40">SANAP REQUISITION</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/home-collection?service=package&item=${pkg.slug}#book`}
              className="min-h-[44px] px-3.5 rounded-xl bg-care text-white hover:bg-sage text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Book Collection</span>
            </Link>

            <Link
              href={`/packages/${pkg.slug}`}
              className="min-h-[44px] px-3.5 rounded-xl border border-soft text-sage hover:bg-mist text-xs font-bold inline-flex items-center justify-center transition-colors"
            >
              <span>View Profile Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
