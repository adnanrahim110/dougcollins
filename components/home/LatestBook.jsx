"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Book3D from "@/components/ui/Book3D";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getLatestBook } from "@/lib/data";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { useDispatch } from "react-redux";

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
                image={book.image}
                backImage={book.backImage}
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
