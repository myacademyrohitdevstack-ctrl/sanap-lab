import Link from "next/link";
import { notFound } from "next/navigation";
import { tests } from "@/data/tests";
import { categories } from "@/data/categories";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/formatPrice";
import { whatsappLink } from "@/lib/whatsapp";
import PreparationInfo from "@/components/PreparationInfo";
import TestCard from "@/components/TestCard";
import Reveal from "@/components/Reveal";
import { VacutainerSvg, BarcodeSvg, LabVerifiedStamp, OrganIcon } from "@/components/MedicalSvg";
import { Clock, TestTube2, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, Home, FileText } from "lucide-react";

export function generateStaticParams() {
  return tests.map((t) => ({
    slug: t.slug,
  }));
}

export function generateMetadata({ params }) {
  const test = tests.find((t) => t.slug === params.slug);
  if (!test) return {};

  return {
    title: `${test.name} (${test.testCode || "Lab Test"}) | ${site.name}`,
    description: `${test.summary} Sample: ${test.sampleType || "Blood"}. Book at ${site.name} in ${site.city}.`,
    openGraph: {
      title: `${test.name} | ${site.name}`,
      description: test.summary,
    },
  };
}

export default function TestDetailPage({ params }) {
  const test = tests.find((t) => t.slug === params.slug);

  if (!test) {
    notFound();
  }

  const categoryObj = categories.find((c) => c.slug === test.category);
  const categoryTitle = categoryObj ? categoryObj.title : test.category;

  // Find related tests
  const relatedTests = tests
    .filter((t) => t.slug !== test.slug)
    .slice(0, 2);

  const waBookingUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to book the "${test.name}" (${test.testCode || test.slug}). Please confirm the price and preparation details.`,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink/65">
        <Link href="/" className="hover:text-care flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/tests" className="hover:text-care">Diagnostic Tests</Link>
        <span>/</span>
        <span className="text-sage font-medium truncate">{test.name}</span>
      </nav>

      {/* Main Laboratory Requisition Sheet */}
      <Reveal>
        <div className="bg-white rounded-3xl border border-soft overflow-hidden shadow-sm border-t-4 border-t-care">
          {/* Header strip with Test Code and Stamps */}
          <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-mist to-white border-b border-soft flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-sage bg-white px-2.5 py-1 rounded border border-soft shadow-2xs">
                {test.testCode || "LAB-TEST"}
              </span>
              <span className="text-xs font-bold text-care tracking-wide uppercase">
                {categoryTitle}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-ink/60 hidden sm:inline">
                {test.parametersCount ? `${test.parametersCount} Parameters Analyzed` : "Single Biomarker"}
              </span>
              <LabVerifiedStamp />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-sage tracking-tight">
                  {test.name}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-ink/80 leading-relaxed max-w-2xl">
                  {test.summary}
                </p>
              </div>

              {/* Vacutainer tube visualization */}
              <div className="flex flex-col items-center bg-mist p-2.5 rounded-2xl border border-soft shadow-2xs flex-shrink-0" title={test.tubeName}>
                <VacutainerSvg capColor={test.capColor || "#8B5CF6"} className="w-6 h-10" />
                <span className="text-[10px] font-mono text-ink/70 mt-1 font-bold">
                  {test.parametersCount}P
                </span>
              </div>
            </div>

            {/* Comprehensive Diagnostic Spec Matrix */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-3">
                <TestTube2 className="w-5 h-5 text-care flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block">
                    Sample & Collection Container
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-sage mt-0.5">
                    {test.tubeName || test.sampleType || "Whole Blood (2 ml)"}
                  </p>
                  <p className="text-[11px] text-ink/65 mt-0.5">
                    Drawn using sterile vacuum closed-system tube.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-3">
                <Clock className="w-5 h-5 text-care flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block">
                    Report Turnaround Time
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-sage mt-0.5">
                    {test.reportTime || "Same Day (4 to 6 Hours)"}
                  </p>
                  <p className="text-[11px] text-care font-semibold mt-0.5">
                    Delivered digitally via WhatsApp & Email.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block">
                    Fasting Protocol
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-sage mt-0.5">
                    {test.fastingRequired ? "Strict Fasting Required" : "No Fasting Needed"}
                  </p>
                  <p className="text-[11px] text-ink/65 mt-0.5">
                    {test.preparation || "Confirm test-specific instructions with lab."}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-care flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 tracking-wider block">
                    Laboratory Quality Assurance
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-sage mt-0.5">
                    Internal Controls & Calibrated Analyzers
                  </p>
                  <p className="text-[11px] text-ink/65 mt-0.5">
                    Verified by qualified clinical pathologists.
                  </p>
                </div>
              </div>
            </div>

            {/* Biomarkers / Key Parameters List */}
            {test.keyParameters && test.keyParameters.length > 0 && (
              <div className="mt-8 p-5 rounded-2xl bg-white border border-soft shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sage mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-care" />
                  <span>Individual Parameters Measured ({test.keyParameters.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {test.keyParameters.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-mist/40 border border-soft/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-care flex-shrink-0" />
                      <span className="font-semibold text-ink/80">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing, Barcode & Action Buttons */}
            <div className="mt-8 pt-6 border-t border-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink/60 uppercase font-bold tracking-wider block">
                  Diagnostic Lab Rate
                </span>
                <span className="text-2xl sm:text-3xl font-black text-sage">
                  {formatPrice(test.price)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/home-collection?service=test&item=${test.slug}#book`}
                  className="min-h-[46px] px-6 rounded-xl bg-care text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-sage transition-all shadow-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>Request Home Visit</span>
                </Link>
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] px-5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Bottom Barcode Requisition Verification */}
            <div className="mt-6 pt-4 border-t border-soft/60 flex items-center justify-between text-xs text-ink/40 font-mono">
              <span>{test.testCode || "REQ-CODE"} // CLINICAL PATHOLOGY</span>
              <BarcodeSvg className="w-24 h-5 opacity-40" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Preparation Guidelines */}
      <Reveal delay={0.15} className="mt-6">
        <PreparationInfo preparation={test.preparation} />
      </Reveal>

      {/* Medical Disclaimer */}
      <div className="mt-6 p-4 rounded-2xl bg-mist border border-soft text-xs text-ink/75 leading-relaxed flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-sage">Medical Disclaimer:</strong> This diagnostic test information is for general educational awareness only and does not constitute self-diagnosis or medical advice. Please consult your physician for clinical interpretation of test findings.
        </div>
      </div>

      {/* Related Tests */}
      {relatedTests.length > 0 && (
        <div className="mt-12 pt-8 border-t border-soft">
          <h2 className="text-lg font-bold text-sage mb-4 flex items-center gap-2">
            <TestTube2 className="w-5 h-5 text-care" />
            <span>Related Diagnostic Profiles</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTests.map((t) => (
              <TestCard key={t.slug} test={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
