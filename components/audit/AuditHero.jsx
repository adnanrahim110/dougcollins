"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Shield, ShieldCheck } from "lucide-react";
import { useRef } from "react";

export default function AuditHero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const rotateX = useTransform(springY, [-300, 300], [6, -6]);
  const rotateY = useTransform(springX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="relative bg-ink overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/6 w-150 h-150 rounded-full bg-accent-500/4 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-100 h-100 rounded-full bg-secondary-500/3 blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-75 h-75 rounded-full bg-primary-500/3 blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-center">
          <div className="space-y-7">
            <BlurReveal delay={0}>
              <Subtitle tone="light" line lineWidth={36}>
                The Book
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title as="h1" size="2xl" tone="light">
                Audit Findings on{" "}
                <Title.Gradient
                  variant="primary"
                  underline
                  underlineDelay={1.2}
                >
                  Cybersecurity
                </Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <p className="text-white/50 text-lg leading-[1.9] max-w-xl">
                Doug Collins, in his work The New Architecture: A Structural
                Revolution in Cybersecurity, challenges traditional
                cybersecurity approaches by examining the root causes of
                vulnerabilities within legacy systems. Collins argues that many
                of the persistent cyber risks we face today are not merely the
                result of human error or insufficient tools, but stem from deep
                architectural flaws embedded in the design of digital systems.
                He calls for a radical shift in thinking one that moves beyond
                reactive measures and toward a proactive, structural overhaul.
              </p>
            </BlurReveal>

            <BlurReveal delay={3}>
              <p className="text-white/35 text-base leading-relaxed max-w-xl">
                Collins emphasizes the importance of rethinking how core
                elements like identity, data, trust, and time are managed within
                cybersecurity frameworks, advocating for a new architecture that
                is inherently secure, mathematically grounded, and ethically
                responsible. His work provides a compelling vision for a future
                where cybersecurity is not an afterthought but a foundational
                property of digital systems.
              </p>
            </BlurReveal>

            <BlurReveal delay={4}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/contact" variant="fill" size="lg">
                  <BookOpen className="w-4 h-4" />
                  Get the Book
                </Button>
                <Button href="/books" variant="outline-light" size="lg">
                  All Books
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </BlurReveal>

            <BlurReveal delay={5}>
              <div className="flex items-center gap-6 pt-6 border-t border-white/6">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-400" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                    35+ Years Experience
                  </span>
                </div>
                <div className="w-px h-4 bg-white/6" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-400" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                    Multi-Sector Auditor
                  </span>
                </div>
              </div>
            </BlurReveal>
          </div>

          <BlurReveal preset="slide-right" delay={1}>
            <div
              className="relative max-w-sm mx-auto lg:mx-0"
              style={{ perspective: 900 }}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative aspect-3/4 rounded-2xl overflow-hidden bg-charcoal border border-white/6 shadow-2xl shadow-primary-500/8"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-linear-to-br from-slate via-charcoal to-ink">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-20 h-20 rounded-full bg-primary-500/8 border border-primary-500/20 flex items-center justify-center mb-6"
                  >
                    <Shield
                      className="w-10 h-10 text-primary-400"
                      strokeWidth={1.2}
                    />
                  </motion.div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 text-center">
                    Doug Collins
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-paper text-center leading-snug mb-2">
                    Audit Findings on Cybersecurity
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-primary-400/60 text-center">
                    The New Architecture
                  </p>

                  <div className="absolute top-5 left-5 w-8 h-8 border-l-2 border-t-2 border-primary-400/15 rounded-tl-lg" />
                  <div className="absolute top-5 right-5 w-8 h-8 border-r-2 border-t-2 border-primary-400/15 rounded-tr-lg" />
                  <div className="absolute bottom-5 left-5 w-8 h-8 border-l-2 border-b-2 border-primary-400/15 rounded-bl-lg" />
                  <div className="absolute bottom-5 right-5 w-8 h-8 border-r-2 border-b-2 border-primary-400/15 rounded-br-lg" />
                </div>

                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 w-1/3 bg-linear-to-r from-transparent via-white/4 to-transparent skew-x-12"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 top-16 bg-charcoal/90 backdrop-blur-sm border border-white/8 rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-lg"
              >
                <Shield className="w-4 h-4 text-accent-400" />
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  35+ Years
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute -left-3 bottom-24 bg-charcoal/90 backdrop-blur-sm border border-white/8 rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-lg"
              >
                <BookOpen className="w-4 h-4 text-primary-400" />
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  New Paradigm
                </span>
              </motion.div>

              <div className="absolute left-0 top-4 bottom-4 w-2 bg-linear-to-r from-black/30 to-transparent rounded-l-lg" />
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
