"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { tests } from "@/data/tests";
import { searchTests } from "@/lib/searchTests";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import HealthIcon from "./HealthIcon";
import { Search, ArrowRight, Phone, MessageCircle } from "lucide-react";

export default function TestSearch({ placeholder = "Search CBC, thyroid, vitamin D…" }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  const results = query.trim() ? searchTests(tests, query).slice(0, 5) : [];

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tests?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  }

  const waNotFoundUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I am looking for a test called "${query}". Could you please verify availability and details?`,
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full h-14 pl-12 pr-28 rounded-2xl border-2 border-care/30 bg-white text-ink placeholder:text-ink/40 text-sm sm:text-base focus:outline-none focus:border-care shadow-sm transition-all"
            aria-label="Search tests"
          />
          <div className="absolute left-4 text-care/70 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <button
            type="submit"
            className="absolute right-2 h-10 px-5 rounded-xl bg-care text-white text-xs sm:text-sm font-semibold hover:bg-sage transition-all shadow-xs"
          >
            Find Test
          </button>
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-soft z-50 overflow-hidden divide-y divide-soft animate-fadeIn">
          {results.length > 0 ? (
            <div>
              <div className="px-4 py-2.5 bg-mist text-[11px] font-bold text-sage/80 uppercase tracking-wider">
                Matching Diagnostic Tests
              </div>
              <ul className="divide-y divide-soft">
                {results.map((test) => (
                  <li key={test.slug}>
                    <Link
                      href={`/tests/${test.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="min-h-[48px] px-4 py-3 flex items-center justify-between hover:bg-mist/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-soft text-care flex items-center justify-center flex-shrink-0">
                          <HealthIcon name={test.icon || "Activity"} className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-sage group-hover:text-care transition-colors">
                            {test.name}
                          </p>
                          <p className="text-xs text-ink/60 line-clamp-1">
                            {test.summary}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-care font-semibold ml-3 flex-shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-2.5 bg-soft/40 text-center">
                <Link
                  href={`/tests?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-care hover:underline"
                >
                  View all matching tests for &quot;{query}&quot; &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-5 text-center space-y-3">
              <p className="text-xs sm:text-sm text-ink/80">
                We couldn&apos;t find that test. Contact our lab team for assistance.
              </p>
              <div className="flex items-center justify-center gap-3 pt-1">
                <a
                  href={`tel:${site.phone}`}
                  className="min-h-[40px] px-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-mist border border-soft text-sage text-xs font-semibold hover:bg-soft transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-care" />
                  <span>Call Lab</span>
                </a>
                <a
                  href={waNotFoundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/15 text-[#128C7E] text-xs font-semibold hover:bg-[#25D366]/25 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
