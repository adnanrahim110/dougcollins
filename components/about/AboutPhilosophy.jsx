"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { BookOpen, Brain, Lightbulb } from "lucide-react";

const philosophies = [
  {
    icon: Brain,
    title: "Technical Authenticity",
    body: "Every line of code, every cryptographic protocol, every system architecture in my novels is grounded in real-world science. Fiction should expand the mind, not insult it.",
  },
  {
    icon: Lightbulb,
    title: "Human-First Stories",
    body: "Technology is the lens, but humanity is the subject. My characters aren't vehicles for exposition—they're flawed, complex people navigating extraordinary circumstances.",
  },
  {
    icon: BookOpen,
    title: "Questions Over Answers",
    body: "The best stories don't tell you what to think—they make you think. I write to explore uncomfortable questions about power, identity, and the nature of reality.",
  },
];

export default function AboutPhilosophy() {
  return (
    <Section tone="cream" spacing="lg" grain>
      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <BlurReveal delay={0}>
            <Subtitle tone="cream" align="center" line="both" lineWidth={40}>
              Writing Philosophy
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title size="xl" tone="cream" align="center">
              What Drives the{" "}
              <Title.Gradient variant="primary" underline>
                Work
              </Title.Gradient>
            </Title>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {philosophies.map((item, i) => (
            <BlurReveal key={item.title} delay={i + 2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl bg-white border border-charcoal/4 p-8 lg:p-10 h-full"
              >
                <span className="absolute top-6 right-8 font-display text-7xl font-bold text-charcoal/3 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200/30 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-400">
                    <item.icon
                      className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                    {item.title}
                  </h3>

                  <p className="text-ash text-sm leading-[1.8]">{item.body}</p>
                </div>

                <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
