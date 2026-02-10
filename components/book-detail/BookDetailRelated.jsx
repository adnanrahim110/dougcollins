"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";

export default function BookDetailRelated({ books, seriesName }) {
  if (!books || books.length === 0) return null;

  return (
    <Section tone="dark" spacing="lg" grain>
      <div className="text-center mb-14">
        <BlurReveal>
          <Subtitle
            tone="light"
            size="sm"
            align="center"
            line="both"
            lineWidth={36}
          >
            More to Explore
          </Subtitle>
        </BlurReveal>

        <BlurReveal delay={1}>
          <Title as="h2" size="lg" tone="light" align="center" className="mt-5">
            From the <Title.Gradient>{seriesName}</Title.Gradient> Series
          </Title>
        </BlurReveal>

        <BlurReveal delay={2}>
          <p className="mt-4 text-white/35 text-base max-w-md mx-auto">
            Continue the journey — discover more stories from the same universe.
          </p>
        </BlurReveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent origin-center max-w-md mx-auto"
      />
    </Section>
  );
}
