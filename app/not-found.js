import Link from "next/link";
import { site } from "@/data/site";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-soft text-care flex items-center justify-center mx-auto mb-4 font-black text-2xl">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-sage">
        Page Not Found
      </h1>
      <p className="text-sm text-ink/75 mt-2 leading-relaxed">
        The diagnostic test, package, or resource you are looking for may have been moved or updated.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="min-h-[44px] px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-sage transition-all shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/tests"
          className="min-h-[44px] px-5 rounded-xl border border-soft text-sage text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-mist transition-all"
        >
          <Search className="w-4 h-4 text-care" />
          <span>Browse Tests</span>
        </Link>
      </div>
    </div>
  );
}
