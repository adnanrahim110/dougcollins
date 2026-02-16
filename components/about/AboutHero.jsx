"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Fingerprint, Shield } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function AboutHero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="relative bg-ink overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="grain absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-primary-500/4 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-secondary-500/3 blur-[140px] pointer-events-none" />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10"
      >
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-center">
          <BlurReveal preset="slide-left" delay={0}>
            <div
              className="relative max-w-sm mx-auto lg:mx-0"
              style={{ perspective: 800 }}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative aspect-3/4 rounded-3xl overflow-hidden bg-charcoal border border-white/6"
              >
                <Image
                  src="/imgs/author.png"
                  alt="Doug Collins"
                  fill
                  className="object-cover object-top"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 top-12 bg-charcoal/90 backdrop-blur-sm border border-white/8 rounded-xl px-3 py-2.5 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  Cybersecurity
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-4 bottom-20 bg-charcoal/90 backdrop-blur-sm border border-white/8 rounded-xl px-3 py-2.5 flex items-center gap-2"
              >
                <Fingerprint className="w-4 h-4 text-secondary-400" />
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                  Cryptographer
                </span>
              </motion.div>
            </div>
          </BlurReveal>

          <div className="space-y-8">
            <BlurReveal delay={0}>
              <Subtitle tone="light" line lineWidth={36}>
                About the Author
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title size="2xl" tone="light">
                Doug{" "}
                <Title.Gradient variant="primary" underline>
                  Collins
                </Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <p className="text-white/50 text-lg leading-[1.9] max-w-lg">
                What makes Doug Collins stand out is how real his stories feel.
                His novels aren’t just exciting they’re built on a strong
                understanding of cybersecurity, future technology, and how these
                changes could affect everyday life.
              </p>
            </BlurReveal>

            <BlurReveal delay={3}>
              <p className="text-white/40 text-base leading-[1.9] max-w-lg">
                Doug blends today’s world with believable possibilities,
                creating stories that feel close to reality. His clear research
                and technical knowledge give readers confidence, making his
                books easy to enjoy for both tech lovers and general readers.
              </p>
            </BlurReveal>

            <BlurReveal delay={4}>
              <div className="flex gap-3 pt-2">
                <Button href="/books" variant="fill" size="md">
                  <BookOpen className="w-4 h-4" />
                  Explore My Books
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Get in Touch
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
