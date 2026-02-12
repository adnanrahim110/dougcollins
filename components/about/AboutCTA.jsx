"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { ArrowRight, Mail } from "lucide-react";

export default function AboutCTA() {
  return (
    <Section tone="charcoal" spacing="md">
      <div className="relative z-10 text-center max-w-350 mx-auto space-y-6">
        <BlurReveal delay={0}>
          <Subtitle tone="charcoal" align="center" line="both" lineWidth={32}>
            Collaborate
          </Subtitle>
        </BlurReveal>

        <BlurReveal delay={1}>
          <Title size="lg" tone="charcoal" align="center">
            Let&apos;s Disturb the{" "}
            <Title.Gradient variant="primary" underline>
              Silence
            </Title.Gradient>
          </Title>
        </BlurReveal>

        <BlurReveal delay={2}>
          <p className="text-white/40 text-base leading-[1.8] max-w-lg mx-auto">
            Rights inquiries. Keynotes. Or the unease you carry about where this
            is all heading, we don’t have to solve it alone. We only have to
            begin.
          </p>
        </BlurReveal>

        <BlurReveal delay={3}>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Button href="/contact" variant="fill" size="lg">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
            <Button href="/books" variant="outline" size="lg">
              View All Books
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
