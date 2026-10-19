import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { VacutainerSvg, BarcodeSvg, LabVerifiedStamp, OrganIcon } from "./MedicalSvg";
import { Clock, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Home } from "lucide-react";

export default function TestCard({ test }) {
  const categoryObj = categories.find((c) => c.slug === test.category);
  const categoryTitle = categoryObj ? categoryObj.title : test.category;

  const waAskUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to book or inquire about the ${test.name} (${test.testCode || test.slug}). Please let me know the price and preparation.`,
  });

  // Category specific accent border and badge styles
  const accentBorderColor =
    test.category === "blood-tests"
      ? "border-t-rose-600"
      : test.category === "diabetes"
      ? "border-t-teal-600"
      : test.category === "thyroid"
      ? "border-t-purple-600"
      : test.category === "vitamins"
      ? "border-t-amber-500"
      : "border-t-care";

  return (
    <div
      className={`bg-white rounded-2xl border border-soft shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-care/50 transition-all border-t-4 ${accentBorderColor} relative group`}
    >
      {/* Top Clinical Header Strip */}
      <div className="px-5 pt-4 pb-3 border-b border-soft/70 bg-gradient-to-r from-mist/70 to-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-sage/80 bg-white px-2 py-0.5 rounded border border-soft shadow-2xs">
            {test.testCode || "LAB-TEST"}
          </span>
          <span className="text-[11px] font-semibold text-care tracking-wide uppercase">
            {categoryTitle}
          </span>
        </div>

        <LabVerifiedStamp />
      </div>

      {/* Main Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Test Title with Vacutainer Tube illustration */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-extrabold text-sage leading-snug group-hover:text-care transition-colors">
                <Link href={`/tests/${test.slug}`}>
                  {test.name}
                </Link>
              </h3>
              <p className="text-xs text-ink/75 mt-1.5 leading-relaxed line-clamp-2">
                {test.summary}
              </p>
            </div>

            {/* Real Vacutainer SVG */}
            <div className="flex flex-col items-center flex-shrink-0 bg-mist p-1.5 rounded-xl border border-soft/80 shadow-2xs" title={test.tubeName || "Vacutainer Tube"}>
              <VacutainerSvg capColor={test.capColor || "#8B5CF6"} className="w-4 h-7" />
              <span className="text-[9px] font-mono text-ink/60 mt-0.5">
                {test.parametersCount ? `${test.parametersCount}P` : "1P"}
              </span>
            </div>
          </div>

          {/* Clinical Requisition Spec Sheet (Real Lab Card Features) */}
          <div className="mt-4 p-3 rounded-xl bg-mist/60 border border-soft space-y-2 text-xs">
            {/* Sample & Tube */}
            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium">Sample & Tube:</span>
              <span className="font-semibold text-sage text-right truncate max-w-[200px]">
                {test.tubeName || test.sampleType || "Blood / Serum"}
              </span>
            </div>

            {/* Turnaround Time */}
            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-care" />
                <span>Report Time:</span>
              </span>
              <span className="font-bold text-sage">
                {test.reportTime || "Same Day (6-8 Hours)"}
              </span>
            </div>

            {/* Fasting Guideline */}
            <div className="flex items-center justify-between">
              <span className="text-ink/60 font-medium">Fasting:</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  test.fastingRequired
                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {test.fastingRequired ? "8-10 Hrs Fasting" : "No Fasting Needed"}
              </span>
            </div>
          </div>

          {/* Key Parameters Biomarker Chips */}
          {test.keyParameters && test.keyParameters.length > 0 && (
            <div className="mt-3">
              <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block mb-1">
                Key Parameters Checked:
              </span>
              <div className="flex flex-wrap gap-1">
                {test.keyParameters.slice(0, 4).map((param, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-soft text-ink/80 font-medium shadow-2xs"
                  >
                    {param}
                  </span>
                ))}
                {test.keyParameters.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-soft text-sage font-bold">
                    +{test.keyParameters.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing, Barcode & Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-soft">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-ink/50 block tracking-wider">
                Standard Lab Rate
              </span>
              <span className="text-base sm:text-lg font-black text-sage">
                {formatPrice(test.price)}
              </span>
            </div>

            {/* Clinical Barcode Graphic */}
            <div className="hidden sm:flex flex-col items-end">
              <BarcodeSvg className="w-20 h-5 opacity-35" />
              <span className="font-mono text-[8px] text-ink/40">BARCODE VERIFIED</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/home-collection?service=test&item=${test.slug}#book`}
              className="min-h-[42px] px-3 rounded-xl bg-care text-white hover:bg-sage text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </Link>

            <a
              href={waAskUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
