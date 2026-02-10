"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";

export default function BooksCTA() {
  return (
    <section className="relative bg-charcoal overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-0 left-1/3 w-100 h-100 rounded-full bg-primary-500/5 blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-62.5 h-62.5 rounded-full bg-secondary-500/4 blur-[100px]" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <BlurReveal>
            <Subtitle
              tone="charcoal"
              size="sm"
              align="center"
              line="both"
              lineWidth={32}
            >
              Get in Touch
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <Title
              as="h2"
              size="lg"
              tone="charcoal"
              align="center"
              className="mt-5"
            >
              Have a Question About <Title.Gradient>the Books</Title.Gradient>?
            </Title>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <p className="mt-5 text-white/40 text-base leading-relaxed max-w-md mx-auto">
              Whether it&apos;s a question about the stories, collaboration
              ideas, or just want to connect — I&apos;d love to hear from you.
            </p>
          </BlurReveal>

          <BlurReveal delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="fill" size="md">
                Contact Me
              </Button>
              <Button href="/" variant="ghost-light" size="md">
                Back to Home
              </Button>
            </div>
          </BlurReveal>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 h-px bg-linear-to-r from-transparent via-primary-500/30 to-transparent origin-center max-w-md mx-auto"
        />
      </div>
    </section>
  );
}
