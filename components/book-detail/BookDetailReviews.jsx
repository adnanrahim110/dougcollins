"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";

export default function BookDetailReviews({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <Section tone="cream" spacing="lg" grain>
      <div className="text-center mb-14">
        <BlurReveal>
          <Subtitle
            tone="cream"
            size="sm"
            align="center"
            line="both"
            lineWidth={36}
          >
            Praise
          </Subtitle>
        </BlurReveal>

        <BlurReveal delay={1}>
          <Title as="h2" size="lg" tone="cream" align="center" className="mt-5">
            What Readers <Title.Gradient>Say</Title.Gradient>
          </Title>
        </BlurReveal>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-350 mx-auto">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative p-7 rounded-2xl bg-paper border border-ink/4 hover:border-primary/15 hover:shadow-lg hover:shadow-ink/2 transition-all duration-500"
          >
            <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-primary/20 via-primary/10 to-transparent" />

            <MessageSquareQuote className="w-5 h-5 text-primary/15 mb-4" />

            <div className="flex items-center gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-3.5 h-3.5 ${
                    j < review.rating
                      ? "fill-primary-400 text-primary-400"
                      : "fill-transparent text-ink/10"
                  }`}
                />
              ))}
            </div>

            <p className="text-ink/70 text-[15px] italic leading-[1.8] mb-5">
              &ldquo;{review.quote}&rdquo;
            </p>

            <div className="pt-4 border-t border-ink/4">
              <p className="font-display text-sm font-bold text-ink">
                {review.author}
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/35 mt-0.5 font-medium">
                {review.authorTitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
