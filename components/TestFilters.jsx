"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import HealthIcon from "./HealthIcon";
import { Check, X, Filter } from "lucide-react";

export default function TestFilters({
  selectedCategory,
  onSelectCategory,
  isMobileOpen,
  onCloseMobile,
}) {
  const [tempCategory, setTempCategory] = useState(selectedCategory);

  useEffect(() => {
    setTempCategory(selectedCategory);
  }, [selectedCategory, isMobileOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isMobileOpen) {
        onCloseMobile();
      }
    }
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen, onCloseMobile]);

  function handleApply() {
    onSelectCategory(tempCategory);
    onCloseMobile();
  }

  function handleClear() {
    setTempCategory(null);
    onSelectCategory(null);
    onCloseMobile();
  }

  return (
    <>
      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:block bg-white p-5 rounded-2xl border border-soft shadow-xs sticky top-24">
        <div className="flex items-center justify-between pb-3.5 border-b border-soft">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-care" />
            <h3 className="text-xs font-bold text-sage uppercase tracking-wider">
              Filter Categories
            </h3>
          </div>
          {selectedCategory && (
            <button
              onClick={() => onSelectCategory(null)}
              className="text-xs text-care hover:underline font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-3.5 space-y-1.5">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
              !selectedCategory
                ? "bg-care text-white shadow-2xs"
                : "text-ink/80 hover:bg-mist"
            }`}
          >
            <span>All Diagnostic Tests</span>
            {!selectedCategory && <Check className="w-4 h-4" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? "bg-care text-white font-semibold shadow-2xs"
                  : "text-ink/80 hover:bg-mist"
              }`}
            >
              <div className="flex items-center gap-2">
                <HealthIcon
                  name={cat.icon}
                  className={`w-4 h-4 ${
                    selectedCategory === cat.slug ? "text-white" : "text-care"
                  }`}
                />
                <span>{cat.title}</span>
              </div>
              {selectedCategory === cat.slug && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Sheet Filter */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Filter categories"
        >
          <div
            className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl p-5 overflow-hidden animate-slideUp"
          >
            {/* Sheet Handle & Header */}
            <div className="w-10 h-1 bg-soft mx-auto rounded-full mb-3" />
            <div className="flex items-center justify-between pb-3 border-b border-soft">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-care" />
                <h3 className="text-base font-bold text-sage">Filter by Category</h3>
              </div>
              <button
                onClick={onCloseMobile}
                className="text-ink/60 hover:text-ink text-sm p-1"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="py-4 space-y-2 overflow-y-auto max-h-[50vh]">
              <button
                type="button"
                onClick={() => setTempCategory(null)}
                className={`w-full text-left min-h-[46px] px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  !tempCategory
                    ? "bg-care/15 text-care font-bold"
                    : "text-ink hover:bg-mist"
                }`}
              >
                <span>All Diagnostic Tests</span>
                {!tempCategory && <Check className="w-4 h-4 text-care" />}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setTempCategory(cat.slug)}
                  className={`w-full text-left min-h-[46px] px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    tempCategory === cat.slug
                      ? "bg-care/15 text-care font-bold"
                      : "text-ink hover:bg-mist"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HealthIcon name={cat.icon} className="w-4 h-4 text-care" />
                    <span>{cat.title}</span>
                  </div>
                  {tempCategory === cat.slug && <Check className="w-4 h-4 text-care" />}
                </button>
              ))}
            </div>

            {/* Actions (Apply and Clear) */}
            <div className="pt-4 border-t border-soft grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="min-h-[44px] px-4 rounded-xl border border-soft text-sage text-sm font-semibold hover:bg-mist transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="min-h-[44px] px-4 rounded-xl bg-care text-white text-sm font-semibold hover:bg-sage transition-colors shadow-xs"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
