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
        <div className="grid gap-16 lg:gap-24 items-center">
          <div className="flex flex-col items-center gap-7 text-center">
            <BlurReveal delay={0}>
              <Subtitle tone="light" line="both" align="center" lineWidth={36}>
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
              <p className="text-white/50 text-lg">
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
              <p className="text-white/35 text-base">
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
                <Button href="/books" variant="outline" size="lg">
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
        </div>
      </div>
    </section>
  );
}
