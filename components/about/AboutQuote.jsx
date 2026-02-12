"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";

export default function AboutQuote() {
  return (
    <Section tone="cream" spacing="md" grain>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <BlurReveal delay={0}>
          <span className="block font-display text-[140px] md:text-[200px] leading-[0.6] text-primary-400/6 select-none mb-0">
            &ldquo;
          </span>
        </BlurReveal>

        <BlurReveal delay={1}>
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal leading-[1.4] font-medium -mt-10 md:-mt-16 px-4">
            Every discovery, every algorithm, becomes a story about power and
            responsibility.
          </blockquote>
        </BlurReveal>

        <BlurReveal delay={2}>
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px bg-primary-400/40"
            />
            <p className="text-primary-600 text-xs font-semibold uppercase tracking-[0.25em]">
              Doug Collins
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px bg-primary-400/40"
            />
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
