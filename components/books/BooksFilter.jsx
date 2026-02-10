"use client";

import Input from "@/components/ui/Input";
import { books, series } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Grid3X3, LayoutList, Search, X } from "lucide-react";

const categories = ["All", ...new Set(books.map((b) => b.category))];
const seriesNames = ["All", ...series.map((s) => s.name)];

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 },
  }),
};

export default function BooksFilter({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  seriesFilter,
  setSeriesFilter,
  view,
  setView,
  resultCount,
}) {
  const hasFilters =
    search || categoryFilter !== "All" || seriesFilter !== "All";

  return (
    <section className="relative bg-paper border-b border-charcoal/4">
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-smoke pointer-events-none" />
            <Input
              tone="light"
              size="md"
              placeholder="Search by title, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-charcoal/5 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-smoke" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-charcoal/6 overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2.5 transition-all duration-300",
                  view === "grid"
                    ? "bg-charcoal text-paper"
                    : "text-smoke hover:text-ink",
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2.5 transition-all duration-300",
                  view === "list"
                    ? "bg-charcoal text-paper"
                    : "text-smoke hover:text-ink",
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] uppercase tracking-[0.15em] text-smoke font-medium ml-2">
              {resultCount} {resultCount === 1 ? "book" : "books"}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-smoke font-semibold min-w-15">
              Genre
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  variants={pillVariants}
                  custom={i}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                    categoryFilter === cat
                      ? "bg-charcoal text-paper border-charcoal shadow-sm"
                      : "bg-transparent text-smoke border-charcoal/8 hover:border-charcoal/20 hover:text-ink",
                  )}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-smoke font-semibold min-w-15">
              Series
            </span>
            <div className="flex flex-wrap gap-2">
              {seriesNames.map((s, i) => (
                <motion.button
                  key={s}
                  variants={pillVariants}
                  custom={i}
                  onClick={() => setSeriesFilter(s)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border",
                    seriesFilter === s
                      ? "bg-primary-500 text-white border-primary-500 shadow-sm shadow-primary-500/20"
                      : "bg-transparent text-smoke border-charcoal/8 hover:border-primary-500/30 hover:text-primary-600",
                  )}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-charcoal/4"
          >
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
                setSeriesFilter("All");
              }}
              className="text-[11px] uppercase tracking-[0.15em] text-primary-500 font-semibold hover:text-primary-600 transition-colors flex items-center gap-1.5"
            >
              <X className="w-3 h-3" />
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
