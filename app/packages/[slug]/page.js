import Link from "next/link";
import { notFound } from "next/navigation";
import { packages } from "@/data/packages";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/formatPrice";
import { whatsappLink } from "@/lib/whatsapp";
import PackageInclusions from "@/components/PackageInclusions";
import Reveal from "@/components/Reveal";
import { VacutainerSvg, BarcodeSvg, LabVerifiedStamp, OrganIcon } from "@/components/MedicalSvg";
import { Sparkles, CheckCircle2, Home, AlertCircle, ArrowLeft, Clock, ShieldCheck, TestTube2 } from "lucide-react";

export function generateStaticParams() {
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export function generateMetadata({ params }) {
  const pkg = packages.find((p) => p.slug === params.slug);
  if (!pkg) return {};

  return {
    title: `${pkg.name} (${pkg.packageCode || "Checkup"}) | ${site.name}`,
    description: `${pkg.description} Covers ${pkg.testSlugs?.length || 0} diagnostic profiles. Book at ${site.name} in ${site.city}.`,
    openGraph: {
      title: `${pkg.name} | ${site.name}`,
      description: pkg.description,
    },
  };
}

export default function PackageDetailPage({ params }) {
  const pkg = packages.find((p) => p.slug === params.slug);

  if (!pkg) {
    notFound();
  }

  const testCount = Array.isArray(pkg.testSlugs) ? pkg.testSlugs.length : 0;
  const totalParams = pkg.totalParametersCount || testCount * 5;

  const waBookingUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I would like to book the "${pkg.name}" (${pkg.packageCode || pkg.slug}). Please provide pricing and booking details.`,
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
        <Link href="/packages" className="hover:text-care">Health Packages</Link>
        <span>/</span>
        <span className="text-sage font-medium truncate">{pkg.name}</span>
      </nav>

      {/* Package Clinical Requisition Sheet */}
      <Reveal>
        <div className="bg-white rounded-3xl border border-soft overflow-hidden shadow-sm border-t-4 border-t-care">
          {/* Header Strip */}
          <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-mist to-white border-b border-soft flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-sage bg-white px-2.5 py-1 rounded border border-soft shadow-2xs">
                {pkg.packageCode || "PKG-PANEL"}
              </span>
              <span className="text-xs font-bold text-care tracking-wide uppercase">
                {pkg.tag || "Preventive Health"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-sage bg-soft px-3 py-1 rounded-full">
                {testCount} Test Profiles • {totalParams} Parameters
              </span>
              <LabVerifiedStamp />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-sage tracking-tight">
                  {pkg.name}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-ink/80 leading-relaxed max-w-2xl">
                  {pkg.description}
                </p>
              </div>

              {/* Total Parameters Badge */}
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-care/20 to-emerald-50 border border-care/40 text-center flex-shrink-0 shadow-2xs">
                <span className="text-xl font-black text-care leading-none">
                  {totalParams}
                </span>
                <span className="text-[10px] font-bold text-sage uppercase tracking-tighter mt-0.5">
                  Params
                </span>
              </div>
            </div>

            {/* Organ Systems Covered */}
            {pkg.coveredOrgans && pkg.coveredOrgans.length > 0 && (
              <div className="mt-6 pt-4 border-t border-soft/80">
                <span className="text-xs uppercase font-bold text-ink/50 tracking-wider block mb-2">
                  Organ Systems Assessed In This Package:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pkg.coveredOrgans.map((organ) => (
                    <span
                      key={organ}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-soft border border-care/30 text-xs font-bold text-sage"
                    >
                      <OrganIcon type={organ} className="w-4 h-4 text-care" />
                      <span className="capitalize">{organ} Assessment</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Clinical Protocol Spec Matrix */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-2.5">
                <TestTube2 className="w-5 h-5 text-care flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 block">Sample Tubes</span>
                  <p className="font-bold text-sage mt-0.5">{pkg.sampleTubesRequired || "Multi-Tube Draw"}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-care flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 block">Report Turnaround</span>
                  <p className="font-bold text-sage mt-0.5">{pkg.turnaround || "Within 24 Hours"}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mist/60 border border-soft flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink/50 block">Fasting Rule</span>
                  <p className="font-bold text-sage mt-0.5">
                    {pkg.fastingRequired ? "8-10 Hours Fasting" : "No Fasting"}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing, Barcode & Action Buttons */}
            <div className="mt-8 pt-6 border-t border-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink/60 uppercase font-bold tracking-wider block">
                  All-Inclusive Package Rate
                </span>
                <span className="text-2xl sm:text-3xl font-black text-sage">
                  {formatPrice(pkg.price)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/home-collection?service=package&item=${pkg.slug}#book`}
                  className="min-h-[46px] px-6 rounded-xl bg-care text-white text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-sage transition-all shadow-sm"
                >
                  <Home className="w-4 h-4" />
                  <span>Book Doorstep Visit</span>
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
              <span>{pkg.packageCode || "PKG-CODE"} // CLINICAL PATHOLOGY PANEL</span>
              <BarcodeSvg className="w-24 h-5 opacity-40" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Inclusions Breakdown */}
      <Reveal delay={0.1} className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-soft shadow-xs">
        <h2 className="text-lg font-bold text-sage mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-care" />
          <span>Detailed Inclusions ({testCount} Diagnostic Profiles • {totalParams} Parameters)</span>
        </h2>
        <p className="text-xs sm:text-sm text-ink/70 mb-6">
          Each component test is processed in our laboratory under verified diagnostic protocols.
        </p>

        <PackageInclusions testSlugs={pkg.testSlugs} />
      </Reveal>

      {/* Doorstep Phlebotomy Notice */}
      <Reveal delay={0.15} className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-soft to-mist border border-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-sage flex items-center gap-2">
            <Home className="w-4 h-4 text-care" />
            <span>Doorstep Sample Collection Available</span>
          </h3>
          <p className="text-xs sm:text-sm text-ink/75 mt-1">
            Book home collection across {site.serviceAreas.slice(0, 4).join(", ")}, and surrounding Pune areas.
          </p>
        </div>
        <Link
          href={`/home-collection?service=package&item=${pkg.slug}#book`}
          className="min-h-[42px] px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center hover:bg-sage transition-all flex-shrink-0 shadow-xs"
        >
          Schedule Collection
        </Link>
      </Reveal>

      {/* Medical Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-mist border border-soft text-xs text-ink/75 leading-relaxed flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-sage">Medical Disclaimer:</strong> This health package is intended for baseline preventive assessment. It does not replace clinical consultation, emergency medical evaluation, or individualized physician guidance.
        </div>
      </div>
    </div>
  );
}
