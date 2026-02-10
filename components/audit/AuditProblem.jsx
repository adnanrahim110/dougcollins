"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDownRight,
  Bug,
  Repeat,
  TrendingUp,
  Users,
} from "lucide-react";

const problems = [
  {
    icon: Repeat,
    title: "The Endless Spiral",
    desc: "Cybersecurity has always trailed the dark side — a cat-and-mouse game of threat and reaction. This cycle is never-ending and will remain so without a paradigm shift.",
    accent: "from-accent-400/20 to-accent-500/5",
    iconColor: "text-accent-400",
  },
  {
    icon: TrendingUp,
    title: "Budgets Never Enough",
    desc: "Our numbers keep growing in terms of both cybersecurity personnel and budgets, however enough is never enough it seems. Management is frustrated with costs as are we with not being provided enough budget.",
    accent: "from-primary-400/20 to-primary-500/5",
    iconColor: "text-primary-400",
  },
  {
    icon: Users,
    title: "The Human Attack Surface",
    desc: "Our largest and most vulnerable attack surface — human beings exposed to social engineering — will always be an ongoing risk due to the very nature of them being human.",
    accent: "from-secondary-400/20 to-secondary-500/5",
    iconColor: "text-secondary-400",
  },
  {
    icon: Bug,
    title: "AI & Quantum Threat",
    desc: "Upcoming technological advances such as AI and Quantum Computing may overload us. The dark side will make more effective use of these advances than ourselves — they historically do when innovation is introduced.",
    accent: "from-accent-400/20 to-accent-500/5",
    iconColor: "text-accent-400",
  },
];

export default function AuditProblem() {
  return (
    <section className="relative bg-paper overflow-hidden">
      <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-accent-500/2 blur-[120px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-36">
            <BlurReveal>
              <Subtitle tone="dark" line lineWidth={36}>
                The Problem
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title as="h2" size="lg" tone="dark" className="mt-5">
                A Field Without <Title.Gradient>Foundation</Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <p className="mt-5 text-smoke text-base leading-relaxed max-w-md">
                Current cybersecurity has evolved without a founding
                architecture to guide it strategically — always reacting in
                patch-like fashion. The result is a field caught in an endless
                spiral.
              </p>
            </BlurReveal>

            <BlurReveal delay={3}>
              <div className="mt-10 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-40 h-40 rounded-full border border-dashed border-charcoal/8"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-400" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-dashed border-charcoal/6">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-full h-full relative"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-400" />
                    </motion.div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-charcoal/10" />
                </div>
              </div>
            </BlurReveal>
          </div>

          <div className="space-y-5">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-7 rounded-2xl bg-white border border-charcoal/4 hover:border-charcoal/8 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/2"
              >
                <div
                  className={`absolute top-0 left-6 right-6 h-px bg-linear-to-r ${problem.accent}`}
                />

                <span className="absolute top-3 right-5 font-display text-[60px] font-bold text-charcoal/2 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-5">
                  <div className="w-11 h-11 rounded-xl bg-charcoal/3 group-hover:bg-charcoal group-hover:shadow-md flex items-center justify-center shrink-0 transition-all duration-300">
                    <problem.icon
                      className={`w-5 h-5 ${problem.iconColor} group-hover:text-paper transition-colors duration-300`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-smoke text-sm leading-relaxed">
                      {problem.desc}
                    </p>
                  </div>
                </div>

                <ArrowDownRight className="absolute bottom-4 right-4 w-4 h-4 text-charcoal/6 group-hover:text-primary-400 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
