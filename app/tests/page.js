"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { tests } from "@/data/tests";
import { categories } from "@/data/categories";
import { searchTests } from "@/lib/searchTests";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import TestCard from "@/components/TestCard";
import TestFilters from "@/components/TestFilters";
import Reveal from "@/components/Reveal";
import { Search, SlidersHorizontal, Phone, MessageCircle, Sparkles, X } from "lucide-react";

const PAGE_SIZE = 6;

function TestsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || null;
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredTests = useMemo(() => {
    let result = tests;
    if (selectedCategory) {
      result = result.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      result = searchTests(result, searchQuery);
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const visibleTests = filteredTests.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTests.length;

  const currentCatTitle = categories.find((c) => c.slug === selectedCategory)?.title;

  const waNotFoundUrl = whatsappLink({
    phone: site.whatsapp,
    text: `Hi ${site.name}, I am looking for a test called "${searchQuery}". Could you please verify availability and details?`,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Header */}
      <Reveal>
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft text-care text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pathology Directory</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-sage mt-1">
            Diagnostic & Pathology Tests
          </h1>
          <p className="text-xs sm:text-sm text-ink/75 mt-1.5 max-w-2xl leading-relaxed">
            Search individual tests, check sample specifications, preparation instructions, and request doorstep sample collection.
          </p>
        </div>
      </Reveal>

      {/* Search and Mobile Filter Toggle */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Search CBC, blood sugar, thyroid, lipid, vitamins..."
            className="w-full h-12 pl-11 pr-4 rounded-2xl border border-soft bg-white text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:ring-2 focus:ring-care shadow-xs"
          />
          <div className="absolute left-3.5 top-3.5 text-care/70">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden w-full sm:w-auto min-h-[48px] px-4 rounded-2xl border border-soft bg-white text-sage font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-xs hover:bg-mist"
        >
          <SlidersHorizontal className="w-4 h-4 text-care" />
          <span>
            {currentCatTitle ? `Category: ${currentCatTitle}` : "Filter by Category"}
          </span>
        </button>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <TestFilters
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setVisibleCount(PAGE_SIZE);
            }}
            isMobileOpen={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
          />
        </div>

        {/* Mobile Bottom Sheet Filter */}
        <div className="lg:hidden">
          <TestFilters
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setVisibleCount(PAGE_SIZE);
            }}
            isMobileOpen={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
          />
        </div>

        {/* Test Cards List */}
        <div className="lg:col-span-3">
          {/* Active Filter Chips */}
          {(selectedCategory || searchQuery) && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-ink/60 font-medium">Active filters:</span>
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-soft text-sage font-semibold">
                  {currentCatTitle}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="hover:text-care"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-soft text-sage font-semibold">
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-care"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="text-care hover:underline text-xs ml-1 font-semibold"
              >
                Reset all
              </button>
            </div>
          )}

          {visibleTests.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleTests.map((test) => (
                  <TestCard key={test.slug} test={test} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center pt-6">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="min-h-[44px] px-6 rounded-xl border border-care text-care hover:bg-care hover:text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    Load More Tests ({filteredTests.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Empty State adhering to lib/searchTests.js */
            <div className="p-8 sm:p-12 bg-white rounded-3xl border border-soft text-center max-w-md mx-auto space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-soft text-care flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-sage">No Tests Found</h3>
              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                We couldn&apos;t find that test. Contact our lab team for assistance.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={`tel:${site.phone}`}
                  className="min-h-[42px] px-4 rounded-xl border border-soft text-sage text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-mist transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Lab</span>
                </a>
                <a
                  href={waNotFoundUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-4 rounded-xl bg-[#25D366]/15 text-[#128C7E] text-xs font-semibold inline-flex items-center justify-center gap-1.5 hover:bg-[#25D366]/25 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestsPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-12 text-sm text-ink/60">Loading tests...</div>}>
      <TestsContent />
    </Suspense>
  );
}
