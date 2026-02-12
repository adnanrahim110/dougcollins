"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Quote,
  Shield,
} from "lucide-react";

const highlights = [
  "Data should be meaningless to outsiders. Keep it fragmented and isolated to reduce its value if compromised.",
  "Access shouldn’t last forever. Persistent access is a ticking time bomb. Set time limits to reduce risk.",
  "Trust should be specific. Broad trust networks leave too many doors unlocked. Tighten it up.",
  "States should be temporary. Too much data stuck in one place? It makes systems vulnerable. Keep things fluid and adaptable.",
  "One failure shouldn’t lead to another. If a breach occurs, it shouldn’t spread. Isolate failures before they escalate.",
  "Humans aren’t perfect. Systems shouldn’t rely on human behavior. Automate and reduce the risk.",
];

export default function AuditBook() {
  return (
    <section className="relative bg-charcoal overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-primary-500/4 blur-[180px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-center">
          <BlurReveal preset="slide-left" delay={0}>
            <div className="relative max-w-xs mx-auto">
              <motion.div
                whileHover={{ rotateY: 5, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-[3/4.2] rounded-xl overflow-hidden bg-linear-to-br from-ink via-slate to-charcoal border border-white/6 shadow-2xl shadow-black/40"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary-500/8 border border-primary-500/20 flex items-center justify-center mb-5">
                    <Shield
                      className="w-8 h-8 text-primary-400"
                      strokeWidth={1.2}
                    />
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 mb-3">
                    Doug Collins
                  </p>
                  <h3 className="font-display text-lg font-bold text-paper text-center leading-snug mb-1.5">
                    Audit Findings on
                  </h3>
                  <h3 className="font-display text-lg font-bold text-primary-400 text-center leading-snug mb-4">
                    Cybersecurity
                  </h3>
                  <div className="w-10 h-px bg-primary-500/30 mb-4" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 text-center">
                    The New Architecture
                  </p>
                </div>

                <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-primary-400/15" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-primary-400/15" />

                <div className="absolute left-0 inset-y-0 w-1 bg-linear-to-b from-primary-500/20 via-primary-500/40 to-primary-500/20" />
              </motion.div>

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
                Cybersecurity Findings{" "}
                <Title.Gradient>- Key Insights</Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <div className="relative pl-6 border-l-2 border-primary-500/30">
                <Quote className="absolute -left-3 -top-1 w-5 h-5 text-primary-500/20" />
                <p className="text-white/50 text-base leading-relaxed">
                  Your identity is your gateway. If it’s exposed, attackers can
                  easily slip in and wreak havoc across systems. Let’s lock it
                  down.
                </p>
              </div>
            </BlurReveal>

            <BlurReveal delay={3}>
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
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

            <BlurReveal delay={4}>
              <div className="flex flex-wrap gap-3 pt-4">
                <Button href="/contact" variant="fill" size="md">
                  <BookOpen className="w-4 h-4" />
                  Get Your Copy
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
