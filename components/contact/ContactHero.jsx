"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative bg-ink overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-primary-500/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-87.5 h-87.5 rounded-full bg-secondary-500/3 blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 right-[8%] -translate-y-1/2 hidden lg:block"
        >
          <div className="relative w-64 h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-white/4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/6 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-400/50" />
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-dashed border-white/3"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="w-8 h-8 rounded-lg bg-white/3 border border-white/6 flex items-center justify-center">
                  <Send className="w-3 h-3 text-primary-400/40" />
                </div>
              </div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/6 border border-primary-500/15 flex items-center justify-center">
                <Mail
                  className="w-7 h-7 text-primary-400/60"
                  strokeWidth={1.2}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl">
          <BlurReveal delay={0}>
            <Subtitle tone="light" line lineWidth={36}>
              Get in Touch
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title as="h1" size="2xl" tone="light" className="mt-6">
              Let&apos;s Start a{" "}
              <Title.Gradient underline underlineDelay={1}>
                Conversation
              </Title.Gradient>
            </Title>
          </BlurReveal>

          <BlurReveal delay={2}>
            <p className="mt-6 text-white/45 text-lg md:text-xl leading-relaxed max-w-lg font-light">
              Whether you have a question, a collaboration idea, or just want to
              talk about books and technology — I&apos;d love to hear from you.
            </p>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}
