"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getBooksBySeries, series } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

const seriesColors = [
  {
    accent: "from-primary-400 to-amber-500",
    badge: "bg-primary-500/10 text-primary-600",
    border: "border-primary-500/15 hover:border-primary-500/30",
  },
  {
    accent: "from-secondary-400 to-violet-500",
    badge: "bg-secondary-500/10 text-secondary-600",
    border: "border-secondary-500/15 hover:border-secondary-500/30",
  },
  {
    accent: "from-accent-400 to-rose-500",
    badge: "bg-accent-500/10 text-accent-600",
    border: "border-accent-500/15 hover:border-accent-500/30",
  },
];

export default function BooksSeries() {
  return (
    <section className="relative bg-parchment overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-20 w-100 h-100 rounded-full bg-primary-500/3 blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-75 h-75 rounded-full bg-secondary-500/3 blur-[80px]" />
      </div>

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="text-center mb-14">
          <BlurReveal>
            <Subtitle
              tone="cream"
              size="sm"
              align="center"
              line="both"
              lineWidth={36}
            >
              Series
            </Subtitle>
          </BlurReveal>
          <BlurReveal delay={0.1}>
            <Title
              as="h2"
              size="lg"
              tone="cream"
              align="center"
              className="mt-4"
            >
              Explore by <Title.Gradient>Universe</Title.Gradient>
            </Title>
          </BlurReveal>
          <BlurReveal delay={0.2}>
            <p className="mt-4 text-smoke text-base max-w-lg mx-auto">
              Each series is a self-contained universe — interconnected
              narratives that push the limits of speculative fiction.
            </p>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {series.map((s, i) => {
            const color = seriesColors[i % seriesColors.length];
            const booksInSeries = getBooksBySeries(s.name);
            const availableCount = booksInSeries.filter(
              (b) => b.status === "available",
            ).length;
            const upcomingCount = booksInSeries.filter(
              (b) => b.status === "comingSoon",
            ).length;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={cn(
                  "group relative rounded-2xl bg-paper border p-8 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/3",
                  color.border,
                )}
              >
                <div
                  className={cn(
                    "absolute top-0 left-8 right-8 h-0.5 rounded-full bg-linear-to-r",
                    color.accent,
                  )}
                />

                <span className="absolute top-4 right-6 font-display text-[80px] font-bold text-charcoal/3 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold mb-5",
                      color.badge,
                    )}
                  >
                    <BookOpen className="w-3 h-3" />
                    {s.bookCount} Books
                  </div>

                  <h3 className="font-display text-xl font-bold text-charcoal mb-3 leading-snug">
                    {s.name}
                  </h3>

                  <p className="text-smoke text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {booksInSeries.map((book) => (
                      <Link
                        key={book.id}
                        href={`/books/${book.id}`}
                        className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-primary-600 transition-colors group/link"
                      >
                        <ChevronRight className="w-3 h-3 text-primary-400 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        <span className="truncate">{book.title}</span>
                        {book.status === "comingSoon" && (
                          <span className="text-[9px] uppercase tracking-wider text-secondary-500 font-medium ml-auto shrink-0">
                            Soon
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase tracking-wider text-smoke">
                        {availableCount} Available
                      </span>
                      {upcomingCount > 0 && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-charcoal/10" />
                          <span className="text-[10px] uppercase tracking-wider text-secondary-500">
                            {upcomingCount} Upcoming
                          </span>
                        </>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-smoke opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
