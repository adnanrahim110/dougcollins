"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function BookDetailSynopsis({ book }) {
  return (
    <Section tone="light" spacing="lg">
      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-center">
        <div>
          <BlurReveal>
            <Image
              src={book.mockupImage}
              alt={book.title}
              width={1080}
              height={1081}
              className="w-full h-auto"
            />
          </BlurReveal>
        </div>

        <div>
          <BlurReveal>
            <Subtitle tone="dark" line lineWidth={36}>
              About the Book
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title as="h2" size="lg" tone="dark" className="mt-5 mb-5">
              {book.aboutTitle || "Synopsis"}
            </Title>
          </BlurReveal>
          <BlurReveal delay={1}>
            <div className="relative pl-6 border-l-2 border-primary/20 mb-10">
              <Quote className="absolute -left-3 -top-1 w-5 h-5 text-primary/20" />
              <p className="text-ink/60 text-lg italic leading-[1.9]">
                {book.synopsis}
              </p>
            </div>
          </BlurReveal>

          <BlurReveal delay={2}>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-parchment/60 border border-ink/4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35 font-semibold mb-1">
                  Genre
                </p>
                <p className="font-display text-sm font-bold text-ink">
                  {book.category}
                </p>
              </div>
              <div className="p-5 rounded-xl bg-parchment/60 border border-ink/4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35 font-semibold mb-1">
                  Series
                </p>
                <p className="font-display text-sm font-bold text-ink">
                  {book.series}
                </p>
              </div>
              <div className="p-5 rounded-xl bg-parchment/60 border border-ink/4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35 font-semibold mb-1">
                  Length
                </p>
                <p className="font-display text-sm font-bold text-ink">
                  {book.pages} pages
                </p>
              </div>
            </div>
          </BlurReveal>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 h-px bg-linear-to-r from-transparent via-ink/8 to-transparent origin-left"
          />
        </div>
      </div>
    </Section>
  );
}
