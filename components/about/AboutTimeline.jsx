"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2015",
    title: "Realism Meets Imagination",
    desc: "Doug Collins blends thrilling fiction with real knowledge of cybersecurity and future tech. His stories feel believable because they’re grounded in what could actually happen next.",
    side: "left",
  },
  {
    year: "2018",
    title: "Tech Knowledge Depth",
    desc: "His deep understanding of technology and research into what’s coming gives his narratives authority and authenticity.",
    side: "right",
  },
  {
    year: "2020",
    title: "Future Focus Vision",
    desc: "Collins doesn’t just tell stories about the future. He explores how emerging technologies might shape human experience.",
    side: "left",
  },
  {
    year: "2022",
    title: "Narrative With Purpose",
    desc: "His writing isn’t just suspenseful. It invites readers to think about the impact of code, networks, and cyber realities on everyday life.",
    side: "right",
  },
  {
    year: "2024",
    title: "Authenticated Digital Worlds",
    desc: "Collins uses his real‑world experience with cybersecurity, government, and research to craft worlds where every digital interaction feels significant.",
    side: "left",
  },
];

export default function AboutTimeline() {
  return (
    <Section tone="light" spacing="lg">
      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <BlurReveal delay={0}>
            <Subtitle tone="dark" align="center" line="both" lineWidth={40}>
              Journey
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title size="xl" tone="dark" align="center">
              The Collins{" "}
              <Title.Gradient variant="primary" underline>
                Method
              </Title.Gradient>
            </Title>
          </BlurReveal>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary-400/0 via-primary-400/20 to-primary-400/0 md:-translate-x-px" />

          <div className="space-y-12 md:space-y-0">
            {timeline.map((item, i) => {
              const isLeft = item.side === "left";
              return (
                <BlurReveal
                  key={item.year}
                  preset={isLeft ? "slide-left" : "slide-right"}
                  delay={i + 2}
                >
                  <div
                    className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                      i > 0 ? "md:mt-16" : ""
                    }`}
                  >
                    <div className="absolute left-6 md:left-1/2 top-2 md:top-5 -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="w-4 h-4 rounded-full bg-primary-500 border-[3px] border-paper shadow-md shadow-primary-500/20"
                      />
                    </div>

                    <div
                      className={`pl-14 md:pl-0 ${
                        isLeft
                          ? "md:col-start-1 md:text-right md:pr-12"
                          : "md:col-start-2 md:pl-12"
                      }`}
                    >
                      <span className="inline-block font-display text-sm font-bold text-primary-500 mb-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200/30">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                        {item.title}
                      </h3>
                      <p className="text-ash text-sm leading-[1.8]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
