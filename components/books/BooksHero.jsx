"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { books } from "@/lib/data";
import { motion } from "framer-motion";
import { BookOpen, Library, Sparkles } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    value: books.filter((b) => b.status === "available").length,
    label: "Published",
  },
  {
    icon: Library,
    value: [...new Set(books.map((b) => b.series))].length,
    label: "Series",
  },
  {
    icon: Sparkles,
    value: books.filter((b) => b.status === "comingSoon").length,
    label: "Upcoming",
  },
];

export default function BooksHero() {
  return (
    <section className="relative bg-ink pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-primary-500/6 blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-75 h-75 rounded-full bg-secondary-500/4 blur-[120px]" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 h-full relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[10%] top-0 w-px bg-linear-to-b from-transparent via-primary-500/10 to-transparent"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute right-[10%] top-0 w-px bg-linear-to-b from-transparent via-primary-500/10 to-transparent"
          />
        </div>
      </div>

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <BlurReveal>
            <Subtitle
              tone="charcoal"
              size="sm"
              align="center"
              line="both"
              lineWidth={40}
            >
              The Collection
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <Title
              as="h1"
              size="2xl"
              tone="light"
              weight="bold"
              align="center"
              className="mt-6"
            >
              Every Story,{" "}
              <Title.Gradient underline underlineDelay={1}>
                Curated
              </Title.Gradient>
            </Title>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <p className="mt-6 text-fog/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light">
              Speculative fiction at the intersection of science, technology,
              and the boundaries of human consciousness.
            </p>
          </BlurReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/4 border border-white/6">
                <stat.icon className="w-4 h-4 text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-paper">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-white/6 ml-5 md:ml-8" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
