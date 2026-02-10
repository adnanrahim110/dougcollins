"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Award, BookOpen, Code, Globe, Shield, Sparkles } from "lucide-react";

const expertise = [
  {
    icon: Shield,
    title: "Cybersecurity",
    desc: "Enterprise security architecture, cryptographic protocols, and advanced threat intelligence. Over a decade of protecting systems at scale.",
    tags: ["Cryptography", "Threat Intel", "Architecture"],
  },
  {
    icon: Code,
    title: "Software Engineering",
    desc: "Full-stack development, distributed systems, and AI/ML applications. Building the future while writing about it.",
    tags: ["Full-Stack", "Systems", "AI/ML"],
  },
  {
    icon: BookOpen,
    title: "Speculative Fiction",
    desc: "Technically grounded science fiction that explores the human condition through the lens of emerging technology.",
    tags: ["Sci-Fi", "Techno-Thriller", "Philosophy"],
  },
  {
    icon: Globe,
    title: "Speaking & Consulting",
    desc: "Keynotes and workshops on cybersecurity, AI ethics, and the intersection of technology and storytelling.",
    tags: ["Keynotes", "Workshops", "AI Ethics"],
  },
];

const accolades = [
  { icon: Award, text: "Featured in TechCrunch & Wired" },
  { icon: Sparkles, text: "8 published novels across 3 series" },
  { icon: Globe, text: "Readers in 40+ countries worldwide" },
];

export default function AboutExpertise() {
  return (
    <Section tone="dark" spacing="lg" grain>
      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <BlurReveal delay={0}>
            <Subtitle tone="light" align="center" line="both" lineWidth={40}>
              Expertise
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title size="xl" tone="light" align="center">
              Where I{" "}
              <Title.Gradient variant="primary" underline>
                Operate
              </Title.Gradient>
            </Title>
          </BlurReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {expertise.map((item, i) => (
            <BlurReveal key={item.title} delay={i + 2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`group relative rounded-3xl bg-white/3 border border-white/6 p-8 lg:p-10 h-full backdrop-blur-sm ${
                  i % 2 !== 0 ? "md:mt-8" : ""
                }`}
              >
                <div className="absolute -top-px left-10 right-10 h-px bg-linear-to-r from-transparent via-primary-400/0 to-transparent group-hover:via-primary-400/30 transition-all duration-500" />

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-400">
                    <item.icon
                      className="w-5 h-5 text-primary-400 group-hover:text-ink transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-paper mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-[1.8] mb-4">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-[0.12em] font-semibold px-3 py-1.5 rounded-full border border-white/6 text-white/40 group-hover:border-primary-400/20 group-hover:text-primary-400/70 transition-all duration-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </BlurReveal>
          ))}
        </div>

        <BlurReveal delay={6}>
          <div className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16">
            {accolades.map((a) => (
              <div key={a.text} className="flex items-center gap-3">
                <a.icon
                  className="w-5 h-5 text-primary-400"
                  strokeWidth={1.5}
                />
                <span className="text-white/40 text-sm">{a.text}</span>
              </div>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
