"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Book3D from "@/components/ui/Book3D";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getBookById } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";

const AUDIT_BOOK_ID = "audit-findings-on-cybersecurity";

export default function AuditBook() {
  const book = getBookById(AUDIT_BOOK_ID);

  if (!book) return null;

  const highlights = book.highlights ?? [];

  return (
    <section className="relative bg-charcoal overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-primary-500/4 blur-[180px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-center">
          <BlurReveal preset="slide-left" delay={0}>
            <div className="relative max-w-xs mx-auto">
              <Link href={`/books/${book.id}`} className="block">
                <Book3D
                  title={book.title}
                  image={book.image}
                  backImage={book.backImage}
                  widthClassName="w-72 sm:w-80"
                  thickness={28}
                  sizes="(max-width: 1024px) 288px, 320px"
                />
              </Link>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/20 rounded-full blur-xl" />
            </div>
          </BlurReveal>

          <div className="space-y-7">
            <BlurReveal>
              <Subtitle tone="charcoal" line lineWidth={36}>
                The Book
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title as="h2" size="lg" tone="charcoal">
                {book.title}{" "}
                {book.aboutTitle ? (
                  <Title.Gradient>— {book.aboutTitle}</Title.Gradient>
                ) : null}
              </Title>
            </BlurReveal>

            {book.description && (
              <BlurReveal delay={1.5}>
                <p className="text-white/45 text-base leading-relaxed">
                  {book.description}
                </p>
              </BlurReveal>
            )}

            <BlurReveal delay={2}>
              <div className="relative pl-6 border-l-2 border-primary-500/30">
                <Quote className="absolute -left-3 -top-1 w-5 h-5 text-primary-500/20" />
                <p className="text-white/50 text-base leading-relaxed">
                  {book.pullQuote || book.synopsis}
                </p>
              </div>
            </BlurReveal>

            {highlights.length > 0 && (
              <BlurReveal delay={3}>
                <div className="space-y-3">
                  {highlights.map((h, i) => (
                    <motion.div
                      key={`${book.id}-highlight-${i}`}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                      <span className="text-white/45 text-sm leading-relaxed">
                        {h}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </BlurReveal>
            )}

            <BlurReveal delay={4}>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button href={`/books/${book.id}`} variant="fill" size="md">
                  <BookOpen className="w-4 h-4" />
                  View Book
                </Button>
                <Button href="/books" variant="ghost-light" size="md">
                  Browse All Books
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
