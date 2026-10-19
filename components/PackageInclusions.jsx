import Link from "next/link";
import { tests } from "@/data/tests";
import { VacutainerSvg } from "./MedicalSvg";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PackageInclusions({ testSlugs = [] }) {
  const includedTests = testSlugs
    .map((slug) => tests.find((t) => t.slug === slug))
    .filter(Boolean);

  if (includedTests.length === 0) {
    return (
      <p className="text-sm text-ink/70">
        Inclusions list is being updated by the lab. Please contact our team for the complete list.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {includedTests.map((test, idx) => (
        <div
          key={test.slug || idx}
          className="p-4 sm:p-5 rounded-2xl border border-soft bg-white hover:border-care/40 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            {/* Top Tag & Code */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[10px] font-bold text-sage bg-mist px-2 py-0.5 rounded border border-soft">
                {test.testCode || "LAB-PARAM"}
              </span>

              <span className="text-[10px] font-bold text-care bg-soft px-2 py-0.5 rounded-full">
                {test.parametersCount} Parameters
              </span>
            </div>

            {/* Test Name & Vacutainer Illustration */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-bold text-sage group-hover:text-care transition-colors">
                  {test.name}
                </h4>
                <p className="text-xs text-ink/75 mt-1 leading-relaxed line-clamp-2">
                  {test.summary}
                </p>
              </div>

              <div className="p-1 rounded-lg bg-mist border border-soft flex-shrink-0" title={test.tubeName}>
                <VacutainerSvg capColor={test.capColor || "#8B5CF6"} className="w-3.5 h-6" />
              </div>
            </div>

            {/* Key Biomarkers Tested */}
            {test.keyParameters && test.keyParameters.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-soft/60">
                <div className="flex flex-wrap gap-1">
                  {test.keyParameters.slice(0, 3).map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-mist text-ink/80 font-medium"
                    >
                      {p}
                    </span>
                  ))}
                  {test.keyParameters.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-soft text-sage font-bold">
                      +{test.keyParameters.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Turnaround and Link */}
          <div className="mt-4 pt-3 border-t border-soft flex items-center justify-between text-xs">
            <span className="text-[11px] text-ink/60 flex items-center gap-1">
              <Clock className="w-3 h-3 text-care" />
              <span>{test.reportTime || "Same Day"}</span>
            </span>

            <Link
              href={`/tests/${test.slug}`}
              className="text-care font-bold hover:underline text-xs inline-flex items-center gap-1"
            >
              <span>View full protocol</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
