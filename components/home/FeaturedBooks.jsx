"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getAvailableBooks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

const seriesColors = {
  "Quantum Worlds": "from-secondary-400 to-secondary-600",
  "Masters of the Universe": "from-accent-400 to-accent-600",
  "Geometry of Our Existence": "from-primary-400 to-primary-600",
};

const seriesDot = {
  "Quantum Worlds": "bg-secondary-400",
  "Masters of the Universe": "bg-accent-400",
  "Geometry of Our Existence": "bg-primary-400",
};

function GalleryCard({ book, index }) {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const num = String(index + 1).padStart(2, "0");

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springCfg = { stiffness: 150, damping: 20, mass: 0.4 };
  const sX = useSpring(rawX, springCfg);
  const sY = useSpring(rawY, springCfg);

  const rotateY = useTransform(sX, [0, 1], [-4, 4]);
  const rotateX = useTransform(sY, [0, 1], [4, -4]);

  const lightX = useTransform(sX, [0, 1], [0, 100]);
  const lightY = useTransform(sY, [0, 1], [0, 100]);
  const lightBg = useTransform(
    [lightX, lightY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(228,147,37,0.06) 0%, transparent 60%)`,
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image,
      }),
    );
    dispatch(toggleCart());
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        <Link
          href={`/books/${book.id}`}
          className="group block relative rounded-2xl overflow-hidden"
        >
          <div className="relative bg-linear-to-br from-charcoal via-[#1e1e35] to-[#15132a] rounded-2xl p-6 sm:p-8 min-h-105 flex flex-col justify-between">
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-0"
              style={{ background: lightBg }}
            />

            <div
              className="absolute inset-0 rounded-2xl opacity-3 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 0.5px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />

            <span className="absolute top-5 right-6 font-display text-[80px] sm:text-[96px] font-bold text-white/2.5 leading-none select-none group-hover:text-white/6 transition-all duration-700">
              {num}
            </span>

            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    seriesDot[book.series] || "bg-primary-400",
                  )}
                />
                <span className="text-[9px] uppercase tracking-[0.25em] text-fog/40 font-semibold">
                  {book.series}
                </span>
              </div>

              <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-semibold text-primary-400/70 bg-primary-400/6 px-3 py-1.5 rounded-full border border-primary-400/10">
                {book.category}
              </span>

              <h3 className="font-display text-2xl sm:text-[1.7rem] font-bold text-paper leading-snug group-hover:text-primary-300 transition-colors duration-500">
                {book.title}
              </h3>

              <p className="text-fog/40 text-sm leading-[1.8] line-clamp-3 group-hover:text-fog/55 transition-colors duration-500">
                {book.description}
              </p>
            </div>

            <div className="relative z-10 mt-auto pt-6 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {book.themes?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-[9px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full border border-white/4 text-fog/30 bg-white/2 group-hover:border-white/8 group-hover:text-fog/45 transition-all duration-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="h-px bg-white/4 group-hover:bg-linear-to-r group-hover:from-transparent group-hover:via-primary-500/20 group-hover:to-transparent transition-all duration-700" />

              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold text-paper">
                    ${book.price}
                  </span>
                  <span className="text-[10px] text-fog/25 uppercase tracking-wider">
                    {book.pages}p
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleAddToCart}
                    className="relative p-2.5 rounded-full bg-white/3 text-fog/25 border border-white/4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 hover:bg-primary hover:text-ink hover:border-primary"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </motion.button>
                  <div className="w-9 h-9 rounded-full bg-white/3 border border-white/4 flex items-center justify-center text-fog/25 group-hover:bg-primary group-hover:text-ink group-hover:border-primary group-hover:scale-105 transition-all duration-400">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 rounded-2xl border border-white/4 group-hover:border-primary-400/15 transition-colors duration-700 pointer-events-none z-20" />

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
              style={{
                boxShadow:
                  "inset 0 1px 0 0 rgba(228,147,37,0.08), 0 0 40px -12px rgba(228,147,37,0.08)",
              }}
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturedBooks() {
  const books = getAvailableBooks().slice(0, 4);

  return (
    <Section tone="cream" spacing="lg" grain>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-125 h-125 rounded-full bg-primary-200/20 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 rounded-full bg-secondary-200/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-2xl space-y-4">
            <BlurReveal delay={0}>
              <Subtitle tone="cream" line lineWidth={40}>
                The Collection
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title size="xl" tone="cream">
                Featured{" "}
                <Title.Gradient variant="primary" underline>
                  Works
                </Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <p className="text-ash text-base md:text-lg leading-[1.8] max-w-xl">
                Each novel is a meticulously crafted exploration of the
                questions that define our technological age.
              </p>
            </BlurReveal>
          </div>

          <BlurReveal delay={2.5}>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center">
                  <BookOpen
                    className="w-4 h-4 text-charcoal/40"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-charcoal">
                    {books.length}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-smoke">
                    Available
                  </p>
                </div>
              </div>
              <div className="w-px h-10 bg-charcoal/8" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-charcoal/5 flex items-center justify-center">
                  <Compass
                    className="w-4 h-4 text-charcoal/40"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-charcoal">
                    3
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-smoke">
                    Series
                  </p>
                </div>
              </div>
            </div>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-7">
          <div className="space-y-5 lg:space-y-7 md:pt-16">
            <BlurReveal preset="slide-left" delay={0}>
              <GalleryCard book={books[0]} index={0} />
            </BlurReveal>
            {books[2] && (
              <BlurReveal preset="slide-left" delay={2}>
                <GalleryCard book={books[2]} index={2} />
              </BlurReveal>
            )}
          </div>
          <div className="space-y-5 lg:space-y-7">
            {books[1] && (
              <BlurReveal preset="slide-right" delay={1}>
                <GalleryCard book={books[1]} index={1} />
              </BlurReveal>
            )}
            {books[3] && (
              <BlurReveal preset="slide-right" delay={3}>
                <GalleryCard book={books[3]} index={3} />
              </BlurReveal>
            )}
          </div>
        </div>

        <BlurReveal
          delay={4}
          className="flex items-center justify-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <Sparkles
                className="w-4 h-4 text-primary-600/50"
                strokeWidth={1.5}
              />
              <span className="text-[10px] uppercase tracking-[0.25em] text-smoke font-medium">
                More titles await
              </span>
            </div>
            <Button href="/books" variant="outline-light" size="md">
              View Full Collection <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
