"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getBooksBySeries, series } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

const COVER_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#111827" stop-opacity="0.10"/>
        <stop offset="1" stop-color="#111827" stop-opacity="0.03"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" rx="18" fill="url(#g)"/>
    <rect x="40" y="60" width="320" height="24" rx="12" fill="#111827" opacity="0.10"/>
    <rect x="40" y="100" width="240" height="16" rx="8" fill="#111827" opacity="0.08"/>
    <rect x="40" y="460" width="220" height="18" rx="9" fill="#111827" opacity="0.07"/>
    <rect x="40" y="490" width="260" height="12" rx="6" fill="#111827" opacity="0.06"/>
  </svg>
`);

const getCoverSrc = (book) =>
  book.cover ??
  book.coverUrl ??
  book.coverImage ??
  book.image ??
  book.thumbnail ??
  book.thumb ??
  null;

function CoverStack({ books }) {
  const shown = books.slice(0, 6);
  const extra = Math.max(0, books.length - shown.length);

  const [active, setActive] = useState(null);
  const [hovering, setHovering] = useState(false);

  const center = (shown.length - 1) / 2;

  const spring = { type: "spring", stiffness: 220, damping: 24, mass: 0.8 };

  return (
    <div
      className="relative w-full overflow-visible"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setActive(null);
      }}
    >
      <div className="flex w-full items-end justify-center overflow-visible -space-x-7 sm:-space-x-9 md:-space-x-10">
        {shown.map((book, i) => {
          const src = getCoverSrc(book) || COVER_PLACEHOLDER;

          const spread = hovering ? 1 : 0.75;
          const baseX = (i - center) * 10 * spread;
          const baseRotate = (i - center) * (hovering ? 2.2 : 2.8);

          const isActive = active === i;

          return (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              aria-label={`Open ${book.title}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="focus:outline-none"
            >
              <motion.div
                animate={{
                  x: isActive ? baseX * 1.05 : baseX,
                  y: isActive ? -16 : 0,
                  rotate: isActive ? 0 : baseRotate,
                  scale: isActive ? 1.1 : hovering ? 0.99 : 1,
                }}
                transition={spring}
                style={{
                  zIndex: isActive ? 200 : 10 + i,
                  transformOrigin: "bottom center",
                }}
                className="relative transform-gpu will-change-transform h-28 sm:h-32 md:h-36 aspect-2/3 w-auto rounded-lg overflow-hidden border border-charcoal/10 bg-paper shadow-sm hover:shadow-xl hover:shadow-charcoal/10"
              >
                <img
                  src={src}
                  alt={book.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                {book.status === "comingSoon" && (
                  <span className="absolute top-2 right-2 rounded-full bg-secondary-500/15 text-secondary-600 text-[9px] uppercase tracking-wider px-2 py-1">
                    Soon
                  </span>
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-charcoal/10 to-transparent" />
              </motion.div>
            </Link>
          );
        })}
      </div>

      {extra > 0 && (
        <div className="pointer-events-none absolute -bottom-2 right-0">
          <span className="inline-flex items-center rounded-full bg-charcoal/6 text-charcoal/70 text-[10px] font-semibold px-2.5 py-1">
            +{extra} more
          </span>
        </div>
      )}
    </div>
  );
}

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
              Each series is a self-contained universe, interconnected
              narratives that push the limits of speculative fiction.
            </p>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                  "group relative rounded-2xl bg-paper border p-8 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/3 overflow-visible",
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

                  <p className="text-smoke text-sm leading-relaxed mb-7">
                    {s.description}
                  </p>

                  <div className="mb-8 w-full overflow-visible">
                    <CoverStack books={booksInSeries} />
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
