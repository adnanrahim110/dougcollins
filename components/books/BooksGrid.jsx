"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

function BookListItem({ book, index }) {
  const dispatch = useDispatch();
  const isComingSoon = book.status === "comingSoon";

  const handleAddToCart = () => {
    if (isComingSoon) return;
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
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="group relative rounded-2xl md:rounded-3xl border border-charcoal/8 bg-paper overflow-hidden transition-all duration-500 hover:border-primary-500/25 hover:shadow-xl hover:shadow-charcoal/5">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-primary-100/20 via-transparent to-secondary-100/10 pointer-events-none" />

        <div className="relative grid md:grid-cols-[10rem_1fr_auto] gap-5 md:gap-8 items-center p-4 sm:p-5 md:p-6">
          <Link
            href={`/books/${book.id}`}
            className="relative block w-full max-w-40 aspect-[3/4.2] rounded-xl overflow-hidden bg-charcoal shrink-0"
          >
            {book.image && book.backImage ? (
              <>
                <Image
                  src={book.image}
                  alt={`${book.title} front cover`}
                  fill
                  className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                  sizes="(max-width: 768px) 128px, 160px"
                />
                <Image
                  src={book.backImage}
                  alt={`${book.title} back cover`}
                  fill
                  className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </>
            ) : book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate to-charcoal p-4">
                <BookOpen className="w-6 h-6 text-primary-400/40 mb-2" />
                <span className="text-white/30 text-[9px] uppercase tracking-widest text-center">
                  {book.series}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
            {isComingSoon && (
              <div className="absolute top-2 left-2 bg-secondary-500/90 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
                Coming Soon
              </div>
            )}
          </Link>

          <div className="min-w-0 space-y-3 md:space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/8 border border-primary-500/15 text-primary-600 text-[10px] uppercase tracking-[0.2em] font-semibold">
                {book.series}
              </span>
              <span className="w-1 h-1 rounded-full bg-charcoal/15" />
              <span className="text-smoke text-[10px] uppercase tracking-[0.18em] font-semibold">
                {book.category}
              </span>
            </div>

            <Link href={`/books/${book.id}`} className="block">
              <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal group-hover:text-primary-600 transition-colors duration-300 leading-snug line-clamp-2">
                {book.title}
              </h3>
            </Link>

            <p className="text-smoke text-sm md:text-[15px] leading-[1.75] line-clamp-3 max-w-2xl">
              {book.description}
            </p>
          </div>

          <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-4 md:gap-5 pt-2 md:pt-0">
            <div className="md:text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-smoke font-semibold mb-1.5">
                Price
              </p>
              <p className="font-display text-2xl md:text-[1.75rem] leading-none font-bold text-charcoal">
                {isComingSoon ? "TBA" : `$${book.price}`}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                href={`/books/${book.id}`}
                variant="outline-light"
                size="sm"
              >
                Details <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="fill"
                size="sm"
                disabled={isComingSoon}
              >
                {isComingSoon ? (
                  "Coming Soon"
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function BooksGrid({ books, view = "grid" }) {
  return (
    <section className="bg-paper">
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {books.map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Card book={book} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 md:space-y-5"
            >
              {books.map((book, i) => (
                <BookListItem key={book.id} book={book} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-charcoal/3 border border-charcoal/6 flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-6 h-6 text-smoke/40" />
            </div>
            <p className="text-smoke text-lg font-display">No books found</p>
            <p className="text-smoke/60 text-sm mt-1">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
