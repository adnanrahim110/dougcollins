"use client";

import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Grid3X3, LayoutList, Search, X } from "lucide-react";

export default function BooksFilter({
  search,
  setSearch,
  view,
  setView,
  resultCount,
}) {
  return (
    <section className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
      <div className="absolute -top-6 right-5 sm:right-8 lg:right-12 bg-primary rounded-2xl p-1 pr-5 backdrop-blur-xs shadow-[0_0_20px_5px] shadow-black/30">
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
            <div className="flex items-center rounded-xl border border-charcoal/10 overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2.5 transition-all duration-300",
                  view === "grid"
                    ? "bg-charcoal text-paper"
                    : "text-white hover:text-ink",
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
                    : "text-white hover:text-ink",
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] uppercase tracking-[0.15em] text-white font-medium ml-2">
              {resultCount} {resultCount === 1 ? "book" : "books"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
