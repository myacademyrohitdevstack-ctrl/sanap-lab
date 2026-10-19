import { AlertCircle, Clock } from "lucide-react";

export default function PreparationInfo({ preparation }) {
  const hasPreparation = preparation && preparation.trim().length > 0;

  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-ink/80 shadow-2xs">
      <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-amber-900 block mb-0.5 text-xs uppercase tracking-wider">
          Test Preparation & Fasting Guidelines:
        </span>
        <p className="leading-relaxed text-amber-950/90 text-xs sm:text-sm">
          {hasPreparation ? preparation : "Confirm test-specific instructions and fasting requirements with our lab team."}
        </p>
      </div>
    </div>
  );
}
