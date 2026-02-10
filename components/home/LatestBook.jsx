"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getLatestBook } from "@/lib/data";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Layers, ShoppingBag, Star } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

function Book3D({ title, series, className }) {
  const bookRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 120, damping: 25, mass: 0.5 };
  const sX = useSpring(rawX, springCfg);
  const sY = useSpring(rawY, springCfg);

  const rotateY = useTransform(sX, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sY, [-0.5, 0.5], [12, -12]);

  const glareX = useTransform(sX, [-0.5, 0.5], [70, 30]);
  const glareY = useTransform(sY, [-0.5, 0.5], [70, 30]);
  const glareOpacity = useTransform(
    sX,
    [-0.5, -0.15, 0, 0.15, 0.5],
    [0, 0.12, 0.06, 0.12, 0],
  );

  const shadowX = useTransform(sX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(sY, [-0.5, 0.5], [-10, 20]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!bookRef.current) return;
      const rect = bookRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={bookRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-64 sm:w-72 cursor-pointer"
      >
        <div
          className="absolute top-[3%] -right-3.5 w-3.5 h-[94%] rounded-r-sm origin-left"
          style={{
            transform: "rotateY(90deg)",
            background:
              "repeating-linear-gradient(to bottom, #d4d0c8 0px, #f5f2ed 1px, #e8e5de 2px, #d4d0c8 3px)",
            boxShadow: "inset -2px 0 6px rgba(0,0,0,0.15)",
          }}
        />

        <div
          className="absolute top-[2%] -left-4.5 w-4.5 h-[96%] rounded-l origin-right"
          style={{
            transform: "rotateY(-90deg)",
            background: "linear-gradient(to right, #1a1520, #252030, #1a1520)",
            boxShadow: "inset 2px 0 8px rgba(0,0,0,0.4)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-primary-400/60 text-[7px] font-display font-bold uppercase tracking-[0.2em] whitespace-nowrap"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {title}
            </span>
          </div>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[60%] h-px bg-primary-500/20" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[60%] h-px bg-primary-500/20" />
        </div>

        <div
          className="absolute -bottom-2.5 left-[2%] w-[96%] h-2.5 origin-top"
          style={{
            transform: "rotateX(-90deg)",
            background:
              "repeating-linear-gradient(to right, #d4d0c8 0px, #f5f2ed 1px, #e8e5de 2px, #d4d0c8 3px)",
            boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
          }}
        />

        <div
          className="relative aspect-2/3 rounded-xl overflow-hidden"
          style={{ transform: "translateZ(1px)" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#12101a] via-[#1c1930] to-[#0f0d15]" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 0.5px, transparent 0)",
              backgroundSize: "16px 16px",
            }}
          />

          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-[15%] left-[10%] w-[80%] aspect-square rounded-full border border-primary-400/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-[25%] left-[20%] w-[60%] aspect-square rounded-full border border-primary-500/[0.07]"
            />
            <div className="absolute top-0 left-[40%] w-px h-full bg-linear-to-b from-transparent via-primary-400/15 to-transparent rotate-20 origin-top" />
            <div className="absolute top-0 left-[60%] w-px h-full bg-linear-to-b from-transparent via-secondary-400/10 to-transparent -rotate-15 origin-top" />
          </div>

          <div className="absolute inset-4 border border-primary-400/10 rounded-lg" />

          <div className="relative h-full flex flex-col items-center justify-center px-8 text-center z-10">
            <p className="text-primary-400/50 text-[9px] uppercase tracking-[0.35em] font-semibold mb-6">
              Dough Collins
            </p>
            <div className="w-10 h-px bg-primary-500/30 mb-5" />
            <div className="w-16 h-16 rounded-full bg-primary-500/[0.07] border border-primary-400/10 flex items-center justify-center mb-5 backdrop-blur-sm">
              <BookOpen
                className="w-7 h-7 text-primary-400/80"
                strokeWidth={1}
              />
            </div>
            <p className="font-display text-xl sm:text-2xl text-paper font-bold leading-snug mb-3 drop-shadow-lg">
              {title}
            </p>
            <div className="w-6 h-px bg-primary-500/30 mb-3" />
            <p className="text-fog/40 text-[10px] tracking-[0.2em] uppercase font-medium">
              {series}
            </p>
          </div>

          <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-primary-400/15 rounded-tl-sm" />
          <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-primary-400/15 rounded-tr-sm" />
          <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-primary-400/15 rounded-bl-sm" />
          <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-primary-400/15 rounded-br-sm" />

          <motion.div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              ),
              opacity: glareOpacity,
            }}
          />
        </div>

        <motion.div
          className="absolute -z-10 inset-x-4 -bottom-4 h-12 rounded-[50%] blur-xl"
          style={{
            x: shadowX,
            y: shadowY,
            background:
              "radial-gradient(ellipse, rgba(228,147,37,0.12) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function LatestBook() {
  const dispatch = useDispatch();
  const book = getLatestBook();

  if (!book) return null;

  const handleAddToCart = () => {
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
    <Section tone="dark" spacing="lg" grain>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-primary-500/4 blur-[140px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: 0.3 }}
          className="absolute -bottom-32 -right-32 w-100 h-100 rounded-full bg-secondary-500/3 blur-[120px]"
        />
      </div>

      <div className="relative z-10">
        <BlurReveal
          delay={0}
          className="flex items-center justify-between mb-16"
        >
          <Subtitle tone="light" line lineWidth={32}>
            Latest Release
          </Subtitle>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-fog/40 font-medium">
              {book.category}
            </span>
            <div className="w-px h-4 bg-fog/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-fog/40 font-medium">
              {book.pages} Pages
            </span>
          </div>
        </BlurReveal>

        <div className="grid lg:grid-cols-[35%_auto] gap-16 lg:gap-24 items-center">
          <BlurReveal preset="slide-left" delay={1}>
            <div className="relative flex justify-center lg:justify-center py-8">
              <Book3D
                title={book.title}
                series={book.series}
                className="relative z-10"
              />
            </div>
          </BlurReveal>

          <div className="space-y-8">
            <BlurReveal delay={1.5}>
              <div className="flex items-end gap-6">
                <span className="font-display text-7xl md:text-8xl font-bold text-white/4 leading-none select-none">
                  {book.releaseYear}
                </span>
                <div className="flex items-center gap-1 pb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-primary-400 text-primary-400"
                    />
                  ))}
                  <span className="text-fog/50 text-[11px] ml-1.5 font-medium">
                    Acclaimed
                  </span>
                </div>
              </div>
            </BlurReveal>

            <BlurReveal delay={2}>
              <Title size="xl" tone="light">
                {book.title}
              </Title>
            </BlurReveal>

            <BlurReveal delay={2.5}>
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-px bg-linear-to-r from-primary-500 to-primary-500/0"
                />
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary-400/60 font-semibold">
                  Synopsis
                </span>
              </div>
            </BlurReveal>

            <BlurReveal delay={3}>
              <blockquote className="relative pl-5 border-l-2 border-primary-500/20">
                <p className="text-fog text-base md:text-lg leading-[1.9] font-light italic">
                  &ldquo;{book.synopsis?.slice(0, 200)}...&rdquo;
                </p>
              </blockquote>
            </BlurReveal>

            <BlurReveal
              delay={3.5}
              className="flex flex-wrap items-center gap-2"
            >
              {book.themes?.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-[10px] uppercase tracking-[0.12em] font-semibold px-3.5 py-1.5 rounded-full border border-white/6 text-fog/50 bg-white/2 hover:border-primary-500/20 hover:text-primary-300 transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </BlurReveal>

            <BlurReveal delay={4}>
              <div className="h-px w-full bg-linear-to-r from-white/5 via-white/10 to-white/5" />
            </BlurReveal>

            <BlurReveal
              delay={4.5}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-fog/30 font-medium">
                  Price
                </span>
                <span className="text-4xl font-display font-bold text-paper tracking-tight">
                  ${book.price}
                </span>
                <span className="text-fog/30 text-[11px] font-medium">USD</span>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="fill" size="md" onClick={handleAddToCart}>
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button href={`/books/${book.id}`} variant="outline" size="md">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
