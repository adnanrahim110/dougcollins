"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import ContactForm from "@/components/ui/ContactForm";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";

export default function ContactFormSection() {
  return (
    <section className="relative bg-parchment overflow-hidden">
      <div className="absolute top-0 left-1/3 w-100 h-100 rounded-full bg-primary-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <BlurReveal>
            <Subtitle
              tone="cream"
              size="sm"
              align="center"
              line="both"
              lineWidth={36}
            >
              Send a Message
            </Subtitle>
          </BlurReveal>
          <BlurReveal delay={1}>
            <Title
              as="h2"
              size="lg"
              tone="cream"
              align="center"
              className="mt-5"
            >
              Write to <Title.Gradient>Me</Title.Gradient>
            </Title>
          </BlurReveal>
          <BlurReveal delay={2}>
            <p className="mt-4 text-smoke text-base max-w-md mx-auto">
              Fill out the form below and I&apos;ll get back to you as soon as
              possible.
            </p>
          </BlurReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto bg-paper rounded-2xl border border-charcoal/4 p-8 md:p-12 shadow-sm"
        >
          <ContactForm tone="light" />
        </motion.div>
      </div>
    </section>
  );
}
