"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Book3D from "@/components/ui/Book3D";
import Button from "@/components/ui/Button";
import Title from "@/components/ui/Title";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Hash,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useDispatch } from "react-redux";

export default function BookDetailHero({ book }) {
  const dispatch = useDispatch();
  const isComingSoon = book.status === "comingSoon";

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

  const meta = [
    { icon: Calendar, label: "Released", value: book.releaseYear },
    { icon: FileText, label: "Pages", value: book.pages },
    { icon: Hash, label: "ISBN", value: book.isbn },
  ];

  return (
    <section className="relative bg-ink overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/6 w-150 h-150 rounded-full bg-primary-500/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-secondary-500/4 blur-[160px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <BlurReveal delay={0} preset="fade" trigger="mount">
          <div className="mb-10">
            <Button href="/books" variant="ghost-light" size="sm">
              <ArrowLeft className="w-4 h-4" />
              All Books
            </Button>
          </div>
        </BlurReveal>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
          <BlurReveal preset="slide-left" delay={0} trigger="mount">
            <div className="relative max-w-xs mx-auto lg:mx-0">
              <Book3D
                title={book.title}
                image={book.image}
                backImage={book.backImage}
                widthClassName="w-72 sm:w-80"
                thickness={28}
                sizes="(max-width: 1024px) 288px, 320px"
              />

              {isComingSoon && (
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-3 top-8 bg-secondary-500/90 backdrop-blur-sm border border-secondary-400/30 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] uppercase tracking-wider text-white font-semibold">
                    Coming {book.releaseYear}
                  </span>
                </motion.div>
              )}

              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/25 rounded-full blur-xl" />
            </div>
          </BlurReveal>

          <div className="space-y-7">
            <BlurReveal delay={0} trigger="mount">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-[10px] uppercase tracking-[0.18em] text-white/50 font-semibold">
                  {book.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-500/15 bg-primary-500/6 text-[10px] uppercase tracking-[0.18em] text-primary-400 font-semibold">
                  {book.series}
                </span>
              </div>
            </BlurReveal>

            <BlurReveal delay={1} trigger="mount">
              <Title as="h1" size="2xl" tone="light">
                {book.title}
              </Title>
            </BlurReveal>

            <BlurReveal delay={2} trigger="mount">
              <p className="text-white/45 text-lg leading-[1.9] max-w-lg">
                {book.description}
              </p>
            </BlurReveal>

            <BlurReveal delay={3} trigger="mount">
              <div className="flex flex-wrap items-center gap-5 py-5 border-y border-white/6">
                {meta.map((m, i) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <m.icon className="w-4 h-4 text-primary-400/70" />
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                      {m.label}
                    </span>
                    <span className="text-sm text-white/60 font-semibold">
                      {m.value}
                    </span>
                    {i < meta.length - 1 && (
                      <span className="w-px h-4 bg-white/6 ml-3" />
                    )}
                  </div>
                ))}
              </div>
            </BlurReveal>

            <BlurReveal delay={4} trigger="mount">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-1">
                {!isComingSoon && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-paper">
                      ${book.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium">
                      USD
                    </span>
                  </div>
                )}

                {isComingSoon ? (
                  <Button variant="outline" size="lg" disabled>
                    <Sparkles className="w-4 h-4" />
                    Coming {book.releaseYear}
                  </Button>
                ) : (
                  <Button variant="fill" size="lg" onClick={handleAddToCart}>
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
