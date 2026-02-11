"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <Section tone="dark" spacing="sm" grain>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-primary-500/3 blur-[200px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary-500/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary-500/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative">
          <BlurReveal preset="scale" delay={0} duration={1.2}>
            <div className="flex justify-center mb-2">
              <span className="font-display text-[120px] md:text-[180px] lg:text-[220px] leading-40 text-primary-400/6 select-none">
                &ldquo;
              </span>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.5} duration={1}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px bg-linear-to-r from-transparent to-primary-500/40"
              />
              <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px bg-linear-to-l from-transparent to-primary-500/40"
              />
            </div>
          </BlurReveal>

          <BlurReveal delay={1} duration={1.2}>
            <blockquote className="text-center px-4">
              <p className="font-display text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl text-paper/90 leading-[1.4] md:leading-[1.35] font-medium tracking-tight">
                No one will drive us out of the paradise
              </p>
            </blockquote>
          </BlurReveal>

          <BlurReveal delay={1.8} duration={1.2}>
            <blockquote className="text-center px-4 mt-3">
              <p className="font-display text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl leading-[1.4] md:leading-[1.35] font-medium italic tracking-tight">
                <span className="bg-linear-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                  that Cantor has created for us.
                </span>
              </p>
            </blockquote>
          </BlurReveal>

          <BlurReveal delay={2.5} duration={1}>
            <div className="flex items-center justify-center gap-4 mt-12">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px bg-linear-to-r from-transparent to-fog/15"
              />
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-primary-500/30" />
                <p className="text-fog/50 text-[10px] tracking-[0.3em] uppercase font-semibold">
                  Dough Collins
                </p>
                <div className="w-6 h-px bg-primary-500/30" />
              </div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-px bg-linear-to-l from-transparent to-fog/15"
              />
            </div>
          </BlurReveal>

          <BlurReveal preset="scale" delay={3} duration={1.2}>
            <div className="flex justify-center mt-2">
              <span className="font-display text-[120px] md:text-[180px] lg:text-[220px] leading-40 text-primary-400/6 select-none rotate-180">
                &ldquo;
              </span>
            </div>
          </BlurReveal>
        </div>
      </div>
    </Section>
  );
}
