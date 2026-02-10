"use client";

import Card from "@/components/ui/Card";
import { addToCart, toggleCart } from "@/store/slices/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

function BookListItem({ book, index }) {
  const dispatch = useDispatch();
  const isComingSoon = book.status === "comingSoon";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/books/${book.id}`}
        className="group flex flex-col sm:flex-row gap-6 p-5 rounded-2xl border border-charcoal/4 hover:border-primary-500/20 hover:bg-primary-50/30 transition-all duration-500"
      >
        <div className="w-full sm:w-28 h-40 sm:h-auto rounded-xl overflow-hidden bg-charcoal shrink-0 relative">
          {book.image ? (
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate to-charcoal p-4">
              <BookOpen className="w-6 h-6 text-primary-400/40 mb-2" />
              <span className="text-white/30 text-[9px] uppercase tracking-widest text-center">
                {book.series}
              </span>
            </div>
          )}
          {isComingSoon && (
            <div className="absolute top-2 left-2 bg-secondary-500/90 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full">
              Coming Soon
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-primary-500/70 text-[10px] uppercase tracking-[0.2em] font-semibold">
              {book.series}
            </span>
            <span className="w-1 h-1 rounded-full bg-charcoal/10" />
            <span className="text-smoke text-[10px] uppercase tracking-wider">
              {book.category}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-primary-600 transition-colors truncate">
            {book.title}
          </h3>
          <p className="text-smoke text-sm leading-relaxed mt-1 line-clamp-2">
            {book.description}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-charcoal font-semibold">
              {isComingSoon ? (
                <span className="text-smoke text-sm">TBA</span>
              ) : (
                `$${book.price}`
              )}
            </span>
            <span className="flex items-center gap-1 text-smoke text-xs">
              <Calendar className="w-3 h-3" /> {book.releaseYear}
            </span>
            <span className="ml-auto flex items-center gap-1 text-primary-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
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
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
              className="max-w-4xl mx-auto space-y-3"
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
